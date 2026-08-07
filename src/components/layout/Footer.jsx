import Link from "next/link";

import { LogoMark } from "@/components/layout/Logo";
import { Container } from "@/components/shared/SectionShell";
import { brand, footerNav } from "@/data/nav";

export function Footer() {
  return (
    <footer className="border-t-2 border-gold bg-navy-deep text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              {/* The solid navy plate would vanish into the footer band. */}
              <LogoMark tone="navy" className="size-10" />
              <span className="text-[17px] leading-none font-light tracking-[0.24em] text-white uppercase">
                {brand.name}
              </span>
            </div>
            <p className="mt-7 text-[14.5px] leading-[1.7] text-mist">
              {brand.statement}
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="type-label text-gold-light">{group.title}</h2>
              <ul className="mt-7 space-y-4">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
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

        <div className="mt-14 flex flex-col gap-3 border-t border-rule-navy pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-label leading-relaxed text-mist">{brand.copyright}</p>
          <p className="type-label leading-relaxed text-mist">{brand.disciplines}</p>
        </div>
      </Container>
    </footer>
  );
}
