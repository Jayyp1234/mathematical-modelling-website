/** Canonical origin. Change this once and metadata, sitemap and robots follow. */
export const siteUrl = "https://mathematicalmodelling.com";

export const org = {
  name: "Mathematical Modelling",
  legalName: "Mathematical Modelling",
  tagline: "We model reality. You shape the future.",
  description:
    "We build mathematical models that turn complex data into clear insights—empowering better decisions and real-world impact.",
  areaServed: "Worldwide",
  sameAs: [
    "https://www.youtube.com/@lateefkareem",
    "https://www.linkedin.com/company/mathematical-modelling/",
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  {
    label: "Learn",
    href: "/learn",
    children: [
      { label: "YouTube", href: "/learn/youtube" },
      { label: "Blog", href: "/learn/blog" },
      { label: "Research Work", href: "/learn/research" },
    ],
  },
  { label: "About Us", href: "/about" },
] as const;

export const stats = [
  { value: "50+", label: "Projects Delivered", icon: "chart" },
  { value: "98%", label: "Model Accuracy", icon: "accuracy" },
  { value: "30+", label: "Expert Modelers", icon: "team" },
  { value: "12+", label: "Industries Served", icon: "globe" },
] as const;


export type Service = {
  icon: "analytics" | "model" | "forecast" | "decision";
  slug: string;
  title: string;
  /** one-line summary, from the approved design */
  body: string;
  /** longer lede for the services page */
  lede: string;
  /** what the work typically involves — editorial, rewrite freely */
  covers: readonly string[];
};

/** There are no per-service detail pages, so `href` is an anchor on /services. */
export const services: readonly Service[] = [
  {
    icon: "analytics",
    slug: "data-analytics",
    title: "Data Analytics",
    body: "Extract meaningful patterns and insights from complex data.",
    lede: "Before anything gets modelled, the data has to be worth modelling. We clean it, characterise it, and find out what it can and cannot tell you.",
    covers: [
      "Exploratory and statistical analysis",
      "Correlation and regression modelling",
      "Time-series and trend analysis",
      "Data quality and uncertainty assessment",
    ],
  },
  {
    icon: "model",
    slug: "mathematical-modelling",
    title: "Mathematical Modelling",
    body: "Build robust models that simulate, predict and optimise real-world systems.",
    lede: "Analytical where the physics is known, numerical where it isn't. The aim is a model you can reason about, not a black box that happens to fit.",
    covers: [
      "Differential and difference equation models",
      "Numerical methods and solver design",
      "Empirical correlations fitted to measured data",
      "Model validation against experiment",
    ],
  },
  {
    icon: "forecast",
    slug: "simulation-forecasting",
    title: "Simulation & Forecasting",
    body: "Predict outcomes and test scenarios before you make decisions.",
    lede: "Run the decision before you make it. Simulation lets you see how a system behaves under conditions you would rather not meet for the first time in production.",
    covers: [
      "Scenario and sensitivity analysis",
      "Monte Carlo and uncertainty propagation",
      "Dynamic system and process simulation",
      "Forecast accuracy measurement",
    ],
  },
  {
    icon: "decision",
    slug: "decision-support",
    title: "Decision Support",
    body: "Transform model outputs into actionable strategies and clear recommendations.",
    lede: "A model earns its keep when someone acts on it. We turn output into the specific comparison a decision-maker needs, with the assumptions visible.",
    covers: [
      "Optimisation under constraints",
      "Trade-off and options analysis",
      "Dashboards and decision tools",
      "Assumption and risk documentation",
    ],
  },
];

export const serviceUrl = (s: Service) => `/services#${s.slug}`;

export const caseStudies = [
  {
    tag: "Energy",
    title: "Reservoir Performance Simulation",
    body: "Built a predictive model to optimize production strategy and increase recovery by 18%.",
    image: "/img/case-energy.svg",
    alt: "Offshore drilling platform at dusk",
    href: "/case-studies/reservoir-performance-simulation",
  },
  {
    tag: "Renewables",
    title: "Wind Farm Output Forecasting",
    body: "Developed a forecasting model that improved energy prediction accuracy by 26%.",
    image: "/img/case-renewables.svg",
    alt: "Wind turbines on green hills",
    href: "/case-studies/wind-farm-output-forecasting",
  },
  {
    tag: "Industry",
    title: "Process Optimization Model",
    body: "Reduced operational costs by 15% through advanced simulation and optimization.",
    image: "/img/case-industry.svg",
    alt: "Industrial processing plant",
    href: "/case-studies/process-optimization-model",
  },
] as const;

/** Channel-wide link used by the "Visit Our YouTube Channel" call to action. */
export const youtubeChannelUrl = "https://www.youtube.com/@lateefkareem";

/** Company page, used by the footer and by the Organization structured data. */
export const linkedinUrl = "https://www.linkedin.com/company/mathematical-modelling/";

export type Video = {
  id: string;
  title: string;
  /** mm:ss as shown on YouTube */
  duration: string;
  /** view count, read from YouTube on 2026-09-03 — refresh when convenient */
  views: number;
  /** real upload date, so the displayed date never goes stale */
  publishedAt: string;
  /** Two of the older uploads have no 1280x720 still; they fall back to 320x180.
   *  Both variants are a clean 16:9 crop — hqdefault would letterbox. */
  thumb?: "maxres" | "mq";
  /** Scale applied to the still when the source video itself is letterboxed,
   *  so the black bars fall outside the frame. 1 = no crop. */
  zoom?: number;
};

/** Uploads, newest first. Thumbnails come straight from YouTube via videoThumb(). */
export const videos: Video[] = [
  { id: "9j3ws98fDPo", title: "flightSim5", duration: "4:32", views: 61, publishedAt: "2024-11-07", zoom: 1.2 },
  { id: "pIScHssqDIM", title: "Solve Trusses in Matlab", duration: "2:19", views: 439, publishedAt: "2023-09-04" },
  { id: "O6HtrHayM90", title: "Simulation of a Quadcopter flight in Matlab", duration: "3:48", views: 95, publishedAt: "2023-07-30", zoom: 1.16 },
  { id: "2ioUEQBVZy4", title: "Wave", duration: "0:17", views: 184, publishedAt: "2023-07-27" },
  { id: "KXnlFQZtMOI", title: "Wave and Obstacles2", duration: "0:34", views: 24, publishedAt: "2023-07-25" },
  { id: "NSuFszUA5m8", title: "Wave and Obstacles", duration: "0:34", views: 24, publishedAt: "2023-07-25" },
  { id: "ot9Rly-12Fw", title: "Wave and Obstacles4", duration: "0:23", views: 48, publishedAt: "2023-07-25" },
  { id: "ozMVuNrg-Hs", title: "Wave and Obstacles5", duration: "0:23", views: 7, publishedAt: "2023-07-25", thumb: "mq" },
  { id: "k3352iPP1JY", title: "wave equation solved", duration: "0:26", views: 1405, publishedAt: "2023-07-22" },
  { id: "Bw7NtcJy5mU", title: "Missing square puzzle", duration: "0:11", views: 21, publishedAt: "2023-06-18" },
  { id: "8lJkAog3ft8", title: "Mathematically Equal but Computationally Not", duration: "4:42", views: 37, publishedAt: "2023-04-29", thumb: "mq" },
  { id: "eOCOy9AFv9w", title: "Robot Control Using Gradient Descent Algorithm", duration: "7:02", views: 308, publishedAt: "2023-04-22" },
];

const viewFormat = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

export const viewLabel = (v: Video) =>
  `${viewFormat.format(v.views)} view${v.views === 1 ? "" : "s"}`;
export const dateLabel = (v: Video) => dateFormat.format(new Date(v.publishedAt));

export const videoUrl = (v: Video) => `https://youtu.be/${v.id}`;
export const videoThumb = (v: Video) =>
  `https://i.ytimg.com/vi/${v.id}/${v.thumb === "mq" ? "mqdefault" : "maxresdefault"}.jpg`;

const newest = videos[0];

export const latestVideo = {
  eyebrow: "Latest video",
  title: newest.title,
  duration: newest.duration,
  image: videoThumb(newest),
  alt: `Thumbnail for the video “${newest.title}”`,
  href: videoUrl(newest),
  zoom: newest.zoom ?? 1,
};

export type Post = {
  slug: string;
  title: string;
  publishedAt: string;
  image: string;
  alt: string;
};

/** Newest first. Titles and dates come from the approved design; the articles
 *  themselves are not written yet, so nothing links to a body page. */
export const posts: Post[] = [
  {
    slug: "simulation-vs-optimization",
    title: "When to Use Simulation Instead of Optimization",
    publishedAt: "2024-05-06",
    image: "/img/post-simulation.svg",
    alt: "Industrial plant lit up at night",
  },
  {
    slug: "guide-to-system-dynamics",
    title: "A Simple Guide to System Dynamics",
    publishedAt: "2024-04-22",
    image: "/img/post-dynamics.svg",
    alt: "Abstract network of connected nodes",
  },
  {
    slug: "forecasting-uncertainty",
    title: "Forecasting Uncertainty in Real-World Systems",
    publishedAt: "2024-04-08",
    image: "/img/post-uncertainty.svg",
    alt: "Abstract waveform lines",
  },
];

const postDateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

/** Where an article will live. Nothing calls this yet: the posts are not
 *  written, so the cards are rendered without links rather than pointing at
 *  URLs that 404. */
export const postUrl = (p: Post) => `/learn/blog/${p.slug}`;
export const postDateLabel = (p: Post) => postDateFormat.format(new Date(p.publishedAt));

export type Paper = {
  title: string;
  /** full attribution */
  venue: string;
  /** short label for the card chip */
  source: string;
  year: string;
  href: string;
  /** true when the link is a PDF file rather than a publisher landing page */
  isPdf?: boolean;
};

/** Published work, newest first. */
export const papers: Paper[] = [
  {
    title:
      "New explicit correlation for the compressibility factor of natural gas: linearized z-factor isotherms",
    venue: "J. Petroleum Exploration and Production Technology",
    source: "Springer",
    year: "2015",
    href: "https://link.springer.com/article/10.1007/s13202-015-0209-3",
  },
  {
    title:
      "A simplified semi-analytical productivity index for a horizontal well with a non-linear trajectory in a vertical plane",
    venue: "Energy Exploration & Exploitation",
    source: "SAGE",
    year: "2015",
    href: "https://journals.sagepub.com/doi/10.1260/0144-5987.33.6.785",
  },
  {
    title:
      "Z Factor: Implicit Correlation, Convergence Problem and Pseudo-Reduced Compressibility",
    venue: "Society of Petroleum Engineers · SPE-172373-MS",
    source: "SPE",
    year: "2014",
    href: "https://onepetro.org/conference-paper/SPE-172373-MS",
  },
  {
    title:
      "Isobaric specific heat capacity of natural gas as a function of specific gravity, pressure and temperature",
    venue: "J. Natural Gas Science and Engineering",
    source: "Elsevier",
    year: "2014",
    href: "https://www.sciencedirect.com/science/article/pii/S1875510014000961",
  },
  {
    title: "Explicit Half Range Cosine Fourier Series Expansion for Z Factor",
    venue: "Society of Petroleum Engineers · SPE-167579-MS",
    source: "SPE",
    year: "2013",
    href: "https://onepetro.org/conference-paper/SPE-167579-MS",
  },
  {
    title: "A New Characteristic Equation and Determinant of Null Matrix",
    venue: "American Mathematical Society · South Eastern meeting",
    source: "AMS",
    year: "2012",
    href: "https://www.ams.org/amsmtgs/2196_abstracts/1083-15-9.pdf",
    isPdf: true,
  },
  {
    title:
      "Furui's IPR Model Correction and Its Application in Horizontal Well Cresting Control and Inflow Control Device Installation",
    venue: "Society of Petroleum Engineers · SPE-162944-MS",
    source: "SPE",
    year: "2012",
    href: "https://onepetro.org/conference-paper/SPE-162944-MS",
  },
  {
    title:
      "Specific Heat Capacity of Natural Gas; Expressed as a Function of Its Specific Gravity and Temperature",
    venue: "Society of Petroleum Engineers · SPE-150808-MS",
    source: "SPE",
    year: "2011",
    href: "https://onepetro.org/conference-paper/SPE-150808-MS",
  },
  {
    title:
      "A New Approach for Recovery Factor Estimation; Using the Mechanics of Fluid Flow through Reservoir and Production Tubing and Expansion of Formation and Reservoir Fluids",
    venue: "Society of Petroleum Engineers · SPE-140672-MS",
    source: "SPE",
    year: "2010",
    href: "https://onepetro.org/conference-paper/SPE-140672-MS",
  },
];

export const footerNav = [
  {
    heading: "Services",
    links: [
      { label: "Data Analytics", href: "/services#data-analytics" },
      { label: "Mathematical Modelling", href: "/services#mathematical-modelling" },
      { label: "Simulation & Forecasting", href: "/services#simulation-forecasting" },
      { label: "Decision Support", href: "/services#decision-support" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "YouTube", href: "/learn/youtube" },
      { label: "Blog", href: "/learn/blog" },
      { label: "Research Work", href: "/learn/research" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about/team" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
] as const;

export const contact = {
  location: "Lagos, Nigeria",
  phone: "+234 800 123 4567",
  phoneHref: "tel:+2348001234567",
  email: "info@mathematicalmodelling.com",
} as const;

/** Copy for /about. Everything here is editorial and meant to be rewritten in
 *  the client's own voice — it deliberately makes no claim about team, history
 *  or credentials that isn't already evidenced elsewhere on the site. */
export const howWeWork = [
  {
    step: "01",
    title: "Frame the decision",
    body: "We start from the choice you actually have to make, and agree what a useful answer looks like before any modelling begins.",
  },
  {
    step: "02",
    title: "Build the model",
    body: "Analytical where the structure is known, numerical or data-driven where it isn't—chosen to fit the problem, not the toolbox.",
  },
  {
    step: "03",
    title: "Validate against reality",
    body: "Every model is tested against measured data and stressed at its limits, so you know where it holds and where it doesn't.",
  },
  {
    step: "04",
    title: "Hand over something usable",
    body: "You get the model, the assumptions behind it and the means to run it yourself—not a slide deck describing one.",
  },
] as const;

/** People shown on /about/team. Empty until real names, roles and bios are
 *  supplied — the page renders without a roster rather than inventing one. */
export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** optional headshot in /public */
  image?: string;
};
export const team: readonly TeamMember[] = [];

/** Vacancies shown on /careers. Empty until there are real openings. */
export type Role = {
  title: string;
  location: string;
  type: string;
  summary: string;
  applyHref: string;
};
export const openRoles: readonly Role[] = [];

/** Date the legal pages were last revised. */
export const legalUpdated = "2026-09-03";
