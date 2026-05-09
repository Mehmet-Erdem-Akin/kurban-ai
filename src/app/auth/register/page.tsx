"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppPageShell from "@/components/AppPageShell";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAuth } from "@/components/AuthProvider";
import {
  UserPlusIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

interface FormErrors {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const { user, loading: authLoading, login } = useAuth();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [usagePurpose, setUsagePurpose] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/account");
    }
  }, [user, authLoading, router]);

  const handleValidate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "İsim alanı zorunludur.";
    }

    if (!surname.trim()) {
      newErrors.surname = "Soyisim alanı zorunludur.";
    }

    if (!email.trim()) {
      newErrors.email = "E-posta adresi zorunludur.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin.";
    }

    if (!password) {
      newErrors.password = "Şifre alanı zorunludur.";
    } else if (password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Şifre tekrarı zorunludur.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!handleValidate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${name.trim()} ${surname.trim()}`,
          email: email.trim(),
          password,
          phone: phone.trim() || undefined,
          address: address.trim() || undefined,
          usagePurpose: usagePurpose || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setApiError(data.error ?? "Kayıt başarısız oldu.");
        return;
      }

      const loginResult = await login(email.trim(), password);

      if (loginResult.success) {
        router.push("/account");
      } else {
        router.push("/auth/login");
      }
    } catch {
      setApiError("Sunucuya bağlanılamadı. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <AppPageShell>
        <SiteHeader />
        <main className="relative z-10 mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4 py-12">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-700" />
            <p className="text-stone-500 dark:text-stone-400">Yükleniyor...</p>
          </div>
        </main>
        <div className="relative z-10">
          <SiteFooter />
        </div>
      </AppPageShell>
    );
  }

  if (user) return null;

  return (
    <AppPageShell>
      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-xl px-4 py-10 sm:py-14">
        {/* Form Card */}
        <div className="card p-6 sm:p-10 animate-fade-in">
          {/* Title */}
          <div className="mb-8 text-center">
            <div className="icon-container-primary mx-auto mb-4">
              <UserPlusIcon className="h-7 w-7" strokeWidth={2} aria-hidden />
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
              Hesap Oluşturun
            </h1>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              Analiz geçmişinizi kaydedin ve kişiselleştirilmiş deneyim yaşayın.
            </p>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* İsim */}
            <div>
              <label
                htmlFor="register-name"
                className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                👤 İsim <span className="text-red-500">*</span>
              </label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınız"
                className={`input ${errors.name ? "input-error" : ""}`}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Soyisim */}
            <div>
              <label
                htmlFor="register-surname"
                className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                👤 Soyisim <span className="text-red-500">*</span>
              </label>
              <input
                id="register-surname"
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Soyadınız"
                className={`input ${errors.surname ? "input-error" : ""}`}
                disabled={isSubmitting}
              />
              {errors.surname && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.surname}
                </p>
              )}
            </div>

            {/* E-posta */}
            <div>
              <label
                htmlFor="register-email"
                className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                📧 E-posta Adresi <span className="text-red-500">*</span>
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@email.com"
                className={`input ${errors.email ? "input-error" : ""}`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Şifre */}
            <div>
              <label
                htmlFor="register-password"
                className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                🔒 Şifre <span className="text-red-500">*</span>
              </label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="En az 6 karakter"
                className={`input ${errors.password ? "input-error" : ""}`}
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Şifre Tekrar */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                🔒 Şifre Tekrar <span className="text-red-500">*</span>
              </label>
              <input
                id="register-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Şifrenizi tekrar girin"
                className={`input ${errors.confirmPassword ? "input-error" : ""}`}
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Telefon (opsiyonel) */}
            <div>
              <label
                htmlFor="register-phone"
                className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                📱 Telefon Numarası{" "}
                <span className="text-stone-400 dark:text-stone-500">(isteğe bağlı)</span>
              </label>
              <input
                id="register-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0555 123 45 67"
                className="input"
                disabled={isSubmitting}
              />
            </div>

            {/* Adres (opsiyonel) */}
            <div>
              <label
                htmlFor="register-address"
                className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                📍 Adres Bilgisi (İl/İlçe){" "}
                <span className="text-stone-400 dark:text-stone-500">(isteğe bağlı)</span>
              </label>
              <input
                id="register-address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="İstanbul / Kadıköy"
                className="input"
                disabled={isSubmitting}
              />
            </div>

            {/* Kullanım Amacı (opsiyonel) */}
            <div>
              <label
                htmlFor="register-purpose"
                className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                🎯 Kullanım Amacı{" "}
                <span className="text-stone-400 dark:text-stone-500">(isteğe bağlı)</span>
              </label>
              <select
                id="register-purpose"
                value={usagePurpose}
                onChange={(e) => setUsagePurpose(e.target.value)}
                className="input"
                disabled={isSubmitting}
              >
                <option value="">Seçiniz</option>
                <option value="Bireysel Kurbanlık Arayışı">
                  Bireysel Kurbanlık Arayışı
                </option>
                <option value="Besici">Besici</option>
                <option value="Kasap">Kasap</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg w-full"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Kayıt yapılıyor...
                </>
              ) : (
                "Hesap Oluştur"
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
            Zaten hesabınız var mı?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-emerald-700 transition hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Giriş Yapın
            </Link>
          </p>
        </div>

        {/* Privacy / Trust Message */}
        <div className="card mt-6 p-6 sm:p-8 animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="icon-container-primary shrink-0">
              <ShieldCheckIcon className="h-7 w-7" strokeWidth={2} aria-hidden />
            </div>
            <div>
              <h3 className="mb-2 font-display text-base font-semibold text-stone-900 dark:text-stone-50">
                Verileriniz Güvende
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Verileriniz güvende! Burada paylaştığınız iletişim bilgileri ve
                yüklediğiniz görseller, yalnızca size özel bir analiz geçmişi
                oluşturmak ve deneyiminizi iyileştirmek amacıyla kullanılır.
                Bilgileriniz hiçbir üçüncü şahısla paylaşılmaz, şifreli
                sunucularımızda korunur ve dilediğiniz zaman hesabınızı tamamen
                silebilirsiniz.
              </p>
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

export default RegisterPage;
