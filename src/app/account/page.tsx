"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import AppPageShell from "@/components/AppPageShell";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  ArrowRightOnRectangleIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ClockIcon,
  CreditCardIcon,
  DocumentArrowDownIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  PlusCircleIcon,
  SparklesIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

type Analysis = {
  id: string;
  date: string;
  animalType: string;
  estimatedWeight: number;
  estimatedCost: number;
};

const AccountPage = () => {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [analysesLoading, setAnalysesLoading] = useState(true);

  const fetchAnalyses = useCallback(async () => {
    try {
      const res = await fetch("/api/user/analyses");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.analyses)) {
          setAnalyses(data.analyses);
        }
      }
    } catch {
      // endpoint may not exist yet
    } finally {
      setAnalysesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchAnalyses();
    }
  }, [user, fetchAnalyses]);

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  if (loading) {
    return (
      <AppPageShell>
        <SiteHeader />
        <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <div className="space-y-6">
            <div className="skeleton h-10 w-64" />
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="skeleton h-32" />
              <div className="skeleton h-32" />
              <div className="skeleton h-32" />
            </div>
            <div className="skeleton h-48" />
            <div className="skeleton h-64" />
          </div>
        </main>
        <div className="relative z-10">
          <SiteFooter />
        </div>
      </AppPageShell>
    );
  }

  if (!user) {
    return null;
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <AppPageShell>
      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {/* Page header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
              Hesabım
            </h1>
            <p className="mt-1 text-stone-600 dark:text-stone-400">
              Hoş geldiniz, {user.name}!
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/analyze" className="btn btn-primary btn-md">
              <SparklesIcon
                className="mr-2 h-5 w-5 shrink-0"
                strokeWidth={2}
                aria-hidden
              />
              Yeni Analiz
            </Link>
            <Link href="/pricing" className="btn btn-secondary btn-md">
              <CreditCardIcon
                className="mr-2 h-5 w-5 shrink-0"
                strokeWidth={2}
                aria-hidden
              />
              Paket Satın Al
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-secondary btn-md text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <ArrowRightOnRectangleIcon
                className="mr-2 h-5 w-5 shrink-0"
                strokeWidth={2}
                aria-hidden
              />
              Çıkış Yap
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {/* Remaining credits */}
          <div className="card overflow-hidden">
            <div className="flex items-center gap-4 p-5 sm:p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-900 text-white shadow-lg shadow-emerald-900/25">
                <SparklesIcon className="h-7 w-7" strokeWidth={2} aria-hidden />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Kalan Kredi
                </p>
                <p className="font-display text-3xl font-bold text-emerald-800 dark:text-emerald-400 sm:text-4xl">
                  {user.remainingCredits}
                </p>
              </div>
            </div>
            <div className="border-t border-stone-100 bg-emerald-50/50 px-5 py-2.5 dark:border-stone-800 dark:bg-emerald-950/30">
              <Link
                href="/pricing"
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Kredi satın al &rarr;
              </Link>
            </div>
          </div>

          {/* Total analyses */}
          <div className="card p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="icon-container-secondary">
                <ChartBarIcon
                  className="h-7 w-7"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Toplam Analiz
                </p>
                <p className="font-display text-3xl font-bold text-stone-900 dark:text-stone-50 sm:text-4xl">
                  {analyses.length}
                </p>
              </div>
            </div>
          </div>

          {/* Member since */}
          <div className="card p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="icon-container-accent">
                <CalendarDaysIcon
                  className="h-7 w-7"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Üyelik Tarihi
                </p>
                <p className="font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
                  {memberSince}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile summary */}
          <div className="card-hover overflow-hidden lg:col-span-1">
            <div className="border-b border-stone-100 bg-gradient-to-r from-stone-50/80 to-white px-5 py-4 dark:border-stone-800 dark:from-stone-900/80 dark:to-stone-950">
              <h2 className="flex items-center font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
                <UserCircleIcon
                  className="mr-2 h-5 w-5 shrink-0 text-emerald-700"
                  strokeWidth={2}
                  aria-hidden
                />
                Profil Bilgileri
              </h2>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-start gap-3">
                <UserCircleIcon
                  className="mt-0.5 h-5 w-5 shrink-0 text-stone-400"
                  strokeWidth={2}
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
                    Ad Soyad
                  </p>
                  <p className="font-semibold text-stone-900 dark:text-stone-50">
                    {user.name} {user.surname}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <EnvelopeIcon
                  className="mt-0.5 h-5 w-5 shrink-0 text-stone-400"
                  strokeWidth={2}
                  aria-hidden
                />
                <div>
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
                    E-posta
                  </p>
                  <p className="font-semibold text-stone-900 dark:text-stone-50">
                    {user.email}
                  </p>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-start gap-3">
                  <PhoneIcon
                    className="mt-0.5 h-5 w-5 shrink-0 text-stone-400"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <div>
                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
                      Telefon
                    </p>
                    <p className="font-semibold text-stone-900 dark:text-stone-50">
                      {user.phone}
                    </p>
                  </div>
                </div>
              )}

              {user.address && (
                <div className="flex items-start gap-3">
                  <MapPinIcon
                    className="mt-0.5 h-5 w-5 shrink-0 text-stone-400"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <div>
                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
                      Adres
                    </p>
                    <p className="font-semibold text-stone-900 dark:text-stone-50">
                      {user.address}
                    </p>
                  </div>
                </div>
              )}

              {user.usagePurpose && (
                <div className="flex items-start gap-3">
                  <PlusCircleIcon
                    className="mt-0.5 h-5 w-5 shrink-0 text-stone-400"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <div>
                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
                      Kullanım Amacı
                    </p>
                    <p className="font-semibold text-stone-900 dark:text-stone-50">
                      {user.usagePurpose}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Past analyses */}
          <div className="card-hover overflow-hidden lg:col-span-2">
            <div className="border-b border-stone-100 bg-gradient-to-r from-stone-50/80 to-white px-5 py-4 dark:border-stone-800 dark:from-stone-900/80 dark:to-stone-950">
              <h2 className="flex items-center font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
                <ClockIcon
                  className="mr-2 h-5 w-5 shrink-0 text-emerald-700"
                  strokeWidth={2}
                  aria-hidden
                />
                Geçmiş Analizler
              </h2>
            </div>

            <div className="p-5">
              {analysesLoading ? (
                <div className="space-y-3">
                  <div className="skeleton h-12" />
                  <div className="skeleton h-12" />
                  <div className="skeleton h-12" />
                </div>
              ) : analyses.length === 0 ? (
                <div className="py-10 text-center">
                  <div className="icon-container-primary mx-auto mb-4">
                    <ChartBarIcon
                      className="h-7 w-7"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
                    Henüz analiz yapılmamış
                  </h3>
                  <p className="mb-6 text-sm text-stone-600 dark:text-stone-400">
                    İlk analizinizi yaparak hayvan değerlendirmesi alın.
                  </p>
                  <Link href="/analyze" className="btn btn-primary btn-md">
                    <SparklesIcon
                      className="mr-2 h-5 w-5 shrink-0"
                      strokeWidth={2}
                      aria-hidden
                    />
                    İlk Analizimi Yap
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 dark:border-stone-700">
                        <th className="pb-3 pr-4 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                          Tarih
                        </th>
                        <th className="pb-3 pr-4 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                          Hayvan Türü
                        </th>
                        <th className="pb-3 pr-4 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                          Tahmini Ağırlık
                        </th>
                        <th className="pb-3 pr-4 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                          Tahmini Değer
                        </th>
                        <th className="pb-3 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                          İşlem
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                      {analyses.map((a) => (
                        <tr
                          key={a.id}
                          className="transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/50"
                        >
                          <td className="py-3 pr-4 font-medium text-stone-900 dark:text-stone-100">
                            {formatDate(a.date)}
                          </td>
                          <td className="py-3 pr-4">
                            <span className="badge badge-success">
                              {a.animalType}
                            </span>
                          </td>
                          <td className="py-3 pr-4 text-stone-700 dark:text-stone-300">
                            {a.estimatedWeight} kg
                          </td>
                          <td className="py-3 pr-4 font-semibold text-emerald-800 dark:text-emerald-400">
                            ₺{a.estimatedCost.toLocaleString("tr-TR")}
                          </td>
                          <td className="py-3">
                            <button className="btn btn-secondary btn-sm">
                              <DocumentArrowDownIcon
                                className="mr-1.5 h-4 w-4 shrink-0"
                                strokeWidth={2}
                                aria-hidden
                              />
                              PDF İndir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </AppPageShell>
  );
};

export default AccountPage;
