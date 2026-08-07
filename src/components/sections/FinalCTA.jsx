import { CTABand } from "@/components/sections/CTABand";
import { primaryCta, secondaryCta } from "@/data/nav";

export function FinalCTA() {
  return (
    <CTABand
      headingId="final-cta-heading"
      eyebrow="Get in touch"
      heading="Your partner behind every closing"
      body="Send us a file today, or set up a standing arrangement for overflow you can rely on all year. Authentic data, delivered on time — that's the whole promise."
      primary={primaryCta}
      secondary={secondaryCta}
    />
  );
}
