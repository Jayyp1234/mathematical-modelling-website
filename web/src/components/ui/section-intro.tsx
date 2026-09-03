import Link from "next/link";
import { ArrowRight } from "./icons";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  body: string;
  linkLabel: string;
  href: string;
  className?: string;
  titleClassName?: string;
};

export function SectionIntro({ eyebrow, title, body, linkLabel, href, className, titleClassName }: Props) {
  return (
    <div className={className}>
      <p className="t-eyebrow text-accent">{eyebrow}</p>
      <h2 className={`t-h2 mt-[16px] ${titleClassName ?? ""}`}>{title}</h2>
      <p className="t-body-sm text-body mt-[16px]">{body}</p>
      <Link
        href={href}
        className="text-accent arrow-slide mt-[22px] inline-flex items-center gap-[10px] text-[15px] font-semibold"
      >
        {linkLabel}
        <ArrowRight />
      </Link>
    </div>
  );
}
