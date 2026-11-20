# Yeni Eklenen Özellikler 🎉

Bu dokümanda uygulamanıza eklenen yeni özellikler ve bunların nasıl kullanılacağı açıklanmaktadır.

## 📋 Eklenen Özellikler

### 1. 📝 Blog Sistemi

Tam özellikli blog yönetim sistemi eklendi.

**Özellikler:**
- ✅ Çoklu dil desteği (Türkçe/İngilizce)
- ✅ Admin panelinde CRUD işlemleri
- ✅ Yayın durumu kontrolü (Yayında/Taslak)
- ✅ Kategori ve etiket sistemi
- ✅ SEO dostu slug yapısı
- ✅ Kapak resmi desteği
- ✅ Sıralama özelliği

**Kullanım:**
1. Admin paneline giriş yapın
2. "Blog Yönetimi" sekmesine tıklayın
3. "Yeni Blog Yazısı" butonu ile yeni yazı ekleyin
4. Türkçe ve İngilizce içerikleri doldurun
5. "Yayınla" switch'ini aktif edin

**API Endpoints:**
- `GET /api/blog-posts?published=true` - Yayındaki yazıları listele
- `GET /api/blog-posts/:slug` - Yazı detayını getir
- `GET /api/admin/blog-posts` - Tüm yazıları listele (Admin)
- `POST /api/admin/blog-posts` - Yeni yazı oluştur (Admin)
- `PUT /api/admin/blog-posts/:id` - Yazı güncelle (Admin)
- `DELETE /api/admin/blog-posts/:id` - Yazı sil (Admin)

### 2. 🌍 Çoklu Dil Desteği (i18n)

React i18next ile tam çoklu dil desteği.

**Özellikler:**
- ✅ Türkçe ve İngilizce dil seçenekleri
- ✅ Otomatik dil algılama
- ✅ LocalStorage'da tercih saklama
- ✅ Kolay dil değiştirme (navbar'da 🌍 butonu)

**Kullanım:**
```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();
const currentLang = i18n.language; // 'tr' veya 'en'

// Çeviri kullanımı
<h1>{t('nav.home')}</h1>

// Dil değiştirme
i18n.changeLanguage('en');
```

**Çeviri Dosyaları:**
Çeviriler `/client/src/config/i18n.ts` dosyasında tanımlı.

### 3. 🌓 Dark Mode Tema Desteği

Açık/Koyu tema sistemi.

**Özellikler:**
- ✅ Açık ve koyu tema
- ✅ Sistem tercihini otomatik algılama
- ✅ LocalStorage'da tema saklama
- ✅ Navbar'da tema toggle butonu (☀️/🌙)

**Kullanım:**
```typescript
import { useTheme } from '@/contexts/ThemeContext';

const { theme, toggleTheme } = useTheme();

// Tema değiştirme
<button onClick={toggleTheme}>
  {theme === 'light' ? '🌙' : '☀️'}
</button>
```

### 4. 📱 Sosyal Medya Paylaşım

Blog yazıları için sosyal medya paylaşım butonları.

**Özellikler:**
- ✅ Facebook paylaşımı
- ✅ Twitter paylaşımı
- ✅ LinkedIn paylaşımı
- ✅ Email ile paylaşım
- ✅ Link kopyalama

**Kullanım:**
```typescript
import { SocialShare } from '@/components/SocialShare';

<SocialShare
  url="/blog/ornek-blog-yazisi"
  title="Blog Başlığı"
  description="Blog açıklaması"
/>
```

### 5. 🎨 Admin Dashboard Geliştirmeleri

**Yeni Özellikler:**
- ✅ Blog Yönetimi sekmesi
- ✅ Geliştirilmiş UI/UX
- ✅ Responsive tasarım
- ✅ Tab bazlı navigasyon

## 🗄️ Veritabanı Şeması

### Blog Posts Tablosu

```sql
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title_tr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_tr TEXT NOT NULL,
  content_en TEXT NOT NULL,
  excerpt_tr TEXT,
  excerpt_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  cover_image TEXT,
  category VARCHAR(100),
  tags JSONB DEFAULT '[]',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 📁 Yeni Dosyalar

### Frontend (Client)
```
client/src/
├── config/
│   └── i18n.ts                      # i18n yapılandırması
├── contexts/
│   └── ThemeContext.tsx             # Tema context
├── components/
│   ├── ThemeToggle.tsx              # Tema değiştirme butonu
│   ├── LanguageSwitcher.tsx         # Dil değiştirme butonu
│   ├── SocialShare.tsx              # Sosyal medya paylaşım
│   └── admin/
│       └── BlogManagement.tsx       # Blog yönetim paneli
└── pages/
    ├── blog.tsx                     # Blog liste sayfası
    └── blog-detail.tsx              # Blog detay sayfası
```

### Backend (Server)
```
shared/
└── schema.ts                        # Blog şeması eklendi
server/
├── storage.ts                       # Blog CRUD metodları
└── routes.ts                        # Blog API endpoints
```

## 🚀 Deployment

### Coolify Environment Variables

Aşağıdaki environment variable'ları Coolify panelinde ayarlamanız gerekir:

```env
DATABASE_URL=postgresql://user:password@host/database
SESSION_SECRET=<openssl rand -hex 32>
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

### Database Migration

Veritabanı şemasını güncellemek için:

```bash
npm run db:push
```

## 📖 Kullanım Örnekleri

### Blog Yazısı Oluşturma

1. `/admin/dashboard` adresine gidin
2. "Blog Yönetimi" sekmesine tıklayın
3. "Yeni Blog Yazısı" butonuna tıklayın
4. Formu doldurun:
   - Başlık (TR/EN)
   - İçerik (TR/EN)
   - Özet (TR/EN)
   - Slug (örn: `ornek-blog-yazisi`)
   - Kategori
   - Etiketler (JSON formatında)
   - Kapak resmi URL
5. "Yayınla" switch'ini aktif edin
6. "Kaydet" butonuna tıklayın

### Dil Değiştirme

Navbar'daki 🌍 butonuna tıklayın ve dil seçin:
- 🇹🇷 Türkçe
- 🇬🇧 English

### Tema Değiştirme

Navbar'daki ☀️/🌙 butonuna tıklayın.

### Blog Sayfasına Erişim

- Blog listesi: `https://your-domain.com/blog`
- Blog detay: `https://your-domain.com/blog/yazı-slug`

## 🔧 Geliştirme

### Yeni Dil Ekleme

`client/src/config/i18n.ts` dosyasında yeni dil ekleyin:

```typescript
const resources = {
  tr: { translation: { ... } },
  en: { translation: { ... } },
  // Yeni dil
  de: {
    translation: {
      nav: {
        home: 'Startseite',
        // ...
      }
    }
  }
};
```

### Yeni Çeviri Anahtarı Ekleme

```typescript
// i18n.ts
nav: {
  home: 'Ana Sayfa',
  newItem: 'Yeni Öğe', // Yeni anahtar
}

// Kullanım
{t('nav.newItem')}
```

## 📝 Notlar

- Blog içerikleri HTML formatında saklanır, `dangerouslySetInnerHTML` ile render edilir
- Etiketler JSON array formatında saklanır: `["tag1", "tag2"]`
- Slug'lar benzersiz (unique) olmalıdır
- Yayınlanmamış yazılar sadece admin panelinde görünür
- Tema tercihi tarayıcıda saklanır (localStorage)
- Dil tercihi tarayıcıda saklanır (localStorage)

## 🐛 Bilinen Sorunlar

Şu anda bilinen bir sorun bulunmamaktadır.

## 🎯 Gelecek Güncellemeler

- [ ] Rich text editor entegrasyonu
- [ ] Resim upload özelliği
- [ ] Yorum sistemi
- [ ] Arama fonksiyonu
- [ ] Sayfalama (pagination)
- [ ] Kategori filtreleme
- [ ] RSS feed

## 📞 Destek

Herhangi bir sorun yaşarsanız veya yardıma ihtiyacınız olursa:
- GitHub Issues açabilirsiniz
- Admin panelinden iletişime geçebilirsiniz

---

**Son Güncelleme:** 2024-10-25
**Versiyon:** 2.0.0
