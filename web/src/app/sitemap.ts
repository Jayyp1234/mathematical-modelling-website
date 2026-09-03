import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/learn/youtube", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/learn/research", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/learn/blog", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "yearly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "yearly" as const },
  { path: "/contact", priority: 0.9, changeFrequency: "yearly" as const },
  { path: "/about/team", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/careers", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
