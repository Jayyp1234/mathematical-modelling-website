import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import {
  ArrowRight,
  IconAnalytics,
  IconDecision,
  IconForecast,
  IconModel,
} from "@/components/ui/icons";
import { footerNav, org, services } from "@/lib/content";
import { breadcrumbLd, graph, jsonLd, servicesLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Data analytics, mathematical modelling, simulation and forecasting, and decision support — what each one involves and when it is the right tool.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    title: `Services | ${org.name}`,
    description:
      "Data analytics, mathematical modelling, simulation and forecasting, and decision support.",
    images: ["/brand/og.png"],
  },
};

const icons = {
  analytics: IconAnalytics,
  model: IconModel,
  forecast: IconForecast,
  decision: IconDecision,
} as const;

const industries = footerNav.find((c) => c.heading === "Industries")!.links;

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            graph(
              servicesLd(services),
              breadcrumbLd([
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
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
          <p className="t-eyebrow text-accent">Services</p>
          <h1 className="t-display mt-[18px] max-w-[820px] text-[34px] leading-[1.12] sm:text-[42px]">
            Turning complexity into clarity.
          </h1>
          <p className="mt-[22px] max-w-[620px] text-[17px] leading-[32px]">
            Four disciplines that usually arrive together. Most engagements
            start with the data and end with a decision—what changes is how much
            modelling sits in between.
          </p>
          <nav aria-label="Services" className="mt-[30px] flex flex-wrap gap-[12px]">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="border-line text-ink hover:border-accent hover:text-accent rounded-full border bg-white px-[20px] py-[11px] text-[15px] font-medium transition-colors"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </section>

        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-heading`}
              className="shell scroll-mt-[150px] pb-[34px]"
            >
              <div
                className={`grid gap-x-[34px] gap-y-[22px] rounded-[10px] px-[26px] py-[34px] sm:px-[40px] lg:grid-cols-[380px_1fr] lg:px-[52px] ${
                  i % 2 ? "bg-surface" : "border-line border bg-white"
                }`}
              >
                <div>
                  <span className="text-accent block">
                    <Icon />
                  </span>
                  <p className="font-display text-body-light mt-[18px] text-[14px] font-bold tracking-[0.1em]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2
                    id={`${s.slug}-heading`}
                    className="t-h2 mt-[10px] text-[26px] leading-[34px]"
                  >
                    {s.title}
                  </h2>
                </div>

                <div>
                  <p className="text-[17px] leading-[30px]">{s.lede}</p>
                  <h3 className="t-eyebrow text-body-light mt-[26px] text-[11px]">
                    What the work involves
                  </h3>
                  <ul className="mt-[14px] grid gap-x-[30px] gap-y-[10px] sm:grid-cols-2">
                    {s.covers.map((c) => (
                      <li
                        key={c}
                        className="text-body flex items-start gap-[10px] text-[15px] leading-[26px]"
                      >
                        <span
                          aria-hidden
                          className="bg-accent mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full"
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="text-accent arrow-slide mt-[26px] inline-flex items-center gap-[10px] text-[15px] font-semibold"
                  >
                    Talk to us about {s.title.toLowerCase()}
                    <ArrowRight />
                  </Link>
                </div>
              </div>
            </section>
          );
        })}

        <section className="shell pt-[18px] pb-[52px]" aria-labelledby="sectors">
          <div className="grid gap-y-8 lg:grid-cols-[315px_1fr] lg:gap-x-[34px]">
            <div>
              <p className="t-eyebrow text-accent">Industries</p>
              <h2 id="sectors" className="t-h2 mt-[16px]">
                Where we apply them.
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

        <CtaBand />
      </main>

      <SiteFooter />
    </>
  );
}
