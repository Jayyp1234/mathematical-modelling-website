import Link from "next/link";
import Image from "next/image";
import { SectionIntro } from "./ui/section-intro";
import { ArrowRight } from "./ui/icons";
import { caseStudies } from "@/lib/content";

export function CaseStudies() {
  return (
    <section className="shell pt-[42px]">
      <div className="grid gap-y-10 lg:grid-cols-[315px_1fr] lg:gap-x-[34px]">
        <SectionIntro
          eyebrow="Real challenges. Real impact."
          title="Case Studies."
          body="We partner with organisations to solve complex problems and deliver measurable results."
          linkLabel="View All Case Studies"
          href="/case-studies"
          className="lg:pt-[8px]"
        />

        <ul className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <li key={c.title}>
              <Link
                href={c.href}
                className="border-line group flex h-full flex-col overflow-hidden rounded-[10px] border bg-white transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_22px_48px_-26px_rgba(7,22,52,0.32)]"
              >
                <div className="relative aspect-[307/178] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(min-width:1024px) 307px, (min-width:640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="bg-accent absolute bottom-[14px] left-[15px] rounded-[4px] px-[10px] py-[5px] text-[10px] font-bold tracking-[0.1em] text-white uppercase">
                    {c.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-[25px] pt-[24px] pb-[20px]">
                  <h3 className="t-card-title text-[20px] leading-[27px]">{c.title}</h3>
                  <p className="t-body-sm text-body mt-[14px]">{c.body}</p>
                  <span className="text-accent arrow-slide mt-auto inline-flex items-center gap-[10px] pt-[24px] text-[15px] font-semibold">
                    Read Case Study
                    <ArrowRight />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
