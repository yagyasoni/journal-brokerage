// @ts-check

import { coreStates, expandingStates } from "./coverage";
import { brand, contactPhone, routes } from "./nav";
import { services } from "./services";
import { solutionBlocks } from "./solutions";

/**
 * The SEO layer. Search engines read a different site than a visitor does —
 * this file is the whole of what they read, held in one place for the same
 * reason `nav.js` holds every route in one place.
 *
 * Two rules govern everything below:
 *
 * 1. **A path is never written out.** Canonicals, sitemap entries and JSON-LD
 *    `url` fields all resolve through `routes`, so renaming a route in
 *    `nav.js` cannot leave a stale absolute URL pointing at a 404.
 * 2. **Nothing is invented.** Structured data must be true of the page it sits
 *    on. There is no rating, no review, no postal address and no email here,
 *    because the site has none of those to state. A fabricated one is worse
 *    than an absent one — Google penalises it, and it would be a lie.
 */

/**
 * The origin, in the one place it exists. `layout.jsx` reads `metadataBase`
 * from here; every absolute URL on the site is derived from it.
 *
 * Changing domain is a one-line change at this constant.
 */
export const site = {
  url: "https://journalbrokerage.com",
  name: brand.name,
  /** Without the article — what the wordmark says, and how people type it. */
  shortName: "Journal Brokerage",
  locale: "en_US",
  language: "en-US",
  ogImage: "/media/og/og-default.jpg",
  /** The brand promise, repeated across the footer, /why-us and the CTA band. */
  slogan: "Authentic data, delivered on time.",
};

/**
 * Absolute URL from an in-app path. The only place `site.url` is joined.
 *
 * @param {string} path
 */
export const absoluteUrl = (path) => new URL(path, site.url).toString();

/**
 * `routes`, indexable by an arbitrary string.
 *
 * The keys of `pageSeo` are a subset of the keys of `routes` — that is the
 * whole design — but a `Record<string, PageSeo>` erases which strings those
 * are, so TypeScript cannot check the lookup. Narrowing it once here beats
 * casting at all five call sites, and the `if (!path)` guards in the functions
 * below turn a mismatch into a build error rather than a silent `undefined`.
 *
 * @type {Record<string, string>}
 */
const routePath = routes;

/** Derived so the copy cannot drift from `coverage.js`. */
const stateCount = coreStates.length + expandingStates.length;

/**
 * One page's search-result entry.
 *
 * `title` is written to stand alone — it deliberately bypasses the `%s — The
 * Journal Brokerage` template in `layout.jsx`, because that template costs 24
 * characters and Google truncates a title around 60. Where the brand earns its
 * place in a title, it is written in.
 *
 * @typedef {object} PageSeo
 * @property {string} title 50–60 characters, primary keyword first.
 * @property {string} description 140–160 characters. Not a slogan — the line a
 *   buyer decides on, so it names the deliverables.
 * @property {string[]} keywords Secondary use only; see `pageMetadata`.
 * @property {string} crumb Short label for this page in a breadcrumb trail.
 * @property {string} [parent] The `pageSeo` key this page sits under. Absent
 *   means it hangs directly off the home page.
 * @property {string} [image] Path to this page's Open Graph card.
 * @property {boolean} [noindex] Keep out of the index and out of the sitemap.
 */

/**
 * Keyed by the **same keys as `routes`**, so `pageMetadata` can look the
 * canonical path up rather than being handed one.
 *
 * @type {Record<string, PageSeo>}
 */
export const pageSeo = {
  home: {
    title: "Title, Tax & Municipal Lien Research | Journal Brokerage",
    description:
      "Nationwide title search, property tax, and municipal lien research for title companies, lenders, and law firms. Source-verified reports, fast turnaround.",
    keywords: [
      "title search company",
      "title search services",
      "municipal lien search",
      "property tax search",
      "title research outsourcing",
      "property records research",
      "title abstracting services",
      "back office support for title companies",
    ],
    crumb: "Home",
    image: "/media/og/og-default.jpg",
  },

  solutions: {
    title: "Title, Tax & Lien Research Services | Journal Brokerage",
    description:
      "Three service lines, 21 deliverables — title search, property tax, and municipal lien research, each pulled from the official record and verified at source.",
    keywords: [
      "title research services",
      "property records research services",
      "title search deliverables",
      "real estate due diligence research",
      "outsourced title abstracting",
    ],
    crumb: "Solutions",
    image: "/media/og/og-solutions.jpg",
  },

  titleSearch: {
    title: "Title Search Services | Current Owner to Chain of Title",
    description:
      "Ownership, deed, mortgage, and lien research — current owner, two-owner, full search, update, and chain of title abstracts, verified against the county record.",
    keywords: [
      "title search services",
      "current owner search",
      "two owner search",
      "full title search",
      "chain of title report",
      "update search",
      "open mortgage search",
      "deed search",
      "liens and judgments search",
      "property report",
      "title abstracting services",
    ],
    crumb: "Title Search",
    parent: "solutions",
    image: "/media/og/og-title-search.jpg",
  },

  propertyTax: {
    title: "Property Tax Search & Pre-Closing Tax Certificates",
    description:
      "Property tax search reports, pre-closing certificates, county tax payoffs, and delinquent tax checks — confirmed with the collector's office before you close.",
    keywords: [
      "property tax search",
      "property tax search report",
      "pre-closing tax certificate",
      "county tax payoff",
      "delinquent property tax search",
      "tax collector verification",
      "real estate tax certificate",
    ],
    crumb: "Property Tax",
    parent: "solutions",
    image: "/media/og/og-property-tax.jpg",
  },

  municipalLien: {
    title: "Municipal Lien Search — Unrecorded Liens & Violations",
    description:
      "Municipal lien searches covering unrecorded liens, code violations, open and expired permits, utility balances, special assessments, and environmental liens.",
    keywords: [
      "municipal lien search",
      "unrecorded lien search",
      "code violation search",
      "open permit search",
      "expired permit search",
      "special assessment search",
      "environmental lien search",
      "utility balance search",
      "off record lien search",
    ],
    crumb: "Municipal Lien",
    parent: "solutions",
    image: "/media/og/og-municipal-lien.jpg",
  },

  industries: {
    title: "Title Research for Title Companies, Lenders & Law Firms",
    description:
      "Outsourced title, tax, and lien research for title companies, law firms, mortgage lenders, settlement and escrow companies, title agencies, and underwriters.",
    keywords: [
      "title company back office support",
      "outsourced title services for law firms",
      "title research for mortgage lenders",
      "escrow company support services",
      "settlement company research support",
      "title agency outsourcing",
      "underwriter research support",
      "overflow title research capacity",
    ],
    crumb: "Industries",
    image: "/media/og/og-industries.jpg",
  },

  whyUs: {
    title: "Why Journal Brokerage — Six Sigma Research Accuracy",
    description:
      "Precision, authenticity, and accuracy on schedule. Every search is pulled from source, checked against the record, and delivered inside the window we quote.",
    keywords: [
      "accurate title research",
      "six sigma title search quality",
      "source verified property research",
      "reliable title search provider",
      "title search quality control",
    ],
    crumb: "Why Us",
    image: "/media/og/og-why-us.jpg",
  },

  howItWorks: {
    title: "How Our Title Search Process Works | Journal Brokerage",
    description:
      "From order to closing-ready in four steps: place the order, we research at source, a quality review checks every finding, and the file is delivered on time.",
    keywords: [
      "title search process",
      "how to order a title search",
      "title search turnaround time",
      "property research workflow",
      "title search quality review",
    ],
    crumb: "How It Works",
    image: "/media/og/og-how-it-works.jpg",
  },

  coverage: {
    title: `Title Search Coverage — ${stateCount} States, Nationwide`,
    description: `Title, tax, and municipal lien research across ${stateCount} states — ${coreStates.length} core and ${expandingStates.length} expanding, spanning the Southeast, Mid-Atlantic, West and Midwest.`,
    keywords: [
      "nationwide title search coverage",
      "multi state title search",
      "Florida title search",
      "Texas title search",
      "New Jersey municipal lien search",
      "New York title search",
      "Georgia property tax search",
      "county record research",
    ],
    crumb: "Coverage",
    image: "/media/og/og-coverage.jpg",
  },

  sampleReport: {
    title: "Sample Title Search Report — See What You Receive",
    description:
      "See exactly what lands in your file: a full abstract of title with vesting, chain of title, open mortgages, liens, and tax status, annotated block by block.",
    keywords: [
      "sample title search report",
      "title abstract example",
      "abstract of title sample",
      "what is in a title search report",
      "title report format",
    ],
    crumb: "Sample Report",
    image: "/media/og/og-sample-report.jpg",
  },

  contact: {
    title: "Order a Title, Tax or Municipal Lien Search",
    description: `Start a search or ask a question. Send the property and scope before noon and we confirm the turnaround the same business day. Call ${contactPhone.label}.`,
    keywords: [
      "order a title search",
      "request a municipal lien search",
      "property tax search request",
      "title search quote",
      "contact title search company",
    ],
    crumb: "Contact",
    image: "/media/og/og-default.jpg",
  },

  consultation: {
    title: "Request a Consultation",
    description:
      "Set up a standing arrangement for overflow research you can rely on all year.",
    keywords: [],
    crumb: "Request a Consultation",
    // Still a PagePlaceholder with no substantive content, and linked from
    // nowhere — the site's consultation CTAs all open the booking calendar.
    // An empty page in the index is a liability, so it stays out until it is
    // built. Remove this flag and it rejoins the sitemap automatically.
    noindex: true,
  },
};

/** Paths kept out of the sitemap, derived so the two can never disagree. */
export const noindexedPaths = Object.entries(pageSeo)
  .filter(([, entry]) => entry.noindex)
  .map(([key]) => routePath[key]);

/**
 * The complete `metadata` export for one page.
 *
 * Fixes the inheritance bug this file was written for: `openGraph` used to be
 * defined only on the root layout, so every child page shared the home page's
 * social preview. Each page now states its own.
 *
 * `keywords` is included for completeness, but be clear about what it is worth:
 * **Google has ignored the keywords meta tag since 2009.** Bing gives it
 * minimal weight. The keyword work that actually ranks a page is in `title`,
 * `description`, the `h1`, the body copy, image alt text and link anchors —
 * all of which live in the other `src/data` files.
 *
 * @param {string} key A key of both `pageSeo` and `routes`.
 * @returns {import("next").Metadata}
 */
export function pageMetadata(key) {
  const entry = pageSeo[key];
  const path = routePath[key];

  if (!entry) throw new Error(`seo.js: no pageSeo entry for "${key}"`);
  if (!path) throw new Error(`seo.js: no route for "${key}"`);

  const image = entry.image ?? site.ogImage;
  const images = [
    {
      url: image,
      width: 1200,
      height: 630,
      alt: `${brand.name} — ${brand.disciplines}`,
    },
  ];

  return {
    // `absolute` opts out of the layout's `%s — The Journal Brokerage`
    // template: these titles are already written to length.
    title: { absolute: entry.title },
    description: entry.description,
    keywords: entry.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: brand.name,
      locale: site.locale,
      title: entry.title,
      description: entry.description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images,
    },
    ...(entry.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ─────────────────────────── Structured data ──────────────────────────────
 * Emitted as one `@graph` per page with `@id` cross-references, so the
 * organisation is described once and everything else points at it rather than
 * restating it. Google resolves the references; a human reading the source can
 * see there is exactly one definition of who this company is.
 * ------------------------------------------------------------------------- */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

/**
 * Where we work, as Schema.org understands it. The country is here because
 * /coverage says "Nationwide on request"; the states are here because
 * /coverage names them. Both are true of the page.
 */
const areaServed = [
  { "@type": "Country", name: "United States" },
  ...coreStates.concat(expandingStates).map((name) => ({ "@type": "State", name })),
];

/** The company. No address and no email — the site states neither. */
export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: brand.name,
    alternateName: site.shortName,
    url: site.url,
    description: brand.statement,
    slogan: site.slogan,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/media/logo-lockup.png"),
      width: 1200,
      height: 886,
    },
    image: absoluteUrl(site.ogImage),
    telephone: contactPhone.href.replace("tel:", ""),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: contactPhone.href.replace("tel:", ""),
        contactType: "sales",
        areaServed: "US",
        availableLanguage: ["English"],
      },
    ],
    areaServed,
    knowsAbout: [
      "Title search",
      "Chain of title",
      "Property tax search",
      "Municipal lien search",
      "Unrecorded liens",
      "Code violations",
      "Real estate closing due diligence",
    ],
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: brand.name,
    description: brand.statement,
    publisher: { "@id": ORG_ID },
    inLanguage: site.language,
  };
}

/**
 * One service line, with its real deliverable ledger as an offer catalogue.
 * Built from `solutions.js`, so the catalogue and the page cannot disagree.
 *
 * @param {string} id An id in `services.js` / `solutions.js`.
 */
export function serviceLd(id) {
  const block = solutionBlocks.find((entry) => entry.id === id);
  if (!block) throw new Error(`seo.js: no solution block with id "${id}"`);

  const path = block.link.href;

  return {
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name: block.title,
    serviceType: block.title,
    url: absoluteUrl(path),
    description: block.overview,
    provider: { "@id": ORG_ID },
    areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: block.ledgerLabel,
      itemListElement: block.deliverables.map((deliverable) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: deliverable.name,
          description: deliverable.definition,
        },
      })),
    },
  };
}

/**
 * The contact page, pointed at the organisation it belongs to. No email and no
 * postal address: `contact.js` still carries launch placeholders for both, and
 * a placeholder in structured data is a wrong answer stated confidently.
 */
export function contactPageLd() {
  return {
    "@type": "ContactPage",
    "@id": `${absoluteUrl(routes.contact)}#contactpage`,
    url: absoluteUrl(routes.contact),
    name: pageSeo.contact.title,
    description: pageSeo.contact.description,
    mainEntity: { "@id": ORG_ID },
  };
}

/** The three service lines, as the index that `/solutions` actually renders. */
export function serviceListLd() {
  return {
    "@type": "ItemList",
    name: "Service lines",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      description: service.body,
      url: absoluteUrl(service.link.href),
    })),
  };
}

/**
 * The trail from home to here, walked from the `parent` chain in `pageSeo` so
 * a page never states its own ancestry twice.
 *
 * Nested routes need this: nothing else in the markup tells a crawler that
 * `/solutions/title-search` sits beneath `/solutions` rather than beside it.
 *
 * @param {string} key A `pageSeo` key.
 */
export function breadcrumbLd(key) {
  /** @type {string[]} */
  const chain = [];

  /** @type {string | undefined} */
  let at = key;
  while (at) {
    if (chain.includes(at)) throw new Error(`seo.js: breadcrumb loop at "${at}"`);
    chain.unshift(at);
    at = pageSeo[at]?.parent;
  }
  if (chain[0] !== "home") chain.unshift("home");

  return {
    "@type": "BreadcrumbList",
    itemListElement: chain.map((crumbKey, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: pageSeo[crumbKey].crumb,
      item: absoluteUrl(routePath[crumbKey]),
    })),
  };
}

/**
 * A page's graph, ready to hand to `<JsonLd>`.
 *
 * @param {object[]} nodes
 */
export function graph(nodes) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
