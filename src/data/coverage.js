// @ts-check

/**
 * The twelve core states. The landing page lists these names only; the full
 * grid, the expanding tier, and the legend belong to /coverage.
 * @type {string[]}
 */
export const coreStates = [
  "Florida",
  "Texas",
  "New York",
  "New Jersey",
  "Georgia",
  "North Carolina",
  "South Carolina",
  "Maryland",
  "Virginia",
  "Tennessee",
  "Alabama",
  "Delaware",
];

/**
 * States we are actively moving into. Named separately and marked differently
 * on purpose — an honest "expanding" reads better than an over-claimed "core".
 * @type {string[]}
 */
export const expandingStates = [
  "Arizona",
  "California",
  "Colorado",
  "Nevada",
  "Ohio",
  "Pennsylvania",
  "Illinois",
];

/** The page's own framing copy. */
export const coveragePage = {
  eyebrow: "Geographic coverage",
  title: "Deep in the states you close in.",
  intro:
    "Our team already has hands-on experience across the Southeast and Mid-Atlantic, with active expansion into the West and Midwest. Wherever the record lives, we know how to reach it.",
  figuresLabel: "At a glance",
  footnote: "Nationwide on request.",
  cta: {
    eyebrow: "Get started",
    heading: "Tell us the county",
    body: "Send the property and the scope. If it sits in a state we are still building out, we will say so before you commit the file.",
  },
};

/**
 * The picture the reach is stated over.
 *
 * @type {import("./types").PictureBand}
 */
export const coverageBand = {
  image: "/media/band-coverage.webp",
  // The one band with a skyline in it: cropped high and right so the lit
  // towers stay in frame, which is what makes this page's picture read as
  // downtown rather than as another dusk exterior.
  focus: "60% 20%",
  // Hung as a tall print on a light wall — the only band on paper, and the
  // only one where the photograph is an object on the page rather than the
  // page itself. A skyline is the one frame here that survives being cropped
  // to a portrait.
  variant: "portal",
  alt: "A corner office and residential building at dusk, downtown towers lit behind it.",
  eyebrow: "Where we work",
  heading: "Every county keeps its record differently",
  body: "A recorder's office in Florida and one in New Jersey do not file, index, or release the same way. Coverage is not a map — it is knowing, county by county, exactly who to ask and what they will hand over.",
};

/** Derived from the two lists, so the counts cannot fall out of step. */
export const coverageFigures = [
  {
    value: String(coreStates.length),
    caption: "Core states",
    definition: "Established coverage — the states our research runs through most often.",
  },
  {
    value: String(expandingStates.length),
    caption: "Expanding",
    definition: "Live and accepting orders, with our depth in them still growing.",
  },
];

/** @type {import("./types").StateGroup[]} */
export const stateGroups = [
  {
    id: "core",
    label: "Core coverage",
    description:
      "Day-to-day work, with established access to the county and municipal offices that hold the record.",
    states: coreStates,
  },
  {
    id: "expanding",
    label: "Expanding",
    description:
      "Open for orders now. We are still building the same depth here that the core states already have.",
    states: expandingStates,
  },
];

export const gridSection = {
  eyebrow: "The map, in full",
  headingId: "coverage-grid",
  heading: "Nineteen states, marked honestly",
  intro:
    "Filled tiles are core coverage. Outlined tiles are states we are actively expanding into. The distinction is deliberate — it tells you what to expect before you send the file, not after.",
};

export const reachSection = {
  eyebrow: "Everywhere else",
  headingId: "coverage-reach",
  heading: "A state that isn’t on the list",
  body: `The ${coreStates.length + expandingStates.length} states above are the ones we name. Anywhere else, ask rather than assume — tell us the county, and we will confirm what we can reach and what the turnaround would be before you commit the file.`,
  linkLabel: "Ask about a county",
};
