# SEO setup

The code side is done. What remains is account setup — the parts that live in
Google's dashboards rather than in this repository, and the two content
decisions the code deliberately left open.

## 1. Point the domain at one hostname

`https://journalbrokerage.com` is set once, in `site.url` in
[`src/data/seo.js`](src/data/seo.js). Everything — canonicals, the sitemap,
`robots.txt`, Open Graph URLs, every JSON-LD `@id` — is derived from it.

Before launch, confirm two things:

- **The site really answers on that hostname.** A canonical URL pointing at a
  domain the site is not served from is the one SEO mistake that can deindex
  everything, and it fails silently. Worth noting: `.env` sends lead mail from
  `notifications@thejournalbrokerage.com`, which implies _that_ domain is the
  DNS-verified one. If the site lives there instead, change `site.url` and
  nothing else.
- **`www` and non-`www` do not both serve the site.** Pick one and 301-redirect
  the other. Google treats them as two sites and splits the ranking between
  them. On Vercel this is Project → Settings → Domains → set one as primary.

## 2. Google Search Console

1. Add the property at <https://search.google.com/search-console> — choose
   **Domain** if you can edit DNS, otherwise **URL prefix**.
2. For URL-prefix verification, take the token out of the `<meta>` tag Google
   shows you (the `content` value only) and set it as
   `GOOGLE_SITE_VERIFICATION` in `.env.local`. Redeploy, then click Verify.
3. Submit the sitemap: **Sitemaps → `sitemap.xml` → Submit.**
4. **URL Inspection → Request indexing** for the home page and the three
   `/solutions/*` pages. Without this, first indexing can take weeks.

Then leave it alone for two to three weeks. Rankings do not move in days, and
nothing in the console is meaningful until Google has crawled the site at least
once.

## 3. Google Analytics 4

Create a GA4 property, take the measurement ID (`G-XXXXXXXXXX`), and set
`NEXT_PUBLIC_GA_ID` in `.env.local`. Until it is set,
[`Analytics.jsx`](src/components/seo/Analytics.jsx) renders nothing at all — no
script tag, no third-party request.

Link GA4 to Search Console (GA4 → Admin → Search Console links) so query data
and behaviour sit in one place.

## 4. Verify the structured data

With the site deployed, run each page type through both:

- <https://search.google.com/test/rich-results>
- <https://validator.schema.org/>

Check `/` (Organization + WebSite), `/solutions/title-search` (Service with a
nine-item offer catalogue + BreadcrumbList), and `/contact` (ContactPage).

Everything emitted is derived from `src/data/`, so it is true by construction.
Nothing invents a rating, a review, an address or an email — Google penalises
fabricated structured data, and there is nothing to gain from it.

## 5. Google Business Profile — optional

The site is a nationwide B2B service with no public address, so `Organization`
schema is used rather than `LocalBusiness`, and there is no local pack to rank
in. If you later want local visibility, register at
<https://business.google.com> as a **service-area business**, which lets you
hide the street address while still appearing for regional searches. Do not add
a `LocalBusiness` schema or a postal address to the site until a real,
verifiable address exists.

---

## Two content decisions still open

Neither blocks anything, but both are visible to readers as well as to Google.

### The "50 states" claim contradicts `/coverage`

`src/data/promises.js` states `50 — States served`, and `src/data/why-us.js`
expands it to "Research delivered in all fifty states." But `/coverage` names
**19** and marks 7 of those as still expanding, under the heading "Nineteen
states, marked honestly."

Structured data uses the 19 named states plus `Country: United States`, because
that is what the pages actually support. The copy still needs a decision: either
the stat comes down to something `/coverage` backs up, or `/coverage` grows to
match the claim.

### `/contact` still shows placeholder details

`src/data/contact.js` renders `hello@example.com`, `+1 (000) 000-0000`,
`Address line, City, ST 00000` and `example.com`. These are publicly visible
and will be indexed.

The real phone — `(551) 227-7726`, from `src/data/nav.js` — is what the
`Organization` JSON-LD publishes. No email or address is emitted in structured
data, because there is no real one to emit. Send the correct values and they go
into `contactDetails` in one edit.
