export default function WorkProcessSection() {
  const steps = [
    {
      number: 1,
      title: "Keşif ve Analiz",
      description: "İhtiyaçlarınızı detaylı analiz eder, mevcut süreçlerinizi inceleriz.",
      color: "bg-primary"
    },
    {
      number: 2,
      title: "Çözüm Tasarımı",
      description: "İhtiyaçlarınıza en uygun AI çözümlerini ve teknolojileri belirleriz.",
      color: "bg-green-600"
    },
    {
      number: 3,
      title: "Geliştirme",
      description: "En son teknolojileri kullanarak çözümlerinizi geliştiriyoruz.",
      color: "bg-purple-600"
    },
    {
      number: 4,
      title: "Test ve Entegrasyon",
      description: "Çözümlerimizi test eder ve mevcut sistemlerinize entegre ederiz.",
      color: "bg-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">Çalışma Sürecimiz</h2>
          <p className="text-xl text-slate-800 font-medium max-w-3xl mx-auto">
            Projelerinizi hayata geçirirken izlediğimiz metodoloji ile kaliteli, zamanında ve bütçe dostu çözümler sunuyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold`}>
                {step.number}
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-700 font-medium">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
