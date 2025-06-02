"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setUser(null);
    alert("Başarıyla çıkış yaptınız!");
  };

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-soft">
              <span className="text-white text-lg font-bold">KA</span>
            </div>
            <span className="text-2xl font-bold text-neutral-800">
              Kurbanlık Analiz
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <span className="text-neutral-700 font-medium">
                  Hoş geldin, {user.name}!
                </span>
                <button
                  onClick={handleLogout}
                  className="text-neutral-600 hover:text-neutral-800 transition-colors font-medium"
                >
                  Çıkış Yap
                </button>
                <Link href="/profile" className="btn btn-primary btn-md">
                  Profilim
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-neutral-600 hover:text-neutral-800 transition-colors font-medium"
                >
                  Giriş Yap
                </Link>
                <Link href="/register" className="btn btn-primary btn-md">
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
            🚀 Yapay Zeka Destekli Analiz
          </div>
          <h1 className="text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Akıllı Kurbanlık
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
              {" "}
              Analizi
            </span>
          </h1>
          <p className="text-xl text-neutral-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            Kurbanlık hayvan seçiminde daha bilinçli kararlar verin. Fotoğraf
            çekip anında hayvanın özelliklerini, değerini ve et miktarını
            öğrenin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/analyze"
              className="btn btn-primary btn-xl shadow-large animate-scale-in"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Analiz Başlat
            </Link>
            <Link
              href="/demo"
              className="btn btn-secondary btn-xl animate-scale-in"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-7 0a7 7 0 1114 0v3a2 2 0 01-2 2H7a2 2 0 01-2-2v-3z"
                />
              </svg>
              Demo İzle
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 animate-slide-up">
          <div className="card card-hover p-8">
            <div className="icon-container-accent mb-6">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-3">
              Akıllı Fotoğraf Analizi
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Kamera ile çekin veya galeriden seçin. Gelişmiş yapay zeka
              teknolojisi ile hayvanın özelliklerini anında analiz eder.
            </p>
          </div>

          <div className="card card-hover p-8">
            <div className="icon-container-secondary mb-6">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-3">
              Akıllı Değer Hesaplama
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Güncel piyasa fiyatları ve hayvan özelliklerine göre gerçekçi
              değer tahmini alın.
            </p>
          </div>

          <div className="card card-hover p-8">
            <div className="icon-container-primary mb-6">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-3">
              Detaylı Rapor
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Hayvan türü, cinsi, ağırlık tahmini, sağlık durumu ve et miktarı
              hakkında kapsamlı bilgi.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="card p-12 mb-20 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Güvenilir Platform
            </h2>
            <p className="text-xl text-neutral-600">
              Binlerce kullanıcı tarafından tercih edilen analiz sistemi
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                1,000+
              </div>
              <p className="text-neutral-600 font-medium">Analiz Yapıldı</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary-600 mb-2">95%</div>
              <p className="text-neutral-600 font-medium">Doğruluk Oranı</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-600 mb-2">500+</div>
              <p className="text-neutral-600 font-medium">Mutlu Kullanıcı</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-success-600 mb-2">24/7</div>
              <p className="text-neutral-600 font-medium">Hizmet Süresi</p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Sadece 3 adımda hayvanınızı analiz edin ve detaylı rapor alın
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-large">
                1
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Fotoğraf Çekin
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Hayvanın net bir fotoğrafını çekin veya galeriden bir fotoğraf
                seçin
              </p>
            </div>

            <div className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-large">
                2
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                AI Analizi
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Yapay zeka modelimiz fotoğrafı analiz eder ve özellikleri
                belirler
              </p>
            </div>

            <div className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-large">
                3
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Rapor Alın
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Detaylı analiz raporu ile hayvan hakkında tüm bilgileri öğrenin
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="card p-12 text-center bg-gradient-to-r from-primary-600 to-accent-600 text-white animate-scale-in">
          <h2 className="text-4xl font-bold mb-6">Hemen Başlayın!</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Kurbanlık hayvan seçiminizde akıllı analiz teknolojisinden
            yararlanın. İlk analizinizi ücretsiz yapın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/analyze"
              className="btn btn-white btn-xl shadow-large hover:bg-neutral-100"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Ücretsiz Analiz Yap
            </Link>
            <Link
              href="/demo"
              className="btn btn-secondary btn-xl border-2 border-white/30 hover:bg-white/10"
            >
              Demo İzle
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-20">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">KA</span>
            </div>
            <span className="text-xl font-bold text-neutral-800">
              Kurbanlık Analiz
            </span>
          </div>
          <p className="text-neutral-600 mb-6">
            Yapay zeka ile daha bilinçli kararlar
          </p>
          <div className="flex justify-center space-x-6 text-neutral-500">
            <a href="#" className="hover:text-primary-600 transition-colors">
              Gizlilik
            </a>
            <a href="#" className="hover:text-primary-600 transition-colors">
              Şartlar
            </a>
            <a href="#" className="hover:text-primary-600 transition-colors">
              Destek
            </a>
            <a href="#" className="hover:text-primary-600 transition-colors">
              İletişim
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <p className="text-neutral-500">
              &copy; 2024 Kurbanlık Analiz. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
