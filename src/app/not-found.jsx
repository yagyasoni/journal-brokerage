import { ButtonLink } from "@/components/shared/ButtonLink";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { routes } from "@/data/nav";

export const metadata = {
  title: "Page Not Found",
  // A 404 already returns the right status code, but Next renders this page at
  // whatever URL was missed — so without this, a mistyped link can put an
  // "Error 404" entry in the index under a URL that never existed.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SectionShell tone="white" size="opening">
      <div className="max-w-xl py-6 md:py-12">
        <Eyebrow>Error 404 · No record</Eyebrow>

        <h1 className="type-heading mt-7 text-ink">
          This entry isn&rsquo;t in the journal.
        </h1>

        <p className="mt-6 text-[15.5px] leading-[1.75] text-slate">
          The page you asked for either moved or was never recorded. Return to the
          overview, or send us the file you were looking for and we&rsquo;ll open it.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={routes.home} variant="gold" size="pill">
            Back to overview <span aria-hidden="true">&rarr;</span>
          </ButtonLink>
          <ButtonLink href={routes.contact} variant="outlineNavy" size="pill">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </SectionShell>
  );
}
