import { db, pool } from "./db";
import { projects } from "@shared/schema";
import { PROJECTS_SEED } from "@shared/projects-seed";

// Eski demo tohumundan (scripts/seed.ts) gelen proje başlıkları.
// Tablo yalnızca bunları içeriyorsa gerçek projelerle değiştirilir.
const DEMO_TITLES = new Set([
  "E-Ticaret Chatbot",
  "Veri Analizi Dashboard",
  "Doğal Dil İşleme Sistemi",
  // Netlify demo veri seti (olur da kullanılmışsa)
  "fasheone.com",
  "AI Müşteri Destek Botu",
]);

function realProjectRows() {
  return PROJECTS_SEED.map((p, index) => ({
    title: p.n,
    titleEn: p.n,
    description: p.tr.d,
    descriptionEn: p.en.d,
    link: p.u,
    image: null,
    category: p.tr.t,
    categoryEn: p.en.t,
    orderIndex: index,
  }));
}

// EN sütunları eksikse ekle (db:push çalıştırılmamış olma ihtimaline karşı,
// güvenli/idempotent). Sütunlar zaten varsa hiçbir şey yapmaz.
async function ensureEnColumns() {
  await pool.query(`
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS title_en text;
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS description_en text;
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS category_en varchar(100);
  `);
}

// —— Sonradan eklenen projeler ——
// Canlı sitede projeler admin panelden yönetildiği için seed listesi yalnızca
// boş veritabanında kullanılır. Yeni bir projeyi canlıya kod ile eklemek için
// buraya bir kayıt eklenir: sunucu açılışında BİR KEZ eklenir (anahtar
// `site_migrations` tablosuna yazılır). Admin panelden silinirse ya da sırası
// değiştirilirse sonraki açılışlarda yeniden eklenmez / dokunulmaz.
type AddedProject = {
  key: string; // benzersiz, bir kez uygulanır
  afterLink?: string; // bu bağlantılı projenin hemen arkasına yerleşir; yoksa sona
  row: {
    title: string;
    titleEn: string | null;
    description: string;
    descriptionEn: string | null;
    link: string;
    category: string;
    categoryEn: string | null;
  };
};

export const ADDED_PROJECTS: AddedProject[] = [
  {
    key: "proje:turkiye-ekonomi-paneli",
    afterLink: "https://otonavlun.com",
    row: {
      title: "TÜRKİYE EKONOMİ PANELİ",
      titleEn: "TÜRKİYE ECONOMY DASHBOARD",
      description:
        "Türkiye ekonomisinin nabzı tek ekranda: canlı döviz, altın, BIST ve emtia fiyatlarının yanında enflasyon, politika faizi, büyüme, işsizlik, rezervler, bütçe, CDS, cari denge, konut, turizm ve dış borç verileri grafiklerle ve resmî kaynaklarla. Ücretsiz; telefona uygulama olarak yüklenebilir.",
      descriptionEn:
        "The pulse of Türkiye's economy on one screen: live FX, gold, BIST and commodity prices alongside inflation, policy rate, growth, unemployment, reserves, budget, CDS, current account, housing, tourism and external debt — with charts and official sources. Free, and installable on your phone as an app.",
      link: "https://turkiyeekonomisi.netlify.app",
      category: "Ekonomi / Veri",
      categoryEn: "Economy / Data",
    },
  },
  {
    key: "proje:iptvht",
    afterLink: "https://turkiyeekonomisi.netlify.app",
    row: {
      title: "IPTVHT",
      titleEn: "IPTVHT",
      description:
        "Dünyanın televizyonları, kendi dilinizde: IPTV aboneliğinizi (Xtream veya M3U) ekleyin, canlı TV, film, dizi, spor ve çocuk kanallarını tek yerden izleyin. Yabancı bir haber, maç ya da belgeselde orijinal ses kısılır, yapay zekâ anlık çeviriyle kendi dilinizde konuşur ve altyazı akar.",
      descriptionEn:
        "The world's television, in your own language: add your IPTV subscription (Xtream or M3U) and watch live TV, movies, series, sports and kids channels in one place. On a foreign news broadcast, match or documentary, the original audio is lowered while AI live translation speaks in your language and subtitles flow.",
      link: "https://tv.seymata.com",
      category: "Yayın / AI Çeviri",
      categoryEn: "Streaming / AI Translation",
    },
  },
];

// Bağlantıları karşılaştırmak için sadeleştirir (protokol, www, sondaki / ve
// büyük/küçük harf farkı yok sayılır).
export function normalizeLink(link: string | null | undefined): string {
  return (link || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "");
}

async function ensureAddedProjects() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_migrations (
      key text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    );
  `);

  for (const item of ADDED_PROJECTS) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      // Anahtarı yazmayı dener; zaten varsa (daha önce uygulandıysa ya da
      // başka bir sunucu kopyası şu an uyguluyorsa) hiçbir şey yapmaz.
      const claimed = await client.query(
        "INSERT INTO site_migrations (key) VALUES ($1) ON CONFLICT (key) DO NOTHING RETURNING key",
        [item.key],
      );
      if (claimed.rowCount === 0) {
        await client.query("ROLLBACK");
        continue;
      }

      const { rows } = await client.query<{ link: string | null; order_index: number }>(
        "SELECT link, order_index FROM projects",
      );
      const target = normalizeLink(item.row.link);
      if (rows.some((r) => normalizeLink(r.link) === target)) {
        // Proje zaten listede (ör. admin panelden elle eklenmiş) — çiftleme.
        await client.query("COMMIT");
        console.log(`ℹ️  [projects] "${item.row.title}" zaten listede, eklenmedi.`);
        continue;
      }

      const anchor = item.afterLink
        ? rows.find((r) => normalizeLink(r.link) === normalizeLink(item.afterLink))
        : undefined;
      const maxOrder = rows.reduce((m, r) => Math.max(m, r.order_index), -1);
      const position = anchor ? anchor.order_index + 1 : maxOrder + 1;

      // Araya yerleştirmek için arkadaki projeleri bir sıra kaydır.
      await client.query(
        "UPDATE projects SET order_index = order_index + 1 WHERE order_index >= $1",
        [position],
      );
      await client.query(
        `INSERT INTO projects
           (title, title_en, description, description_en, link, image, category, category_en, order_index)
         VALUES ($1, $2, $3, $4, $5, NULL, $6, $7, $8)`,
        [
          item.row.title,
          item.row.titleEn,
          item.row.description,
          item.row.descriptionEn,
          item.row.link,
          item.row.category,
          item.row.categoryEn,
          position,
        ],
      );
      await client.query("COMMIT");
      console.log(`✅ [projects] "${item.row.title}" ${position}. sıraya eklendi.`);
    } catch (error) {
      await client.query("ROLLBACK").catch(() => {});
      console.error(`❌ [projects] "${item.row.title}" eklenemedi:`, error);
    } finally {
      client.release();
    }
  }
}

// Sunucu açılışında çağrılır. Projeler tablosu boşsa ya da yalnızca eski demo
// projelerini içeriyorsa, gerçek 32 projeyi (kullanıcının verdiği sırayla,
// TR/EN) yükler. Kullanıcı kendi projelerini eklediyse / sıralamayı
// değiştirdiyse dokunmaz; böylece admin paneldeki düzenlemeler korunur.
export async function ensureProjectsSeeded() {
  try {
    await ensureEnColumns();

    const existing = await db.select().from(projects);
    const titles = existing.map((p) => p.title);
    console.log(
      `🔍 [projects] ${existing.length} proje bulundu: ${JSON.stringify(titles)}`,
    );

    const isEmpty = existing.length === 0;
    const isDemoOnly =
      existing.length > 0 && existing.every((p) => DEMO_TITLES.has(p.title));

    if (!isEmpty && !isDemoOnly) {
      // Gerçek/kullanıcı tarafından yönetilen veri var — HİÇBİR ŞEYE DOKUNMA.
      // Sıralama, başlık, silme/ekleme gibi admin panelde yapılan düzenlemeler
      // korunur; açılışta seed'e göre yeniden düzenleme YAPILMAZ.
      console.log(
        "ℹ️  [projects] Kullanıcı verisi mevcut — admin düzenlemeleri korunuyor, dokunulmadı.",
      );
    } else {
      if (isDemoOnly) {
        console.log("🧹 [projects] Demo projeler siliniyor...");
        await db.delete(projects);
      }

      await db.insert(projects).values(realProjectRows());
      console.log(
        `✅ [projects] ${PROJECTS_SEED.length} gerçek proje yüklendi.`,
      );
    }

    // Sonradan eklenen projeleri (her biri yalnızca bir kez) yerleştir.
    await ensureAddedProjects();
  } catch (error) {
    // Açılışı bloklamamak için hatayı yalnızca logla (ama görünür olsun).
    console.error("❌ [projects] Otomatik yükleme başarısız:", error);
  }
}
