import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Fotoğraf ile Kurban Kilo Hesaplama | Yapay Zeka",
  description:
    "Fotoğraftan kurbanlık canlı kilo, karkas randımanı ve hisse fiyatı tahmini. Dana, koyun ve keçi için ücretsiz yapay zeka analizi.",
  path: "/analyze",
  keywords: [
    "fotoğraf ile kurban kilo hesaplama",
    "yapay zeka kurban analizi",
    "dana kilo hesaplama",
    "koyun kilo hesaplama",
    "keçi kilo hesaplama",
  ],
});

const AnalyzeLayout = ({ children }: { children: ReactNode }) => children;

export default AnalyzeLayout;
