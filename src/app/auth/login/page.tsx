"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/components/AuthProvider";
import AppPageShell from "@/components/AppPageShell";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const LoginPage = () => {
  const router = useRouter();
  const { user, loading, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/account");
    }
  }, [user, loading, router]);

  if (loading) {
    return null;
  }

  if (user) {
    return null;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        router.push("/account");
        return;
      }

      setError(result.error ?? "Giriş başarısız oldu");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppPageShell>
      <SiteHeader />

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-160px)] max-w-md items-center px-4 py-12 sm:py-16">
        <div className="card w-full p-6 animate-fade-in sm:p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-950 text-white shadow-md shadow-emerald-900/25">
              <LockClosedIcon className="h-7 w-7" strokeWidth={2} aria-hidden />
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
              Giriş Yapın
            </h1>
            <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">
              Hesabınıza erişmek için giriş yapın
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                E-posta
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg w-full"
            >
              {isSubmitting ? "Giriş yapılıyor…" : "Giriş Yap"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
            Hesabınız yok mu?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-emerald-700 transition hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Kayıt olun
            </Link>
          </p>
        </div>
      </main>

      <div className="relative z-10">
        <SiteFooter />
      </div>
    </AppPageShell>
  );
};

export default LoginPage;
