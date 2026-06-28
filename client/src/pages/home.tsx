import { useState } from "react";
import "@/styles/aurora-home.css";

type Project = { n: string; d: string; u: string; t: string };

const PROJECTS: Project[] = [
  { n: "fasheone.com", d: "Moda e-ticaret için AI destekli kişiselleştirilmiş alışveriş deneyimi.", u: "https://fasheone.com/", t: "E-ticaret" },
  { n: "PodcastYap.com", d: "AI destekli ses düzenleme, transkripsiyon ve içerik önerili podcast platformu.", u: "https://podcastyap.com", t: "Medya" },
  { n: "Doc2Podcast", d: "PDF dosyalarını doğal, akıcı bir podcast'e dönüştüren AI teknolojisi.", u: "https://doc2podcast.com", t: "AI Araç" },
  { n: "Uygulama Deposu", d: "100+ AI aracını keşfet ve yönet — kapsamlı AI araç platformu.", u: "https://uygulamadeposu.netlify.app/", t: "Platform" },
  { n: "Akıllı Müşteri Asistanı", d: "WhatsApp ve web'e entegre 7/24 destek botu.", u: "#", t: "Chatbot" },
  { n: "Restoran Rezervasyon Botu", d: "Sesli ve yazılı otomatik rezervasyon sistemi.", u: "#", t: "Otomasyon" },
  { n: "Ürün Öneri Motoru", d: "Kullanıcı davranışına göre kişiselleştirilmiş öneriler.", u: "#", t: "E-ticaret" },
  { n: "Otomatik Fatura İşleme", d: "Faturadan veri çıkarma ve muhasebeye kayıt.", u: "#", t: "Otomasyon" },
  { n: "Emlak Değerleme Modeli", d: "Konum ve piyasa verisiyle fiyat tahmini.", u: "#", t: "Veri Analizi" },
  { n: "Hukuki Belge Özetleyici", d: "Sözleşmeleri sade dile çeviren NLP çözümü.", u: "#", t: "NLP" },
  { n: "Sağlık Randevu Asistanı", d: "Klinikler için akıllı randevu planlama.", u: "#", t: "Sağlık" },
  { n: "Sosyal Medya İçerik Üretici", d: "Marka diline uygun otomatik gönderi üretimi.", u: "#", t: "İçerik" },
  { n: "Çağrı Merkezi Analizi", d: "Konuşma duygu ve kalite analizi paneli.", u: "#", t: "Veri Analizi" },
  { n: "Stok Tahmin Sistemi", d: "Talep tahmini ve otomatik sipariş önerisi.", u: "#", t: "Perakende" },
  { n: "CV Tarama & Eşleştirme", d: "İK için aday değerlendirme ve sıralama.", u: "#", t: "İK" },
  { n: "Görsel Ürün Etiketleme", d: "Katalog için otomatik görsel etiketleme.", u: "#", t: "Görüntü İşleme" },
  { n: "Finansal Rapor Botu", d: "Aylık finansal özet ve yorum üretimi.", u: "#", t: "Finans" },
  { n: "Eğitim Koçu Chatbot", d: "Öğrencilere 7/24 akıllı öğrenme desteği.", u: "#", t: "Eğitim" },
  { n: "Sesli Sipariş Sistemi", d: "Telefonla AI üzerinden sipariş alma.", u: "#", t: "Ses" },
  { n: "Müşteri Segmentasyon Paneli", d: "Davranışsal kümeleme ve hedefleme.", u: "#", t: "Veri Analizi" },
  { n: "Otel Yorum Analizi", d: "Şikayet ve memnuniyet temalarını çıkarır.", u: "#", t: "NLP" },
  { n: "Lojistik Rota Optimizasyonu", d: "Teslimat planlama ve maliyet düşürme.", u: "#", t: "Otomasyon" },
  { n: "Marka İzleme Aracı", d: "Web ve sosyal medyada marka takibi.", u: "#", t: "İzleme" },
  { n: "Akıllı E-posta Yanıtlayıcı", d: "Gelen kutusu için otomatik yanıt taslakları.", u: "#", t: "Otomasyon" },
  { n: "Üretim Hata Tespiti", d: "Görüntüden otomatik kusur tespiti.", u: "#", t: "Görüntü İşleme" },
  { n: "Anket Sonuç Özetleyici", d: "Açık uçlu yanıtların tematik analizi.", u: "#", t: "NLP" },
  { n: "Dinamik Fiyatlandırma", d: "Talebe göre gerçek zamanlı fiyat.", u: "#", t: "E-ticaret" },
  { n: "Belge Soru-Cevap (RAG)", d: "Şirket bilgisinden anlık, kaynaklı yanıt.", u: "#", t: "RAG" },
  { n: "Toplantı Notu Çıkarıcı", d: "Ses kaydından özet ve görev listesi.", u: "#", t: "Verimlilik" },
  { n: "Müşteri Kaybı Tahmini", d: "Churn (kayıp) riskini önceden öngörür.", u: "#", t: "Veri Analizi" },
  { n: "Akıllı Form Doldurma", d: "Belgeden otomatik alan tanıma ve doldurma.", u: "#", t: "Otomasyon" },
  { n: "Çok Dilli Çeviri Asistanı", d: "İş yazışmaları için anlık çeviri.", u: "#", t: "NLP" },
  { n: "Reklam Metni Üretici", d: "A/B test için varyantlı reklam metni.", u: "#", t: "Pazarlama" },
  { n: "Görsel Üretim Stüdyosu", d: "Ürün görseli ve banner üretimi.", u: "#", t: "Görüntü İşleme" },
  { n: "Bordro Otomasyonu", d: "Maaş, izin ve puantaj hesaplama.", u: "#", t: "İK" },
  { n: "Tedarikçi Risk Skoru", d: "Tedarik zinciri risk analizi.", u: "#", t: "Finans" },
  { n: "Akıllı SSS Botu", d: "Site içi yardım merkezi asistanı.", u: "#", t: "Chatbot" },
  { n: "Video Altyazı & Transkript", d: "Otomatik altyazı ve transkript üretimi.", u: "#", t: "Medya" },
  { n: "Kişisel Finans Koçu", d: "Harcama analizi ve tasarruf önerisi.", u: "#", t: "Finans" },
  { n: "Akıllı Belge Arşivi", d: "Otomatik sınıflandırma ve akıllı arama.", u: "#", t: "Otomasyon" },
];

const SHOW = 12;

const SOLUTIONS = [
  { ic: "🤖", h: "Akıllı Otomasyon", p: "Teklif, fatura ve raporlama gibi tekrar eden işleri uçtan uca otomatikleştiririz." },
  { ic: "💬", h: "Müşteri Asistanı", p: "Web ve WhatsApp'a entegre, markanızın dilini konuşan 7/24 destek asistanı." },
  { ic: "📊", h: "Karar Panelleri", p: "Dağınık verinizi tek panele toplar, anlık ve okunabilir hale getiririz." },
  { ic: "🧠", h: "Özel AI Agent'lar", p: "Şirket bilginizle eğitilmiş, görevi kendi tamamlayan dijital çalışanlar." },
  { ic: "🔗", h: "Entegrasyon", p: "CRM, e-ticaret ve muhasebe araçlarınızı AI ile bağlarız." },
  { ic: "🎯", h: "AI Danışmanlık", p: "Yol haritanızı bütçenize uygun şekilde birlikte çıkarırız." },
];

const STEPS = [
  { b: "1", h: "Keşif", p: "İş akışınızı ve darboğazları haritalandırırız." },
  { b: "2", h: "Tasarım", p: "Size özel çözüm mimarisini çıkarırız." },
  { b: "3", h: "Kurulum", p: "İlk otomasyonu hızla canlıya alırız." },
  { b: "4", h: "Ölçek", p: "Sonuçları ölçer, tüm şirkete yayarız." },
];

function initials(name: string) {
  return name
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split(/[ ._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const isLink = p.u !== "#";
  const hue = (index * 53) % 360;
  const hue2 = (hue + 40) % 360;
  return (
    <a
      className="pjt"
      href={p.u}
      {...(isLink ? { target: "_blank", rel: "noopener" } : {})}
    >
      <span className="pthumb">
        <span
          className="pph"
          style={{ background: `linear-gradient(135deg,hsl(${hue},68%,55%),hsl(${hue2},70%,45%))` }}
        >
          {initials(p.n)}
        </span>
        {isLink && (
          <img
            loading="lazy"
            alt={p.n}
            src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(p.u)}?w=600&h=380`}
            onError={(e) => e.currentTarget.remove()}
          />
        )}
      </span>
      <span className="ptag">{p.t}</span>
      <h4>{p.n}</h4>
      <p>{p.d}</p>
      <span className="go">{isLink ? "Siteyi Ziyaret Et →" : "Detaylar →"}</span>
    </a>
  );
}

export default function Home() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? PROJECTS : PROJECTS.slice(0, SHOW);

  return (
    <div className="aurora-page">
      <div className="aurora">
        <i className="a1" />
        <i className="a2" />
        <i className="a3" />
      </div>

      <div className="content">
        <div className="wrap">
          <nav className="glass">
            <div className="logo">
              <span className="m">3H</span> Third Hand{" "}
              <span style={{ color: "var(--muted)", fontWeight: 500, fontSize: 13 }}>AI</span>
            </div>
            <div className="nav-links">
              <a href="#cozumler">Çözümler</a>
              <a href="#projeler">Projeler</a>
              <a href="#surec">Süreç</a>
              <a href="#iletisim">İletişim</a>
            </div>
            <a href="#iletisim" className="btn btn-pri">Görüşme Ayarla</a>
          </nav>

          <header className="hero">
            <span className="pill glass">✦ Terzi usulü yapay zeka ajansı</span>
            <h1>
              İşinizi büyüten
              <br />
              <span className="g">akıllı asistanlar</span> kuruyoruz
            </h1>
            <p>
              Third Hand, şirketinize özel AI çözümleri ve otomasyonlarla tekrar eden işleri
              devralır; ekibinizi değer üreten işe odaklar.
            </p>
            <div className="cta">
              <a href="#iletisim" className="btn btn-pri">Ücretsiz keşif görüşmesi →</a>
              <a href="#cozumler" className="btn btn-soft">Çözümleri gör</a>
            </div>

            <div className="hero-card glass">
              <div className="bar">
                <i />
                <i />
                <i />
              </div>
              <div className="body">
                <div className="mini">
                  <b>%70</b>
                  <br />
                  <span>zaman tasarrufu</span>
                  <div className="up">▲ otomasyonla</div>
                </div>
                <div className="mini">
                  <b>3 hafta</b>
                  <br />
                  <span>ilk canlı sistem</span>
                  <div className="up">▲ hızlı kurulum</div>
                </div>
                <div className="mini">
                  <b>7/24</b>
                  <br />
                  <span>çalışan AI gücü</span>
                  <div className="up">▲ kesintisiz</div>
                </div>
              </div>
            </div>
          </header>

          <section id="cozumler" className="center">
            <span className="eyebrow">Çözümler</span>
            <h2 className="sech">Hazır kalıp değil, size özel sistemler</h2>
            <p className="secsub">İş akışınızı dinler, ölçer ve tam ihtiyacınıza göre kurarız.</p>
            <div className="cards">
              {SOLUTIONS.map((s) => (
                <div className="card glass" style={{ textAlign: "left" }} key={s.h}>
                  <div className="ic">{s.ic}</div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="surec" className="center">
            <span className="eyebrow">Süreç</span>
            <h2 className="sech">Fikirden çalışan sisteme</h2>
            <div className="steps">
              {STEPS.map((s) => (
                <div className="step glass" key={s.b}>
                  <div className="b">{s.b}</div>
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="projeler" className="center">
            <span className="eyebrow">Projelerimiz</span>
            <h2 className="sech">Hayata geçirdiğimiz 40+ proje</h2>
            <p className="secsub">
              Farklı sektörlerde geliştirdiğimiz yapay zeka çözümlerinden bazıları.
            </p>
            <div className="pjt-grid">
              {visible.map((p, i) => (
                <ProjectCard p={p} index={i} key={p.n} />
              ))}
            </div>
            {!showAll && PROJECTS.length > SHOW && (
              <div style={{ marginTop: 34 }}>
                <button className="btn btn-soft" onClick={() => setShowAll(true)}>
                  Daha Fazla Gör ↓
                </button>
              </div>
            )}
          </section>

          <div className="final glass" id="iletisim">
            <h2>
              Ekibinize <span className="g">üçüncü eli</span> ekleyelim mi?
            </h2>
            <p>
              30 dakikalık ücretsiz keşif görüşmesinde işiniz için somut bir AI fırsatı belirleyelim.
            </p>
            <a href="mailto:merhaba@thirdhand.com.tr" className="btn btn-pri">Görüşme ayarla →</a>
          </div>

          <footer>
            <div>© 2026 Third Hand AI Agency · Levent / İstanbul</div>
            <div>merhaba@thirdhand.com.tr · +90 (212) 555 66 77</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
