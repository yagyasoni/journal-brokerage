// @ts-check

import { routes } from "./nav";
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
    body: "Send us the property, the scope, and the county. We'll confirm receipt and commit to a delivery time before we begin.",
  },
};

/**
 * The furniture of an individual service page — the labels and links that are
 * identical on all three. Only the paragraphs and the ledger change from one
 * page to the next, and those live on the line itself.
 */
export const solutionDetail = {
  stakeHeading: "Why it matters",
  catalogueHeading: "What you can order",
  moreLabel: "The other service lines",
  backLink: { label: "All three service lines", href: routes.solutions },
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
      "Complete ownership and title research, scoped to the file in front of you. From a quick current-owner verification to a full search with a documented chain of title, every abstract is pulled from the official record and checked against source before it reaches you.",
    headline: "Know exactly who holds title — and what's attached to it.",
    stake:
      "A title issue found before closing is a task; found after, it's a claim. We examine the record the way an examiner would — tracing ownership, confirming vesting, and surfacing every lien and encumbrance — so the file you close is the file you think you have.",
    deliverables: [
      {
        name: "Current Owner Search",
        definition:
          "Confirms who currently holds title and how they're vested — the quick check for a listing or refinance.",
        detail:
          "Confirms who currently holds title and how they're vested. The fast, focused check for a listing or refinance, where you need certainty on ownership without a full historical dig.",
      },
      {
        name: "Two-Owner Search",
        definition:
          "Covers the current owner plus the one before — a mid-depth search often used for equity or second-mortgage files.",
        detail:
          "Covers the current owner plus the one immediately before. A mid-depth search often used for equity lines and second-mortgage files, where recent history matters but a full search isn't required.",
      },
      {
        name: "Full Search",
        definition:
          "A complete examination back through the statutory search period, including the full chain of title.",
        detail:
          "A complete examination back through the statutory search period, including the full chain of title. The search relied on for a policy or a clean closing, surfacing every conveyance, lien, and encumbrance of record.",
      },
      {
        name: "Update Search",
        definition:
          "A “bring-down” that refreshes a prior search to the current date right before closing.",
        detail:
          "A “bring-down” that refreshes a prior search to the current date, run right before closing. It catches anything recorded in the gap between the original search and the closing table.",
      },
      {
        name: "Property Report",
        definition:
          "A snapshot of ownership, legal description, and encumbrances for quick reference.",
        detail:
          "A snapshot of ownership, legal description, and recorded encumbrances in one quick-reference document. Useful for early diligence or a fast read before committing to a deeper search.",
      },
      {
        name: "Open Mortgage Search",
        definition:
          "Identifies active, unreleased mortgages and liens recorded against the property.",
        detail:
          "Identifies active, unreleased mortgages and liens still recorded against the property — anything that must be paid off or released before title can pass clean.",
      },
      {
        name: "Deed Search",
        definition: "Locates and reviews the recorded deeds that conveyed the property.",
        detail:
          "Locates and reviews the recorded deeds that conveyed the property, confirming how title moved from party to party and flagging any defect in the instruments.",
      },
      {
        name: "Liens & Judgments Search",
        definition:
          "Surfaces recorded liens, judgments, and other involuntary encumbrances.",
        detail:
          "Surfaces recorded liens, judgments, and other involuntary encumbrances tied to the property or its owners — the exposures that can quietly cloud title if left unresolved.",
      },
      {
        name: "Chain of Title",
        definition:
          "The documented sequence of ownership transfers across the search period.",
        detail:
          "The documented sequence of ownership transfers across the search period. It establishes an unbroken line of title and exposes any gap or break that needs resolving.",
      },
    ],
  },
  {
    id: "property-tax",
    overview:
      "Confirm current and historical tax standing directly with the collector, certify amounts for closing, and flag delinquencies and payoff figures — so funds are never short at disbursement.",
    headline: "No tax surprises at the closing table.",
    stake:
      "Tax data on the county record can lag reality by a cycle or more. We go to the collector's office directly, so the figures on your settlement statement match what's actually owed — down to penalties and interest that haven't yet posted anywhere else.",
    // The only line that does not need a scope: a tax file is the property and
    // the county, and nothing else.
    ctaBody:
      "Send us the property and the county. We'll confirm receipt and commit to a delivery time before we begin.",
    deliverables: [
      {
        name: "Property Tax Search Report",
        definition:
          "Current tax status, amounts, and due dates from the taxing authority.",
        detail:
          "Current tax status, amounts, and due dates confirmed directly with the taxing authority. A clear read on where the property stands before anything is committed at closing.",
      },
      {
        name: "Pre-Closing Tax Certificates",
        definition: "Certified figures suitable for closing and disbursement.",
        detail:
          "Certified tax figures suitable for closing and disbursement. The numbers your settlement can rely on, verified so the closing statement reflects the real obligation.",
      },
      {
        name: "County Tax Payoff",
        definition: "The exact amount required to clear outstanding taxes at closing.",
        detail:
          "The exact amount required to clear outstanding taxes at closing, so the right sum is collected and disbursed with no shortfall discovered after funds have moved.",
      },
      {
        name: "Delinquent Taxes",
        definition: "Any past-due taxes, penalties, or interest that must be resolved.",
        detail:
          "Any past-due taxes, penalties, or interest that must be resolved before title passes clean. We identify the full delinquent balance so it's settled, not inherited by the buyer.",
      },
      {
        name: "Tax Collector Verification",
        definition: "Direct confirmation of tax standing with the collector's office.",
        detail:
          "Direct confirmation of tax standing with the collector's office, not a reading of the county record. Going to the source catches amounts and adjustments the recorded data alone can miss.",
      },
    ],
  },
  {
    id: "municipal-lien",
    overview:
      "Comprehensive municipal compliance research covering the charges a standard title search can't see. We check with the municipality itself for open code violations, unpaid utilities, permit status, and assessments that can attach to the property after closing.",
    headline: "The exposures that never reach the county record.",
    stake:
      "Some of the costliest post-closing surprises are municipal — a code fine, a lapsed permit, an unpaid utility balance that attaches to the property rather than the person. None of it lives on the county record, so we ask the municipality directly and put the answer in front of you before it becomes the new owner's problem.",
    deliverables: [
      {
        name: "Unrecorded Municipal Liens",
        definition:
          "Municipal charges that attach to the property but never appear on the county record.",
        detail:
          "Municipal charges that attach to the property but never appear on the county record. Invisible to a standard title search, they're a frequent source of post-closing surprises — which is exactly why we go to the municipality directly.",
      },
      {
        name: "Code Violations",
        definition:
          "Open building or property-code issues that can carry fines or cloud title.",
        detail:
          "Open building- or property-code issues that can carry fines or cloud title. Surfaced before closing so they can be cured or negotiated, not discovered by the new owner.",
      },
      {
        name: "Utility Balances",
        definition: "Outstanding water, sewer, or other municipal utility balances.",
        detail:
          "Outstanding water and sewer account balances owed on the property. In many municipalities these attach to the property itself, so an unpaid balance becomes the buyer's problem if it isn't caught.",
      },
      {
        name: "Open & Expired Permits",
        definition: "Permits still open or lapsed that can complicate a sale.",
        detail:
          "Permits still open or lapsed that can complicate a sale. Often a signal of unfinished or uninspected work a municipality can later require to be closed out.",
      },
      {
        name: "Special Assessments",
        definition:
          "Local assessments (for improvements, etc.) levied against the property.",
        detail:
          "Local assessments — for improvements and similar municipal projects — levied against the property. These can represent a significant obligation a standard tax search won't show.",
      },
      {
        name: "Environmental Liens",
        definition: "Environmental charges recorded against the property.",
        detail:
          "Environmental charges recorded against the property. They can carry substantial cost and liability, so confirming their presence or absence is essential before closing.",
      },
      {
        name: "Unpaid Utility Fees",
        definition: "Any remaining municipal utility fees owed.",
        detail:
          "One-off municipal service charges beyond standard account balances — final-read fees, connection or disconnection charges, and similar. We account for the full picture so no municipal obligation is left to attach after the sale.",
      },
    ],
  },
];

/**
 * A catalogue name, as an anchor. Derived rather than authored so a new
 * deliverable cannot arrive without one, and so the id and the visible name
 * can never disagree.
 *
 * @param {string} name
 */
const anchorId = (name) =>
  `deliverable-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

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

    /** The service page's own headings, and its closing band. */
    stakeHeadingId: `solution-${line.id}-stake`,
    catalogueHeadingId: `solution-${line.id}-catalogue`,
    ctaHeadingId: `solution-${line.id}-cta`,
    cta: { ...solutionsPage.cta, body: line.ctaBody ?? solutionsPage.cta.body },

    /** Numbered and anchored, so the service page can index its own ledger. */
    deliverables: line.deliverables.map((deliverable, index) => ({
      ...deliverable,
      number: String(index + 1).padStart(2, "0"),
      headingId: anchorId(deliverable.name),
      anchor: `#${anchorId(deliverable.name)}`,
    })),
  };
});

/** The same blocks, keyed by id, for the three pages that each render one. */
export const solutionsById = Object.fromEntries(
  solutionBlocks.map((block) => [block.id, block])
);
