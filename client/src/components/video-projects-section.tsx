import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Video, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function VideoProjectsSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const { data: videos = [], isLoading } = useQuery({
    queryKey: ["/api/videos"],
  });

  const gradients = [
    "from-blue-500 to-purple-600",
    "from-green-500 to-blue-600",
    "from-purple-500 to-pink-600",
    "from-orange-500 to-red-600",
    "from-teal-500 to-blue-600"
  ];

  return (
    <section id="video-projeler" className="py-20 bg-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-white mb-4">Video Projelerimiz</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Yapay zeka ve teknoloji projelerimizin tanıtım videolarını inceleyebilirsiniz. AI çözümlerimizin nasıl çalıştığını ve iş süreçlerinize nasıl entegre olduğunu görebilirsiniz.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <Card key={video.id} className="border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
                <div className={`aspect-video bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center relative overflow-hidden`}>
                  {video.thumbnail ? (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mb-4 opacity-80 mx-auto" />
                      <p className="text-sm">Video: {video.title}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a 
                      href={video.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                    >
                      <Play className="w-8 h-8 text-white" />
                    </a>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-heading font-semibold text-slate-800 mb-2">{video.title}</h3>
                  <p className="text-slate-600 text-sm">{video.description || 'Video açıklaması'}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
