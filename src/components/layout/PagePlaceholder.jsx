import { ArrowLink } from "@/components/shared/ArrowLink";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionShell } from "@/components/shared/SectionShell";
import { routes } from "@/data/nav";

/**
 * Scaffold for the routes the team is yet to build. It keeps navigation whole —
 * every link on the landing page resolves — and hands over the page shell,
 * heading level, and rhythm to build inside.
 *
 * @param {{
 *   eyebrow: string,
 *   title: string,
 *   children?: React.ReactNode,
 * }} props
 */
export function PagePlaceholder({ eyebrow, title, children }) {
  return (
    <SectionShell tone="white" size="opening">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="type-heading mt-7 text-ink">{title}</h1>

        {children ?? <p className="type-label mt-8 text-slate">Coming soon</p>}

        <hr className="mt-12 border-rule" />

        <ArrowLink href={routes.home} className="mt-8">
          Return to the overview
        </ArrowLink>
      </div>
    </SectionShell>
  );
}
