"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Logo, LogoMark } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/SectionShell";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { brand, primaryCta, primaryNav, routes, secondaryCta } from "@/data/nav";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // The bar earns its hairline shadow only once the reader has left the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any navigation closes the drawer, including same-route taps.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isCurrent = (href) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  // Only the home page opens on the cinematic hero, and only its first screen:
  // the bar rides transparently over the footage, then resolves to the solid
  // white bar the rest of the site uses the moment the reader scrolls.
  const overlay = pathname === routes.home && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--ease-quiet)]",
        overlay ? "border-white/20 bg-transparent" : "border-rule bg-white",
        scrolled && "lift-bar"
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "h-px transition-opacity duration-500 ease-[var(--ease-quiet)]",
          scrolled ? "opacity-0" : "opacity-100",
          overlay ? "bg-white/20" : "bg-rule"
        )}
      />

      {/* ---- Menu row ---------------------------------------------------- */}
      <Container className="grid h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-4 md:h-[72px]">
        {/* The compact mark only exists once the crest has gone. */}
        <div
          className={cn(
            "justify-self-start transition-opacity duration-500 ease-[var(--ease-quiet)]"
          )}
        >
          <Logo
            tone={overlay ? "navy" : "light"}
            showTagline={false}
            compact
            // aria-hidden={scrolled ? undefined : "true"}
            // tabIndex={scrolled ? undefined : -1}
          />
        </div>

        {/* The full bar needs 1280px to sit inside the 1180px measure without
            crowding; below that the compact bar and drawer take over. */}
        <nav aria-label="Primary" className="hidden justify-self-center xl:block">
          <ul className="flex items-center">
            {primaryNav.map((link, index) => {
              const hasPanel = link.href === routes.solutions;
              return (
                <li
                  key={link.href}
                  className={cn(
                    "flex items-center",
                    // `static` keeps the panel's `inset-x-0` measured against
                    // the header, so it spans the full width of the bar.
                    hasPanel && "group/panel static"
                  )}
                >
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mx-4 h-2.5 w-px",
                        overlay ? "bg-white/25" : "bg-rule-strong"
                      )}
                    />
                  ) : null}

                  <Link
                    href={link.href}
                    aria-current={isCurrent(link.href) ? "page" : undefined}
                    className={cn(
                      "type-label relative block py-2.5 tracking-[0.12em] whitespace-nowrap transition-colors",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-400 after:ease-[var(--ease-quiet)] hover:after:scale-x-100",
                      hasPanel && "group-hover/panel:after:scale-x-100",
                      overlay ? "after:bg-gold-bright" : "after:bg-gold",
                      isCurrent(link.href)
                        ? overlay
                          ? "text-white after:scale-x-100"
                          : "text-navy after:scale-x-100"
                        : overlay
                          ? "text-white/75 hover:text-white"
                          : "text-slate hover:text-navy"
                    )}
                  >
                    {link.label}
                  </Link>

                  {/* The three service lines, laid out under the bar. Pure
                      CSS — hover or keyboard focus inside the item opens it,
                      so it works without a scrap of state. */}
                  {hasPanel ? (
                    <div className="invisible absolute inset-x-0 top-full translate-y-1 border-b border-rule bg-white opacity-0 shadow-[0_24px_48px_-32px_rgb(0_0_0/0.35)] transition-[opacity,transform,visibility] duration-400 ease-[var(--ease-quiet)] group-focus-within/panel:visible group-focus-within/panel:translate-y-0 group-focus-within/panel:opacity-100 group-hover/panel:visible group-hover/panel:translate-y-0 group-hover/panel:opacity-100">
                      <Container>
                        <ul className="grid grid-cols-3 gap-px bg-rule">
                          {services.map((service) => (
                            <li key={service.id} className="bg-white">
                              <Link
                                href={service.link.href}
                                className="group/svc block h-full px-7 py-8 transition-colors duration-300 ease-[var(--ease-quiet)] hover:bg-paper"
                              >
                                <span className="type-label tnum text-gold-deep">
                                  {service.number}
                                </span>
                                <span className="type-title mt-4 block text-ink">
                                  {service.title}
                                </span>
                                <span className="mt-2.5 block max-w-xs text-[14px] leading-[1.65] text-slate">
                                  {service.body}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </Container>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* One action in the bar, not two. The links need the width more than
            the consultation button does — it has the whole footer and every
            closing band to make its case. */}
        <div className="hidden shrink-0 items-center justify-self-end xl:flex">
          <ButtonLink href={primaryCta.href} variant="gold" size="navCta">
            {primaryCta.label} <span aria-hidden="true">&rarr;</span>
          </ButtonLink>
        </div>

        <div className="col-start-3 flex shrink-0 items-center gap-2 justify-self-end xl:hidden">
          <ButtonLink
            href={primaryCta.href}
            variant="gold"
            size="navCta"
            className="px-4 tracking-[0.07em] sm:px-5 sm:tracking-[0.1em]"
          >
            {primaryCta.label} <span aria-hidden="true">&rarr;</span>
          </ButtonLink>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant={overlay ? "outlineLight" : "outlineNavy"}
                  size="icon-lg"
                  className="rounded-full"
                  aria-expanded={menuOpen}
                  aria-haspopup="dialog"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                />
              }
            >
              <Menu aria-hidden="true" className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton
              className="w-[88%] max-w-sm border-l border-rule bg-white p-0"
            >
              <SheetHeader className="border-b border-rule px-6 py-5 text-left">
                <SheetTitle className="flex items-center gap-3 text-[15px] font-normal tracking-[0.14em] text-ink uppercase">
                  <LogoMark className="size-9" />
                  {brand.name}
                </SheetTitle>
                <SheetDescription className="type-label text-slate">
                  {brand.tagline}
                </SheetDescription>
              </SheetHeader>

              {/* Numbered, so the drawer reads as an index rather than a list. */}
              <nav aria-label="Mobile" className="px-6 py-2">
                <ul className="divide-y divide-rule">
                  {primaryNav.map((link, index) => (
                    <li key={link.href}>
                      <SheetClose
                        render={
                          <Link
                            href={link.href}
                            aria-current={isCurrent(link.href) ? "page" : undefined}
                            className={cn(
                              "flex items-baseline gap-4 py-4 transition-colors hover:text-gold-deep",
                              isCurrent(link.href) ? "text-gold-deep" : "text-ink"
                            )}
                          />
                        }
                      >
                        <span className="type-label tnum w-5 shrink-0 text-gold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[17px] font-light tracking-[0.06em] uppercase">
                          {link.label}
                        </span>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-rule px-6 py-6">
                <ButtonLink
                  href={primaryCta.href}
                  variant="gold"
                  size="pill"
                  className="w-full"
                >
                  {primaryCta.label} <span aria-hidden="true">&rarr;</span>
                </ButtonLink>
                <ButtonLink
                  href={secondaryCta.href}
                  variant="outlineNavy"
                  size="pill"
                  className="w-full"
                >
                  {secondaryCta.label}
                </ButtonLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
