import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface WhatsAppSettings {
  phoneNumber: string;
  welcomeMessage: string;
  enabled: boolean;
}

export default function WhatsAppWidget() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<WhatsAppSettings | null>(null);

  useEffect(() => {
    // Admin panel'den ayarları çek
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/whatsapp-settings');
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error('WhatsApp ayarları yüklenemedi:', error);
      }
    };
    fetchSettings();
  }, []);

  if (!settings?.enabled || !settings?.phoneNumber) {
    return null;
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(settings.welcomeMessage || 
      (language === 'TR' ? 'Merhaba, yardımcı olabilir misiniz?' : 'Hello, can you help me?'));
    const phoneNumber = settings.phoneNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* WhatsApp Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-200">
          <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">WhatsApp</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-600 rounded p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-4">
            <p className="text-gray-700 mb-4">
              {language === 'TR' 
                ? 'Merhaba! Size nasıl yardımcı olabiliriz?' 
                : 'Hello! How can we help you?'}
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              {language === 'TR' ? 'WhatsApp\'ta Sohbet Et' : 'Chat on WhatsApp'}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}