import { ButtonLink } from "@/components/shared/ButtonLink";
import { CallSpecialist } from "@/components/shared/CallSpecialist";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { ReportCard } from "@/components/shared/ReportCard";
import { SectionShell } from "@/components/shared/SectionShell";
import { routes } from "@/data/nav";

const FINDINGS = [
  "Plain findings, no interpretation required",
  "A verification block on every report",
  "Formatted for the closing file as delivered",
];

export function SampleReport() {
  return (
    <SectionShell tone="paper" labelledBy="sample-report-heading">
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="max-w-lg">
          <Eyebrow>Sample report</Eyebrow>
          <h2 id="sample-report-heading" className="type-heading mt-7 text-ink">
            See exactly what lands in your file
          </h2>

          <ul className="mt-10 border-t border-rule">
            {FINDINGS.map((finding) => (
              <li
                key={finding}
                className="border-b border-rule py-4 text-[16px] leading-[1.6] font-light text-slate"
              >
                {finding}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={routes.sampleReport} variant="gold" size="pill">
              Download sample <span aria-hidden="true">&rarr;</span>
            </ButtonLink>
            <CallSpecialist variant="outlineNavy" size="pill" />
          </div>
        </div>

        {/* Mounted in a thin gold frame — the one piece of the page allowed to
            look like an object rather than a rule. */}
        <div className="relative lg:pl-4">
          <div
            aria-hidden="true"
            className="absolute -inset-3 border border-gold/35 sm:-inset-4 lg:left-1"
          />
          <ReportCard className="lift-navy relative" />
        </div>
      </div>
    </SectionShell>
  );
}
