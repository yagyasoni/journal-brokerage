import { Chip, ChipRow } from "@/components/shared/Chip";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { gridSection, stateGroups, stateRegions } from "@/data/coverage";

/**
 * The full grid, in two marked tiers.
 *
 * `Chip` already carries the distinction the brief asks for: `solid` is the
 * jurisdiction tile, so core states are filled navy, and `muted` gives the
 * outlined tile for the states we are still moving into. The swatch beside
 * each heading is the legend — no separate key to read, and nothing to fall
 * out of step with the tiles themselves.
 *
 * Inside a tier the tiles are broken by region and labelled in the margin.
 * Forty seven chips in one wrap is a shape, not a list: the eye has no way
 * into it and no way to confirm a state is missing. Six labelled runs give it
 * both, and the regions come from `stateRegions`, so a state appears under
 * exactly the tier its list puts it in.
 */
export function CoverageGrid() {
  const { eyebrow, headingId, heading, intro } = gridSection;

  return (
    <SectionShell tone="paper" labelledBy={headingId}>
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={headingId} className="type-heading mt-7 text-ink">
          {heading}
        </h2>
        <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>
      </div>

      <div className="mt-16 space-y-14 lg:mt-20">
        {stateGroups.map((group) => {
          const isCore = group.id === "core";

          return (
            <section
              key={group.id}
              aria-labelledby={`coverage-${group.id}`}
              className="border-t border-rule pt-8"
            >
              <div className="flex items-center gap-3.5">
                {/* The legend, sitting on the heading it explains. */}
                <span
                  aria-hidden="true"
                  className={
                    isCore
                      ? "size-3 shrink-0 rounded-full bg-navy"
                      : "size-3 shrink-0 rounded-full border border-rule-strong"
                  }
                />
                <h3 id={`coverage-${group.id}`} className="type-label text-ink">
                  {group.label}
                </h3>
                <span className="type-label tnum text-slate">{group.states.length}</span>
              </div>

              <p className="mt-5 max-w-xl text-[15.5px] leading-[1.7] text-slate">
                {group.description}
              </p>

              <div className="mt-9 space-y-8">
                {stateRegions
                  .map((region) => ({
                    ...region,
                    states: region.states.filter((state) => group.states.includes(state)),
                  }))
                  // A tier need not reach every region — the expanding tier
                  // touches two — so an empty run is dropped rather than
                  // printed as a label with nothing under it.
                  .filter((region) => region.states.length > 0)
                  .map((region) => (
                    <div
                      key={region.id}
                      className="sm:grid sm:grid-cols-[minmax(0,8rem)_minmax(0,1fr)] sm:items-start sm:gap-x-10"
                    >
                      <h4 className="type-label text-slate sm:pt-2.5">{region.label}</h4>

                      <ChipRow className="mt-4 sm:mt-0">
                        {region.states.map((state) => (
                          <Chip key={state} variant={isCore ? "solid" : "muted"}>
                            {state}
                          </Chip>
                        ))}
                      </ChipRow>
                    </div>
                  ))}
              </div>
            </section>
          );
        })}
      </div>
    </SectionShell>
  );
}
