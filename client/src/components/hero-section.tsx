import { Button } from "@/components/ui/button";
import { Rocket, MessageCircle } from "lucide-react";
import SpaceBackground from "./space-background";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="ana-sayfa" className="pt-16 min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div aria-hidden="true">
        <SpaceBackground />
      </div>

      <main id="main-content" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          <div className="animate-slide-up">
            <h1 className="text-7xl lg:text-8xl font-heading text-white mb-8" style={{fontWeight: 900, lineHeight: 1.2}}>
              <span className="text-blue-400">{t('hero.title1')}</span>
              <span className="block text-5xl lg:text-6xl">{t('hero.title2')} {t('hero.title3')}</span>
            </h1>
            <p className="text-xl font-sans text-slate-300 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("hizmetler")}
                className="bg-primary text-white hover:bg-primary/90 transform hover:scale-105 transition-all"
                aria-label={`${t('hero.cta1')} - Hizmetler bölümüne git`}
              >
                <Rocket className="w-4 h-4 mr-2" aria-hidden="true" />
                {t('hero.cta1')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("iletisim")}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                aria-label={`${t('hero.cta2')} - İletişim bölümüne git`}
              >
                <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                {t('hero.cta2')}
              </Button>
            </div>
          </div>
          <div className="lg:text-right animate-fade-in">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl inline-block">
              <img
                src="/logo.jpg"
                alt="Third Hand AI Agency - Yapay zeka çözümleri ve AI otomasyonları konusunda uzman teknoloji şirketi logosu"
                className="h-48 w-auto object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
