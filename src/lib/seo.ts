import type { Metadata, MetadataRoute } from "next";

const FALLBACK_SITE_URL = "https://kurbanlikkilohesaplama.com";

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export type IndexableRoute = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

/** Arama motorlarında dizine eklenecek herkese açık sayfalar */
export const indexableRoutes: IndexableRoute[] = [
  {
    path: "/",
    changeFrequency: "daily",
    priority: 1,
  },
  {
    path: "/analyze",
    changeFrequency: "daily",
    priority: 0.95,
  },
  {
    path: "/blog",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/pricing",
    changeFrequency: "weekly",
    priority: 0.85,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/privacy",
    changeFrequency: "yearly",
    priority: 0.35,
  },
  {
    path: "/terms",
    changeFrequency: "yearly",
    priority: 0.35,
  },
  {
    path: "/kvkk",
    changeFrequency: "yearly",
    priority: 0.35,
  },
];

/** robots.txt — tarama engeli (noIndex sayfalar + API) */
export const robotsDisallowPaths = [
  "/api/",
  "/auth/",
  "/account/",
] as const;

const normalizeUrl = (value: string): string => value.replace(/\/+$/, "");

const getConfiguredSiteUrl = () => {
  const explicitSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (explicitSiteUrl) return normalizeUrl(explicitSiteUrl);
  if (appUrl) return normalizeUrl(appUrl);
  return FALLBACK_SITE_URL;
};

/** Yüksek hacimli, nişe uygun anahtar kelimeler (Türkiye arama niyeti) */
export const primaryKeywords = [
  "kurbanlık kilo hesaplama",
  "kurban kilo hesaplama",
  "kurbanlık fiyat hesaplama",
  "kurban hisse fiyatı hesaplama",
  "kurban et miktarı hesaplama",
  "kurbanlık hisse hesaplama",
  "karkas kilo hesaplama",
  "kurban randıman hesaplama",
  "dana kilo hesaplama",
  "koyun kilo hesaplama",
  "keçi kilo hesaplama",
  "kurbanlık canlı kilo tahmini",
] as const;

export const secondaryKeywords = [
  "kurbanlık analiz",
  "fotoğraf ile kurban kilo hesaplama",
  "kurbanlık kg et fiyatı",
  "büyükbaş kurban hesaplama",
  "küçükbaş kurban hesaplama",
  "kurbanlık değer hesaplama",
  "yapay zeka kurban analizi",
] as const;

export const siteConfig = {
  name: "Kurbanlık Kilo Hesaplama",
  title: "Kurbanlık Kilo Hesaplama | Hisse ve Karkas Fiyatı",
  description:
    "Kurbanlık kilo, karkas verimi ve hisse fiyatını ücretsiz hesaplayın. Dana, koyun ve keçi için canlı kilo tahmini; fotoğrafla yapay zeka analizi.",
  domain: getConfiguredSiteUrl(),
  locale: "tr_TR",
  ogImage: "/og-image.jpg",
  keywords: [...primaryKeywords, ...secondaryKeywords],
} as const;

export const getCanonicalUrl = (path = "/") => {
  return new URL(path, `${siteConfig.domain}/`).toString();
};

export const getSitemapUrl = () => getCanonicalUrl("/sitemap.xml");

export const getRobotsHost = () => new URL(siteConfig.domain).host;

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export const buildMetadata = ({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
}: BuildMetadataInput): Metadata => {
  const canonicalUrl = getCanonicalUrl(path);
  const allKeywords = [...siteConfig.keywords, ...keywords];

  return {
    title,
    description,
    keywords: Array.from(new Set(allKeywords)),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "tr-TR": canonicalUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonicalUrl,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} Open Graph görseli`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
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
  };
};
