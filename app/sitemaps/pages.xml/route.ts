import { STATIC_PAGE_PATHS } from "@/lib/data/sitemap-paths";

export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const origin = new URL(req.url).origin;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_PAGE_PATHS.map(
    (p) => `  <url><loc>${origin}${p === "/" ? "" : p}</loc></url>`,
  ).join("\n")}
</urlset>`;
  return new Response(body, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
