"use client";

import { useMemo, useState } from "react";
import {
  CalculatorIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import YieldTable from "@/components/YieldTable";
import {
  calculateYieldRows,
  getDefaultYieldRate,
  type LargeCattleYieldProfile,
} from "@/utils/yieldCalculator";

const formatCurrency = (value: number) =>
  `${Math.round(value).toLocaleString("tr-TR")} ₺`;

const parseNumber = (value: string) => {
  const parsedValue = Number(value.replace(",", "."));
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

type BodyCondition = "normal" | "besili";

const ManualWeightCalculator = () => {
  const [liveWeight, setLiveWeight] = useState("700");
  const [currentMeatKgPrice, setCurrentMeatKgPrice] = useState("620");
  const [yieldProfile, setYieldProfile] =
    useState<LargeCattleYieldProfile>("male");
  const [chestCircumference, setChestCircumference] = useState("");
  const [bodyLength, setBodyLength] = useState("");
  const [bodyCondition, setBodyCondition] = useState<BodyCondition>("normal");

  const calculatedValues = useMemo(() => {
    const liveWeightValue = parseNumber(liveWeight);
    const currentMeatKgPriceValue = parseNumber(currentMeatKgPrice);
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
      totalSellPrice,
      sharePrice,
      yieldRows,
      defaultYieldRate,
      estimatedKarkasWeight,
    };
  }, [currentMeatKgPrice, liveWeight, yieldProfile]);

  const measurementEstimate = useMemo(() => {
    const chestCircumferenceValue = parseNumber(chestCircumference);
    const bodyLengthValue = parseNumber(bodyLength);

    if (chestCircumferenceValue <= 0 || bodyLengthValue <= 0) {
      return null;
    }

    const baseWeight =
      (chestCircumferenceValue * chestCircumferenceValue * bodyLengthValue) /
      10840;
    const conditionMultiplier = bodyCondition === "besili" ? 1.08 : 1;

    return Math.round(baseWeight * conditionMultiplier);
  }, [bodyCondition, bodyLength, chestCircumference]);

  const handleLiveWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLiveWeight(event.target.value);
  };

  const handleCurrentMeatKgPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentMeatKgPrice(event.target.value);
  };

  const handleYieldProfileChange = (profile: LargeCattleYieldProfile) => {
    setYieldProfile(profile);
  };

  const handleChestCircumferenceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setChestCircumference(event.target.value);
  };

  const handleBodyLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBodyLength(event.target.value);
  };

  const handleBodyConditionChange = (condition: BodyCondition) => {
    setBodyCondition(condition);
  };

  const handleUseMeasurementEstimate = () => {
    if (!measurementEstimate) return;

    setLiveWeight(String(measurementEstimate));
  };

  return (
    <section id="hesaplama" className="surface-band scroll-mt-24 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker mx-auto">Manuel hesaplama</p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
            Fotoğraf olmadan kilo, kar ve hisse hesabı
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Canlı kilo ve güncel kg et fiyatını girerek tahmini karkas değeri,
            hisse fiyatı ve randıman karşılığını hızlıca hesaplayın.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="icon-container-primary h-11 w-11">
                <CalculatorIcon className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-stone-50">
                  Kilo ve fiyat bilgileri
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Değerleri değiştirdikçe sonuçlar anlık güncellenir.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Canlı Kilo (KG)
                </span>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={liveWeight}
                  onChange={handleLiveWeightChange}
                  className="input"
                  aria-label="Canlı kilo"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Güncel Kg Et Fiyatı
                </span>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={currentMeatKgPrice}
                  onChange={handleCurrentMeatKgPriceChange}
                  className="input"
                  aria-label="Güncel kilogram et fiyatı"
                />
              </label>

              <fieldset className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 dark:border-emerald-800/55 dark:bg-emerald-950/20 sm:col-span-2">
                <legend className="px-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                  Ölçüyle canlı kilo tahmini
                </legend>
                <p className="mb-4 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                  Göğüs çevresi ve vücut uzunluğu ile yaklaşık canlı kilo
                  hesaplanır. Formül: göğüs çevresi² × vücut uzunluğu / 10840.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
                      Göğüs Çevresi (cm)
                    </span>
                    <input
                      type="number"
                      min="0"
                      inputMode="decimal"
                      value={chestCircumference}
                      onChange={handleChestCircumferenceChange}
                      className="input"
                      aria-label="Göğüs çevresi santimetre"
                      placeholder="Örn. 190"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
                      Vücut Uzunluğu (cm)
                    </span>
                    <input
                      type="number"
                      min="0"
                      inputMode="decimal"
                      value={bodyLength}
                      onChange={handleBodyLengthChange}
                      className="input"
                      aria-label="Vücut uzunluğu santimetre"
                      placeholder="Örn. 165"
                    />
                  </label>
                </div>

                <div className="mt-4 grid gap-2 rounded-xl border border-stone-200 bg-white/80 p-1.5 dark:border-stone-700 dark:bg-stone-950/70 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => handleBodyConditionChange("normal")}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      bodyCondition === "normal"
                        ? "bg-emerald-700 text-white shadow-sm"
                        : "text-stone-600 hover:bg-white dark:text-stone-300 dark:hover:bg-stone-900"
                    }`}
                    aria-pressed={bodyCondition === "normal"}
                  >
                    Normal kondisyon
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBodyConditionChange("besili")}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      bodyCondition === "besili"
                        ? "bg-emerald-700 text-white shadow-sm"
                        : "text-stone-600 hover:bg-white dark:text-stone-300 dark:hover:bg-stone-900"
                    }`}
                    aria-pressed={bodyCondition === "besili"}
                  >
                    Besili kondisyon
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-950/80 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                      Ölçü tahmini
                    </p>
                    <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50">
                      {measurementEstimate
                        ? `${measurementEstimate.toLocaleString("tr-TR")} kg`
                        : "Ölçü girin"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleUseMeasurementEstimate}
                    disabled={!measurementEstimate}
                    className="btn btn-secondary btn-md"
                  >
                    Bu kiloyu kullan
                  </button>
                </div>
              </fieldset>

              <fieldset className="block sm:col-span-2">
                <legend className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Randıman profili
                </legend>
                <div className="grid gap-2 rounded-xl border border-stone-200 bg-stone-50/80 p-1.5 dark:border-stone-700 dark:bg-stone-950/70 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => handleYieldProfileChange("male")}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      yieldProfile === "male"
                        ? "bg-emerald-700 text-white shadow-sm"
                        : "text-stone-600 hover:bg-white dark:text-stone-300 dark:hover:bg-stone-900"
                    }`}
                    aria-pressed={yieldProfile === "male"}
                  >
                    Erkek büyükbaş
                  </button>
                  <button
                    type="button"
                    onClick={() => handleYieldProfileChange("female")}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      yieldProfile === "female"
                        ? "bg-emerald-700 text-white shadow-sm"
                        : "text-stone-600 hover:bg-white dark:text-stone-300 dark:hover:bg-stone-900"
                    }`}
                    aria-pressed={yieldProfile === "female"}
                  >
                    Dişi büyükbaş
                  </button>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:pt-0">
            <div className="card p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-stone-500 dark:text-stone-400">
                    Tahmini Karkas Satış Fiyatı
                  </p>
                  <p className="mt-2 text-3xl font-bold text-stone-900 dark:text-stone-50">
                    {formatCurrency(calculatedValues.totalSellPrice)}
                  </p>
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                    %{calculatedValues.defaultYieldRate} randıman ·{" "}
                    {calculatedValues.estimatedKarkasWeight.toLocaleString(
                      "tr-TR",
                    )}{" "}
                    kg karkas
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/30 dark:text-emerald-100">
                  <p className="font-semibold">Güncel kg et fiyatı</p>
                  <p className="mt-1 text-xl font-bold">
                    {formatCurrency(parseNumber(currentMeatKgPrice))}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 p-6 text-center text-white shadow-large shadow-emerald-900/25 sm:p-8">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.22),transparent_45%)]"
                aria-hidden
              />
              <div className="relative">
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-50 sm:text-base">
                  <CurrencyDollarIcon className="h-5 w-5" aria-hidden />
                  1 Kişilik Hisse Fiyatı (1/7)
                </p>
                <p className="mt-3 font-display text-4xl font-bold sm:text-6xl">
                  {formatCurrency(calculatedValues.sharePrice)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <YieldTable
            key={yieldProfile}
            rows={calculatedValues.yieldRows}
            profile={yieldProfile}
          />
        </div>
      </div>
    </section>
  );
};

export default ManualWeightCalculator;
