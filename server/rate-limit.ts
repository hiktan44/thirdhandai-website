import type { Request, Response, NextFunction } from "express";

// Basit, bellek içi, IP başına sabit pencereli hız sınırlayıcı. Uygulama tek
// kopya çalışıyor ve oturumlar da bellekte (MemoryStore) tutuluyor; bu yüzden
// ek altyapı (Redis vb.) gerektirmez. IP, "trust proxy" ayarı sayesinde
// Traefik'in eklediği X-Forwarded-For değerinden req.ip ile okunur.
interface RateLimitOptions {
  windowMs: number;
  max: number;
  message: string;
}

export function createRateLimiter({ windowMs, max, message }: RateLimitOptions) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  // Süresi dolan kayıtları temizle (bellek şişmesin).
  const cleanup = setInterval(() => {
    const now = Date.now();
    hits.forEach((entry, key) => {
      if (entry.resetAt <= now) hits.delete(key);
    });
  }, windowMs);
  cleanup.unref?.();

  return function rateLimit(req: Request, res: Response, next: NextFunction) {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    let entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }
    entry.count += 1;
    if (entry.count > max) {
      res.setHeader("Retry-After", String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({ success: false, message });
    }
    next();
  };
}

// Yönetici girişi: IP başına 15 dakikada en fazla 10 deneme (kaba kuvvet).
export const adminLoginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Çok fazla giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.",
});

// İletişim formu: IP başına 15 dakikada en fazla 5 mesaj (spam / DB doldurma).
export const contactLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Çok fazla mesaj gönderildi. Lütfen biraz sonra tekrar deneyin.",
});
