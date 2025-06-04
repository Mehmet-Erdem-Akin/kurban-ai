"use client";

import Link from "next/link";
import ParallaxBackground from "@/components/ParallaxBackground";
import Card3D from "@/components/Card3D";

export default function Home() {
  return (
    <div className="min-h-screen hero-gradient relative">
      {/* Parallax Background */}
      <ParallaxBackground />

      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
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
            <Link href="/analyze" className="btn btn-primary btn-md">
              Analiz Başlat
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 relative z-10">
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
              className="btn btn-primary btn-xl animate-scale-in"
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
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 animate-slide-up">
          <Card3D className="card card-hover p-8">
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
          </Card3D>

          <Card3D className="card card-hover p-8">
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
          </Card3D>

          <Card3D className="card card-hover p-8">
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
          </Card3D>
        </div>

        {/* Stats Section */}
        <Card3D className="card p-12 mb-20 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Yapay Zeka Destekli Analiz
            </h2>
            <p className="text-xl text-neutral-600">
              Modern teknoloji ile hayvan analizi alanında güvenilir çözümler
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">🤖</div>
              <p className="text-neutral-600 font-medium">AI Destekli</p>
              <p className="text-neutral-500 text-sm">Gelişmiş algoritma</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">
                📊
              </div>
              <p className="text-neutral-600 font-medium">Detaylı Analiz</p>
              <p className="text-neutral-500 text-sm">Kapsamlı raporlama</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">🆓</div>
              <p className="text-neutral-600 font-medium">Tamamen Ücretsiz</p>
              <p className="text-neutral-500 text-sm">Hiçbir ücret yok</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600 mb-2">⚡</div>
              <p className="text-neutral-600 font-medium">Hızlı Sonuç</p>
              <p className="text-neutral-500 text-sm">Anında analiz</p>
            </div>
          </div>
        </Card3D>

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
            <Card3D className="text-center animate-slide-up">
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
            </Card3D>

            <Card3D className="text-center animate-slide-up">
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
            </Card3D>

            <Card3D className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-large">
                3
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Rapor Alın
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Detaylı analiz raporu ile hayvan hakkında tüm bilgileri öğrenin
              </p>
            </Card3D>
          </div>
        </div>

        {/* CTA Section */}
        <Card3D className="card p-12 text-center bg-gradient-to-r from-primary-600 to-accent-600 text-white animate-scale-in">
          <h2 className="text-4xl font-bold mb-6">Hemen Başlayın!</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Kurbanlık hayvan seçiminizde akıllı analiz teknolojisinden
            yararlanın. İlk analizinizi ücretsiz yapın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/analyze"
              className="inline-flex items-center px-8 py-4 bg-white/95 backdrop-blur-sm text-primary-700 font-semibold text-lg rounded-2xl shadow-2xl hover:bg-white/98 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 border border-white/30 hover:border-white/60 group"
            >
              <svg
                className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
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
          </div>
        </Card3D>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-20 relative z-10">
        <Card3D className="text-center bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/50">
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
            <Link
              href="/privacy"
              className="hover:text-primary-600 transition-colors"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary-600 transition-colors"
            >
              Kullanım Şartları
            </Link>
            <Link
              href="/kvkk"
              className="hover:text-primary-600 transition-colors"
            >
              KVKK
            </Link>
            <a href="#" className="hover:text-primary-600 transition-colors">
              İletişim
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <p className="text-neutral-500">
              &copy; 2025 Kurbanlık Analiz. Tüm hakları saklıdır.
            </p>
          </div>
        </Card3D>
      </footer>
    </div>
  );
}
