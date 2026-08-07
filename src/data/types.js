// @ts-check

/**
 * Shared shapes for everything under `src/data`. These files are the single
 * source of truth for the whole multi-page site — components read from them,
 * never the other way round.
 */

/**
 * @typedef {object} NavLink
 * @property {string} label Visible link text.
 * @property {string} href Absolute in-app route, always starting with "/".
 */

/**
 * @typedef {object} NavGroup
 * @property {string} title Column heading, rendered in uppercase mono.
 * @property {NavLink[]} links
 */

/**
 * @typedef {"Search" | "FileText" | "Landmark" | "Crosshair" | "ShieldCheck"
 *   | "Clock" | "Plus" | "CheckCircle2" | "Check"} IconName
 * Names resolved against the lucide-react icon map in `@/lib/icons`.
 */

/**
 * @typedef {object} Service
 * @property {string} id
 * @property {string} number Two-digit ledger index, e.g. "01".
 * @property {IconName} icon
 * @property {string} title
 * @property {string} body
 * @property {NavLink} link Call-to-action into the deep service page.
 */

/**
 * @typedef {object} Promise
 * @property {string} id
 * @property {IconName} icon
 * @property {string} title
 * @property {string} body
 */

/**
 * @typedef {object} Stat
 * @property {string} value Large display figure, e.g. "24h".
 * @property {string} caption Uppercase mono caption beneath the figure.
 */

/**
 * @typedef {object} Step
 * @property {string} id
 * @property {string} number Two-digit step index, e.g. "01".
 * @property {IconName} icon
 * @property {string} title
 * @property {string} body One line only — the landing page stays a teaser.
 */

/**
 * @typedef {object} ReportRow
 * @property {string} label Uppercase mono record label.
 * @property {string} value
 * @property {string} [note] Smaller muted mono line under the value.
 * @property {boolean} [mono] Render the value itself as record data (mono).
 * @property {boolean} [verified] Render the value in the muted verified green.
 */

export {};
