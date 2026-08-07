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
        <p className="type-label tnum mt-3.5 text-mist">{subline}</p>
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
