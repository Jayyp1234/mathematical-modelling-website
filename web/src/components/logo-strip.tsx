import { clients } from "@/lib/content";

export function LogoStrip() {
  return (
    <section className="shell" aria-label="Clients">
      <div className="bg-surface rounded-[10px] px-6 pt-[30px] pb-[46px] sm:px-10">
        <p className="t-eyebrow text-body-light text-center text-[12px]">
          Trusted by innovative organisations
        </p>
        <ul className="mt-[36px] flex min-h-[51px] flex-wrap items-center justify-center gap-x-[clamp(26px,4.6vw,60px)] gap-y-7">
          {clients.map((c) => (
            <li
              key={c.name}
              className={`font-display text-[20px] whitespace-nowrap text-[#5c6889] opacity-95 transition-opacity hover:opacity-100 ${c.className}`}
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
