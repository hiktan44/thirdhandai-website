import fs from "fs";

export type PgSslConfig = { rejectUnauthorized: true; ca?: string } | undefined;

const TLS_SSLMODES = new Set(["require", "verify-ca", "verify-full"]);

function urlRequiresSsl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const sslmode = parsed.searchParams.get("sslmode")?.toLowerCase();
    if (sslmode && TLS_SSLMODES.has(sslmode)) {
      return true;
    }
    if (parsed.hostname.toLowerCase().endsWith(".neon.tech")) {
      return true;
    }
    return false;
  } catch {
    return (
      /[?&]sslmode=(?:require|verify-ca|verify-full)(?:&|$)/i.test(url) ||
      /\.neon\.tech(?:[:/?]|$)/i.test(url)
    );
  }
}

/**
 * Standart node-postgres SSL yapılandırması: Coolify içi TLS'siz Postgres'i
 * bozmadan, TLS etkinleştiğinde (PGSSL=true, sslmode=require|verify-ca|verify-full,
 * Neon veya PGSSLROOTCERT) sertifika doğrulamasını (rejectUnauthorized: true)
 * her zaman zorunlu kılar.
 */
export function resolvePgSslConfig(
  url: string,
  env: NodeJS.ProcessEnv = process.env,
): PgSslConfig {
  const sslRootCert = env.PGSSLROOTCERT?.trim();
  const needsSsl =
    env.PGSSL === "true" || urlRequiresSsl(url) || Boolean(sslRootCert);

  if (!needsSsl) {
    return undefined;
  }

  return {
    rejectUnauthorized: true,
    ...(sslRootCert
      ? {
          ca: sslRootCert.includes("-----BEGIN")
            ? sslRootCert
            : fs.readFileSync(sslRootCert, "utf8"),
        }
      : {}),
  };
}
