import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { org, siteUrl } from "@/lib/content";
import { graph, jsonLd, organizationLd, websiteLd } from "@/lib/seo";
import { Motion } from "@/components/motion";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${org.name} — ${org.tagline}`,
    template: `%s | ${org.name}`,
  },
  description: org.description,
  applicationName: org.name,
  authors: [{ name: org.name, url: siteUrl }],
  creator: org.name,
  publisher: org.name,
  category: "technology",
  keywords: [
    "mathematical modelling",
    "mathematical modeling consultancy",
    "data analytics",
    "simulation and forecasting",
    "decision support systems",
    "reservoir simulation",
    "process optimization",
    "numerical methods",
    "energy analytics",
    "operations research",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: org.name,
    locale: "en_US",
    title: `${org.name} — ${org.tagline}`,
    description: org.description,
    images: [
      {
        url: "/brand/og.png",
        width: 1200,
        height: 630,
        alt: `${org.name} — ${org.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${org.name} — ${org.tagline}`,
    description: org.description,
    images: [
      {
        url: "/brand/og.png",
        alt: `${org.name} — ${org.tagline}`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#02257c" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('reveal-ready');setTimeout(function(){if(!d.dataset.revealActive)d.classList.remove('reveal-ready')},2500)}catch(e){}})()",
          }}
        />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(graph(organizationLd, websiteLd)),
          }}
        />
      </head>
      <body>
        <Motion />
        {children}
      </body>
    </html>
  );
}
