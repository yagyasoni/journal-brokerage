import { RecordRow } from "@/components/shared/RecordRow";
import { sampleFile } from "@/data/report";
import { cn } from "@/lib/utils";

/**
 * Proof element for the sample-report section: the findings block exactly as it
 * appears at the head of a delivered report.
 */
export function ReportCard({ className }) {
  const { documentTitle, badge, subline, rows } = sampleFile;

  return (
    <figure className={cn("w-full border border-rule bg-white", className)}>
      <figcaption className="bg-navy px-5 py-5 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <span className="type-title text-white">{documentTitle}</span>
          <span className="type-label shrink-0 rounded-full border border-gold-light/70 px-3.5 py-2 text-gold-light">
            {badge}
          </span>
        </div>
        {/* `type-label` is set to a solid line-height. That is right for a
            one-line eyebrow and wrong the moment a line wraps, which this one
            does on a phone — the county lands under the report number with
            the two rows touching. The house body leading puts the air back.

            Only where it wraps, though: a solid line-height on a single line
            is also what sets this label's height, so leaving the override on
            everywhere would grow the navy header on every viewport that never
            had the problem. From `sm` the line fits and the class goes back to
            its own value. */}
        <p className="type-label tnum mt-3.5 leading-[1.7] text-mist sm:leading-none">
          {subline}
        </p>
      </figcaption>

      <dl>
        {rows.map((row) => (
          <RecordRow
            key={row.label}
            label={row.label}
            value={row.value}
            note={row.note}
            mono={row.mono}
            verified={row.verified}
          />
        ))}
      </dl>
    </figure>
  );
}
