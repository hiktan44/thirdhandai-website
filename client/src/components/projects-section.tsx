import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lightbulb } from "lucide-react";

export default function ProjectsSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const projects = [
    {
      title: "fasheone.com",
      description: "Moda odaklı e-ticaret platformu için geliştirilmiş AI destekli kişiselleştirilmiş alışveriş deneyimi. Kullanıcı davranışlarını analiz ederek ürün önerileri sunan akıllı sistem.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
      url: "https://fasheone.com/"
    },
    {
      title: "PodcastYap.com",
      description: "Profesyonel podcast oluşturma ve dağıtım platformu. Yapay zeka destekli ses düzenleme, otomatik transkripsiyon ve içerik önerileri sunan kapsamlı bir sistem.",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
      url: "https://podcastyap.com/"
    },
    {
      title: "Doc2Podcast",
      description: "PDF dosyalarını doğal ve akıcı bir podcast'e dönüştüren yapay zeka teknolojisi. Tek tıkla profesyonel sesler oluşturun.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
      url: "https://doc2podcast.com/"
    },
    {
      title: "Uygulama Deposu",
      description: "Geleceğin AI Araçlarını Keşfedin ve Yönetin. 100+ AI aracı içeren kapsamlı bir platform ile yapay zeka teknolojilerini keşfedin.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
      url: "https://uygulamadeposu.netlify.app/"
    }
  ];

  return (
    <section id="projeler" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Örnek Projeler</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Third Hand AI Agency olarak gerçekleştirdiğimiz başarılı projelerden bazı örnekler. Farklı sektörlere yönelik yapay zeka çözümlerimizi inceleyebilirsiniz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{project.title}</h3>
                <p className="text-slate-600 mb-6">{project.description}</p>
                <Button 
                  className="bg-primary text-white hover:bg-primary/90"
                  onClick={() => window.open(project.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Siteyi Ziyaret Et
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-lg transition-all"
            onClick={() => scrollToSection("iletisim")}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Projenizi Bize Anlatın
          </Button>
        </div>
      </div>
    </section>
  );
}
