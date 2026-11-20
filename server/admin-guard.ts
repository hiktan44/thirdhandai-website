import type { Request, Response, NextFunction } from "express";
import { passwordVersion, safeEqual } from "./password";

export type AdminAccount = { id: number; username: string; password: string };

/**
 * Her yönetici isteğinde oturumu hem (tanımlıysa) Coolify ADMIN_USERNAME
 * ortam değişkeniyle hem de güncel veritabanı kaydı ve şifre sürüm parmak
 * iziyle yeniden doğrular. Silinmiş, adı değişmiş, şifresi döndürülmüş
 * (ADMIN_PASSWORD rotasyonu) veya eski biçimli oturumlar anında reddedilir.
 */
export function createAdminGuard(
  getAccount: (id: number) => Promise<AdminAccount | undefined>,
  getConfiguredAdminUsername: () => string | null = () => null,
  ensureSynced?: () => Promise<void>,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const identity = req.session?.user;
    if (
      !identity ||
      !Number.isSafeInteger(identity.id) ||
      identity.id <= 0 ||
      typeof identity.username !== "string" ||
      identity.username.length === 0 ||
      typeof identity.passwordVersion !== "string" ||
      identity.passwordVersion.length === 0
    ) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const configuredUsername = getConfiguredAdminUsername();
    if (configuredUsername && !safeEqual(identity.username, configuredUsername)) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      if (ensureSynced) {
        await ensureSynced();
      }
      const account = await getAccount(identity.id);
      if (
        !account ||
        !safeEqual(account.username, identity.username) ||
        typeof account.password !== "string" ||
        account.password.length === 0 ||
        !safeEqual(passwordVersion(account.password), identity.passwordVersion)
      ) {
        return res.status(401).json({ message: "Not authenticated" });
      }
    } catch {
      return res.status(503).json({ message: "Yönetici hesabı doğrulanamıyor." });
    }

    next();
  };
}
