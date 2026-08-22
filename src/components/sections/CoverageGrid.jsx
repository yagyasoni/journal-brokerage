import { CoverageMap, TierMark } from "@/components/shared/CoverageMap";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { gridSection, stateGroups, stateRegions } from "@/data/coverage";

/**
 * The full reach, as the country rather than as a list of it.
 *
 * This section used to print all fifty names as chips, broken into six
 * labelled runs. Six runs was already an improvement on one alphabetical wall
 * of forty seven — but it was still a page of names, and a name in a list
 * cannot be found without reading every name above it. `CoverageMap` draws the
 * same fifty on the country, where a visitor finds their own state the way
 * they would on any map: by looking where it is.
 *
 * The map takes the whole measure and the reading of it sits underneath. That
 * is not only composition — a map squeezed into two thirds of the row is a map
 * whose state codes are seven pixels tall, and a legend is worth less than the
 * thing it explains. Under it, the two tiers carry their own swatch, so the
 * key sits on the definition rather than in a box of its own; the six regions
 * follow as a plain count. Both come out of `coverage.js`, so neither the
 * marks nor the figures can drift from the states they describe.
 */
export function CoverageGrid() {
  const { eyebrow, headingId, heading, intro, regionsLabel } = gridSection;

  return (
    <SectionShell tone="paper" labelledBy={headingId}>
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={headingId} className="type-heading mt-7 text-ink">
          {heading}
        </h2>
        <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>
      </div>

      <CoverageMap tone="paper" className="mt-12 lg:mt-14" />

      <dl className="mt-12 grid gap-x-16 gap-y-9 border-t border-rule pt-9 sm:grid-cols-2 lg:mt-14">
        {stateGroups.map((group) => (
          <div key={group.id}>
            <dt className="flex items-center gap-3.5">
              {/* The legend, sitting on the tier it explains. */}
              <TierMark tier={group.id} className="size-3" />
              <span className="type-label text-ink">{group.label}</span>
              <span className="type-label tnum text-slate">{group.states.length}</span>
            </dt>
            <dd className="mt-4 max-w-md text-[15.5px] leading-[1.7] text-slate">
              {group.description}
            </dd>
          </div>
        ))}
      </dl>

      {/* The same fifty counted the way the coverage is actually spoken about
          — "the Southeast and Mid-Atlantic" — set as one strip rather than a
          column, so the ledger reads along the foot of the map instead of
          standing beside it competing for the eye. */}
      <div className="mt-11 border-t border-rule pt-9">
        <h3 className="type-label text-slate">{regionsLabel}</h3>

        <ul className="mt-7 grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {stateRegions.map((region) => (
            <li key={region.id} className="flex items-baseline justify-between gap-4">
              <span className="text-[14.5px] text-ink">{region.label}</span>
              <span className="type-label tnum shrink-0 text-gold">
                {region.states.length}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
