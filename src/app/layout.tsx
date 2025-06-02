import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kurbanlık Analiz - Yapay Zeka ile Hayvan Analizi",
  description: "Kurbanlık hayvan seçiminde daha bilinçli kararlar verin. Yapay zeka teknolojisi ile hayvan fotoğraflarını analiz edin.",
  keywords: "kurban, hayvan analizi, yapay zeka, et fiyatı, dana, koç, kuzu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
