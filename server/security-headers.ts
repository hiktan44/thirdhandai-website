import type { Request, Response, NextFunction } from "express";

// Eksik güvenlik başlıklarını ekler; daha önce (ters vekil ya da başka bir
// katman tarafından) konmuş bir başlığı EZMEZ.
//
// Permissions-Policy: ana sayfadaki SesYaz sesli asistanı
// (client/index.html -> https://www.sesyaz.com/voice-bot.js) mikrofon izniyle
// bir iframe açar. Bu yüzden mikrofon kapatılmaz; yalnızca site kendisi ve
// SesYaz için açık bırakılır. SesYaz adresi değişirse buradaki adresi de
// güncelleyin.
const BASE_HEADERS: Record<string, string> = {
  "X-Frame-Options": "SAMEORIGIN",
  "Content-Security-Policy": "frame-ancestors 'self'",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    'camera=(), geolocation=(), payment=(), usb=(), microphone=(self "https://www.sesyaz.com")',
};

const HSTS_VALUE = "max-age=31536000";

export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  for (const [name, value] of Object.entries(BASE_HEADERS)) {
    if (!res.getHeader(name)) res.setHeader(name, value);
  }
  // HSTS yalnızca HTTPS'te (trust proxy açık olduğu için Traefik'in
  // X-Forwarded-Proto başlığına göre req.secure doğru hesaplanır).
  if (req.secure && !res.getHeader("Strict-Transport-Security")) {
    res.setHeader("Strict-Transport-Security", HSTS_VALUE);
  }
  next();
}
