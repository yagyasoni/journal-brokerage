import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { pageMetadata } from "@/data/seo";

// Carries `noindex` from `pageSeo`: an empty placeholder page in the index
// competes with the real ones and tells a visitor the site is unfinished.
export const metadata = pageMetadata("consultation");

export default function RequestConsultationPage() {
  return <PagePlaceholder eyebrow="Get in touch" title="Request a consultation." />;
}
