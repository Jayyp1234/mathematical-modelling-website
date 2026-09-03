import Link from "next/link";
import Image from "next/image";
import { ArrowRight, IconAccuracy, IconChart, IconGlobe, IconTeam, Play } from "./ui/icons";
import { stats } from "@/lib/content";

const statIcon = {
  chart: IconChart,
  accuracy: IconAccuracy,
  team: IconTeam,
  globe: IconGlobe,
} as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 3-D mark on a wireframe data surface — bleeds to the right edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[24px] right-0 hidden w-[61vw] max-w-[880px] select-none lg:block"
      >
        <Image
          src="/img/hero-visual.svg"
          alt=""
          width={880}
          height={507}
          priority
          className="h-auto w-full"
        />
      </div>

      <div className="shell relative">
        <div className="relative z-10 max-w-[680px] pt-[48px] pb-[56px] lg:pt-[48px] lg:pb-[68px]">
          <p className="t-eyebrow bg-accent-soft text-accent inline-block rounded-[6px] px-[13px] py-[7px]">
            Data. Models. Impact.
          </p>

          <h1 className="t-display mt-[38px] text-[42px] leading-[1.06] sm:text-[54px] lg:text-[68px] lg:leading-[73px]">
            We model reality.
            <br />
            <span className="text-accent">You shape the future.</span>
          </h1>

          <p className="mt-[20px] max-w-[438px] text-[17px] leading-[32px]">
            We build mathematical models that turn complex data into clear
            insights—empowering better decisions and real-world impact.
          </p>

          <div className="mt-[29px] flex flex-wrap items-center gap-x-[30px] gap-y-4">
            <Link
              href="/services"
              className="bg-deep hover:bg-deep-hover arrow-slide inline-flex h-[54px] items-center gap-[12px] rounded-[6px] px-[26px] text-[15px] font-semibold text-white transition-colors"
            >
              Explore Our Services
              <ArrowRight />
            </Link>
            <Link
              href="/about#how-we-work"
              className="text-ink group inline-flex items-center gap-[14px] text-[15px] font-semibold"
            >
              <span className="border-line-strong text-accent flex h-[36px] w-[36px] items-center justify-center rounded-full border transition-colors group-hover:border-accent">
                <Play className="ml-[2px]" />
              </span>
              See How We Work
            </Link>
          </div>
        </div>

        {/* stats */}
        <dl className="grid max-w-[1012px] grid-cols-2 gap-y-8 pb-[60px] md:grid-cols-4 md:gap-y-0">
          {stats.map((s, i) => {
            const Icon = statIcon[s.icon];
            return (
              <div
                key={s.label}
                className={`flex items-center gap-[14px] ${
                  i > 0 ? "md:border-line-strong md:border-l md:pl-[42px]" : ""
                }`}
              >
                <span className="bg-surface text-accent flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[8px]">
                  <Icon />
                </span>
                <div>
                  <dd
                    className="t-display text-[30px] leading-[36px] tracking-[-0.03em]"
                    data-count={parseInt(s.value, 10)}
                    data-count-suffix={s.value.replace(/^\d+/, "")}
                  >
                    {s.value}
                  </dd>
                  <dt className="mt-[1px] text-[14px] leading-[20px] text-[#66738f]">
                    {s.label}
                  </dt>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
