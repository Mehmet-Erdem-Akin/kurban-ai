"use client";

import {
  CurrencyDollarIcon,
  PhotoIcon,
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
    icon: (
      <PhotoIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
    ),
  },
  {
    title: "Tür ve kondisyon",
    desc: "Büyükbaş ve küçükbaş ayrımı, görünür özelliklere göre ön değerlendirme.",
    icon: (
      <SunIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
    ),
  },
  {
    title: "Et ve fiyat çerçevesi",
    desc: "Karkas verimi ve piyasa referanslarıyla yönlendirici tahmin (resmi ekspertiz değildir).",
    icon: (
      <CurrencyDollarIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
    ),
  },
];

const steps = [
  { n: "1", title: "Net fotoğraf", text: "Gövdenin büyük kısmı görünsün; bulanık ve çok uzak karelerden kaçının." },
  { n: "2", title: "İsteğe bağlı bilgi", text: "Tahmini yaş veya ağırlık girerseniz sonuçlar daha tutarlı olabilir." },
  { n: "3", title: "Analizi çalıştırın", text: "Tek tıkla API üzerinden yapay zeka analizi başlar." },
  { n: "4", title: "Raporu kullanın", text: "PDF veya görüntü olarak paylaşın; nihai kararı veteriner ve pazar ile doğrulayın." },
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
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:pb-20 sm:pt-14">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <p className="hero-pill mb-4">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600 dark:bg-emerald-500" aria-hidden />
              {"Fotoğraf ile kilo hesaplama"}
            </p>
            <h1 className="font-display text-balance text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl sm:leading-[1.08]">
              Kurbanlık kilosunu{" "}
              <span className="gradient-text">fotoğrafla tahmin edin</span>
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
              Fotoğraf yükleyin; yapay zeka canlı kilo, karkas verimi, hisse
              fiyatı ve piyasa değerini hızlıca tahmin etsin.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/analyze"
                className="btn btn-primary btn-lg justify-center"
              >
                Fotoğraf ile kilo hesapla
              </Link>
              <a
                href="#hesaplama"
                className="btn btn-secondary btn-lg justify-center"
              >
                Manuel hesapla
              </a>
            </div>
          </div>

          <ul className="mx-auto mt-14 grid max-w-4xl gap-3 sm:grid-cols-3 animate-slide-up">
            {[
              "Ücretsiz kullanım",
              "Mobil uyumlu arayüz",
              "KVKK metinleri site içinde",
            ].map((label) => (
              <li
                key={label}
                className="flex items-center justify-center gap-2 rounded-xl border border-stone-200/80 bg-white/85 px-4 py-3 text-center text-sm font-medium text-stone-700 shadow-soft backdrop-blur-sm transition hover:border-emerald-200/60 hover:shadow-medium dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-300 dark:hover:border-emerald-700/50"
              >
                <span
                  className="text-emerald-700 dark:text-emerald-400"
                  aria-hidden
                >
                  ✓
                </span>
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
                  className="card-hover group flex flex-col p-6 sm:p-7"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100/90 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-800 shadow-sm ring-1 ring-white/60 transition group-hover:border-emerald-200 group-hover:shadow-md dark:border-emerald-800/50 dark:from-emerald-950/60 dark:to-teal-950/50 dark:text-emerald-300 dark:ring-stone-700/60 dark:group-hover:border-emerald-600/50">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {f.desc}
                  </p>
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
            <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
              {[
                {
                  emoji: "🐄",
                  title: "Büyükbaş",
                  tags: "Dana, tosun, boğa, inek, buzağı, manda",
                },
                {
                  emoji: "🐑",
                  title: "Küçükbaş",
                  tags: "Koyun, koç, keçi, kuzu, oğlak, teke",
                },
              ].map((row) => (
                <div key={row.title} className="card-hover p-5 text-center">
                  <div className="text-3xl" aria-hidden>
                    {row.emoji}
                  </div>
                  <h3 className="mt-3 font-semibold text-stone-900 dark:text-stone-50">
                    {row.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{row.tags}</p>
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
                <h3 className="font-semibold text-stone-900 dark:text-stone-50">{item.q}</h3>
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
