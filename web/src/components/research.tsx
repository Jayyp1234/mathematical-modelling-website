import Link from "next/link";
import { SectionIntro } from "./ui/section-intro";
import { Download, ExternalLink, IconDoc } from "./ui/icons";
import { papers } from "@/lib/content";

export function Research() {
  return (
    <section className="shell pt-[59px] pb-[32px]">
      <div className="grid gap-y-10 lg:grid-cols-[445px_1fr] lg:gap-x-[23px]">
        <SectionIntro
          eyebrow="Research highlights"
          title="Advancing knowledge. Solving real problems."
          body="Explore some of our published research work that contributes to science, engineering and data-driven decision making."
          titleClassName="text-[26px] leading-[36px]"
          linkLabel="View All Papers"
          href="/learn/research"
          className="lg:pt-[4px]"
        />

        <ul className="grid gap-[23px] sm:grid-cols-2 lg:grid-cols-3">
          {papers.slice(0, 3).map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="border-line group flex h-full flex-col rounded-[10px] border bg-white px-[18px] pt-[20px] pb-[10px] transition-all duration-300 hover:-translate-y-[3px] hover:border-[#cfd9f4] hover:shadow-[0_20px_44px_-24px_rgba(7,22,52,0.28)]"
              >
                <span className="text-[#c3cadb]">
                  <IconDoc />
                </span>
                <p className="t-eyebrow text-accent mt-[16px] text-[10px]">
                  Research Paper
                </p>
                <h3 className="t-card-title group-hover:text-accent mt-[11px] line-clamp-4 text-[17px] leading-[24px] transition-colors">
                  {p.title}
                </h3>
                <div className="border-line mt-auto flex items-center gap-[14px] pt-[16px]">
                  <span className="text-body-light text-[14px]">{p.year}</span>
                  <span className="bg-line-strong h-[14px] w-px" aria-hidden />
                  <span className="text-body-light truncate text-[14px]">
                    {p.source}
                  </span>
                  <span
                    aria-hidden
                    className="text-accent group-hover:bg-accent-soft ml-auto flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[6px] transition-colors"
                  >
                    {p.isPdf ? <Download /> : <ExternalLink />}
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
