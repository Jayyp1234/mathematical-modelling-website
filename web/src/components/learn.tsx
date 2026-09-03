import Link from "next/link";
import Image from "next/image";
import { ArrowRight, IconDoc, IconYouTube, Play } from "./ui/icons";
import {
  latestVideo,
  postDateLabel,
  posts,
  youtubeChannelUrl,
} from "@/lib/content";

export function Learn() {
  return (
    <section className="shell pt-[26px]">
      <div className="grid gap-[16px] lg:grid-cols-[627fr_669fr]">
        {/* ---------------- YouTube ---------------- */}
        <div className="bg-surface flex flex-col gap-[18px] rounded-[10px] p-[23px] sm:flex-row sm:gap-0 sm:py-[24px] sm:pr-[18px] sm:pl-[23px] lg:min-h-[360px]">
          <div className="flex flex-1 flex-col sm:pr-[16px]">
            <p className="flex items-center gap-[12px]">
              <IconYouTube />
              <span className="t-eyebrow text-accent">YouTube</span>
            </p>
            <h2 className="t-h2 mt-[28px] text-[28px] leading-[38px]">Learn. Visualise. Apply.</h2>
            <p className="t-body-sm text-body mt-[16px]">
              Watch our latest videos where we break down complex mathematical
              concepts and build models step by step.
            </p>
            <Link
              href={youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent arrow-slide mt-auto inline-flex items-center gap-[10px] pt-[30px] text-[15px] font-semibold"
            >
              Visit Our YouTube Channel
              <ArrowRight />
            </Link>
          </div>

          <Link
            href={latestVideo.href}
            target="_blank"
            rel="noreferrer"
            className="group border-line/70 block w-full shrink-0 overflow-hidden rounded-[8px] border bg-white sm:w-[280px]"
          >
            <div className="relative aspect-[278/227] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{ transform: `scale(${latestVideo.zoom})` }}
              >
                <Image
                  src={latestVideo.image}
                  alt={latestVideo.alt}
                  fill
                  sizes="(min-width:1024px) 285px, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <span className="absolute inset-0 grid place-items-center">
                <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#FF0033] text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110">
                  <Play width={15} height={15} className="ml-[2px]" />
                </span>
              </span>
            </div>
            <div className="px-[14px] pt-[9px] pb-[9px]">
              <div className="flex items-center justify-between gap-3">
                <span className="t-eyebrow text-body-light text-[10px]">
                  {latestVideo.eyebrow}
                </span>
                <span className="rounded-[3px] bg-[#2b3450] px-[6px] py-[3px] text-[10px] leading-none font-semibold text-white tabular-nums">
                  {latestVideo.duration}
                </span>
              </div>
              <h3 className="t-card-title mt-[6px] text-[15px] leading-[21px]">
                {latestVideo.title}
              </h3>
            </div>
          </Link>
        </div>

        {/* ---------------- Blog ---------------- */}
        <div className="bg-surface flex flex-col gap-[18px] rounded-[10px] p-[23px] sm:flex-row sm:gap-0 sm:py-[17px] sm:pr-[12px] sm:pl-[27px] lg:min-h-[360px]">
          <div className="flex flex-1 flex-col sm:pr-[16px]">
            <p className="flex items-center gap-[12px]">
              <span className="text-accent">
                <IconDoc />
              </span>
              <span className="t-eyebrow text-accent">Blog</span>
            </p>
            <h2 className="t-h2 mt-[28px] text-[28px] leading-[38px]">Insights &amp; Ideas</h2>
            <p className="t-body-sm text-body mt-[16px]">
              Explore practical insights, tutorials and thoughts on modelling,
              data science and decision making.
            </p>
            <Link
              href="/learn/blog"
              className="text-accent arrow-slide mt-auto inline-flex items-center gap-[10px] pt-[30px] text-[15px] font-semibold"
            >
              View All Posts
              <ArrowRight />
            </Link>
          </div>

          <ul className="border-line/70 w-full shrink-0 overflow-hidden rounded-[8px] border bg-white sm:w-[352px]">
            {posts.map((p, i) => (
              <li key={p.slug} className={i > 0 ? "border-line border-t" : ""}>
                {/* not a link until the article exists — see post-card.tsx */}
                <article className="flex items-center gap-[14px] px-[14px] py-[11px]">
                  <span className="relative block h-[78px] w-[105px] shrink-0 overflow-hidden rounded-[5px]">
                    <Image src={p.image} alt={p.alt} fill sizes="105px" className="object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="t-card-title block text-[15px] leading-[23px]">
                      {p.title}
                    </span>
                    <span className="text-body-light mt-[6px] block text-[13px] leading-[18px]">
                      {postDateLabel(p)}
                    </span>
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
