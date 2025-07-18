import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lightbulb, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ProjectsSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <section id="projeler" className="py-20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projeler" className="py-20 bg-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">Örnek Projeler</h2>
          <p className="text-xl text-slate-800 font-medium max-w-3xl mx-auto">
            Third Hand AI Agency olarak gerçekleştirdiğimiz başarılı projelerden bazı örnekler. Farklı sektörlere yönelik yapay zeka çözümlerimizi inceleyebilirsiniz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} style={{background: 'linear-gradient(to bottom right, #fde68a, #fbbf24)'}} className="overflow-hidden shadow-lg hover:shadow-xl transition-all border-2 border-orange-400">
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">{project.title}</h3>
                <p className="text-slate-800 font-semibold mb-6">{project.description}</p>
                {project.link && (
                  <Button 
                    className="bg-primary text-white hover:bg-primary/90"
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Siteyi Ziyaret Et
                  </Button>
                )}
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
