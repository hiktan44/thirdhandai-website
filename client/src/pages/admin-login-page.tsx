import AdminLogin from "@/components/admin-login";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Ana Sayfa
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">3</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Third Hand AI Agency</h1>
          <p className="text-gray-600 mt-2">Yönetim Paneli Girişi</p>
        </div>
        <AdminLogin />
      </div>
    </div>
  );
}