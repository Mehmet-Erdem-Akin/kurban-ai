import Image from "next/image";
import Link from "next/link";

const footerLinkClass =
  "text-stone-600 transition hover:text-emerald-800 focus:outline-none focus-visible:rounded focus-visible:text-emerald-900 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:text-stone-400 dark:hover:text-emerald-400 dark:focus-visible:text-emerald-300 dark:focus-visible:ring-emerald-500 dark:focus-visible:ring-offset-stone-950";

const SiteFooter = () => {
  const year = new Date().getFullYear();

  const siteLinks = [
    { href: "/", label: "Ana sayfa" },
    { href: "/analyze", label: "Analiz" },
    { href: "/contact", label: "İletişim" },
  ] as const;

  const helpLinks = [
    { href: "/#sss", label: "Sıkça sorulanlar" },
    { href: "/#nasil", label: "Nasıl çalışır?" },
    { href: "/#ozellikler", label: "Özellikler" },
  ] as const;

  const legalLinks = [
    { href: "/privacy", label: "Gizlilik" },
    { href: "/terms", label: "Kullanım şartları" },
    { href: "/kvkk", label: "KVKK" },
  ] as const;

  return (
    <footer className="relative z-10 border-t border-stone-200/80 bg-gradient-to-b from-stone-50/95 to-white dark:border-stone-800 dark:from-stone-950 dark:to-stone-900">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex rounded-lg outline-none ring-emerald-800 ring-offset-2 focus-visible:ring-2"
              aria-label="Kurbanlık Kilo Hesaplama ana sayfa"
            >
              <Image
                src="/ka-logo.png"
                alt="Kurbanlık Kilo Hesaplama"
                width={260}
                height={60}
                className="h-[40px] w-auto rounded-xl object-contain sm:h-[60px]"
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              Fotoğrafla kurbanlık kilo tahmini, karkas hesabı ve hisse fiyatı
              için hızlı yardımcı araç. Kesin tartı veya resmi değerleme yerine
              geçmez.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <a
                href="mailto:mehmet.erdem.akin@outlook.com?subject=Kurbanl%C4%B1k%20Analiz"
                className={footerLinkClass}
              >
                mehmet.erdem.akin@outlook.com
              </a>
              <span className="text-stone-300 dark:text-stone-600" aria-hidden>
                |
              </span>
              <a
                href="https://github.com/Mehmet-Erdem-Akin/kurban-ai"
                target="_blank"
                rel="noopener noreferrer"
                className={footerLinkClass}
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="grid gap-8 text-sm sm:grid-cols-3 lg:gap-12">
            <nav aria-label="Site sayfaları">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Site
              </p>
              <ul className="flex flex-col gap-2">
                {siteLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={footerLinkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Yardım bağlantıları">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Yardım
              </p>
              <ul className="flex flex-col gap-2">
                {helpLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={footerLinkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Yasal metinler">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                Yasal
              </p>
              <ul className="flex flex-col gap-2">
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={footerLinkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <p className="mt-10 border-t border-stone-100 pt-8 text-center text-xs text-stone-400 dark:border-stone-800 dark:text-stone-500 sm:text-left">
          © {year} Kurbanlık Analiz
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
