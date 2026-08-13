import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { method, methodSteps } from "@/data/why-us";

/**
 * The dark centre of the page: the quality method itself.
 *
 * `/how-it-works` owns the order flow, where "quality review" is a single
 * step. This band opens that step up — same rail component, its own sequence —
 * so the two pages describe different things rather than the same thing twice.
 */
export function WhyMethod() {
  const { eyebrow, headingId, heading, intro } = method;

  return (
    <SectionShell tone="navy" labelledBy={headingId} className="overflow-hidden">
      <div
        aria-hidden="true"
        className="gold-bloom pointer-events-none absolute -top-40 left-1/2 size-[54rem] -translate-x-1/2 opacity-60"
      />
      <div aria-hidden="true" className="ledger-grid absolute inset-0 opacity-40" />

      <div className="relative max-w-2xl">
        <Eyebrow tone="navy">{eyebrow}</Eyebrow>
        <h2 id={headingId} className="type-heading mt-7 text-white">
          {heading}
        </h2>
        <p className="mt-7 text-[17px] leading-[1.7] text-mist">{intro}</p>
      </div>

      <ProcessSteps steps={methodSteps} tone="navy" className="relative mt-20 lg:mt-24" />
    </SectionShell>
  );
}
