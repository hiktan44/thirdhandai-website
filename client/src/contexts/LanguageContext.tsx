import React, { createContext, useContext, useState } from 'react';

type Language = 'TR' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  TR: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.services': 'Hizmetler',
    'nav.projects': 'Örnek Projeler',
    'nav.videos': 'Video Projeler',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',
    'nav.admin': 'Admin Giriş',
    
    // Hero Section
    'hero.title1': 'Yapay Zeka',
    'hero.title2': 'ile',
    'hero.title3': 'İşinizi İleriye Taşıyın',
    'hero.subtitle': 'Third Hand AI Agency olarak şirketinize özel, terzi usulü AI çözümleri ve otomasyonları ile rekabette öne geçmenizi sağlıyoruz.',
    'hero.cta1': 'Hizmetlerimizi Keşfedin',
    'hero.cta2': 'İletişime Geçin',
    
    // Services Section
    'services.title': 'Hizmetlerimiz',
    'services.subtitle': 'İşletmenizin ihtiyaçlarına özel, modern yapay zeka çözümleri sunuyoruz. İster küçük bir işletme olun, ister kurumsal bir firma - size uygun AI çözümlerimiz var.',
    'services.cta': 'Detaylı Bilgi',
    
    // Service Items
    'services.ai.title': 'AI Çözümleri',
    'services.ai.description': 'Şirketinize özel yapay zeka çözümleri geliştiriyoruz. Veri analizi, tahmin modelleri ve karar destek sistemleri.',
    'services.ai.feature1': 'Veri analizleri ve tahminleme',
    'services.ai.feature2': 'Doğal dil işleme sistemleri',
    'services.ai.feature3': 'Görüntü ve ses tanıma',
    
    'services.automation.title': 'AI Otomasyonları',
    'services.automation.description': 'Tekrarlayan işleri otomatikleştirin, insan kaynaklarınızı daha değerli alanlara yönlendirin.',
    'services.automation.feature1': 'İş süreçleri otomasyonu',
    'services.automation.feature2': 'Akıllı veri entegrasyonu',
    'services.automation.feature3': 'Zaman ve maliyet tasarrufu',
    
    'services.development.title': 'Yazılım Geliştirme',
    'services.development.description': 'Web sitelerinden mobil uygulamalara, e-ticaret platformlarından özel yazılımlara kadar tüm ihtiyaçlarınız için çözümler.',
    'services.development.feature1': 'Özel web uygulamaları',
    'services.development.feature2': 'Mobil uygulama geliştirme',
    'services.development.feature3': 'API entegrasyonları',
    
    'services.media.title': 'Medya ve İçerik Üretimi',
    'services.media.description': 'Profesyonel medya prodüksiyon hizmetleri ile markanızı öne çıkarın.',
    'services.media.feature1': 'Video montaj ve editörlük',
    'services.media.feature2': 'AI destekli içerik oluşturma',
    'services.media.feature3': 'Sosyal medya içerikleri',
    
    'services.image.title': 'AI ile Görsel Üretim',
    'services.image.description': 'DALL-E 3, Midjourney ve Stable Diffusion ile profesyonel görseller, logolar ve illüstrasyonlar oluşturuyoruz.',
    'services.image.feature1': 'Özel logo ve marka tasarımı',
    'services.image.feature2': 'Ürün görseli oluşturma',
    'services.image.feature3': 'Sosyal medya görselleri',
    'services.image.feature4': 'Reklam ve banner tasarımı',
    'services.image.feature5': '3D modelleme ve render',
    'services.image.feature6': 'İllüstrasyon ve karakter tasarımı',
    
    'services.video.title': 'AI ile Video Prodüksiyon',
    'services.video.description': 'Runway, Pika Labs ve ElevenLabs gibi en gelişmiş AI araçlarıyla profesyonel videolar üretiyoruz.',
    'services.video.feature1': 'Reklam filmi prodüksiyonu',
    'services.video.feature2': 'Ürün tanıtım videoları',
    'services.video.feature3': 'Sosyal medya içerikleri',
    'services.video.feature4': 'Animasyon ve motion graphics',
    'services.video.feature5': 'AI seslendirme hizmetleri',
    'services.video.feature6': 'Video editörlük ve montaj',
    
    'services.automation2.title': 'İş Süreçleri Otomasyonu',
    'services.automation2.description': 'Make.com, Zapier ve n8n ile iş süreçlerinizi otomatikleştirin. API entegrasyonları ve özel otomasyon çözümleri.',
    'services.automation2.feature1': 'CRM ve satış otomasyonları',
    'services.automation2.feature2': 'E-posta ve pazarlama otomasyonları',
    'services.automation2.feature3': 'Muhasebe ve fatura otomasyonları',
    'services.automation2.feature4': 'Sosyal medya yönetimi',
    'services.automation2.feature5': 'Veri toplama ve raporlama',
    'services.automation2.feature6': 'Özel API entegrasyonları',
    
    'services.chatbot.title': 'AI Sesli & Görüntülü Chatbot',
    'services.chatbot.description': 'İşletmeniz için 1-2 gün içinde hazır! Sesli komutları anlayan, görüntü işleyebilen ve video desteği olan akıllı chatbot çözümleri.',
    'services.chatbot.feature1': 'Sesli komut ve yanıt sistemi',
    'services.chatbot.feature2': 'Görüntü tanıma ve işleme',
    'services.chatbot.feature3': 'Görüntülü AI asistan hizmetleri',
    'services.chatbot.feature4': 'Ürün ve hizmetlerinizi tanıtan yapay zeka',
    'services.chatbot.feature5': 'Müşteri sorularına anında yanıt',
    'services.chatbot.feature6': '1-2 günde hızlı teslimat',
    'services.chatbot.feature7': '7/24 müşteri desteği',
    
    // Projects Section
    'projects.title': 'Örnek Projeler',
    'projects.subtitle': 'Third Hand AI Agency olarak gerçekleştirdiğimiz başarılı projelerden bazı örnekler. Farklı sektörlere yönelik yapay zeka çözümlerimizi inceleyebilirsiniz.',
    'projects.visitSite': 'Siteyi Ziyaret Et',
    'projects.cta': 'Projenizi Bize Anlatın',
    
    // Video Projects Section
    'videos.title': 'Video Projelerimiz',
    'videos.subtitle': 'Yapay zeka ve teknoloji projelerimizin tanıtım videolarını inceleyebilirsiniz. AI çözümlerimizin nasıl çalıştığını ve iş süreçlerinize nasıl entegre olduğunu görebilirsiniz.',
    'videos.cta': 'Özel Video Projesi İsteyin',
    
    // Work Process Section
    'process.title': 'Çalışma Sürecimiz',
    'process.subtitle': 'Projelerinizi hayata geçirirken izlediğimiz metodoloji ile kaliteli, zamanında ve bütçe dostu çözümler sunuyoruz.',
    
    // About Section
    'about.title': 'Hakkımızda',
    'about.intro': 'Third Hand AI Agency olarak 5 yılı aşkın süredir yapay zeka teknolojileri konusunda uzmanlaşmış, yenilikçi çözümler sunan bir teknoloji şirketiyiz.',
    'about.mission': 'Misyonumuz, şirketlerin yapay zeka teknolojilerinden en verimli şekilde faydalanmasını sağlamak ve rekabet avantajı elde etmelerine yardımcı olmaktır.',
    'about.experience': 'Yıl Deneyim',
    
    // Contact Section
    'contact.title': 'İletişime Geçin',
    'contact.subtitle': 'Projeniz hakkında konuşmak veya daha fazla bilgi almak için bize ulaşın.',
    'contact.info': 'İletişim Bilgileri',
    'contact.form': 'Mesaj Gönderin',
    'contact.followUs': 'Bizi Takip Edin',
    'contact.name': 'İsim',
    'contact.email': 'E-posta',
    'contact.subject': 'Konu',
    'contact.message': 'Mesajınız',
    'contact.privacy': 'Kişisel verilerin işlenmesine izin veriyorum',
    'contact.send': 'Gönder',
    
    // Testimonials
    'testimonials.title': 'Müşteri Görüşleri',
    'testimonials.subtitle': 'Müşterilerimizin AI çözümlerimiz hakkındaki düşünceleri',
    
    // Footer
    'footer.tagline': 'Yapay zeka teknolojileri ile işinizi geleceğe taşıyoruz.',
    'footer.quickLinks': 'Hızlı Linkler',
    'footer.follow': 'Bizi Takip Edin',
    'footer.rights': '© 2025 Third Hand AI Agency. Tüm hakları saklıdır.'
  },
  EN: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.projects': 'Sample Projects',
    'nav.videos': 'Video Projects',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin Login',
    
    // Hero Section
    'hero.title1': 'Artificial Intelligence',
    'hero.title2': 'to',
    'hero.title3': 'Move Your Business Forward',
    'hero.subtitle': 'As Third Hand AI Agency, we help you get ahead of the competition with custom-tailored AI solutions and automations for your company.',
    'hero.cta1': 'Explore Our Services',
    'hero.cta2': 'Get in Touch',
    
    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'We offer modern artificial intelligence solutions tailored to your business needs. Whether you are a small business or a corporate company - we have the right AI solutions for you.',
    'services.cta': 'Learn More',
    
    // Service Items
    'services.ai.title': 'AI Solutions',
    'services.ai.description': 'We develop artificial intelligence solutions specific to your company. Data analysis, prediction models and decision support systems.',
    'services.ai.feature1': 'Data analysis and forecasting',
    'services.ai.feature2': 'Natural language processing systems',
    'services.ai.feature3': 'Image and voice recognition',
    
    'services.automation.title': 'AI Automations',
    'services.automation.description': 'Automate repetitive tasks, redirect your human resources to more valuable areas.',
    'services.automation.feature1': 'Business process automation',
    'services.automation.feature2': 'Smart data integration',
    'services.automation.feature3': 'Time and cost savings',
    
    'services.development.title': 'Software Development',
    'services.development.description': 'Solutions for all your needs from websites to mobile applications, e-commerce platforms to custom software.',
    'services.development.feature1': 'Custom web applications',
    'services.development.feature2': 'Mobile app development',
    'services.development.feature3': 'API integrations',
    
    'services.media.title': 'Media & Content Production',
    'services.media.description': 'Make your brand stand out with professional media production services.',
    'services.media.feature1': 'Video editing and editing',
    'services.media.feature2': 'AI-powered content creation',
    'services.media.feature3': 'Social media content',
    
    'services.image.title': 'AI Image Generation',
    'services.image.description': 'We create professional images, logos and illustrations with DALL-E 3, Midjourney and Stable Diffusion.',
    'services.image.feature1': 'Custom logo and brand design',
    'services.image.feature2': 'Product image creation',
    'services.image.feature3': 'Social media visuals',
    'services.image.feature4': 'Ad and banner design',
    'services.image.feature5': '3D modeling and rendering',
    'services.image.feature6': 'Illustration and character design',
    
    'services.video.title': 'AI Video Production',
    'services.video.description': 'We produce professional videos with the most advanced AI tools like Runway, Pika Labs and ElevenLabs.',
    'services.video.feature1': 'Commercial film production',
    'services.video.feature2': 'Product promotional videos',
    'services.video.feature3': 'Social media content',
    'services.video.feature4': 'Animation and motion graphics',
    'services.video.feature5': 'AI voice-over services',
    'services.video.feature6': 'Video editing and montage',
    
    'services.automation2.title': 'Business Process Automation',
    'services.automation2.description': 'Automate your business processes with Make.com, Zapier and n8n. API integrations and custom automation solutions.',
    'services.automation2.feature1': 'CRM and sales automations',
    'services.automation2.feature2': 'Email and marketing automations',
    'services.automation2.feature3': 'Accounting and billing automations',
    'services.automation2.feature4': 'Social media management',
    'services.automation2.feature5': 'Data collection and reporting',
    'services.automation2.feature6': 'Custom API integrations',
    
    'services.chatbot.title': 'AI Voice & Video Chatbot',
    'services.chatbot.description': 'Ready for your business in 1-2 days! Smart chatbot solutions that understand voice commands, process images and support video.',
    'services.chatbot.feature1': 'Voice command and response system',
    'services.chatbot.feature2': 'Image recognition and processing',
    'services.chatbot.feature3': 'Video AI assistant services',
    'services.chatbot.feature4': 'AI that promotes your products and services',
    'services.chatbot.feature5': 'Instant response to customer queries',
    'services.chatbot.feature6': 'Fast delivery in 1-2 days',
    'services.chatbot.feature7': '24/7 customer support',
    
    // Projects Section
    'projects.title': 'Sample Projects',
    'projects.subtitle': 'Some examples of successful projects we have completed as Third Hand AI Agency. You can explore our AI solutions for different sectors.',
    'projects.visitSite': 'Visit Site',
    'projects.cta': 'Tell Us About Your Project',
    
    // Video Projects Section
    'videos.title': 'Our Video Projects',
    'videos.subtitle': 'You can watch promotional videos of our artificial intelligence and technology projects. See how our AI solutions work and integrate into your business processes.',
    'videos.cta': 'Request Custom Video Project',
    
    // Work Process Section
    'process.title': 'Our Work Process',
    'process.subtitle': 'We deliver quality, timely and budget-friendly solutions with the methodology we follow while bringing your projects to life.',
    
    // About Section
    'about.title': 'About Us',
    'about.intro': 'As Third Hand AI Agency, we are a technology company that has been specializing in artificial intelligence technologies for over 5 years, offering innovative solutions.',
    'about.mission': 'Our mission is to enable companies to benefit from artificial intelligence technologies in the most efficient way and help them gain a competitive advantage.',
    'about.experience': 'Years of Experience',
    
    // Contact Section
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Contact us to talk about your project or get more information.',
    'contact.info': 'Contact Information',
    'contact.form': 'Send Message',
    'contact.followUs': 'Follow Us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Your Message',
    'contact.privacy': 'I consent to the processing of personal data',
    'contact.send': 'Send',
    
    // Testimonials
    'testimonials.title': 'Customer Reviews',
    'testimonials.subtitle': 'What our customers think about our AI solutions',
    
    // Footer
    'footer.tagline': 'We take your business to the future with artificial intelligence technologies.',
    'footer.quickLinks': 'Quick Links',
    'footer.follow': 'Follow Us',
    'footer.rights': '© 2025 Third Hand AI Agency. All rights reserved.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('TR');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['TR']] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};