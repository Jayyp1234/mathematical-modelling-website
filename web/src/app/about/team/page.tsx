import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { ArrowRight, IconDoc, IconYouTube } from "@/components/ui/icons";
import { org, papers, team, videos } from "@/lib/content";
import { breadcrumbLd, graph, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Team",
  description: `The people behind ${org.name} and the published work you can judge them by.`,
  alternates: { canonical: "/about/team" },
  openGraph: {
    type: "website",
    url: "/about/team",
    title: `Our Team | ${org.name}`,
    description: `The people behind ${org.name}.`,
    images: ["/brand/og.png"],
  },
};

const years = [...new Set(papers.map((p) => p.year))];

const trail = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Our Team", path: "/about/team" },
] as const;

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            graph(
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
        <section className="shell pt-[18px] pb-[40px]">
          <p className="t-eyebrow text-accent">Our team</p>
          <h1 className="t-display mt-[18px] max-w-[760px] text-[34px] leading-[1.12] sm:text-[42px]">
            Small practice. Published work.
          </h1>
          <p className="mt-[22px] max-w-[620px] text-[17px] leading-[32px]">
            We would rather be judged on what we have put our names to than on
            biographies. Everything below is public and citable.
          </p>
        </section>

        {team.length > 0 && (
          <section className="shell pb-[52px]" aria-labelledby="people">
            <h2 id="people" className="sr-only">
              People
            </h2>
            <ul className="grid gap-[23px] sm:grid-cols-2 xl:grid-cols-3">
              {team.map((m) => (
                <li
                  key={m.name}
                  className="border-line flex h-full flex-col rounded-[10px] border bg-white p-[24px]"
                >
                  {m.image && (
                    <span className="bg-surface relative mb-[20px] block aspect-square w-full overflow-hidden rounded-[8px]">
                      <Image
                        src={m.image}
                        alt=""
                        fill
                        sizes="(min-width:1280px) 400px, 90vw"
                        className="object-cover"
                      />
                    </span>
                  )}
                  <h3 className="t-card-title text-[19px] leading-[27px]">
                    {m.name}
                  </h3>
                  <p className="text-accent mt-[4px] text-[14px] font-semibold">
                    {m.role}
                  </p>
                  <p className="t-body-sm text-body mt-[12px]">{m.bio}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="shell pb-[52px]" aria-labelledby="credentials">
          <h2 id="credentials" className="t-h2">
            The record, not the résumé.
          </h2>
          <div className="mt-[28px] grid gap-[23px] md:grid-cols-2">
            <Link
              href="/learn/research"
              className="border-line group flex flex-col rounded-[10px] border bg-white px-[26px] pt-[28px] pb-[26px] transition-all duration-300 hover:-translate-y-[3px] hover:border-[#cfd9f4] hover:shadow-[0_20px_44px_-24px_rgba(7,22,52,0.28)]"
            >
              <span className="text-accent">
                <IconDoc />
              </span>
              <h3 className="t-card-title group-hover:text-accent mt-[20px] text-[20px] leading-[28px] transition-colors">
                {papers.length} peer-reviewed and conference papers
              </h3>
              <p className="t-body-sm text-body mt-[12px] max-w-[420px]">
                Published between {years[years.length - 1]} and {years[0]} with
                Springer, Elsevier, SAGE, the Society of Petroleum Engineers and
                the American Mathematical Society.
              </p>
              <span className="text-accent arrow-slide mt-auto inline-flex items-center gap-[10px] pt-[26px] text-[15px] font-semibold">
                Read the research
                <ArrowRight />
              </span>
            </Link>

            <Link
              href="/learn/youtube"
              className="border-line group flex flex-col rounded-[10px] border bg-white px-[26px] pt-[28px] pb-[26px] transition-all duration-300 hover:-translate-y-[3px] hover:border-[#cfd9f4] hover:shadow-[0_20px_44px_-24px_rgba(7,22,52,0.28)]"
            >
              <IconYouTube />
              <h3 className="t-card-title group-hover:text-accent mt-[20px] text-[20px] leading-[28px] transition-colors">
                {videos.length} models built on camera
              </h3>
              <p className="t-body-sm text-body mt-[12px] max-w-[420px]">
                Simulation, numerical methods and control, written from a blank
                editor — the working method, not a showreel.
              </p>
              <span className="text-accent arrow-slide mt-auto inline-flex items-center gap-[10px] pt-[26px] text-[15px] font-semibold">
                Watch the channel
                <ArrowRight />
              </span>
            </Link>
          </div>
        </section>

        <section className="shell pb-[52px]">
          <div className="bg-surface rounded-[10px] px-[26px] py-[34px] sm:px-[40px]">
            <h2 className="t-h2 max-w-[520px] text-[24px] leading-[33px]">
              Want to know who you would actually be working with?
            </h2>
            <p className="t-body-sm text-body mt-[14px] max-w-[520px]">
              Ask, and we will tell you exactly who would be on your problem and
              what they have done before.
            </p>
            <Link
              href="/contact"
              className="bg-deep hover:bg-deep-hover arrow-slide mt-[24px] inline-flex h-[54px] items-center gap-[12px] rounded-[6px] px-[26px] text-[15px] font-semibold text-white transition-colors"
            >
              Get in Touch
              <ArrowRight />
            </Link>
          </div>
        </section>

        <CtaBand />
      </main>

      <SiteFooter />
    </>
  );
}
