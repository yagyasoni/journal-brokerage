import { JsonLd } from "@/components/seo/JsonLd";
import { SolutionDetail } from "@/components/shared/SolutionDetail";
import { breadcrumbLd, graph, pageMetadata, serviceLd } from "@/data/seo";
import { solutionsById } from "@/data/solutions";

export const metadata = pageMetadata("titleSearch");

/** The nine deliverables in the ledger below, as an offer catalogue. */
const structuredData = graph([serviceLd("title-search"), breadcrumbLd("titleSearch")]);

export default function TitleSearchPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <SolutionDetail solution={solutionsById["title-search"]} />
    </>
  );
}
