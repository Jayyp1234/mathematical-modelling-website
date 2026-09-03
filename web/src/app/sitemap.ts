import type { MetadataRoute } from "next";
import { posts, siteUrl, videos } from "@/lib/content";
import { legalUpdated } from "@/lib/content";

/** Most recent ISO date in a list, as a Date. */
const latest = (dates: string[]) =>
  new Date(dates.reduce((a, b) => (a > b ? a : b)));

const build = new Date();
const videosUpdated = latest(videos.map((v) => v.publishedAt));
const postsUpdated = latest(posts.map((p) => p.publishedAt));

const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const, lastModified: build },
  { path: "/services", priority: 0.9, changeFrequency: "yearly" as const, lastModified: build },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" as const, lastModified: build },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const, lastModified: build },
  { path: "/learn/youtube", priority: 0.7, changeFrequency: "weekly" as const, lastModified: videosUpdated },
  { path: "/learn/research", priority: 0.7, changeFrequency: "yearly" as const, lastModified: build },
  { path: "/learn/blog", priority: 0.6, changeFrequency: "weekly" as const, lastModified: postsUpdated },
  { path: "/about/team", priority: 0.5, changeFrequency: "yearly" as const, lastModified: build },
  { path: "/careers", priority: 0.5, changeFrequency: "monthly" as const, lastModified: build },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const, lastModified: new Date(legalUpdated) },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const, lastModified: new Date(legalUpdated) },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
