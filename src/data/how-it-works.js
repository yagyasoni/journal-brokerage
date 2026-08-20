// @ts-check

import { routes } from "./nav";
import { stats } from "./promises";
import { steps } from "./steps";

/** The headline figure is read from the stats, never typed again. */
const turnaround = stats.find((stat) => stat.caption === "Typical turnaround");
if (!turnaround) {
  throw new Error('how-it-works.js: promises.js has no "Typical turnaround" stat');
}

/** Everything the /how-it-works page says. */
export const howItWorksPage = {
  eyebrow: "How it works",
  title: "From order to closing-ready in four steps.",
  intro: "A simple, repeatable workflow — so you always know where your file stands.",
  indexLabel: "The sequence",
  turnaroundNote: `${turnaround.value} typical turnaround, order to delivery.`,
  cta: {
    eyebrow: "Get started",
    heading: "Start at step one",
    body: "Send the property, the scope, and the county. We will confirm the turnaround before any work begins.",
  },
};

/**
 * The picture the sequence is walked over: the end of it, not the middle.
 *
 * @type {import("./types").PictureBand}
 */
export const howItWorksBand = {
  image: "/media/band-how-it-works.webp",
  // Already letterboxed at roughly 2:1, and the only band shot square-on to
  // its subject. Given the shallow frame, it needs no crop at all.
  focus: "50% 54%",
  // A letterbox with the copy centred beneath it. This page is a sequence,
  // and centred copy under a symmetrical frame is the only arrangement here
  // that reads as a beginning rather than as an aside.
  variant: "strip",
  alt: "The lit entrance of a modern home at night, steps rising to an open front door.",
  eyebrow: "Where it ends",
  heading: "Four steps, and then the keys",
  body: "The sequence below is deliberately unremarkable — order, research, verify, deliver. It is built to be boring, because the day it stops being boring is the day a closing slips.",
};

export const walkthroughSection = {
  eyebrow: "The walkthrough",
  headingId: "walkthrough",
  heading: "What actually happens to your file",
  intro:
    "The same four steps the landing page names, in full: what we need from you at each one, what happens inside it, and what moves the file to the next.",
};

/**
 * The deep content, keyed to `steps.js` by id.
 * @type {import("./types").StepDetail[]}
 */
const stepDetails = [
  {
    id: "place-the-order",
    detail:
      "Everything starts from three things: the property, the county it sits in, and the scope you want. Bulk and single-file orders run through the same intake — fifty files are handled the way one is, and the turnaround is confirmed against what you actually sent rather than estimated.",
    facts: [
      { label: "You send", value: "Property, county, and scope" },
      { label: "Order size", value: "Single file or bulk" },
    ],
  },
  {
    id: "we-research",
    detail:
      "A specialist works the record itself. Where the instrument lives — the county recorder, the municipality, the state repository — is where it is read from, rather than a secondary source. Anything ambiguous is traced back to the document that created it before it goes any further.",
    facts: [
      { label: "Read from", value: "County, municipal, and state records" },
      { label: "Worked by", value: "Research specialists" },
    ],
  },
  {
    id: "quality-review",
    detail:
      "Nothing is released on a single pass. Every figure, name, and legal description is checked back against the instrument it came from, under the Six Sigma standard — applied to every report rather than to a sample of them.",
    facts: [
      { label: "Applied to", value: "Every report" },
      { label: "Standard", value: "Six Sigma" },
    ],
    link: { label: "How the standard is held", href: routes.whyUs },
  },
  {
    id: "delivered-on-time",
    detail:
      "The finished report arrives inside the window agreed at intake, with the verification block on the front — formatted so your closer can act on it without a second call.",
    facts: [
      { label: "Typical turnaround", value: turnaround.value, mono: true },
      { label: "Arrives as", value: "Closing-ready report" },
    ],
    link: { label: "See what lands in your file", href: routes.sampleReport },
  },
];

/** The four steps, each carrying its annotation. */
export const walkthroughSteps = steps.map((step) => {
  const detail = stepDetails.find((entry) => entry.id === step.id);
  if (!detail) {
    throw new Error(`how-it-works.js: no detail for step id "${step.id}"`);
  }

  return {
    ...step,
    detail: detail.detail,
    facts: detail.facts,
    link: detail.link,
    stepLabel: `Step ${step.number}`,
    headingId: `step-${step.id}`,
    anchor: `#step-${step.id}`,
  };
});
