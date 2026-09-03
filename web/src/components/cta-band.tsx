import Link from "next/link";
import { LogoMark } from "./ui/logo";
import { ArrowRight } from "./ui/icons";

export function CtaBand() {
  return (
    <section className="shell pb-[31px]">
      <div className="bg-deep relative isolate overflow-hidden rounded-[8px]">
        {/* soft flow lines in the band */}
        <svg
          aria-hidden
          viewBox="0 0 1312 157"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <g fill="none" stroke="#5f86ff" strokeWidth="1" opacity=".22">
            <path d="M-40 120C160 70 300 150 470 118s280-92 470-58 300 90 452 62" />
            <path d="M-40 136C160 92 300 168 470 136s280-84 470-50 300 84 452 56" />
            <path d="M-40 104C170 48 300 132 480 100s270-104 460-70 320 102 432 74" />
          </g>
          <g fill="#7fa0ff" opacity=".25">
            <circle cx="180" cy="118" r="1.4" />
            <circle cx="340" cy="96" r="1.4" />
            <circle cx="560" cy="126" r="1.4" />
            <circle cx="760" cy="84" r="1.4" />
            <circle cx="980" cy="112" r="1.4" />
            <circle cx="1180" cy="94" r="1.4" />
          </g>
        </svg>

        <div className="relative flex flex-col gap-8 px-[26px] py-[30px] sm:px-[40px] lg:flex-row lg:items-center lg:gap-[43px] lg:px-[67px] lg:py-0 lg:h-[157px]">
          <span className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full border border-white/35 text-white">
            <LogoMark tone="white" className="w-[46px] h-auto" />
          </span>

          <h2 className="font-display max-w-[430px] text-[28px] leading-[40px] font-bold tracking-[-0.025em] text-white">
            Let&rsquo;s build models
            <br className="hidden sm:block" /> that move the world forward.
          </h2>

          <p className="max-w-[247px] text-[15px] leading-[26px] text-white/80 lg:ml-auto">
            Partner with us to turn your data into decisions that drive impact.
          </p>

          <Link
            href="/contact"
            className="text-deep arrow-slide inline-flex h-[54px] shrink-0 items-center gap-[12px] self-start rounded-[6px] bg-white px-[31px] text-[15px] font-semibold transition-colors hover:bg-[#eef2ff] lg:self-auto"
          >
            Get in Touch
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
