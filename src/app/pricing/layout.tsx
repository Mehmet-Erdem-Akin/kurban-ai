import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = buildMetadata({
  title: "Paketler ve Fiyatlandırma",
  description:
    "Kredi paketlerini inceleyin, ihtiyacınıza uygun planı seçin ve Shopier ile güvenli ödeme yapın.",
  path: "/pricing",
  keywords: ["kurbanlık analiz fiyat", "kredi paketi", "shopier ödeme"],
});

const PricingLayout = ({ children }: { children: ReactNode }) => children;

export default PricingLayout;
