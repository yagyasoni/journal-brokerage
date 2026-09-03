"use client";

import { useState } from "react";

import { stateGroups } from "@/data/coverage";
import { mapViewBox, stateShapes } from "@/data/state-map";
import { cn } from "@/lib/utils";

/**
 * The coverage map.
 *
 * Forty seven names set as running text is a wall — nothing in it can be
 * looked up, because there is no entry to find, only length. The same states
 * drawn on the country answer the one question a visitor actually has ("are
 * you in mine?") by being looked at.
 *
 * It is a real map: an Albers equal-area projection of the census outlines,
 * projected ahead of time in `state-map.js`, so there is a country on the page
 * and not a mapping library. Filled navy is core coverage, outlined in gold is
 * expanding, and the hairline between two states is the ground showing
 * through — which is why the map takes the tone of the band it sits on.
 *
 * Every state is hoverable, and hovering names it. That is not decoration:
 * eight states — Rhode Island, Delaware, Connecticut, New Jersey, Vermont, New
 * Hampshire, Massachusetts and Maryland — are too small at this scale to carry
 * two letters, and they are among the ones this business works in most. The
 * tooltip is where their names live, so it is set at title size rather than as
 * a hint, and it says the tier as well as the name.
 *
 * `onClick` alongside `onMouseEnter` for the same reason: a phone has no
 * hover, and a tap has to be able to ask the same question.
 */

/** The tier's own words, taken from the tier it belongs to — never retyped. */
const tierLabel = (tier) => stateGroups.find((group) => group.id === tier)?.label;

/**
 * The mark the two tiers are told apart by, at legend size. Exported so the
 * tier ledger beside the map and the ledger foot on the landing page draw the
 * same two marks the map does, out of one definition.
 *
 * Filled against outlined is the distinction — never the colour, which is why
 * the navy tone can swap both to gold and still say the same thing. On navy
 * the light tone's marks would be a navy square on a navy card and a white one
 * brighter than the type beside it.
 *
 * @param {{ tier: "core" | "expanding", tone?: "light" | "navy", className?: string }} props
 */
export function TierMark({ tier, tone = "light", className }) {
  const marks = {
    light: { core: "bg-navy", expanding: "border border-gold bg-white" },
    navy: { core: "bg-gold-light", expanding: "border border-gold-light" },
  };

  return (
    <span
      aria-hidden="true"
      className={cn("inline-block shrink-0 rounded-sm", marks[tone][tier], className)}
    />
  );
}

/**
 * @param {{ tone?: "white" | "paper", className?: string }} props
 */
export function CoverageMap({ tone = "white", className }) {
  const [active, setActive] = useState(null);

  const { width, height } = mapViewBox;

  // A card is placed against the state it names, then pushed back inside the
  // frame at the edges: one in the top fifth has no room above it and drops
  // below instead of rising off the top; one against the east or west coast
  // hangs from that side rather than centring and running off the measure.
  // The point moves with it, so it still marks the state and not the card.
  const below = active ? active.cy < height * 0.2 : false;
  const side = !active
    ? "center"
    : active.cx > width * 0.78
      ? "end"
      : active.cx < width * 0.22
        ? "start"
        : "center";

  // Against a zero-width anchor, `left-0` hangs the card's left edge off the
  // point and `right-0` its right edge — so the east coast pulls the card back
  // over the map rather than out past the measure.
  const cardX = { start: "left-0", center: "left-0 -translate-x-1/2", end: "right-0" };
  const pointX = { start: "left-6", center: "left-1/2 -translate-x-1/2", end: "right-6" };

  return (
    <div
      className={cn("@container relative w-full", className)}
      onMouseLeave={() => setActive(null)}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        // Fifty two-letter codes read aloud in projection order is worse than
        // useless, so the drawing is hidden and the list below says the same
        // thing in full names, already grouped by tier.
        aria-hidden="true"
        focusable="false"
        className="block h-auto w-full"
      >
        {stateShapes.map((state, index) => {
          const isCore = state.tier === "core";
          const isActive = active?.abbr === state.abbr;

          return (
            <g
              key={state.abbr}
              className="map-state"
              // The state's place in the west-to-east sweep. A number, not a
              // duration — the interval itself is set once, in the CSS.
              style={{ "--state-i": index }}
              onMouseEnter={() => setActive(state)}
              onClick={() => setActive(state)}
            >
              <path
                d={state.d}
                strokeWidth={isCore ? 1.1 : 1.6}
                className={cn(
                  "cursor-pointer transition-[fill] duration-200 ease-[var(--ease-quiet)]",
                  tone === "paper" ? "stroke-paper" : "stroke-white",
                  isCore ? "fill-navy" : "fill-white stroke-gold",
                  isActive && "fill-gold-deep"
                )}
              />

              {state.labelled ? (
                <text
                  x={state.cx}
                  y={state.cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={15}
                  fontWeight={500}
                  letterSpacing={1}
                  // The tracking is applied on both sides of every glyph, so
                  // the pair sits a half-step right of centre without this.
                  dx={-0.5}
                  className={cn(
                    // Under ~36rem of column the code lands near seven pixels
                    // and cannot be scaled up — the letters have to fit inside
                    // the state, and the state is what shrank. So they go, and
                    // the map keeps doing what it is there for: showing the
                    // shape of the coverage. The names are a tap away, which
                    // is where the nine smallest states have theirs anyway.
                    // A container query, not a media query: the landing page
                    // gives this half a column at any viewport.
                    "pointer-events-none @max-xl:hidden",
                    isCore || isActive ? "fill-white" : "fill-gold-deep"
                  )}
                >
                  {state.abbr}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      {/* The name, at the size a name deserves. Anchored to the state's own
          centre and taken out of the pointer's way, so crossing the map never
          chases the card it just opened. */}
      {active ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-10"
          style={{
            left: `${(active.cx / width) * 100}%`,
            top: `${(active.cy / height) * 100}%`,
          }}
        >
          <div
            className={cn(
              "lift-navy absolute rounded-sm bg-navy px-6 py-4 whitespace-nowrap",
              cardX[side],
              below ? "top-4" : "bottom-4"
            )}
          >
            {/* `whitespace-nowrap` has to sit on the paragraphs themselves,
                not only on the card: `p { text-wrap: pretty }` in globals.css
                sets the wrap *mode* back to `wrap`, so an inherited nowrap is
                undone on every paragraph on the site. */}
            <p className="type-title whitespace-nowrap text-white">{active.name}</p>
            <p className="type-label mt-2.5 flex items-center gap-2.5 whitespace-nowrap text-gold-light">
              <TierMark tier={active.tier} tone="navy" className="size-2" />
              {tierLabel(active.tier)}
            </p>

            {/* The card's point, turned to face the state it names. */}
            <span
              className={cn(
                "absolute size-2.5 rotate-45 bg-navy",
                pointX[side],
                below ? "-top-1" : "-bottom-1"
              )}
            />
          </div>
        </div>
      ) : null}

      {/* The map in words, for anything that cannot see it. Grouped by tier,
          so the distinction the fills carry is not lost with them. */}
      <div className="sr-only">
        {stateGroups.map((group) => (
          <section key={group.id}>
            <h3>{group.label}</h3>
            <ul>
              {group.states.map((state) => (
                <li key={state}>{state}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
