// @ts-check

import { routes } from "./nav";

/**
 * Landing-page overview only — one paragraph per line of business.
 * Deliverable ledgers live on the individual solution pages.
 * @type {import("./types").Service[]}
 */
export const services = [
  {
    id: "title-search",
    number: "01",
    icon: "Search",
    title: "Title Search Solutions",
    body: "Ownership, deed, mortgage, and lien research — from current-owner checks to full chain-of-title abstracts.",
    image: "/media/service-title-search.webp",
    alt: "A single-family residence at dusk, its entrance and drive lit.",
    link: { label: "Explore title searches", href: routes.titleSearch },
  },
  {
    id: "property-tax",
    number: "02",
    icon: "FileText",
    title: "Property Tax Solutions",
    body: "Tax search reports and pre-closing certificates that surface delinquencies and payoff amounts before they derail a deal.",
    image: "/media/service-property-tax.webp",
    alt: "A multifamily residential building at dusk, balconies lit floor by floor.",
    link: { label: "Explore tax services", href: routes.propertyTax },
  },
  {
    id: "municipal-lien",
    number: "03",
    icon: "Landmark",
    title: "Municipal Lien Solutions",
    body: "Unrecorded liens, code violations, and permit checks — the off-record exposures that standard title searches miss.",
    image: "/media/service-municipal-lien.webp",
    alt: "A commercial office building at dusk, its glass frontage lit from within.",
    link: { label: "Explore municipal searches", href: routes.municipalLien },
  },
];
