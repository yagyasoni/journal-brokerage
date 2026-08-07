import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata = {
  title: "Sample Report",
  description: "See exactly what lands in your file.",
};

export default function SampleReportPage() {
  return (
    <PagePlaceholder
      eyebrow="Sample report"
      title="See exactly what lands in your file."
    />
  );
}
