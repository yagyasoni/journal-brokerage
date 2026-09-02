import { routes } from "@/data/nav";
import { absoluteUrl, noindexedPaths } from "@/data/seo";

/**
 * The sitemap, derived from `routes` rather than hand-listed — a route renamed
 * in `nav.js` cannot leave a dead URL here, and a route added there appears
 * without anyone remembering to add it.
 *
 * The `Set` is load-bearing: `routes.order` and `routes.contact` both resolve
 * to `/contact`, and the same URL twice in a sitemap is a validation warning.
 */

/** Shallower pages are more important; the ones that sell rank highest. */
const priorityFor = (path) => {
  if (path === routes.home) return 1;
  if (path.startsWith(`${routes.solutions}/`)) return 0.9;
  if (path === routes.solutions || path === routes.contact) return 0.9;
  return 0.7;
};

export default function sitemap() {
  // Static marketing copy: the build is the last time any of it changed.
  const lastModified = new Date();

  return [...new Set(Object.values(routes))]
    .filter((path) => !noindexedPaths.includes(path))
    .sort()
    .map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "monthly",
      priority: priorityFor(path),
    }));
}
