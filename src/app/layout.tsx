import type { Metadata } from "next";
import Script from "next/script";
import Analytics from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kurbanlık Analiz - Yapay Zeka ile Hayvan Analizi",
    template: "%s | Kurbanlık Analiz",
  },
  description:
    "Kurbanlık hayvan seçiminde daha bilinçli kararlar verin. Yapay zeka teknolojisi ile hayvan fotoğraflarını analiz edin, et fiyatı tahmini alın ve doğru seçim yapın.",
  keywords: [
    "kurban",
    "kurbanlık",
    "hayvan analizi",
    "yapay zeka",
    "et fiyatı",
    "dana analizi",
    "koç analizi",
    "kuzu analizi",
    "kurban hesaplama",
    "hayvan değerlendirme",
    "AI hayvan analizi",
    "kurban fiyat",
    "et kalitesi",
    "hayvan seçimi",
  ],
  authors: [{ name: "Kurbanlık Analiz" }],
  creator: "Kurbanlık Analiz",
  publisher: "Kurbanlık Analiz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kurban-ai.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://kurban-ai.vercel.app",
    title: "Kurbanlık Analiz - Yapay Zeka ile Hayvan Analizi",
    description:
      "Kurbanlık hayvan seçiminde daha bilinçli kararlar verin. Yapay zeka teknolojisi ile hayvan fotoğraflarını analiz edin, et fiyatı tahmini alın.",
    siteName: "Kurbanlık Analiz",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kurbanlık Analiz - Yapay Zeka ile Hayvan Analizi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurbanlık Analiz - Yapay Zeka ile Hayvan Analizi",
    description:
      "Yapay zeka ile kurbanlık hayvan analizi. Et fiyatı tahmini ve doğru seçim rehberi.",
    images: ["/og-image.jpg"],
    creator: "@kurbananaliz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE} />

        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Kurbanlık Analiz",
              description:
                "Yapay zeka teknolojisi ile kurbanlık hayvan analizi ve fiyat tahmini",
              url: "https://kurban-ai.vercel.app",
              applicationCategory: "AI Analysis Tool",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "TRY",
              },
              creator: {
                "@type": "Organization",
                name: "Kurbanlık Analiz",
              },
              featureList: [
                "Yapay zeka ile hayvan analizi",
                "Et fiyatı tahmini",
                "Hayvan seçim rehberi",
                "Fotoğraf tabanlı analiz",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {/* Google AdSense */}
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          crossOrigin="anonymous"
        />

        {children}
        <Analytics />
      </body>
    </html>
  );
}
