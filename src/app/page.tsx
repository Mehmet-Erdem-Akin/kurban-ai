"use client";

import {
  ArrowTrendingUpIcon,
  BookOpenIcon,
  CalculatorIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  HeartIcon,
  PhotoIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import AppPageShell from "@/components/AppPageShell";
import ManualWeightCalculator from "@/components/ManualWeightCalculator";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getCanonicalUrl } from "@/lib/seo";

const features = [
  {
    title: "Çoklu fotoğraf",
    desc: "Aynı hayvandan farklı açılar yükleyerek modelin bağlam kurmasına yardımcı olun.",
    icon: <PhotoIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden />,
  },
  {
    title: "Tür ve kondisyon",
    desc: "Büyükbaş ve küçükbaş ayrımı, görünür özelliklere göre ön değerlendirme.",
    icon: <SunIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden />,
  },
  {
    title: "Et ve fiyat çerçevesi",
    desc: "Karkas verimi ve piyasa referanslarıyla yönlendirici tahmin (resmi ekspertiz değildir).",
    icon: (
      <CurrencyDollarIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
    ),
  },
];

const heroFeatureCards = [
  {
    title: "Kolay hesaplama",
    text: "Yaş, ırk ve cinsiyete göre kurbanlığınızın ortalama kilosunu saniyeler içinde hesaplayın.",
    icon: <CalculatorIcon className="h-7 w-7" strokeWidth={1.9} aria-hidden />,
  },
  {
    title: "Doğru ve güvenilir",
    text: "Güncel veriler ve uzman kaynaklarla doğru sonuçlar elde edin, içiniz rahat olsun.",
    icon: <ShieldCheckIcon className="h-7 w-7" strokeWidth={1.9} aria-hidden />,
  },
  {
    title: "Bilgilendirici rehber",
    text: "Kurbanlık seçimi, özellikleri ve ibadetle ilgili merak ettikleriniz rehberimizde.",
    icon: <BookOpenIcon className="h-7 w-7" strokeWidth={1.9} aria-hidden />,
  },
  {
    title: "İbadetinizi huzurla",
    text: "Doğru kilo, doğru seçimle ibadetinizi en güzel şekilde yerine getirin.",
    icon: <HeartIcon className="h-7 w-7" strokeWidth={1.9} aria-hidden />,
  },
];

const heroTrustSignals = ["Güvenilir", "Hızlı", "Ücretsiz"];

const heroSupportItems = [
  {
    title: "Doğru Hesaplama",
    text: "Güvenilir Sonuçlar",
    icon: <ShieldCheckIcon className="h-8 w-8" strokeWidth={1.8} aria-hidden />,
  },
];

const heroBackgroundStyle = {
  backgroundImage: "url('/hero-bg-2.png')",
};

const supportedAnimals = [
  {
    title: "Büyükbaş",
    tags: "Dana, tosun, boğa, inek, buzağı, manda",
    icon: <ScaleIcon className="h-7 w-7" strokeWidth={1.7} aria-hidden />,
  },
  {
    title: "Küçükbaş",
    tags: "Koyun, koç, keçi, kuzu, oğlak, teke",
    icon: <SunIcon className="h-7 w-7" strokeWidth={1.7} aria-hidden />,
  },
];

const steps = [
  {
    n: "1",
    title: "Net fotoğraf",
    text: "Gövdenin büyük kısmı görünsün; bulanık ve çok uzak karelerden kaçının.",
  },
  {
    n: "2",
    title: "İsteğe bağlı bilgi",
    text: "Tahmini yaş veya ağırlık girerseniz sonuçlar daha tutarlı olabilir.",
  },
  {
    n: "3",
    title: "Analizi çalıştırın",
    text: "Tek tıkla API üzerinden yapay zeka analizi başlar.",
  },
  {
    n: "4",
    title: "Raporu kullanın",
    text: "PDF veya görüntü olarak paylaşın; nihai kararı veteriner ve pazar ile doğrulayın.",
  },
];

const faqs = [
  {
    q: "Sonuçlar ne kadar güvenilir?",
    a: "Bu araç yalnızca fotoğrafa dayalı ön analiz sunar. Resmi değerleme, tartı veya veteriner muayenesi yerine geçmez.",
  },
  {
    q: "Fotoğraflarım saklanıyor mu?",
    a: "Görüntüler öncelikle analiz anında işlenir ve sunucuda kalıcı fotoğraf arşivi tutulmaz. Hesap veya analiz geçmişi kullanırsanız özet sonuçlar sınırlı süre saklanabilir; ayrıntılar Gizlilik ve KVKK sayfalarındadır.",
  },
  {
    q: "Hangi hayvanlar destekleniyor?",
    a: "Yalnızca büyükbaş (dana, boğa, inek, manda, buzağı vb.) ve küçükbaş (koyun, koç, keçi vb.) kurbanlık türleri hedeflenir; diğer türler için uyarı verilir.",
  },
  {
    q: "Ücret var mı?",
    a: "Uygulama ücretsiz kullanıma açıktır; sonuçlar bilgilendirme amaçlıdır.",
  },
];

const faqStructuredData = {
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

const howToStructuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Kurbanlık fotoğrafı ile analiz yapma",
  description:
    "Kurbanlık Analiz platformunda fotoğraf yükleyerek tahmini kilo ve piyasa değeri analizi alma adımları.",
  totalTime: "PT3M",
  step: steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.text,
    url: `${getCanonicalUrl("/")}#nasil`,
  })),
};

const Home = () => {
  return (
    <AppPageShell>
      <SiteHeader />
      <script
        id="home-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <script
        id="home-howto-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToStructuredData),
        }}
      />

      <main className="relative z-10">
        <section className="relative isolate overflow-hidden bg-white py-10 sm:py-14 lg:min-h-[760px] lg:py-16 dark:bg-stone-950">
          <div
            className="absolute inset-0 -z-20 bg-cover bg-[position:58%_center] opacity-90 sm:bg-center lg:opacity-100"
            style={heroBackgroundStyle}
            aria-hidden
          />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.86)_34%,rgba(255,255,255,0.42)_56%,rgba(255,255,255,0.06)_100%),linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.94)_100%)] dark:bg-[linear-gradient(90deg,rgba(12,10,9,0.94)_0%,rgba(12,10,9,0.82)_36%,rgba(12,10,9,0.42)_62%,rgba(12,10,9,0.16)_100%),linear-gradient(180deg,rgba(12,10,9,0.12)_0%,rgba(12,10,9,0.92)_100%)]"
            aria-hidden
          />
          <div className="mx-auto flex min-h-[680px] max-w-6xl flex-col justify-between px-4">
            <div className="max-w-2xl animate-fade-in pt-2 text-left sm:pt-4 lg:pt-8">
              <Image
                src="/ka-logo.png"
                alt="Kurbanlık Kilo Hesaplama"
                width={360}
                height={134}
                priority
                className="h-auto w-[235px] sm:w-[300px]"
              />
              <h1 className="mt-8 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.04] tracking-tight text-stone-950 dark:text-stone-50 sm:text-6xl lg:text-7xl">
                Kurbanlık Kilonu{" "}
                <span className="block text-emerald-800 dark:text-emerald-300">
                  Hesapla, İçin Rahat Olsun
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg">
                Kurbanlık hayvanınızın yaş, ırk ve cinsiyet bilgilerine göre
                ortalama kilosunu hesaplayın; ibadetinizi doğru ve huzurlu bir
                şekilde yerine getirin.
              </p>
              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
                <Link
                  href="#hesaplama"
                  className="btn btn-primary btn-lg justify-center gap-3 rounded-2xl px-7 py-4 shadow-xl shadow-emerald-900/20"
                >
                  <CalculatorIcon
                    className="h-5 w-5"
                    strokeWidth={2}
                    aria-hidden
                  />
                  Hemen Kilo Hesapla
                </Link>
                {heroSupportItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-soft backdrop-blur-md dark:border-stone-700/70 dark:bg-stone-900/70"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-800 shadow-sm dark:border-emerald-800/60 dark:bg-stone-950 dark:text-emerald-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-700 dark:text-stone-200">
                        {item.title}
                      </p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {heroFeatureCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-medium shadow-stone-900/5 backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-large dark:border-stone-700/70 dark:bg-stone-900/85"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 dark:bg-emerald-600">
                      {card.icon}
                    </div>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-emerald-900 dark:text-emerald-200">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>

              <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 text-base font-semibold text-stone-700 dark:text-stone-200">
                <li className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                  <CheckBadgeIcon className="h-7 w-7" aria-hidden />
                </li>
                {heroTrustSignals.map((label, index) => (
                  <li key={label} className="flex items-center gap-3">
                    {index > 0 && (
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-emerald-700 dark:bg-emerald-300"
                        aria-hidden
                      />
                    )}
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ManualWeightCalculator />

        <section
          id="ozellikler"
          className="surface-band scroll-mt-24 py-14 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto">Özellikler</p>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
                Öne çıkanlar
              </h2>
              <p className="mt-3 text-stone-600 dark:text-stone-400">
                Fotoğrafla kilo tahmini, manuel karkas hesabı ve randıman
                tablosunu tek yerde kullanın.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="card-hover group relative flex min-h-[220px] flex-col overflow-hidden p-6 sm:p-7"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-700 via-teal-500 to-amber-500 opacity-0 transition group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100/90 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-800 shadow-sm ring-1 ring-white/60 transition group-hover:border-emerald-200 group-hover:shadow-md dark:border-emerald-800/50 dark:from-emerald-950/60 dark:to-teal-950/50 dark:text-emerald-300 dark:ring-stone-700/60 dark:group-hover:border-emerald-600/50">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {f.desc}
                  </p>
                  <div className="mt-auto pt-5">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 dark:text-emerald-300">
                      İncele
                      <ArrowTrendingUpIcon className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="nasil"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 text-center sm:py-20"
        >
          <p className="section-kicker mb-3">Adımlar</p>
          <h2 className="text-center font-display text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
            Nasıl çalışır?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-stone-600 dark:text-stone-400">
            Dört kısa adım. İsterseniz yalnızca fotoğraf ile de devam
            edebilirsiniz.
          </p>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li
                key={s.n}
                className="card relative overflow-hidden p-6 transition hover:border-emerald-100"
              >
                <span className="pointer-events-none absolute right-3 top-3 font-display text-5xl font-semibold text-stone-100/90 dark:text-stone-800/80">
                  {s.n}
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
                  Adım {s.n}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-stone-900 dark:text-stone-50">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="surface-band py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center text-center">
              <p className="section-kicker mb-3">Kapsam</p>
              <h2 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-50 sm:text-3xl">
                Desteklenen türler
              </h2>
            </div>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-stone-600 dark:text-stone-400">
              Model bu türler için eğitim ve prompt bağlamıyla uyumludur.
            </p>
            <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
              {supportedAnimals.map((row) => (
                <div
                  key={row.title}
                  className="card-hover relative overflow-hidden p-6 text-left"
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-100/70 blur-2xl dark:bg-emerald-900/30"
                    aria-hidden
                  />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-800 shadow-sm dark:border-emerald-800/60 dark:from-emerald-950/50 dark:to-teal-950/40 dark:text-emerald-200">
                      {row.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900 dark:text-stone-50">
                        {row.title}
                      </h3>
                      <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                        {row.tags}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="sss"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:py-20"
        >
          <div className="flex flex-col items-center text-center">
            <p className="section-kicker mb-3">SSS</p>
            <h2 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-50 sm:text-3xl">
              Sıkça sorulanlar
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
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

        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="animal-cta relative overflow-hidden px-6 py-12 sm:px-10">
            <div className="relative z-[1] mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Hazır mısınız?
              </h2>
              <p className="mt-3 text-sm text-emerald-100 sm:text-base">
                Birkaç net fotoğrafla kilo tahmini alın. Sonuçları indirip
                danışmanız veya satıcıyla paylaşabilirsiniz.
              </p>
              <Link
                href="/analyze"
                className="animal-cta-btn btn-md mt-8 inline-flex"
              >
                Fotoğrafla kilo hesapla
              </Link>
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

export default Home;
