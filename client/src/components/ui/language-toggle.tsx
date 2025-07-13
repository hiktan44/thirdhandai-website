import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LanguageToggle() {
  const [language, setLanguage] = useState("TR");

  return (
    <div className="flex bg-slate-100 rounded-lg p-1">
      <Button
        size="sm"
        variant={language === "TR" ? "default" : "ghost"}
        onClick={() => setLanguage("TR")}
        className={`px-3 py-1 text-sm ${
          language === "TR" 
            ? "bg-primary text-white" 
            : "text-slate-600 hover:text-primary"
        }`}
      >
        TR
      </Button>
      <Button
        size="sm"
        variant={language === "EN" ? "default" : "ghost"}
        onClick={() => setLanguage("EN")}
        className={`px-3 py-1 text-sm ${
          language === "EN" 
            ? "bg-primary text-white" 
            : "text-slate-600 hover:text-primary"
        }`}
      >
        EN
      </Button>
    </div>
  );
}
