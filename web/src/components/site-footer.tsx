import Link from "next/link";
import { Logo } from "./ui/logo";
import {
  IconLinkedIn,
  IconMail,
  IconPhone,
  IconPin,
  IconYouTubeGlyph,
} from "./ui/icons";
import { contact, footerNav, linkedinUrl, youtubeChannelUrl } from "@/lib/content";

const socials = [
  { label: "LinkedIn", href: linkedinUrl, Icon: IconLinkedIn },
  { label: "YouTube", href: youtubeChannelUrl, Icon: IconYouTubeGlyph },
  { label: "Email", href: `mailto:${contact.email}`, Icon: IconMail },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="shell pt-[60px] pb-[14px]">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-[2.4fr_1.9fr_1.5fr_1.6fr_2.6fr]">
          <div className="max-w-[246px]">
            <Link href="/" aria-label="Mathematical Modelling — home" className="text-white">
              <Logo size="footer" tone="white" />
            </Link>
            <p className="mt-[20px] max-w-[200px] text-[14px] leading-[24px] text-white/62">
              We build mathematical models that transform complexity into clarity
              and drive real-world impact.
            </p>
            <ul className="mt-[22px] flex gap-[10px]">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    aria-label={label}
                    className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white/60 hover:bg-white/10 hover:text-white"
                  >
                    <Icon />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {footerNav.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="t-eyebrow text-[12px] tracking-[0.1em] text-white">{col.heading}</h2>
              <ul className="mt-[19px] space-y-[9px] text-[14px] leading-[20px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="t-eyebrow text-[12px] tracking-[0.1em] text-white">Contact</h2>
            <ul className="mt-[19px] space-y-[14px] text-[14px] leading-[20px] text-white/70">
              <li className="flex items-start gap-[12px]">
                <span className="mt-[1px] text-white/55">
                  <IconPin />
                </span>
                {contact.location}
              </li>
              <li className="flex items-start gap-[12px]">
                <span className="mt-[1px] text-white/55">
                  <IconPhone />
                </span>
                <a href={contact.phoneHref} className="transition-colors hover:text-white">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-[12px]">
                <span className="mt-[1px] text-white/55">
                  <IconMail />
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[28px] flex flex-col gap-3 border-t border-white/12 pt-[19px] text-[13px] leading-[20px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 Mathematical Modelling. All rights reserved.</p>
          <p className="flex items-center gap-[18px]">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span aria-hidden className="text-white/25">|</span>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Use
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
