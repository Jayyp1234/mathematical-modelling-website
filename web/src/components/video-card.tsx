import Image from "next/image";
import Link from "next/link";
import { Play } from "./ui/icons";
import { dateLabel, videoThumb, videoUrl, viewLabel, type Video } from "@/lib/content";

/** Grid cards use 278/227 — the same frame as the still on the home page, which
 *  also crops the side bars YouTube bakes into 16:9 stills. The featured card is
 *  wide enough to sit at a true 16:9. */
function Thumb({
  video,
  sizes,
  big = false,
}: {
  video: Video;
  sizes: string;
  big?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden ${big ? "aspect-[16/9]" : "aspect-[278/227]"}`}
    >
      <div className="absolute inset-0" style={{ transform: `scale(${video.zoom ?? 1})` }}>
        <Image
          src={videoThumb(video)}
          alt={`Thumbnail for the video “${video.title}”`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <span className="absolute inset-0 grid place-items-center">
        <span
          className={`flex items-center justify-center rounded-full bg-[#FF0033] text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110 ${
            big ? "h-[58px] w-[58px]" : "h-[42px] w-[42px]"
          }`}
        >
          <Play width={big ? 19 : 14} height={big ? 19 : 14} className="ml-[2px]" />
        </span>
      </span>
      <span className="absolute right-[10px] bottom-[10px] rounded-[3px] bg-[#111a33]/85 px-[6px] py-[3px] text-[11px] leading-none font-semibold text-white tabular-nums">
        {video.duration}
      </span>
    </div>
  );
}

function Meta({ video }: { video: Video }) {
  return (
    <p className="text-body-light mt-[8px] text-[13px] leading-[18px]">
      {viewLabel(video)} <span aria-hidden>·</span> {dateLabel(video)}
    </p>
  );
}

export function VideoCard({ video, eyebrow }: { video: Video; eyebrow?: string }) {
  return (
    <Link
      href={videoUrl(video)}
      target="_blank"
      rel="noreferrer"
      className="border-line group flex h-full flex-col overflow-hidden rounded-[10px] border bg-white transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_22px_48px_-26px_rgba(7,22,52,0.32)]"
    >
      <Thumb video={video} sizes="(min-width:1280px) 420px, (min-width:640px) 45vw, 90vw" />
      <div className="flex flex-1 flex-col px-[20px] pt-[18px] pb-[20px]">
        {eyebrow && <p className="t-eyebrow text-accent mb-[10px] text-[10px]">{eyebrow}</p>}
        <h3 className="t-card-title group-hover:text-accent text-[17px] leading-[25px] transition-colors">
          {video.title}
        </h3>
        <Meta video={video} />
      </div>
    </Link>
  );
}

export function FeaturedVideo({ video }: { video: Video }) {
  return (
    <Link
      href={videoUrl(video)}
      target="_blank"
      rel="noreferrer"
      className="border-line group grid overflow-hidden rounded-[10px] border bg-white transition-all duration-300 hover:shadow-[0_26px_56px_-30px_rgba(7,22,52,0.34)] md:grid-cols-[minmax(0,560px)_1fr]"
    >
      <Thumb video={video} sizes="(min-width:768px) 560px, 100vw" big />
      <div className="flex flex-col justify-center px-[26px] py-[30px] lg:px-[46px]">
        <p className="t-eyebrow text-accent text-[11px]">Latest video</p>
        <h2 className="t-h2 group-hover:text-accent mt-[16px] text-[26px] leading-[36px] transition-colors">
          {video.title}
        </h2>
        <Meta video={video} />
        <span className="text-accent arrow-slide mt-[22px] inline-flex items-center gap-[10px] text-[15px] font-semibold">
          Watch on YouTube
          <svg viewBox="0 0 20 20" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3.5 10h13M11.5 5l5 5-5 5" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
