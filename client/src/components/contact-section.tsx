import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Clock, Linkedin, Twitter, Github, Youtube, Send } from "lucide-react";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    privacyAccepted: false
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Başarılı!",
        description: data.message,
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        privacyAccepted: false
      });
    },
    onError: () => {
      toast({
        title: "Hata!",
        description: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Uyarı!",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.privacyAccepted) {
      toast({
        title: "Uyarı!",
        description: "Lütfen gizlilik sözleşmesini onaylayın.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adres",
      content: ["Teknoloji Vadisi, İnovasyon Caddesi No:42", "Levent / İstanbul"],
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Telefon",
      content: ["+90 (212) 555 66 77", "+90 (532) 666 77 88"],
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Mail,
      title: "E-posta",
      content: ["info@thirdhandai.com", "destek@thirdhandai.com"],
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      content: ["Pazartesi - Cuma: 09:00 - 18:00", "Hafta sonu: Kapalı"],
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, color: "bg-blue-600 hover:bg-blue-700", href: "#" },
    { icon: Twitter, color: "bg-blue-400 hover:bg-blue-500", href: "#" },
    { icon: Github, color: "bg-gray-800 hover:bg-gray-900", href: "#" },
    { icon: Youtube, color: "bg-red-600 hover:bg-red-700", href: "#" }
  ];

  return (
    <section id="iletisim" className="py-20 bg-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">İletişime Geçin</h2>
          <p className="text-xl text-slate-800 font-medium">Projeniz hakkında konuşmak veya daha fazla bilgi almak için bize ulaşın.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-8">İletişim Bilgileri</h3>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-12 h-12 ${info.bgColor} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                    <info.icon className={`w-6 h-6 ${info.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 mb-1">{info.title}</h4>
                    <div className="text-slate-700 font-medium">
                      {info.content.map((line, lineIndex) => (
                        <p key={lineIndex}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="font-heading font-bold text-slate-900 mb-4">Bizi Takip Edin</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center text-white transition-colors`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-slate-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6">Mesaj Gönderin</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">İsim</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Adınız Soyadınız"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="email@ornek.com"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Konu</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Mesaj konusu"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mesaj</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Mesajınızı buraya yazın..."
                    rows={5}
                    className="mt-2 resize-none"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, privacyAccepted: checked as boolean }))
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="privacy" className="text-sm text-slate-600 leading-relaxed">
                    Kişisel verilerin işlenmesine dair aydınlatma metnini okudum ve onaylıyorum.
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-white hover:bg-primary/90"
                  disabled={contactMutation.isPending}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {contactMutation.isPending ? "Gönderiliyor..." : "Gönder"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
