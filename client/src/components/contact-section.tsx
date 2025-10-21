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
import { MapPin, Phone, Mail, Clock, Linkedin, Twitter, Github, Youtube, Instagram, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SpaceBackground from "./space-background";

export default function ContactSection() {
  const { t } = useLanguage();
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
        title: t('contact.success'),
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
        title: t('contact.error'),
        description: t('contact.errorMessage'),
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: t('contact.warning'),
        description: t('contact.fillFields'),
        variant: "destructive",
      });
      return;
    }

    if (!formData.privacyAccepted) {
      toast({
        title: t('contact.warning'),
        description: t('contact.acceptPrivacy'),
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.info.address'),
      content: [t('contact.info.addressLine1'), t('contact.info.addressLine2')],
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },

    {
      icon: Mail,
      title: t('contact.info.email'),
      content: ["info@thirdhandai.com", "destek@thirdhandai.com"],
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      content: [t('contact.info.hoursWeekday'), t('contact.info.hoursWeekend')],
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, color: "bg-blue-600 hover:bg-blue-700", href: "#", label: "LinkedIn" },
    { icon: Twitter, color: "bg-blue-400 hover:bg-blue-500", href: "#", label: "Twitter" },
    { icon: Instagram, color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700", href: "#", label: "Instagram" },
    { icon: Github, color: "bg-gray-800 hover:bg-gray-900", href: "#", label: "GitHub" },
    { icon: Youtube, color: "bg-red-600 hover:bg-red-700", href: "#", label: "YouTube" }
  ];

  return (
    <section id="iletisim" className="py-20 bg-white/10 backdrop-blur-sm relative overflow-hidden">
      {/* Animated Background */}
      <div aria-hidden="true">
        <SpaceBackground />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-white mb-4">{t('contact.title')}</h2>
          <p className="text-xl text-slate-300 font-medium">{t('contact.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-white mb-8">{t('contact.infoTitle')}</h3>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-12 h-12 ${info.bgColor} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`} aria-hidden="true">
                    <info.icon className={`w-6 h-6 ${info.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white mb-1">{info.title}</h4>
                    <div className="text-slate-300 font-medium">
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
              <h4 className="font-heading font-bold text-white mb-4">{t('contact.followUs')}</h4>
              <div className="flex space-x-4" role="list">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center text-white transition-colors`}
                    aria-label={`${social.label} - Third Hand AI Agency'yi sosyal medyada takip edin`}
                    role="listitem"
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold text-white mb-6">{t('contact.sendMessage')}</h3>

              <form onSubmit={handleSubmit} className="space-y-6" aria-label={t('contact.sendMessage')}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white">{t('contact.form.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder={t('contact.form.namePlaceholder')}
                      className="mt-2 bg-white/20 border-white/30 text-white placeholder:text-slate-400"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">{t('contact.form.email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="mt-2 bg-white/20 border-white/30 text-white placeholder:text-slate-400"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-white">{t('contact.form.subject')}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder={t('contact.form.subjectPlaceholder')}
                    className="mt-2 bg-white/20 border-white/30 text-white placeholder:text-slate-400"
                    required
                    aria-required="true"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">{t('contact.form.message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={5}
                    className="mt-2 resize-none bg-white/20 border-white/30 text-white placeholder:text-slate-400"
                    required
                    aria-required="true"
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
                    aria-required="true"
                  />
                  <Label htmlFor="privacy" className="text-sm text-slate-300 leading-relaxed">
                    {t('contact.form.privacyText')}
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90"
                  disabled={contactMutation.isPending}
                  aria-label={contactMutation.isPending ? t('contact.form.sending') : t('contact.form.send')}
                >
                  <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                  {contactMutation.isPending ? t('contact.form.sending') : t('contact.form.send')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
