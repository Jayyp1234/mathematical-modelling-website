import Image from "next/image";

/** Intrinsic size of public/brand/mark.png, cropped out of MM_LOGO_TRANSPARENT.png. */
const MARK = { width: 648, height: 456 };

type MarkProps = {
  className?: string;
  tone?: "navy" | "white";
  priority?: boolean;
};

/** The three-stroke mountain mark, straight from the brand artwork. */
export function LogoMark({ className, tone = "navy", priority }: MarkProps) {
  return (
    <Image
      src={tone === "white" ? "/brand/mark-white.png" : "/brand/mark.png"}
      alt=""
      aria-hidden
      width={MARK.width}
      height={MARK.height}
      priority={priority}
      className={className}
    />
  );
}

type LogoProps = {
  size?: "header" | "footer";
  tone?: "navy" | "white";
  className?: string;
  priority?: boolean;
};

const sizes = {
  header: {
    mark: "w-[47px]",
    gap: "gap-[10px]",
    word: "text-[13px] leading-[16px] tracking-[0.14em]",
  },
  footer: {
    mark: "w-[44px]",
    gap: "gap-[9px]",
    word: "text-[14px] leading-[17px] tracking-[0.145em]",
  },
} as const;

export function Logo({ size = "header", tone = "navy", className, priority }: LogoProps) {
  const s = sizes[size];
  return (
    <span className={`flex items-center ${s.gap} ${className ?? ""}`}>
      <LogoMark tone={tone} priority={priority} className={`${s.mark} h-auto shrink-0`} />
      <span className={`font-display font-bold uppercase ${s.word}`}>
        Mathematical
        <br />
        Modelling
      </span>
    </span>
  );
}
