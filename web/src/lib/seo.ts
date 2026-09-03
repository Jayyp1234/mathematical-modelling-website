import {
  contact,
  org,
  siteUrl,
  videoThumb,
  videoUrl,
  serviceUrl,
  type Paper,
  type Service,
  type Video,
} from "./content";

export const ORG_ID = `${siteUrl}/#organization`;
const SITE_ID = `${siteUrl}/#website`;

/** Serialises a JSON-LD graph for embedding in a <script type="application/ld+json">. */
export const jsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

export const organizationLd = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: org.name,
  legalName: org.legalName,
  url: siteUrl,
  slogan: org.tagline,
  description: org.description,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/brand/logo.png`,
    caption: `${org.name} logo`,
  },
  image: `${siteUrl}/brand/og.png`,
  email: contact.email,
  telephone: contact.phone,
  areaServed: org.areaServed,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: contact.email,
    telephone: contact.phone,
    areaServed: org.areaServed,
    availableLanguage: ["English"],
  },
  sameAs: [...org.sameAs],
  knowsAbout: [
    "Mathematical modelling",
    "Data analytics",
    "Simulation",
    "Forecasting",
    "Decision support",
    "Reservoir engineering",
    "Numerical methods",
  ],
};

export const websiteLd = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: siteUrl,
  name: org.name,
  description: org.description,
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

export const servicesLd = (list: readonly Service[]) => ({
  "@type": "ItemList",
  name: "Services",
  itemListElement: list.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.body,
      url: `${siteUrl}${serviceUrl(s)}`,
      provider: { "@id": ORG_ID },
      areaServed: org.areaServed,
    },
  })),
});

export const videoLd = (v: Video) => ({
  "@type": "VideoObject",
  name: v.title,
  description: `${v.title} — a modelling walkthrough from ${org.name}.`,
  thumbnailUrl: videoThumb(v),
  contentUrl: videoUrl(v),
  embedUrl: `https://www.youtube.com/embed/${v.id}`,
  url: videoUrl(v),
  uploadDate: v.publishedAt,
  duration: durationToIso(v.duration),
  publisher: { "@id": ORG_ID },
  interactionStatistic: {
    "@type": "InteractionCounter",
    interactionType: { "@type": "WatchAction" },
    userInteractionCount: v.views,
  },
});

export const videoListLd = (list: readonly Video[]) => ({
  "@type": "ItemList",
  name: `${org.name} videos`,
  numberOfItems: list.length,
  itemListElement: list.map((v, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: videoLd(v),
  })),
});

export const papersLd = (list: readonly Paper[]) => ({
  "@type": "ItemList",
  name: `${org.name} publications`,
  numberOfItems: list.length,
  itemListElement: list.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "ScholarlyArticle",
      headline: p.title,
      name: p.title,
      url: p.href,
      datePublished: p.year,
      isPartOf: { "@type": "Periodical", name: p.venue },
      publisher: { "@id": ORG_ID },
    },
  })),
});

/** The blog index. Individual BlogPosting nodes are added once the articles
 *  themselves exist — pointing structured data at 404s hurts more than it helps. */
export const blogLd = {
  "@type": "Blog",
  "@id": `${siteUrl}/learn/blog#blog`,
  url: `${siteUrl}/learn/blog`,
  name: `${org.name} blog`,
  description:
    "Practical insights, tutorials and thoughts on modelling, data science and decision making.",
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

export const aboutLd = {
  "@type": "AboutPage",
  "@id": `${siteUrl}/about#about`,
  url: `${siteUrl}/about`,
  name: `About ${org.name}`,
  description: org.description,
  mainEntity: { "@id": ORG_ID },
  isPartOf: { "@id": `${siteUrl}/#website` },
  inLanguage: "en",
};

export const contactLd = {
  "@type": "ContactPage",
  "@id": `${siteUrl}/contact#contact`,
  url: `${siteUrl}/contact`,
  name: `Contact ${org.name}`,
  description: "Tell us what you are trying to decide and we will reply.",
  mainEntity: { "@id": ORG_ID },
  isPartOf: { "@id": `${siteUrl}/#website` },
  inLanguage: "en",
};

export const breadcrumbLd = (trail: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: `${siteUrl}${t.path}`,
  })),
});

/** "4:32" -> "PT4M32S" */
function durationToIso(d: string) {
  const parts = d.split(":").map(Number);
  const [h, m, s] =
    parts.length === 3 ? parts : [0, parts[0] ?? 0, parts[1] ?? 0];
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s}S`;
}

export const graph = (...nodes: unknown[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
