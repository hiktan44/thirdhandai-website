import { Button } from "@/components/ui/button";
import { Users, Rocket, Tag, Headphones, Phone, ServerCog } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SpaceBackground from "./space-background";

export default function AboutSection() {
  const { t } = useLanguage();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const features = [
    {
      icon: Users,
      title: t('about.features.team.title'),
      description: t('about.features.team.description'),
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-600",
      iconColor: "text-white"
    },
    {
      icon: Rocket,
      title: t('about.features.tech.title'),
      description: t('about.features.tech.description'),
      bgColor: "bg-green-50",
      iconBg: "bg-green-600",
      iconColor: "text-white"
    },
    {
      icon: Tag,
      title: t('about.features.pricing.title'),
      description: t('about.features.pricing.description'),
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-600",
      iconColor: "text-white"
    },
    {
      icon: Headphones,
      title: t('about.features.support.title'),
      description: t('about.features.support.description'),
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-600",
      iconColor: "text-white"
    }
  ];

  const stats = [
    { number: "7", label: "AI Uzmanı" },
    { number: "5", label: "Yıllık Deneyim" },
    { number: "100+", label: "Başarılı Proje" }
  ];

  return (
    <section id="hakkimizda" className="py-20 bg-white/10 backdrop-blur-sm relative overflow-hidden">
      {/* Animated Background */}
      <SpaceBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🧠</div>
                  <div className="w-12 h-12 border-2 border-white rounded-lg mx-auto"></div>
                </div>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">Third Hand</h3>
              <p className="text-blue-400 text-lg font-bold">AI Agency</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-blue-400">5+</span>
                <p className="text-slate-300 font-medium">{t('about.experience')}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-heading font-bold text-white mb-6">{t('about.title')}</h2>
            <p className="text-xl text-slate-300 font-medium mb-8 leading-relaxed">
              {t('about.intro')}
            </p>
            <p className="text-slate-400 font-medium mb-8 leading-relaxed">
              {t('about.mission')}
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 rounded-xl">
                  <div className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h4 className="font-heading font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-300 font-medium">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => scrollToSection("iletisim")}
              >
                <Phone className="w-4 h-4 mr-2" />
                {t('nav.contact')}
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => scrollToSection("hizmetler")}
              >
                <ServerCog className="w-4 h-4 mr-2" />
                {t('nav.services')}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
              <p className="text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
