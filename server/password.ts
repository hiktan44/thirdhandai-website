import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

// Şifreler veritabanında "scrypt:<tuz>:<özet>" biçiminde tutulur; düz metin
// saklanmaz. Eski kayıtlar düz metindi, onlar da doğrulanabilir ve açılışta
// özete çevrilir.
const PREFIX = "scrypt";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${PREFIX}:${salt}:${hash}`;
}

export function isHashed(stored: string): boolean {
  return stored.startsWith(`${PREFIX}:`);
}

// Sabit süreli karşılaştırma (zamanlama saldırısına karşı).
export function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}

export function verifyPassword(password: string, stored: string): boolean {
  if (!isHashed(stored)) return safeEqual(password, stored);
  const [, salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  return safeEqual(scryptSync(password, salt, 64).toString("hex"), hash);
}
