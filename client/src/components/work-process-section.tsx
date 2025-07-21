import { useLanguage } from "@/contexts/LanguageContext";
import SpaceBackground from "./space-background";

export default function WorkProcessSection() {
  const { t } = useLanguage();
  const steps = [
    {
      number: 1,
      title: t('process.step1.title'),
      description: t('process.step1.description'),
      color: "bg-primary"
    },
    {
      number: 2,
      title: t('process.step2.title'),
      description: t('process.step2.description'),
      color: "bg-green-600"
    },
    {
      number: 3,
      title: t('process.step3.title'),
      description: t('process.step3.description'),
      color: "bg-purple-600"
    },
    {
      number: 4,
      title: t('process.step4.title'),
      description: t('process.step4.description'),
      color: "bg-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-white/10 backdrop-blur-sm relative overflow-hidden">
      {/* Animated Background */}
      <SpaceBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-white mb-4">{t('process.title')}</h2>
          <p className="text-xl text-slate-300 font-medium max-w-3xl mx-auto">
            {t('process.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold`}>
                {step.number}
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-4">{step.title}</h3>
              <p className="text-slate-300 font-medium">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
