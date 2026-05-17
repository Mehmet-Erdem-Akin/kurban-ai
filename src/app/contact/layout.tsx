import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "İletişim",
  description:
    "Kurbanlık Analiz ekibine soru, öneri ve iş birliği talepleriniz için iletişim kanallarından ulaşın.",
  path: "/contact",
  keywords: ["kurbanlık analiz iletişim", "kurbanlık analiz destek"],
});

const ContactLayout = ({ children }: { children: ReactNode }) => children;

export default ContactLayout;
