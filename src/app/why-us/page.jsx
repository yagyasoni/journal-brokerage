import { CTABand } from "@/components/sections/CTABand";
import { WhyMethod } from "@/components/sections/WhyMethod";
import { WhyPromises } from "@/components/sections/WhyPromises";
import { JsonLd } from "@/components/seo/JsonLd";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { PictureBand } from "@/components/shared/PictureBand";
import { SectionShell } from "@/components/shared/SectionShell";
import { primaryCta, secondaryCta } from "@/data/nav";
import { breadcrumbLd, graph, pageMetadata } from "@/data/seo";
import { whyNumbers, whyUsBand, whyUsPage } from "@/data/why-us";

export const metadata = pageMetadata("whyUs");

const structuredData = graph([breadcrumbLd("whyUs")]);

export default function WhyUsPage() {
  const { eyebrow, title, intro, numbersLabel, cta } = whyUsPage;

  return (
    <>
      <JsonLd data={structuredData} />

      <SectionShell tone="white" size="opening" labelledBy="why-us-heading">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2 lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id="why-us-heading" className="type-heading mt-7 text-ink">
              {title}
            </h1>
            <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>
          </div>

          {/* The proof, stated before the argument. The landing page shows these
              four figures with a caption; here each one carries its sentence. */}
          <div>
            <p className="type-label text-slate">{numbersLabel}</p>

            <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {whyNumbers.map((number) => (
                <div key={number.caption} className="border-t border-rule py-7">
                  <dt className="tnum text-[clamp(2.5rem,4.5vw,3.5rem)] leading-none font-extralight text-gold">
                    {number.value}
                  </dt>
                  <dd className="mt-5">
                    <span className="type-label block text-ink">{number.caption}</span>
                    <span className="mt-2.5 block text-[14.5px] leading-snug text-slate">
                      {number.definition}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SectionShell>

      <PictureBand band={whyUsBand} headingId="why-us-band" />

      <WhyPromises />

      <WhyMethod />

      {/* <CTABand
        headingId="why-us-cta"
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        body={cta.body}
        primary={primaryCta}
        secondary={secondaryCta}
      /> */}
    </>
  );
}
