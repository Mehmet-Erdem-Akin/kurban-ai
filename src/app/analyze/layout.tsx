import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Fotoğraf ile Kurbanlık Kilo Hesaplama",
  description:
    "Kurbanlık büyükbaş ve küçükbaş hayvanlar için fotoğraftan canlı kilo, karkas verimi ve hisse fiyatı tahmini alın.",
  path: "/analyze",
  keywords: [
    "fotoğraf ile kurbanlık kilo hesaplama",
    "kurbanlık kilo hesaplama",
    "dana kilo hesaplama",
    "koyun kilo hesaplama",
  ],
});

const AnalyzeLayout = ({ children }: { children: ReactNode }) => children;

export default AnalyzeLayout;
