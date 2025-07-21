import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SpaceBackground from "./space-background";

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const testimonials = [
    {
      text: "Third Hand AI Agency'nin geliştirdiği chatbot çözümü müşteri hizmetlerimizin verimliliğini %75 artırdı. Artık daha az maliyetle daha fazla müşteriye hizmet verebiliyoruz.",
      name: "Ahmet Yılmaz",
      position: "E-ticaret CEO",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      text: "Üretim süreçlerimizi Third Hand'in geliştirdiği akıllı otomasyon sistemleri ile optimize ettik. Üretim hatalarımız %32 azaldı ve verimliliğimiz arttı.",
      name: "Zeynep Demir",
      position: "Üretim Müdürü",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      text: "Finansal analiz süreçlerimiz için geliştirilen AI çözümü sayesinde piyasa tahminlerimiz çok daha isabetli hale geldi. Yatırım portföyümüzün performansı %18 arttı.",
      name: "Murat Kaya",
      position: "Finans Direktörü",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-white/10 backdrop-blur-sm relative overflow-hidden">
      {/* Animated Background */}
      <SpaceBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-white mb-4">{t('testimonials.title')}</h2>
          <p className="text-xl text-slate-300 font-medium">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 font-medium italic">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${testimonial.iconBg} rounded-full flex items-center justify-center mr-4`}>
                    <User className={`w-6 h-6 ${testimonial.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-300 font-medium">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
