import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";
import { resolvePgSslConfig } from "./db-ssl";

export { resolvePgSslConfig } from "./db-ssl";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Standart node-postgres sürücüsü: hem Coolify/yerel Postgres hem de Neon
// (standart bağlantı dizesiyle) ile çalışır. SSL etkinleştiğinde TLS sertifika
// doğrulaması (rejectUnauthorized: true) açık kalır; özel CA için PGSSLROOTCERT
// kullanılabilir.
const url = process.env.DATABASE_URL;
const ssl = resolvePgSslConfig(url);

export const pool = new pg.Pool({
  connectionString: url,
  ssl,
});

pool.on("error", (err) => {
  console.error("[db] Unexpected idle PostgreSQL client error:", err);
});

export const db = drizzle(pool, { schema });
