import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn, isExternalHref } from "@/lib/utils";

/**
 * Every call to action on this site navigates — there are no anchor jumps. This
 * wraps `next/link` in the shadcn button variants (the pattern shadcn itself
 * recommends for links) so buttons stay real anchors for keyboard and
 * middle-click.
 *
 * @param {{
 *   href: string,
 *   children: React.ReactNode,
 *   variant?: "gold" | "outlineNavy" | "outlineLight",
 *   size?: "pill" | "heroPill" | "navCta",
 *   className?: string,
 * }} props
 */
export function ButtonLink({
  href,
  children,
  variant = "gold",
  size = "pill",
  className,
  ...props
}) {
  // An off-site destination (the booking page) opens in a new tab so the
  // visitor keeps the page they were reading. `rel` goes with it, always.
  const external = isExternalHref(href);

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}
