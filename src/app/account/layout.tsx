import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = buildMetadata({
  title: "Hesabım",
  description: "Kullanıcı hesap paneli ve analiz geçmişi.",
  path: "/account",
  noIndex: true,
});

const AccountLayout = ({ children }: { children: ReactNode }) => children;

export default AccountLayout;
