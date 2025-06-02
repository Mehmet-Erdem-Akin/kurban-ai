import Link from "next/link";
import Image from "next/image";

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
                      <span className="badge badge-info">{result.breed}</span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Ağırlık:</span>
                        <span className="font-semibold">
                          {result.weight} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Sağlık:</span>
                        <span className="font-semibold flex items-center">
                          {result.healthScore}/100
                          <span className="badge badge-success ml-2 text-xs">
                            Mükemmel
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Tahmini Değer:</span>
                        <span className="font-bold text-primary-600">
                          {result.value.toLocaleString()} ₺
                        </span>
                      </div>
                    </div>

                    <button className="btn btn-primary w-full btn-sm">
                      Detayları Görüntüle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Showcase */}
          <div className="card p-12 mb-16 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Gelişmiş Özellikler</h2>
              <p className="text-primary-100 text-lg">
                Kurbanlık Analiz'in sunduğu tüm imkânlar
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
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
                <h3 className="text-lg font-bold mb-2">Detaylı Analiz</h3>
                <p className="text-primary-100 text-sm">
                  Tür, cins, ağırlık ve sağlık analizi
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
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
                <h3 className="text-lg font-bold mb-2">Değer Hesaplama</h3>
                <p className="text-primary-100 text-sm">
                  Güncel piyasa fiyatları ile değerlendirme
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
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
                <h3 className="text-lg font-bold mb-2">Favoriler</h3>
                <p className="text-primary-100 text-sm">
                  Beğendiğiniz hayvanları kaydedin
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Paylaşım</h3>
                <p className="text-primary-100 text-sm">
                  Sonuçları kolayca paylaşın
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Hemen Başlayın!
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              Kendi hayvanınızı analiz etmek için sadece bir fotoğraf yeterli
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/analyze" className="btn btn-primary btn-xl">
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
              <Link href="/register" className="btn btn-secondary btn-xl">
                Hesap Oluştur
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
