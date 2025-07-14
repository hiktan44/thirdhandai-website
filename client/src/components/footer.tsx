import Logo from "@/components/logo";

export default function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-sm text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo className="brightness-0 invert" />
          </div>
          <p className="text-slate-400 mb-4">
            Yapay zeka teknolojileri ile geleceği şekillendiriyoruz.
          </p>
          <p className="text-slate-500 text-sm">
            © 2024 Third Hand AI Agency. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
