import { Check } from "lucide-react";

import { CertifiedSeal } from "@/components/shared/CertifiedSeal";
import { RecordRow } from "@/components/shared/RecordRow";
import { abstractFile } from "@/data/report";
import { cn } from "@/lib/utils";

/**
 * The signature "Abstract of Title" card — the piece the whole identity is
 * built around. A bound ledger entry: navy header plate, hairline-ruled record
 * rows, and a certified footer strip.
 */
export function AbstractCard({ className }) {
  const { documentTitle, fileNumber, rows, qaStatus, sealText } = abstractFile;

  return (
    <figure className={cn("lift-navy w-full border border-rule bg-white", className)}>
      <figcaption className="flex items-center justify-between gap-4 bg-navy px-5 py-4 sm:px-6">
        <span className="type-label text-white">{documentTitle}</span>
        <span className="type-label tnum text-gold-light">{fileNumber}</span>
      </figcaption>

      <dl className="border-b border-rule">
        {rows.map((row) => (
          <RecordRow
            key={row.label}
            label={row.label}
            value={row.value}
            note={row.note}
            mono={row.mono}
          />
        ))}
      </dl>

      <div className="flex items-center justify-between gap-4 bg-paper px-5 py-4 sm:px-6">
        <p className="flex items-center gap-2.5">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-verified/40">
            <Check
              aria-hidden="true"
              className="size-3 text-verified"
              strokeWidth={2.5}
            />
          </span>
          <span className="type-label text-verified">{qaStatus}</span>
        </p>
        <CertifiedSeal
          top={sealText.top}
          bottom={sealText.bottom}
          className="size-16 shrink-0 sm:size-[72px]"
        />
      </div>
    </figure>
  );
}
