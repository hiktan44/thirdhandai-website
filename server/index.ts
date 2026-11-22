import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { ensureProjectsSeeded } from "./ensure-projects";
import { ensureAdminUser } from "./admin-auth";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";
import { resolveSessionSecret } from "./session-config";
import { securityHeaders } from "./security-headers";
import { createApiRequestLogger } from "./request-logger";
import { registerLanding } from "./landing";

const sessionSecret = resolveSessionSecret(process.env, (msg) => log(msg, "security"));
const PgStore = connectPgSimple(session);

const app = express();
// Coolify gibi bir reverse proxy arkasında çalışırken, güvenli (secure)
// oturum çerezinin gönderilebilmesi için proxy'ye güvenmemiz gerekir. Bu ayar
// olmadan HTTPS proxy + HTTP container durumunda oturum tutmaz ("Yetkisiz Erişim").
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(securityHeaders);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration (kalıcı PostgreSQL oturum deposu)
app.use(
  session({
    store: new PgStore({
      pool,
      createTableIfMissing: true,
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // "auto": bağlantı HTTPS ise güvenli çerez, değilse normal — trust proxy ile
      // proxy'nin X-Forwarded-Proto başlığına göre doğru çalışır.
      secure: "auto",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(createApiRequestLogger(log));

(async () => {
  const server = await registerRoutes(app);

  // Yönetici kaydını Coolify'daki ADMIN_USERNAME / ADMIN_PASSWORD ile eşitle.
  await ensureAdminUser();

  // Açılışta ön sayfa projelerini veritabanına yükle (boşsa ya da yalnızca
  // eski demo projeleri varsa). Böylece admin panel projeleri elle komut
  // çalıştırmadan görüntüler ve sıralanabilir.
  await ensureProjectsSeeded();

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status =
      typeof err?.status === "number"
        ? err.status
        : typeof err?.statusCode === "number"
          ? err.statusCode
          : 500;
    const isServerError = status >= 500;
    if (isServerError) {
      console.error("[error]", err);
    }
    if (res.headersSent) {
      return;
    }
    const message = isServerError
      ? "Internal Server Error"
      : err?.message || "Bad Request";
    res.status(status).json({ message });
  });

  // Yeni ana sayfa: "/" isteğini React uygulamasından önce karşılar.
  registerLanding(app);

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5001
  // this serves both the API and the client.
  const port = Number(process.env.PORT) || 5001;
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
