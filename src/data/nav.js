// @ts-check

/**
 * Every route on the site. Nothing anywhere should hard-code a path string —
 * import from here so the team can rename routes in exactly one place.
 */
export const routes = {
  home: "/",
  solutions: "/solutions",
  titleSearch: "/solutions/title-search",
  propertyTax: "/solutions/property-tax",
  municipalLien: "/solutions/municipal-lien",
  industries: "/industries",
  whyUs: "/why-us",
  howItWorks: "/how-it-works",
  coverage: "/coverage",
  sampleReport: "/sample-report",
  contact: "/contact",
  order: "/contact",
  consultation: "/request-consultation",
};

/**
 * Destinations that are not pages on this site. Kept next to `routes` so a link
 * still comes from exactly one place, but held apart from it because these are
 * absolute URLs rather than app paths — `isExternalHref` keys off that
 * difference to open them in a new tab.
 */
export const externalLinks = {
  /** Google Calendar appointment page. Every "Request a consultation" opens this. */
  booking: "https://calendar.app.google/9bvjVnoiueGQQ7S47",
};

/**
 * The RingCentral line a research specialist answers. `label` is what a visitor
 * reads, `href` is E.164 so a handset dials it without guessing the country.
 */
export const contactPhone = {
  label: "(551) 227-7726",
  href: "tel:+15512277726",
};

export const brand = {
  name: "The Journal Brokerage",
  tagline: "TITLE · TAX · MUNICIPAL LIEN",
  /** The line the mark itself carries, set under the wordmark in the logo. */
  distinction: "A brokerage of distinction",
  statement:
    "A business processing company delivering title, tax, and municipal lien research to the title and mortgage industry — with a firm assurance of accuracy and timeliness.",
  copyright: "© 2026 Journal Brokerage · Authentic Data, Delivered on Time.",
  disciplines: "Title · Tax · Municipal Lien Research",
  /**
   * Brand navy, for the browser chrome. This is the one place the value has to
   * be a literal — Next serialises it straight into a <meta> tag, so it cannot
   * read the `--color-navy` token. Keep it in step with globals.css.
   */
  themeColor: "#1a2a54",
};

/** @type {import("./types").NavLink[]} */
export const primaryNav = [
  { label: "Solutions", href: routes.solutions },
  { label: "Industries", href: routes.industries },
  { label: "Why Us", href: routes.whyUs },
  { label: "Coverage", href: routes.coverage },
  { label: "Sample Report", href: routes.sampleReport },
  { label: "Contact", href: routes.contact },
];

/** @type {import("./types").NavLink} */
export const primaryCta = { label: "Order a search", href: routes.order };

/** @type {import("./types").NavLink} */
export const secondaryCta = {
  label: "Request a consultation",
  href: externalLinks.booking,
};

/** @type {import("./types").NavGroup[]} */
export const footerNav = [
  {
    title: "Solutions",
    links: [
      { label: "Title Search", href: routes.titleSearch },
      { label: "Property Tax", href: routes.propertyTax },
      { label: "Municipal Lien", href: routes.municipalLien },
      { label: "Sample Report", href: routes.sampleReport },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why Journal Brokerage", href: routes.whyUs },
      { label: "Industries", href: routes.industries },
      { label: "Coverage", href: routes.coverage },
      { label: "How It Works", href: routes.howItWorks },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Order a Search", href: routes.order },
      { label: "Request a Consultation", href: externalLinks.booking },
      { label: "Contact", href: routes.contact },
    ],
  },
];
