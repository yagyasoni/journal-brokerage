import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * True for a URL that leaves this site. Every in-app path starts with "/", so
 * the protocol is the whole test. Link components use it to add the new-tab
 * target and the `rel` that has to accompany one.
 *
 * @param {string} href
 */
export function isExternalHref(href) {
  return /^https?:\/\//i.test(href);
}
