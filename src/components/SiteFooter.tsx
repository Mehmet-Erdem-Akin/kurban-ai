import Link from "next/link";

const footerLinkClass =
  "text-stone-600 transition hover:text-emerald-800 focus:outline-none focus-visible:rounded focus-visible:text-emerald-900 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2";

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
    <footer className="relative z-10 border-t border-stone-200/80 bg-gradient-to-b from-stone-50/95 to-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-lg outline-none ring-emerald-800 ring-offset-2 focus-visible:ring-2"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-950 text-xs font-bold text-white shadow-md shadow-emerald-900/20 ring-2 ring-white/40"
                aria-hidden
              >
                KA
              </span>
              <span className="font-display text-lg font-semibold text-stone-900">
                Kurbanlık Analiz
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              Fotoğraftan kurbanlık hayvanı için hızlı, yapay zeka destekli ön
              analiz. Kesin teşhis veya resmi değerleme yerine geçmez.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <a
                href="mailto:mehmet.erdem.akin@outlook.com?subject=Kurbanl%C4%B1k%20Analiz"
                className={footerLinkClass}
              >
                mehmet.erdem.akin@outlook.com
              </a>
              <span className="text-stone-300" aria-hidden>
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
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">
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
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">
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
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-400">
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
        <p className="mt-10 border-t border-stone-100 pt-8 text-center text-xs text-stone-400 sm:text-left">
          © {year} Kurbanlık Analiz
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
