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

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
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

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message, privacyAccepted } = req.body;
  
  if (!name || !email || !subject || !message || !privacyAccepted) {
    return res.status(400).json({ error: 'Tüm alanlar zorunludur' });
  }
  
  const newMessage = {
    id: storage.messages.length + 1,
    name,
    email,
    subject,
    message,
    privacyAccepted,
    createdAt: new Date().toISOString()
  };
  
  storage.messages.push(newMessage);
  
  // Burada normalde email gönderimi yapılır
  // Netlify'de SendGrid veya başka bir servis kullanabilirsiniz
  
  res.json({ success: true, message: 'Mesajınız başarıyla gönderildi' });
});

// Admin routes - Netlify'de authentication için Netlify Identity kullanabilirsiniz
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  // Basit authentication - production'da Netlify Identity kullanın
  if (username === 'hikmet@texmart.com' && password === 'Malatya4462') {
    res.json({ 
      success: true, 
      user: { id: 1, username: 'hikmet@texmart.com' } 
    });
  } else {
    res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'API endpoint bulunamadı' });
});

// Netlify Functions handler
export const handler = serverless(app);