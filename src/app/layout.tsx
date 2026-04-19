import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Fraunces } from "next/font/google";
import Analytics from "@/components/Analytics";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

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
    <html lang="tr" className={`${dmSans.variable} ${fraunces.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#047857" />
        <meta name="msapplication-TileColor" content="#047857" />
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
      <body className="font-sans antialiased">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-emerald-900 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          İçeriğe atla
        </a>
        {/* Google AdSense */}
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          crossOrigin="anonymous"
        />

        <div id="icerik" tabIndex={-1} className="outline-none">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
