"use client";

import Link from "next/link";
import AppPageShell from "@/components/AppPageShell";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const features = [
  {
    title: "Çoklu fotoğraf",
    desc: "Aynı hayvandan farklı açılar yükleyerek modelin bağlam kurmasına yardımcı olun.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Tür ve kondisyon",
    desc: "Büyükbaş ve küçükbaş ayrımı, görünür özelliklere göre ön değerlendirme.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9A5 5 0 1117.5 7.5 5 5 0 016.343 16.243z"
        />
      </svg>
    ),
  },
  {
    title: "Et ve fiyat çerçevesi",
    desc: "Karkas verimi ve piyasa referanslarıyla yönlendirici tahmin (resmi ekspertiz değildir).",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
        />
      </svg>
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
    a: "Gizlilik politikamıza göre analiz sürecinde veriler güvenli işlenir; detaylar için Gizlilik ve KVKK sayfalarına bakın.",
  },
  {
    q: "Hangi hayvanlar destekleniyor?",
    a: "Dana, boğa, inek, koç, koyun, keçi, manda ve buzağı gibi kurbanlık türleri hedeflenir; diğer türler için uyarı verilir.",
  },
  {
    q: "Ücret var mı?",
    a: "Uygulama ücretsiz kullanıma açıktır; sonuçlar bilgilendirme amaçlıdır.",
  },
];

const Home = () => {
  return (
    <AppPageShell>
      <SiteHeader />

      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:pb-20 sm:pt-14">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <p className="hero-pill mb-4">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600" aria-hidden />
              {"Yapay zeka destekli ön analiz"}
            </p>
            <h1 className="font-display text-balance text-3xl font-semibold tracking-tight text-stone-900 sm:text-5xl sm:leading-[1.08]">
              Kurbanlık seçiminde{" "}
              <span className="gradient-text">daha net bir başlangıç</span>
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-stone-600 sm:text-lg">
              Fotoğraftan tür, kondisyon ve yönlendirici fiyat çerçevesi alın.
              Araç, satın alma veya dini vecibelerin yerine geçmez; kararınızı
              desteklemek için tasarlandı.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/analyze"
                className="btn btn-primary btn-lg justify-center"
              >
                Analize başla
              </Link>
              <a
                href="#nasil"
                className="btn btn-secondary btn-lg justify-center"
              >
                Nasıl çalışır?
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
                className="flex items-center justify-center gap-2 rounded-xl border border-stone-200/80 bg-white/85 px-4 py-3 text-center text-sm font-medium text-stone-700 shadow-soft backdrop-blur-sm transition hover:border-emerald-200/60 hover:shadow-medium"
              >
                <span
                  className="text-emerald-700"
                  aria-hidden
                >
                  ✓
                </span>
                {label}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="ozellikler"
          className="surface-band scroll-mt-24 py-14 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto">Özellikler</p>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                Öne çıkanlar
              </h2>
              <p className="mt-3 text-stone-600">
                Karmaşık formlar yerine net akış: yükle, isteğe bağlı bilgi
                ver, raporu oku.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="card-hover group flex flex-col p-6 sm:p-7"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100/90 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-800 shadow-sm ring-1 ring-white/60 transition group-hover:border-emerald-200 group-hover:shadow-md">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
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
          <h2 className="text-center font-display text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            Nasıl çalışır?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-stone-600">
            Dört kısa adım. İsterseniz yalnızca fotoğraf ile de devam
            edebilirsiniz.
          </p>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li
                key={s.n}
                className="card relative overflow-hidden p-6 transition hover:border-emerald-100"
              >
                <span className="pointer-events-none absolute right-3 top-3 font-display text-5xl font-semibold text-stone-100/90">
                  {s.n}
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                  Adım {s.n}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-stone-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
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
              <h2 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
                Desteklenen türler
              </h2>
            </div>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-stone-600">
              Model bu türler için eğitim ve prompt bağlamıyla uyumludur.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { emoji: "🐄", title: "Büyükbaş", tags: "Dana, boğa, inek, buzağı, manda" },
                { emoji: "🐑", title: "Koyun / koç", tags: "Küçükbaş karkas mantığı" },
                { emoji: "🐐", title: "Keçi", tags: "Küçükbaş karkas mantığı" },
                { emoji: "🐪", title: "Deve", tags: "Yakında planlanıyor" },
              ].map((row) => (
                <div key={row.title} className="card-hover p-5 text-center">
                  <div className="text-3xl" aria-hidden>
                    {row.emoji}
                  </div>
                  <h3 className="mt-3 font-semibold text-stone-900">
                    {row.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500">{row.tags}</p>
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
            <h2 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl">
              Sıkça sorulanlar
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.q} className="card-hover p-6">
                <h3 className="font-semibold text-stone-900">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
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
                Birkaç net fotoğraf yeterli. Sonuçları indirip danışmanız veya
                satıcıyla paylaşabilirsiniz.
              </p>
              <Link
                href="/analyze"
                className="animal-cta-btn btn-md mt-8 inline-flex"
              >
                Analize geç
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
