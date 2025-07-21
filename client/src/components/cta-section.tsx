import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SpaceBackground from "./space-background";

export default function CTASection() {
  const { t } = useLanguage();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-20 bg-white/10 backdrop-blur-sm relative overflow-hidden">
      {/* Animated Background */}
      <SpaceBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-heading font-bold text-white mb-6">{t('cta.title')}</h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          {t('cta.subtitle')}
        </p>
        <Button 
          size="lg"
          className="bg-white text-primary hover:bg-blue-50 text-lg"
          onClick={() => scrollToSection("iletisim")}
        >
          <Gift className="w-5 h-5 mr-2" />
          {t('cta.button')}
        </Button>
      </div>
    </section>
  );
}
