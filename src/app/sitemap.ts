import { MetadataRoute } from "next";
import {
  getCanonicalUrl,
  indexableRoutes,
  siteConfig,
} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return indexableRoutes.map(({ path, changeFrequency, priority }) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: getCanonicalUrl(path),
      lastModified,
      changeFrequency,
      priority,
    };

    if (path === "/") {
      entry.images = [new URL(siteConfig.ogImage, siteConfig.domain).toString()];
    }

    return entry;
  });
}
