import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, MessageCircle, Save, Copy, Check } from "lucide-react";

const whatsappSchema = z.object({
  phoneNumber: z.string().min(10, "Telefon numarası en az 10 karakter olmalıdır"),
  welcomeMessage: z.string().optional(),
  enabled: z.boolean()
});

type WhatsAppFormData = z.infer<typeof whatsappSchema>;

export default function WhatsAppSettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const form = useForm<WhatsAppFormData>({
    resolver: zodResolver(whatsappSchema),
    defaultValues: {
      phoneNumber: "",
      welcomeMessage: "",
      enabled: false
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/whatsapp-settings');
      if (response.ok) {
        const data = await response.json();
        form.reset(data);
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "WhatsApp ayarları yüklenirken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: WhatsAppFormData) => {
    setSaving(true);
    try {
      await apiRequest('POST', '/api/admin/whatsapp-settings', data);
      toast({
        title: "Başarılı",
        description: "WhatsApp ayarları güncellendi."
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "WhatsApp ayarları güncellenirken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const copyEmbedCode = () => {
    const embedCode = `<!-- WhatsApp Widget Script -->
<script>
(function() {
  var script = document.createElement('script');
  script.src = '${window.location.origin}/whatsapp-widget.js';
  script.async = true;
  document.head.appendChild(script);
})();
</script>`;
    
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Kopyalandı",
      description: "Embed kodu panoya kopyalandı."
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            WhatsApp Ayarları
          </CardTitle>
          <CardDescription>
            WhatsApp iletişim widget'ını yapılandırın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        WhatsApp Widget'ı Aktif
                      </FormLabel>
                      <FormDescription>
                        Widget'ın sitede görünüp görünmeyeceğini kontrol eder
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Telefon Numarası</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="905551234567" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Ülke kodu ile birlikte, başında + olmadan yazın (örn: 905551234567)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="welcomeMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hoş Geldiniz Mesajı</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Merhaba, size nasıl yardımcı olabilirim?"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Kullanıcı WhatsApp'ta sohbete başladığında gösterilecek mesaj
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Kaydet
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kurulum Talimatları</CardTitle>
          <CardDescription>
            WhatsApp widget'ını sitenize nasıl ekleyeceğiniz
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Otomatik Kurulum</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Widget'ı bu sitede otomatik olarak aktif. Başka bir sitenize eklemek için aşağıdaki embed kodunu kullanın:
            </p>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`<!-- WhatsApp Widget Script -->
<script>
(function() {
  var script = document.createElement('script');
  script.src = '${window.location.origin}/whatsapp-widget.js';
  script.async = true;
  document.head.appendChild(script);
})();
</script>`}
              </pre>
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={copyEmbedCode}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Kopyalandı
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Kopyala
                  </>
                )}
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Manuel Kurulum</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Yukarıdaki embed kodunu kopyalayın</li>
              <li>HTML sayfanızın <code className="bg-muted px-1 rounded">&lt;/body&gt;</code> etiketinden hemen önce yapıştırın</li>
              <li>WhatsApp ayarlarınızı buradan yapılandırın</li>
              <li>Widget otomatik olarak sağ alt köşede görünecektir</li>
            </ol>
          </div>

          <div>
            <h4 className="font-medium mb-2">Özellikler</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Mobil uyumlu tasarım</li>
              <li>Otomatik dil desteği (TR/EN)</li>
              <li>Özelleştirilebilir hoş geldiniz mesajı</li>
              <li>Hızlı yükleme ve düşük performans etkisi</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}