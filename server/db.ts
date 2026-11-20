import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";
import { buildPgPoolConfig } from "./db-ssl";

export {
  buildPgPoolConfig,
  resolvePgSslConfig,
  stripPgSslQueryParams,
} from "./db-ssl";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Standart node-postgres sürücüsü: hem Coolify/yerel Postgres hem de Neon
// (standart bağlantı dizesiyle) ile çalışır. SSL etkinleştiğinde TLS sertifika
// doğrulaması (rejectUnauthorized: true) açık kalır ve URL sorgu parametrelerinin
// özel CA / doğrulama ayarlarını ezmesi engellenir; özel CA için PGSSLROOTCERT
// kullanılabilir.
export const pool = new pg.Pool(buildPgPoolConfig(process.env.DATABASE_URL));

pool.on("error", (err) => {
  console.error("[db] Unexpected idle PostgreSQL client error:", err);
});

export const db = drizzle(pool, { schema });
