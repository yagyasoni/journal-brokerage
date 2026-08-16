import { SolutionDetail } from "@/components/shared/SolutionDetail";
import { solutionsById } from "@/data/solutions";

export const metadata = {
  title: "Title Search Solutions",
  description:
    "Ownership, deed, mortgage, and lien research — from current-owner checks to full chain-of-title abstracts.",
};

export default function TitleSearchPage() {
  return <SolutionDetail solution={solutionsById["title-search"]} />;
}
