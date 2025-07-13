import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

export default function CTASection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">İşinizi Dönüştürmeye Hazır mısınız?</h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Yapay zeka teknolojileri ile işinizi geliştirmek, verimliliğinizi artırmak ve rekabette öne geçmek için hemen iletişime geçin.
        </p>
        <Button 
          size="lg"
          className="bg-white text-primary hover:bg-blue-50 text-lg"
          onClick={() => scrollToSection("iletisim")}
        >
          <Gift className="w-5 h-5 mr-2" />
          Ücretsiz Danışmanlık Alın
        </Button>
      </div>
    </section>
  );
}
