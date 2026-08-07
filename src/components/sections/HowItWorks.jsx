import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { routes } from "@/data/nav";

export function HowItWorks() {
  return (
    <SectionShell tone="paper" labelledBy="how-it-works-heading">
      <div className="max-w-2xl">
        <Eyebrow>How it works</Eyebrow>
        <h2 id="how-it-works-heading" className="type-heading mt-7 text-ink">
          Order to closing-ready in four steps
        </h2>
        <p className="mt-7 text-[17px] leading-[1.7] text-slate">
          One intake, one research pass, one verification gate — and a deliverable your
          closer can act on the moment it lands.
        </p>
      </div>

      <ProcessSteps className="mt-20 lg:mt-24" />

      <div className="mt-16">
        <ArrowLink href={routes.howItWorks}>See the full process</ArrowLink>
      </div>
    </SectionShell>
  );
}
