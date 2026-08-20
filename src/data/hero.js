// @ts-check

import { brand, routes } from "./nav";

/**
 * The landing page's opening frame.
 *
 * The photograph replaced the looping footage that used to sit here: a still
 * costs a fraction of the bytes, and a long slow push in reads as footage
 * anyway. The copy stack is set against the left edge of the measure, where
 * the frame is darkest and the house is not.
 *
 * @type {import("./types").HomeHero}
 */
export const homeHero = {
  eyebrow: brand.distinction,
  heading: "Source-verified property intelligence",
  body: "Title, tax, and municipal lien research — delivered closing-ready.",
  image: "/media/hero-residence.webp",
  action: { label: "Order a search", href: routes.order },
  marks: ["Source verified", "Six Sigma standard", "Fast turnaround", "Closing-ready"],
};
