export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">3</span>
            </div>
            <span className="text-xl font-heading font-bold">Third Hand AI Agency</span>
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
