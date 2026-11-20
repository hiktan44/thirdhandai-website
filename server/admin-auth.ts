import type { User } from "@shared/schema";
import { storage } from "./storage";
import { hashPassword, isHashed, safeEqual, verifyPassword } from "./password";

// Yönetici bilgileri Coolify'daki ADMIN_USERNAME / ADMIN_PASSWORD ortam
// değişkenlerinden gelir. Tanımlıysa tek doğruluk kaynağı onlardır: şifreyi
// değiştirmek için Coolify'da ADMIN_PASSWORD güncellenip yeniden deploy edilir.
// Tanımlı değilse veritabanındaki kayıtla giriş yapılır (eski davranış).
function envAdmin() {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  return username && password ? { username, password } : null;
}

let syncedSignature: string | null = null;
let inFlightSync: Promise<void> | null = null;

function currentEnvAdminSignature(): string | null {
  const admin = envAdmin();
  return admin ? `${admin.username}\0${admin.password}` : null;
}

export function getConfiguredAdminUsername(): string | null {
  return envAdmin()?.username ?? null;
}

export async function authenticateAdmin(
  username: unknown,
  password: unknown,
): Promise<User | null> {
  if (typeof username !== "string" || typeof password !== "string") return null;

  const admin = envAdmin();
  if (admin) {
    const userOk = safeEqual(username.trim(), admin.username);
    const passOk = safeEqual(password, admin.password);
    if (!userOk || !passOk) return null;
    const existing = await storage.getUserByUsername(admin.username);
    if (!existing) {
      const created = await storage.createUser({
        username: admin.username,
        password: await hashPassword(admin.password),
      });
      syncedSignature = `${admin.username}\0${admin.password}`;
      return created;
    }
    if (!(await verifyPassword(admin.password, existing.password))) {
      const nextHash = await hashPassword(admin.password);
      await storage.updateUserPassword(existing.id, nextHash);
      syncedSignature = `${admin.username}\0${admin.password}`;
      return { ...existing, password: nextHash };
    }
    syncedSignature = `${admin.username}\0${admin.password}`;
    return existing;
  }

  const user = await storage.getUserByUsername(username);
  return user && (await verifyPassword(password, user.password)) ? user : null;
}

async function syncAdminUserInternal(): Promise<void> {
  for (const user of await storage.getUsers()) {
    if (!isHashed(user.password)) {
      await storage.updateUserPassword(user.id, await hashPassword(user.password));
      console.log(`🔐 [admin] "${user.username}" şifresi özete çevrildi.`);
    }
  }

  const admin = envAdmin();
  if (!admin) {
    console.warn(
      "⚠️  [admin] ADMIN_USERNAME / ADMIN_PASSWORD tanımlı değil; giriş veritabanındaki kayıtla yapılır.",
    );
    return;
  }

  const existing = await storage.getUserByUsername(admin.username);
  if (!existing) {
    await storage.createUser({
      username: admin.username,
      password: await hashPassword(admin.password),
    });
    console.log(`✅ [admin] "${admin.username}" yönetici kaydı oluşturuldu.`);
  } else if (!(await verifyPassword(admin.password, existing.password))) {
    await storage.updateUserPassword(existing.id, await hashPassword(admin.password));
    console.log(`✅ [admin] "${admin.username}" şifresi Coolify'daki değerle eşitlendi.`);
  }
  syncedSignature = `${admin.username}\0${admin.password}`;
}

/**
 * Açılıştaki ensureAdminUser() geçici bir DB hatası nedeniyle başarısız olduysa
 * veya çalışma zamanında ADMIN_PASSWORD değiştiyse, yönetici isteği kabul
 * edilmeden önce DB şifre özetinin güncel env değeriyle eşitlenmesini garanti eder.
 * Eşitleme tamamlandıktan sonra O(1) maliyetle hemen döner.
 */
export async function ensureAdminSynced(): Promise<void> {
  const sig = currentEnvAdminSignature();
  if (!sig || syncedSignature === sig) {
    return;
  }
  if (!inFlightSync) {
    inFlightSync = syncAdminUserInternal().finally(() => {
      inFlightSync = null;
    });
  }
  await inFlightSync;
}

// Sunucu açılışında çağrılır: yönetici kaydını Coolify'daki şifreyle eşitler
// ve veritabanında düz metin kalan şifreleri özete çevirir.
export async function ensureAdminUser() {
  try {
    await syncAdminUserInternal();
  } catch (error) {
    // Açılışı bloklamamak için hatayı yalnızca logla (ama görünür olsun).
    console.error("❌ [admin] Yönetici kaydı eşitlenemedi:", error);
  }
}
