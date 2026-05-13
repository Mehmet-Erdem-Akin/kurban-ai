export type CreditPackageId = "starter" | "standard" | "professional";

export type CreditPackage = {
  id: CreditPackageId;
  name: string;
  creditCount: number;
  price: number;
  unitPrice: string;
  featured: boolean;
  badge?: string;
  features: string[];
};

export const creditPackages: CreditPackage[] = [
  {
    id: "starter",
    name: "Standart",
    creditCount: 5,
    price: 99,
    unitPrice: "Kredi başı 19,8 TL",
    features: [
      "Fotoğrafla kilo analizi",
      "Manuel kilo ve hisse hesabı",
      "PDF ve görsel çıktı",
      "Analiz geçmişi",
    ],
    featured: false,
  },
  {
    id: "standard",
    name: "Pro",
    creditCount: 15,
    price: 219,
    unitPrice: "Kredi başı 14,6 TL",
    features: [
      "Fotoğrafla kilo analizi",
      "Manuel kilo ve hisse hesabı",
      "Randıman ve hisse fiyatı",
      "PDF ve görsel çıktı",
      "Analiz geçmişi",
    ],
    featured: true,
    badge: "En Popüler",
  },
  {
    id: "professional",
    name: "Geniş",
    creditCount: 25,
    price: 299,
    unitPrice: "Kredi başı 11,96 TL",
    features: [
      "Daha fazla kredi ile yoğun kullanım",
      "Fotoğrafla kilo analizi",
      "Manuel kilo ve hisse hesabı",
      "Randıman ve karkas hesapları",
      "PDF ve görsel çıktı",
      "Analiz geçmişi",
    ],
    featured: false,
  },
];

export const getCreditPackageById = (packageId: string) =>
  creditPackages.find((creditPackage) => creditPackage.id === packageId) ?? null;
