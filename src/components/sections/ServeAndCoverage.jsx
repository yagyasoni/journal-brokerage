import { Fragment } from "react";

import { ArrowLink } from "@/components/shared/ArrowLink";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { coreStates } from "@/data/coverage";
import { industryChips } from "@/data/industries";
import { routes } from "@/data/nav";

/**
 * Who we serve, and where.
 *
 * Both halves used to be pill soup. They are set as records now: the client
 * types as a numbered ruled list you can run a finger down, and the states as
 * a single directory line, tracked and separated by gold points, the way a
 * masthead lists its bureaux. Same information, read as a document.
 */
export function ServeAndCoverage() {
  return (
    <SectionShell tone="white" labelledBy="who-we-serve-heading">
      {/* `min-w-0` on both tracks: a grid item defaults to min-width:auto, and
          the directory line below would otherwise widen its column instead of
          wrapping inside it. */}
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="min-w-0">
          <Eyebrow>Who we serve</Eyebrow>
          <h2 id="who-we-serve-heading" className="type-heading mt-7 text-ink">
            Built for the professionals who close
          </h2>
          <p className="mt-7 max-w-md text-[16.5px] leading-[1.7] text-slate">
            Title companies, law firms, lenders, settlement and escrow companies, agencies
            and underwriters — plus the individual professionals who need overflow
            capacity they can trust.
          </p>

          <ul className="mt-10 border-t border-rule">
            {industryChips.map((industry, index) => (
              <li
                key={industry}
                className="group/ind flex items-baseline gap-5 border-b border-rule py-4 transition-colors duration-300 ease-[var(--ease-quiet)] hover:border-gold"
              >
                <span className="type-label tnum w-6 shrink-0 text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[16px] font-light tracking-[0.04em] text-ink">
                  {industry}
                </span>
              </li>
            ))}
          </ul>

          <ArrowLink href={routes.industries} className="mt-10">
            See all industries
          </ArrowLink>
        </div>

        {/* A hairline between the columns once they sit side by side — the
            same ledger rule the records use, standing on its end. */}
        <div className="min-w-0 lg:border-l lg:border-rule lg:pl-24">
          <Eyebrow>Geographic coverage</Eyebrow>
          {/* Carries an id like every other section heading, so this column is
              addressable in the page outline rather than being the one `h2`
              nothing can point at. */}
          <h2 id="coverage-teaser-heading" className="type-heading mt-7 text-ink">
            Deep in the states you close in
          </h2>
          <p className="mt-7 max-w-md text-[16.5px] leading-[1.7] text-slate">
            Hands-on experience across the Southeast and Mid-Atlantic, with active
            expansion into the West and Midwest.
          </p>

          <p className="mt-10 border-y border-rule py-8 text-[15px] leading-[2.1] font-light tracking-[0.11em] text-ink uppercase">
            {coreStates.map((state, index) => (
              <Fragment key={state}>
                {/* The spaces inside this span are load-bearing: mapped JSX
                    siblings have no whitespace between them, so without them
                    the whole directory is one unbreakable run and overflows
                    the column instead of wrapping. Margins wouldn't do it —
                    only real whitespace creates a break opportunity. */}
                {index > 0 ? (
                  <span aria-hidden="true" className="text-gold">
                    {" "}
                    &middot;{" "}
                  </span>
                ) : null}
                {/* A two-word state is one entry, not two — never let the line
                    break between "New" and "Jersey". */}
                <span className="whitespace-nowrap">{state}</span>
              </Fragment>
            ))}
          </p>

          <p className="type-label mt-6 text-slate">
            Twelve core states &middot; nationwide on request
          </p>

          <ArrowLink href={routes.coverage} className="mt-10">
            View full coverage
          </ArrowLink>
        </div>
      </div>
    </SectionShell>
  );
}
