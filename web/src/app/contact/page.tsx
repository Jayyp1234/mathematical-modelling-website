import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { IconMail, IconPhone, IconPin } from "@/components/ui/icons";
import { contact, org } from "@/lib/content";
import { breadcrumbLd, contactLd, graph, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Tell us what you are trying to decide. We build mathematical models that turn complex data into clear insights — get in touch to talk it through.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: `Contact Us | ${org.name}`,
    description: "Tell us what you are trying to decide and we will reply.",
    images: ["/brand/og.png"],
  },
};

const details = [
  { Icon: IconPin, label: "Where we are", value: contact.location, href: null },
  { Icon: IconPhone, label: "Phone", value: contact.phone, href: contact.phoneHref },
  { Icon: IconMail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
];

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact Us", path: "/contact" },
] as const;

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            graph(
              contactLd,
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
          <p className="t-eyebrow text-accent">Contact us</p>
          <h1 className="t-display mt-[18px] max-w-[760px] text-[34px] leading-[1.12] sm:text-[42px]">
            Tell us what you&rsquo;re trying to decide.
          </h1>
          <p className="mt-[22px] max-w-[560px] text-[17px] leading-[32px]">
            Bring us the problem rather than the specification. If a model is
            the right answer we will say so, and if it isn&rsquo;t we will say
            that too.
          </p>
        </section>

        <section className="shell pb-[64px]" aria-labelledby="form-heading">
          <h2 id="form-heading" className="sr-only">
            Send us a message
          </h2>
          <div className="grid gap-[23px] lg:grid-cols-[1fr_360px]">
            <ContactForm />

            <div className="flex flex-col gap-[23px]">
              <ul className="bg-surface flex flex-col gap-[22px] rounded-[10px] px-[26px] py-[28px]">
                {details.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-[14px]">
                    <span className="text-accent mt-[3px] shrink-0">
                      <Icon />
                    </span>
                    <span className="min-w-0">
                      <span className="t-eyebrow text-body-light block text-[10px]">
                        {label}
                      </span>
                      {href ? (
                        <a
                          href={href}
                          className="text-ink hover:text-accent mt-[6px] block text-[15px] leading-[24px] font-semibold break-words transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-ink mt-[6px] block text-[15px] leading-[24px] font-semibold">
                          {value}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-line rounded-[10px] border bg-white px-[26px] py-[26px]">
                <h3 className="t-card-title text-[17px] leading-[25px]">
                  Prefer to see the work first?
                </h3>
                <p className="t-body-sm text-body mt-[10px]">
                  The published research and the video walkthroughs are the
                  fastest way to judge whether we are a fit.
                </p>
                <ul className="mt-[16px] flex flex-col gap-[9px] text-[15px] font-semibold">
                  <li>
                    <a href="/learn/research" className="text-accent hover:underline">
                      Read the research
                    </a>
                  </li>
                  <li>
                    <a href="/learn/youtube" className="text-accent hover:underline">
                      Watch the channel
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
