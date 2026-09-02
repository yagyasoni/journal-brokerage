import { CoverageGrid } from "@/components/sections/CoverageGrid";
import { CoverageReach } from "@/components/sections/CoverageReach";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { PictureBand } from "@/components/shared/PictureBand";
import { SectionShell } from "@/components/shared/SectionShell";
import { coverageBand, coveragePage, coverageFigures } from "@/data/coverage";
import { primaryCta, secondaryCta } from "@/data/nav";
import { breadcrumbLd, graph, pageMetadata } from "@/data/seo";

export const metadata = pageMetadata("coverage");

const structuredData = graph([breadcrumbLd("coverage")]);

export default function CoveragePage() {
  const { eyebrow, title, intro, figuresLabel, footnote, cta } = coveragePage;

  return (
    <>
      <JsonLd data={structuredData} />

      <SectionShell tone="white" size="opening" labelledBy="coverage-heading">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id="coverage-heading" className="type-heading mt-7 text-ink">
              {title}
            </h1>
            <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>
          </div>

          {/* Both figures are counted from the state lists themselves, so the
              headline can never disagree with the grid below it. */}
          <div>
            <p className="type-label text-slate">{figuresLabel}</p>

            <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {coverageFigures.map((figure) => (
                <div key={figure.caption} className="border-t border-rule py-7">
                  <dt className="tnum text-[clamp(2.5rem,4.5vw,3.5rem)] leading-none font-extralight text-gold">
                    {figure.value}
                  </dt>
                  <dd className="mt-5">
                    <span className="type-label block text-ink">{figure.caption}</span>
                    <span className="mt-2.5 block text-[14.5px] leading-snug text-slate">
                      {figure.definition}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="type-label mt-8 border-t border-rule pt-8 text-slate">
              {footnote}
            </p>
          </div>
        </div>
      </SectionShell>

      <PictureBand band={coverageBand} headingId="coverage-band" />

      <CoverageGrid />

      <CoverageReach />

      {/* <CTABand
        headingId="coverage-cta"
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        body={cta.body}
        primary={primaryCta}
        secondary={secondaryCta}
      /> */}
    </>
  );
}
