import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ServerCog, Code, Scissors, ArrowRight, Check, Camera, Video, Sparkles, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServicesSection() {
  const { t } = useLanguage();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };



  const defaultServices = [
    {
      icon: Brain,
      title: "AI Çözümleri",
      description: "Şirketinize özel yapay zeka çözümleri geliştiriyoruz. Veri analizi, tahmin modelleri ve karar destek sistemleri.",
      features: [
        "Veri analizleri ve tahminleme",
        "Doğal dil işleme sistemleri",
        "Görüntü ve ses tanıma"
      ],
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      hoverBg: "group-hover:bg-blue-600"
    },
    {
      icon: ServerCog,
      title: "AI Otomasyonları",
      description: "Tekrarlayan işleri otomatikleştirin, insan kaynaklarınızı daha değerli alanlara yönlendirin.",
      features: [
        "İş süreçleri otomasyonu",
        "Akıllı chatbot çözümleri",
        "Müşteri hizmetleri otomasyonu"
      ],
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      hoverBg: "group-hover:bg-green-600"
    },
    {
      icon: Code,
      title: "Özel Programlar",
      description: "İhtiyaçlarınıza özel yazılım çözümleri geliştiriyoruz. Web, mobil ve masaüstü uygulamaları.",
      features: [
        "Özel web ve mobil uygulamalar",
        "AI entegrasyonlu yazılımlar",
        "Veritabanı yönetim sistemleri"
      ],
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      hoverBg: "group-hover:bg-purple-600"
    },
    {
      icon: Scissors,
      title: "Terzi Usulü Çözümler",
      description: "Her müşterimizin ihtiyaçları farklıdır. Sizin için sektörünüze özel çözümler tasarlıyoruz.",
      features: [
        "Sektöre özel AI çözümleri",
        "Kişiselleştirilmiş danışmanlık",
        "Entegre teknoloji çözümleri"
      ],
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      hoverBg: "group-hover:bg-orange-600"
    },
    {
      icon: Camera,
      title: "AI Ürün Görselleri",
      description: "Ürünleriniz için yapay zeka destekli profesyonel görsel ve video içerikler üretiyoruz. E-ticaret ve pazarlama için özel çözümler.",
      features: [
        "AI ile ürün fotoğrafı üretimi",
        "360 derece ürün görüntüleri",
        "Arka plan değiştirme ve düzenleme",
        "Toplu görsel işleme"
      ],
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      hoverBg: "group-hover:bg-pink-600"
    },
    {
      icon: Video,
      title: "AI Video Prodüksiyon",
      description: "Markanız için AI destekli etkileyici video içerikler hazırlıyoruz. Reklam, tanıtım ve sosyal medya için özel efektli videolar.",
      features: [
        "AI destekli video düzenleme",
        "Otomatik altyazı ve dublaj",
        "Özel efekt ve animasyonlar",
        "Sosyal medya formatları"
      ],
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
      hoverBg: "group-hover:bg-indigo-600"
    },

    {
      icon: Brain,
      title: "GPT-4 Entegrasyonu",
      description: "OpenAI'nin en gelişmiş dil modeli GPT-4 ile güçlendirilmiş akıllı asistan çözümleri. Doğal dil işleme, metin üretimi ve analiz yetenekleri.",
      features: [
        "Gelişmiş doğal dil anlama",
        "Çok dilli destek",
        "Kod üretimi ve analizi",
        "Yaratıcı içerik oluşturma"
      ],
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      hoverBg: "group-hover:bg-emerald-600"
    },
    {
      icon: MessageSquare,
      title: "AI Sesli & Görüntülü Chatbot",
      description: "İşletmeniz için 1-2 gün içinde hazır! Sesli komutları anlayan, görüntü işleyebilen ve video desteği olan akıllı chatbot çözümleri.",
      features: [
        "Sesli komut ve yanıt sistemi",
        "Görüntü tanıma ve işleme",
        "Görüntülü AI asistan hizmetleri",
        "Ürün ve hizmetlerinizi tanıtan yapay zeka",
        "Müşteri sorularına anında yanıt",
        "1-2 günde hızlı teslimat",
        "7/24 müşteri desteği"
      ],
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      hoverBg: "group-hover:bg-cyan-600"
    }
  ];



  return (
    <section id="hizmetler" className="py-20 bg-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading text-slate-900 mb-4" style={{fontWeight: 800}}>Hizmetlerimiz</h2>
          <p className="text-xl font-sans text-slate-700 max-w-3xl mx-auto" style={{fontWeight: 500}}>
            İşletmenizin ihtiyaçlarına özel, modern yapay zeka çözümleri sunuyoruz. İster küçük bir işletme olun, ister kurumsal bir firma - size uygun AI çözümlerimiz var.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {defaultServices.map((service, index) => (
            <Card key={index} style={{background: 'linear-gradient(to bottom right, #fde68a, #fbbf24)'}} className="backdrop-blur-sm border-2 border-orange-400 hover:shadow-xl transition-all hover:border-orange-500 group cursor-pointer">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-6 ${service.hoverBg} transition-colors`}>
                  <service.icon className={`w-8 h-8 ${service.iconColor} group-hover:text-white transition-colors`} />
                </div>
                <h3 className="text-xl font-heading text-slate-900 mb-4" style={{fontWeight: 700}}>{service.title}</h3>
                <p className="font-sans text-slate-700 mb-6" style={{fontWeight: 500}}>{service.description}</p>
                <ul className="space-y-2 text-sm text-slate-700 mb-6" style={{fontWeight: 500}}>
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="link" 
                  className="text-primary font-semibold hover:text-primary/80 p-0"
                  onClick={() => scrollToSection("iletisim")}
                >
                  Detaylı Bilgi <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>
    </section>
  );
}
