import { SolutionDetail } from "@/components/shared/SolutionDetail";
import { solutionsById } from "@/data/solutions";

export const metadata = {
  title: "Municipal Lien Solutions",
  description:
    "Unrecorded liens, code violations, and permit checks — the off-record exposures that standard title searches miss.",
};

export default function MunicipalLienPage() {
  return <SolutionDetail solution={solutionsById["municipal-lien"]} />;
}
