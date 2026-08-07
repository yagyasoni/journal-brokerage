import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}
