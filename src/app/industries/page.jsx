import { ClientScale } from "@/components/sections/ClientScale";
import { CTABand } from "@/components/sections/CTABand";
import { IndustryCards } from "@/components/sections/IndustryCards";
import { Chip, ChipRow } from "@/components/shared/Chip";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { industries, industriesPage } from "@/data/industries";
import { primaryCta, secondaryCta } from "@/data/nav";

export const metadata = {
  title: "Industries We Serve",
  description:
    "Title companies, law firms, lenders, settlement and escrow companies, agencies, and underwriters.",
};

export default function IndustriesPage() {
  const { eyebrow, title, intro, chipsLabel, cta } = industriesPage;

  return (
    <>
      <SectionShell tone="white" labelledBy="industries-heading">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id="industries-heading" className="type-heading mt-7 text-ink">
              {title}
            </h1>
            <p className="mt-7 text-[17px] leading-[1.7] text-slate">{intro}</p>
          </div>

          {/* The seven types as taxonomy, each jumping to its own entry — a
              visitor should find their own desk without reading the page. */}
          <nav aria-label={chipsLabel}>
            <p className="type-label text-slate">{chipsLabel}</p>
            <ChipRow className="mt-6">
              {industries.map((industry) => (
                <a key={industry.id} href={`#industry-${industry.id}`}>
                  <Chip>{industry.title}</Chip>
                </a>
              ))}
            </ChipRow>
          </nav>
        </div>
      </SectionShell>

      <IndustryCards />

      <ClientScale />

      {/* <CTABand
        headingId="industries-cta"
        eyebrow={cta.eyebrow}
        heading={cta.heading}
        body={cta.body}
        primary={primaryCta}
        secondary={secondaryCta}
      /> */}
    </>
  );
}
