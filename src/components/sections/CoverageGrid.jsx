import { Chip, ChipRow } from "@/components/shared/Chip";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { gridSection, stateGroups } from "@/data/coverage";

/**
 * The full grid, in two marked tiers.
 *
 * `Chip` already carries the distinction the brief asks for: `solid` is the
 * jurisdiction tile, so core states are filled navy, and `muted` gives the
 * outlined tile for the states we are still moving into. The swatch beside
 * each heading is the legend — no separate key to read, and nothing to fall
 * out of step with the tiles themselves.
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

              <ChipRow className="mt-8">
                {group.states.map((state) => (
                  <Chip key={state} variant={isCore ? "solid" : "muted"}>
                    {state}
                  </Chip>
                ))}
              </ChipRow>
            </section>
          );
        })}
      </div>
    </SectionShell>
  );
}
