# Netlify Deployment Kılavuzu

## Hazırlık Adımları

Bu proje Netlify'a deploy edilmek üzere hazırlandı. Aşağıdaki adımları takip ederek sitenizi yayınlayabilirsiniz.

## 1. GitHub'a Yükleme

Öncelikle kodunuzu GitHub'a yükleyin:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/thirdhandai-website.git
git push -u origin main
```

## 2. Netlify'de Hesap Oluşturma

1. [netlify.com](https://netlify.com) adresine gidin
2. "Sign up" ile ücretsiz hesap oluşturun
3. GitHub hesabınızla giriş yapın

## 3. Yeni Site Oluşturma

1. Netlify Dashboard'da "Add new site" → "Import an existing project" tıklayın
2. GitHub'ı seçin ve repository'nize erişim izni verin
3. `thirdhandai-website` repository'sini seçin

## 4. Build Ayarları

Netlify otomatik olarak `netlify.toml` dosyasını okuyacak. Eğer sorulursa:

- **Build command**: `npm run build`
- **Publish directory**: `dist/public`
- **Functions directory**: `netlify/functions`

## 5. Environment Variables

Site Settings → Environment Variables bölümünden ekleyin:

```
WHATSAPP_PHONE=905306042829
WHATSAPP_MESSAGE=Merhaba! Size nasıl yardımcı olabilirim?
WHATSAPP_ENABLED=true
```

## 6. Deploy

"Deploy site" butonuna tıklayın. İlk deployment birkaç dakika sürecek.

## 7. Custom Domain Ekleme

Deploy başarılı olduktan sonra:

1. Site Settings → Domain Management
2. "Add custom domain" tıklayın
3. `thirdhandai.com` yazın
4. DNS ayarlarını Netlify'nin verdiği şekilde yapın:
   - A kaydı: 75.2.60.5
   - CNAME (www için): [your-site-name].netlify.app

## Önemli Notlar

### Backend Sınırlamaları

- Netlify Functions serverless olduğu için veritabanı bağlantıları yoktur
- Form verileri Netlify Forms'a kaydedilir
- Admin paneli için Netlify Identity kullanmanızı öneririm

### Netlify Forms

Contact form otomatik olarak Netlify Forms'a bağlanacak. Forms → Active forms'dan mesajları görebilirsiniz.

### Performans

- Static site olduğu için çok hızlı yüklenecek
- CDN üzerinden global olarak servis edilecek
- SSL sertifikası otomatik

### Maliyetler

- Ücretsiz plan: 100GB bandwidth/ay
- Form gönderimi: 100/ay
- Functions: 125k request/ay

## Sorun Giderme

### Build Hatası

Eğer build hatası alırsanız:
1. Node version'ı kontrol edin (netlify.toml'de 20 olarak ayarlı)
2. Package-lock.json'ı silip tekrar commit edin

### API Bağlantı Hatası

Frontend'de API çağrıları `/api/*` olarak yapılıyor ve otomatik olarak Netlify Functions'a yönlendiriliyor.

### Custom Domain Çalışmıyor

DNS yayılımı 48 saate kadar sürebilir. Netlify DNS kullanmanızı öneririm.

## Alternatif: Netlify CLI

Lokal test için:

```bash
npm install -g netlify-cli
netlify dev
```

## Destek

Sorun yaşarsanız:
- [Netlify Docs](https://docs.netlify.com)
- [Netlify Support](https://answers.netlify.com)