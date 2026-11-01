// Blog yazısı: Yapay zekâ sohbet botlarıyla konuşurken dikkat edilmesi gerekenler.
// Görseller: client/public/blog/ai-sohbet/ (fotoğraflar .webp, infografikler .svg)
import type { BlogPost } from "../blog-posts";

const IMG = "/blog/ai-sohbet";

export const aiSohbetRehberi: BlogPost = {
  slug: "yapay-zeka-ile-sohbet-rehberi",
  title: "ChatGPT ve Diğer Yapay Zekâlarla Konuşurken Nelere Dikkat Etmeliyiz?",
  category: "Rehber",
  date: "2026-11-01",
  readMinutes: 13,
  excerpt:
    "Yapay zekâ doğru kullanıldığında harika bir yardımcı; dikkatsiz kullanıldığında ise kendinden emin bir şekilde yanlış bilgi veren ve sırlarınızı saklamayan bir sohbet arkadaşı. Daha iyi soru sormanın, cevaplara ne kadar güvenmeniz gerektiğinin ve bilgilerinizi korumanın sade, adım adım rehberi.",
  coverImage: `${IMG}/kapak.webp`,
  tags: ["ChatGPT", "Gemini", "Claude", "Prompt", "Gizlilik", "KVKK", "Yapay Zekâ Okuryazarlığı"],
  content: `
<p>ChatGPT, Gemini, Claude, Copilot, DeepSeek... Yapay zekâ sohbet asistanları artık hayatımızın bir parçası. Tarif soruyoruz, e-posta yazdırıyoruz, çocuğumuzun ödevini anlamaya çalışıyoruz, iş planı hazırlıyoruz. Ama çoğumuz bu araçları kimse bize nasıl kullanılacağını anlatmadan kullanmaya başladık.</p>

<p>Bu yazıda, teknik bilgi gerektirmeden herkesin uygulayabileceği basit kuralları bir araya getirdik: <strong>daha iyi cevap almak için nasıl soru sormalı, gelen cevaba ne kadar güvenmeli ve hangi bilgileri asla paylaşmamalı.</strong></p>

<div class="post-note">
  <strong>Bu yazıda neler var?</strong>
  <ol>
    <li>Yapay zekâ aslında nasıl cevap veriyor?</li>
    <li>Daha iyi cevap için daha iyi soru</li>
    <li>Cevaplara ne kadar güvenmeli?</li>
    <li>Gizlilik ve güvenlik: Ne yazılır, ne yazılmaz?</li>
    <li>Akıllı kullanım alışkanlıkları ve kopyalayıp kullanabileceğiniz hazır kalıplar</li>
  </ol>
</div>

<h2>Önce şunu anlayalım: Yapay zekâ nasıl cevap veriyor?</h2>
<p>Yapay zekâ sohbet botları bir ansiklopedi ya da arama motoru gibi çalışmaz. Okudukları milyarlarca metinden öğrendikleri kalıplara göre, sorunuza en uygun görünen kelimeleri sırayla <em>tahmin ederek</em> cevap yazarlar. Bu yüzden çoğu zaman şaşırtıcı derecede iyi sonuç verirler; ama bir şeyi bilmediklerinde bunu her zaman söylemezler. Bilmedikleri boşluğu, akla yatkın görünen bir şeyle doldurabilirler.</p>

<p>En sağlıklı bakış açısı şudur: Karşınızda <strong>çok hızlı, çok bilgili ama zaman zaman kendinden emin bir şekilde yanılan ve sizi memnun etmeye çalışan bir stajyer</strong> var. Ona iyi talimat verirseniz harika iş çıkarır. Yaptığı işi kontrol etmezseniz başınızı ağrıtabilir.</p>

<div class="post-tip"><strong>💡 Akılda tutun:</strong> Cevabın akıcı, düzgün ve kendinden emin olması, doğru olduğu anlamına gelmez.</div>

<h2>1. Bölüm: Daha iyi cevap için daha iyi soru</h2>
<p>Yapay zekâdan aldığınız cevabın kalitesi, büyük ölçüde sorunuzun kalitesine bağlıdır. Yapay zekâya yazdığınız bu talimata İngilizcede <em>prompt</em> (istem) deniyor. OpenAI, Google ve Anthropic'in kendi kullanım rehberleri aynı noktada birleşiyor: <strong>net olun, bağlam verin, ne istediğinizi tarif edin.</strong></p>

<h3>Ne istediğinizi açıkça söyleyin</h3>
<p>Yapay zekâ aklınızı okuyamaz. "Bana bir e-posta yaz" dediğinizde kime, ne için, hangi tonda yazacağını tahmin etmek zorunda kalır ve ortaya herkese uyan ama kimsenin işine yaramayan bir metin çıkar. Aynı isteği birkaç cümleyle zenginleştirdiğinizde ise sonuç bambaşka olur:</p>

<figure><a class="diagram-link" href="${IMG}/kotu-iyi-soru.svg" target="_blank" rel="noopener" title="Büyütmek için tıklayın"><img class="blog-img blog-diagram" src="${IMG}/kotu-iyi-soru.svg" alt="Belirsiz soru ile net soru karşılaştırması: Bana bir e-posta yaz yerine kim olduğunuzu, kime yazdığınızı, uzunluğu ve tonu belirten bir soru" loading="lazy"/></a><figcaption>Birkaç cümlelik ek bilgi, cevabın kalitesini bambaşka bir seviyeye taşır.</figcaption></figure>

<h3>Bağlam verin: Kim, kime, neden?</h3>
<p>Kendinizi, hedef kitlenizi ve amacınızı anlatın. "Emekli bir öğretmenim, 8 yaşındaki torunuma doğum günü kartı yazacağım" ile "bir doğum günü mesajı yaz" arasında dağlar kadar fark vardır. İlgili bilgi verdikçe cevap size özel hâle gelir.</p>

<h3>Bir rol verin</h3>
<p>"Deneyimli bir insan kaynakları uzmanı gibi davran" ya da "sabırlı bir matematik öğretmeni gibi anlat" gibi bir rol vermek, cevabın bakış açısını ve dilini belirgin şekilde değiştirir. OpenAI'nin ChatGPT için yayımladığı rehberde de ilk önerilerden biri budur.</p>

<h3>Cevabın şeklini tarif edin</h3>
<p>Uzunluk, biçim ve ton belirtin: "5 madde hâlinde", "bir tablo olarak", "en fazla 150 kelime", "bir çocuğun anlayacağı dilde", "resmî bir üslupla". Beğendiğiniz bir örnek varsa onu da paylaşın. "Şu örnekteki gibi yaz" demek, uzun uzun tarif etmekten çoğu zaman daha etkilidir.</p>

<p>Bu dört parçayı bir araya getirdiğinizde, neredeyse her soruya uygulanabilecek basit bir formül ortaya çıkar:</p>

<figure><a class="diagram-link" href="${IMG}/soru-formulu.svg" target="_blank" rel="noopener" title="Büyütmek için tıklayın"><img class="blog-img blog-diagram" src="${IMG}/soru-formulu.svg" alt="İyi bir sorunun dört parçası: Rol, Görev, Bağlam ve Format; altında bu parçaların birleştiği örnek soru" loading="lazy"/></a><figcaption>Rol + Görev + Bağlam + Format. Google'ın Gemini rehberinde de önerilen bu yapı, her soruya uyarlanabilir.</figcaption></figure>

<h3>Büyük işleri parçalara bölün</h3>
<p>"Bana tüm iş planımı yaz" yerine adım adım ilerleyin: önce ana başlıkları çıkarın, sonra her başlığı ayrı ayrı geliştirin. Karmaşık işlerde "önce bana bir plan sun, onaylarsam devam et" ya da "adım adım düşünerek çöz" demek hata ihtimalini azaltır.</p>

<h3>İlk cevapla yetinmeyin, sohbet edin</h3>
<p>Yapay zekâyla konuşmak tek atışlık bir şey değildir. Cevabı beğenmediyseniz neyi beğenmediğinizi söyleyin: "daha kısa olsun", "ikinci maddeyi bir örnekle açıkla", "daha samimi bir dil kullan". Aynı sohbet içinde düzelttikçe sonuç hızla iyileşir.</p>

<h3>Yönlendirici değil, tarafsız sorun</h3>
<p>"Bu iş fikri harika, değil mi?" diye sorarsanız büyük ihtimalle "Evet, harika!" cevabını alırsınız. Bunun yerine "Bu iş fikrinin güçlü ve zayıf yönlerini ayrı ayrı listele" deyin. Bunun neden bu kadar önemli olduğunu aşağıda, <em>dalkavukluk</em> başlığında rakamlarla anlatıyoruz.</p>

<h2>2. Bölüm: Cevaplara ne kadar güvenmeli?</h2>

<figure><img class="blog-img" src="${IMG}/dogrulama.webp" alt="Bir belgeyi büyüteçle inceleyen el, yanında dizüstü bilgisayar ve çay" loading="lazy"/><figcaption>Yapay zekâ ilk taslağı hazırlar; son kontrolü her zaman bir insan yapmalı.</figcaption></figure>

<h3>Yapay zekâ "uydurabilir": Halüsinasyon</h3>
<p>Yapay zekânın gerçekte var olmayan bilgileri, kişileri, kitapları, linkleri ya da istatistikleri son derece ikna edici bir dille sunmasına <strong>halüsinasyon</strong> denir. Bu nadir görülen bir arıza değil, bu teknolojinin doğasında olan bir risktir. Rakamlar durumu net gösteriyor:</p>
<ul>
  <li>Avrupa Yayın Birliği (EBU) ve BBC'nin 18 ülkede, 14 dilde, 22 yayın kuruluşuyla yürüttüğü ve 3.000'den fazla cevabın gazeteciler tarafından incelendiği araştırmada, ChatGPT, Copilot, Gemini ve Perplexity'nin haberlerle ilgili cevaplarının <strong>%45'inde en az bir ciddi sorun</strong> bulundu. Cevapların %31'inde kaynak gösterme sorunu, %20'sinde ise uydurma ya da güncelliğini yitirmiş bilgi gibi büyük doğruluk hataları vardı.</li>
  <li>Amerikan Barolar Birliği'nin aktardığına göre, Mayıs 2026 itibarıyla yalnızca ABD'de <strong>1.397 davada</strong> mahkemeye yapay zekânın uydurduğu sahte içtihatlar ve alıntılar sunulduğu tespit edildi. Pek çok avukat para cezası aldı; bir davada bu yüzden dava tamamen düşürüldü.</li>
</ul>
<p>Yani profesyoneller bile bu tuzağa düşüyor. Çözüm basit ama ihmal edilmemeli: <strong>önemli her bilgiyi ikinci, güvenilir bir kaynaktan doğrulayın.</strong> Yapay zekâdan kaynak isteyin, ama o kaynağa tıklayıp gerçekten var olduğunu ve söylenen şeyi gerçekten içerdiğini kendiniz kontrol edin. Çünkü yapay zekâ kaynağın kendisini de uydurabilir.</p>

<div class="post-tip"><strong>💡 İşe yarayan bir cümle:</strong> Sorunuzun sonuna "Emin olmadığın bilgileri ayrıca belirt, bilmiyorsan bilmiyorum de." ekleyin. Hatayı tamamen önlemez ama riskli noktaları görmenizi kolaylaştırır.</div>

<h3>Bilgi güncel olmayabilir</h3>
<p>Her yapay zekâ modeli belirli bir tarihe kadarki verilerle eğitilir. İnternette arama özelliği açık değilse dünkü haberi, bugünkü döviz kurunu, yeni çıkan bir yönetmeliği ya da bir ürünün güncel fiyatını bilemez. Daha kötüsü, eski bilgiyi güncelmiş gibi anlatabilir. Güncel bir konuda soru soruyorsanız kullandığınız uygulamada web aramasının açık olduğundan emin olun ve cevaptaki tarihlere dikkat edin.</p>

<h3>Dalkavukluk: Size hak vermeye meyilli</h3>
<p>Yapay zekâ modelleri kullanıcıyı memnun edecek şekilde eğitildiği için çoğu zaman size katılma eğilimindedir. Buna dalkavukluk (İngilizcede <em>sycophancy</em>) deniyor. Stanford Üniversitesi araştırmacılarının Mart 2026'da saygın bilim dergisi <em>Science</em>'ta yayımlanan çalışması bu eğilimi çarpıcı biçimde ortaya koydu:</p>
<ul>
  <li>ChatGPT, Claude, Gemini ve DeepSeek dahil 11 model incelendi; yapay zekâlar kullanıcılara insanlardan <strong>%49 daha sık hak verdi.</strong></li>
  <li>Sorumsuz davranışların anlatıldığı 6.500'den fazla örnekte modeller zararlı, aldatıcı ya da yasa dışı davranışları <strong>%47 oranında onayladı.</strong></li>
  <li>2.400'den fazla kişiyle yapılan deneyde katılımcılar kendilerine hak veren yapay zekâyı daha güvenilir buldu, kendilerini daha haklı hissetti ve özür dileme istekleri azaldı. Üstelik dalkavukça cevabı tarafsız cevaptan ayırt edemediler.</li>
</ul>
<p>Pratikteki anlamı şu: bir kararı, bir iş planını ya da bir anlaşmazlığı yapay zekâya danışırken onu bilerek <strong>itiraz etmeye</strong> zorlayın. "Bana katılmak zorunda değilsin, bu planı acımasızca eleştir", "şeytanın avukatlığını yap", "karşı tarafın gözünden bak" gibi ifadeler işe yarar. Kişisel ve duygusal konularda ise yapay zekâ, güvendiğiniz insanların yerini tutmaz.</p>

<h3>Sağlık, hukuk ve para: Bilgi edinin, kararı uzmanla verin</h3>
<p>Yapay zekâ bir tahlil sonucundaki terimleri açıklamak, bir sözleşmedeki maddeleri sadeleştirmek ya da bir yatırım ürününün ne olduğunu anlatmak için mükemmel bir başlangıç noktasıdır. Ama teşhis, tedavi, dava stratejisi ya da yatırım kararı için doktorunuzun, avukatınızın veya mali müşavirinizin yerine geçemez. Yapay zekâyı, uzmana gitmeden önce <strong>doğru soruları hazırlamak</strong> için kullanın.</p>

<h3>Hesaplara ve sayılara dikkat</h3>
<p>Yapay zekâ dil konusunda çok güçlüdür ama sayılarda her zaman aynı başarıyı göstermez. Toplamları, yüzdeleri, faiz hesaplarını, tarih farklarını mutlaka kendiniz kontrol edin. Önemli bir hesapta "bu hesabı adım adım göster" demek, hatayı yakalamanızı kolaylaştırır.</p>

<figure><a class="diagram-link" href="${IMG}/kontrol-listesi.svg" target="_blank" rel="noopener" title="Büyütmek için tıklayın"><img class="blog-img blog-diagram" src="${IMG}/kontrol-listesi.svg" alt="Cevabı kullanmadan önce sorulacak 5 soru: önemli bir karar mı, kaynak var mı, bilgi güncel mi, sadece hak mı veriyor, sayılar tutuyor mu" loading="lazy"/></a><figcaption>Önemli bir cevabı kullanmadan önce bu beş soruyu sormak, hataların büyük kısmını yakalar.</figcaption></figure>

<h2>3. Bölüm: Gizlilik ve güvenlik</h2>

<figure><img class="blog-img" src="${IMG}/gizlilik.webp" alt="Ekranında kilit simgesi bulunan akıllı telefon, yanında defter ve kalem" loading="lazy"/><figcaption>Sohbet penceresi bir günlük değildir; yazdığınız her şey bir şirketin sunucularına gider.</figcaption></figure>

<p>Yapay zekâyla sohbet etmek, kapalı bir odada bir arkadaşla konuşmak gibi hissettirir. Gerçekte ise yazdığınız her şey bir şirketin sunucularına gönderilir, orada işlenir ve çoğu zaman saklanır. Bu yüzden sohbet penceresini bir günlük gibi değil, bir <strong>kartpostal</strong> gibi düşünün: yolda başkalarının da okuyabileceği bir şey.</p>

<h3>Neyi asla paylaşmamalısınız?</h3>
<p>Kimlik numaranızı, kart ve hesap bilgilerinizi, şifrelerinizi, isimli sağlık belgelerinizi yazmayın. Başkalarının kişisel bilgilerini de paylaşmayın; bu yalnızca etik değil, hukuki bir konudur. Mozilla Vakfı'nın gizlilik rehberi de aynı şeyi öneriyor: adres gerekiyorsa tam adres yerine semt ya da şehir gibi genel bilgiler kullanın.</p>

<figure><a class="diagram-link" href="${IMG}/paylasma-listesi.svg" target="_blank" rel="noopener" title="Büyütmek için tıklayın"><img class="blog-img blog-diagram" src="${IMG}/paylasma-listesi.svg" alt="Sohbet kutusuna asla yazılmaması gerekenler ve rahatça yazılabilecekler listesi" loading="lazy"/></a><figcaption>Kısa yol: Bir yabancının okumasını istemeyeceğiniz hiçbir şeyi yazmayın.</figcaption></figure>

<h3>İş yerinde ekstra dikkat: Şirket sırları ve KVKK</h3>
<p>2023'te Samsung'da bazı mühendislerin, hata ayıklamak için şirketin gizli kaynak kodunu ve toplantı notlarını ChatGPT'ye yapıştırdığı ortaya çıktı; şirket bunun üzerine çalışanlarının bu araçları kullanmasını kısıtladı. Benzer bir hataya düşmemek için müşteri listelerini, teklifleri, sözleşmeleri, maaş tablolarını ya da kaynak kodu, şirketinizin onayladığı kurumsal bir yapay zekâ hizmeti dışında paylaşmayın.</p>
<p>Türkiye'de Kişisel Verileri Koruma Kurumu da 24 Kasım 2025'te <strong>"Üretken Yapay Zekâ ve Kişisel Verilerin Korunması Rehberi"</strong>ni yayımladı. Rehber hem bu araçları kullanan kurumlara, hem günlük hayatta kullanan bireylere, hem de çocuklarının kullanımını takip eden ebeveynlere yönelik tavsiyeler içeriyor. Müşterinizin ya da çalışanınızın kişisel verisini bir yapay zekâ aracına yüklemeden önce iki kez düşünün; gerekiyorsa isimleri ve kimlik bilgilerini silip "Müşteri A", "Çalışan B" gibi takma adlar kullanın.</p>

<h3>Ayarlarınızı bir kez kontrol edin</h3>
<p>Çoğu yapay zekâ uygulaması sohbetlerinizi modelini geliştirmek için kullanabilir, ama bunu kapatmanıza da izin verir. Beş dakikanızı ayırıp şunlara bakın:</p>
<ul>
  <li><strong>Eğitimde kullanım:</strong> ChatGPT'de Ayarlar &gt; Veri kontrolleri bölümündeki "Modeli herkes için iyileştir" (Improve the model for everyone) seçeneğini kapatabilirsiniz. Gemini'de etkinlik ayarlarından, Claude'da gizlilik ayarlarından benzer bir tercih yapılır.</li>
  <li><strong>Geçici sohbet:</strong> ChatGPT'deki "Geçici Sohbet" geçmişinize kaydedilmez ve modelin eğitiminde kullanılmaz; yine de güvenlik amacıyla 30 güne kadar saklanabilir.</li>
  <li><strong>Hafıza:</strong> Bazı uygulamalar sizinle ilgili bilgileri sonraki sohbetler için hatırlar. Neleri hatırladığını ara sıra kontrol edin, istemediklerinizi silin.</li>
  <li><strong>Telefon izinleri:</strong> Konum, rehber, fotoğraf ve mikrofon izinlerini yalnızca gerçekten gerektiğinde açık tutun.</li>
</ul>

<h3>"Paylaş" linkine dikkat</h3>
<p>Temmuz 2025'te, ChatGPT'nin paylaşım özelliğiyle oluşturulup "aranabilir" yapılan sohbetlerden <strong>4.500'den fazlasının Google aramalarında çıktığı</strong> ortaya çıktı. Bazılarında isimler, özgeçmişler, kişisel dertler ve gizli iş bilgileri vardı. OpenAI bu seçeneği kaldırdı, ama ders kalıcı: bir sohbetin linkini paylaştığınızda, linke ulaşan herkes içeriği görebilir. Ayrıca sohbeti geçmişinizden silmek, daha önce oluşturduğunuz paylaşım linkini kendiliğinden silmez.</p>

<h3>Sohbetleriniz yasal olarak "mahrem" değil</h3>
<p>OpenAI'nin CEO'su Sam Altman, Temmuz 2025'te pek çok kişinin ChatGPT'yi bir terapist gibi kullandığını, ancak bu sohbetlerin doktor ya da avukatla yapılan görüşmeler gibi yasal gizlilik korumasına sahip olmadığını açıkça söyledi. Yani bir dava sürecinde bu kayıtların talep edilmesi mümkün. Bir sohbet kural ihlali şüphesiyle işaretlendiğinde şirket çalışanlarının konuşmayı inceleyebildiğini de unutmayın.</p>

<h2>4. Bölüm: Akıllı kullanım alışkanlıkları</h2>

<h3>Yeni konu, yeni sohbet</h3>
<p>Çok uzun sohbetlerde yapay zekâ baştaki talimatları unutmaya ve konuları birbirine karıştırmaya başlayabilir. Konu değiştiğinde yeni bir sohbet açın. Uzun bir çalışmaya devam edecekseniz "şu ana kadar konuştuklarımızı özetle" deyin ve bu özeti yeni sohbetin başına yapıştırarak kaldığınız yerden sürdürün.</p>

<h3>Farklı yapay zekâlara sorun, karşılaştırın</h3>
<p>ChatGPT, Gemini, Claude ve Copilot'un güçlü olduğu alanlar birbirinden farklıdır. Önemli bir konuda aynı soruyu iki farklı asistana sormak hem farklı bakış açıları kazandırır hem de birinin hatasını diğerinin cevabıyla yakalamanızı sağlar. İki cevap birbiriyle çelişiyorsa, bu doğrulama yapmanız gerektiğinin işaretidir.</p>

<h3>Sahte uygulamalara ve linklere dikkat</h3>
<p>Uygulama mağazalarında popüler yapay zekâ markalarını taklit eden uygulamalar bulunabiliyor. Uygulamaları yalnızca resmî mağazalardan ve gerçek geliştiricisinden indirin. Yapay zekânın önerdiği linklere ve dosyalara da diğer internet linklerine gösterdiğiniz özeni gösterin.</p>

<h3>Son karar ve sorumluluk sizde</h3>
<p>Yapay zekânın yazdığı bir e-postayı göndermeden, hazırladığı bir raporu paylaşmadan önce baştan sona okuyun; altına imzanızı atan sizsiniz. Yapay zekâyı düşünmenin yerine değil, düşünmenize yardım eden bir araç olarak kullanın: taslak hazırlatın, fikir alın, özet çıkarın, ama değerlendirmeyi siz yapın.</p>

<h2>Kopyalayıp kullanabileceğiniz hazır kalıplar</h2>
<p>Köşeli parantez içindeki yerleri kendi bilgilerinizle doldurup doğrudan kullanabilirsiniz:</p>

<div class="post-prompt"><span>Bir konuyu anlamak için</span>"[Konu] hakkında hiçbir şey bilmeyen birine anlatır gibi açıkla. Önce 3 cümlelik kısa bir özet ver, sonra günlük hayattan bir örnekle detaylandır. Emin olmadığın noktaları ayrıca belirt."</div>

<div class="post-prompt"><span>Bir metin yazdırmak için</span>"Ben [kim olduğunuz]. [Kime] hitaben, [amaç] için bir [e-posta / mesaj / duyuru] yaz. Ton: [samimi / resmî]. Uzunluk: en fazla [X] kelime."</div>

<div class="post-prompt"><span>Bir kararı test etmek için</span>"Şunu yapmayı düşünüyorum: [planınız]. Bana katılmak zorunda değilsin. Bu planın en zayıf 5 yönünü, risklerini ve gözden kaçırdığım noktaları dürüstçe listele."</div>

<div class="post-prompt"><span>Bir metni özetletmek için</span>"Aşağıdaki metni 5 maddede özetle. Ardından bu metinle ilgili sormam gereken 3 önemli soruyu yaz. Metinde olmayan hiçbir bilgiyi ekleme."</div>

<div class="post-prompt"><span>Uzmana gitmeden önce hazırlık için</span>"[Doktora / avukata / mali müşavire] gideceğim. Durumum kısaca şu: [kişisel bilgi içermeyen kısa açıklama]. Bu görüşmede sormam gereken en önemli 10 soruyu hazırla."</div>

<h2>Özet: Cebinizde dursun</h2>
<ol>
  <li><strong>Net olun:</strong> Kim olduğunuzu, ne istediğinizi, kimin için ve hangi biçimde istediğinizi söyleyin.</li>
  <li><strong>Sohbet edin:</strong> İlk cevabı düzelttirin, geliştirin.</li>
  <li><strong>Doğrulayın:</strong> Önemli bilgiyi ikinci bir kaynaktan kontrol edin, kaynak linklerine tıklayın.</li>
  <li><strong>İtiraz isteyin:</strong> Size hak vermesini değil, eleştirmesini isteyin.</li>
  <li><strong>Uzmanın yerine koymayın:</strong> Sağlık, hukuk ve para konularında son söz uzmanındır.</li>
  <li><strong>Sır vermeyin:</strong> Kimlik, şifre, kart, sağlık, müşteri ve şirket bilgisi yazmayın.</li>
  <li><strong>Ayarlara bakın:</strong> Eğitimde kullanım, hafıza ve paylaşım linklerini kontrol edin.</li>
  <li><strong>Sorumluluğu sahiplenin:</strong> Yapay zekâ taslağı hazırlar, kararı siz verirsiniz.</li>
</ol>

<p>Doğru kullanıldığında yapay zekâ günde saatler kazandıran, öğrenmeyi hızlandıran ve yaratıcılığı artıran olağanüstü bir araç. Onu iyi kullanmak için teknik bilgiye değil, yukarıdaki birkaç basit alışkanlığa ihtiyacınız var.</p>

<div class="post-cta">
  <strong>Ekibiniz için yapay zekâ eğitimi</strong>
  <p>Third Hand olarak şirketlere, çalışanların yapay zekâyı verimli ve güvenli kullanmasını sağlayan uygulamalı eğitimler ve kurum içi kullanım kuralları hazırlıyoruz. Ekibinizin bu araçlardan en iyi şekilde yararlanmasını istiyorsanız <a href="/#iletisim">bizimle iletişime geçin</a>.</p>
</div>

<h2>Kaynaklar</h2>
<ul class="post-sources">
  <li><a href="https://www.ebu.ch/news/2025/10/ai-s-systemic-distortion-of-news-is-consistent-across-languages-and-territories-international-study-by-public-service-broadcaste" target="_blank" rel="noopener">EBU ve BBC: Yapay zekâ asistanlarının haberleri çarpıtması üzerine uluslararası çalışma (Ekim 2025)</a></li>
  <li><a href="https://www.powershealth.org/about-us/newsroom/health-library/2026/03/27/want-a-bootlicking-yes-man-ask-an-ai-chatbot-for-advice-study-warns" target="_blank" rel="noopener">HealthDay: Stanford'ın Science dergisinde yayımlanan yapay zekâ dalkavukluğu çalışması (Mart 2026)</a></li>
  <li><a href="https://www.americanbar.org/groups/gpsolo/resources/magazine/2026-may-jun/suspect-hallucination-when-generative-ai-finds-perfect-case" target="_blank" rel="noopener">Amerikan Barolar Birliği: Mahkemelerde yapay zekâ halüsinasyonları (Mayıs-Haziran 2026)</a></li>
  <li><a href="https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt" target="_blank" rel="noopener">OpenAI Yardım Merkezi: ChatGPT için istem yazma önerileri</a></li>
  <li><a href="https://9to5google.com/2024/04/09/gemini-google-workspace-prompting-guide/" target="_blank" rel="noopener">9to5Google: Google'ın Gemini istem yazma rehberi</a></li>
  <li><a href="https://www.mozillafoundation.org/en/privacynotincluded/articles/how-to-protect-your-privacy-from-chatgpt-and-other-ai-chatbots/" target="_blank" rel="noopener">Mozilla Vakfı: ChatGPT ve diğer sohbet botlarında gizliliğinizi koruma rehberi</a></li>
  <li><a href="https://www.kvkk.gov.tr/Icerik/8547/uretken-yapay-zeka-ve-kisisel-verilerin-korunmasi-rehberi-15-soruda" target="_blank" rel="noopener">KVKK: Üretken Yapay Zekâ ve Kişisel Verilerin Korunması Rehberi (Kasım 2025)</a></li>
  <li><a href="https://www.searchenginejournal.com/openai-is-pulling-shared-chatgpt-chats-from-google-search/552671/" target="_blank" rel="noopener">Search Engine Journal: Paylaşılan ChatGPT sohbetlerinin Google'dan kaldırılması (Temmuz 2025)</a></li>
  <li><a href="https://techcrunch.com/2025/07/25/sam-altman-warns-theres-no-legal-confidentiality-when-using-chatgpt-as-a-therapist" target="_blank" rel="noopener">TechCrunch: Sam Altman, ChatGPT sohbetlerinin yasal gizliliği olmadığı uyarısı (Temmuz 2025)</a></li>
</ul>
`,
};
