import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const routes = [
  { label: "Services", href: "/services", note: "What we do and how" },
  { label: "Research", href: "/learn/research", note: "Published papers" },
  { label: "Videos", href: "/learn/youtube", note: "Models built on camera" },
  { label: "About Us", href: "/about", note: "How we work" },
  { label: "Contact", href: "/contact", note: "Start a conversation" },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="shell pt-[64px] pb-[72px]">
          <p className="t-eyebrow text-accent">Error 404</p>
          <h1 className="t-display mt-[18px] max-w-[640px] text-[34px] leading-[1.12] sm:text-[42px]">
            That page isn&rsquo;t here.
          </h1>
          <p className="mt-[20px] max-w-[520px] text-[17px] leading-[32px]">
            The address may be out of date, or the page may not be built yet.
            Everything below still is.
          </p>

          <ul className="border-line mt-[38px] grid max-w-[900px] gap-[14px] border-t pt-[30px] sm:grid-cols-2">
            {routes.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="border-line group flex items-center justify-between gap-4 rounded-[10px] border bg-white px-[20px] py-[18px] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#cfd9f4] hover:shadow-[0_18px_40px_-24px_rgba(7,22,52,0.28)]"
                >
                  <span>
                    <span className="t-card-title group-hover:text-accent block text-[17px] leading-[25px] transition-colors">
                      {r.label}
                    </span>
                    <span className="text-body-light mt-[3px] block text-[13.5px]">
                      {r.note}
                    </span>
                  </span>
                  <span aria-hidden className="text-accent shrink-0">
                    <ArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
