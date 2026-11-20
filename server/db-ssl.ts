import fs from "fs";

export type PgSslConfig =
  | { rejectUnauthorized: true; ca?: string; cert?: string; key?: string }
  | undefined;

export type PgPoolConfig = {
  connectionString: string;
  ssl: Exclude<PgSslConfig, undefined> | false;
  sslnegotiation?: string;
};

const SSL_QUERY_PARAMS = new Set([
  "ssl",
  "sslmode",
  "sslrootcert",
  "sslcert",
  "sslkey",
  "uselibpqcompat",
  "sslnegotiation",
]);

const DISABLED_SSL_VALUES = new Set(["0", "false"]);
const DISABLED_SSLMODE_VALUES = new Set(["disable"]);

type ParsedUrlSslInfo = {
  sanitizedUrl: string;
  isNeon: boolean;
  ssl?: string;
  sslmode?: string;
  sslrootcert?: string;
  sslcert?: string;
  sslkey?: string;
  sslnegotiation?: string;
};

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function readPemOrFile(value: string): string {
  return value.includes("-----BEGIN") ? value : fs.readFileSync(value, "utf8");
}

function parseUrlSslInfo(url: string): ParsedUrlSslInfo {
  try {
    const parsed = new URL(url);
    const info: ParsedUrlSslInfo = {
      sanitizedUrl: url,
      isNeon: parsed.hostname.toLowerCase().endsWith(".neon.tech"),
    };

    const keysToDelete: string[] = [];
    parsed.searchParams.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (!SSL_QUERY_PARAMS.has(lower)) return;
      keysToDelete.push(key);
      if (lower === "ssl") info.ssl = value;
      else if (lower === "sslmode") info.sslmode = value;
      else if (lower === "sslrootcert") info.sslrootcert = value;
      else if (lower === "sslcert") info.sslcert = value;
      else if (lower === "sslkey") info.sslkey = value;
      else if (lower === "sslnegotiation") info.sslnegotiation = value;
    });

    if (keysToDelete.length > 0) {
      for (const key of keysToDelete) {
        parsed.searchParams.delete(key);
      }
      info.sanitizedUrl = parsed.toString();
    }

    return info;
  } catch {
    const info: ParsedUrlSslInfo = {
      sanitizedUrl: url,
      isNeon: /\.neon\.tech(?:[:/?]|$)/i.test(url),
    };

    const hashIdx = url.indexOf("#");
    const hash = hashIdx === -1 ? "" : url.slice(hashIdx);
    const beforeHash = hashIdx === -1 ? url : url.slice(0, hashIdx);
    const qIdx = beforeHash.indexOf("?");
    if (qIdx === -1) return info;

    const base = beforeHash.slice(0, qIdx);
    const query = beforeHash.slice(qIdx + 1);
    const kept: string[] = [];
    let strippedAny = false;

    for (const pair of query.split("&")) {
      if (!pair) continue;
      const eqIdx = pair.indexOf("=");
      const rawKey = eqIdx === -1 ? pair : pair.slice(0, eqIdx);
      const rawVal = eqIdx === -1 ? "" : pair.slice(eqIdx + 1);
      const lower = safeDecode(rawKey).toLowerCase();

      if (SSL_QUERY_PARAMS.has(lower)) {
        strippedAny = true;
        const decodedVal = safeDecode(rawVal);
        if (lower === "ssl") info.ssl = decodedVal;
        else if (lower === "sslmode") info.sslmode = decodedVal;
        else if (lower === "sslrootcert") info.sslrootcert = decodedVal;
        else if (lower === "sslcert") info.sslcert = decodedVal;
        else if (lower === "sslkey") info.sslkey = decodedVal;
        else if (lower === "sslnegotiation") info.sslnegotiation = decodedVal;
      } else {
        kept.push(pair);
      }
    }

    if (strippedAny) {
      info.sanitizedUrl =
        kept.length > 0 ? `${base}?${kept.join("&")}${hash}` : `${base}${hash}`;
    }

    return info;
  }
}

export function stripPgSslQueryParams(url: string): string {
  return parseUrlSslInfo(url).sanitizedUrl;
}

function resolveSslFromParsed(
  info: ParsedUrlSslInfo,
  env: NodeJS.ProcessEnv,
): PgSslConfig {
  const envPgSslTrue = env.PGSSL?.trim().toLowerCase() === "true";
  const envSslRootCert = env.PGSSLROOTCERT?.trim();
  const envSslMode = env.PGSSLMODE?.trim().toLowerCase();
  const envSslModeEnablesTls =
    Boolean(envSslMode) && !DISABLED_SSLMODE_VALUES.has(envSslMode!);

  const urlSslMode = info.sslmode?.trim().toLowerCase();
  const urlSslParam = info.ssl?.trim().toLowerCase();
  const urlSslRootCert = info.sslrootcert?.trim();
  const urlSslCert = info.sslcert?.trim();
  const urlSslKey = info.sslkey?.trim();
  const urlSslNegotiation = info.sslnegotiation?.trim().toLowerCase();

  const urlExplicitlyDisablesTls =
    (Boolean(urlSslMode) && DISABLED_SSLMODE_VALUES.has(urlSslMode!)) ||
    (Boolean(urlSslParam) && DISABLED_SSL_VALUES.has(urlSslParam!));

  const urlEnablesTls =
    info.isNeon ||
    (Boolean(urlSslMode) && !DISABLED_SSLMODE_VALUES.has(urlSslMode!)) ||
    (Boolean(urlSslParam) && !DISABLED_SSL_VALUES.has(urlSslParam!)) ||
    Boolean(urlSslRootCert) ||
    Boolean(urlSslCert) ||
    Boolean(urlSslKey) ||
    urlSslNegotiation === "direct";

  const needsSsl =
    envPgSslTrue ||
    Boolean(envSslRootCert) ||
    urlEnablesTls ||
    (!urlExplicitlyDisablesTls && envSslModeEnablesTls);

  if (!needsSsl) {
    return undefined;
  }

  const caSource =
    envSslRootCert ||
    (urlSslRootCert && urlSslRootCert.toLowerCase() !== "system"
      ? urlSslRootCert
      : undefined);

  return {
    rejectUnauthorized: true,
    ...(caSource ? { ca: readPemOrFile(caSource) } : {}),
    ...(urlSslCert ? { cert: readPemOrFile(urlSslCert) } : {}),
    ...(urlSslKey ? { key: readPemOrFile(urlSslKey) } : {}),
  };
}

/**
 * Standart node-postgres SSL yapılandırması: Coolify içi TLS'siz Postgres'i
 * bozmadan, TLS etkinleştiğinde (PGSSL=true, PGSSLMODE, ssl/sslmode parametreleri,
 * Neon veya PGSSLROOTCERT) sertifika doğrulamasını (rejectUnauthorized: true)
 * her zaman zorunlu kılar.
 */
export function resolvePgSslConfig(
  url: string,
  env: NodeJS.ProcessEnv = process.env,
): PgSslConfig {
  return resolveSslFromParsed(parseUrlSslInfo(url), env);
}

/**
 * pg@8.22+ ConnectionParameters, connectionString içindeki ssl/sslmode/uselibpqcompat
 * parametrelerini config.ssl üzerine yazar. Bu yardımcı önce TLS politikasını
 * hesaplar, ardından URL'deki SSL sorgu parametrelerini temizleyerek pg.Pool'un
 * rejectUnauthorized: true ve özel CA (ca) ayarlarını ezmesini engeller.
 */
export function buildPgPoolConfig(
  url: string,
  env: NodeJS.ProcessEnv = process.env,
): PgPoolConfig {
  const info = parseUrlSslInfo(url);
  const ssl = resolveSslFromParsed(info, env);
  const config: PgPoolConfig = {
    connectionString: info.sanitizedUrl,
    ssl: ssl ?? false,
  };
  if (info.sslnegotiation) {
    config.sslnegotiation = info.sslnegotiation;
  }
  return config;
}
