import { JsonLd } from "@/components/seo/JsonLd";
import { SolutionDetail } from "@/components/shared/SolutionDetail";
import { breadcrumbLd, graph, pageMetadata, serviceLd } from "@/data/seo";
import { solutionsById } from "@/data/solutions";

export const metadata = pageMetadata("propertyTax");

/** The five deliverables in the ledger below, as an offer catalogue. */
const structuredData = graph([serviceLd("property-tax"), breadcrumbLd("propertyTax")]);

export default function PropertyTaxPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <SolutionDetail solution={solutionsById["property-tax"]} />
    </>
  );
}
