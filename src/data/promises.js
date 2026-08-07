// @ts-check

/** @type {import("./types").Promise[]} */
export const promises = [
  {
    id: "precision",
    icon: "Crosshair",
    title: "Precision",
    body: "Every report is checked for exactness before it reaches you. Nothing goes out that hasn't been reconciled against source.",
  },
  {
    id: "authenticity",
    icon: "ShieldCheck",
    title: "Authenticity",
    body: "Source-verified data you can stand behind — pulled directly from official county, municipal, and state records.",
  },
  {
    id: "accuracy-on-schedule",
    icon: "Clock",
    title: "Accuracy on Schedule",
    body: "Reliable deliverables, on the clock, every time. Fast turnaround without trading away the quality your file depends on.",
  },
];

/** @type {import("./types").Stat[]} */
export const stats = [
  { value: "6σ", caption: "Quality standard" },
  { value: "24h", caption: "Typical turnaround" },
  { value: "50", caption: "States served" },
  { value: "100%", caption: "Source verified" },
];

/** Marquee entries for the navy trust bar. @type {string[]} */
export const trustMarquee = [
  "Trusted by title professionals",
  "Serving nationwide",
  "Thousands of reports delivered",
  "Dedicated research specialists",
  "Fast response times",
];
