import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 20 20" width={16} height={16} aria-hidden {...stroke} {...p}>
    <path d="M3.5 10h13M11.5 5l5 5-5 5" />
  </svg>
);

export const ChevronDown = (p: P) => (
  <svg viewBox="0 0 20 20" width={14} height={14} aria-hidden {...stroke} {...p}>
    <path d="m5.5 8 4.5 4.5L14.5 8" />
  </svg>
);

export const Play = (p: P) => (
  <svg viewBox="0 0 20 20" width={12} height={12} aria-hidden fill="currentColor" {...p}>
    <path d="M6.4 4.3a.7.7 0 0 1 1.06-.6l8 5.7a.7.7 0 0 1 0 1.2l-8 5.7A.7.7 0 0 1 6.4 15.7z" />
  </svg>
);

export const Download = (p: P) => (
  <svg viewBox="0 0 20 20" width={17} height={17} aria-hidden {...stroke} {...p}>
    <path d="M10 3.2v9.4M6.3 9.2 10 12.9l3.7-3.7M3.6 15.6h12.8" />
  </svg>
);

/* ---------- stat icons ---------- */
export const IconChart = (p: P) => (
  <svg viewBox="3 6 18 13" width={30} height={30} aria-hidden {...stroke} strokeWidth={1.4} {...p}>
    <path d="M3.5 17.6 9 11.8l3.4 3.1 7.2-8" />
    <path d="M15.6 6.9h4.3v4.2" />
  </svg>
);

export const IconAccuracy = (p: P) => (
  <svg viewBox="3 3 18 18" width={30} height={30} aria-hidden {...stroke} strokeWidth={1.4} {...p}>
    <path d="M20.4 11.3A8.5 8.5 0 1 1 14.2 4" />
    <path d="m8.6 11.6 3 2.9 7.1-8.2" />
  </svg>
);

export const IconTeam = (p: P) => (
  <svg viewBox="3 4 19 16" width={30} height={30} aria-hidden {...stroke} strokeWidth={1.4} {...p}>
    <circle cx="9.4" cy="8.4" r="3.1" />
    <path d="M3.6 18.8c.5-3 2.9-4.7 5.8-4.7s5.3 1.7 5.8 4.7" />
    <path d="M16 6.1a2.9 2.9 0 0 1 0 5.6M17.6 14.6c1.9.4 3.1 1.8 3.4 4.2" />
  </svg>
);

export const IconGlobe = (p: P) => (
  <svg viewBox="3 3 18 18" width={30} height={30} aria-hidden {...stroke} strokeWidth={1.4} {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M3.6 12h16.8" />
    <path d="M12 3.4c2.1 2.3 3.2 5.2 3.2 8.6s-1.1 6.3-3.2 8.6c-2.1-2.3-3.2-5.2-3.2-8.6S9.9 5.7 12 3.4Z" />
  </svg>
);

/* ---------- service icons ---------- */
export const IconAnalytics = (p: P) => (
  <svg viewBox="5 4 22 24" width={36} height={36} aria-hidden {...stroke} strokeWidth={1.5} {...p}>
    <path d="M5.5 26.5h21" />
    <rect x="7" y="16" width="4.4" height="8" rx="1.1" />
    <rect x="14" y="11" width="4.4" height="13" rx="1.1" />
    <rect x="21" y="6.5" width="4.4" height="17.5" rx="1.1" />
    <path d="M9.2 12.6v-2M16.2 7.4v-2M23.2 3.4v-1" opacity=".55" />
  </svg>
);

export const IconModel = (p: P) => (
  <svg viewBox="5 4 22 24" width={36} height={36} aria-hidden {...stroke} strokeWidth={1.5} {...p}>
    <path d="M16 4.2 26.4 10v12L16 27.8 5.6 22V10Z" />
    <circle cx="16" cy="16" r="3.3" />
    <path d="M16 4.2v8.5M16 19.3v8.5M26.4 10l-7.4 4.3M13 17.7 5.6 22M5.6 10l7.4 4.3M19 17.7l7.4 4.3" />
  </svg>
);

export const IconForecast = (p: P) => (
  <svg viewBox="3 6 26 22" width={36} height={36} aria-hidden {...stroke} strokeWidth={1.5} {...p}>
    <path d="M3.5 23.5c4.6 0 5-16 9.6-16s5 16 9.6 16 5.8-6 5.8-6" />
    <path d="M3.5 26.9h25" opacity=".45" />
  </svg>
);

export const IconDecision = (p: P) => (
  <svg viewBox="2 2 28 28" width={36} height={36} aria-hidden {...stroke} strokeWidth={1.5} {...p}>
    <circle cx="16" cy="16" r="9.4" />
    <circle cx="16" cy="16" r="3.6" />
    <path d="M16 2.6v4M16 25.4v4M2.6 16h4M25.4 16h4" />
  </svg>
);

/* ---------- misc ---------- */
export const IconDoc = (p: P) => (
  <svg viewBox="5 3 14 18" width={24} height={30} aria-hidden {...stroke} strokeWidth={1.4} {...p}>
    <path d="M13.6 3.4H7.4a2 2 0 0 0-2 2v13.2a2 2 0 0 0 2 2h9.2a2 2 0 0 0 2-2V8.4Z" />
    <path d="M13.6 3.4v5h5" />
    <path d="M8.9 13h6.2M8.9 16.4h4.4" opacity=".7" />
  </svg>
);

export const IconYouTube = (p: P) => (
  <svg viewBox="0 0 28 20" width={28} height={20} aria-hidden {...p}>
    <rect width="28" height="20" rx="5.4" fill="#FF0033" />
    <path d="M11.4 6.1 17.6 10l-6.2 3.9z" fill="#fff" />
  </svg>
);

export const IconPin = (p: P) => (
  <svg viewBox="0 0 20 20" width={16} height={16} aria-hidden {...stroke} strokeWidth={1.5} {...p}>
    <path d="M10 17.5s5.4-4.6 5.4-9a5.4 5.4 0 1 0-10.8 0c0 4.4 5.4 9 5.4 9Z" />
    <circle cx="10" cy="8.4" r="2" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg viewBox="0 0 20 20" width={16} height={16} aria-hidden {...stroke} strokeWidth={1.5} {...p}>
    <path d="M17.3 14.1v2.2a1.5 1.5 0 0 1-1.6 1.5 14.6 14.6 0 0 1-6.4-2.3 14.4 14.4 0 0 1-4.4-4.4A14.6 14.6 0 0 1 2.6 4.6 1.5 1.5 0 0 1 4.1 3h2.2a1.5 1.5 0 0 1 1.5 1.3c.1.7.3 1.4.5 2.1a1.5 1.5 0 0 1-.3 1.6l-.9.9a11.7 11.7 0 0 0 4.4 4.4l.9-.9a1.5 1.5 0 0 1 1.6-.3c.7.2 1.4.4 2.1.5a1.5 1.5 0 0 1 1.2 1.5Z" />
  </svg>
);

export const IconMail = (p: P) => (
  <svg viewBox="0 0 20 20" width={16} height={16} aria-hidden {...stroke} strokeWidth={1.5} {...p}>
    <rect x="2.4" y="4.4" width="15.2" height="11.2" rx="2" />
    <path d="m2.8 5.6 7.2 5 7.2-5" />
  </svg>
);

export const IconLinkedIn = (p: P) => (
  <svg viewBox="0 0 20 20" width={15} height={15} aria-hidden fill="currentColor" {...p}>
    <path d="M6.1 7.5H3.6V17h2.5zM4.85 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M17 11.6c0-2.6-1.4-3.9-3.3-3.9-1.4 0-2.1.8-2.4 1.4V7.5H8.8V17h2.5v-5.2c0-1.2.7-1.8 1.6-1.8s1.5.6 1.5 1.8V17H17z" />
  </svg>
);

export const IconYouTubeGlyph = (p: P) => (
  <svg viewBox="0 0 20 20" width={15} height={15} aria-hidden fill="currentColor" {...p}>
    <path d="M18 6.8a2.1 2.1 0 0 0-1.5-1.5C15.2 5 10 5 10 5s-5.2 0-6.5.3A2.1 2.1 0 0 0 2 6.8 22 22 0 0 0 1.7 10 22 22 0 0 0 2 13.2a2.1 2.1 0 0 0 1.5 1.5c1.3.3 6.5.3 6.5.3s5.2 0 6.5-.3a2.1 2.1 0 0 0 1.5-1.5c.2-1 .3-2.1.3-3.2s-.1-2.2-.3-3.2M8.4 12.5v-5l4.2 2.5z" />
  </svg>
);

export const IconMedium = (p: P) => (
  <svg viewBox="0 0 20 20" width={15} height={15} aria-hidden fill="currentColor" {...p}>
    <path d="M5.6 6.3c0-.2-.1-.4-.2-.5l-1.3-1.6v-.3h4l3.1 6.9 2.7-6.9h3.8v.3l-1.1 1.1a.3.3 0 0 0-.1.3v8a.3.3 0 0 0 .1.3l1.1 1.1v.2h-5.4V15l1.1-1.1c.1-.1.1-.2.1-.3V7l-3.1 8h-.5L6.3 7v5.4c0 .3 0 .5.2.7l1.4 1.7v.2H3.9v-.2l1.4-1.7c.2-.2.3-.4.2-.7z" />
  </svg>
);

export const ExternalLink = (p: P) => (
  <svg viewBox="0 0 20 20" width={17} height={17} aria-hidden {...stroke} strokeWidth={1.5} {...p}>
    <path d="M11.6 3.6h4.8v4.8M16.1 3.9 9.4 10.6" />
    <path d="M15.2 12v3.4a1.6 1.6 0 0 1-1.6 1.6H4.9a1.6 1.6 0 0 1-1.6-1.6V6.7a1.6 1.6 0 0 1 1.6-1.6h3.4" />
  </svg>
);
