import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import { LogoStrip } from "@/components/logo-strip";
import { ArrowRight, IconDoc, IconYouTube } from "@/components/ui/icons";
import {
  footerNav,
  howWeWork,
  org,
  papers,
  services,
  stats,
  videos,
} from "@/lib/content";
import { aboutLd, breadcrumbLd, graph, jsonLd, servicesLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We build mathematical models that turn complex data into clear insights. How we work, the industries we serve, and the published research behind the models.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: `About Us | ${org.name}`,
    description:
      "How we work, the industries we serve, and the published research behind the models.",
    images: ["/brand/og.png"],
  },
};

const industries = footerNav.find((c) => c.heading === "Industries")!.links;
const years = [...new Set(papers.map((p) => p.year))];
const sources = new Set(papers.map((p) => p.source)).size;

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            graph(
              aboutLd,
              servicesLd(services),
              breadcrumbLd([
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
              ]),
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
        {/* ---------- intro ---------- */}
        <section className="shell pt-[48px] pb-[40px]">
          <p className="t-eyebrow text-accent">About us</p>
          <h1 className="t-display mt-[18px] max-w-[820px] text-[34px] leading-[1.12] sm:text-[42px]">
            Models you can interrogate, not just believe.
          </h1>
          <p className="mt-[22px] max-w-[620px] text-[17px] leading-[32px]">
            {org.description} We work across energy, industry and the public
            sector—wherever a decision is too expensive to get wrong and too
            complex to reason about by intuition alone.
          </p>

          <dl className="border-line mt-[36px] grid max-w-[1012px] grid-cols-2 gap-y-8 border-t pt-[30px] md:grid-cols-4 md:gap-y-0">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={i > 0 ? "md:border-line-strong md:border-l md:pl-[42px]" : ""}
              >
                <dd className="t-display text-[30px] leading-[36px] tracking-[-0.03em]">
                  {s.value}
                </dd>
                <dt className="mt-[1px] text-[14px] leading-[20px] text-[#66738f]">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------- how we work ---------- */}
        <section id="how-we-work" className="shell scroll-mt-[150px] pb-[52px]">
          <div className="bg-surface rounded-[10px] px-[26px] py-[38px] sm:px-[40px] lg:px-[52px]">
            <p className="t-eyebrow text-accent">How we work</p>
            <h2 className="t-h2 mt-[16px] max-w-[560px]">
              Four steps, and you keep the model at the end.
            </h2>
            <ol className="mt-[34px] grid gap-x-[34px] gap-y-[32px] sm:grid-cols-2 xl:grid-cols-4">
              {howWeWork.map((s) => (
                <li key={s.step}>
                  <p className="font-display text-accent text-[15px] font-bold tracking-[0.08em]">
                    {s.step}
                  </p>
                  <h3 className="t-card-title mt-[12px] text-[18px] leading-[26px]">
                    {s.title}
                  </h3>
                  <p className="t-body-sm text-body mt-[10px]">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- what we do ---------- */}
        <section className="shell pb-[52px]" aria-labelledby="what-we-do">
          <p className="t-eyebrow text-accent">What we do</p>
          <h2 id="what-we-do" className="t-h2 mt-[16px]">
            Four disciplines, one thread.
          </h2>
          <ul className="mt-[28px] grid gap-[23px] sm:grid-cols-2 xl:grid-cols-4">
            {services.map((s) => (
              <li
                key={s.title}
                className="border-line rounded-[10px] border bg-white px-[20px] pt-[24px] pb-[24px]"
              >
                <h3 className="t-card-title text-[17px] leading-[25px]">
                  {s.title}
                </h3>
                <p className="t-body-sm text-body mt-[12px]">{s.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- industries ---------- */}
        <section className="shell pb-[52px]" aria-labelledby="industries">
          <div className="grid gap-y-8 lg:grid-cols-[315px_1fr] lg:gap-x-[34px]">
            <div>
              <p className="t-eyebrow text-accent">Industries</p>
              <h2 id="industries" className="t-h2 mt-[16px]">
                Where the models run.
              </h2>
            </div>
            <ul className="flex flex-wrap content-start gap-[12px]">
              {industries.map((i) => (
                <li
                  key={i.label}
                  className="border-line text-ink rounded-full border bg-white px-[20px] py-[11px] text-[15px] font-medium"
                >
                  {i.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- evidence ---------- */}
        <section className="shell pb-[52px]" aria-labelledby="published">
          <p className="t-eyebrow text-accent">The work behind the work</p>
          <h2 id="published" className="t-h2 mt-[16px] max-w-[620px]">
            Published, peer-reviewed, and shown step by step.
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
                {papers.length} publications, {years[years.length - 1]}–
                {years[0]}
              </h3>
              <p className="t-body-sm text-body mt-[12px] max-w-[420px]">
                Peer-reviewed and conference research across {sources} journals
                and societies—natural gas properties, well productivity and the
                numerical methods underneath them.
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
                {videos.length} videos, worked end to end
              </h3>
              <p className="t-body-sm text-body mt-[12px] max-w-[420px]">
                Simulation, numerical methods and control, built on screen from
                a blank editor—so you can see exactly how the models are put
                together.
              </p>
              <span className="text-accent arrow-slide mt-auto inline-flex items-center gap-[10px] pt-[26px] text-[15px] font-semibold">
                Watch the channel
                <ArrowRight />
              </span>
            </Link>
          </div>
        </section>

        <LogoStrip />

        <div className="pt-[52px]">
          <CtaBand />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
