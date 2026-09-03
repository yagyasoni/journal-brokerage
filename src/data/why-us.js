// @ts-check

import { promises, stats } from "./promises";

/**
 * Everything the `/why-us` page says.
 *
 * The landing page states the three promises and the four numbers. This page
 * owns the expanded case behind them and the quality method itself, so nothing
 * here repeats a sentence from `promises.js` — it is read in and built on.
 */
export const whyUsPage = {
  eyebrow: "Why Journal Brokerage",
  title: "Authentic data, delivered on time.",
  intro:
    "Outsourcing research is a trust decision before it is a price decision. At Journal Brokerage, we understand that reliable data is only valuable when it is accurate, timely, and protected. That is why every file we deliver is backed by clear commitments, disciplined research methods, and a security-first approach to data handling.",
  numbersLabel: "By the numbers",
  cta: {
    eyebrow: "Get started",
    heading: "Put the standard to work on a file",
    body: "Send one order and judge the result. We will confirm receipt, commit to a delivery time, and meet it.",
  },
};

/**
 * The picture the argument is made over. Nothing here restates a promise from
 * `promises.js` — it names what the three of them are ultimately for.
 *
 * @type {import("./types").PictureBand}
 */
export const whyUsBand = {
  image: "/media/band-why-us.webp",
  // Cropped low, onto the wet drive: the reflections are the part of this
  // frame that no other band has.
  focus: "46% 76%",
  // Split down the middle. The page is an argument, and setting the picture
  // against the argument rather than under it is the point.
  variant: "split",
  alt: "A large contemporary residence at dusk, every room lit and the drive still wet from rain.",
  eyebrow: "What is riding on it",
  heading: "Someone is closing on this tomorrow",
  body: "Behind every file is a family, a lender, and a date that has already been set. That is the whole reason the standard below exists — and the reason we would rather hold a file an hour longer than send it out unverified.",
};

export const promisesSection = {
  eyebrow: "The commitments",
  headingId: "why-promises",
  heading: "Three commitments, and what each one costs us",
  intro:
    "A promise is only worth the procedure behind it. Each of the three below is stated first as we state it everywhere, then in the terms that actually govern a file.",
};

/**
 * @type {import("./types").PromiseDetail[]}
 */
const promiseDetails = [
  {
    id: "precision",
    detail:
      "Exactness is a procedure, not an intention. Names, legal descriptions, parcel identifiers, and recording data are each checked back against the instrument they came from, so an error has to survive a deliberate comparison to reach your file.",
    practice: [
      "Every figure traced back to its recording data",
      "Legal descriptions matched against the source instrument",
      "Nothing released until it reconciles against source",
    ],
  },
  {
    id: "authenticity",
    detail:
      "The record is the only acceptable source. Research is taken from the official county, municipal, and state repositories that hold the instrument itself — so what reaches your file is what was actually recorded, not a copy of a copy.",
    practice: [
      "Pulled from official county, municipal, and state records",
      "Verified against the originating instrument",
      "Findings you can stand behind on the file",
    ],
  },
  {
    id: "accuracy-on-schedule",
    detail:
      "The turnaround you commit to your client becomes the turnaround we commit to you. Delivery time is agreed before work begins and the review pass happens inside that window — speed is planned for, never bought back out of the quality check.",
    practice: [
      "Delivery time committed at intake",
      "Review completed inside the committed window",
      "Quality never traded away for speed",
    ],
  },
];

/** The three promises, each carrying its deep content. */
export const whyPromises = promises.map((promise, index) => {
  const detail = promiseDetails.find((entry) => entry.id === promise.id);
  if (!detail) {
    throw new Error(`why-us.js: no detail for promise id "${promise.id}"`);
  }

  return {
    ...promise,
    detail: detail.detail,
    practice: detail.practice,
    number: String(index + 1).padStart(2, "0"),
    headingId: `promise-${promise.id}`,
  };
});

/**
 * @type {import("./types").StatDetail[]}
 */
const numberDetails = [
  {
    caption: "Quality standard",
    definition: "The Six Sigma quality standard, applied to every report we deliver.",
  },
  { caption: "Typical turnaround", definition: "From order placed to report delivered." },
  {
    caption: "States served",
    definition: "Research delivered in all forty seven states.",
  },
  {
    caption: "Source verified",
    definition: "Every report checked against the originating record.",
  },
];

/** The four headline figures, each with the sentence the landing page omits. */
export const whyNumbers = stats.map((stat) => {
  const detail = numberDetails.find((entry) => entry.caption === stat.caption);
  if (!detail) {
    throw new Error(`why-us.js: no definition for stat caption "${stat.caption}"`);
  }

  return { ...stat, definition: detail.definition };
});

/**
 * The quality method. Deliberately not the order flow — `steps.js` already
 * owns that for `/how-it-works`. This is what happens inside its third step.
 */
export const method = {
  eyebrow: "The method",
  headingId: "why-method",
  heading: "How the standard is held",
  intro:
    "“Quality review” is one line on the order flow. This is what it actually consists of, and it runs on every report rather than on a sample of them.",
};

/** @type {import("./types").Step[]} */
export const methodSteps = [
  {
    id: "pulled-from-the-record",
    number: "01",
    icon: "Landmark",
    title: "Pulled from the record",
    body: "Research is taken from the official repository that holds the instrument — county, municipal, or state.",
  },
  {
    id: "reconciled-against-source",
    number: "02",
    icon: "Crosshair",
    title: "Reconciled against source",
    body: "Every name, figure, and legal description is checked back against the document it came from.",
  },
  {
    id: "reviewed-for-exactness",
    number: "03",
    icon: "ShieldCheck",
    title: "Reviewed for exactness",
    body: "A review pass under the Six Sigma standard, applied to every report rather than a sample.",
  },
  {
    id: "released-on-the-clock",
    number: "04",
    icon: "Clock",
    title: "Released on the clock",
    body: "Nothing leaves until it reconciles — and nothing leaves after the committed window.",
  },
];
