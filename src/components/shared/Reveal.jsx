"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Fades and rises its children into view exactly once. The transition itself
 * lives in globals.css on `[data-reveal]`; this only flips `data-revealed`.
 *
 * @param {{
 *   children: React.ReactNode,
 *   as?: React.ElementType,
 *   delay?: number,
 *   className?: string,
 * }} props
 */
export function Reveal({ children, as: Tag = "div", delay = 0, className, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Honour the OS setting, and degrade gracefully on very old engines.
    if (
      window.matchMedia?.(REDUCED_MOTION).matches ||
      !("IntersectionObserver" in window)
    ) {
      node.dataset.revealed = "true";
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
