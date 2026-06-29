/**
 * Renders a schema.org JSON-LD <script>. Server component — output is in the
 * static HTML so the scraper can read structured data without running JS.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
