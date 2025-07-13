import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, message: "Mesajınız başarıyla gönderildi!" });
    } catch (error) {
      res.status(400).json({ success: false, message: "Geçersiz veri gönderildi." });
    }
  });

  // Get contact messages (admin only)
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Mesajlar alınamadı." });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (user && user.password === password) {
        res.json({ success: true, message: "Giriş başarılı!" });
      } else {
        res.status(401).json({ success: false, message: "Kullanıcı adı veya şifre hatalı!" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Sunucu hatası." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
