// @ts-check

import { services } from "./services";

/**
 * Everything the `/solutions` page says. The landing page introduces the three
 * lines in a sentence each; this page owns the full version — the scope of each
 * service and the complete ledger of what can be ordered.
 */
export const solutionsPage = {
  eyebrow: "Solutions",
  title: "Three service lines, one standard of accuracy.",
  intro:
    "Whatever the file in front of you needs — a quick current-owner check, a certified tax figure, or the municipal exposures that never reach the county record — it is researched from the official source and verified before it reaches you. Every deliverable we offer is listed below, in plain English.",
  indexLabel: "Contents",
  cta: {
    eyebrow: "Get started",
    heading: "Tell us what the file needs",
    body: "Send the property, the scope, and the county. We will confirm receipt and commit to a delivery time before we begin.",
  },
};

/**
 * The deep content, keyed to `services.js` by id. Titles and links live there
 * and are joined in below, so a name only ever has to be changed once.
 *
 * @type {import("./types").SolutionLine[]}
 */
const solutionLines = [
  {
    id: "title-search",
    overview:
      "Complete ownership and title research, scoped to the file in front of you. From a quick current-owner verification to a full search with a documented chain of title, every abstract is pulled from the official record and checked against source before delivery.",
    deliverables: [
      {
        name: "Current Owner Search",
        definition:
          "Confirms who currently holds title and how they're vested — the quick check for a listing or refinance.",
      },
      {
        name: "Two-Owner Search",
        definition:
          "Covers the current owner plus the one before — a mid-depth search often used for equity or second-mortgage files.",
      },
      {
        name: "Full Search",
        definition:
          "A complete examination back through the statutory search period, including the full chain of title.",
      },
      {
        name: "Update Search",
        definition:
          "A “bring-down” that refreshes a prior search to the current date right before closing.",
      },
      {
        name: "Property Report",
        definition:
          "A snapshot of ownership, legal description, and encumbrances for quick reference.",
      },
      {
        name: "Open Mortgage Search",
        definition:
          "Identifies active, unreleased mortgages and liens recorded against the property.",
      },
      {
        name: "Deed Search",
        definition: "Locates and reviews the recorded deeds that conveyed the property.",
      },
      {
        name: "Liens & Judgments Search",
        definition:
          "Surfaces recorded liens, judgments, and other involuntary encumbrances.",
      },
      {
        name: "Chain of Title",
        definition:
          "The documented sequence of ownership transfers across the search period.",
      },
    ],
  },
  {
    id: "property-tax",
    overview:
      "Eliminate tax surprises before they reach the closing table. We confirm current and historical tax standing directly with the collector, certify amounts for closing, and flag delinquencies and payoff figures so funds are never short at disbursement.",
    deliverables: [
      {
        name: "Property Tax Search Report",
        definition:
          "Current tax status, amounts, and due dates from the taxing authority.",
      },
      {
        name: "Pre-Closing Tax Certificates",
        definition: "Certified figures suitable for closing and disbursement.",
      },
      {
        name: "County Tax Payoff",
        definition: "The exact amount required to clear outstanding taxes at closing.",
      },
      {
        name: "Delinquent Taxes",
        definition: "Any past-due taxes, penalties, or interest that must be resolved.",
      },
      {
        name: "Tax Collector Verification",
        definition: "Direct confirmation of tax standing with the collector's office.",
      },
    ],
  },
  {
    id: "municipal-lien",
    overview:
      "Comprehensive municipal compliance research covering the exposures that never make it onto the county record. We check with the municipality itself for open code violations, unpaid utilities, permit status, and assessments that can attach to the property after closing.",
    deliverables: [
      {
        name: "Unrecorded Municipal Liens",
        definition:
          "Municipal charges that attach to the property but never appear on the county record.",
      },
      {
        name: "Code Violations",
        definition:
          "Open building or property-code issues that can carry fines or cloud title.",
      },
      {
        name: "Utility Balances",
        definition: "Outstanding water, sewer, or other municipal utility balances.",
      },
      {
        name: "Open & Expired Permits",
        definition: "Permits still open or lapsed that can complicate a sale.",
      },
      {
        name: "Special Assessments",
        definition:
          "Local assessments (for improvements, etc.) levied against the property.",
      },
      {
        name: "Environmental Liens",
        definition: "Environmental charges recorded against the property.",
      },
      {
        name: "Unpaid Utility Fees",
        definition: "Any remaining municipal utility fees owed.",
      },
    ],
  },
];

/**
 * One block per service line, ready to render. The eyebrow and ledger label are
 * composed here rather than in the page so no sentence is assembled in JSX, and
 * so the count corrects itself when a deliverable is added.
 */
export const solutionBlocks = solutionLines.map((line) => {
  const service = services.find((entry) => entry.id === line.id);
  if (!service) {
    throw new Error(`solutions.js: no service in services.js with id "${line.id}"`);
  }

  return {
    ...line,
    number: service.number,
    title: service.title,
    link: service.link,
    eyebrow: `Service ${service.number}`,
    ledgerLabel: `Deliverables (${line.deliverables.length})`,
    countLabel: `${line.deliverables.length} deliverables`,
    headingId: `solution-${line.id}`,
    anchor: `#solution-${line.id}`,
  };
});
