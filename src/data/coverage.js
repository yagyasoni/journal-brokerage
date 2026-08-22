// @ts-check

/**
 * The forty seven core states. The landing page lists these names only; the full
 * grid, the expanding tier, and the legend belong to /coverage.
 * @type {string[]}
 */
export const coreStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maryland",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
// [
//   "Florida",
//   "Texas",
//   "New York",
//   "New Jersey",
//   "Georgia",
//   "North Carolina",
//   "South Carolina",
//   "Maryland",
//   "Virginia",
//   "Tennessee",
//   "Alabama",
//   "Delaware",
// ];

/**
 * States we are actively moving into. Named separately and marked differently
 * on purpose — an honest "expanding" reads better than an over-claimed "core".
 * @type {string[]}
 */
export const expandingStates = ["Maine", "Massachusetts", "Pennsylvania"];

/**
 * Every US state, alphabetical. The named tiers above are subsets of this —
 * use it for the "anywhere else, ask" case, never to imply core coverage.
 * @type {string[]}
 */
export const allStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maryland",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

/** 50. Derived, so it cannot fall out of step with the list. */
export const allStatesCount = allStates.length;

/**
 * The six regions the coverage is actually spoken about in — "the Southeast
 * and Mid-Atlantic", "the West and Midwest" — so the states can be read as a
 * directory rather than as one alphabetical run of forty seven names.
 *
 * Membership is stated once, here, and every state belongs to exactly one
 * region. The tiers below are filtered back out of `coreStates` and
 * `expandingStates`, so a state can neither be counted twice nor go missing
 * when a name moves between tiers.
 * @type {{id: string, label: string, states: string[]}[]}
 */
const regionMembership = [
  {
    id: "southeast",
    label: "Southeast",
    states: [
      "Alabama",
      "Arkansas",
      "Florida",
      "Georgia",
      "Kentucky",
      "Louisiana",
      "Mississippi",
      "North Carolina",
      "South Carolina",
      "Tennessee",
    ],
  },
  {
    id: "mid-atlantic",
    label: "Mid-Atlantic",
    states: [
      "Delaware",
      "Maryland",
      "New Jersey",
      "Pennsylvania",
      "Virginia",
      "West Virginia",
    ],
  },
  {
    id: "northeast",
    label: "Northeast",
    states: [
      "Connecticut",
      "Maine",
      "Massachusetts",
      "New Hampshire",
      "New York",
      "Rhode Island",
      "Vermont",
    ],
  },
  {
    id: "midwest",
    label: "Midwest",
    states: [
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Michigan",
      "Minnesota",
      "Missouri",
      "Nebraska",
      "North Dakota",
      "Ohio",
      "South Dakota",
      "Wisconsin",
    ],
  },
  {
    id: "southwest",
    label: "Southwest",
    states: ["Arizona", "New Mexico", "Oklahoma", "Texas"],
  },
  {
    id: "west",
    label: "West",
    states: [
      "Alaska",
      "California",
      "Colorado",
      "Hawaii",
      "Idaho",
      "Montana",
      "Nevada",
      "Oregon",
      "Utah",
      "Washington",
      "Wyoming",
    ],
  },
];

/**
 * The same six regions with each tier resolved. `core` and `expanding` are
 * derived, never typed, so the region ledger on the landing page and the
 * tiles on /coverage always agree with the two lists at the top of this file.
 * @type {import("./types").StateRegion[]}
 */
export const stateRegions = regionMembership.map((region) => ({
  id: region.id,
  label: region.label,
  states: region.states,
  core: region.states.filter((state) => coreStates.includes(state)),
  expanding: region.states.filter((state) => expandingStates.includes(state)),
}));

/**
 * The landing teaser's own ledger foot. Both figures are counted from the tier
 * lists, so the summary under the regions cannot drift from the regions above
 * it — or from the figures on /coverage.
 */
export const landingCoverage = {
  figures: [
    // `tier` is what the foot's swatch is drawn from, so the two marks under
    // the map are the same two marks on it.
    { tier: "core", value: String(coreStates.length), caption: "Core states" },
    { tier: "expanding", value: String(expandingStates.length), caption: "Expanding" },
  ],
  footnote: "Nationwide on request",
};

/** The page's own framing copy. */
export const coveragePage = {
  eyebrow: "Geographic coverage",
  title: "Deep in the states you close in.",
  intro: [
    "Our team has hands-on experience across the Southeast and Mid-Atlantic, with established coverage spanning 47 U.S. states. We are actively expanding into the West and Midwest, extending our reach into the remaining three.",
    "Wherever the record lives, we know how to reach it — with the local knowledge, jurisdictional familiarity, and research expertise needed to navigate records efficiently across the U.S.",
  ],
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
  heading: "forty seven states, marked honestly",
  intro:
    "Filled states are core coverage. States outlined in gold are the ones we are actively expanding into. Hover any state to name it. The distinction is deliberate — it tells you what to expect before you send the file, not after.",
  regionsLabel: "By region",
};

export const reachSection = {
  eyebrow: "Everywhere else",
  headingId: "coverage-reach",
  heading: "A state that isn’t on the list",
  body: `The ${coreStates.length + expandingStates.length} states above are the ones we name. Anywhere else, ask rather than assume — tell us the county, and we will confirm what we can reach and what the turnaround would be before you commit the file.`,
  linkLabel: "Ask about a county",
};
