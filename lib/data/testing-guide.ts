/** Maps every test page/area to the scraper feature it is meant to validate. */

export type GuideRow = {
  area: string;
  path: string;
  feature: string;
  expectation: string;
};

export const guideSections: { title: string; rows: GuideRow[] }[] = [
  {
    title: "Discovery",
    rows: [
      { area: "robots.txt", path: "/robots.txt", feature: "robots parsing", expectation: "Follow Sitemap line; honor Disallow for /admin /login /privacy /terms /careers." },
      { area: "Sitemap index", path: "/sitemap.xml", feature: "nested sitemaps", expectation: "Follow index → pages.xml, deals.xml, restaurants.xml." },
      { area: "Pages sitemap", path: "/sitemaps/pages.xml", feature: "URL enumeration", expectation: "Core pages listed." },
      { area: "Deals sitemap", path: "/sitemaps/deals.xml", feature: "URL enumeration", expectation: "Every /deal/:id listed (100+)." },
      { area: "Restaurants sitemap", path: "/sitemaps/restaurants.xml", feature: "URL enumeration", expectation: "Every /restaurant/:slug listed." },
      { area: "Header / Footer", path: "/", feature: "nav + internal links", expectation: "Discovery via menu, footer and breadcrumbs." },
    ],
  },
  {
    title: "Page Ranking",
    rows: [
      { area: "Deals", path: "/deals", feature: "positive ranking", expectation: "Selected to scrape (strong keyword)." },
      { area: "Offers", path: "/offers", feature: "positive ranking", expectation: "Selected to scrape." },
      { area: "Coupons", path: "/coupons", feature: "positive ranking", expectation: "Selected to scrape." },
      { area: "Rewards", path: "/rewards", feature: "positive ranking", expectation: "Selected to scrape." },
      { area: "Promotions", path: "/promotions", feature: "positive ranking", expectation: "Selected to scrape." },
      { area: "Menu Deals", path: "/menu/deals", feature: "nested positive path", expectation: "Selected to scrape." },
      { area: "Blog", path: "/blog", feature: "negative ranking", expectation: "Ignored — no deal markup." },
      { area: "News", path: "/news", feature: "negative ranking", expectation: "Ignored." },
      { area: "Privacy", path: "/privacy", feature: "negative + disallow", expectation: "Not scraped." },
      { area: "Terms", path: "/terms", feature: "negative + disallow", expectation: "Not scraped." },
      { area: "Careers", path: "/careers", feature: "negative + disallow", expectation: "Not scraped." },
      { area: "Login / Admin", path: "/login, /admin", feature: "disallow", expectation: "Not scraped." },
    ],
  },
  {
    title: "Extraction",
    rows: [
      { area: "Deal cards", path: "/deals", feature: "selector extraction", expectation: "Title, description, discount, code, expiry, brand, category, terms, image, link." },
      { area: "Markup variants", path: "/deals", feature: "structure tolerance", expectation: "Handles .deal / .offer / .coupon / [data-deal]." },
      { area: "Deal detail", path: "/deal/:id", feature: "full-field extraction", expectation: "All fields + Offer JSON-LD + Open Graph." },
    ],
  },
  {
    title: "Restaurant Matching",
    rows: [
      { area: "McDonald's", path: "/restaurant/mcdonalds", feature: "exact match", expectation: "Matches existing restaurant." },
      { area: "Alias", path: "/deal/edge-alias-mcdonalds", feature: "alias match", expectation: "'McDonalds' → McDonald's." },
      { area: "Fuzzy", path: "/deal/edge-fuzzy-mcdonald", feature: "fuzzy match", expectation: "'Mcdonald' → McDonald's." },
      { area: "ABC Burger", path: "/restaurant/abc-burger", feature: "new restaurant", expectation: "No match → new-restaurant flow." },
      { area: "Empty brand", path: "/deal/edge-missing-brand", feature: "unknown brand", expectation: "Unknown business → no_match." },
    ],
  },
  {
    title: "Validation (missing / invalid data)",
    rows: [
      { area: "Missing expiry", path: "/deal/edge-missing-expiry", feature: "missing field reason", expectation: "Records reason; quality reduced." },
      { area: "Missing code", path: "/deal/edge-missing-code", feature: "missing field reason", expectation: "Reason recorded; still valid." },
      { area: "Missing image", path: "/deal/edge-missing-image", feature: "missing field reason", expectation: "Image reason recorded." },
      { area: "Missing description", path: "/deal/edge-missing-description", feature: "validation flag", expectation: "Flagged → needs review." },
      { area: "Expired", path: "/deal/edge-expired", feature: "expiry validation", expectation: "Past date → auto-publish blocked." },
      { area: "Invalid date", path: "/deal/edge-invalid-date", feature: "expiry parsing", expectation: "Unparseable → needs review." },
    ],
  },
  {
    title: "Duplicates & Filtering",
    rows: [
      { area: "Cross-page dupes", path: "/deal/edge-dup-a", feature: "duplicate detection", expectation: "Same deal on 5 pages collapses to one." },
      { area: "Electronics", path: "/deal/noise-electronics", feature: "content filter", expectation: "Skipped (non-food)." },
      { area: "Fashion", path: "/deal/noise-fashion", feature: "content filter", expectation: "Skipped (non-food)." },
      { area: "Gift cards", path: "/gift-cards", feature: "content filter near-miss", expectation: "Not treated as a food deal." },
    ],
  },
  {
    title: "Dynamic Content",
    rows: [
      { area: "Rewards (lazy)", path: "/rewards", feature: "lazy load", expectation: "Deals appear after wait window; static fetch sees placeholder." },
      { area: "Deals (infinite)", path: "/deals", feature: "infinite scroll", expectation: "More deals append on scroll / load-more." },
      { area: "Menu (tabs)", path: "/menu", feature: "client tabs", expectation: "Tab content rendered client-side." },
      { area: "Deal terms (accordion)", path: "/deal/:id", feature: "expandable terms", expectation: "Terms inside accordion still in DOM." },
    ],
  },
  {
    title: "Structured Data & Metadata",
    rows: [
      { area: "Offer JSON-LD", path: "/deal/:id", feature: "schema.org Offer", expectation: "Offer structured data in head." },
      { area: "Restaurant JSON-LD", path: "/restaurant/:slug", feature: "schema.org Restaurant", expectation: "Restaurant structured data + sameAs aliases." },
      { area: "Location JSON-LD", path: "/locations", feature: "schema.org + microdata", expectation: "PostalAddress + GeoCoordinates." },
      { area: "Open Graph", path: "all pages", feature: "OG tags", expectation: "og:title/description/image present." },
    ],
  },
  {
    title: "App & Social (future)",
    rows: [
      { area: "Android", path: "/app/android", feature: "app discovery (future)", expectation: "Store-style listing + app-only offers." },
      { area: "iOS", path: "/app/ios", feature: "app discovery (future)", expectation: "Store-style listing + app-only offers." },
      { area: "Facebook", path: "/social/facebook", feature: "social scraping (future)", expectation: "Distinguish promo vs non-promo posts." },
      { area: "Instagram", path: "/social/instagram", feature: "social scraping (future)", expectation: "Promo vs lifestyle." },
      { area: "TikTok", path: "/social/tiktok", feature: "social scraping (future)", expectation: "Promo vs entertainment." },
      { area: "X (Twitter)", path: "/social/x", feature: "social scraping (future)", expectation: "Text-only promo detection." },
    ],
  },
];
