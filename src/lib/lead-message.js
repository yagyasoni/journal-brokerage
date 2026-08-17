import { enquiryFields } from "@/data/contact";

/**
 * Turns a validated lead into the three things an email needs: a subject, a
 * list of label/value rows, and a plain-text body.
 *
 * The rows are built once and shared by the HTML template and the text
 * version, so the two can never describe different enquiries — a mismatch
 * between the parts of a multipart message is itself a spam signal.
 */

/** Header values must be a single line. Strip anything that could break one. */
function headerSafe(value) {
  return value.replace(/[\r\n\t]+/g, " ").trim();
}

function truncate(value, max) {
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;
}

/**
 * A subject a person can triage from the notification bar alone: what they
 * want, where, who they are. No exclamation marks, no capitals, no "URGENT" —
 * every one of those is a filter's cue to reach for the spam folder.
 *
 * @param {object} lead
 * @returns {string} e.g. "[New Lead] Title search · Orange County, FL · Meridian Title Partners"
 */
export function leadSubject(lead) {
  const parts = [
    truncate(headerSafe(lead.need), 60),
    truncate(headerSafe(lead.property), 60),
    truncate(headerSafe(lead.company || lead.name), 60),
  ].filter(Boolean);

  return truncate(`[New Lead] ${parts.join(" · ")}`, 180);
}

/**
 * Label/value rows in the order the visitor filled them in, empty optional
 * fields dropped.
 *
 * @param {object} lead
 * @returns {{ label: string, value: string }[]}
 */
export function leadRows(lead) {
  return enquiryFields
    .filter((field) => Boolean(lead[field.name]))
    .map((field) => ({ label: field.label, value: String(lead[field.name]) }));
}

/**
 * The plain-text alternative. Not a fallback nobody reads: a message with a
 * text part that matches its HTML part scores materially better with spam
 * filters than an HTML-only one.
 *
 * @param {{ label: string, value: string }[]} rows
 * @param {string} intro
 * @returns {string}
 */
export function leadText(rows, intro) {
  const width = Math.max(...rows.map((row) => row.label.length));
  const body = rows.map((row) => `${row.label.padEnd(width)}  ${row.value}`).join("\n");

  return `${intro}\n\n${body}\n\nReply to this email to answer the sender directly.\n`;
}
