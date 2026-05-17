import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/account/"],
      },
    ],
    sitemap: `${siteConfig.domain}/sitemap.xml`,
    host: new URL(siteConfig.domain).host,
  };
}
