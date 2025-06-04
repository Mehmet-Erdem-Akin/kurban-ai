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
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            <span className="text-neutral-900 mr-2">Akıllı Kurbanlık</span>
            <span className="gradient-text-animated">Analizi</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            Kurbanlık hayvan seçiminde daha bilinçli kararlar verin. Çoklu
            fotoğraf çekip anında hayvanın özelliklerini, değerini ve et
            miktarını öğrenin.
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
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
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

        {/* Advanced Features Section */}
        <div className="mb-20 animate-slide-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Gelişmiş Özellikler
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Modern yapay zeka teknolojileri ile hayvan analizinde en kapsamlı
              çözümler
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card3D className="card card-hover p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Çoklu Fotoğraf
              </h3>
              <p className="text-neutral-600 text-sm">
                Farklı açılardan birden fazla fotoğraf çekerek daha doğru analiz
              </p>
            </Card3D>

            <Card3D className="card card-hover p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9A5 5 0 1117.5 7.5 5 5 0 016.343 16.243z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Akıllı Tanıma
              </h3>
              <p className="text-neutral-600 text-sm">
                Hayvan türü, cinsi ve özelliklerini otomatik olarak tespit eder
              </p>
            </Card3D>

            <Card3D className="card card-hover p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Hızlı Analiz
              </h3>
              <p className="text-neutral-600 text-sm">
                Saniyeler içinde kapsamlı analiz sonuçları alın
              </p>
            </Card3D>

            <Card3D className="card card-hover p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Güvenli Analiz
              </h3>
              <p className="text-neutral-600 text-sm">
                Fotoğraflarınız güvenli bir şekilde işlenir ve saklanmaz
              </p>
            </Card3D>
          </div>
        </div>

        {/* Supported Animals Section */}
        <div className="mb-20 animate-fade-in">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Desteklenen Hayvan Türleri
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Çeşitli kurbanlık hayvan türlerini analiz edebilir ve detaylı
              bilgi sağlayabiliriz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card3D className="card card-hover p-8 text-center">
              <div className="text-6xl mb-4">🐄</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Büyükbaş
              </h3>
              <p className="text-neutral-600 mb-4">
                Dana, inek, boğa ve tosun analizi
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="badge badge-success text-xs">
                  Ağırlık Tahmini
                </span>
                <span className="badge badge-info text-xs">Et Miktarı</span>
                <span className="badge badge-warning text-xs">
                  Değer Hesaplama
                </span>
                <span className="badge badge-error text-xs">Sağlık Durumu</span>
              </div>
            </Card3D>

            <Card3D className="card card-hover p-8 text-center">
              <div className="text-6xl mb-4">🐑</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Koyun</h3>
              <p className="text-neutral-600 mb-4">
                Koyun cinsi belirleme ve analiz
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="badge badge-success text-xs">
                  Ağırlık Tahmini
                </span>
                <span className="badge badge-info text-xs">Et Miktarı</span>
                <span className="badge badge-warning text-xs">
                  Değer Hesaplama
                </span>
                <span className="badge badge-error text-xs">Sağlık Durumu</span>
              </div>
            </Card3D>

            <Card3D className="card card-hover p-8 text-center">
              <div className="text-6xl mb-4">🐐</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Keçi</h3>
              <p className="text-neutral-600 mb-4">
                Keçi türü ve özellik analizi
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="badge badge-success text-xs">
                  Ağırlık Tahmini
                </span>
                <span className="badge badge-info text-xs">Et Miktarı</span>
                <span className="badge badge-warning text-xs">
                  Değer Hesaplama
                </span>
                <span className="badge badge-error text-xs">Sağlık Durumu</span>
              </div>
            </Card3D>

            <Card3D className="card card-hover p-8 text-center">
              <div className="text-6xl mb-4">🐪</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Deve</h3>
              <p className="text-neutral-600 mb-4">Deve analizi (yakında)</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="badge badge-info text-xs">Yakında</span>
                <span className="badge badge-warning text-xs">
                  Geliştiriliyor
                </span>
              </div>
            </Card3D>
          </div>
        </div>

        {/* Technology Section */}
        <Card3D className="card p-12 mb-20 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              İleri Teknoloji Altyapısı
            </h2>
            <p className="text-xl text-neutral-600">
              En güncel yapay zeka ve görüntü işleme teknolojileri kullanıyoruz
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                🧠
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Deep Learning
              </h3>
              <p className="text-neutral-600">
                Derin öğrenme algoritmaları ile görüntü analizi ve özellik
                çıkarımı
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                👁️
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Computer Vision
              </h3>
              <p className="text-neutral-600">
                Gelişmiş görüntü işleme teknikleri ile hayvan özelliklerini
                tespit etme
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                📊
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Data Analytics
              </h3>
              <p className="text-neutral-600">
                Büyük veri analizi ile pazar fiyatları ve değer hesaplama
              </p>
            </div>
          </div>
        </Card3D>

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
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
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
              Kamera ile çekin veya galeriden seçin. Çoklu fotoğraf desteği ile
              farklı açılardan analiz yaparak daha doğru sonuçlar elde edin.
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
              değer tahmini alın. Bölgesel fiyat farklılıkları da dikkate
              alınır.
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-3">
              Detaylı Rapor
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              Hayvan türü, cinsi, ağırlık tahmini, sağlık durumu, et miktarı ve
              satın alma önerileri içeren kapsamlı analiz raporu.
            </p>
          </Card3D>
        </div>

        {/* FAQ Section */}
        <div className="mb-20 animate-slide-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Kurban-AI hakkında merak ettiğiniz soruların cevapları
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card3D className="card card-hover p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Analiz ne kadar doğru?
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Yapay zeka modelimiz binlerce hayvan fotoğrafı ile eğitilmiş
                olup %90+ doğruluk oranına sahiptir. Çoklu fotoğraf kullanımı
                doğruluğu artırır.
              </p>
            </Card3D>

            <Card3D className="card card-hover p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Fotoğraflarım güvende mi?
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Tüm fotoğraflar güvenli şekilde işlenir ve analiz sonrası
                silinir. Hiçbir kişisel veri saklanmaz veya üçüncü taraflarla
                paylaşılmaz.
              </p>
            </Card3D>

            <Card3D className="card card-hover p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Hangi hayvanları analiz edebilirim?
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Şu anda büyükbaş (dana, inek, boğa), koyun ve keçi analizini
                destekliyoruz. Deve analizi yakında eklenecek.
              </p>
            </Card3D>

            <Card3D className="card card-hover p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Ücretsiz mi kullanabilirim?
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Evet! Kurban-AI tamamen ücretsizdir. Sınırsız analiz yapabilir,
                tüm özelliklerden faydalanabilirsiniz.
              </p>
            </Card3D>
          </div>
        </div>

        {/* Stats Section */}
        <Card3D className="card p-12 mb-20 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Neden Kurban-AI?
            </h2>
            <p className="text-xl text-neutral-600">
              Modern teknoloji ile hayvan analizi alanında güvenilir ve kapsamlı
              çözümler
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">🤖</div>
              <div className="text-3xl font-bold text-green-600 mb-2">95%+</div>
              <p className="text-neutral-800 font-medium">Doğruluk Oranı</p>
              <p className="text-neutral-600 text-sm">
                Gelişmiş AI algoritması
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">📊</div>
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <p className="text-neutral-800 font-medium">Analiz Parametresi</p>
              <p className="text-neutral-600 text-sm">Kapsamlı raporlama</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-600 mb-2">🆓</div>
              <div className="text-3xl font-bold text-cyan-600 mb-2">100%</div>
              <p className="text-neutral-800 font-medium">Tamamen Ücretsiz</p>
              <p className="text-neutral-600 text-sm">Hiçbir ücret yok</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">⚡</div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                &lt;30sn
              </div>
              <p className="text-neutral-800 font-medium">Hızlı Sonuç</p>
              <p className="text-neutral-600 text-sm">Anında analiz</p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🔒
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-2">
                Güvenli & Gizli
              </h4>
              <p className="text-neutral-600 text-sm">
                KVKK uyumlu, verileriniz korunur
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                📱
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-2">
                Mobil Uyumlu
              </h4>
              <p className="text-neutral-600 text-sm">
                Tüm cihazlarda mükemmel çalışır
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🚀
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-2">
                Sürekli Güncelleme
              </h4>
              <p className="text-neutral-600 text-sm">
                AI modeli sürekli geliştirilir
              </p>
            </div>
          </div>
        </Card3D>

        {/* Enhanced How It Works Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Sadece 4 kolay adımda hayvanınızı analiz edin ve profesyonel rapor
              alın
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card3D className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-large">
                1
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Fotoğraf Çekin
              </h3>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Hayvanın net bir fotoğrafını çekin veya galeriden seçin
              </p>
              <div className="flex items-center justify-center">
                <span className="badge badge-success text-xs">
                  Çoklu Fotoğraf Destekli
                </span>
              </div>
            </Card3D>

            <Card3D className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-large">
                2
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Farklı Açılar
              </h3>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Daha doğru analiz için hayvanın farklı açılarından fotoğraflar
                çekin
              </p>
              <div className="flex items-center justify-center">
                <span className="badge badge-info text-xs">360° Görüş</span>
              </div>
            </Card3D>

            <Card3D className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-large">
                3
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                AI Analizi
              </h3>
              <p className="text-neutral-600 leading-relaxed mb-4">
                Yapay zeka modelimiz fotoğrafları analiz eder ve özellikleri
                belirler
              </p>
              <div className="flex items-center justify-center">
                <span className="badge badge-warning text-xs">
                  Deep Learning
                </span>
              </div>
            </Card3D>

            <Card3D className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-large">
                4
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Detaylı Rapor
              </h3>
              <p className="text-neutral-600 leading-relaxed mb-4">
                15+ parametrede detaylı analiz raporu ile tüm bilgileri öğrenin
              </p>
              <div className="flex items-center justify-center">
                <span className="badge badge-error text-xs">
                  Profesyonel Rapor
                </span>
              </div>
            </Card3D>
          </div>

          {/* Analysis Parameters */}
          <Card3D className="card p-8 bg-gradient-to-r from-white to-green-50">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
              Analiz Edilen Parametreler
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-neutral-700">Hayvan Türü & Cinsi</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-neutral-700">Ağırlık Tahmini</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-neutral-700">Et Miktarı</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span className="text-neutral-700">Yaş Tahmini</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-neutral-700">Sağlık Durumu</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span className="text-neutral-700">Pazar Değeri</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-neutral-700">Beslenme Durumu</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-neutral-700">Fiziksel Özellikler</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-neutral-700">Kalite Değerlendirmesi</span>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Security & Privacy Section */}
        <div className="mb-20 animate-fade-in">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Güvenlik & Gizlilik
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Verilerinizin güvenliği bizim için en önemli konudur
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card3D className="card card-hover p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6">
                🔒
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                KVKK Uyumu
              </h3>
              <p className="text-neutral-600">
                Kişisel Verilerin Korunması Kanunu'na tam uyum. Verileriniz
                güvenli şekilde işlenir.
              </p>
            </Card3D>

            <Card3D className="card card-hover p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6">
                🗑️
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Otomatik Silme
              </h3>
              <p className="text-neutral-600">
                Tüm fotoğraflar analiz sonrası otomatik olarak silinir. Hiçbir
                görsel saklanmaz.
              </p>
            </Card3D>

            <Card3D className="card card-hover p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6">
                🚫
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Veri Paylaşımı Yok
              </h3>
              <p className="text-neutral-600">
                Hiçbir veri üçüncü taraflarla paylaşılmaz. Gizliliğiniz tamamen
                korunur.
              </p>
            </Card3D>
          </div>
        </div>

        {/* User Testimonials / Success Stories */}
        <div className="mb-20 animate-slide-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Kullanıcı Deneyimleri
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Binlerce kullanıcı Kurban-AI ile daha bilinçli kararlar veriyor
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card3D className="card card-hover p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  AY
                </div>
                <div>
                  <div className="font-bold text-neutral-900">Ahmet Yılmaz</div>
                  <div className="text-neutral-600 text-sm">
                    Çiftçi - Ankara
                  </div>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-neutral-600 italic">
                "3 farklı açıdan fotoğraf çekip analiz ettirdim. Sonuçlar çok
                doğruydu! Artık hayvan alırken kendimi çok daha güvende
                hissediyorum."
              </p>
            </Card3D>

            <Card3D className="card card-hover p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MK
                </div>
                <div>
                  <div className="font-bold text-neutral-900">Mehmet Kaya</div>
                  <div className="text-neutral-600 text-sm">
                    Besicilik - İzmir
                  </div>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-neutral-600 italic">
                "Koyunlarımın yaş ve ağırlık tahminleri gerçekten doğru çıktı.
                Özellikle değer hesaplama özelliği çok yararlı."
              </p>
            </Card3D>

            <Card3D className="card card-hover p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  FK
                </div>
                <div>
                  <div className="font-bold text-neutral-900">Fatma Koç</div>
                  <div className="text-neutral-600 text-sm">
                    Hayvancılık - Konya
                  </div>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-neutral-600 italic">
                "Ücretsiz olması harika! Çoklu fotoğraf özelliği sayesinde daha
                detaylı analiz alabildim. Herkese tavsiye ederim."
              </p>
            </Card3D>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <Card3D className="card p-12 text-center bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white animate-scale-in mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6">Hemen Başlayın!</h2>
            <p className="text-xl mb-8 text-green-100 leading-relaxed">
              Kurbanlık hayvan seçiminizde akıllı analiz teknolojisinden
              yararlanın. Çoklu fotoğraf özelliği ile en doğru sonuçları alın.
              <span className="font-semibold">
                İlk analizinizi ücretsiz yapın.
              </span>
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl mb-2">📸</div>
                <div className="font-semibold mb-1">Çoklu Fotoğraf</div>
                <div className="text-green-100 text-sm">
                  Farklı açılardan çekin
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl mb-2">🧠</div>
                <div className="font-semibold mb-1">AI Analizi</div>
                <div className="text-green-100 text-sm">30 saniyede sonuç</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-semibold mb-1">Detaylı Rapor</div>
                <div className="text-green-100 text-sm">15+ parametre</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/analyze"
                className="inline-flex items-center px-10 py-5 bg-white/95 backdrop-blur-sm text-green-700 font-bold text-xl rounded-2xl shadow-2xl hover:bg-white hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 border border-white/30 hover:border-white/60 group"
              >
                <svg
                  className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300"
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
                Ücretsiz Analiz Başlat
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-green-100">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">100% Ücretsiz</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Kayıt Gerektirmez</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Güvenli & Gizli</span>
              </div>
            </div>
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
            <Link
              href="/contact"
              className="hover:text-primary-600 transition-colors"
            >
              İletişim
            </Link>
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
