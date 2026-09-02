import { JsonLd } from "@/components/seo/JsonLd";
import { CoreServices } from "@/components/sections/CoreServices";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RecordBand } from "@/components/sections/RecordBand";
import { SampleReport } from "@/components/sections/SampleReport";
import { ServeAndCoverage } from "@/components/sections/ServeAndCoverage";
import { StatementBand } from "@/components/sections/StatementBand";
import { WhyJournalBrokerage } from "@/components/sections/WhyJournalBrokerage";
import { graph, organizationLd, pageMetadata, websiteLd } from "@/data/seo";

export const metadata = pageMetadata("home");

/**
 * The company itself is described once, here, and every other page's structured
 * data points back at this `@id` rather than restating it.
 */
const structuredData = graph([organizationLd(), websiteLd()]);

/**
 * The landing page is an overview: each section introduces one area and hands
 * the reader to the page that holds the detail. Depth belongs to those pages,
 * never here.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Hero />
      <StatementBand />
      <CoreServices />
      <RecordBand />
      <WhyJournalBrokerage />
      <HowItWorks />
      <ServeAndCoverage />
      <SampleReport />
      <FinalCTA />
    </>
  );
}
