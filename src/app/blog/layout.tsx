import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Kurban Rehberi ve Kilo Hesaplama Blogu",
  description:
    "Kurbanlık kilo hesaplama, hisse fiyatı, karkas randımanı ve dana-koyun rehberleri. Ücretsiz bilgi yazıları ve pratik ipuçları.",
  path: "/blog",
  keywords: [
    "kurban blog",
    "kurbanlık kilo rehberi",
    "kurban hesaplama rehberi",
  ],
});

const BlogLayout = ({ children }: { children: ReactNode }) => children;

export default BlogLayout;
