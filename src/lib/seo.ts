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

export const siteConfig = {
  name: "Kurbanlık Analiz",
  title: "Kurbanlık Analiz - Yapay Zeka ile Hayvan Analizi",
  description:
    "Kurbanlık hayvan seçiminde daha bilinçli kararlar verin. Yapay zeka ile fotoğraftan canlı kilo, karkas verimi ve piyasa değeri tahmini alın.",
  domain: getConfiguredSiteUrl(),
  locale: "tr_TR",
  ogImage: "/og-image.jpg",
  keywords: [
    "kurbanlık kilo hesaplama",
    "kurbanlık fiyat hesaplama",
    "kurbanlık analiz",
    "dana kilo tahmini",
    "koyun kilo tahmini",
    "kurbanlık hisse fiyatı",
    "karkas hesaplama",
    "yapay zeka hayvan analizi",
  ],
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
