"use client";

import {
  CheckIcon,
  SparklesIcon,
  StarIcon,
  GiftIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ClockIcon,
  BoltIcon,
  ChartBarIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import AppPageShell from "@/components/AppPageShell";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useAuth } from "@/components/AuthProvider";

type Package = {
  name: string;
  analysisCount: string;
  features: string[];
  featured: boolean;
  cta: { label: string; href: string };
  icon: React.ReactNode;
  badge?: string;
};

const packages: Package[] = [
  {
    name: "Standart Paket",
    analysisCount: "10 Adet",
    features: ["PDF Çıktı", "Geçmişi Görüntüleme"],
    featured: false,
    cta: { label: "Satın Al", href: "/contact" },
    icon: <DocumentTextIcon className="h-7 w-7" strokeWidth={1.75} aria-hidden />,
  },
  {
    name: "Pro Paket",
    analysisCount: "50 Adet",
    features: ["Öncelikli İşlem", "Detaylı Raporlama", "PDF Çıktı", "Geçmişi Görüntüleme"],
    featured: true,
    cta: { label: "Satın Al", href: "/contact" },
    icon: <BoltIcon className="h-7 w-7" strokeWidth={1.75} aria-hidden />,
    badge: "En Popüler",
  },
  {
    name: "Sınırsız Paket",
    analysisCount: "Limitsiz (Aylık)",
    features: [
      "Besiciler ve kasaplar için sınırsız kullanım",
      "Öncelikli İşlem",
      "Detaylı Raporlama",
      "PDF Çıktı",
      "Geçmişi Görüntüleme",
    ],
    featured: false,
    cta: { label: "İletişim", href: "/contact" },
    icon: <ArrowPathIcon className="h-7 w-7" strokeWidth={1.75} aria-hidden />,
  },
];

const faqs = [
  {
    q: "Hoş Geldin Paketi nedir?",
    a: "Yeni kayıt olan her kullanıcıya 3 adet ücretsiz analiz hakkı tanınır. Bu hakları kullanarak platformumuzu deneyebilirsiniz.",
  },
  {
    q: "Analiz hakkım biterse ne olur?",
    a: "Analiz hakkınız tükendiğinde yeni bir paket satın alarak devam edebilirsiniz. Mevcut analizleriniz ve raporlarınız her zaman erişilebilir kalır.",
  },
  {
    q: "Sınırsız paket gerçekten limitsiz mi?",
    a: "Evet, Sınırsız Paket aylık abonelik modeliyle çalışır ve abonelik süresi boyunca istediğiniz kadar analiz yapabilirsiniz. Besiciler ve kasaplar için ideal bir çözümdür.",
  },
  {
    q: "Ödeme nasıl yapılır?",
    a: "Ödeme sistemi yakında aktif olacaktır. Şu an için paket satın almak istiyorsanız iletişim sayfamızdan bize ulaşabilirsiniz.",
  },
  {
    q: "Paketler arası geçiş yapabilir miyim?",
    a: "Evet, istediğiniz zaman daha üst bir pakete geçiş yapabilirsiniz. Kalan analiz haklarınız yeni paketinize eklenir.",
  },
  {
    q: "Kullanılmayan haklar sonraki aya devredilir mi?",
    a: "Standart ve Pro paketlerdeki analiz hakları süresiz olarak geçerlidir. Sınırsız pakette ise aylık abonelik modeli uygulanır.",
  },
];

const PricingPage = () => {
  const { user } = useAuth();

  return (
    <AppPageShell>
      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:py-16">
        {/* Hero */}
        <div className="mb-16 text-center animate-fade-in">
          <div className="hero-pill mb-6">
            <SparklesIcon className="h-4 w-4 text-emerald-700 dark:text-emerald-400" strokeWidth={2} aria-hidden />
            Paketler ve Fiyatlandırma
          </div>
          <h1 className="mb-6 font-display text-4xl font-semibold leading-tight tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
            İhtiyacınıza uygun{" "}
            <span className="gradient-text">paketi seçin</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-400">
            Bireysel kullanımdan profesyonel ihtiyaçlara kadar her seviyeye uygun
            analiz paketleri sunuyoruz.
          </p>
        </div>

        {/* Welcome Package Banner */}
        <div className="mb-14 animate-slide-up">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-6 shadow-soft dark:border-emerald-800/50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-emerald-950/40 sm:p-8">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5"
              aria-hidden
            />
            <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-900/20">
                <GiftIcon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold text-emerald-950 dark:text-emerald-100">
                  Hoş Geldin Paketi
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-emerald-800/80 dark:text-emerald-300/80">
                  Yeni kayıt olan her kullanıcıya{" "}
                  <strong className="font-semibold text-emerald-900 dark:text-emerald-200">3 adet ücretsiz analiz hakkı</strong>{" "}
                  hediye ediyoruz. Platformumuzu denemek için harika bir başlangıç!
                </p>
                {user && (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-white/80 px-3 py-1 text-sm font-medium text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                    Kalan hakkınız: <strong>{user.remainingCredits}</strong> analiz
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-20 grid gap-6 md:grid-cols-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 sm:p-8 ${
                pkg.featured
                  ? "border-emerald-300 bg-gradient-to-b from-white via-emerald-50/30 to-white shadow-medium ring-1 ring-emerald-200/60 dark:border-emerald-700 dark:from-stone-900 dark:via-emerald-950/20 dark:to-stone-900 dark:ring-emerald-800/40"
                  : "card hover:-translate-y-0.5 hover:border-emerald-200/50 hover:shadow-medium dark:hover:border-emerald-700/40"
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-700 to-emerald-900 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-emerald-900/25">
                    <StarIcon className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="mb-6 text-center">
                <div
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl shadow-sm ${
                    pkg.featured
                      ? "bg-gradient-to-br from-emerald-600 to-emerald-800 text-white ring-2 ring-emerald-200/50 dark:ring-emerald-700/50"
                      : "border border-emerald-100/90 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-800 dark:border-emerald-800/50 dark:from-emerald-950/60 dark:to-teal-950/50 dark:text-emerald-300"
                  }`}
                >
                  {pkg.icon}
                </div>
                <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-50">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-2xl font-bold text-emerald-800 dark:text-emerald-300">
                  {pkg.analysisCount}
                </p>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">analiz hakkı</p>
              </div>

              <div className="mb-4 rounded-xl border border-amber-200/80 bg-amber-50/60 px-4 py-2.5 text-center dark:border-amber-800/40 dark:bg-amber-950/30">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                  <ClockIcon className="mr-1.5 inline h-4 w-4" strokeWidth={2} aria-hidden />
                  Fiyat: Yakında
                </p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-stone-700 dark:text-stone-300">
                    <CheckIcon
                      className={`mt-0.5 h-5 w-5 shrink-0 ${
                        pkg.featured
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-emerald-700/70 dark:text-emerald-500/70"
                      }`}
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={pkg.cta.href}
                className={`btn btn-md w-full justify-center ${
                  pkg.featured ? "btn-primary" : "btn-secondary"
                }`}
              >
                {pkg.cta.label === "İletişim" && (
                  <ChatBubbleLeftRightIcon className="mr-2 h-4 w-4" strokeWidth={2} aria-hidden />
                )}
                {pkg.cta.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison note */}
        <div className="mb-20 text-center">
          <div className="card mx-auto max-w-2xl p-6 sm:p-8">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400">
              <ChartBarIcon className="h-5 w-5 text-emerald-700 dark:text-emerald-400" strokeWidth={2} aria-hidden />
              Tüm paketlerde yapay zeka destekli analiz, tür ve kondisyon tespiti bulunur.
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="mb-10">
          <div className="mb-10 text-center">
            <p className="section-kicker mb-3">SSS</p>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
              Paketler hakkında sık sorulanlar
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.q} className="card-hover p-6">
                <h3 className="font-semibold text-stone-900 dark:text-stone-50">
                  {item.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-8">
          <div className="animal-cta relative overflow-hidden px-6 py-12 sm:px-10">
            <div className="relative z-[1] mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Hemen başlayın
              </h2>
              <p className="mt-3 text-sm text-emerald-100 sm:text-base">
                Ücretsiz 3 analiz hakkınızla platformumuzu deneyin. Paketler yakında
                satışa sunulacaktır.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/analyze"
                  className="animal-cta-btn btn-md inline-flex"
                >
                  Analize Başla
                </Link>
                <Link
                  href="/contact"
                  className="btn btn-md border border-white/30 text-white hover:bg-white/10"
                >
                  Bize Ulaşın
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </AppPageShell>
  );
};

export default PricingPage;
