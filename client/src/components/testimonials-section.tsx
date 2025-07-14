import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";

export default function TestimonialsSection() {
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
    <section className="py-20 bg-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-slate-800 mb-4">Müşteri Görüşleri</h2>
          <p className="text-xl text-slate-700">Müşterilerimizin AI çözümlerimiz hakkındaki düşünceleri</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 italic">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${testimonial.iconBg} rounded-full flex items-center justify-center mr-4`}>
                    <User className={`w-6 h-6 ${testimonial.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-slate-800">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">{testimonial.position}</p>
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
