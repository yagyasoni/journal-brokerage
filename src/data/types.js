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
 * The deep version of one landing-page promise. The title and body are not
 * repeated here — they are read from `promises.js` by id.
 *
 * @typedef {object} PromiseDetail
 * @property {string} id Must match an id in `promises.js`.
 * @property {string} detail One paragraph expanding the promise.
 * @property {string[]} practice What the promise looks like on a live file.
 */

/**
 * The deep version of one headline number. Keyed to a `Stat` by caption, so
 * the figure itself is only written once.
 *
 * @typedef {object} StatDetail
 * @property {string} caption Must match a caption in `promises.js` stats.
 * @property {string} definition Full sentence for the deep page.
 */

/**
 * One customer type. `shortName` is the label the landing page lists;
 * everything else belongs to /industries.
 *
 * @typedef {object} Industry
 * @property {string} id
 * @property {string} shortName Landing-page label, e.g. "Law Firms".
 * @property {boolean} onLanding Whether the landing page lists this one.
 * @property {string} title Full name, used on /industries.
 * @property {string} body One paragraph describing the customer type.
 * @property {string[]} roles Job titles we work with there.
 */

/**
 * One control on an enquiry form. Shared by /contact, /order and
 * /request-consultation, which differ only in their field list and copy.
 *
 * @typedef {object} FormFieldDef
 * @property {string} name Submitted field name, and the input's id.
 * @property {string} label Visible label.
 * @property {"text" | "email" | "tel" | "select"} type
 * @property {boolean} [required]
 * @property {string} [placeholder]
 * @property {string} [autoComplete]
 * @property {string[]} [options] Choices, for `type: "select"` only.
 * @property {boolean} [full] Span both columns of the form grid.
 */

/**
 * One annotated part of the sample report, explaining a block of the card the
 * reader is looking at.
 *
 * @typedef {object} ReportPart
 * @property {string} id
 * @property {string} number Two-digit index, e.g. "01".
 * @property {string} title
 * @property {string} body
 */

/**
 * One tier of geographic coverage. The tiles are drawn from `id` — core is
 * filled, expanding is outlined — so the legend stays a presentation choice.
 *
 * @typedef {object} StateGroup
 * @property {string} id
 * @property {string} label
 * @property {string} description One line on what the tier means.
 * @property {string[]} states
 */

/**
 * One band of client size on /industries.
 *
 * @typedef {object} ClientScale
 * @property {string} id
 * @property {string} range Headcount band, e.g. "50–250 people".
 * @property {string} title
 * @property {string} body
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
 * One entry in a service catalogue: what the client can order, and what it is.
 * Deliberately not a `ReportRow` — that shape describes a line of one specific
 * document and carries `mono`/`verified` presentation flags a catalogue entry
 * has no use for.
 *
 * The two texts are the same entry at two depths: `definition` is the line in
 * the `/solutions` ledger, where twenty-one of them sit together; `detail` is
 * the entry on the service's own page, where nine of them have room to explain
 * themselves. Keep them saying the same thing.
 *
 * @typedef {object} Deliverable
 * @property {string} name Catalogue name, set as an uppercase label.
 * @property {string} definition One sentence of plain English, for `/solutions`.
 * @property {string} detail The fuller entry, for `/solutions/<line>`.
 */

/**
 * The deep content of one service line, shown on `/solutions` and on the
 * line's own page. Title, number and link are not repeated here — they are
 * read from `services.js` by id, so the two files cannot drift apart.
 *
 * @typedef {object} SolutionLine
 * @property {string} id Must match an id in `services.js`.
 * @property {string} overview One paragraph beneath the service heading. Used
 *   on both pages, so it is written to stand on its own.
 * @property {string} headline The service page's own `h1` — the promise the
 *   line makes, stated as a sentence.
 * @property {string} stake One paragraph on what the search protects the file
 *   from. The dark band in the middle of the service page.
 * @property {Deliverable[]} deliverables
 * @property {string} [ctaBody] Overrides the shared closing paragraph where
 *   this line asks for something different.
 */

/**
 * The annotated version of one landing-page step. Title and body are not
 * repeated here — they are read from `steps.js` by id.
 *
 * @typedef {object} StepDetail
 * @property {string} id Must match an id in `steps.js`.
 * @property {string} detail One paragraph on what the step actually involves.
 * @property {ReportRow[]} facts Two short records: what goes in, what governs it.
 * @property {NavLink} [link] Handoff to the page that owns the detail.
 */

/**
 * A full-bleed picture band whose frame opens as the reader scrolls past it.
 * `title` and `heading` are deliberately different lines, not one repeated:
 * the title is set over the small frame and leaves as the frame opens, and the
 * heading arrives inside it once it fills the screen.
 *
 * @typedef {object} ExpandBand
 * @property {string} image Path under `public/`, e.g. "/media/1.png".
 * @property {string} alt What the photograph shows.
 * @property {string} title Over the closed frame. Decorative — the heading
 *   below is the one that counts for the page outline.
 * @property {string} heading The section's real `h2`.
 * @property {string} body One paragraph under the heading.
 * @property {string} scrollHint Short prompt that fades on the first movement.
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
