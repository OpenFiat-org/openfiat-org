/**
 * Emits a JSON-LD block. Values come from our own content pipeline, and
 * JSON.stringify escapes them; the `<` guard closes the one remaining way a
 * string could break out of the script element.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be inlined as script text
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
