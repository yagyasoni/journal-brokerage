import { absoluteUrl, site } from "@/data/seo";

/**
 * Crawl directives.
 *
 * `/api/` is disallowed because `/api/lead` is a POST-only lead endpoint: it
 * has nothing to index and no reason to be crawled.
 *
 * Pages that should stay out of the index are handled with a `noindex` in
 * their own metadata rather than a `Disallow` here — a disallowed URL can
 * still be indexed from an external link, because a crawler that is not
 * allowed to fetch the page never sees the `noindex` telling it to stay away.
 */
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
