import { MetadataRoute } from "next";
import {
  getRobotsHost,
  getSitemapUrl,
  robotsDisallowPaths,
} from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...robotsDisallowPaths],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [...robotsDisallowPaths],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/og-image.jpg"],
        disallow: [...robotsDisallowPaths],
      },
    ],
    sitemap: getSitemapUrl(),
    host: getRobotsHost(),
  };
}
