/**
 * Global site configuration: branding, navigation, and the canonical base URL
 * used in sitemaps + JSON-LD. The base URL is read from the request at runtime
 * for sitemaps; this constant is the fallback for absolute links.
 */

export const SITE = {
  name: "FlavorHub",
  tagline: "Your favorite restaurant brands, all the best deals in one place",
  description:
    "FlavorHub aggregates official deals, coupons, rewards and offers from the world's biggest restaurant brands. (Internal scraping test environment.)",
  // Override with NEXT_PUBLIC_SITE_URL when deploying to a tunnel/host.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000",
};

/** Header navigation — primary discovery surface. */
export const PRIMARY_NAV: { href: string; label: string }[] = [
  { href: "/menu", label: "Menu" },
  { href: "/deals", label: "Deals" },
  { href: "/offers", label: "Offers" },
  { href: "/coupons", label: "Coupons" },
  { href: "/promotions", label: "Promotions" },
  { href: "/rewards", label: "Rewards" },
  { href: "/locations", label: "Locations" },
];

/** Footer link groups — extra discovery + intentional "do not scrape" pages. */
export const FOOTER_NAV: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Deals",
    links: [
      { href: "/deals", label: "All Deals" },
      { href: "/offers", label: "Offers" },
      { href: "/coupons", label: "Coupons" },
      { href: "/promotions", label: "Promotions" },
      { href: "/rewards", label: "Rewards" },
      { href: "/specials", label: "Weekend Specials" },
      { href: "/menu/deals", label: "Menu Deals" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/news", label: "News" },
      { href: "/blog", label: "Blog" },
      { href: "/careers", label: "Careers" },
      { href: "/franchise", label: "Franchise" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/gift-cards", label: "Gift Cards" },
      { href: "/app", label: "Get the App" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/login", label: "Sign In" },
    ],
  },
  {
    title: "Testing",
    links: [{ href: "/testing-guide", label: "Testing Guide" }],
  },
];

export const SOCIAL_NAV: { href: string; label: string; external: string }[] = [
  { href: "/social/facebook", label: "Facebook", external: "https://facebook.com/flavorhub" },
  { href: "/social/instagram", label: "Instagram", external: "https://instagram.com/flavorhub" },
  { href: "/social/tiktok", label: "TikTok", external: "https://tiktok.com/@flavorhub" },
  { href: "/social/x", label: "X (Twitter)", external: "https://x.com/flavorhub" },
];

/** Resolve a path to an absolute URL using a runtime base (for sitemaps). */
export const absolute = (base: string, path: string) =>
  `${base.replace(/\/$/, "")}${path}`;
