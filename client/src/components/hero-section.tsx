import { Button } from "@/components/ui/button";
import { Rocket, MessageCircle } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="ana-sayfa" className="pt-16 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          <div className="animate-slide-up">
            <h1 className="text-5xl lg:text-6xl font-poppins font-bold text-slate-800 leading-tight mb-6" style={{fontFamily: "'Poppins', sans-serif"}}>
              <span className="text-primary">Yapay Zeka</span>
              <br />ile
              <br />İşinizi İleriye Taşıyın
            </h1>
            <p className="text-xl font-inter text-slate-600 mb-8 leading-relaxed" style={{fontFamily: "'Inter', sans-serif"}}>
              Third Hand AI Agency olarak şirketinize özel, terzi usulü AI çözümleri ve otomasyonları ile rekabette öne geçmenizi sağlıyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => scrollToSection("hizmetler")}
                className="bg-primary text-white hover:bg-primary/90 transform hover:scale-105 transition-all"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Hizmetlerimizi Keşfedin
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("iletisim")}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                İletişime Geçin
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
                <h3 className="text-2xl font-bold mb-2">Third Hand</h3>
                <p className="text-blue-400 text-lg font-medium">AI Agency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
