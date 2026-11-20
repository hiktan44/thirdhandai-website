export type VerifiedImageMime =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp";

export const ALLOWED_IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
]);

export const ALLOWED_IMAGE_MIMES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
]);

/**
 * Yüklenen dosyanın ham bayt imzasından (magic bytes) gerçek görsel türünü
 * belirler. SVG/HTML gibi sahte MIME başlıklı yüklemeleri engeller.
 */
export function detectImageMime(buffer: Buffer): VerifiedImageMime | null {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }

  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "image/png";
  }

  if (buffer.length >= 6) {
    const header = buffer.subarray(0, 6).toString("ascii");
    if (header === "GIF87a" || header === "GIF89a") {
      return "image/gif";
    }
  }

  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp";
  }

  return null;
}

export function parsePositiveInt(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const num = Number(raw);
  return Number.isSafeInteger(num) && num > 0 ? num : null;
}

const SAFE_DATA_IMAGE_RE =
  /^data:image\/(?:jpeg|png|gif|webp);base64,[A-Za-z0-9+/=]+$/;

const ASCII_CONTROL_CHARS_RE = /[\u0000-\u001f\u007f]/;

export function isSafeUrl(
  value: string,
  options: { allowDataImage?: boolean; allowHash?: boolean } = {},
): boolean {
  if (ASCII_CONTROL_CHARS_RE.test(value)) return false;
  const trimmed = value.trim();
  if (trimmed === "") return true;
  if (options.allowHash && trimmed === "#") return true;
  if (
    trimmed.startsWith("/") &&
    !trimmed.startsWith("//") &&
    !trimmed.startsWith("/\\")
  ) {
    return true;
  }
  if (options.allowDataImage && SAFE_DATA_IMAGE_RE.test(trimmed)) return true;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
