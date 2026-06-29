# FlavorHub — Enterprise Scraping Test Website

A realistic **Next.js 15 + TypeScript + Tailwind + shadcn/ui** restaurant brand
website built **only** to validate the enterprise scraping pipeline before
pointing it at real sites (McDonald's, Subway, etc.).

It looks and behaves like a real multi-brand restaurant site, but every page
exists to exercise a specific scraper feature. It is **not** a production site.

> Does not modify the backend scraper or admin panel — it only serves content.

## Run

```bash
cd testing-scapp-website
npm install      # first time only
npm run dev      # http://localhost:4000  (next dev)
# production:
npm run build && npm run start
```

Then add `http://localhost:4000` as a `website` scraping source in the admin
panel and run a scrape. Open **/testing-guide** for the full page→feature map.

## Tech stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS + shadcn/ui-style components (Radix accordion/tabs)
- Dark / light mode via `next-themes`
- Server Components by default; Client Components for nav, tabs, accordion,
  theme toggle, lazy sections and infinite scroll

## What it tests

| Area | Where |
|---|---|
| Discovery | `robots.txt`, `sitemap.xml` (index) → `sitemaps/{pages,deals,restaurants}.xml`, header/footer/breadcrumb links |
| Page ranking | positive `/deals /offers /coupons /rewards /promotions /menu/deals` vs negative `/blog /news /privacy /terms /careers /login /admin` |
| Extraction | 100+ deals as `.deal/.offer/.coupon/[data-deal]` cards with title/description/discount/code/expiry/brand/category/terms/image/link |
| Offer types | 17 types: %, $, BOGO, free item/drink/fries/delivery, coupon, rewards, combo, family, lunch, weekend, student, military, birthday, app-only |
| Matching | exact (real brands), alias, fuzzy, new-restaurant (fake brands) |
| Validation | missing expiry/code/image/description, expired, invalid date |
| Duplicates | same deal placed across home/deals/offers/specials/coupons |
| Filtering | non-food noise (electronics/fashion/gift cards/cashback) |
| Dynamic content | lazy load, infinite scroll, tabs, accordion (expandable terms) |
| Structured data | schema.org Offer/Restaurant/FAQ + microdata + Open Graph |
| Locations | branches across USA/Canada/UK/Australia/Bangladesh (address/geo/phone/hours/services) |
| App (future) | `/app/android`, `/app/ios` store-style listings |
| Social (future) | `/social/{facebook,instagram,tiktok,x}` feeds (promo vs non-promo) |

## Images

Real-looking food photos come from **loremflickr.com** (Flickr Creative
Commons, by keyword) and **placehold.co** is used for coupon/promo banners with
visible text (e.g. `50% OFF`, `BOGO`, `SAVE $10`) to support future AI-Vision /
OCR extraction testing. Plain `<img>` tags with absolute URLs are used (not
`next/image`) so the scraper extracts the original image URL.

## Structure

```
app/                       App Router pages + route handlers (robots/sitemaps)
  deal/[id]/  restaurant/[slug]/   dynamic detail pages
  app/  social/            app + social simulation pages
components/                header/footer/deal-card/feeds + ui/ (shadcn-style)
lib/data/                  restaurants, deals (generator), locations, menu,
                           social, testing-guide
```

See **/testing-guide** (in the running site) for the authoritative, always
up-to-date mapping of pages to scraper features.
