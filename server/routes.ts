import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  authenticateAdmin,
  ensureAdminSynced,
  getConfiguredAdminUsername,
} from "./admin-auth";
import { createAdminGuard } from "./admin-guard";
import { passwordVersion } from "./password";
import { adminLoginLimiter, contactLimiter } from "./rate-limit";
import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_IMAGE_MIMES,
  detectImageMime,
  isSafeUrl,
  parsePositiveInt,
} from "./validation";
import {
  insertContactMessageSchema,
  insertProjectSchema,
  insertVideoSchema,
  insertAiModelSchema,
  insertBlogPostSchema,
} from "@shared/schema";
import multer from "multer";
import path from "path";
import { z } from "zod";

// Görselleri belleğe alıp base64 data-URI olarak veritabanına yazıyoruz.
// Diske yazmak Coolify gibi konteynerlerde kalıcı değildi (her deploy'da
// siliniyordu); data-URI ise proje kaydının image alanında DB'de kalıcı durur.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype.toLowerCase();

    if (ALLOWED_IMAGE_EXTENSIONS.has(ext) && ALLOWED_IMAGE_MIMES.has(mime)) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
});

const optionalSafeUrl = (options?: {
  allowDataImage?: boolean;
  allowHash?: boolean;
}) =>
  z
    .string()
    .refine((value) => isSafeUrl(value, options), {
      message: "Unsupported URL protocol",
    })
    .nullable()
    .optional();

const requiredSafeUrl = () =>
  z
    .string()
    .trim()
    .min(1)
    .refine((value) => isSafeUrl(value, { allowDataImage: false, allowHash: false }), {
      message: "Unsupported URL protocol",
    });

// İletişim formu için üst uzunluk sınırları (alan şeması sınırsız metindi;
// tek istekte büyük veri yazılıp veritabanı doldurulabiliyordu).
const contactMessageInput = insertContactMessageSchema.extend({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  subject: z.string().trim().min(1).max(300),
  message: z.string().trim().min(1).max(10000),
});

const projectInputSchema = insertProjectSchema.extend({
  link: optionalSafeUrl({ allowHash: true }),
  image: optionalSafeUrl({ allowDataImage: true }),
});

const videoInputSchema = insertVideoSchema.extend({
  videoUrl: requiredSafeUrl(),
  thumbnail: optionalSafeUrl({ allowDataImage: true }),
});

const blogPostInputSchema = insertBlogPostSchema.extend({
  coverImage: optionalSafeUrl({ allowDataImage: true }),
});

const whatsappSettingsInputSchema = z.object({
  phoneNumber: z.string().trim().min(1).max(40),
  welcomeMessage: z.string().max(1000).nullable().optional(),
  enabled: z.boolean().optional(),
});

// Extend session to include user data
declare module "express-session" {
  interface SessionData {
    user?: {
      id: number;
      username: string;
      passwordVersion: string;
    };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/site-visit-context", (req, res) => {
    res.set("Cache-Control", "private, no-store").vary("Cookie");
    res.sendStatus(req.session?.user ? 409 : 204);
  });

  const requireAdmin = createAdminGuard(
    (id) => storage.getUser(id),
    getConfiguredAdminUsername,
    ensureAdminSynced,
  );

  // Contact form submission
  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      const validatedData = contactMessageInput.parse(req.body);
      await storage.createContactMessage(validatedData);
      res.json({ success: true, message: "Mesajınız başarıyla gönderildi!" });
    } catch {
      res.status(400).json({ success: false, message: "Geçersiz veri gönderildi." });
    }
  });

  // Get contact messages (admin only)
  // Bu uç oturum kontrolü olmadan herkese tüm iletişim mesajlarını
  // (ad, e-posta, mesaj) döndürüyordu. Panel /api/admin/messages kullanır.
  app.get("/api/contact-messages", requireAdmin, async (_req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch {
      res.status(500).json({ message: "Mesajlar alınamadı." });
    }
  });

  // Admin login
  app.post("/api/admin/login", adminLoginLimiter, async (req, res) => {
    try {
      const { username, password } = req.body ?? {};
      const user = await authenticateAdmin(username, password);

      if (user) {
        // Oturum sabitlemeye (session fixation) karşı girişte yeni oturum kimliği.
        req.session.regenerate((err) => {
          if (err) {
            return res.status(500).json({ success: false, message: "Sunucu hatası." });
          }
          req.session.user = {
            id: user.id,
            username: user.username,
            passwordVersion: passwordVersion(user.password),
          };
          req.session.save((saveErr) => {
            if (saveErr) {
              return res.status(500).json({ success: false, message: "Sunucu hatası." });
            }
            res.json({ success: true, message: "Giriş başarılı!" });
          });
        });
      } else {
        res.status(401).json({ success: false, message: "Kullanıcı adı veya şifre hatalı!" });
      }
    } catch {
      res.status(500).json({ success: false, message: "Sunucu hatası." });
    }
  });

  // Get current user
  app.get("/api/user", requireAdmin, (req, res) => {
    const { id, username } = req.session.user!;
    res.json({ id, username });
  });

  // File upload endpoint
  app.post("/api/admin/upload", requireAdmin, (req, res) => {
    upload.single("image")(req, res, (err: any) => {
      if (err) {
        const message =
          err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE"
            ? "File too large (max 5MB)"
            : "Only valid image files (JPEG, PNG, GIF, WebP) are allowed";
        return res.status(400).json({ message });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const verifiedMime = detectImageMime(req.file.buffer);
      if (!verifiedMime) {
        return res.status(400).json({ message: "Invalid image file content" });
      }
      // Görseli doğrulanmış MIME türü ile base64 data-URI olarak döndür —
      // proje/video kaydının image alanına yazılır ve DB'de kalıcı olur.
      const dataUri = `data:${verifiedMime};base64,${req.file.buffer.toString("base64")}`;
      return res.json({ url: dataUri });
    });
  });

  // Logout
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Logout failed" });
      } else {
        res.clearCookie("connect.sid", {
          httpOnly: true,
          sameSite: "lax",
          secure: req.secure,
        });
        res.json({ message: "Logged out successfully" });
      }
    });
  });

  // Admin routes - get contact messages
  app.get("/api/admin/messages", requireAdmin, async (_req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Public API routes
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/videos", async (_req, res) => {
    try {
      const videos = await storage.getVideos();
      res.json(videos);
    } catch {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  app.get("/api/ai-models", async (_req, res) => {
    try {
      const models = await storage.getAiModels();
      res.json(models);
    } catch {
      res.status(500).json({ message: "Failed to fetch AI models" });
    }
  });

  // Admin API routes - Projects
  app.post("/api/admin/projects", requireAdmin, async (req, res) => {
    try {
      const validatedData = projectInputSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json(project);
    } catch {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.put("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    const id = parsePositiveInt(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    try {
      const validatedData = projectInputSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, validatedData);
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } catch {
      res.status(400).json({ message: "Invalid project data" });
    }
  });

  app.delete("/api/admin/projects/:id", requireAdmin, async (req, res) => {
    const id = parsePositiveInt(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    try {
      const deleted = await storage.deleteProject(id);
      if (deleted) {
        res.json({ message: "Project deleted" });
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Admin API routes - Videos
  app.post("/api/admin/videos", requireAdmin, async (req, res) => {
    try {
      const validatedData = videoInputSchema.parse(req.body);
      const video = await storage.createVideo(validatedData);
      res.json(video);
    } catch {
      res.status(400).json({ message: "Invalid video data" });
    }
  });

  app.put("/api/admin/videos/:id", requireAdmin, async (req, res) => {
    const id = parsePositiveInt(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: "Invalid video id" });
    }

    try {
      const validatedData = videoInputSchema.partial().parse(req.body);
      const video = await storage.updateVideo(id, validatedData);
      if (video) {
        res.json(video);
      } else {
        res.status(404).json({ message: "Video not found" });
      }
    } catch {
      res.status(400).json({ message: "Invalid video data" });
    }
  });

  app.delete("/api/admin/videos/:id", requireAdmin, async (req, res) => {
    const id = parsePositiveInt(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: "Invalid video id" });
    }

    try {
      const deleted = await storage.deleteVideo(id);
      if (deleted) {
        res.json({ message: "Video deleted" });
      } else {
        res.status(404).json({ message: "Video not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to delete video" });
    }
  });

  // Admin API routes - AI Models
  app.post("/api/admin/ai-models", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertAiModelSchema.parse(req.body);
      const model = await storage.createAiModel(validatedData);
      res.json(model);
    } catch {
      res.status(400).json({ message: "Invalid AI model data" });
    }
  });

  app.put("/api/admin/ai-models/:id", requireAdmin, async (req, res) => {
    const id = parsePositiveInt(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: "Invalid AI model id" });
    }

    try {
      const validatedData = insertAiModelSchema.partial().parse(req.body);
      const model = await storage.updateAiModel(id, validatedData);
      if (model) {
        res.json(model);
      } else {
        res.status(404).json({ message: "AI model not found" });
      }
    } catch {
      res.status(400).json({ message: "Invalid AI model data" });
    }
  });

  app.delete("/api/admin/ai-models/:id", requireAdmin, async (req, res) => {
    const id = parsePositiveInt(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: "Invalid AI model id" });
    }

    try {
      const deleted = await storage.deleteAiModel(id);
      if (deleted) {
        res.json({ message: "AI model deleted" });
      } else {
        res.status(404).json({ message: "AI model not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to delete AI model" });
    }
  });

  // WhatsApp Settings API
  app.get("/api/whatsapp-settings", async (_req, res) => {
    try {
      const settings = await storage.getWhatsAppSettings();
      if (!settings) {
        return res.json({ phoneNumber: '', welcomeMessage: '', enabled: false });
      }
      res.json(settings);
    } catch {
      res.status(500).json({ error: "Failed to fetch WhatsApp settings" });
    }
  });

  app.post("/api/admin/whatsapp-settings", requireAdmin, async (req, res) => {
    const parsed = whatsappSettingsInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid WhatsApp settings" });
    }

    try {
      const settings = await storage.updateWhatsAppSettings(parsed.data);
      res.json(settings);
    } catch {
      res.status(500).json({ error: "Failed to update WhatsApp settings" });
    }
  });

  // Blog Posts API - Public routes
  // Herkese açık uçlar yalnızca yayındaki yazıları döndürür. Eskiden
  // ?published=true verilmeyince yalnızca TASLAKLAR dönüyordu; taslaklar
  // panelde /api/admin/blog-posts ile görülür.
  app.get("/api/blog-posts", async (_req, res) => {
    try {
      const posts = await storage.getBlogPosts(true);
      res.json(posts);
    } catch {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (post && post.published === true) {
        res.json(post);
      } else {
        res.status(404).json({ message: "Blog post not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Blog Posts API - Admin routes
  app.get("/api/admin/blog-posts", requireAdmin, async (_req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/admin/blog-posts", requireAdmin, async (req, res) => {
    try {
      const validatedData = blogPostInputSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  app.put("/api/admin/blog-posts/:id", requireAdmin, async (req, res) => {
    const id = parsePositiveInt(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: "Invalid blog post id" });
    }

    try {
      const validatedData = blogPostInputSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(id, validatedData);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "Blog post not found" });
      }
    } catch {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  app.delete("/api/admin/blog-posts/:id", requireAdmin, async (req, res) => {
    const id = parsePositiveInt(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: "Invalid blog post id" });
    }

    try {
      const deleted = await storage.deleteBlogPost(id);
      if (deleted) {
        res.json({ message: "Blog post deleted" });
      } else {
        res.status(404).json({ message: "Blog post not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
