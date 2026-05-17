import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Hesap İşlemleri",
  description:
    "Kurbanlık Analiz hesabınıza giriş yapın veya yeni hesap oluşturun.",
  path: "/auth/login",
  noIndex: true,
});

const AuthLayout = ({ children }: { children: ReactNode }) => children;

export default AuthLayout;
