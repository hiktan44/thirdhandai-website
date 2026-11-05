# 🚀 Netlify Deployment Setup

## ✅ Tamamlanan İşlemler

- ✅ Blog sistemi eklendi
- ✅ Çoklu dil desteği (TR/EN)
- ✅ Dark mode tema
- ✅ Sosyal medya paylaşım
- ✅ Veritabanı şeması oluşturuldu
- ✅ Örnek veriler eklendi
- ✅ GitHub'a kodlar push edildi

## 📋 Netlify Environment Variables

Netlify Dashboard'da şu environment variables'ları ekleyin:

### 1. Database Connection
```
DATABASE_URL=postgresql://KULLANICI:SIFRE@HOST/VERITABANI?sslmode=require
```

### 2. Admin Credentials (Production'da değiştirin!)
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<güçlü-bir-şifre — yalnızca panelde tutun, repoya yazmayın>
```

### 3. Session Secret (Production'da değiştirin!)
```
SESSION_SECRET=your-super-secret-production-key-here
```

## 🔧 Netlify Deploy Adımları

### Adım 1: Environment Variables Ekleyin
1. Netlify Dashboard'a gidin
2. Site Settings → Environment Variables
3. Yukarıdaki 3 variable'ı ekleyin
4. Save butonuna tıklayın

### Adım 2: Deploy'u Trigger Edin
1. Deploys sekmesine gidin
2. "Trigger deploy" → "Clear cache and deploy site"
3. Deploy loglarını izleyin

### Adım 3: Database Migration (Otomatik)
Netlify build sırasında otomatik olarak çalışır:
```bash
npm run db:push
```

## 📊 Veritabanı İçeriği

### ✅ Kurulmuş Veriler:
- **Admin User**: username: `admin`, password: `ADMIN_PASSWORD` ortam değişkenindeki değer
- **Projeler**: 3 örnek proje
- **Videolar**: 2 örnek video
- **AI Modelleri**: 3 model kartı
- **WhatsApp Ayarları**: Widget konfigürasyonu
- **Blog Yazıları**: 
  - 2 yayında (published)
  - 1 taslak (draft)

### Blog Yazıları:
1. **Yapay Zeka ve İş Dünyası** (Yayında)
   - Slug: `yapay-zeka-ve-is-dunyasi`
   - Kategori: AI & Business

2. **Chatbot Nasıl Geliştirilir?** (Yayında)
   - Slug: `chatbot-nasil-gelistirilir`
   - Kategori: Development

3. **Veri Güvenliği ve Yapay Zeka** (Taslak)
   - Slug: `veri-guvenligi-ve-yapay-zeka`
   - Kategori: Security

## 🔗 URL'ler

Deployment tamamlandıktan sonra:
- **Ana Sayfa**: `https://your-site.netlify.app/`
- **Blog**: `https://your-site.netlify.app/blog`
- **Admin Paneli**: `https://your-site.netlify.app/admin`

## 🔐 Güvenlik Önerileri

### ⚠️ ÇOK ÖNEMLİ - Production Öncesi:

1. **Admin Şifresini Değiştirin**
   - Admin paneline giriş yapın
   - Profile Settings'den şifreyi güncelleyin
   - VEYA: Veritabanından direkt güncelleyin:
   ```sql
   UPDATE users SET password = 'yeni_guclu_sifre' WHERE username = 'admin';
   ```

2. **Session Secret Değiştirin**
   - Güçlü bir random key oluşturun
   - Netlify Environment Variables'da güncelleyin

3. **Database Credentials**
   - Sadece Netlify'da saklayın
   - `.env` dosyası asla commit edilmemeli
   - `.gitignore`'da olduğundan emin olun

## 🧪 Test Checklist

Deploy sonrası test edin:

- [ ] Ana sayfa yükleniyor
- [ ] Admin paneline giriş yapılıyor (admin/admin123)
- [ ] Blog listesi görünüyor
- [ ] Blog detay sayfası açılıyor
- [ ] Dil değiştirme çalışıyor (TR/EN)
- [ ] Tema değiştirme çalışıyor (Light/Dark)
- [ ] Projeler listesi görünüyor
- [ ] Videolar oynatılıyor
- [ ] WhatsApp widget görünüyor
- [ ] İletişim formu çalışıyor

## 📝 Build Commands

Netlify otomatik olarak şunları çalıştırır:
```bash
npm install
npm run build
```

**Build Output Directory**: `dist/public`

## 🆘 Sorun Giderme

### Build Hatası
- Environment variables'ların doğru eklendiğini kontrol edin
- Build loglarını inceleyin
- Database connection string'in doğru olduğundan emin olun

### 500 Error
- Netlify Functions loglarını kontrol edin
- DATABASE_URL'in set olduğunu doğrulayın

### Admin Girişi Çalışmıyor
- Browser console'u kontrol edin
- Network tab'de API isteklerine bakın
- Database'de user kaydının olduğunu doğrulayın

## 📞 Destek

Sorun yaşarsanız:
1. Netlify Deploy Logs'u kontrol edin
2. Browser Console'u inceleyin
3. Database bağlantısını test edin

---

**Deploy Tarihi**: 2024-10-25
**Versiyon**: 2.0.0 (Blog + i18n + Dark Mode)
