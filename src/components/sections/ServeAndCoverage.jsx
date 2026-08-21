import { Fragment } from "react";

import { ArrowLink } from "@/components/shared/ArrowLink";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { landingCoverage, stateRegions } from "@/data/coverage";
import { landingIndustries } from "@/data/industries";
import { routes } from "@/data/nav";

/**
 * Who we serve, and where.
 *
 * Every entry used to sit between two hairlines. Fourteen full-width rules in
 * one section is a spreadsheet, not a page: a rule under every line stops
 * being structure and becomes texture, and it flattens the two halves into
 * the same grey stripe. The only rule left is the vertical one between the
 * columns, and the separation is carried by air instead — which is the whole
 * trick of expensive typography, since white space is the one material that
 * cannot be faked cheaply.
 *
 * The two columns are then told apart by where their figure sits rather than
 * by more lines. Left, the gold ordinal leads the row and the titles hang off
 * it, because the order is the point. Right, the region leads and its count
 * falls to the right edge, the way a quantity sits in a ledger. Same rhythm,
 * two different records — and both links hang from the same floor, so neither
 * column strands halfway up.
 *
 * Forty seven names in one tracked uppercase run read as filler, because
 * nothing in it could be looked up: there was no entry to find, only length.
 * Grouped into six regions the same list answers a question — "are you in
 * mine?" — in one row instead of one paragraph.
 */
/** The only mark between the foot's clauses — a gold point, not a rule. */
function Separator() {
  return (
    <span aria-hidden="true" className="mx-3 text-gold/60">
      &middot;
    </span>
  );
}

export function ServeAndCoverage() {
  const { figures, footnote } = landingCoverage;

  return (
    <SectionShell tone="white" labelledBy="who-we-serve-heading">
      {/* `min-w-0` on both tracks: a grid item defaults to min-width:auto, and
          the region rows below would otherwise widen their column instead of
          wrapping inside it. */}
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="flex min-w-0 flex-col">
          <Eyebrow>Who we serve</Eyebrow>
          <h2 id="who-we-serve-heading" className="type-heading mt-7 text-ink">
            Built for the professionals who close
          </h2>
          <p className="mt-7 max-w-md text-[16.5px] leading-[1.7] text-slate">
            Title companies, law firms, lenders, settlement and escrow companies, agencies
            and underwriters — plus the individual professionals who need overflow
            capacity they can trust.
          </p>

          <ul className="mt-11 space-y-8">
            {landingIndustries.map((industry, index) => (
              <li key={industry.id}>
                <div className="flex items-baseline gap-5">
                  <span className="type-label tnum w-6 shrink-0 text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[16px] font-light tracking-[0.04em] text-ink">
                    {industry.shortName}
                  </span>
                </div>

                {/* The titles the work is commissioned under, hanging off the
                    ordinal. Rendered only where the list has them — an entry
                    with no roles gets silence, not an invented title. */}
                {industry.roles.length > 0 ? (
                  <p className="mt-2 pl-11 text-[14.5px] leading-[1.7] text-slate">
                    {industry.roles.map((role, roleIndex) => (
                      <Fragment key={role}>
                        {roleIndex > 0 ? ", " : null}
                        <span className="whitespace-nowrap">{role}</span>
                      </Fragment>
                    ))}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>

          <ArrowLink href={routes.industries} className="mt-10 lg:mt-auto lg:pt-10">
            See all industries
          </ArrowLink>
        </div>

        {/* A hairline between the columns once they sit side by side — the
            same ledger rule the records use, standing on its end. */}
        <div className="flex min-w-0 flex-col lg:border-l lg:border-rule lg:pl-24">
          <Eyebrow>Geographic coverage</Eyebrow>
          <h2 className="type-heading mt-7 text-ink">Deep in the states you close in</h2>
          <p className="mt-7 max-w-md text-[16.5px] leading-[1.7] text-slate">
            Hands-on experience across the Southeast and Mid-Atlantic, with active
            expansion into the West and Midwest.
          </p>

          <ul className="mt-11 space-y-8">
            {stateRegions.map((region) => (
              <li key={region.id}>
                <div className="flex items-baseline justify-between gap-6">
                  <span className="text-[16px] font-light tracking-[0.04em] text-ink">
                    {region.label}
                  </span>
                  <span className="type-label tnum shrink-0 text-gold">
                    {region.core.length}
                  </span>
                </div>

                <p className="mt-2 text-[14.5px] leading-[1.7] text-slate">
                  {region.core.map((state, index) => (
                    <Fragment key={state}>
                      {/* A real string between mapped siblings: mapped JSX has
                          no whitespace of its own, and without it the row is
                          one unbreakable run. */}
                      {index > 0 ? ", " : null}
                      {/* A two-word state is one entry: never break between
                          "New" and "Jersey". */}
                      <span className="whitespace-nowrap">{state}</span>
                    </Fragment>
                  ))}
                </p>
              </li>
            ))}
          </ul>

          {/* The foot of the ledger, as one quiet line rather than a bordered
              block — it is what tells you the gold figures above are states.
              Both counts are derived from the tier lists, so it cannot drift
              from the regions it sits under.

              Each clause is one unbreakable item in a wrapping flex row, and
              the whole clause moves to the next line or none of it does. Set
              as running text it broke in the wrong place every time: mapped
              JSX puts no whitespace between siblings, so "47", "Core states",
              the point and "3" were all one word to the browser, and the only
              break opportunities left in the line were the two real spaces
              inside the captions themselves.

              `gap-y-3` then does what `type-label`'s solid line-height cannot:
              the class is set to line-height 1, which is right for a one-line
              eyebrow and leaves two wrapped lines touching. */}
          <p className="type-label mt-11 flex flex-wrap items-baseline gap-y-3 text-slate">
            {figures.map((figure) => (
              <span key={figure.caption} className="whitespace-nowrap">
                <span className="tnum mr-2 text-gold">{figure.value}</span>
                {figure.caption}
                <Separator />
              </span>
            ))}
            <span className="whitespace-nowrap">{footnote}</span>
          </p>

          <ArrowLink href={routes.coverage} className="mt-10 lg:mt-auto lg:pt-10">
            View full coverage
          </ArrowLink>
        </div>
      </div>
    </SectionShell>
  );
}
