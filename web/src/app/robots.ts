import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      // large-language-model crawlers that respect robots.txt
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot"], allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
