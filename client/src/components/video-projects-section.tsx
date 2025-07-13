import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Video } from "lucide-react";

export default function VideoProjectsSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const videos = [
    {
      title: "AI Model Eğitimi",
      description: "Yapay zeka modellerinin nasıl eğitildiğini ve optimize edildiğini gösteren demo video.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Chatbot Entegrasyonu",
      description: "Akıllı chatbot sistemlerinin işletmelere nasıl entegre edildiğini gösteren demo.",
      gradient: "from-green-500 to-blue-600"
    },
    {
      title: "Veri Analizi Demo",
      description: "AI destekli veri analizi araçlarının kullanımını gösteren interaktif demo.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Sesli Asistan",
      description: "AI destekli sesli asistan teknolojilerinin çalışma prensipleri.",
      gradient: "from-orange-500 to-red-600"
    },
    {
      title: "Dijital Dönüşüm",
      description: "İşletmelerin AI ile nasıl dijital dönüşüm gerçekleştirdiğini gösteren vaka çalışması.",
      gradient: "from-teal-500 to-blue-600"
    }
  ];

  return (
    <section id="video-projeler" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Video Projelerimiz</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Yapay zeka ve teknoloji projelerimizin tanıtım videolarını inceleyebilirsiniz. AI çözümlerimizin nasıl çalıştığını ve iş süreçlerinize nasıl entegre olduğunu görebilirsiniz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <Card key={index} className="border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
              <div className={`aspect-video bg-gradient-to-br ${video.gradient} flex items-center justify-center`}>
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mb-4 opacity-80 mx-auto" />
                  <p className="text-sm">Video: {video.title}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{video.title}</h3>
                <p className="text-slate-600 text-sm">{video.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
            onClick={() => scrollToSection("iletisim")}
          >
            <Video className="w-4 h-4 mr-2" />
            Özel Video Projesi İsteyin
          </Button>
        </div>
      </div>
    </section>
  );
}
