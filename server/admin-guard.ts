import type { Request, Response, NextFunction } from "express";
import { safeEqual } from "./password";

export type AdminAccount = { id: number; username: string };

/**
 * Her yönetici isteğinde oturumu hem (tanımlıysa) Coolify ADMIN_USERNAME
 * ortam değişkeniyle hem de güncel veritabanı kaydıyla yeniden doğrular.
 * Silinmiş, adı değişmiş veya eski yönetici oturumları anında reddedilir.
 */
export function createAdminGuard(
  getAccount: (id: number) => Promise<AdminAccount | undefined>,
  getConfiguredAdminUsername: () => string | null = () => null,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const identity = req.session?.user;
    if (
      !identity ||
      !Number.isSafeInteger(identity.id) ||
      identity.id <= 0 ||
      typeof identity.username !== "string" ||
      identity.username.length === 0
    ) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const configuredUsername = getConfiguredAdminUsername();
    if (configuredUsername && !safeEqual(identity.username, configuredUsername)) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const account = await getAccount(identity.id);
      if (!account || !safeEqual(account.username, identity.username)) {
        return res.status(401).json({ message: "Not authenticated" });
      }
    } catch {
      return res.status(503).json({ message: "Yönetici hesabı doğrulanamıyor." });
    }

    next();
  };
}
