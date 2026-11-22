import type { Express } from "express";
import fs from "fs";
import path from "path";

// Ana sayfa ("/") artık tek dosyalık yeni tanıtım sayfasıdır:
// client/public/landing.html (derlemede dist/public/landing.html olur).
// Eski React ana sayfası /klasik adresinde durur.
//
// Dosya bulunamazsa hiçbir şey yapmaz; istek eski akışa (React uygulaması)
// düşer, yani site açılmaya devam eder.
export function resolveLandingFile(baseDir: string = import.meta.dirname): string | null {
  const candidates = [
    path.resolve(baseDir, "public", "landing.html"), // üretim: dist/public
    path.resolve(baseDir, "..", "client", "public", "landing.html"), // geliştirme
  ];
  return candidates.find((file) => fs.existsSync(file)) ?? null;
}

export function registerLanding(app: Express, baseDir?: string) {
  app.get("/", (_req, res, next) => {
    const file = resolveLandingFile(baseDir);
    if (!file) return next();
    // Sayfa her yayında değişebilir; tarayıcı eski kopyayı göstermesin.
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(file, (err) => {
      if (err) next(err);
    });
  });
}
