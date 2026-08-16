import { SolutionDetail } from "@/components/shared/SolutionDetail";
import { solutionsById } from "@/data/solutions";

export const metadata = {
  title: "Property Tax Solutions",
  description:
    "Tax search reports and pre-closing certificates that surface delinquencies and payoff amounts before they derail a deal.",
};

export default function PropertyTaxPage() {
  return <SolutionDetail solution={solutionsById["property-tax"]} />;
}
