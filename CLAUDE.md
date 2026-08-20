# Journal Brokerage — agent contract

Next.js 15 App Router · **JSX only** (no `.ts`/`.tsx`) · Tailwind v4 · shadcn/ui on Base UI · cva · lucide-react.

Derived from the Engineering Handbook (rev. 1), verified against this repository. Where the two disagree, **this file wins** — see [Corrections](#corrections-to-handbook-rev-1) at the bottom.

State today: 13 routes, **11 built pages**, **2 `PagePlaceholder` routes** (`/order`, `/request-consultation`), plus a hand-built `not-found.jsx`.

## Read first

- `src/app/globals.css` — the `@theme` token block and the type system. **The authoritative source for both.**
- `src/components/shared/SectionShell.jsx` — the page rhythm.
- `src/data/nav.js` — `routes`, `brand`, `primaryNav`, `footerNav`, `primaryCta`, `secondaryCta`.
- `src/data/types.js` — every JSDoc typedef.
- `README.md` — orientation only. Its font table is **stale** (see correction 7).

## The four invariants

Each is load-bearing. Breaking one makes a page look like it belongs to a different site.

1. **One type system, five classes.** `type-display` · `type-heading` · `type-title` · `type-statement` · `type-label`, plus `tnum` on column-aligned figures. A call site sets **colour and spacing only** — `className="type-heading mt-7 text-ink"`. Never inline a size/weight/`tracking-*`/`uppercase` onto them; never add a sixth class.
   **DM Sans is the only family.** `font-serif` and `font-mono` are undefined and fall back to a system face.
2. **No raw hex in JSX.** Token classes only. Gold text is `gold-deep` on light and `gold-light` on navy; plain `gold` is for rules, icons and large numerals (it fails WCAG AA as small text). Separate with hairlines (`border-rule`), never shadows.
3. **Routes come from `routes` in `src/data/nav.js`.** Never type a path inline — not in a link, not in a sitemap, not in a canonical URL.
4. **Copy lives in `src/data/`.** Those files carry `// @ts-check` + typedefs from `types.js`. Component files deliberately do **not**.
   `jsconfig.json` sets `checkJs: false`, so the per-file `// @ts-check` pragma is the _only_ thing that puts a file under `pnpm typecheck`.

## Body copy

No class. Use exactly these four, invent no fifth:

| Use                         | Class                         |
| --------------------------- | ----------------------------- |
| Section intro               | `text-[17px] leading-[1.7]`   |
| Card / step body            | `text-[15.5px] leading-[1.7]` |
| Record values, footer links | `text-[14.5px]`               |
| Sub-notes                   | `text-[12.5px]`               |

## Reuse before you build — with real import paths

| Component                                                          | Path                                 | Signature                                                                                                                                               |
| ------------------------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SectionShell`, `Container`                                        | `@/components/shared/SectionShell`   | `tone="white\|paper\|navy\|navyDeep"`, `size="default\|opening\|screen\|compact\|flush"`, `bleed`, `reveal`, `labelledBy`, `as`, `id`, `innerClassName` |
| `CTABand`                                                          | `@/components/sections/CTABand`      | `{ eyebrow, heading, body, primary, secondary?, headingId }` — renders `navyDeep` + `h2.type-display`                                                   |
| `ProcessSteps`                                                     | `@/components/sections/ProcessSteps` | `{ steps, tone="light\|navy" }` — **not** in `shared/`                                                                                                  |
| `RecordRow`                                                        | `@/components/shared/RecordRow`      | `{ label, value, note?, mono?, verified? }`                                                                                                             |
| `StatTile`, `StatStrip`                                            | `@/components/shared/StatTile`       | `{ value, caption }` / `{ children }`                                                                                                                   |
| `Chip`, `ChipRow`                                                  | `@/components/shared/Chip`           | `variant="outline\|solid\|muted"`                                                                                                                       |
| `PictureBand`                                                      | `@/components/shared/PictureBand`    | `{ band, headingId }` — dispatches on `band.variant`; see [The band system](#the-band-system)                                                           |
| `Eyebrow`                                                          | `@/components/shared/Eyebrow`        | `{ tone="light\|navy", align="start\|center" }`                                                                                                         |
| `ArrowLink`                                                        | `@/components/shared/ArrowLink`      | `{ href, tone="light\|navy" }`                                                                                                                          |
| `ButtonLink`                                                       | `@/components/shared/ButtonLink`     | `variant="gold\|outlineNavy\|outlineLight"`, `size="pill\|heroPill\|navCta"`                                                                            |
| `AbstractCard`, `ReportCard`, `CertifiedSeal`, `Marquee`, `Reveal` | `@/components/shared/…`              | —                                                                                                                                                       |

Every CTA navigates, so buttons are always `ButtonLink`. New variants go in the `cva` in `src/components/ui/button.jsx`, never inline.
Icons are stored in data as **names** and resolved via `getIcon()` (`src/lib/icons.js`, 9 registered, falls back to `Search`). Register a new icon there and in the `IconName` typedef first.

## The band system

**A page is a stack of screens, and no measurement is a number in JSX.** Every
size on the site derives from four tokens in `globals.css`:

| Token                             | Is                                                      | Used by                                                      |
| --------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| `--nav-h`                         | The sticky bar's _whole_ height — hairline, row, border | the hero's negative margin, `--screen`, `scroll-padding-top` |
| `--screen`                        | `100svh - var(--nav-h)` — one screen below the bar      | `.band`, the minimum height of every section                 |
| `--band-pad` / `--band-pad-tight` | Fluid air inside a band                                 | `size="default"` / `size="opening"`                          |
| `--gutter`, `--measure`           | Fluid gutter and capped text measure                    | `Container`                                                  |

`.band` is `min-height: var(--screen)` plus a centring flex column, so a scroll
comes to rest on a whole section rather than on the seam between two —
`scroll-snap-type: y proximity` on `html` does the settling, `proximity` so a
long band can still be read at any pace. `min-height`, never `height`: a band
with more content than fits simply grows.

Consequences worth knowing before you edit:

- **Never write an `h-[NNNpx]` or `min-h-[NNrem]`.** Heights are `svh`
  fractions, `--screen`, or content. `svh` — not `vh` — so a phone's
  collapsing address bar does not cut the last line off.
- **`--nav-h` is measured, not guessed.** It is 70px / 74px because that is
  what `Nav` actually renders. Change the bar's row height and this changes
  with it, or every band's bottom edge misses the fold.
- **Do not override `.band`'s `flex-direction` from a breakpoint.** `.band` and
  `lg:flex-row` are both utilities, so which wins is a source-order coin toss.
  Nest a `flex flex-1` row inside the band instead — `PictureBand`'s `split`
  shows the pattern.
- The five interior photographs each get **their own arrangement**, keyed by
  `variant` in the page's data file: `cinema` (`/solutions`), `split`
  (`/why-us`), `portal` (`/coverage`), `strip` (`/how-it-works`), `frame`
  (`/industries`). They are all the same dusk exterior genre — the arrangement,
  not the crop, is what stops them reading as one picture five times. One
  variant per page; never reuse one.

## The canonical section — copy this shape

```jsx
<SectionShell tone="paper" labelledBy="x-heading">
  <div className="max-w-2xl">
    <Eyebrow>Short label</Eyebrow>
    <h2 id="x-heading" className="type-heading mt-7 text-ink">
      Heading
    </h2>
    <p className="mt-7 text-[17px] leading-[1.7] text-slate">Intro.</p>
  </div>
  {/* content: real <ul>/<ol>, rows split by `border-b border-rule`, never bullets */}
  <ArrowLink href={routes.x} className="mt-10">
    Go deeper
  </ArrowLink>
</SectionShell>
```

One `<h1 className="type-heading">` per page. Section headings are `h2`; items inside a section are `<h3 className="type-title">`. `type-display` is reserved for the home hero and the closing CTA band. Decorative spans, rules and arrows get `aria-hidden="true"`.

## Replacing a placeholder

Content first, arrangement second. **Not a single sentence goes in the JSX.**

1. Add the `@typedef` to `src/data/types.js` — reuse or extend an existing shape rather than adding a near-duplicate (`ReportRow` already covers `{label, value, note?, mono?, verified?}`).
2. Create `src/data/pages/<route>.js` (`// @ts-check`, annotated with that typedef) holding every visible string. One file per page; keep the flat files for anything 2+ pages share.
3. **Extend the source, never fork it.** Where a page overlaps the landing page (title, summary), add fields to the existing entry in `services.js` / `steps.js` / `promises.js`. The same sentence must never exist in two files.
4. Rewrite `src/app/<route>/page.jsx` as `SectionShell` bands — alternate `tone="white"` / `tone="paper"`, at most one `tone="navy"`, close with `<CTABand>`.
5. Remove the `PagePlaceholder` import **manually** — lint will not catch it (correction 9). Leave `PagePlaceholder.jsx` in place until the last placeholder route is gone.

A new arrangement used on 2+ pages goes in `src/components/shared/`; a one-page layout goes in `src/components/sections/`.

### Who owns which content

`/` is a teaser that hands off via `ArrowLink`; depth on `/` is the one way to make the site feel cheap.

| Source          | Owned in full by                                         |
| --------------- | -------------------------------------------------------- |
| `services.js`   | `/solutions/*` — deliverable ledgers, scope, turnarounds |
| `steps.js`      | `/how-it-works`                                          |
| `promises.js`   | `/why-us`                                                |
| `coverage.js`   | `/coverage`                                              |
| `industries.js` | `/industries`                                            |
| `report.js`     | `/sample-report`                                         |
| —               | `/contact`, `/order`, `/request-consultation` — forms    |

## The SEO layer

SEO here is a **data** concern. It must not touch `src/components/sections/`, `globals.css`, or any `type-*` class. **A correct SEO change has a zero-pixel visual diff.**

Not yet built: `src/data/seo.js`, `src/app/sitemap.js`, `src/app/robots.js`, `src/components/seo/JsonLd.jsx`.

- `src/data/seo.js` holds `site.url`, the organisation profile, `pageMetadata({title, description, path})` and the JSON-LD builders. Move the hardcoded `https://journalbrokerage.com` out of `layout.jsx` into `site.url` first — everything depends on it existing in exactly one place.
- The sitemap derives from `Object.values(routes)` — never hand-list a path.
- **Live bug:** only the root defines `openGraph`, so every child page currently inherits the home page's OG title.
- Structured data must be **true of the page**: `Organization` on `/`, `Service` on the three `/solutions/*`, `BreadcrumbList` on nested routes, built from `services.js` + `nav.js`. Never invent an `aggregateRating`, review, address or phone number.

## Done when

```bash
pnpm lint && pnpm typecheck && pnpm build   # all pass
pnpm format                                  # leaves no diff
```

Plus: no new hex in `src/**/*.jsx`; no new `text-[NNpx]` outside the four sizes; no `font-bold`/`font-serif`/`font-mono`; every heading carries a `type-*` class; exactly one `<h1>`; every visible string came from `src/data/`; every path came from `routes`; reads correctly at 375px, 768px and 1440px and with reduced motion enabled.

There is no test framework — the commands above are the entire verification surface. Use `pnpm` (a `pnpm-lock.yaml` is committed; an untracked `package-lock.json` is stray).

## Corrections to handbook rev. 1

Verified against source. Do not act on the handbook's version of these.

| #   | Handbook / README says                                                     | Reality                                                                                                                                                                                     |
| --- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | "All thirteen routes already export `metadata`"                            | **Twelve.** `src/app/page.jsx` has none — `/` inherits the layout default. The SEO task must **add** one for `/`, not convert it.                                                           |
| 2   | Add `hero-poster.jpg` and video files to `public/media/`                   | Already there. Still outstanding: the unreferenced `public/*.svg` starter assets (`next`, `vercel`, `window`, `file`, `globe`).                                                             |
| 3   | `ProcessSteps` grouped with `shared/`                                      | It is `@/components/sections/ProcessSteps`.                                                                                                                                                 |
| 4   | layout "sets a theme colour" (implying `metadata`)                         | It is in the separate `viewport` export — correct for Next 15. Do not "fix" it.                                                                                                             |
| 5   | Worked example adds a `Deliverable` typedef                                | Duplicates the existing `ReportRow`. Extend that instead — the handbook's own example breaks its own "extend the source, never fork it" rule.                                               |
| 6   | Worked example imports `routes` in the rewritten page                      | Unused there. Omit unless the page actually links somewhere.                                                                                                                                |
| 7   | README: "Libre Caslon headings, IBM Plex Sans body, IBM Plex Mono"         | **Stale — describes the previous design.** The site is DM Sans only (`layout.jsx`, `--font-sans` in `globals.css`). The handbook is right; README is wrong.                                 |
| 8   | Handbook cites README's `### Type` section                                 | README has no `###` headings at all. The type system lives only in `globals.css`.                                                                                                           |
| 9   | "Leaving `PagePlaceholder` unused is a lint error — the intended tripwire" | **No such tripwire.** `next/core-web-vitals` enables no `no-unused-vars` rule; only `eslint-config-next/typescript.js` does, as a warning, and it is not loaded. Remove the import by hand. |

Also: `src/components/shared/AbstractCard.jsx` is orphaned (nothing imports it, so `abstractFile` in `report.js` is reachable only via dead code), and `routes.howItWorks` appears in `footerNav` only, never `primaryNav`.
