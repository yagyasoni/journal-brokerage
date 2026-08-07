/**
 * Gold outline seal with the certification set around the circle. Two arcs are
 * used rather than one continuous path so the lower text still reads upright.
 *
 * @param {{ top: string, bottom: string, className?: string }} props
 */
export function CertifiedSeal({ top, bottom, className }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={`${top} ${bottom}`}
      className={className}
    >
      <defs>
        <path id="seal-arc-top" fill="none" d="M 12,50 A 38,38 0 0 1 88,50" />
        <path id="seal-arc-bottom" fill="none" d="M 16,54 A 34,34 0 0 0 84,54" />
      </defs>

      <circle cx="50" cy="50" r="47" className="fill-none stroke-gold" strokeWidth="1" />
      <circle
        cx="50"
        cy="50"
        r="30.5"
        className="fill-none stroke-gold/45"
        strokeWidth="0.75"
      />

      <text
        className="fill-gold-deep font-sans uppercase"
        fontSize="8"
        letterSpacing="1.1"
        fontWeight="500"
      >
        <textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">
          {top}
        </textPath>
      </text>

      <text
        className="fill-gold-deep font-sans uppercase"
        fontSize="8"
        letterSpacing="2.4"
        fontWeight="500"
      >
        <textPath href="#seal-arc-bottom" startOffset="50%" textAnchor="middle">
          {bottom}
        </textPath>
      </text>

      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-gold-deep font-sans font-light"
        fontSize="17"
        letterSpacing="0.5"
      >
        JB
      </text>

      <path
        d="M 50,25.5 v 5 M 50,69.5 v 5"
        className="stroke-gold/45"
        strokeWidth="0.75"
      />
    </svg>
  );
}
