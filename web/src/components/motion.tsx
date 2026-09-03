"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal and stat counters.
 *
 * Safety is the point of the design here: sections are visible by default in
 * CSS. An inline script in <head> adds `.reveal-ready` before first paint (so
 * there is no flash) and removes it again after 2.5s unless this component has
 * claimed control. If JS is off, throttled, or hydration fails, everything ends
 * up visible — the animation is the enhancement, never the gate.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("reveal-ready");
      return;
    }
    root.dataset.revealActive = "1";
    root.classList.add("reveal-ready");

    const targets = new Set<HTMLElement>();
    document.querySelectorAll<HTMLElement>("main > section").forEach((section) => {
      section.setAttribute("data-reveal", "");
      targets.add(section);
      const items = section.querySelectorAll<HTMLElement>(
        ":scope ul > li, :scope ol > li, :scope dl > div",
      );
      items.forEach((item, i) => {
        item.setAttribute("data-reveal", "");
        item.style.transitionDelay = `${Math.min(i, 7) * 65}ms`;
        targets.add(item);
      });
    });

    const show = (el: HTMLElement) => {
      el.classList.add("is-in");
      countUp(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    targets.forEach((t) => io.observe(t));

    // if anything goes wrong, reveal everything rather than leave it hidden
    const failsafe = window.setTimeout(() => {
      targets.forEach(show);
      io.disconnect();
    }, 2600);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
      delete root.dataset.revealActive;
    };
  }, []);

  return null;
}

/** Animate any [data-count] inside a revealed element from 0 to its value. */
function countUp(scope: HTMLElement) {
  const nodes = scope.matches("[data-count]")
    ? [scope]
    : [...scope.querySelectorAll<HTMLElement>("[data-count]")];

  for (const node of nodes) {
    if (node.dataset.counted) continue;
    const target = Number(node.dataset.count);
    if (!Number.isFinite(target)) continue;
    node.dataset.counted = "1";

    const suffix = node.dataset.countSuffix ?? "";
    const start = performance.now();
    const duration = 1100;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      node.textContent = `${Math.round(target * eased)}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}
