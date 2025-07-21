import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-black/20 backdrop-blur-sm text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-slate-400 mb-4">
            {t('footer.tagline')}
          </p>
          <p className="text-slate-500 text-sm">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
