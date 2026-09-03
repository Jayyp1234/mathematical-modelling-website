import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FeaturedPost, PostCard } from "@/components/post-card";
import { IconDoc } from "@/components/ui/icons";
import { org, posts } from "@/lib/content";
import { blogLd, breadcrumbLd, graph, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical insights, tutorials and thoughts on modelling, data science and decision making.",
  alternates: { canonical: "/learn/blog" },
  openGraph: {
    type: "website",
    url: "/learn/blog",
    title: `Blog | ${org.name}`,
    description:
      "Practical insights, tutorials and thoughts on modelling, data science and decision making.",
    images: ["/brand/og.png"],
  },
};

const [featured, ...rest] = posts;

const trail = [
  { name: "Home", path: "/" },
  { name: "Learn", path: "/learn" },
  { name: "Blog", path: "/learn/blog" },
] as const;

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            graph(
              blogLd,
              breadcrumbLd(trail),
            ),
          ),
        }}
      />
      <a
        href="#main"
        className="bg-deep sr-only rounded-md px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
      >
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <Breadcrumbs trail={trail} />
        <section className="shell pt-[18px] pb-[38px]">
          <p className="flex items-center gap-[12px]">
            <span className="text-accent">
              <IconDoc />
            </span>
            <span className="t-eyebrow text-accent">Blog</span>
          </p>
          <h1 className="t-display mt-[24px] text-[38px] leading-[1.08] sm:text-[44px]">
            Insights &amp; Ideas
          </h1>
          <p className="mt-[20px] max-w-[560px] text-[17px] leading-[32px]">
            Practical insights, tutorials and thoughts on modelling, data
            science and decision making—written for the people who have to act
            on the numbers.
          </p>
        </section>

        <section className="shell pb-[44px]" aria-labelledby="featured-post">
          <h2 id="featured-post" className="sr-only">
            Latest post
          </h2>
          <FeaturedPost post={featured} />
        </section>

        <section className="shell pb-[52px]" aria-labelledby="all-posts">
          <h2 id="all-posts" className="t-h2">
            All posts
          </h2>
          <ul className="mt-[26px] grid gap-[23px] sm:grid-cols-2 xl:grid-cols-3">
            {rest.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>

        <CtaBand />
      </main>

      <SiteFooter />
    </>
  );
}
