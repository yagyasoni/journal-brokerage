import { CTABand } from "@/components/sections/CTABand";
import { Walkthrough } from "@/components/sections/Walkthrough";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { PictureBand } from "@/components/shared/PictureBand";
import { SectionShell } from "@/components/shared/SectionShell";
import { howItWorksBand, howItWorksPage, walkthroughSteps } from "@/data/how-it-works";
import { primaryCta, secondaryCta } from "@/data/nav";

export const metadata = {
  title: "How It Works",
  description: "From order to closing-ready in four steps.",
};

export default function HowItWorksPage() {
  const { eyebrow, title, intro, indexLabel, turnaroundNote, cta } = howItWorksPage;

  return (
    <>
      <SectionShell tone="white" size="opening" labelledBy="how-it-works-page-heading">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id="how-it-works-page-heading" className="type-heading mt-7 text-ink">
              {title}
            </h1>
            <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>
          </div>

          {/* The sequence up front, so a reader can jump to the step their
              file is actually sitting in. */}
          <nav aria-label={indexLabel}>
            <p className="type-label text-slate">{indexLabel}</p>

            <ol className="mt-6 border-t border-rule">
              {walkthroughSteps.map((step) => (
                <li key={step.id} className="border-b border-rule">
                  <a
                    href={step.anchor}
                    className="group/index flex items-baseline gap-x-5 py-5"
                  >
                    <span className="type-label tnum shrink-0 text-gold-deep">
                      {step.number}
                    </span>

                    <span className="text-[15.5px] leading-[1.7] text-ink transition-colors duration-500 ease-[var(--ease-quiet)] group-hover/index:text-gold-deep">
                      {step.title}
                    </span>

                    <span
                      aria-hidden="true"
                      className="ml-auto shrink-0 text-[14.5px] leading-none text-navy/40 transition-[color,transform] duration-500 ease-[var(--ease-quiet)] group-hover/index:translate-y-0.5 group-hover/index:text-gold-deep"
                    >
                      &darr;
                    </span>
                  </a>
                </li>
              ))}
            </ol>

            <p className="type-label mt-8 text-slate">{turnaroundNote}</p>
          </nav>
        </div>
      </SectionShell>

      <PictureBand band={howItWorksBand} headingId="how-it-works-band" />

      <Walkthrough />

      {/* <CTABand
        headingId="how-it-works-cta"
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        body={cta.body}
        primary={primaryCta}
        secondary={secondaryCta}
      /> */}
    </>
  );
}
