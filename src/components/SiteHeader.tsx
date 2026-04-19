"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinkClass =
  "rounded-full px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100/90 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2";

const SiteHeader = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/65 shadow-[0_1px_0_0_rgba(28,25,23,0.04)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/55">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:py-3.5">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 rounded-xl outline-none ring-emerald-800 ring-offset-2 focus-visible:ring-2"
          aria-label="Kurbanlık Analiz ana sayfa"
        >
          <span
            className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-950 text-sm font-bold text-white shadow-md shadow-emerald-900/25 ring-2 ring-white/30 transition group-hover:shadow-lg group-hover:ring-emerald-200/40"
            aria-hidden
          >
            <span className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition group-hover:opacity-100" />
            {"KA"}
          </span>
          <span className="truncate font-display text-base font-semibold tracking-tight text-stone-900 sm:text-lg">
            Kurbanlık Analiz
          </span>
        </Link>

        <nav
          className="flex shrink-0 items-center gap-0.5 sm:gap-1"
          aria-label="Ana menü"
        >
          {!isHome && (
            <Link href="/" className={`${navLinkClass} hidden sm:inline`}>
              Ana Sayfa
            </Link>
          )}
          <Link
            href="/contact"
            className={`${navLinkClass} hidden md:inline ${
              pathname === "/contact"
                ? "bg-emerald-50 text-emerald-950 ring-1 ring-emerald-200/80"
                : ""
            }`}
            aria-current={pathname === "/contact" ? "page" : undefined}
          >
            İletişim
          </Link>
          <Link
            href="/analyze"
            className="btn btn-primary btn-sm sm:btn-md"
            aria-current={pathname === "/analyze" ? "page" : undefined}
          >
            Analiz
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
