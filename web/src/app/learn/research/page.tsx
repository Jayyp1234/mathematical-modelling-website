import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import { PaperRow } from "@/components/paper-row";
import { org, papers } from "@/lib/content";
import { breadcrumbLd, graph, jsonLd, papersLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Research Work",
  description:
    "Peer-reviewed and conference research on natural gas properties, reservoir and well productivity, and numerical methods — published with Springer, Elsevier, SAGE, SPE and the AMS.",
  alternates: { canonical: "/learn/research" },
  openGraph: {
    type: "website",
    url: "/learn/research",
    title: `Research Work | ${org.name}`,
    description:
      "Nine publications on natural gas properties, reservoir and well productivity, and the numerical methods behind them.",
    images: ["/brand/og.png"],
  },
};

const years = [...new Set(papers.map((p) => p.year))];
const span = `${years[years.length - 1]}–${years[0]}`;

export default function ResearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            graph(
              papersLd(papers),
              breadcrumbLd([
                { name: "Home", path: "/" },
                { name: "Learn", path: "/learn/research" },
                { name: "Research Work", path: "/learn/research" },
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
        <section className="shell pt-[48px] pb-[38px]">
          <p className="t-eyebrow text-accent">Research work</p>
          <h1 className="t-display mt-[18px] max-w-[720px] text-[34px] leading-[1.14] sm:text-[40px]">
            Advancing knowledge. Solving real problems.
          </h1>
          <p className="mt-[20px] max-w-[600px] text-[17px] leading-[32px]">
            Published research on natural gas properties, reservoir and well
            productivity, and the numerical methods behind them—work that feeds
            directly into the models we build.
          </p>

          <dl className="border-line mt-[34px] flex flex-wrap gap-x-[54px] gap-y-6 border-t pt-[26px]">
            <div>
              <dd className="t-display text-[30px] leading-[36px] tracking-[-0.03em]">
                {papers.length}
              </dd>
              <dt className="mt-[1px] text-[14px] leading-[20px] text-[#66738f]">
                Publications
              </dt>
            </div>
            <div>
              <dd className="t-display text-[30px] leading-[36px] tracking-[-0.03em]">
                {span}
              </dd>
              <dt className="mt-[1px] text-[14px] leading-[20px] text-[#66738f]">
                Years published
              </dt>
            </div>
            <div>
              <dd className="t-display text-[30px] leading-[36px] tracking-[-0.03em]">
                {new Set(papers.map((p) => p.source)).size}
              </dd>
              <dt className="mt-[1px] text-[14px] leading-[20px] text-[#66738f]">
                Journals &amp; societies
              </dt>
            </div>
          </dl>
        </section>

        <section className="shell pb-[52px]" aria-labelledby="all-papers">
          <h2 id="all-papers" className="t-h2">
            Publications
          </h2>
          <ul className="mt-[26px] flex flex-col gap-[14px]">
            {papers.map((p) => (
              <li key={p.href}>
                <PaperRow paper={p} />
              </li>
            ))}
          </ul>
          <p className="text-body-light mt-[22px] text-[13.5px] leading-[22px]">
            Links open the publisher&rsquo;s record. Some titles are co-authored;
            full author lists are on the publisher page.
          </p>
        </section>

        <CtaBand />
      </main>

      <SiteFooter />
    </>
  );
}
