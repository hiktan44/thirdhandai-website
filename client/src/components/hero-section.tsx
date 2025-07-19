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
      <SpaceBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          <div className="animate-slide-up">
            <h1 className="text-6xl lg:text-7xl font-heading text-white leading-tight mb-6" style={{fontWeight: 900}}>
              <span className="text-blue-400">{t('hero.title1')}</span>
              <br />{t('hero.title2')}
              <br />{t('hero.title3')}
            </h1>
            <p className="text-xl font-sans text-slate-300 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => scrollToSection("hizmetler")}
                className="bg-primary text-white hover:bg-primary/90 transform hover:scale-105 transition-all"
              >
                <Rocket className="w-4 h-4 mr-2" />
                {t('hero.cta1')}
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("iletisim")}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('hero.cta2')}
              </Button>
            </div>
          </div>
          <div className="lg:text-right animate-fade-in">
            <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl inline-block">
              <div className="w-32 h-32 bg-primary rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🧠</div>
                  <div className="w-12 h-12 border-2 border-white rounded-lg mx-auto"></div>
                </div>
              </div>
              <div className="text-white text-center">
                <h3 className="text-2xl font-heading font-bold mb-2">Third Hand</h3>
                <p className="text-blue-400 text-lg font-heading font-medium">AI Agency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
