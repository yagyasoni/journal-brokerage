import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { clientScale, scaleSection } from "@/data/industries";

/**
 * Size, as three columns on navy.
 *
 * The point of the band is that the standard does not move with the headcount,
 * so the three read as one statement rather than three tiers — the same gold
 * hairline and open column the landing page uses for the promises.
 */
export function ClientScale() {
  const { eyebrow, headingId, heading, intro } = scaleSection;

  return (
    <SectionShell tone="navy" labelledBy={headingId} className="overflow-hidden">
      <div aria-hidden="true" className="ledger-grid absolute inset-0 opacity-40" />

      <div className="relative max-w-2xl">
        <Eyebrow tone="navy">{eyebrow}</Eyebrow>
        <h2 id={headingId} className="type-heading mt-7 text-white">
          {heading}
        </h2>
        <p className="mt-7 text-[17px] leading-[1.7] text-mist">{intro}</p>
      </div>

      <ol className="relative mt-16 grid gap-y-12 lg:mt-20 lg:grid-cols-3 lg:gap-x-0">
        {clientScale.map((band) => (
          <li
            key={band.id}
            className="lg:px-10 lg:not-first:border-l lg:not-first:border-gold/25 lg:first:pl-0 lg:last:pr-0"
          >
            <span className="type-label tnum text-gold-light">{band.range}</span>

            <div aria-hidden="true" className="mt-6 h-px w-full bg-white/15" />

            <h3 className="type-title mt-6 text-white">{band.title}</h3>
            <p className="mt-4 max-w-sm text-[15.5px] leading-[1.7] text-mist">
              {band.body}
            </p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
