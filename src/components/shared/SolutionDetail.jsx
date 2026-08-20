import Link from "next/link";

import { CTABand } from "@/components/sections/CTABand";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { primaryCta, secondaryCta } from "@/data/nav";
import { solutionBlocks, solutionDetail } from "@/data/solutions";

/**
 * One service line, given its own page.
 *
 * The three pages are the same document with different contents, so they are
 * one component rather than three arrangements that would drift apart: the
 * promise and the ledger index up top, the argument on navy in the middle, the
 * catalogue itself on paper, and the way out at the foot.
 *
 * `/solutions` sets the three lines side by side, which is what makes its
 * ledger terse; here there is only one line to read, so each entry is a titled
 * record with room to say what it is for. Same catalogue, read at a different
 * distance — see `Deliverable` in `src/data/types.js`.
 *
 * @param {{
 *   solution: (typeof import("@/data/solutions").solutionBlocks)[number],
 * }} props
 */
export function SolutionDetail({ solution }) {
  const {
    id,
    title,
    eyebrow,
    headline,
    overview,
    stake,
    deliverables,
    ledgerLabel,
    countLabel,
    headingId,
    stakeHeadingId,
    catalogueHeadingId,
    ctaHeadingId,
    cta,
  } = solution;

  const { stakeHeading, catalogueHeading, moreLabel, backLink } = solutionDetail;
  const otherLines = solutionBlocks.filter((block) => block.id !== id);
  const moreLabelId = `${headingId}-more`;

  return (
    <>
      <SectionShell tone="white" size="opening" labelledBy={headingId}>
        {/* `items-start`, not `items-end`. Bottom-aligning the two columns
            made sense when they were near enough the same height; the ledger
            beside this one runs to nine entries, so aligning their feet drove
            the heading half a screen down the page and left the top left
            corner empty. Both columns start at the top of the band. */}
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id={headingId} className="type-heading mt-7 text-ink">
              {headline}
            </h1>
            <p className="mt-7 text-[17px] leading-[1.7] text-slate">{overview}</p>
          </div>

          {/* The catalogue up front. A reader who already knows the product
              they need should reach it without reading the page. */}
          <nav aria-label={ledgerLabel}>
            <p className="type-label text-slate">{ledgerLabel}</p>

            <ol className="mt-6 border-t border-rule">
              {deliverables.map((deliverable) => (
                <li key={deliverable.name} className="border-b border-rule">
                  <a
                    href={deliverable.anchor}
                    className="group/index flex items-baseline gap-x-5 py-4"
                  >
                    <span className="type-label tnum shrink-0 text-gold-deep">
                      {deliverable.number}
                    </span>

                    <span className="text-[15.5px] leading-[1.7] text-ink transition-colors duration-500 ease-[var(--ease-quiet)] group-hover/index:text-gold-deep">
                      {deliverable.name}
                    </span>

                    <span
                      aria-hidden="true"
                      className="ml-auto shrink-0 text-[14.5px] leading-none text-navy/40 transition-[color,transform] duration-500 ease-[var(--ease-quiet)] group-hover/index:translate-y-0.5 group-hover/index:text-gold-deep"
                    >
                      &darr;
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </SectionShell>

      {/* The argument, held still on navy — the one dark band on the page. */}
      <SectionShell tone="navy" labelledBy={stakeHeadingId} className="overflow-hidden">
        <div
          aria-hidden="true"
          className="gold-bloom pointer-events-none absolute -top-40 left-1/2 size-[54rem] -translate-x-1/2 opacity-60"
        />
        <div aria-hidden="true" className="ledger-grid absolute inset-0 opacity-40" />

        <div className="relative max-w-3xl">
          <Eyebrow tone="navy">{title}</Eyebrow>
          <h2 id={stakeHeadingId} className="type-heading mt-7 text-white">
            {stakeHeading}
          </h2>
          <p className="type-statement mt-9 text-mist">{stake}</p>
        </div>
      </SectionShell>

      <SectionShell tone="paper" labelledBy={catalogueHeadingId}>
        <div className="max-w-2xl">
          <Eyebrow>{countLabel}</Eyebrow>
          <h2 id={catalogueHeadingId} className="type-heading mt-7 text-ink">
            {catalogueHeading}
          </h2>
        </div>

        <ol className="mt-16 grid gap-x-16 gap-y-14 sm:grid-cols-2 lg:mt-20">
          {deliverables.map((deliverable) => (
            <li key={deliverable.name} className="border-t border-rule pt-8">
              <span className="type-label tnum text-gold">{deliverable.number}</span>

              {/* `scroll-mt` clears the sticky bar when the index jumps here. */}
              <h3
                id={deliverable.headingId}
                className="type-title mt-4 scroll-mt-28 text-ink"
              >
                {deliverable.name}
              </h3>

              <p className="mt-3.5 text-[15.5px] leading-[1.7] text-slate">
                {deliverable.detail}
              </p>
            </li>
          ))}
        </ol>
      </SectionShell>

      {/* No page on this site is a dead end: the other two lines, and the way
          back to the three of them together. */}
      <SectionShell tone="white" size="compact" as="nav" labelledBy={moreLabelId}>
        <div className="flex flex-col gap-y-10 md:flex-row md:items-start md:justify-between md:gap-x-16">
          <div className="w-full md:max-w-xl">
            <p id={moreLabelId} className="type-label text-slate">
              {moreLabel}
            </p>

            <ul className="mt-6 border-t border-rule">
              {otherLines.map((other) => (
                <li key={other.id} className="border-b border-rule">
                  <Link
                    href={other.link.href}
                    className="group/index flex items-baseline gap-x-5 py-4"
                  >
                    <span className="type-label tnum shrink-0 text-gold-deep">
                      {other.number}
                    </span>

                    <span className="text-[15.5px] leading-[1.7] text-ink transition-colors duration-500 ease-[var(--ease-quiet)] group-hover/index:text-gold-deep">
                      {other.title}
                    </span>

                    <span
                      aria-hidden="true"
                      className="ml-auto shrink-0 text-[14.5px] leading-none text-navy/40 transition-[color,transform] duration-500 ease-[var(--ease-quiet)] group-hover/index:translate-x-0.5 group-hover/index:text-gold-deep"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ArrowLink href={backLink.href} className="shrink-0 md:mt-11">
            {backLink.label}
          </ArrowLink>
        </div>
      </SectionShell>

      {/* <CTABand
        headingId={ctaHeadingId}
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        body={cta.body}
        primary={primaryCta}
        secondary={secondaryCta}
      /> */}
    </>
  );
}
