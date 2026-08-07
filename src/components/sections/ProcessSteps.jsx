import { steps as defaultSteps } from "@/data/steps";
import { cn } from "@/lib/utils";

/**
 * The process, drawn as a rail rather than parked in four boxes.
 *
 * A hairline runs the width of the row with a gold node on each step, so the
 * eye reads the sequence before it reads a single word — which is the whole
 * point of a process. The rail becomes a vertical spine when the row stacks.
 *
 * @param {{
 *   steps?: import("@/data/types").Step[],
 *   tone?: "light" | "navy",
 *   className?: string,
 * }} props
 */
export function ProcessSteps({ steps = defaultSteps, tone = "light", className }) {
  const onNavy = tone === "navy";

  return (
    <ol className={cn("grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {steps.map((step) => (
        <li key={step.id} className="group/step relative pl-10 lg:pt-12 lg:pr-10 lg:pl-0">
          {/* The rail. Horizontal across the row on wide screens, vertical
              down the left edge when it stacks; hidden after the last node so
              the sequence ends rather than trailing off. */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-0 left-[5px] h-full w-px group-last/step:hidden lg:top-[5px] lg:left-0 lg:h-px lg:w-full",
              onNavy ? "bg-white/20" : "bg-rule-strong"
            )}
          />

          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1.5 left-0 size-2.5 rounded-full ring-4 lg:top-0 lg:left-0",
              onNavy ? "bg-gold-light ring-navy" : "bg-gold ring-paper"
            )}
          />

          <span
            className={cn(
              "type-label tnum block",
              onNavy ? "text-gold-light" : "text-gold-deep"
            )}
          >
            Step {step.number}
          </span>

          <h3 className={cn("type-title mt-5", onNavy ? "text-white" : "text-ink")}>
            {step.title}
          </h3>
          <p
            className={cn(
              "mt-3.5 max-w-xs text-[15px] leading-[1.7]",
              onNavy ? "text-mist" : "text-slate"
            )}
          >
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
