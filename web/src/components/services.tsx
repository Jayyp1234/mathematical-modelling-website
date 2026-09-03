import Link from "next/link";
import { SectionIntro } from "./ui/section-intro";
import { ArrowRight, IconAnalytics, IconDecision, IconForecast, IconModel } from "./ui/icons";
import { serviceUrl, services } from "@/lib/content";

const icons = {
  analytics: IconAnalytics,
  model: IconModel,
  forecast: IconForecast,
  decision: IconDecision,
} as const;

export function Services() {
  return (
    <section className="shell pt-[55px]">
      <div className="grid gap-y-10 lg:grid-cols-[315px_1fr] lg:gap-x-[34px]">
        <SectionIntro
          eyebrow="What we do"
          title={
            <>
              Turning complexity
              <br className="hidden lg:block" /> into clarity.
            </>
          }
          body="From advanced analytics to decision-support systems, we create models that help organisations understand, predict and perform better."
          linkLabel="View All Services"
          href="/services"
          className="lg:pt-[6px]"
        />

        <ul className="grid gap-[23px] sm:grid-cols-2 xl:grid-cols-4">
          {services.map((s) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.title}>
                <Link
                  href={serviceUrl(s)}
                  className="border-line group flex h-full flex-col rounded-[10px] border bg-white px-[20px] pt-[28px] pb-[16px] transition-all duration-300 hover:-translate-y-[3px] hover:border-[#cfd9f4] hover:shadow-[0_20px_44px_-24px_rgba(7,22,52,0.28)]"
                >
                  <span className="text-accent">
                    <Icon />
                  </span>
                  <h3 className="t-card-title mt-[28px]">{s.title}</h3>
                  <p className="t-body-sm text-body mt-[16px]">{s.body}</p>
                  <span className="text-accent arrow-slide mt-auto inline-flex items-center gap-[10px] pt-[24px] text-[15px] font-semibold">
                    Learn More
                    <ArrowRight />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
