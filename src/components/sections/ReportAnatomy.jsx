import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { anatomySection, reportParts } from "@/data/report";

/**
 * The report taken apart, block by block.
 *
 * The card above this band is the evidence; this is the caption for it. Three
 * columns divided by gold hairlines rather than three boxes, so the sequence
 * reads as one document described in order — which is the claim being made.
 */
export function ReportAnatomy() {
  const { eyebrow, headingId, heading, intro } = anatomySection;

  return (
    <SectionShell tone="paper" labelledBy={headingId}>
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={headingId} className="type-heading mt-7 text-ink">
          {heading}
        </h2>
        <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>
      </div>

      <ol className="mt-16 grid gap-y-12 lg:mt-20 lg:grid-cols-3 lg:gap-x-0">
        {reportParts.map((part) => (
          <li
            key={part.id}
            className="lg:px-10 lg:not-first:border-l lg:not-first:border-gold/30 lg:first:pl-0 lg:last:pr-0"
          >
            <span className="type-label tnum text-gold-deep">{part.number}</span>

            <div aria-hidden="true" className="mt-6 h-px w-full bg-rule-strong" />

            <h3 className="type-title mt-6 text-ink">{part.title}</h3>
            <p className="mt-4 max-w-sm text-[15.5px] leading-[1.7] text-slate">
              {part.body}
            </p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
