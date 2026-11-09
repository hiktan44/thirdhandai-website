import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { ensureProjectsSeeded } from "./ensure-projects";
import { ensureAdminUser } from "./admin-auth";
import session from "express-session";
import MemoryStore from "memorystore";
import { randomBytes } from "crypto";
import { securityHeaders } from "./security-headers";

const MemoryStoreSession = MemoryStore(session);

// SESSION_SECRET tanımlı değilse herkesin bildiği sabit bir değer yerine her
// açılışta rastgele bir sır üretilir. Oturumlar zaten bellekte (MemoryStore)
// tutulduğu için yeniden başlatmada düşüyordu; davranış değişmez.
const sessionSecret = process.env.SESSION_SECRET || randomBytes(32).toString("hex");
if (!process.env.SESSION_SECRET) {
  console.warn("⚠️  [session] SESSION_SECRET tanımlı değil; geçici rastgele sır kullanılıyor.");
}

const app = express();
// Coolify/Netlify gibi bir reverse proxy arkasında çalışırken, güvenli (secure)
// oturum çerezinin gönderilebilmesi için proxy'ye güvenmemiz gerekir. Bu ayar
// olmadan HTTPS proxy + HTTP container durumunda oturum tutmaz ("Yetkisiz Erişim").
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(securityHeaders);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(
  session({
    store: new MemoryStoreSession({
      checkPeriod: 86400000, // prune expired entries every 24h
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

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Yönetici kaydını Coolify'daki ADMIN_USERNAME / ADMIN_PASSWORD ile eşitle.
  await ensureAdminUser();

  // Açılışta ön sayfa projelerini veritabanına yükle (boşsa ya da yalnızca
  // eski demo projeleri varsa). Böylece admin panel projeleri elle komut
  // çalıştırmadan görüntüler ve sıralanabilir.
  await ensureProjectsSeeded();

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

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
