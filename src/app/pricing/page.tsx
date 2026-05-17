"use client";

import {
  CheckIcon,
  SparklesIcon,
  StarIcon,
  GiftIcon,
  DocumentTextIcon,
  BoltIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import AppPageShell from "@/components/AppPageShell";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useAuth } from "@/components/AuthProvider";
import {
  creditPackages,
  type CreditPackageId,
} from "@/config/creditPackages";
import { getCanonicalUrl } from "@/lib/seo";

const faqs = [
  {
    q: "Hoş Geldin Paketi nedir?",
    a: "Yeni kayıt olan her kullanıcıya 3 ücretsiz kredi tanınır. Bu kredilerle fotoğraf analizi veya manuel hesaplama yaparak platformu deneyebilirsiniz.",
  },
  {
    q: "Kredi hakkım biterse ne olur?",
    a: "Krediniz tükendiğinde yeni bir paket satın alarak devam edebilirsiniz. Mevcut analizleriniz ve raporlarınız erişilebilir kalır.",
  },
  {
    q: "Bir kredi ne için kullanılır?",
    a: "Bir kredi; tek fotoğraf analizi, çoklu fotoğraf analizi veya manuel kilo hesabı için kullanılabilir. Tüm işlemler aynı kredi havuzundan düşer.",
  },
  {
    q: "Ödeme nasıl yapılır?",
    a: "Satın Al butonuna bastığınızda Shopier güvenli ödeme sayfasına yönlendirilirsiniz. Ödeme başarılı olursa krediniz otomatik olarak hesabınıza eklenir.",
  },
  {
    q: "Paketler arası geçiş yapabilir miyim?",
    a: "Evet, istediğiniz zaman daha büyük bir paket satın alabilirsiniz. Kalan kredileriniz yeni paketteki kredilerle birlikte kullanılmaya devam eder.",
  },
  {
    q: "Kullanılmayan krediler silinir mi?",
    a: "Kredi paketleri tek seferliktir; kullanılmayan krediler abonelik ayı sonunda silinmez.",
  },
];

const pricingFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

type ShopierPaymentResponse = {
  success?: boolean;
  error?: string;
  paymentUrl?: string;
  fields?: Record<string, string>;
};

const getPackageIcon = (packageId: CreditPackageId) => {
  if (packageId === "starter") {
    return (
      <DocumentTextIcon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
    );
  }

  if (packageId === "standard") {
    return <BoltIcon className="h-7 w-7" strokeWidth={1.75} aria-hidden />;
  }

  return <ChartBarIcon className="h-7 w-7" strokeWidth={1.75} aria-hidden />;
};

const submitShopierForm = (
  paymentUrl: string,
  fields: Record<string, string>,
) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = paymentUrl;

  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};

const getPaymentStatusMessage = (paymentStatus: string) => {
  if (paymentStatus === "success") {
    return "Ödeme başarılı. Kredileriniz hesabınıza eklendi.";
  }

  if (paymentStatus === "failed") {
    return "Ödeme tamamlanamadı. Kartınızdan tahsilat yapılmadıysa tekrar deneyebilirsiniz.";
  }

  if (paymentStatus === "invalid") {
    return "Ödeme doğrulaması tamamlanamadı. Lütfen bizimle iletişime geçin.";
  }

  return "";
};

const getPurchaseButtonLabel = ({
  isPurchasing,
  isAuthenticated,
}: {
  isPurchasing: boolean;
  isAuthenticated: boolean;
}) => {
  if (isPurchasing) {
    return "Shopier'e yönlendiriliyor...";
  }

  if (isAuthenticated) {
    return "Satın Al";
  }

  return "Giriş Yap ve Satın Al";
};

const PricingPage = () => {
  const { user, loading } = useAuth();
  const [purchasingPackageId, setPurchasingPackageId] =
    useState<CreditPackageId | null>(null);
  const [purchaseError, setPurchaseError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(globalThis.location.search);
    setPaymentStatus(searchParams.get("payment") ?? "");
  }, []);

  const handlePurchasePackage = async (packageId: CreditPackageId) => {
    if (!user) {
      globalThis.location.href = "/auth/login";
      return;
    }

    setPurchasingPackageId(packageId);
    setPurchaseError("");

    try {
      const response = await fetch("/api/payments/shopier/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId }),
      });
      const data = (await response.json()) as ShopierPaymentResponse;

      if (!response.ok || !data.success || !data.paymentUrl || !data.fields) {
        setPurchaseError(data.error ?? "Ödeme başlatılamadı.");
        return;
      }

      submitShopierForm(data.paymentUrl, data.fields);
    } catch {
      setPurchaseError("Ödeme başlatılırken sunucuya bağlanılamadı.");
    } finally {
      setPurchasingPackageId(null);
    }
  };

  const paymentStatusMessage = getPaymentStatusMessage(paymentStatus);

  return (
    <AppPageShell>
      <SiteHeader />
      <script
        id="pricing-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...pricingFaqStructuredData,
            url: getCanonicalUrl("/pricing"),
          }),
        }}
      />

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
            ortak kredi paketleri sunuyoruz.
          </p>
        </div>

        {(paymentStatusMessage || purchaseError) && (
          <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center text-sm font-medium text-emerald-900 shadow-soft dark:border-emerald-800/60 dark:bg-emerald-950/30 dark:text-emerald-100">
            {purchaseError || paymentStatusMessage}
          </div>
        )}

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
                  <strong className="font-semibold text-emerald-900 dark:text-emerald-200">3 ücretsiz kredi</strong>{" "}
                  hediye ediyoruz. Fotoğraf analizi veya manuel hesaplama için kullanabilirsiniz.
                </p>
                {user && (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-white/80 px-3 py-1 text-sm font-medium text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                    Kalan krediniz:{" "}
                    <strong>{user.remainingCredits}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-20 grid gap-6 md:grid-cols-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          {creditPackages.map((pkg) => (
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
                  {getPackageIcon(pkg.id)}
                </div>
                <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-50">
                  {pkg.name}
                </h3>
                <p className="mt-4 font-display text-4xl font-bold text-stone-950 dark:text-stone-50">
                  {pkg.price.toLocaleString("tr-TR")} TL
                </p>
                <p className="mt-2 text-lg font-semibold text-emerald-800 dark:text-emerald-300">
                  {pkg.creditCount} kredi
                </p>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  {pkg.unitPrice}
                </p>
              </div>

              <div className="mb-4 rounded-xl border border-emerald-200/80 bg-emerald-50/70 px-4 py-2.5 text-center dark:border-emerald-800/50 dark:bg-emerald-950/30">
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                  Fiyat: {pkg.price.toLocaleString("tr-TR")} TL
                </p>
                <p className="mt-1 text-xs text-emerald-800/90 dark:text-emerald-300/90">
                  Fotoğraf analizi ve manuel hesaplama ortak kredi kullanır. Ödeme Shopier ile
                  alınır.
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

              <button
                type="button"
                onClick={() => handlePurchasePackage(pkg.id)}
                disabled={loading || purchasingPackageId !== null}
                className={`btn btn-md w-full justify-center ${
                  pkg.featured ? "btn-primary" : "btn-secondary"
                }`}
              >
                {getPurchaseButtonLabel({
                  isPurchasing: purchasingPackageId === pkg.id,
                  isAuthenticated: Boolean(user),
                })}
              </button>
            </div>
          ))}
        </div>

        {/* Comparison note */}
        <div className="mb-20 text-center">
          <div className="card mx-auto max-w-2xl p-6 sm:p-8">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-stone-600 dark:text-stone-400">
              <ChartBarIcon className="h-5 w-5 text-emerald-700 dark:text-emerald-400" strokeWidth={2} aria-hidden />
              Tüm paketlerde krediler fotoğraf analizi ve manuel kilo hesabı için ortak kullanılır.
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
                Ücretsiz 3 kredinizle platformumuzu deneyin. Daha fazla kullanım için
                size uygun paketi seçin.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/analyze"
                  className="animal-cta-btn btn-md inline-flex"
                >
                  Fotoğraf ile kilo hesapla
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
