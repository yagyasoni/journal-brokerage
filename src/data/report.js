// @ts-check

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
