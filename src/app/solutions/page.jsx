import { CTABand } from "@/components/sections/CTABand";
import { SolutionBlock } from "@/components/sections/SolutionBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { PictureBand } from "@/components/shared/PictureBand";
import { SectionShell } from "@/components/shared/SectionShell";
import { primaryCta, secondaryCta } from "@/data/nav";
import { breadcrumbLd, graph, pageMetadata, serviceListLd } from "@/data/seo";
import { solutionBlocks, solutionsBand, solutionsPage } from "@/data/solutions";

export const metadata = pageMetadata("solutions");

/** The index this page renders, stated as a list Google can read. */
const structuredData = graph([serviceListLd(), breadcrumbLd("solutions")]);

export default function SolutionsPage() {
  const { eyebrow, title, intro, indexLabel, cta } = solutionsPage;

  return (
    <>
      <JsonLd data={structuredData} />

      <SectionShell tone="white" size="opening" labelledBy="solutions-heading">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id="solutions-heading" className="type-heading mt-7 text-ink">
              {title}
            </h1>
            <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>
          </div>

          {/* The contents of the page, set as a document index. It carries the
              deliverable counts, which are otherwise a scroll away. */}
          <nav aria-label={indexLabel}>
            <p className="type-label text-slate">{indexLabel}</p>

            <ol className="mt-6 border-t border-rule">
              {solutionBlocks.map((block) => (
                <li key={block.id} className="border-b border-rule">
                  <a
                    href={block.anchor}
                    className="group/index flex items-baseline gap-x-5 py-5"
                  >
                    <span className="type-label tnum shrink-0 text-gold-deep">
                      {block.number}
                    </span>

                    <span className="text-[15.5px] leading-[1.7] text-ink transition-colors duration-500 ease-[var(--ease-quiet)] group-hover/index:text-gold-deep">
                      {block.title}
                    </span>

                    <span className="type-label ml-auto shrink-0 text-slate">
                      {block.countLabel}
                    </span>

                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[14.5px] leading-none text-navy/40 transition-[color,transform] duration-500 ease-[var(--ease-quiet)] group-hover/index:translate-y-0.5 group-hover/index:text-gold-deep"
                    >
                      &darr;
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </SectionShell>

      <PictureBand band={solutionsBand} headingId="solutions-band" />

      {/* Alternating from `paper` so the first block reads as its own band
          rather than merging into the white opening. */}
      {solutionBlocks.map((block, index) => (
        <SolutionBlock
          key={block.id}
          block={block}
          tone={index % 2 === 0 ? "paper" : "white"}
        />
      ))}

      <CTABand
        headingId="solutions-cta"
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        body={cta.body}
        primary={primaryCta}
        secondary={secondaryCta}
      />
    </>
  );
}
