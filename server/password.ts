import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

// Şifreler veritabanında "scrypt:<tuz>:<özet>" biçiminde tutulur; düz metin
// saklanmaz. Eski kayıtlar düz metindi, onlar da doğrulanabilir ve açılışta
// özete çevrilir. scrypt eşzamansız çağrılır: eşzamanlı sürüm her giriş
// denemesinde olay döngüsünü kilitleyip tüm siteyi yavaşlatıyordu.
const PREFIX = "scrypt";
const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keylen: number,
) => Promise<Buffer>;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scryptAsync(password, salt, 64)).toString("hex");
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

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  if (!isHashed(stored)) return safeEqual(password, stored);
  const [, salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  return safeEqual((await scryptAsync(password, salt, 64)).toString("hex"), hash);
}
