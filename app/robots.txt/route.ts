/**
 * robots.txt as a route handler so the Sitemap line always matches the host
 * actually being scraped (localhost, tunnel, etc.). Disallows noise paths.
 */
export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const origin = new URL(req.url).origin;
  const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /privacy
Disallow: /terms
Disallow: /careers

Sitemap: ${origin}/sitemap.xml
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
