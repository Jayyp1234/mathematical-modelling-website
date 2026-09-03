import Link from "next/link";
import { Download, ExternalLink, IconDoc } from "./ui/icons";
import type { Paper } from "@/lib/content";

export function PaperRow({ paper }: { paper: Paper }) {
  return (
    <Link
      href={paper.href}
      target="_blank"
      rel="noreferrer"
      className="border-line group grid grid-cols-[1fr_auto] items-start gap-x-[18px] gap-y-[10px] rounded-[10px] border bg-white px-[22px] py-[22px] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#cfd9f4] hover:shadow-[0_20px_44px_-24px_rgba(7,22,52,0.28)] sm:grid-cols-[92px_1fr_auto] sm:px-[26px]"
    >
      <p className="t-display order-1 text-[22px] leading-[28px] tracking-[-0.02em] tabular-nums sm:order-none sm:pt-[2px]">
        {paper.year}
      </p>

      <div className="order-3 col-span-2 min-w-0 sm:order-none sm:col-span-1">
        <h3 className="t-card-title group-hover:text-accent text-[18px] leading-[27px] transition-colors">
          {paper.title}
        </h3>
        <p className="text-body-light mt-[7px] text-[13.5px] leading-[20px]">
          {paper.venue}
        </p>
      </div>

      <span
        aria-hidden
        className="text-accent group-hover:bg-accent-soft order-2 flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px] transition-colors sm:order-none"
      >
        {paper.isPdf ? <Download /> : <ExternalLink />}
      </span>
    </Link>
  );
}

export function PaperStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-[14px]">
      <span className="bg-surface text-accent flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[8px]">
        <IconDoc />
      </span>
      <div>
        <p className="t-display text-[30px] leading-[36px] tracking-[-0.03em]">
          {value}
        </p>
        <p className="mt-[1px] text-[14px] leading-[20px] text-[#66738f]">
          {label}
        </p>
      </div>
    </div>
  );
}
