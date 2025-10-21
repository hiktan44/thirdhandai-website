import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LanguageToggle from "@/components/ui/language-toggle";
import { Menu, User } from "lucide-react";
import { Link } from "wouter";
import Logo from "@/components/logo";
import { useLanguage } from "@/contexts/LanguageContext";
import SpaceBackground from "@/components/space-background";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: "ana-sayfa", label: t('nav.home') },
    { id: "hizmetler", label: t('nav.services') },
    { id: "projeler", label: t('nav.projects') },
    { id: "video-projeler", label: t('nav.videos') },
    { id: "hakkimizda", label: t('nav.about') },
    { id: "iletisim", label: t('nav.contact') },
  ];

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md"
      >
        {t('nav.home') === 'Ana Sayfa' ? 'Ana içeriğe atla' : 'Skip to main content'}
      </a>

      <nav className="fixed top-0 w-full z-50 relative overflow-hidden" role="navigation" aria-label={t('nav.home') === 'Ana Sayfa' ? 'Ana navigasyon' : 'Main navigation'}>
        {/* Animated Background - Same as Hero Section */}
        <div className="absolute inset-0" aria-hidden="true">
          <SpaceBackground />
        </div>

        {/* Navigation Content with semi-transparent background */}
        <div className="relative z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
          <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-baseline space-x-8" role="menubar">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-slate-200 hover:text-blue-400 px-3 py-2 transition-colors font-sans"
                    style={{fontWeight: 600}}
                    aria-label={`${item.label} bölümüne git`}
                    role="menuitem"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language & Admin */}
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Link href="/admin">
                <Button className="bg-primary text-white hover:bg-primary/90" aria-label={t('nav.admin')}>
                  <User className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t('nav.admin')}
                </Button>
              </Link>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-blue-400"
                      aria-label={isOpen ? (t('nav.home') === 'Ana Sayfa' ? 'Menüyü kapat' : 'Close menu') : (t('nav.home') === 'Ana Sayfa' ? 'Menüyü aç' : 'Open menu')}
                      aria-expanded={isOpen}
                    >
                      <Menu className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-900 border-slate-700">
                    <nav aria-label={t('nav.home') === 'Ana Sayfa' ? 'Mobil menü' : 'Mobile menu'}>
                      <div className="flex flex-col space-y-4 mt-8" role="menu">
                        {navItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="text-left text-slate-200 hover:text-blue-400 px-3 py-2 transition-colors font-sans font-medium"
                            aria-label={`${item.label} bölümüne git`}
                            role="menuitem"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
          </div>
        </div>
      </nav>
    </>
  );
}
