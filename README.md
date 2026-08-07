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

| Token                                | Value     | Use                                               |
| ------------------------------------ | --------- | ------------------------------------------------- |
| `navy`                               | `#1a2a54` | Bands, header plates, solid chips                 |
| `navy-raised` / `navy-deep`          | —         | Cards on navy / deepest band                      |
| `gold`                               | `#b1813a` | Rules, seals, icons, large display numerals       |
| `gold-deep`                          | `#8f6626` | Gold **text** on white/paper; gold button fill    |
| `gold-light`                         | `#c79a51` | Gold **text** on navy                             |
| `paper`                              | `#f7f5ee` | Alternate section band                            |
| `ink` / `slate` / `mist`             | —         | Headings / body on light / body on navy           |
| `verified`                           | `#2f6b4f` | Reassuring record values                          |
| `rule` / `rule-strong` / `rule-navy` | —         | Hairlines — this design uses borders, not shadows |

Gold is split into three tokens because the brand gold clears WCAG AA neither on white
(3.46:1) nor as a button fill behind white text. Every visible text node on the landing
page has been measured; the worst small-text ratio is 4.70:1.

Fonts: **Libre Caslon** headings, **IBM Plex Sans** body, **IBM Plex Mono** for all record
data — file numbers, parcels, chips, eyebrow labels, stat captions.

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
