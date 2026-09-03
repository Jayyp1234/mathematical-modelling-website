"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./ui/logo";
import { ArrowRight, ChevronDown } from "./ui/icons";
import { nav } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_1px_0_0_var(--color-line),0_10px_28px_-24px_rgba(7,22,52,0.5)]"
          : "shadow-[0_1px_0_0_var(--color-line)]"
      }`}
    >
      <div
        className={`shell flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-[62px] lg:h-[66px]" : "h-[68px] lg:h-[76px]"
        }`}
      >
        <Link href="/" aria-label="Mathematical Modelling — home" className="text-ink">
          <Logo size="header" priority />
        </Link>

        {/* desktop nav */}
        <nav className="ml-auto mr-[30px] hidden items-center gap-[30px] lg:flex" aria-label="Main">
          {nav.map((item) =>
            "children" in item ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex items-center gap-[6px] text-[14.5px] font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-accent relative after:absolute after:-bottom-[7px] after:left-0 after:h-[2px] after:w-[calc(100%-20px)] after:rounded-full after:bg-current after:content-['']"
                      : "text-ink-soft hover:text-accent"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="mt-[1px] transition-transform duration-200 group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute top-full left-1/2 z-10 w-[200px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="border-line rounded-lg border bg-white p-2 shadow-[0_18px_40px_-16px_rgba(7,22,52,0.22)]">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="text-ink-soft hover:bg-surface hover:text-accent block rounded-md px-3 py-2 text-[15px] transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={
                  isActive(item.href)
                    ? "text-accent relative text-[14.5px] font-medium after:absolute after:-bottom-[7px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-current after:content-['']"
                    : "text-ink-soft hover:text-accent text-[14.5px] font-medium transition-colors"
                }
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="bg-deep hover:bg-deep-hover arrow-slide hidden h-[42px] items-center gap-[9px] rounded-[6px] px-[18px] text-[14px] font-semibold text-white transition-colors sm:inline-flex"
          >
            Get in Touch
            <ArrowRight />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="border-line text-ink flex h-[38px] w-[38px] items-center justify-center rounded-md border lg:hidden"
          >
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              {open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M3.5 7.5h17M3.5 16.5h17M3.5 12h17" />}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile nav */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-line border-t bg-white lg:hidden"
      >
        <nav className="shell flex flex-col py-4" aria-label="Mobile">
          {nav.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`block py-3 text-[17px] font-medium ${
                  isActive(item.href) ? "text-accent" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
              {"children" in item && (
                <div className="border-line mb-2 ml-3 flex flex-col border-l pl-4">
                  {item.children.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === c.href ? "page" : undefined}
                      className={`py-2 text-[15px] ${
                        pathname === c.href ? "text-accent" : "text-body"
                      }`}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="bg-deep mt-3 mb-2 inline-flex h-[52px] items-center justify-center gap-[10px] rounded-[6px] text-[15px] font-semibold text-white sm:hidden"
          >
            Get in Touch
            <ArrowRight />
          </Link>
        </nav>
      </div>
    </header>
  );
}
