// @ts-check

/**
 * Everything about who we serve.
 *
 * This file is the single source: the landing page lists six short names, and
 * /industries describes all seven with their role tags. `industryChips` is
 * derived from the list below rather than typed a second time, so a name only
 * ever has to change in one place.
 *
 * @type {import("./types").Industry[]}
 */
export const industries = [
  {
    id: "title-companies",
    shortName: "Title Companies",
    onLanding: true,
    title: "Title Companies",
    body: "High-volume operations processing hundreds of files a month, where overflow research has to come back finished, not half-done.",
    roles: ["President", "Owner", "Operations Director", "Title Manager"],
  },
  {
    id: "law-firms",
    shortName: "Law Firms",
    onLanding: true,
    title: "Real Estate Law Firms",
    body: "Firms handling closings, title examination, escrow, and settlement, where the research has to survive a partner's review.",
    roles: [
      "Managing Partner",
      "Real Estate Partner",
      "Closing Manager",
      "Title Department Manager",
      "Operations Director",
    ],
  },
  {
    id: "mortgage-lenders",
    shortName: "Mortgage Lenders",
    onLanding: true,
    title: "Mortgage Lenders",
    body: "Lenders who outsource verification, processing, and title coordination and need each piece to arrive inside the same window.",
    roles: [
      "Operations Manager",
      "Mortgage Operations Director",
      "Processing Manager",
      "Closing Manager",
      "VP Mortgage Operations",
    ],
  },
  {
    id: "settlement",
    shortName: "Settlement",
    onLanding: true,
    title: "Settlement Companies",
    body: "Operations coordinating constantly with title companies, where one unconfirmed figure stalls the whole table.",
    roles: [
      "Settlement Manager",
      "Closing Manager",
      "Operations Manager",
      "Director of Settlement Services",
    ],
  },
  {
    id: "escrow",
    shortName: "Escrow",
    onLanding: true,
    title: "Escrow Companies",
    body: "Escrow operations that need tax figures and municipal exposures confirmed before funds move, not after.",
    roles: ["Escrow Manager", "Escrow Officer Manager", "VP Escrow Operations"],
  },
  {
    id: "title-agencies",
    shortName: "Title Agencies",
    onLanding: false,
    title: "Title Agencies",
    body: "Independent and network agencies running their own production, with research capacity that scales to the month rather than the headcount.",
    roles: ["Agency Owner", "President", "Operations Director", "Production Manager"],
  },
  {
    id: "underwriters",
    shortName: "Underwriters",
    onLanding: true,
    title: "Underwriters",
    body: "Larger organisations with formal procurement and documentation requirements, where consistency across a long relationship matters more than any single file.",
    roles: [],
  },
];

/**
 * Landing page shows names only — the described cards with role tags belong to
 * /industries. Derived, never re-typed.
 *
 * @type {string[]}
 */
export const industryChips = industries
  .filter((industry) => industry.onLanding)
  .map((industry) => industry.shortName);

/** The page's own framing copy. */
export const industriesPage = {
  eyebrow: "Who we serve",
  title: "Built for the professionals who close.",
  intro:
    "We serve title companies, attorneys, underwriters, lenders, and brokers — and the individual loan officers, abstractors, and paralegals who need overflow capacity they can trust.",
  chipsLabel: "Jump to",
  cta: {
    eyebrow: "Get started",
    heading: "Send us the file you would rather not staff",
    body: "Whatever your size or segment, the standard is the same. Tell us the property, the scope, and the county.",
  },
};

export const industriesSection = {
  eyebrow: "Customer types",
  headingId: "industry-types",
  heading: "Seven kinds of desk, one kind of report",
  intro:
    "Each of these teams comes to us for something slightly different. The roles beneath each are the people we actually work with day to day.",
  rolesLabel: "Who we work with",
};

export const scaleSection = {
  eyebrow: "Scale",
  headingId: "industry-scale",
  heading: "From an independent agency to a national provider",
  intro:
    "Volume changes what a research partner has to absorb. It does not change the standard the report is held to.",
};

/** @type {import("./types").ClientScale[]} */
export const clientScale = [
  {
    id: "independent",
    range: "10–50 people",
    title: "Independent",
    body: "Local title companies and independent agencies, where research capacity has to flex without adding a hire.",
  },
  {
    id: "growing",
    range: "50–250 people",
    title: "Growing operations",
    body: "Dedicated closing and operations teams carrying steady volume, with regular overflow and seasonal peaks.",
  },
  {
    id: "national",
    range: "250+ people",
    title: "National providers",
    body: "Multi-state volume held to a single standard, with the documentation a larger organisation requires.",
  },
];
