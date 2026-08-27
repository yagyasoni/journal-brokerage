/**
 * One `application/ld+json` block.
 *
 * Structured data is the only thing on the site written for a machine rather
 * than a reader, so it renders nothing and occupies no space — a correct
 * `<JsonLd>` has a zero-pixel diff, like every other part of the SEO layer.
 *
 * Build the object with `graph()` from `@/data/seo`, which wraps the nodes in
 * the `@context` and `@graph` envelope Google expects.
 */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // The payload is our own data, never user input. The `<` escape is
      // belt-and-braces: a literal `</script>` inside any string would
      // otherwise close this tag early and spill the rest onto the page.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
