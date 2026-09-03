import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { legalUpdated } from "@/lib/content";

const updated = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date(legalUpdated));

export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="bg-deep sr-only rounded-md px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
      >
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="shell pt-[48px] pb-[64px]">
          <p className="t-eyebrow text-accent">{eyebrow}</p>
          <h1 className="t-display mt-[18px] max-w-[720px] text-[34px] leading-[1.12] sm:text-[40px]">
            {title}
          </h1>
          <p className="mt-[20px] max-w-[620px] text-[17px] leading-[32px]">
            {intro}
          </p>
          <p className="text-body-light mt-[16px] text-[14px]">
            Last updated{" "}
            <time dateTime={legalUpdated} className="font-semibold">
              {updated}
            </time>
          </p>

          <div className="legal-prose border-line mt-[38px] max-w-[720px] border-t pt-[34px]">
            {children}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
