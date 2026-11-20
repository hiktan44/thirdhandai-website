import type { Request, Response, NextFunction } from "express";

const SENSITIVE_API_LOG_PREFIXES = [
  "/api/admin",
  "/api/contact-messages",
  "/api/user",
];

function normalizeRequestPath(reqPath: string): string {
  return reqPath.replace(/\/{2,}/g, "/").toLowerCase();
}

export function isApiPath(reqPath: string): boolean {
  const normalized = normalizeRequestPath(reqPath);
  return normalized === "/api" || normalized.startsWith("/api/");
}

export function isSensitiveApiPath(reqPath: string): boolean {
  const normalized = normalizeRequestPath(reqPath);
  return SENSITIVE_API_LOG_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  );
}

export function createApiRequestLogger(writeLog: (message: string) => void) {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const reqPath = req.path;
    const isApi = isApiPath(reqPath);
    const skipBodyLog = !isApi || isSensitiveApiPath(reqPath);
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    if (!skipBodyLog) {
      const originalResJson = res.json;
      res.json = function (bodyJson, ...args) {
        capturedJsonResponse = bodyJson;
        return originalResJson.apply(res, [bodyJson, ...args]);
      };
    }

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (isApi) {
        let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
        if (!skipBodyLog && capturedJsonResponse !== undefined) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }

        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }

        writeLog(logLine);
      }
    });

    next();
  };
}
