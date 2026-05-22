"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/components/AuthProvider";

const navLinkClass =
  "rounded-full px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100/90 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:text-stone-300 dark:hover:bg-stone-800/90 dark:hover:text-white dark:focus-visible:ring-emerald-500 dark:focus-visible:ring-offset-stone-950";

const activeNavLinkClass =
  "bg-emerald-50 text-emerald-950 ring-1 ring-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-100 dark:ring-emerald-700/60";

const mobileNavLinkClass =
  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 dark:text-stone-200 dark:hover:bg-stone-800 dark:focus-visible:ring-emerald-500";

const SiteHeader = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { user, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const mobileNavItems = [
    { href: "/", label: "Ana Sayfa", active: pathname === "/" },
    {
      href: isHome ? "#hesaplama" : "/#hesaplama",
      label: "Kilo Hesapla",
      active: false,
    },
    { href: "/pricing", label: "Paketler", active: pathname === "/pricing" },
    { href: "/contact", label: "İletişim", active: pathname === "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/65 shadow-[0_1px_0_0_rgba(28,25,23,0.04)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/55 dark:border-stone-800/80 dark:bg-stone-950/70 dark:shadow-[0_1px_0_0_rgba(0,0,0,0.35)] dark:supports-[backdrop-filter]:bg-stone-950/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:py-3.5">
        <Link
          href="/"
          className="group flex min-w-0 items-center rounded-xl outline-none ring-emerald-800 ring-offset-2 focus-visible:ring-2"
          aria-label="Kurbanlık Analiz ana sayfa"
        >
          <Image
            src="/ka-logo.png"
            alt="Kurbanlık Kilo Hesaplama"
            width={220}
            height={60}
            priority
            className="h-[40px] w-auto rounded-lg object-contain transition group-hover:opacity-90 sm:h-[60px]"
          />
        </Link>

        <nav
          className="flex shrink-0 items-center gap-1 sm:gap-1.5"
          aria-label="Ana menü"
        >
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          {!isHome && (
            <Link href="/" className={`${navLinkClass} hidden md:inline`}>
              Ana Sayfa
            </Link>
          )}
          <Link
            href={isHome ? "#hesaplama" : "/#hesaplama"}
            className={`${navLinkClass} hidden md:inline`}
          >
            Kilo Hesapla
          </Link>
          <Link
            href="/pricing"
            className={`${navLinkClass} hidden md:inline ${
              pathname === "/pricing" ? activeNavLinkClass : ""
            }`}
            aria-current={pathname === "/pricing" ? "page" : undefined}
          >
            Paketler
          </Link>
          <Link
            href="/contact"
            className={`${navLinkClass} hidden md:inline ${
              pathname === "/contact" ? activeNavLinkClass : ""
            }`}
            aria-current={pathname === "/contact" ? "page" : undefined}
          >
            İletişim
          </Link>
          {!loading && !user && (
            <Link
              href="/auth/login"
              className={`${navLinkClass} hidden md:inline`}
              aria-current={pathname === "/auth/login" ? "page" : undefined}
            >
              Giriş Yap
            </Link>
          )}
          {!loading && user && (
            <Link
              href="/account"
              className={`${navLinkClass} hidden items-center gap-1.5 md:inline-flex`}
              aria-current={pathname === "/account" ? "page" : undefined}
            >
              <UserCircleIcon className="h-5 w-5" />
              <span>Hesabım</span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs font-medium">
                {user.remainingCredits}
              </span>
            </Link>
          )}
          <Link
            href="/analyze"
            className="btn btn-primary btn-sm hidden sm:inline-flex sm:btn-md"
            aria-current={pathname === "/analyze" ? "page" : undefined}
          >
            Fotoğrafla Hesapla
          </Link>
          <button
            type="button"
            onClick={handleToggleMobileMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white/90 text-stone-800 shadow-sm transition hover:border-emerald-200 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:border-stone-700 dark:bg-stone-900/90 dark:text-stone-100 dark:hover:border-emerald-700 dark:hover:text-emerald-300 dark:focus-visible:ring-emerald-500 dark:focus-visible:ring-offset-stone-950 md:hidden"
            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} aria-hidden />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
            )}
          </button>
        </nav>
      </div>
      {isMounted &&
        isMobileMenuOpen &&
        createPortal(
          <div
            id="mobile-navigation"
            className="fixed inset-0 z-[100] flex flex-col bg-white dark:bg-stone-950 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobil menü"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-stone-200/80 px-4 py-3 dark:border-stone-800">
              <Link
                href="/"
                onClick={handleCloseMobileMenu}
                className="group flex min-w-0 items-center rounded-xl outline-none ring-emerald-800 ring-offset-2 focus-visible:ring-2 dark:ring-offset-stone-950"
                aria-label="Kurbanlık Analiz ana sayfa"
              >
                <Image
                  src="/ka-logo.png"
                  alt="Kurbanlık Kilo Hesaplama"
                  width={220}
                  height={60}
                  className="h-[40px] w-auto rounded-lg object-contain transition group-hover:opacity-90"
                />
              </Link>
              <button
                type="button"
                onClick={handleCloseMobileMenu}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white/90 text-stone-800 shadow-sm transition hover:border-emerald-200 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:border-stone-700 dark:bg-stone-900/90 dark:text-stone-100 dark:hover:border-emerald-700 dark:hover:text-emerald-300 dark:focus-visible:ring-emerald-500 dark:focus-visible:ring-offset-stone-950"
                aria-label="Menüyü kapat"
              >
                <XMarkIcon className="h-6 w-6" strokeWidth={2} aria-hidden />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col overflow-y-auto px-4 py-6"
              aria-label="Mobil ana menü"
            >
              <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6">
                <div className="flex items-center justify-between rounded-2xl border border-stone-200/80 bg-stone-50/80 px-4 py-3 dark:border-stone-700 dark:bg-stone-900/80">
                  <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">
                    Renk teması
                  </span>
                  <ThemeToggle />
                </div>

                <div className="grid flex-1 content-start gap-2">
                  {mobileNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleCloseMobileMenu}
                      className={`${mobileNavLinkClass} py-4 text-base ${
                        item.active ? activeNavLinkClass : ""
                      }`}
                      aria-current={item.active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {!loading && !user && (
                    <Link
                      href="/auth/login"
                      onClick={handleCloseMobileMenu}
                      className={`${mobileNavLinkClass} py-4 text-base ${
                        pathname === "/auth/login" ? activeNavLinkClass : ""
                      }`}
                      aria-current={
                        pathname === "/auth/login" ? "page" : undefined
                      }
                    >
                      Giriş Yap
                    </Link>
                  )}
                  {!loading && user && (
                    <Link
                      href="/account"
                      onClick={handleCloseMobileMenu}
                      className={`${mobileNavLinkClass} py-4 text-base ${
                        pathname === "/account" ? activeNavLinkClass : ""
                      }`}
                      aria-current={
                        pathname === "/account" ? "page" : undefined
                      }
                    >
                      <span className="inline-flex items-center gap-2">
                        <UserCircleIcon className="h-5 w-5" aria-hidden />
                        Hesabım
                      </span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                        {user.remainingCredits}
                      </span>
                    </Link>
                  )}
                </div>

                <Link
                  href="/analyze"
                  onClick={handleCloseMobileMenu}
                  className="btn btn-primary btn-md mt-auto w-full"
                  aria-current={pathname === "/analyze" ? "page" : undefined}
                >
                  Fotoğrafla Hesapla
                </Link>
              </div>
            </nav>
          </div>,
          document.body
        )}
    </header>
  );
};

export default SiteHeader;
