import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import { ArrowRight } from "@/components/ui/icons";
import { contact, openRoles, org } from "@/lib/content";
import { breadcrumbLd, graph, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Careers",
  description: `Open roles at ${org.name}, and how to reach us if none of them fit.`,
  alternates: { canonical: "/careers" },
  openGraph: {
    type: "website",
    url: "/careers",
    title: `Careers | ${org.name}`,
    description: `Open roles at ${org.name}.`,
    images: ["/brand/og.png"],
  },
};

const looksLike = [
  "You can take a vague problem and turn it into something a model can answer.",
  "You are as careful about validating a result as producing it.",
  "You can explain a method to someone who will never read the equations.",
  "You would rather say “this model does not hold here” than defend it.",
];

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            graph(
              breadcrumbLd([
                { name: "Home", path: "/" },
                { name: "Careers", path: "/careers" },
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
        <section className="shell pt-[48px] pb-[40px]">
          <p className="t-eyebrow text-accent">Careers</p>
          <h1 className="t-display mt-[18px] max-w-[760px] text-[34px] leading-[1.12] sm:text-[42px]">
            Work on problems that have a right answer.
          </h1>
          <p className="mt-[22px] max-w-[620px] text-[17px] leading-[32px]">
            Modelling work is unusual in that it can be checked. If that appeals
            more than it worries you, we would like to hear from you.
          </p>
        </section>

        <section className="shell pb-[52px]" aria-labelledby="roles">
          <h2 id="roles" className="t-h2">
            Open roles
          </h2>

          {openRoles.length > 0 ? (
            <ul className="mt-[26px] flex flex-col gap-[14px]">
              {openRoles.map((r) => (
                <li key={r.title}>
                  <Link
                    href={r.applyHref}
                    className="border-line group grid grid-cols-[1fr_auto] items-start gap-[18px] rounded-[10px] border bg-white px-[26px] py-[24px] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#cfd9f4] hover:shadow-[0_20px_44px_-24px_rgba(7,22,52,0.28)]"
                  >
                    <span className="min-w-0">
                      <span className="t-card-title group-hover:text-accent block text-[19px] leading-[27px] transition-colors">
                        {r.title}
                      </span>
                      <span className="text-body-light mt-[7px] block text-[13.5px] leading-[20px]">
                        {r.location} · {r.type}
                      </span>
                      <span className="t-body-sm text-body mt-[10px] block max-w-[560px]">
                        {r.summary}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="text-accent group-hover:bg-accent-soft flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px] transition-colors"
                    >
                      <ArrowRight />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="border-line mt-[26px] rounded-[10px] border bg-white px-[26px] py-[30px] sm:px-[34px]">
              <p className="text-[17px] leading-[30px]">
                We have no vacancies open at the moment.
              </p>
              <p className="t-body-sm text-body mt-[12px] max-w-[560px]">
                We still read speculative applications, and we keep good ones on
                file. Send a note about what you have modelled and what you
                would want to work on next — a link to code, a paper or a
                write-up is worth more to us than a covering letter.
              </p>
              <a
                href={`mailto:${contact.email}?subject=Speculative%20application`}
                className="text-accent arrow-slide mt-[22px] inline-flex items-center gap-[10px] text-[15px] font-semibold"
              >
                Write to {contact.email}
                <ArrowRight />
              </a>
            </div>
          )}
        </section>

        <section className="shell pb-[52px]" aria-labelledby="fit">
          <div className="bg-surface rounded-[10px] px-[26px] py-[34px] sm:px-[40px] lg:px-[52px]">
            <p className="t-eyebrow text-accent">What we look for</p>
            <h2 id="fit" className="t-h2 mt-[16px] max-w-[520px]">
              Judgement, not just method.
            </h2>
            <ul className="mt-[26px] grid gap-x-[34px] gap-y-[12px] sm:grid-cols-2">
              {looksLike.map((l) => (
                <li
                  key={l}
                  className="text-body flex items-start gap-[10px] text-[15px] leading-[26px]"
                >
                  <span
                    aria-hidden
                    className="bg-accent mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full"
                  />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand />
      </main>

      <SiteFooter />
    </>
  );
}
