import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "İletişim | Kurban AI",
  description:
    "Kurban AI ile iletişime geçin. Yapay zeka destekli hayvan analizi hakkında sorularınız için bize ulaşın.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-neutral-900 mb-6">İletişim</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Kurban AI hakkında sorularınız mı var? Bize ulaşın, size yardımcı
            olmaktan memnuniyet duyarız.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Phone Contact */}
          <div className="card p-8 bg-white border-primary-200 hover:border-primary-300 transition-colors">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                Telefon
              </h3>
              <p className="text-neutral-600 mb-4">
                Doğrudan arayarak sorularınızı sorabilirsiniz
              </p>
              <a
                href="tel:05434737231"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                <span>0543 473 7231</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Email Contact */}
          <div className="card p-8 bg-white border-secondary-200 hover:border-secondary-300 transition-colors">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 text-secondary-600 rounded-full mb-6">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                E-posta
              </h3>
              <p className="text-neutral-600 mb-4">
                E-posta gönderebilir veya yazılı sorularınızı iletebilirsiniz
              </p>
              <a
                href="mailto:mehmet.erdem.akin@outlook.com"
                className="inline-flex items-center gap-2 text-secondary-600 font-semibold hover:text-secondary-700 transition-colors"
              >
                <span>mehmet.erdem.akin@outlook.com</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Developer Info */}
        <div className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200 mb-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Geliştirici Hakkında
            </h3>
            <p className="text-neutral-600 mb-4">
              <strong>Mehmet Erdem Akın</strong> tarafından geliştirilmiştir.
            </p>
            <p className="text-neutral-600 mb-4">
              Kurban AI, yapay zeka teknolojilerini kullanarak hayvan analizi
              alanında kullanıcılara ücretsiz ve güvenilir hizmet sunmayı
              amaçlar.
            </p>
            <p className="text-sm text-neutral-500">
              Konum: Ataşehir, İstanbul
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card p-8 bg-white border-accent-200 mb-16">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            Sık Sorulan Sorular
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-neutral-900 mb-2">
                Analiz ne kadar sürede tamamlanır?
              </h4>
              <p className="text-neutral-600">
                Yapay zeka destekli analizimiz genellikle birkaç saniye
                içerisinde tamamlanır.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 mb-2">
                Hangi hayvan türleri analiz edilebilir?
              </h4>
              <p className="text-neutral-600">
                Şu anda başta koyun ve keçi olmak üzere çeşitli çiftlik
                hayvanları analiz edilebilmektedir.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 mb-2">
                Fotoğraflarım güvende mi?
              </h4>
              <p className="text-neutral-600">
                Evet, gizliliğiniz bizim için önemlidir. Detaylar için{" "}
                <Link
                  href="/privacy"
                  className="text-primary-600 hover:text-primary-700"
                >
                  Gizlilik Politikası
                </Link>
                &apos;nı inceleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
