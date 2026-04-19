"use client";

import Link from "next/link";
import AppPageShell from "@/components/AppPageShell";
import Card3D from "@/components/Card3D";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Contact() {
  return (
    <AppPageShell>
      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="hero-pill mb-6">
            Bizimle iletişime geçin
          </div>
          <h1 className="mb-6 font-display text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl">
            <span className="mr-2">İletişim</span>
            <span className="gradient-text">bilgileri</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            Sorularınız, önerileriniz veya destek ihtiyaçlarınız için aşağıdaki
            iletişim bilgilerini kullanarak bize ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Information - Main */}
          <Card3D className="card p-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              İletişim Bilgileri
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    Proje Sahibi
                  </h3>
                  <p className="font-medium text-neutral-600">
                    <a
                      href="https://www.linkedin.com/in/mehmet-erdem-akin-77453b1a0/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-800 underline decoration-emerald-200 underline-offset-2 transition hover:text-emerald-950"
                    >
                      Mehmet Erdem Akın
                    </a>
                  </p>
                  <p className="text-neutral-500 text-sm">
                    Yazılım Geliştirici & AI Uzmanı
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    E-posta
                  </h3>
                  <a
                    href="mailto:mehmet.erdem.akin@outlook.com"
                    className="text-green-600 hover:text-green-700 transition-colors"
                  >
                    mehmet.erdem.akin@outlook.com
                  </a>
                  <p className="text-neutral-500 text-sm mt-1">
                    Genel sorular ve destek için
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    Lokasyon
                  </h3>
                  <p className="text-neutral-600">Ataşehir, İstanbul</p>
                  <p className="text-neutral-500 text-sm">Türkiye</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    Web siteleri
                  </h3>
                  <ul className="mt-1 space-y-2 text-sm">
                    <li>
                      <a
                        href="https://kurban-ai.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-emerald-700 transition hover:text-emerald-900"
                      >
                        kurban-ai.vercel.app
                      </a>
                      <span className="block text-xs text-neutral-500">
                        Güncel canlı sürüm
                      </span>
                    </li>
                    <li>
                      <a
                        href="https://kurbanlikanaliz.netlify.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-emerald-700 transition hover:text-emerald-900"
                      >
                        kurbanlikanaliz.netlify.app
                      </a>
                      <span className="block text-xs text-neutral-500">
                        Önceki dağıtım
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card3D>

          {/* Project Information */}
          <Card3D className="card p-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Proje Hakkında
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  📋 Proje Detayları
                </h3>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-4">
                  <ul className="space-y-2 text-neutral-700">
                    <li>
                      <strong>Proje türü:</strong> Bireysel geliştirilen AI
                      platform
                    </li>
                    <li>
                      <strong>Teknoloji:</strong> Next.js, TypeScript, AI/ML
                    </li>
                    <li>
                      <strong>Kaynak kodu:</strong>{" "}
                      <a
                        href="https://github.com/Mehmet-Erdem-Akin/kurban-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-emerald-800 underline decoration-emerald-300 underline-offset-2 transition hover:text-emerald-950"
                      >
                        GitHub deposu
                      </a>
                    </li>
                    <li>
                      <strong>Lisans:</strong> Özel kullanım
                    </li>
                    <li>
                      <strong>Durum:</strong> Aktif geliştirme
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  🎯 Amaç & Vizyon
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Kurban-AI, yapay zeka teknolojilerini kullanarak hayvan
                  analizi alanında kullanıcılara ücretsiz ve güvenilir hizmet
                  sunmayı amaçlar. Geleneksel hayvan değerlendirme süreçlerini
                  modernize etmeyi hedefler.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  📞 İletişim Konuları
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="mailto:mehmet.erdem.akin@outlook.com?subject=Kurbanl%C4%B1k%20Analiz%20-%20Teknik%20destek"
                    className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-center text-sm font-medium text-sky-800 transition hover:border-sky-300 hover:bg-sky-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"
                  >
                    Teknik destek
                  </a>
                  <a
                    href="mailto:mehmet.erdem.akin@outlook.com?subject=Kurbanl%C4%B1k%20Analiz%20-%20Geri%20bildirim"
                    className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-900 transition hover:border-emerald-300 hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                  >
                    Geri bildirim
                  </a>
                  <a
                    href="mailto:mehmet.erdem.akin@outlook.com?subject=Kurbanl%C4%B1k%20Analiz%20-%20%C4%B0%C5%9F%20birli%C4%9Fi"
                    className="rounded-lg border border-violet-200 bg-violet-50 p-3 text-center text-sm font-medium text-violet-900 transition hover:border-violet-300 hover:bg-violet-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
                  >
                    İş birliği
                  </a>
                  <a
                    href="mailto:mehmet.erdem.akin@outlook.com?subject=Kurbanl%C4%B1k%20Analiz%20-%20Hata%20bildirimi"
                    className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center text-sm font-medium text-amber-900 transition hover:border-amber-300 hover:bg-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
                  >
                    Hata bildirimi
                  </a>
                </div>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* FAQ Quick Links */}
          <Card3D className="card p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Hızlı Yardım
            </h3>
            <p className="text-neutral-600 mb-6">
              Sık sorulan sorularımıza göz atarak hızlı çözüm bulabilirsiniz.
            </p>
            <div className="space-y-3">
              <Link
                href="/#sss"
                className="flex items-center rounded-lg text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-900"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Sıkça Sorulan Sorular
              </Link>
              <Link
                href="/#nasil"
                className="flex items-center rounded-lg text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-900"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Analiz nasıl çalışır?
              </Link>
              <Link
                href="/#ozellikler"
                className="flex items-center rounded-lg text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-900"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Özellikler ve yetenekler
              </Link>
              <Link
                href="/analyze"
                className="flex items-center rounded-lg text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-900"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Analiz aracını aç
              </Link>
              <Link
                href="/privacy"
                className="flex items-center rounded-lg text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-900"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Gizlilik Politikası
              </Link>
              <Link
                href="/terms"
                className="flex items-center rounded-lg px-1 py-0.5 text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-900"
              >
                <svg
                  className="mr-2 h-4 w-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Kullanım şartları
              </Link>
              <Link
                href="/kvkk"
                className="flex items-center rounded-lg px-1 py-0.5 text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-900"
              >
                <svg
                  className="mr-2 h-4 w-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                KVKK aydınlatma metni
              </Link>
            </div>
          </Card3D>

          {/* Response Information */}
          <Card3D className="card p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Yanıt Süreleri
            </h3>
            <p className="text-neutral-600 mb-6">
              İletişim türüne göre ortalama yanıt sürelerimiz.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:mehmet.erdem.akin@outlook.com?subject=Kurbanl%C4%B1k%20Analiz%20-%20Genel%20soru"
                className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                <span>Genel sorular</span>
                <span className="font-medium text-emerald-800">24 saat</span>
              </a>
              <a
                href="mailto:mehmet.erdem.akin@outlook.com?subject=Kurbanl%C4%B1k%20Analiz%20-%20Teknik%20destek"
                className="flex items-center justify-between rounded-lg border border-sky-200 bg-sky-50/80 p-3 text-neutral-700 transition hover:border-sky-300 hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"
              >
                <span>Teknik destek</span>
                <span className="font-medium text-sky-800">48 saat</span>
              </a>
              <a
                href="mailto:mehmet.erdem.akin@outlook.com?subject=Kurbanl%C4%B1k%20Analiz%20-%20Hata%20bildirimi"
                className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-neutral-700 transition hover:border-amber-300 hover:bg-amber-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
              >
                <span>Hata bildirimi</span>
                <span className="font-medium text-amber-900">12 saat</span>
              </a>
              <a
                href="mailto:mehmet.erdem.akin@outlook.com?subject=Kurbanl%C4%B1k%20Analiz%20-%20%C4%B0%C5%9F%20birli%C4%9Fi"
                className="flex items-center justify-between rounded-lg border border-violet-200 bg-violet-50/80 p-3 text-neutral-700 transition hover:border-violet-300 hover:bg-violet-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
              >
                <span>İş birliği</span>
                <span className="font-medium text-violet-900">72 saat</span>
              </a>
            </div>
          </Card3D>
        </div>

        {/* Social Media & Additional Info */}
        <Card3D className="card border-emerald-100 bg-emerald-50/60 p-12 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Sosyal Medyada Takip Edin
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
            Güncel haberler, yeni özellikler ve ipuçları için sosyal medya
            hesaplarımızı takip edin.
          </p>

          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://x.com/Mehmetoloji_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white hover:scale-105 transition-transform duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="https://github.com/Mehmet-Erdem-Akin/kurban-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center text-white hover:scale-105 transition-transform duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/mehmet-erdem-akin-77453b1a0/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white hover:scale-105 transition-transform duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:mehmet.erdem.akin@outlook.com?subject=Kurbanl%C4%B1k%20Analiz%20-%20Video%20%2F%20i%C3%A7erik%20%C3%B6nerisi"
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
              aria-label="Video veya içerik önerisi için e-posta gönder"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-3">
            <a
              href="https://github.com/Mehmet-Erdem-Akin/kurban-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-stone-200/80 bg-white/80 p-6 text-center shadow-sm transition hover:border-emerald-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              <div className="mb-2 text-3xl font-bold text-emerald-600">🚀</div>
              <div className="mb-1 text-xl font-bold text-neutral-900 group-hover:text-emerald-900">
                Kaynak kod
              </div>
              <p className="text-sm text-neutral-600">
                GitHub üzerinden inceleyin
              </p>
            </a>
            <a
              href="mailto:mehmet.erdem.akin@outlook.com?subject=Kurbanl%C4%B1k%20Analiz"
              className="group rounded-2xl border border-stone-200/80 bg-white/80 p-6 text-center shadow-sm transition hover:border-emerald-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              <div className="mb-2 text-3xl font-bold text-sky-600">📧</div>
              <div className="mb-1 text-xl font-bold text-neutral-900 group-hover:text-emerald-900">
                E-posta
              </div>
              <p className="text-sm text-neutral-600">
                Doğrudan mesaj gönderin
              </p>
            </a>
            <Link
              href="/analyze"
              className="group rounded-2xl border border-stone-200/80 bg-white/80 p-6 text-center shadow-sm transition hover:border-emerald-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              <div className="mb-2 text-3xl font-bold text-violet-600">🤝</div>
              <div className="mb-1 text-xl font-bold text-neutral-900 group-hover:text-emerald-900">
                Analize başla
              </div>
              <p className="text-sm text-neutral-600">
                Hayvan fotoğrafını yükleyin
              </p>
            </Link>
          </div>
        </Card3D>
      </main>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </AppPageShell>
  );
}
