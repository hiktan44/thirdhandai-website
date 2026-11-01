# Third Hand Blog Rehberi

Bu dosya thirdhand.com.tr blogu için haftalık yazı üretiminin standartlarını tanımlar.
Her hafta çalışan zamanlanmış görev bu dosyayı okuyup aynen uygular.
Örnek yazı: `client/src/data/posts/ai-sohbet-rehberi.ts`

## 1. Konu seçimi

- Hedef okur: Türkiye'deki işletme sahipleri, yöneticiler, KOBİ'ler ve yapay zekâyı merak eden herkes. Teknik bilgi beklenmez.
- Konu son 7-10 günün **gerçek ve güncel** bir yapay zekâ / otomasyon / dijital dönüşüm gelişmesine dayanmalı: yeni model veya ürün duyuruları, işletmeleri etkileyen düzenlemeler (KVKK, AB Yapay Zekâ Yasası, Türkiye mevzuatı), önemli araştırma sonuçları, sektörel kullanım örnekleri, güvenlik olayları.
- Haberi aktarmakla kalma; "bu işletmeniz için ne anlama geliyor, ne yapmalısınız" sorusuna pratik cevap ver.
- Mevcut yazılarla (`client/src/data/blog-posts.ts` ve `client/src/data/posts/`) aynı konuyu tekrarlama. Benzer bir konu varsa yeni bir açı bul.
- Konu kategorileri dönüşümlü olsun: Rehber, Yapay Zeka, Otomasyon, Güvenlik, Mevzuat, Strateji, Pazarlama, E-ticaret.

## 2. Araştırma ve doğruluk

- Her rakam, tarih, isim ve iddia için en az bir güvenilir kaynak bul (resmî kurum, şirketin kendi duyurusu, saygın haber kuruluşu, hakemli yayın).
- Kaynakta olmayan bilgi yazma. Emin olmadığın şeyi yazma ya da açıkça "henüz netleşmedi" de.
- Fiyat, sürüm, menü adı gibi hızlı değişen bilgileri tarihle birlikte ver.
- Yazının sonunda "Kaynaklar" listesi zorunlu (`<ul class="post-sources">`, linkler `target="_blank" rel="noopener"`).

## 3. Yazım kuralları

- Dil: Türkçe, sade, samimi ama profesyonel. Kısa paragraflar, günlük hayattan örnekler.
- **Uzun tire (em dash, Unicode U+2014) kesinlikle kullanılmaz.** Yerine virgül, iki nokta veya nokta.
- Uzunluk: 1.500 ile 2.500 kelime arası; `readMinutes` buna göre (yaklaşık 180 kelime/dk).
- Yapı:
  - Giriş (2 paragraf, okuru konuya bağla)
  - `<div class="post-note">` içinde "Bu yazıda neler var?" listesi
  - 3-5 ana bölüm (`<h2>`), alt başlıklar (`<h3>`)
  - En az bir `<div class="post-tip">` ipucu kutusu
  - Uygunsa `<div class="post-prompt"><span>Başlık</span>"metin"</div>` hazır kalıplar ya da adım listesi
  - "Özet" bölümü (`<ol>` ile 5-8 madde)
  - `<div class="post-cta">` ile Third Hand'e yönlendiren kısa çağrı (konuyla ilgili hizmet: danışmanlık, otomasyon, eğitim, AI ajanı vb.; link `/#iletisim`)
  - "Kaynaklar" listesi
- Başlık: merak uyandıran, net, 60-80 karakter. Özet (excerpt): 1-2 cümle, ~250 karakter.
- Etiketler (`tags`): 4-7 adet.

## 4. Görseller

Her yazıda **en az 5 görsel**:
- 1 kapak fotoğrafı (`kapak.webp`)
- 2 ara fotoğraf
- 2-3 infografik (SVG)

Klasör: `client/public/images/blog/<slug>/` ve yazıda `const IMG = "/images/blog/<slug>";`
**Dikkat:** Görselleri asla `client/public/blog/` altına koyma; `/blog` sayfa adresiyle çakışıp yönlendirme hatası yapar.

Fotoğraflar:
- Hugging Face Z-Image aracıyla (`gr1_z_image_turbo_generate`, çözünürlük `1536x864 ( 16:9 )`) üret.
- İstem İngilizce, gerçekçi editoryal fotoğraf, sıcak turuncu-krem tonlar, **yazı ve logo yok**, tanınmış kişi yok.
- Python Pillow ile en fazla 1400 px genişliğe küçült, WEBP kalite 82 kaydet.

İnfografikler (SVG):
- `viewBox="0 0 1000 H"`, arka plan `#fff7ed` ve `rx="28"`, `<title>` ve `<desc>` dolu.
- Renkler: ana `#ea580c`, koyu `#c2410c`, açık `#fb923c` / `#fed7aa` / `#ffedd5`, metin `#1a1f2e`, ikincil metin `#5a6377`. Olumlu `#16a34a` / `#dcfce7`, olumsuz `#dc2626` / `#fee2e2`.
- Yazı tipi: `'Plus Jakarta Sans','Inter','Segoe UI',Helvetica,Arial,sans-serif`. En küçük yazı 18px, başlık 32-34px.
- Satırları elle böl, kutuların dışına taşmadığını Playwright ile PNG'ye çevirip gözle kontrol et.
- Yazıda infografikleri büyütülebilir link içinde kullan:
  `<figure><a class="diagram-link" href="${IMG}/x.svg" target="_blank" rel="noopener" title="Büyütmek için tıklayın"><img class="blog-img blog-diagram" src="${IMG}/x.svg" alt="..." loading="lazy"/></a><figcaption>...</figcaption></figure>`
- Fotoğraflar: `<figure><img class="blog-img" src="${IMG}/x.webp" alt="..." loading="lazy"/><figcaption>...</figcaption></figure>`

## 5. Koda ekleme

1. Yeni dosya: `client/src/data/posts/<slug>.ts` (şablon için `ai-sohbet-rehberi.ts` dosyasına bak). `import type { BlogPost } from "../blog-posts";`
2. `client/src/data/blog-posts.ts` içinde import et ve `BLOG_POSTS` dizisinin **en başına** ekle (en yeni yazı öne çıkan yazı olur).
3. `client/public/sitemap.xml` dosyasına yazının URL'sini `lastmod` ile ekle.
4. İçerik bir template literal içindedir: içerikte ters tırnak (backtick) kullanma, `${` yalnızca `${IMG}` için.
5. `npm ci` (gerekirse) ve `npm run build` hatasız geçmeli.

## 6. Kontrol

- `npx vite preview --port 4173` ile yerelde aç, Playwright ile `/blog` ve `/blog/<slug>` sayfalarının masaüstü (1366 px) ve telefon (390 px) görüntüsünü al ve bak:
  - Öne çıkan yazı yeni yazı mı?
  - Tüm yerel görseller yükleniyor mu? (lazy görselleri `loading='eager'` yapıp kontrol et)
  - Yatay taşma yok mu? (`document.documentElement.scrollWidth` = viewport genişliği)
  - Liste işaretleri, kutular düzgün mü?
- Metinde uzun tire (U+2014) karakteri olmadığını `grep -P "\x{2014}"` ile doğrula.

## 7. Yayın

- Commit mesajı Türkçe, `main` dalına push.
- Canlı site Coolify'da `seymata.com` panelindeki **thirdhandai-gitlab** uygulamasından (uuid `yu9x6rvlvtmwh6d36ssefdvc`) yayınlanır, kaynağı bu GitHub deposunun `main` dalıdır. GitHub push'u otomatik yayın başlatmaz; Coolify `deploy` aracı ile yayını tetikle ve `get_deployment` ile `finished` olana kadar izle.
- Yayın sonrası canlıda doğrula: `https://thirdhand.com.tr/blog` (200, 301 olmamalı), yazı adresi ve tüm görseller 200 dönmeli, `/api/projects` çalışmalı.
- Sorun çıkarsa Coolify'da önceki imaja geri dön (`rollback_application`) ve durumu bildir.
