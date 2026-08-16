# Journal Brokerage

Marketing site for Journal Brokerage — title, tax, and municipal lien research for the
title and mortgage industry.

**What is built:** the landing page (`/`) and the shared shell — nav, footer, design
system, and reusable section primitives. Every other route exists as a placeholder for
the team to fill in.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm lint
pnpm typecheck    # tsc against jsconfig.json — JS only, no .ts/.tsx anywhere
pnpm format
```

## Stack

Next.js 15 (App Router) · JavaScript/JSX only · Tailwind CSS v4 · shadcn/ui on Base UI
(`components.json` has `"tsx": false`) · lucide-react · class-variance-authority ·
`next/font/google` · CSS + IntersectionObserver for motion (no animation library).

## Design system

Tokens live in `src/app/globals.css` under `@theme`. **Never write a raw hex value in
JSX** — use the token classes.

| Token                                | Value     | Use                                            |
| ------------------------------------ | --------- | ---------------------------------------------- |
| `navy`                               | `#1a2a54` | Bands, header plates, solid chips              |
| `navy-raised` / `navy-deep`          | —         | Cards on navy / deepest band (closing CTA)     |
| `navy-black`                         | `#0a1226` | The cinematic floor beneath the hero footage   |
| `gold`                               | `#b1813a` | Rules, seals, icons, large display numerals    |
| `gold-deep`                          | `#8f6626` | Gold **text** on white/paper; gold button fill |
| `gold-light`                         | `#c79a51` | Gold **text** on navy                          |
| `gold-bright`                        | `#e3bc7c` | Hairlines and glints on the cinematic hero     |
| `paper`                              | `#f7f5ee` | Alternate section band                         |
| `ink` / `slate` / `mist`             | —         | Headings / body on light / body on navy        |
| `verified`                           | `#2f6b4f` | Reassuring record values                       |
| `rule` / `rule-strong` / `rule-navy` | —         | Hairlines — this design separates with borders |

Gold is split into three text-safe tokens because the brand gold clears WCAG AA neither on
white (3.46:1) nor as a button fill behind white text. Every visible text node on the
landing page has been measured; the worst small-text ratio is 4.70:1.

Separation is done with hairlines, not elevation. There are exactly two sanctioned
shadows: `.lift-navy` (the document card) and `.lift-bar` (the sticky nav, once the reader
leaves the hero). Don't add a third.

### Type

**One family: DM Sans**, loaded in `src/app/layout.jsx`. It is the open stand-in for the
licensed geometric sans the reference brand uses. There is no serif and no monospace —
weight, tracking, case and scale carry every distinction a second family used to. Never
reach for `font-serif` or `font-mono`; neither is defined, so both fall back to a system
face and break the page.

Five classes, defined once in `globals.css` under `@layer components`. A call site sets
**colour and spacing only** — `className="type-heading mt-7 text-ink"`. Never inline a
size, weight, tracking or `uppercase` on text that already has one of these.

| Class            | Use                                                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `type-display`   | The hero `h1` and the closing CTA `h2`. Nothing else. Uppercase.                                                                   |
| `type-heading`   | Every section heading, and the `h1` on an inner page. Uppercase.                                                                   |
| `type-title`     | Card, row and list-item titles (`h3`). Sentence case, deliberately — so a title and a heading never compete for the same emphasis. |
| `type-statement` | The one long light statement that opens a band. Rare.                                                                              |
| `type-label`     | Every small tracked cap: eyebrows, chips, record labels, stat captions, nav links, footer column heads, step numbers, legals.      |
| `tnum`           | Any figure that has to line up in a column — `01`/`02`, file and parcel numbers, stat values.                                      |

Body copy has no class. Match the established scale: `text-[17px] leading-[1.7]` for the
intro paragraph under a heading, `text-[15.5px] leading-[1.7]` for card and step body,
`text-[14.5px]` for record values and footer links, `text-[12.5px]` for record sub-notes.

## Structure

```
src/
├─ app/               routes; every page below "/" is a placeholder
├─ components/
│  ├─ ui/             shadcn output (Button + Sheet, with brand variants added)
│  ├─ layout/         Nav, Footer, Logo, PagePlaceholder
│  ├─ sections/       one file per landing-page section, plus CTABand + ProcessSteps
│  └─ shared/         SectionShell, Eyebrow, Chip, StatTile, Marquee, Reveal,
│                     ButtonLink, ArrowLink, AbstractCard, ReportCard, RecordRow,
│                     CertifiedSeal
├─ data/              @ts-check'd content config — the single source of truth
└─ lib/               cn(), icon map
```

## Building the other pages

Reach for these first; they carry the whole visual language:

- **`SectionShell`** — banded, padded section with the centred measure and the scroll
  reveal. `tone="white" | "paper" | "navy"`. Assemble pages from these.
- **`CTABand`** — the closing navy band. Pass your own copy; keep the shape.
- **`ProcessSteps`** — the four-step rail. Accepts `steps` and `tone="light" | "navy"`.
- **`Eyebrow`**, **`Chip`/`ChipRow`**, **`StatTile`/`StatStrip`**, **`ButtonLink`**,
  **`ArrowLink`**, **`RecordRow`**.

Two rules to keep the site coherent:

1. **Routes live in `src/data/nav.js`.** Import `routes` — never type a path inline.
   Adding a link to `primaryNav` or `footerNav` wires it into the nav and footer.
2. **Content lives in `src/data/`.** Those files carry `// @ts-check` and JSDoc typedefs
   (`src/data/types.js`) so `pnpm typecheck` catches a malformed entry. Component files
   deliberately do **not** carry `@ts-check`.

The landing page is an **overview**. Detailed deliverable ledgers, the six described
industry cards, the full state grid, and the contact form belong to their own pages —
keep them off `/`.
