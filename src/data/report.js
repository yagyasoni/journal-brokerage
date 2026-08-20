// @ts-check

import { routes } from "./nav";

/** The hero "Abstract of Title" card — a single representative file. */
export const abstractFile = {
  documentTitle: "Abstract of Title",
  fileNumber: "№ JB-40217",
  sealText: { top: "Journal Brokerage", bottom: "Certified" },
  qaStatus: "QA Passed · Verified",
  /** @type {import("./types").ReportRow[]} */
  rows: [
    {
      label: "Property",
      value: "124 Maple Avenue",
      note: "Orlando, Orange County, FL 32801",
    },
    { label: "Parcel", value: "29-22-30-1234-05-060", mono: true },
    { label: "Prepared for", value: "Meridian Title Partners" },
    { label: "Scope", value: "Full Search · Two-Owner · Municipal Lien" },
    { label: "Turnaround", value: "24 hours", note: "received 08:12 · delivered 09:47" },
  ],
};

/** The sample-report proof card. */
export const sampleFile = {
  documentTitle: "Full Title Search",
  badge: "Verified",
  subline: "Report № JB-40217 · Orange County, FL",
  /** @type {import("./types").ReportRow[]} */
  rows: [
    { label: "Vested owner", value: "Harlan & Reeve, LLC" },
    { label: "Deed", value: "Warranty · Bk 8842 / Pg 119" },
    { label: "Open mortgage", value: "$412,000 · recorded 2021" },
    { label: "Liens / judgments", value: "None of record", verified: true },
    { label: "Property taxes", value: "Paid through 2025", verified: true },
    { label: "Municipal liens", value: "None found", verified: true },
    { label: "Chain of title", value: "30-yr · complete", verified: true },
    { label: "Status", value: "Closing-ready", verified: true },
  ],
};

/**
 * The status line is quoted in the copy below, so it is read out of the card
 * rather than typed a second time.
 */
const statusRow = sampleFile.rows.find((row) => row.label === "Status");
if (!statusRow) {
  throw new Error('report.js: sampleFile has no "Status" row');
}

/** Everything the /sample-report page says. */
export const sampleReportPage = {
  eyebrow: "Sample report",
  title: "See exactly what lands in your file.",
  intro:
    "Clean layout, plain findings, and a verification block on every report — formatted so your closer can act on it without a second call. Preview the structure, then order the real thing.",
  previewLabel: "Findings block, as delivered",
  cta: {
    eyebrow: "Get started",
    heading: "Order the real thing",
    body: "Send the property, the scope, and the county. What comes back looks exactly like the block above, with your file's findings in it.",
  },
};

/**
 * The primary action wants a real file behind it. Until `public/` carries a
 * sample PDF this asks for the report rather than promising a download that
 * 404s — change the label and the href together, never one without the other.
 *
 * The action beside it is `CallSpecialist`, which opens a dialog rather than
 * navigating, so its label lives with the rest of that dialog's copy in
 * `./contact`.
 *
 * @type {import("./types").NavLink[]}
 */
export const sampleReportActions = [
  { label: "Request the sample report", href: routes.contact },
];

export const anatomySection = {
  eyebrow: "What the preview shows",
  headingId: "report-anatomy",
  heading: "Three blocks, and nothing else",
  intro:
    "A report is a working document, not a presentation. Every page is one of these three blocks, in this order, every time — so your team learns the shape once.",
};

/** @type {import("./types").ReportPart[]} */
export const reportParts = [
  {
    id: "header",
    number: "01",
    title: "Report header",
    body: "The report type, its number, and the county, carried with the verification stamp — enough to file it correctly without opening the body.",
  },
  {
    id: "findings",
    number: "02",
    title: "Findings",
    body: "Vested owner, deed reference, open mortgage, liens and judgments, property taxes, municipal liens, and chain of title. Stated once, in plain terms, with no interpretation left to you.",
  },
  {
    id: "status",
    number: "03",
    title: "Verification and status",
    body: `Anything reconciled against source is marked as verified, and the block closes on a single status line — “${statusRow.value}” when the file is clear.`,
  },
];

export const fileRecordSection = {
  eyebrow: "The file record",
  headingId: "file-record",
  heading: "Every report is issued against a record",
  body: "The property, the parcel identifier, who it was prepared for, the scope that was ordered, and the turnaround it was actually delivered in. It is what lets a report be matched back to its order months later without a phone call.",
};
