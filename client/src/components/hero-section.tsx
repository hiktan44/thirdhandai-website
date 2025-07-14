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
    <section id="ana-sayfa" className="pt-16 min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.8 + 0.2
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          <div className="animate-slide-up">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              <span className="text-blue-400">Yapay Zeka</span>
              <br />ile
              <br />İşinizi İleriye Taşıyın
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
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
