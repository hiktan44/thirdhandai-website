import { Button } from "@/components/ui/button";
import { Users, Rocket, Tag, Headphones, Phone, ServerCog } from "lucide-react";

export default function AboutSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const features = [
    {
      icon: Users,
      title: "Profesyonel Ekip",
      description: "7 kişilik AI uzmanı ekip",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-600",
      iconColor: "text-white"
    },
    {
      icon: Rocket,
      title: "Modern Teknolojiler",
      description: "En yeni AI teknolojileri",
      bgColor: "bg-green-50",
      iconBg: "bg-green-600",
      iconColor: "text-white"
    },
    {
      icon: Tag,
      title: "Uygun Fiyatlandırma",
      description: "Her bütçeye uygun çözümler",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-600",
      iconColor: "text-white"
    },
    {
      icon: Headphones,
      title: "Kesintisiz Destek",
      description: "7/24 teknik destek",
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
    <section id="hakkimizda" className="py-20 bg-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🧠</div>
                  <div className="w-12 h-12 border-2 border-white rounded-lg mx-auto"></div>
                </div>
              </div>
              <h3 className="text-2xl font-heading font-bold text-slate-800 mb-2">Third Hand</h3>
              <p className="text-blue-600 text-lg font-medium">AI Agency</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-blue-600">5+</span>
                <p className="text-slate-600">Yıl Deneyim</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-heading font-bold text-slate-800 mb-6">Hakkımızda</h2>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              Third Hand AI Agency olarak 5 yılı aşkın süredir yapay zeka teknolojileri konusunda uzmanlaşmış, yenilikçi çözümler sunan bir teknoloji şirketiyiz.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Misyonumuz, şirketlerin yapay zeka teknolojilerinden en verimli şekilde faydalanmasını sağlamak ve rekabet avantajı elde etmelerine yardımcı olmaktır.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h4 className="font-heading font-semibold text-slate-800 mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => scrollToSection("iletisim")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Bize Ulaşın
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => scrollToSection("hizmetler")}
              >
                <ServerCog className="w-4 h-4 mr-2" />
                Hizmetlerimiz
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <p className="text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
