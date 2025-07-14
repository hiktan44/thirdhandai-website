import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LanguageToggle from "@/components/ui/language-toggle";
import { Menu, User } from "lucide-react";
import { Link } from "wouter";
import Logo from "@/components/logo";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: "ana-sayfa", label: "Ana Sayfa" },
    { id: "hizmetler", label: "Hizmetler" },
    { id: "projeler", label: "Örnek Projeler" },
    { id: "video-projeler", label: "Video Projeler" },
    { id: "hakkimizda", label: "Hakkımızda" },
    { id: "iletisim", label: "İletişim" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-slate-700 hover:text-primary px-3 py-2 transition-colors font-sans font-medium"
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
              <Button className="bg-primary text-white hover:bg-primary/90">
                <User className="w-4 h-4 mr-2" />
                Admin Giriş
              </Button>
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="text-left text-slate-700 hover:text-primary px-3 py-2 transition-colors font-sans font-medium"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
