/** Sitemap INDEX → nested child sitemaps (forces index→child discovery). */
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const origin = new URL(req.url).origin;
  const children = [
    `${origin}/sitemaps/pages.xml`,
    `${origin}/sitemaps/deals.xml`,
    `${origin}/sitemaps/restaurants.xml`,
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${children.map((loc) => `  <sitemap><loc>${loc}</loc></sitemap>`).join("\n")}
</sitemapindex>`;
  return new Response(body, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
