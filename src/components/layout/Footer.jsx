import Link from "next/link";

import { LogoLockup } from "@/components/layout/Logo";
import { Container } from "@/components/shared/SectionShell";
import { brand, footerNav } from "@/data/nav";
import { isExternalHref } from "@/lib/utils";

/**
 * The last screen.
 *
 * It used to be a padded strip stacked under the closing band — and because
 * both are `navy-deep`, the two sets of padding met in the middle and read as
 * a wide empty gap with a gold line lost inside it. It is a band like every
 * other band now: one screen, its own contents centred in it, and the legal
 * row pushed to the very bottom edge where a colophon belongs. The gold rule
 * at the top is the boundary between two screens rather than a line floating
 * in a void.
 */
export function Footer() {
  return (
    <footer className="band snap-start border-t-2 border-gold bg-navy-deep text-white">
      {/* `justify-between` over the band's own centring: the index takes the
          middle of the screen, the colophon takes the floor. */}
      <Container className="flex flex-1 flex-col justify-between py-(--band-pad-tight)">
        <div className="flex flex-1 items-center">
          <div className="grid w-full gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10">
            <div className="max-w-sm">
              {/* The one place with room for the lockup as drawn, tagline and
                  all — the bar has to make do with the mark. */}
              <LogoLockup className="w-60" />
              <p className="mt-7 text-[14.5px] leading-[1.7] text-mist">
                {brand.statement}
              </p>
            </div>

            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                {/* A `p`, not an `h2`: these three labels appear on every page,
                    and as headings they put "Solutions / Company / Get Started"
                    into all thirteen page outlines ahead of the real content.
                    The `nav` is already named by its `aria-label`, so nothing
                    is lost — and `type-label` carries the styling, so the
                    rendering is identical. */}
                <p className="type-label text-gold-light">{group.title}</p>
                <ul className="mt-7 space-y-4">
                  {group.links.map((link, id) => (
                    <li key={id}>
                      <Link
                        href={link.href}
                        target={isExternalHref(link.href) ? "_blank" : undefined}
                        rel={
                          isExternalHref(link.href) ? "noopener noreferrer" : undefined
                        }
                        className="text-[14.5px] text-mist transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex shrink-0 flex-col gap-3 border-t border-rule-navy pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-label leading-relaxed text-mist">{brand.copyright}</p>
          <p className="type-label leading-relaxed text-mist">{brand.disciplines}</p>
        </div>
      </Container>
    </footer>
  );
}
