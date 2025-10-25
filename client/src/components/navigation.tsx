import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LanguageToggle from "@/components/ui/language-toggle";
import { ThemeToggle } from "@/components/ThemeToggle";
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
    { id: "ana-sayfa", label: t('nav.home'), type: "scroll" },
    { id: "hizmetler", label: t('nav.services'), type: "scroll" },
    { id: "projeler", label: t('nav.projects'), type: "scroll" },
    { id: "video-projeler", label: t('nav.videos'), type: "scroll" },
    { id: "blog", label: t('nav.blog'), type: "link", href: "/blog" },
    { id: "hakkimizda", label: t('nav.about'), type: "scroll" },
    { id: "iletisim", label: t('nav.contact'), type: "scroll" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 relative overflow-hidden">
      {/* Animated Background - Same as Hero Section */}
      <div className="absolute inset-0">
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
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                item.type === "link" ? (
                  <Link key={item.id} href={item.href!}>
                    <button className="text-slate-200 hover:text-blue-400 px-3 py-2 transition-colors font-sans" style={{fontWeight: 600}}>
                      {item.label}
                    </button>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-slate-200 hover:text-blue-400 px-3 py-2 transition-colors font-sans" style={{fontWeight: 600}}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Language, Theme & Admin */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageToggle />
            <Link href="/admin">
              <Button className="bg-primary text-white hover:bg-primary/90">
                <User className="w-4 h-4 mr-2" />
                {t('nav.admin')}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:text-blue-400">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-900 border-slate-700">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      item.type === "link" ? (
                        <Link key={item.id} href={item.href!}>
                          <button
                            onClick={() => setIsOpen(false)}
                            className="text-left text-slate-200 hover:text-blue-400 px-3 py-2 transition-colors font-sans font-medium w-full"
                          >
                            {item.label}
                          </button>
                        </Link>
                      ) : (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className="text-left text-slate-200 hover:text-blue-400 px-3 py-2 transition-colors font-sans font-medium"
                        >
                          {item.label}
                        </button>
                      )
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        </div>
      </div>
    </nav>
  );
}
