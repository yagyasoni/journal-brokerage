import { CTABand } from "@/components/sections/CTABand";
import { FileRecord } from "@/components/sections/FileRecord";
import { ReportAnatomy } from "@/components/sections/ReportAnatomy";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { CallSpecialist } from "@/components/shared/CallSpecialist";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { ReportCard } from "@/components/shared/ReportCard";
import { SectionShell } from "@/components/shared/SectionShell";
import { primaryCta, secondaryCta } from "@/data/nav";
import { sampleReportActions, sampleReportFile, sampleReportPage } from "@/data/report";

export const metadata = {
  title: "Sample Report",
  description: "See exactly what lands in your file.",
};

export default function SampleReportPage() {
  const { eyebrow, title, intro, previewLabel, cta } = sampleReportPage;
  const [primaryAction] = sampleReportActions;

  return (
    <>
      <SectionShell tone="white" size="opening" labelledBy="sample-report-page-heading">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="max-w-lg">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id="sample-report-page-heading" className="type-heading mt-7 text-ink">
              {title}
            </h1>
            <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href={primaryAction.href}
                download={sampleReportFile.filename}
                variant="gold"
                size="pill"
              >
                {primaryAction.label} <span aria-hidden="true">&rarr;</span>
              </ButtonLink>
              <CallSpecialist variant="outlineNavy" size="pill" />
            </div>
          </div>

          {/* The evidence, mounted in the same thin gold frame the landing
              page uses — the one element allowed to read as an object. */}
          <div className="relative lg:pl-4">
            <p className="type-label text-slate">{previewLabel}</p>

            <div className="relative mt-6">
              <div
                aria-hidden="true"
                className="absolute -inset-3 border border-gold/35 sm:-inset-4 lg:left-1"
              />
              <ReportCard className="lift-navy relative" />
            </div>
          </div>
        </div>
      </SectionShell>

      <ReportAnatomy />

      <FileRecord />

      {/* <CTABand
        headingId="sample-report-cta"
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        body={cta.body}
        primary={primaryCta}
        secondary={secondaryCta}
      /> */}
    </>
  );
}
