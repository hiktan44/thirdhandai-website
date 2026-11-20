import { randomBytes } from "crypto";

export const MIN_SESSION_SECRET_BYTES = 32;

const KNOWN_PLACEHOLDER_SECRETS = new Set([
  "your-secret-key-here",
  "your-super-secret-production-key-here",
  "replace-with-openssl-rand-hex-32",
  "changeme",
  "change-me",
  "secret",
]);

/**
 * Üretimde (NODE_ENV=production) eksik, 32 bayttan kısa veya bilinen yer tutucu
 * SESSION_SECRET değerleriyle açılışı reddeder (fail-closed).
 * Geliştirme/test ortamlarında uyarı verip geçici rastgele sır üretir.
 */
export function resolveSessionSecret(
  env: NodeJS.ProcessEnv = process.env,
  onWarn: (message: string) => void = (msg) => console.warn(msg),
): string {
  const isProduction = env.NODE_ENV === "production";
  const rawSecret = env.SESSION_SECRET?.trim();
  const byteLength = rawSecret ? Buffer.byteLength(rawSecret, "utf8") : 0;
  const isKnownPlaceholder = rawSecret
    ? KNOWN_PLACEHOLDER_SECRETS.has(rawSecret.toLowerCase())
    : false;
  const isStrongSecret =
    Boolean(rawSecret) &&
    byteLength >= MIN_SESSION_SECRET_BYTES &&
    !isKnownPlaceholder;

  if (isStrongSecret) {
    return rawSecret!;
  }

  if (isProduction) {
    throw new Error(
      "SESSION_SECRET must be set to a strong non-placeholder secret of at least 32 bytes in production.",
    );
  }

  onWarn(
    rawSecret
      ? "⚠️  [session] SESSION_SECRET 32 bayttan kısa veya bilinen yer tutucu; geliştirme ortamında geçici rastgele sır kullanılıyor."
      : "⚠️  [session] SESSION_SECRET tanımlı değil; geliştirme ortamında geçici rastgele sır kullanılıyor.",
  );

  return randomBytes(32).toString("hex");
}
