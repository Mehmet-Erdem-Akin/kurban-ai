import Link from "next/link";

export default function DemoPage() {
  const demoResults = [
    {
      id: 1,
      image: "/demo/dana1.jpg",
      animalType: "Dana",
      breed: "Simmental",
      weight: 480,
      healthScore: 95,
      value: 52000,
      confidence: 96,
    },
    {
      id: 2,
      image: "/demo/koc1.jpg",
      animalType: "Koç",
      breed: "Kıvırcık",
      weight: 85,
      healthScore: 88,
      value: 12500,
      confidence: 92,
    },
    {
      id: 3,
      image: "/demo/kuzu1.jpg",
      animalType: "Kuzu",
      breed: "Sakız",
      weight: 45,
      healthScore: 90,
      value: 8200,
      confidence: 89,
    },
  ];

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-soft">
              <span className="text-white text-lg font-bold">KA</span>
            </div>
            <span className="text-2xl font-bold text-neutral-800">
              Kurbanlık Analiz
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="btn btn-secondary btn-md">
              Ana Sayfa
            </Link>
            <Link href="/analyze" className="btn btn-primary btn-md">
              Analiz Başlat
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-medium mb-6">
              🎬 Canlı Demo
            </div>
            <h1 className="text-5xl font-bold text-neutral-900 mb-6">
              Kurbanlık Analiz
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                {" "}
                Demo
              </span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Yapay zeka modelimizin nasıl çalıştığını gerçek örneklerle görün
            </p>
          </div>

          {/* Video Demo Section */}
          <div className="card p-8 mb-16 animate-scale-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Nasıl Çalışır?
              </h2>
              <p className="text-neutral-600">
                Uygulamamızı kullanarak nasıl analiz yapacağınızı öğrenin
              </p>
            </div>

            <div className="relative bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl aspect-video flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-large">
                  <svg
                    className="w-8 h-8 text-white"
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
                </div>
                <h3 className="text-xl font-bold text-neutral-700 mb-2">
                  Video Demo
                </h3>
                <p className="text-neutral-500">Yakında eklenecek</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Fotoğraf Yükle
                </h3>
                <p className="text-neutral-600 text-sm">
                  Hayvan fotoğrafını kamera ile çek veya galeriden seç
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  AI Analizi
                </h3>
                <p className="text-neutral-600 text-sm">
                  Yapay zeka modeli fotoğrafı analiz eder
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Sonuçlar
                </h3>
                <p className="text-neutral-600 text-sm">
                  Detaylı analiz raporunu incele
                </p>
              </div>
            </div>
          </div>

          {/* Sample Results */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Örnek Analiz Sonuçları
              </h2>
              <p className="text-xl text-neutral-600">
                Gerçek hayvan fotoğrafları ile yapılan analizler
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {demoResults.map((result, index) => (
                <div
                  key={result.id}
                  className="card card-hover animate-slide-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-t-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-neutral-300 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg
                          className="w-8 h-8 text-neutral-500"
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
                      <p className="text-sm text-neutral-500">Demo Görsel</p>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="badge badge-success">
                        %{result.confidence} güven
                      </span>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-neutral-900">
                        {result.animalType}
                      </h3>
                      <span className="badge badge-primary">{result.breed}</span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Ağırlık:</span>
                        <span className="font-semibold">{result.weight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Sağlık Skoru:</span>
                        <span className="font-semibold text-green-600">
                          {result.healthScore}/100
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Tahmini Değer:</span>
                        <span className="font-bold text-primary-600">
                          ₺{result.value.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">Güven oranı:</span>
                        <span className="font-semibold text-accent-600">
                          %{result.confidence}
                        </span>
                      </div>
                      <div className="mt-2 bg-neutral-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-accent-500 to-accent-600 h-2 rounded-full"
                          style={{ width: `${result.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="card p-8 mb-16 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Neden Kurbanlık Analiz?
              </h2>
              <p className="text-xl text-neutral-600">
                Akıllı teknoloji ile hayvan seçimi hiç bu kadar kolay olmamıştı
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="icon-container-primary mb-4 mx-auto">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Hızlı Analiz
                </h3>
                <p className="text-neutral-600 text-sm">
                  Sadece birkaç saniyede detaylı sonuçlar alın
                </p>
              </div>

              <div className="text-center">
                <div className="icon-container-secondary mb-4 mx-auto">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Doğru Seçim
                </h3>
                <p className="text-neutral-600 text-sm">
                  AI destekli analiz ile en uygun hayvanı seçin
                </p>
              </div>

              <div className="text-center">
                <div className="icon-container-accent mb-4 mx-auto">
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
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Tasarruf
                </h3>
                <p className="text-neutral-600 text-sm">
                  Doğru değerlendirme ile bütçenizi optimize edin
                </p>
              </div>

              <div className="text-center">
                <div className="icon-container-success mb-4 mx-auto">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Güvenilir
                </h3>
                <p className="text-neutral-600 text-sm">
                  Uzman bilgisi ile desteklenen güvenilir sonuçlar
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="card p-8 text-center bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200 animate-scale-in">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Hemen Başlayın!
            </h2>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Kurbanlık hayvan seçiminizde akıllı analiz teknolojisinden
              yararlanın. Ücretsiz hesap oluşturun ve ilk analizinizi yapın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn btn-primary btn-lg">
                Ücretsiz Kayıt Ol
              </Link>
              <Link href="/analyze" className="btn btn-secondary btn-lg">
                Hemen Analiz Et
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg font-bold">KA</span>
                </div>
                <span className="text-xl font-bold">Kurbanlık Analiz</span>
              </div>
              <p className="text-neutral-400">
                Yapay zeka destekli kurbanlık hayvan analiz platformu. Akıllı
                seçim, doğru değer.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Özellikler</h3>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link href="/analyze" className="hover:text-white transition-colors">
                    Fotoğraf Analizi
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-white transition-colors">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Fiyat Hesaplama
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Destek</h3>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Yardım Merkezi
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    İletişim
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    SSS
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Yasal</h3>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Kullanım Şartları
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400">
            <p>&copy; 2024 Kurbanlık Analiz. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
