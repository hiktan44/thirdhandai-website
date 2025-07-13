import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ServerCog, Code, Scissors, ArrowRight, Check, Loader2, Image, LineChart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import * as Icons from "lucide-react";

export default function ServicesSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const { data: aiModels = [], isLoading } = useQuery({
    queryKey: ["/api/ai-models"],
  });

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
    }
  ];

  const getIconComponent = (iconName?: string | null) => {
    if (!iconName) return Brain;
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Brain;
  };

  const bgColors = ["bg-blue-100", "bg-green-100", "bg-purple-100", "bg-orange-100"];
  const iconColors = ["text-blue-600", "text-green-600", "text-purple-600", "text-orange-600"];
  const hoverBgs = ["group-hover:bg-blue-600", "group-hover:bg-green-600", "group-hover:bg-purple-600", "group-hover:bg-orange-600"];

  return (
    <section id="hizmetler" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Hizmetlerimiz</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            İşletmenizin ihtiyaçlarına özel, modern yapay zeka çözümleri sunuyoruz. İster küçük bir işletme olun, ister kurumsal bir firma - size uygun AI çözümlerimiz var.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {defaultServices.map((service, index) => (
            <Card key={index} className="border border-slate-200 hover:shadow-xl transition-all hover:border-blue-200 group cursor-pointer">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-6 ${service.hoverBg} transition-colors`}>
                  <service.icon className={`w-8 h-8 ${service.iconColor} group-hover:text-white transition-colors`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                <ul className="space-y-2 text-sm text-slate-600 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
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

        {/* AI Models Section */}
        {aiModels.length > 0 && (
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">AI Modellerimiz</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiModels.map((model, index) => {
                const IconComponent = getIconComponent(model.icon);
                const colorIndex = index % bgColors.length;
                return (
                  <Card key={model.id} className="border border-slate-200 hover:shadow-xl transition-all hover:border-blue-200 group cursor-pointer">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 ${bgColors[colorIndex]} rounded-xl flex items-center justify-center mb-6 ${hoverBgs[colorIndex]} transition-colors`}>
                        <IconComponent className={`w-8 h-8 ${iconColors[colorIndex]} group-hover:text-white transition-colors`} />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-4">{model.name}</h3>
                      <p className="text-slate-600 mb-6">{model.description}</p>
                      {model.features && model.features.length > 0 && (
                        <ul className="space-y-2 text-sm text-slate-600 mb-6">
                          {model.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center">
                              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button 
                        variant="link" 
                        className="text-primary font-semibold hover:text-primary/80 p-0"
                        onClick={() => scrollToSection("iletisim")}
                      >
                        Detaylı Bilgi <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
