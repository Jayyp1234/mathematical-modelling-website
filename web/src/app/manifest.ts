import type { MetadataRoute } from "next";
import { org } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${org.name} — ${org.tagline}`,
    short_name: org.name,
    description: org.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#02257c",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
