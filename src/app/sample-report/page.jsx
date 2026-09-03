import { CTABand } from "@/components/sections/CTABand";
import { FileRecord } from "@/components/sections/FileRecord";
import { ReportAnatomy } from "@/components/sections/ReportAnatomy";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { CallSpecialist } from "@/components/shared/CallSpecialist";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { ReportCard } from "@/components/shared/ReportCard";
import { SectionShell } from "@/components/shared/SectionShell";
import { primaryCta, secondaryCta } from "@/data/nav";
import { sampleReportActions, sampleReportFile, sampleReportPage } from "@/data/report";
import { breadcrumbLd, graph, pageMetadata } from "@/data/seo";

export const metadata = pageMetadata("sampleReport");

// No `Report` or `Dataset` node here: the specimen on this page is illustrative
// data for a fictional file, and structured data must describe something real.
const structuredData = graph([breadcrumbLd("sampleReport")]);

export default function SampleReportPage() {
  const { eyebrow, title, intro, previewLabel, cta } = sampleReportPage;
  const [primaryAction] = sampleReportActions;

  return (
    <>
      <JsonLd data={structuredData} />

      <SectionShell tone="white" size="opening" labelledBy="sample-report-page-heading">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* `min-w-0` on both tracks. A grid item defaults to
              `min-width: auto`, so the widest thing that refuses to wrap sets
              the column — and the download pill is `whitespace-nowrap` and
              wider than the measure on a phone. Without this it pushed the
              whole column past the right gutter, which is why the buttons and
              the preview both sat off-centre with the card's frame running
              off the screen. */}
          <div className="max-w-lg min-w-0">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id="sample-report-page-heading" className="type-heading mt-7 text-ink">
              {title}
            </h1>
            <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>

            {/* Two boxes, because the pair has to stay one width and still
                land in the middle. The inner one is `w-max`, so it is as wide
                as the longer pill and both stretch to it — the pills match
                each other, as they always did. The outer one centres it: the
                longer pill is wider than the measure on a phone, and a flex
                centre overflows evenly on both sides rather than hanging the
                whole pair off the right gutter. From `sm` both revert and the
                row is exactly what it was. */}
            <div className="mt-10 flex justify-center sm:justify-start">
              <div className="flex w-max flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
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
          </div>

          {/* The evidence, mounted in the same thin gold frame the landing
              page uses — the one element allowed to read as an object. */}
          <div className="relative min-w-0 lg:pl-4">
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
