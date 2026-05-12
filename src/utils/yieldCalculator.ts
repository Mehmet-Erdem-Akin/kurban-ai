export type LargeCattleYieldProfile = "male" | "female";

export type YieldTableRow = {
  rate: number;
  totalMeat: number;
  shareKg: number;
  meatKgPrice: number;
};

export const MALE_LARGE_CATTLE_YIELD_RATES = [55, 58, 60, 62, 65] as const;
export const FEMALE_LARGE_CATTLE_YIELD_RATES = [50, 52, 53, 54, 55] as const;

export const DEFAULT_LARGE_CATTLE_YIELD_RATES: Record<
  LargeCattleYieldProfile,
  number
> = {
  male: 60,
  female: 53,
};

type YieldCalculationInput = {
  liveWeight: number;
  totalValue: number;
  profile: LargeCattleYieldProfile;
  shareCount?: number;
};

type YieldProfileInput = {
  animalCategory?: string;
  animalType?: string;
  gender?: string;
};

const normalizeText = (value?: string) => value?.toLocaleLowerCase("tr-TR") ?? "";

export const isLargeCattle = ({
  animalCategory,
  animalType,
}: YieldProfileInput): boolean => {
  const normalizedCategory = normalizeText(animalCategory);
  const normalizedAnimalType = normalizeText(animalType);
  const largeCattleKeywords = [
    "büyükbaş",
    "dana",
    "tosun",
    "boğa",
    "inek",
    "manda",
    "buzağı",
    "sığır",
    "hereford",
    "angus",
    "simental",
    "holstein",
  ];

  return largeCattleKeywords.some(
    (keyword) =>
      normalizedCategory.includes(keyword) ||
      normalizedAnimalType.includes(keyword),
  );
};

export const getLargeCattleYieldProfile = ({
  animalCategory,
  animalType,
  gender,
}: YieldProfileInput): LargeCattleYieldProfile | null => {
  if (!isLargeCattle({ animalCategory, animalType })) {
    return null;
  }

  const normalizedGender = normalizeText(gender);
  const normalizedAnimalType = normalizeText(animalType);
  const femaleKeywords = ["dişi", "inek", "düve"];

  if (
    normalizedGender.includes("dişi") ||
    femaleKeywords.some((keyword) => normalizedAnimalType.includes(keyword))
  ) {
    return "female";
  }

  return "male";
};

export const getYieldRates = (profile: LargeCattleYieldProfile): readonly number[] => {
  return profile === "female"
    ? FEMALE_LARGE_CATTLE_YIELD_RATES
    : MALE_LARGE_CATTLE_YIELD_RATES;
};

export const getDefaultYieldRate = (profile: LargeCattleYieldProfile) => {
  return DEFAULT_LARGE_CATTLE_YIELD_RATES[profile];
};

export const calculateYieldRows = ({
  liveWeight,
  totalValue,
  profile,
  shareCount = 7,
}: YieldCalculationInput): YieldTableRow[] => {
  const rates = getYieldRates(profile);

  return rates.map((rate) => {
    const totalMeat = Math.round((liveWeight * rate) / 100);
    const shareKg = Math.round(totalMeat / shareCount);
    const meatKgPrice = totalMeat > 0 ? Math.round(totalValue / totalMeat) : 0;

    return {
      rate,
      totalMeat,
      shareKg,
      meatKgPrice,
    };
  });
};

export const getYieldProfileLabel = (profile: LargeCattleYieldProfile) => {
  return profile === "female" ? "Dişi büyükbaş" : "Erkek büyükbaş";
};
