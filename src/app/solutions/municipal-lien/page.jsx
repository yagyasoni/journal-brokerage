import { JsonLd } from "@/components/seo/JsonLd";
import { SolutionDetail } from "@/components/shared/SolutionDetail";
import { breadcrumbLd, graph, pageMetadata, serviceLd } from "@/data/seo";
import { solutionsById } from "@/data/solutions";

export const metadata = pageMetadata("municipalLien");

/** The seven deliverables in the ledger below, as an offer catalogue. */
const structuredData = graph([
  serviceLd("municipal-lien"),
  breadcrumbLd("municipalLien"),
]);

export default function MunicipalLienPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <SolutionDetail solution={solutionsById["municipal-lien"]} />
    </>
  );
}
