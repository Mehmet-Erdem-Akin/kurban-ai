import { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blog";
import {
  getCanonicalUrl,
  indexableRoutes,
  siteConfig,
} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = indexableRoutes.map(
    ({ path, changeFrequency, priority }) => {
      const entry: MetadataRoute.Sitemap[number] = {
        url: getCanonicalUrl(path),
        lastModified,
        changeFrequency,
        priority,
      };

      if (path === "/") {
        entry.images = [
          new URL(siteConfig.ogImage, siteConfig.domain).toString(),
        ];
      }

      return entry;
    },
  );

  const blogEntries: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: getCanonicalUrl(`/blog/${slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...blogEntries];
}
