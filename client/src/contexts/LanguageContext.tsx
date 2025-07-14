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