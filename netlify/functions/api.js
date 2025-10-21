// Netlify Functions API handler
// Bu dosya tüm /api/* isteklerini yönetir

import express from 'express';
import serverless from 'serverless-http';

// Storage layer - Netlify'de environment variable kullanacağız
const storage = {
  whatsappSettings: {
    id: 1,
    phoneNumber: process.env.WHATSAPP_PHONE || "905306042829",
    welcomeMessage: process.env.WHATSAPP_MESSAGE || "Merhaba! Size nasıl yardımcı olabilirim?",
    enabled: process.env.WHATSAPP_ENABLED !== 'false'
  },
  
  projects: [
    {
      id: 1,
      title: "fasheone.com",
      description: "E-ticaret platformu için yapay zeka destekli ürün önerme sistemi",
      link: "https://fasheone.com",
      image: "/placeholder.svg",
      category: "AI & E-Commerce",
      orderIndex: 1
    },
    {
      id: 2,
      title: "AI Müşteri Destek Botu",
      description: "7/24 aktif akıllı müşteri destek chatbot sistemi",
      link: "#",
      image: "/placeholder.svg",
      category: "AI Chatbot",
      orderIndex: 2
    }
  ],
  
  videos: [
    {
      id: 1,
      title: "Third Hand AI Agency Tanıtım",
      description: "Yapay zeka çözümlerimizle işinizi büyütün",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "/placeholder.svg",
      orderIndex: 1
    }
  ],
  
  messages: []
};

const app = express();
app.use(express.json());

// CORS middleware - Restrict to specific domains
const allowedOrigins = [
  'https://thirdhandai.com',
  'https://www.thirdhandai.com',
  process.env.URL || 'http://localhost:5000', // Netlify preview URL
  'http://localhost:5000',
  'http://localhost:5173' // Vite dev server
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Check if the origin is in the allowedOrigins list
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Routes
app.get('/api/whatsapp-settings', (req, res) => {
  res.json(storage.whatsappSettings);
});

app.get('/api/projects', (req, res) => {
  res.json(storage.projects);
});

app.get('/api/videos', (req, res) => {
  res.json(storage.videos);
});

// Simple input sanitization function
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent XSS
    .trim()
    .substring(0, 1000); // Limit length
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message, privacyAccepted } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message || !privacyAccepted) {
    return res.status(400).json({ error: 'Tüm alanlar zorunludur' });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Geçersiz e-posta adresi' });
  }

  // Sanitize inputs
  const sanitizedMessage = {
    id: storage.messages.length + 1,
    name: sanitizeInput(name),
    email: sanitizeInput(email),
    subject: sanitizeInput(subject),
    message: sanitizeInput(message),
    privacyAccepted: Boolean(privacyAccepted),
    createdAt: new Date().toISOString()
  };

  storage.messages.push(sanitizedMessage);

  // Burada normalde email gönderimi yapılır
  // Netlify'de SendGrid veya başka bir servis kullanabilirsiniz

  res.json({ success: true, message: 'Mesajınız başarıyla gönderildi' });
});

// Admin routes - Use environment variables for credentials
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  // Rate limiting check (basic implementation)
  // In production, use a proper rate limiting library

  // Use environment variables for admin credentials
  const adminUsername = process.env.ADMIN_USERNAME || 'hikmet@texmart.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Malatya4462';

  // Validate credentials
  if (username === adminUsername && password === adminPassword) {
    // In production, use JWT tokens or session management
    res.json({
      success: true,
      user: { id: 1, username: adminUsername },
      // Don't send sensitive data in the response
      token: 'demo-token-replace-with-jwt'
    });
  } else {
    // Add delay to prevent brute force attacks
    setTimeout(() => {
      res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
    }, 1000);
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'API endpoint bulunamadı' });
});

// Netlify Functions handler
export const handler = serverless(app);