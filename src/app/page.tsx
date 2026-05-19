"use client";

import {
  ArrowTrendingUpIcon,
  CameraIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  PhotoIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
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

const heroMetrics = [
  { value: "3 dk", label: "Ortalama ön analiz" },
  { value: "7", label: "Hisse fiyat kırılımı" },
  { value: "PDF", label: "Paylaşılabilir rapor" },
];

const heroTrustSignals = [
  "Gemini destekli ön analiz",
  "Mobilde hızlı kullanım",
  "Fotoğraf + manuel hesaplama",
];

const analysisPreviewCards = [
  {
    label: "Canlı kilo tahmini",
    value: "685 kg",
    detail: "Güven aralığı: 650-720 kg",
    icon: <ScaleIcon className="h-5 w-5" strokeWidth={1.8} aria-hidden />,
  },
  {
    label: "Karkas verimi",
    value: "%58",
    detail: "Besili büyükbaş profili",
    icon: <ChartBarIcon className="h-5 w-5" strokeWidth={1.8} aria-hidden />,
  },
  {
    label: "1/7 hisse",
    value: "35.280 ₺",
    detail: "620 ₺ kg referansıyla",
    icon: (
      <CurrencyDollarIcon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
    ),
  },
];

const analysisQualityRows = [
  { label: "Yan açı netliği", score: 96 },
  { label: "Gövde görünürlüğü", score: 92 },
  { label: "Işık dengesi", score: 88 },
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
        <section className="relative isolate overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-14">
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center opacity-65 dark:opacity-35"
            style={heroBackgroundStyle}
            aria-hidden
          />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(250,250,249,0.18)_0%,rgba(250,250,249,0.1)_34%,rgba(250,250,249,0.28)_64%,rgba(250,250,249,0.18)_100%),linear-gradient(180deg,rgba(250,250,249,0.15)_0%,rgba(250,250,249,0.16)_100%)] dark:bg-[linear-gradient(90deg,rgba(12,10,9,0.17)_0%,rgba(12,10,9,0.28)_40%,rgba(12,10,9,0.32)_72%,rgba(12,10,9,0.15)_100%),linear-gradient(180deg,rgba(12,10,9,0.26)_0%,rgba(12,10,9,0.36)_100%)]"
            aria-hidden
          />
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
            <div className="animate-fade-in text-center lg:text-left">
              <p className="hero-pill mb-5">
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600 dark:bg-emerald-500"
                  aria-hidden
                />
                {"AI destekli kurbanlık değerleme"}
              </p>
              <h1 className="font-display text-balance text-4xl font-semibold tracking-tight text-stone-950 dark:text-stone-50 sm:text-6xl sm:leading-[1.02]">
                Kurbanlık değerini{" "}
                <span className="gradient-text">profesyonel analizle</span>{" "}
                görün.
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg lg:max-w-xl">
                Fotoğraf, canlı kilo ve piyasa referanslarını tek raporda
                birleştiren premium arayüzle daha güvenli seçim yapın.
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
                <Link
                  href="/analyze"
                  className="btn btn-primary btn-lg justify-center gap-2"
                >
                  <CameraIcon
                    className="h-5 w-5"
                    strokeWidth={1.9}
                    aria-hidden
                  />
                  Fotoğraf ile analiz et
                </Link>
                <a
                  href="#hesaplama"
                  className="btn btn-secondary btn-lg justify-center"
                >
                  Manuel hesapla
                </a>
              </div>

              <dl className="mt-9 grid gap-3 sm:grid-cols-3">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/70 bg-white/75 px-4 py-4 shadow-soft backdrop-blur-xl dark:border-stone-700/70 dark:bg-stone-900/70"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-semibold text-emerald-900 dark:text-emerald-200">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative animate-slide-up">
              <div
                className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-amber-300/30 blur-2xl dark:bg-amber-500/20"
                aria-hidden
              />
              <div
                className="absolute -right-8 bottom-10 h-36 w-36 rounded-full bg-emerald-400/25 blur-3xl dark:bg-emerald-500/20"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-large shadow-emerald-950/10 backdrop-blur-2xl dark:border-stone-700/70 dark:bg-stone-900/80 dark:shadow-black/30">
                <div className="relative overflow-hidden rounded-[1.55rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-950 p-5 text-white sm:p-6">
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(251,191,36,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_48%)]"
                    aria-hidden
                  />
                  <div className="relative flex items-center justify-between gap-4">
                    <div>
                      <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-50 backdrop-blur">
                        <SparklesIcon className="h-4 w-4" aria-hidden />
                        Canlı önizleme
                      </p>
                      <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                        AI Analiz Raporu
                      </h2>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-emerald-50/80">
                        Fotoğraftan kilo, randıman ve hisse fiyatı için tek
                        ekranda okunabilir karar özeti.
                      </p>
                    </div>
                    <div className="hidden h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur sm:flex">
                      <PhotoIcon
                        className="h-8 w-8"
                        strokeWidth={1.6}
                        aria-hidden
                      />
                    </div>
                  </div>

                  <div className="relative mt-6 rounded-3xl border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/20 backdrop-blur-md">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-stone-100 to-emerald-50 p-4 text-stone-900">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                            Fotoğraf kalite skoru
                          </p>
                          <p className="mt-1 font-display text-3xl font-semibold text-stone-950">
                            %94
                          </p>
                        </div>
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-lg shadow-emerald-900/25">
                          <CheckBadgeIcon
                            className="h-8 w-8"
                            strokeWidth={1.7}
                            aria-hidden
                          />
                        </div>
                      </div>
                      <div className="mt-5 space-y-2">
                        {analysisQualityRows.map((row) => (
                          <div key={row.label}>
                            <div className="mb-1 flex justify-between text-xs font-medium text-stone-600">
                              <span>{row.label}</span>
                              <span>{row.score}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-stone-200">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-emerald-700 to-teal-500"
                                style={{
                                  width: `${row.score}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
                    {analysisPreviewCards.map((card) => (
                      <div
                        key={card.label}
                        className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"
                      >
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-emerald-50">
                          {card.icon}
                        </div>
                        <p className="text-xs font-medium text-emerald-50/75">
                          {card.label}
                        </p>
                        <p className="mt-1 text-xl font-bold text-white">
                          {card.value}
                        </p>
                        <p className="mt-1 text-[11px] leading-snug text-emerald-50/65">
                          {card.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ul className="mx-auto mt-16 grid max-w-5xl gap-3 px-4 sm:grid-cols-3">
            {heroTrustSignals.map((label) => (
              <li
                key={label}
                className="flex items-center justify-center gap-2 rounded-2xl border border-stone-200/80 bg-white/85 px-4 py-3 text-center text-sm font-semibold text-stone-700 shadow-soft backdrop-blur-sm transition hover:border-emerald-200/60 hover:shadow-medium dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-300 dark:hover:border-emerald-700/50"
              >
                <CheckBadgeIcon
                  className="h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400"
                  strokeWidth={1.8}
                  aria-hidden
                />
                {label}
              </li>
            ))}
          </ul>
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
