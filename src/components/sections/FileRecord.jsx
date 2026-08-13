import { AbstractCard } from "@/components/shared/AbstractCard";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { fileRecordSection } from "@/data/report";

/**
 * The other half of the document: the record the findings are issued against.
 *
 * `AbstractCard` was built for this and then left unused — it carries the same
 * file number as the findings block above, so the two read as one delivery
 * rather than two specimens. Set on navy because a white document on a dark
 * ground is the one place this design lets a card behave like an object.
 */
export function FileRecord() {
  const { eyebrow, headingId, heading, body } = fileRecordSection;

  return (
    <SectionShell tone="navy" labelledBy={headingId} className="overflow-hidden">
      <div aria-hidden="true" className="ledger-grid absolute inset-0 opacity-40" />

      <div className="relative grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="max-w-lg">
          <Eyebrow tone="navy">{eyebrow}</Eyebrow>
          <h2 id={headingId} className="type-heading mt-7 text-white">
            {heading}
          </h2>
          <p className="mt-7 text-[17px] leading-[1.7] text-mist">{body}</p>
        </div>

        <div className="relative lg:pl-4">
          <div
            aria-hidden="true"
            className="absolute -inset-3 border border-gold/35 sm:-inset-4 lg:left-1"
          />
          <AbstractCard className="relative" />
        </div>
      </div>
    </SectionShell>
  );
}
