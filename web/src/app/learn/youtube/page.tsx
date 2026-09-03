import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FeaturedVideo, VideoCard } from "@/components/video-card";
import { ArrowRight, IconYouTube } from "@/components/ui/icons";
import { org, videos, youtubeChannelUrl } from "@/lib/content";
import { breadcrumbLd, graph, jsonLd, videoListLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "YouTube",
  description:
    "Watch our videos where we break down complex mathematical concepts and build models step by step — simulation, numerical methods and control, worked end to end.",
  alternates: { canonical: "/learn/youtube" },
  openGraph: {
    type: "website",
    url: "/learn/youtube",
    title: `YouTube | ${org.name}`,
    description:
      "Simulation, numerical methods and control, worked end to end — every video from the channel.",
    images: ["/brand/og.png"],
  },
};

const [featured, ...rest] = videos;

const trail = [
  { name: "Home", path: "/" },
  { name: "Learn", path: "/learn" },
  { name: "YouTube", path: "/learn/youtube" },
] as const;

export default function YouTubePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            graph(
              videoListLd(videos),
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
            <IconYouTube />
            <span className="t-eyebrow text-accent">YouTube</span>
          </p>
          <h1 className="t-display mt-[24px] text-[38px] leading-[1.08] sm:text-[44px]">
            Learn. Visualise. Apply.
          </h1>
          <p className="mt-[20px] max-w-[560px] text-[17px] leading-[32px]">
            We break down complex mathematical concepts and build the models
            step by step—simulation, numerical methods and control, worked end
            to end.
          </p>
          <div className="mt-[28px] flex flex-wrap items-center gap-x-[30px] gap-y-4">
            <Link
              href={youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-deep hover:bg-deep-hover arrow-slide inline-flex h-[54px] items-center gap-[12px] rounded-[6px] px-[26px] text-[15px] font-semibold text-white transition-colors"
            >
              Visit Our YouTube Channel
              <ArrowRight />
            </Link>
            <p className="text-body-light text-[14px]">
              {videos.length} videos
            </p>
          </div>
        </section>

        <section className="shell pb-[44px]" aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="sr-only">
            Latest video
          </h2>
          <FeaturedVideo video={featured} />
        </section>

        <section className="shell pb-[52px]" aria-labelledby="all-videos">
          <h2 id="all-videos" className="t-h2">
            All videos
          </h2>
          <ul className="mt-[26px] grid gap-[23px] sm:grid-cols-2 xl:grid-cols-3">
            {rest.map((v) => (
              <li key={v.id}>
                <VideoCard video={v} />
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
