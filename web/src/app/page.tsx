import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { LogoStrip } from "@/components/logo-strip";
import { Services } from "@/components/services";
import { CaseStudies } from "@/components/case-studies";
import { Learn } from "@/components/learn";
import { Research } from "@/components/research";
import { CtaBand } from "@/components/cta-band";
import { SiteFooter } from "@/components/site-footer";
import { papers, services, videos } from "@/lib/content";
import { graph, jsonLd, papersLd, servicesLd, videoLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            graph(
              servicesLd(services),
              videoLd(videos[0]),
              papersLd(papers.slice(0, 3)),
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
        <Hero />
        <LogoStrip />
        <Services />
        <CaseStudies />
        <Learn />
        <Research />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
