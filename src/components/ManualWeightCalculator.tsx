"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowPathIcon,
  CalculatorIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  LockClosedIcon,
  ScaleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import YieldTable from "@/components/YieldTable";
import { useAuth } from "@/components/AuthProvider";
import {
  calculateYieldRows,
  getDefaultYieldRate,
  type LargeCattleYieldProfile,
} from "@/utils/yieldCalculator";

const LIVE_WEIGHT_MIN = 250;
const LIVE_WEIGHT_MAX = 1200;
const MEAT_PRICE_MIN = 350;
const MEAT_PRICE_MAX = 950;

const formatCurrency = (value: number) =>
  `${Math.round(value).toLocaleString("tr-TR")} ₺`;

const parseNumber = (value: string) => {
  const parsedValue = Number(value.replace(",", "."));
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

type BodyCondition = "normal" | "besili";
type InputMode = "weight" | "measure";

type CalculatedValues = {
  profile: LargeCattleYieldProfile;
  totalSellPrice: number;
  sharePrice: number;
  yieldRows: ReturnType<typeof calculateYieldRows>;
  defaultYieldRate: number;
  estimatedKarkasWeight: number;
};

const buildCalculatedValues = (
  liveWeightValue: number,
  currentMeatKgPriceValue: number,
  yieldProfile: LargeCattleYieldProfile,
): CalculatedValues => {
  const defaultYieldRate = getDefaultYieldRate(yieldProfile);
  const estimatedKarkasWeight = Math.round(
    (liveWeightValue * defaultYieldRate) / 100,
  );
  const totalSellPrice = estimatedKarkasWeight * currentMeatKgPriceValue;
  const sharePrice = totalSellPrice / 7;
  const yieldRows = calculateYieldRows({
    liveWeight: liveWeightValue,
    totalValue: totalSellPrice,
    profile: yieldProfile,
  });

  return {
    profile: yieldProfile,
    totalSellPrice,
    sharePrice,
    yieldRows,
    defaultYieldRate,
    estimatedKarkasWeight,
  };
};

const ManualWeightCalculator = () => {
  const { user, loading: authLoading, setUser } = useAuth();
  const [inputMode, setInputMode] = useState<InputMode>("weight");
  const [liveWeight, setLiveWeight] = useState("700");
  const [currentMeatKgPrice, setCurrentMeatKgPrice] = useState("620");
  const [yieldProfile, setYieldProfile] =
    useState<LargeCattleYieldProfile>("male");
  const [chestCircumference, setChestCircumference] = useState("");
  const [bodyLength, setBodyLength] = useState("");
  const [bodyCondition, setBodyCondition] = useState<BodyCondition>("normal");
  const [showYieldTable, setShowYieldTable] = useState(false);
  const [creditError, setCreditError] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);

  const liveWeightValue = parseNumber(liveWeight);
  const meatPriceValue = parseNumber(currentMeatKgPrice);

  const previewValues = useMemo(
    () =>
      buildCalculatedValues(
        liveWeightValue,
        meatPriceValue,
        yieldProfile,
      ),
    [liveWeightValue, meatPriceValue, yieldProfile],
  );

  const measurementEstimate = useMemo(() => {
    const chest = parseNumber(chestCircumference);
    const length = parseNumber(bodyLength);

    if (chest <= 0 || length <= 0) return null;

    const base = (chest * chest * length) / 10840;
    const multiplier = bodyCondition === "besili" ? 1.08 : 1;
    return Math.round(base * multiplier);
  }, [bodyCondition, bodyLength, chestCircumference]);

  const selectedProfileLabel =
    yieldProfile === "male" ? "Erkek büyükbaş" : "Dişi büyükbaş";

  const handleInputModeChange = (mode: InputMode) => {
    setInputMode(mode);
    setShowYieldTable(false);
    setCreditError("");
  };

  const handleLiveWeightSlider = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLiveWeight(event.target.value);
    setShowYieldTable(false);
    setCreditError("");
  };

  const handleMeatPriceSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMeatKgPrice(event.target.value);
    setShowYieldTable(false);
    setCreditError("");
  };

  const handleLiveWeightInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLiveWeight(event.target.value);
    setShowYieldTable(false);
    setCreditError("");
  };

  const handleMeatPriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMeatKgPrice(event.target.value);
    setShowYieldTable(false);
    setCreditError("");
  };

  const handleYieldProfileChange = (profile: LargeCattleYieldProfile) => {
    setYieldProfile(profile);
    setShowYieldTable(false);
    setCreditError("");
  };

  const handleUseMeasurementEstimate = () => {
    if (!measurementEstimate) return;
    setLiveWeight(String(measurementEstimate));
    setInputMode("weight");
    setShowYieldTable(false);
    setCreditError("");
  };

  const handleUnlockYieldTable = async () => {
    if (!user) {
      setCreditError("Detaylı randıman tablosu için giriş yapın.");
      return;
    }

    if (user.remainingCredits <= 0) {
      setCreditError("Kredi hakkınız kalmadı. Paketler sayfasından devam edin.");
      return;
    }

    setIsUnlocking(true);
    setCreditError("");

    try {
      const response = await fetch("/api/user/credits/consume", {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setCreditError(data.error ?? "Kredi kullanılamadı.");
        return;
      }

      setUser(data.user);
      setShowYieldTable(true);
    } catch {
      setCreditError("Sunucuya bağlanılamadı. Lütfen tekrar deneyin.");
    } finally {
      setIsUnlocking(false);
    }
  };

  const yieldProgress = Math.min(
    100,
    (previewValues.defaultYieldRate / 70) * 100,
  );

  return (
    <section
      id="hesaplama"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(4,120,87,0.12),transparent_55%),linear-gradient(180deg,rgba(250,250,249,0)_0%,rgba(236,253,245,0.35)_50%,rgba(250,250,249,0)_100%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(52,211,153,0.1),transparent_55%),linear-gradient(180deg,rgba(12,10,9,0)_0%,rgba(6,78,59,0.15)_50%,rgba(12,10,9,0)_100%)]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="hero-pill mx-auto">
            <SparklesIcon className="h-4 w-4 text-emerald-700 dark:text-emerald-300" aria-hidden />
            Ücretsiz önizleme · Anlık sonuç
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            Kurbanlık{" "}
            <span className="gradient-text">kilo ve hisse hesaplama</span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
            Canlı kilo, karkas verimi ve 1/7 hisse fiyatını saniyeler içinde
            görün. Fotoğraf olmadan dana kurban maliyetinizi planlayın.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          {/* Sol: form */}
          <div className="glass-strong animate-fade-in overflow-hidden rounded-[1.75rem] shadow-large shadow-stone-900/5 dark:shadow-black/30">
            <div className="border-b border-stone-200/80 bg-gradient-to-r from-emerald-50/90 via-white to-teal-50/60 px-5 py-4 dark:border-stone-700 dark:from-emerald-950/40 dark:via-stone-900 dark:to-teal-950/30 sm:px-6">
              <div className="flex flex-wrap gap-2 rounded-2xl border border-stone-200/90 bg-white/90 p-1.5 dark:border-stone-600 dark:bg-stone-950/80">
                <button
                  type="button"
                  onClick={() => handleInputModeChange("weight")}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    inputMode === "weight"
                      ? "bg-emerald-800 text-white shadow-md"
                      : "text-stone-600 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-900"
                  }`}
                  aria-pressed={inputMode === "weight"}
                >
                  Canlı kilo
                </button>
                <button
                  type="button"
                  onClick={() => handleInputModeChange("measure")}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    inputMode === "measure"
                      ? "bg-emerald-800 text-white shadow-md"
                      : "text-stone-600 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-900"
                  }`}
                  aria-pressed={inputMode === "measure"}
                >
                  Ölçü ile tahmin
                </button>
              </div>
            </div>

            <div className="space-y-6 p-5 sm:p-7">
              {inputMode === "weight" ? (
                <>
                  <div>
                    <div className="flex items-end justify-between gap-3">
                      <label
                        htmlFor="live-weight-slider"
                        className="text-sm font-semibold text-stone-800 dark:text-stone-200"
                      >
                        Canlı kilo
                      </label>
                      <div className="flex items-baseline gap-1.5">
                        <input
                          type="number"
                          min={LIVE_WEIGHT_MIN}
                          max={LIVE_WEIGHT_MAX}
                          value={liveWeight}
                          onChange={handleLiveWeightInput}
                          className="w-20 rounded-lg border border-stone-200 bg-white px-2 py-1 text-right text-lg font-bold text-stone-900 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-50"
                          aria-label="Canlı kilo değeri"
                        />
                        <span className="text-sm font-medium text-stone-500">kg</span>
                      </div>
                    </div>
                    <input
                      id="live-weight-slider"
                      type="range"
                      min={LIVE_WEIGHT_MIN}
                      max={LIVE_WEIGHT_MAX}
                      step={5}
                      value={Math.min(
                        LIVE_WEIGHT_MAX,
                        Math.max(LIVE_WEIGHT_MIN, liveWeightValue || LIVE_WEIGHT_MIN),
                      )}
                      onChange={handleLiveWeightSlider}
                      className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-stone-200 accent-emerald-700 dark:bg-stone-700"
                      aria-valuemin={LIVE_WEIGHT_MIN}
                      aria-valuemax={LIVE_WEIGHT_MAX}
                      aria-valuenow={liveWeightValue}
                    />
                    <div className="mt-1 flex justify-between text-xs text-stone-400">
                      <span>{LIVE_WEIGHT_MIN} kg</span>
                      <span>{LIVE_WEIGHT_MAX} kg</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-end justify-between gap-3">
                      <label
                        htmlFor="meat-price-slider"
                        className="text-sm font-semibold text-stone-800 dark:text-stone-200"
                      >
                        Kg et fiyatı
                      </label>
                      <div className="flex items-baseline gap-1.5">
                        <input
                          type="number"
                          min={MEAT_PRICE_MIN}
                          max={MEAT_PRICE_MAX}
                          value={currentMeatKgPrice}
                          onChange={handleMeatPriceInput}
                          className="w-24 rounded-lg border border-stone-200 bg-white px-2 py-1 text-right text-lg font-bold text-stone-900 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-50"
                          aria-label="Kilogram et fiyatı"
                        />
                        <span className="text-sm font-medium text-stone-500">₺/kg</span>
                      </div>
                    </div>
                    <input
                      id="meat-price-slider"
                      type="range"
                      min={MEAT_PRICE_MIN}
                      max={MEAT_PRICE_MAX}
                      step={10}
                      value={Math.min(
                        MEAT_PRICE_MAX,
                        Math.max(MEAT_PRICE_MIN, meatPriceValue || MEAT_PRICE_MIN),
                      )}
                      onChange={handleMeatPriceSlider}
                      className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-stone-200 accent-emerald-700 dark:bg-stone-700"
                    />
                  </div>
                </>
              ) : (
                <fieldset className="rounded-2xl border border-emerald-100/90 bg-emerald-50/30 p-4 dark:border-emerald-800/50 dark:bg-emerald-950/20">
                  <legend className="px-1 text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                    Göğüs çevresi × vücut uzunluğu
                  </legend>
                  <p className="mt-1 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                    Formül: göğüs² × uzunluk / 10840. Besili kondisyonda +%8.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium text-stone-600 dark:text-stone-400">
                        Göğüs (cm)
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={chestCircumference}
                        onChange={(e) => {
                          setChestCircumference(e.target.value);
                          setShowYieldTable(false);
                        }}
                        className="input"
                        placeholder="190"
                        aria-label="Göğüs çevresi"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium text-stone-600 dark:text-stone-400">
                        Uzunluk (cm)
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={bodyLength}
                        onChange={(e) => {
                          setBodyLength(e.target.value);
                          setShowYieldTable(false);
                        }}
                        className="input"
                        placeholder="165"
                        aria-label="Vücut uzunluğu"
                      />
                    </label>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl border border-stone-200/80 bg-white/80 p-1 dark:border-stone-700 dark:bg-stone-950/70">
                    {(["normal", "besili"] as const).map((condition) => (
                      <button
                        key={condition}
                        type="button"
                        onClick={() => {
                          setBodyCondition(condition);
                          setShowYieldTable(false);
                        }}
                        className={`rounded-lg py-2 text-xs font-semibold transition ${
                          bodyCondition === condition
                            ? "bg-emerald-800 text-white"
                            : "text-stone-600 dark:text-stone-300"
                        }`}
                        aria-pressed={bodyCondition === condition}
                      >
                        {condition === "normal" ? "Normal" : "Besili"}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-950 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                        Tahmini canlı kilo
                      </p>
                      <p className="mt-1 font-display text-3xl font-bold text-stone-900 dark:text-stone-50">
                        {measurementEstimate
                          ? `${measurementEstimate.toLocaleString("tr-TR")} kg`
                          : "—"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleUseMeasurementEstimate}
                      disabled={!measurementEstimate}
                      className="btn btn-primary btn-md shrink-0"
                    >
                      Kiloyu uygula
                    </button>
                  </div>
                </fieldset>
              )}

              <div>
                <p className="mb-2 text-sm font-semibold text-stone-800 dark:text-stone-200">
                  Randıman profili
                </p>
                <div className="grid grid-cols-2 gap-2 rounded-2xl border border-stone-200/90 bg-stone-50/80 p-1.5 dark:border-stone-700 dark:bg-stone-950/70">
                  {(
                    [
                      { id: "male" as const, label: "Erkek", sub: "~%60" },
                      { id: "female" as const, label: "Dişi", sub: "~%53" },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleYieldProfileChange(item.id)}
                      className={`rounded-xl px-3 py-3 text-left transition ${
                        yieldProfile === item.id
                          ? "bg-emerald-800 text-white shadow-md"
                          : "text-stone-700 hover:bg-white dark:text-stone-200 dark:hover:bg-stone-900"
                      }`}
                      aria-pressed={yieldProfile === item.id}
                    >
                      <span className="block text-sm font-bold">{item.label}</span>
                      <span
                        className={`text-xs ${
                          yieldProfile === item.id
                            ? "text-emerald-100"
                            : "text-stone-500"
                        }`}
                      >
                        {item.sub} randıman
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Link
                href="/analyze"
                className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-emerald-300/80 bg-emerald-50/50 px-4 py-3 text-sm font-semibold text-emerald-900 transition hover:border-emerald-400 hover:bg-emerald-50 dark:border-emerald-700/60 dark:bg-emerald-950/30 dark:text-emerald-200 dark:hover:bg-emerald-950/50"
              >
                <CalculatorIcon className="h-5 w-5" aria-hidden />
                Fotoğrafla yapay zeka analizi
              </Link>
            </div>
          </div>

          {/* Sağ: canlı sonuç paneli */}
          <div className="animate-slide-up space-y-4 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-large dark:border-stone-700 dark:bg-stone-900">
              <div className="border-b border-stone-100 bg-stone-50/80 px-5 py-4 dark:border-stone-800 dark:bg-stone-950/80 sm:px-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-400">
                    <ScaleIcon className="h-5 w-5 text-emerald-700 dark:text-emerald-400" aria-hidden />
                    Anlık önizleme
                  </p>
                  <span className="badge-success">Canlı güncellenir</span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                  Tahmini karkas satış değeri
                </p>
                <p className="mt-2 font-display text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
                  {formatCurrency(previewValues.totalSellPrice)}
                </p>
                <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                  {previewValues.estimatedKarkasWeight.toLocaleString("tr-TR")} kg
                  karkas · %{previewValues.defaultYieldRate} randıman ·{" "}
                  {selectedProfileLabel}
                </p>

                <div className="mt-5">
                  <div className="flex justify-between text-xs font-medium text-stone-500">
                    <span>Randıman</span>
                    <span>%{previewValues.defaultYieldRate}</span>
                  </div>
                  <div className="progress mt-2">
                    <div
                      className="progress-primary"
                      style={{ width: `${yieldProgress}%` }}
                      role="progressbar"
                      aria-valuenow={previewValues.defaultYieldRate}
                      aria-valuemin={0}
                      aria-valuemax={70}
                    />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Canlı kilo",
                      value: `${liveWeightValue.toLocaleString("tr-TR")} kg`,
                      icon: ScaleIcon,
                    },
                    {
                      label: "Kg et fiyatı",
                      value: formatCurrency(meatPriceValue),
                      icon: CurrencyDollarIcon,
                    },
                    {
                      label: "Karkas kilo",
                      value: `${previewValues.estimatedKarkasWeight.toLocaleString("tr-TR")} kg`,
                      icon: ChartBarIcon,
                    },
                    {
                      label: "Ölçü tahmini",
                      value: measurementEstimate
                        ? `${measurementEstimate} kg`
                        : "—",
                      icon: ArrowPathIcon,
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-stone-100 bg-stone-50/90 p-3.5 dark:border-stone-700 dark:bg-stone-950/60"
                    >
                      <stat.icon
                        className="h-4 w-4 text-emerald-700 dark:text-emerald-400"
                        aria-hidden
                      />
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-stone-500">
                        {stat.label}
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-stone-900 dark:text-stone-50">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-emerald-600 via-emerald-800 to-stone-950 p-6 text-white shadow-xl shadow-emerald-950/30 sm:p-8">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.2),transparent_50%)]"
                aria-hidden
              />
              <div className="relative text-center">
                <p className="text-sm font-medium text-emerald-50/90">
                  1 kişilik hisse (1/7)
                </p>
                <p className="mt-2 font-display text-4xl font-bold sm:text-5xl">
                  {formatCurrency(previewValues.sharePrice)}
                </p>
                <p className="mx-auto mt-3 max-w-xs text-sm text-emerald-50/80">
                  Kurban hisse fiyatı hesaplama: toplam değer ÷ 7 pay.
                </p>
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {showYieldTable ? (
                    <CheckCircleIcon className="h-5 w-5" aria-hidden />
                  ) : (
                    <LockClosedIcon className="h-5 w-5" aria-hidden />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-stone-900 dark:text-stone-50">
                    Detaylı randıman tablosu
                  </p>
                  <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                    Farklı randıman senaryoları ve parça dökümü. 1 kredi ile
                    açılır.
                  </p>
                </div>
              </div>

              {!showYieldTable && (
                <button
                  type="button"
                  onClick={handleUnlockYieldTable}
                  disabled={
                    isUnlocking ||
                    authLoading ||
                    (!!user && user.remainingCredits <= 0)
                  }
                  className="btn btn-primary btn-md mt-4 w-full"
                >
                  {isUnlocking ? "Açılıyor..." : "Tabloyu aç (1 kredi)"}
                </button>
              )}

              {!authLoading && !user && (
                <p className="mt-3 text-center text-sm text-stone-600 dark:text-stone-400">
                  <Link
                    href="/auth/login"
                    className="font-semibold text-emerald-700 dark:text-emerald-300"
                  >
                    Giriş yapın
                  </Link>{" "}
                  veya{" "}
                  <Link
                    href="/auth/register"
                    className="font-semibold text-emerald-700 dark:text-emerald-300"
                  >
                    ücretsiz kayıt olun
                  </Link>
                </p>
              )}

              {!authLoading && user && (
                <p className="mt-3 text-center text-xs text-stone-500">
                  Kalan kredi:{" "}
                  <strong className="text-emerald-700 dark:text-emerald-300">
                    {user.remainingCredits}
                  </strong>
                </p>
              )}

              {creditError && (
                <p
                  className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200"
                  role="alert"
                >
                  {creditError}
                </p>
              )}
            </div>
          </div>
        </div>

        {showYieldTable && (
          <div className="mt-8 animate-scale-in">
            <YieldTable
              key={previewValues.profile}
              rows={previewValues.yieldRows}
              profile={previewValues.profile}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ManualWeightCalculator;
