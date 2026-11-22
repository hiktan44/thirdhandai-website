import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminLoginPage from "@/pages/admin-login-page";
import BlogPage from "@/pages/blog";
import BlogDetailPage from "@/pages/blog-detail";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import WhatsAppWidget from "@/components/whatsapp-widget";
import "@/config/i18n";

// "/" adresini artık sunucu karşılar (client/public/landing.html). Uygulama
// içinden "/" adresine geçilirse (logo, çıkış sonrası yönlendirme) sayfa bir
// kez yeniden yüklenir ve sunucudaki yeni ana sayfa açılır. Sunucu yeni
// sayfayı veremiyorsa döngüye girmemek için eski ana sayfa gösterilir.
function LandingGate() {
  const [showClassic, setShowClassic] = useState(false);
  useEffect(() => {
    const key = "th-landing-reload";
    let last = 0;
    try {
      last = Number(sessionStorage.getItem(key) || 0);
    } catch {
      setShowClassic(true);
      return;
    }
    if (Date.now() - last < 10000) {
      setShowClassic(true);
      return;
    }
    try {
      sessionStorage.setItem(key, String(Date.now()));
    } catch {
      setShowClassic(true);
      return;
    }
    window.location.reload();
  }, []);
  return showClassic ? <Home /> : null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingGate} />
      <Route path="/klasik" component={Home} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogDetailPage} />
      <Route path="/admin" component={AdminLoginPage} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <WhatsAppWidget />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
