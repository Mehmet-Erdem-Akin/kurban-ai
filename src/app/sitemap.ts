import { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return [
    {
      url: getCanonicalUrl("/"),
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: getCanonicalUrl("/analyze"),
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: getCanonicalUrl("/pricing"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getCanonicalUrl("/contact"),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: getCanonicalUrl("/privacy"),
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: getCanonicalUrl("/terms"),
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: getCanonicalUrl("/kvkk"),
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
