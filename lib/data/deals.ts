/**
 * Deal catalog (100+ deals) for the test site.
 *
 * Most deals are generated programmatically across brands and offer types;
 * a curated set of edge-case deals (missing fields, expired, invalid dates,
 * non-food noise, alias/fuzzy/new-restaurant brands) is appended.
 *
 * Every deal renders with scraper-friendly markup (see DealCard) and is also
 * placed on one or more listing pages. `placements` drives duplicate testing.
 */

import { restaurants, restaurantBySlug } from "./restaurants";

export type Fulfillment = "Dine-in" | "Pickup" | "Delivery";

export type DealOfferType =
  | "Percentage"
  | "Dollar"
  | "BOGO"
  | "Free Item"
  | "Free Drink"
  | "Free Fries"
  | "Free Delivery"
  | "Coupon Code"
  | "Reward Points"
  | "Combo Meal"
  | "Family Meal"
  | "Lunch Deal"
  | "Weekend Special"
  | "Student Discount"
  | "Military Discount"
  | "Birthday Offer"
  | "App Exclusive";

/** Listing pages a deal can appear on. */
export type PageKey =
  | "home"
  | "deals"
  | "offers"
  | "coupons"
  | "promotions"
  | "rewards"
  | "specials"
  | "menu-deals"
  | "app";

export type Deal = {
  id: string;
  brand: string; // restaurant name AS SHOWN (may be alias/misspelled/empty)
  restaurantSlug?: string;
  offerType: DealOfferType;
  title: string;
  description?: string;
  discount: string;
  code?: string;
  /** ISO date string, "INVALID" sentinel, or undefined when missing. */
  expiry?: string;
  category?: string;
  terms?: string;
  conditions?: string;
  fulfillment: Fulfillment[];
  minOrder?: string;
  maxDiscount?: string;
  originalPrice?: string;
  discountedPrice?: string;
  /** Official restaurant website (rendered as a scraper-readable anchor). */
  website?: string;
  currency?: string;
  image?: string;
  tags: string[];
  placements: PageKey[];
  /** Documentation: what scraper behavior this deal validates. */
  testNote: string;
};

const FUTURE = "2027-12-31";
const SOON = "2026-09-30";
const PAST = "2020-01-01";

const food = (q: string) =>
  `https://loremflickr.com/600/400/${encodeURIComponent(q)}`;
const banner = (text: string, color = "DA291C") =>
  `https://placehold.co/600x400/${color}/white/png?text=${encodeURIComponent(text)}`;

// Offer-type → how to render discount + sample copy.
const TYPE_TEMPLATES: Record<
  DealOfferType,
  { discount: string; title: (b: string) => string; desc: string; banner?: string }
> = {
  Percentage: { discount: "50% OFF", title: (b) => `50% Off Your ${b} Order`, desc: "Save 50% on eligible menu items.", banner: "50% OFF" },
  Dollar: { discount: "$10 OFF", title: (b) => `$10 Off at ${b}`, desc: "Take $10 off when you spend $30 or more.", banner: "SAVE $10" },
  BOGO: { discount: "Buy One Get One", title: (b) => `${b} Buy One Get One Free`, desc: "Buy any main and get a second one free.", banner: "BOGO" },
  "Free Item": { discount: "FREE ITEM", title: (b) => `Free Dessert at ${b}`, desc: "Get a free dessert with any combo." },
  "Free Drink": { discount: "FREE DRINK", title: (b) => `Free Drink with Any Meal`, desc: "Enjoy a free soft drink with any meal.", banner: "FREE DRINK" },
  "Free Fries": { discount: "FREE FRIES", title: (b) => `Free Fries at ${b}`, desc: "Free medium fries with any burger.", banner: "FREE FRIES" },
  "Free Delivery": { discount: "FREE DELIVERY", title: (b) => `Free Delivery from ${b}`, desc: "No delivery fee on orders over $15." },
  "Coupon Code": { discount: "20% OFF", title: (b) => `${b} Online Coupon`, desc: "Use the code at checkout to save 20%." },
  "Reward Points": { discount: "2X POINTS", title: (b) => `Earn Double Points`, desc: "Members earn 2x reward points this week." },
  "Combo Meal": { discount: "$6.99 COMBO", title: (b) => `${b} Combo Meal $6.99`, desc: "Main, side and drink for one low price." },
  "Family Meal": { discount: "$24.99", title: (b) => `${b} Family Feast`, desc: "Feeds four — mains, sides and drinks." },
  "Lunch Deal": { discount: "$5.99 LUNCH", title: (b) => `${b} Lunch Deal`, desc: "Weekday lunch special from 11am–2pm." },
  "Weekend Special": { discount: "30% OFF", title: (b) => `${b} Weekend Special`, desc: "Saturday & Sunday only — 30% off." },
  "Student Discount": { discount: "15% OFF", title: (b) => `${b} Student Discount`, desc: "Students save 15% with a valid ID." },
  "Military Discount": { discount: "10% OFF", title: (b) => `${b} Military Discount`, desc: "10% off for active & veteran military." },
  "Birthday Offer": { discount: "FREE TREAT", title: (b) => `Free Birthday Treat`, desc: "A free treat during your birthday month." },
  "App Exclusive": { discount: "30% OFF", title: (b) => `App-Only 30% Off`, desc: "Exclusive discount in our mobile app.", banner: "APP ONLY" },
};

const ROTATION: DealOfferType[] = [
  "Percentage", "Dollar", "BOGO", "Free Item", "Free Drink", "Free Fries",
  "Free Delivery", "Coupon Code", "Reward Points", "Combo Meal", "Family Meal",
  "Lunch Deal", "Weekend Special", "Student Discount", "Military Discount",
  "Birthday Offer", "App Exclusive",
];

const PLACEMENT_FOR_TYPE: Partial<Record<DealOfferType, PageKey[]>> = {
  "Coupon Code": ["coupons", "deals"],
  "Reward Points": ["rewards", "promotions"],
  "Birthday Offer": ["rewards"],
  "App Exclusive": ["app", "offers"],
  "Weekend Special": ["specials", "offers"],
  "Lunch Deal": ["menu-deals", "deals"],
  "Combo Meal": ["menu-deals", "deals"],
  "Family Meal": ["deals", "offers"],
};

const codeFor = (brand: string, type: DealOfferType, i: number) =>
  `${brand.replace(/[^A-Za-z]/g, "").slice(0, 5).toUpperCase()}${type
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 3)
    .toUpperCase()}${i}`;

const slugFor = (brand: string, type: DealOfferType, i: number) =>
  `${brand.replace(/[^A-Za-z]/g, "").toLowerCase()}-${type
    .replace(/[^A-Za-z]/g, "")
    .toLowerCase()}-${i}`;

const generated: Deal[] = [];

restaurants
  .filter((r) => r.real)
  .forEach((r, ri) => {
    // ~12 deals per real brand, cycling offer types.
    for (let i = 0; i < 12; i += 1) {
      const type = ROTATION[(ri + i) % ROTATION.length];
      const t = TYPE_TEMPLATES[type];
      const useBanner = Boolean(t.banner) && i % 3 === 0;
      const placements = PLACEMENT_FOR_TYPE[type] ?? ["deals", "offers"];
      // Make a few deals appear on home + extra pages to create duplicates.
      const withHome: PageKey[] =
        i === 0 ? (["home", ...placements, "specials"] as PageKey[]) : placements;

      generated.push({
        id: slugFor(r.name, type, i),
        brand: r.name,
        restaurantSlug: r.slug,
        offerType: type,
        title: t.title(r.name),
        description: t.desc,
        discount: t.discount,
        code: ["Coupon Code", "Percentage", "Dollar", "App Exclusive"].includes(type)
          ? codeFor(r.name, type, i)
          : undefined,
        expiry: i % 5 === 0 ? SOON : FUTURE,
        category: r.category,
        terms: "One use per customer. Cannot be combined with other offers.",
        conditions: "Valid at participating locations only.",
        fulfillment:
          type === "Free Delivery"
            ? ["Delivery"]
            : type === "App Exclusive"
              ? ["Delivery", "Pickup"]
              : ["Dine-in", "Pickup", "Delivery"],
        minOrder: type === "Free Delivery" ? "$15" : undefined,
        maxDiscount: type === "Percentage" ? "$20" : undefined,
        currency: "USD",
        image: useBanner ? banner(t.banner as string) : food(`${r.cuisine[0]},food`),
        tags: [r.category, type, ...(useBanner ? ["banner-text"] : [])],
        placements: withHome,
        testNote: `${type} offer for ${r.name} (exact match). ${
          i === 0 ? "Duplicated across home/specials." : ""
        }`,
      });
    }
  });

// A few deals for fake brands (new-restaurant flow).
restaurants
  .filter((r) => !r.real)
  .forEach((r) => {
    ["Percentage", "BOGO", "Free Delivery"].forEach((tp, i) => {
      const type = tp as DealOfferType;
      const t = TYPE_TEMPLATES[type];
      generated.push({
        id: slugFor(r.name, type, i),
        brand: r.name,
        restaurantSlug: r.slug,
        offerType: type,
        title: `${r.name} ${t.title(r.name)}`,
        description: t.desc,
        discount: t.discount,
        code: i === 0 ? codeFor(r.name, type, i) : undefined,
        expiry: FUTURE,
        category: r.category,
        terms: "Grand opening promotion.",
        fulfillment: ["Dine-in", "Pickup", "Delivery"],
        currency: "USD",
        image: food(`${r.cuisine[0]},food`),
        tags: [r.category, type, "new-restaurant"],
        placements: ["deals"],
        testNote: `${type} for fake brand ${r.name} → new-restaurant flow (no_match).`,
      });
    });
  });

// ── Complete deals (every field populated) ──────────────────────────────────
// These exist to exercise the auto-publish path: an EXACT-match brand that
// already lives in the DB, a real discount, a future parseable expiry, a unique
// title (so duplicate detection passes) and every other model field filled in.
// Each renders all fields the scraper reads (title/description/discount/code/
// expiry/brand/category/terms/image + price/min/max/fulfillment/currency).
const completeDeals: Deal[] = [
  {
    id: "complete-mcdonalds-bigmac",
    brand: "McDonald's", // exact match to seeded brand
    restaurantSlug: "mcdonalds",
    offerType: "Percentage",
    title: "Big Mac Meal 40% Off This Week",
    description:
      "Get 40% off the classic Big Mac meal — two all-beef patties, special sauce, fries and a drink. Order in-store, for pickup or delivery.",
    discount: "40% OFF",
    code: "BIGMAC40",
    expiry: FUTURE,
    category: "Burgers",
    terms: "One use per customer. Cannot be combined with other offers.",
    conditions: "Valid at participating US locations only. Dine-in or app order.",
    fulfillment: ["Dine-in", "Pickup", "Delivery"],
    minOrder: "$10",
    maxDiscount: "$8",
    originalPrice: "$11.99",
    discountedPrice: "$7.19",
    website: "https://www.mcdonalds.com",
    currency: "USD",
    image: food("bigmac,burger"),
    tags: ["Burgers", "Percentage", "complete", "auto-publish"],
    placements: ["deals", "offers"],
    testNote:
      "COMPLETE deal, exact brand match → maximizes data-quality score for the auto-publish path.",
  },
  {
    id: "complete-subway-footlong",
    brand: "Subway", // exact match to seeded brand
    restaurantSlug: "subway",
    offerType: "Dollar",
    title: "Any Footlong $6.99 — Complete Offer",
    description:
      "Build any Footlong sub for just $6.99 all day. Freshly made with your choice of bread, protein and veggies.",
    discount: "$6.99",
    code: "FOOT699",
    expiry: FUTURE,
    category: "Sandwiches",
    terms: "Excludes premium subs. One per visit.",
    conditions: "Participating locations. Online and in-app orders eligible.",
    fulfillment: ["Dine-in", "Pickup", "Delivery"],
    minOrder: "$6",
    maxDiscount: "$5",
    originalPrice: "$11.49",
    discountedPrice: "$6.99",
    website: "https://www.subway.com",
    currency: "USD",
    image: food("sandwich,sub"),
    tags: ["Sandwiches", "Dollar", "complete", "auto-publish"],
    placements: ["deals", "coupons"],
    testNote:
      "COMPLETE deal, exact brand match (Subway) → auto-publish candidate with full field coverage.",
  },
  {
    id: "complete-kfc-bucket",
    brand: "KFC", // exact match to seeded brand
    restaurantSlug: "kfc",
    offerType: "Percentage",
    title: "8-Piece Bucket 30% Off — Complete Offer",
    description:
      "Save 30% on a freshly prepared 8-piece chicken bucket with two large sides and biscuits.",
    discount: "30% OFF",
    code: "BUCKET30",
    expiry: FUTURE,
    category: "Fried Chicken",
    terms: "One use per customer. While supplies last.",
    conditions: "Valid at participating locations for pickup or delivery.",
    fulfillment: ["Pickup", "Delivery"],
    minOrder: "$15",
    maxDiscount: "$12",
    originalPrice: "$24.99",
    discountedPrice: "$17.49",
    website: "https://www.kfc.com",
    currency: "USD",
    image: food("fried,chicken"),
    tags: ["Fried Chicken", "Percentage", "complete", "auto-publish"],
    placements: ["deals", "offers"],
    testNote:
      "COMPLETE deal, exact brand match (KFC) → auto-publish candidate with full field coverage.",
  },
];

// ── Curated edge cases ──────────────────────────────────────────────────────
const edgeCases: Deal[] = [
  {
    id: "edge-alias-mcdonalds",
    brand: "McDonalds", // alias (no apostrophe)
    restaurantSlug: "mcdonalds",
    offerType: "Coupon Code",
    title: "McCafé Any Size Coffee $1",
    description: "Any size McCafé brewed coffee for a dollar.",
    discount: "$1",
    code: "MCCAFE1",
    expiry: FUTURE,
    category: "Coffee Shop",
    terms: "Brewed coffee only.",
    fulfillment: ["Dine-in", "Pickup"],
    currency: "USD",
    image: food("coffee,mccafe"),
    tags: ["alias", "Coffee"],
    placements: ["deals", "coupons"],
    testNote: "ALIAS match — brand shown as 'McDonalds' (no apostrophe).",
  },
  {
    id: "edge-fuzzy-mcdonald",
    brand: "Mcdonald", // misspelled
    restaurantSlug: "mcdonalds",
    offerType: "Free Item",
    title: "Happy Meal Bonus Toy",
    description: "Free collectible toy with every Happy Meal.",
    discount: "FREE TOY",
    expiry: FUTURE,
    category: "Burgers",
    terms: "While supplies last.",
    fulfillment: ["Dine-in", "Pickup"],
    currency: "USD",
    image: food("happy,meal"),
    tags: ["fuzzy", "Burgers"],
    placements: ["deals"],
    testNote: "FUZZY match — brand shown as misspelled 'Mcdonald'.",
  },
  {
    id: "edge-missing-expiry",
    brand: "Coffee World",
    restaurantSlug: "coffee-world",
    offerType: "Reward Points",
    title: "Buy 5 Get 1 Free Coffee",
    description: "Every sixth coffee is on us with the loyalty card.",
    discount: "1 FREE",
    code: "LOYAL6",
    // expiry intentionally omitted
    category: "Coffee Shop",
    terms: "Loyalty card required.",
    fulfillment: ["Dine-in", "Pickup"],
    currency: "USD",
    image: food("coffee,loyalty"),
    tags: ["missing-expiry", "new-restaurant"],
    placements: ["deals", "rewards"],
    testNote: "MISSING expiry + new restaurant. Validation should record reason.",
  },
  {
    id: "edge-missing-code",
    brand: "Pizza Hut",
    restaurantSlug: "pizza-hut",
    offerType: "Percentage",
    title: "25% Off Online Orders",
    description: "Save 25% on any online order — no code needed.",
    discount: "25% OFF",
    // code intentionally omitted
    expiry: FUTURE,
    category: "Pizza",
    terms: "Applied automatically at checkout.",
    fulfillment: ["Delivery", "Pickup"],
    currency: "USD",
    image: food("pizza,online"),
    tags: ["missing-code", "Pizza"],
    placements: ["deals", "offers"],
    testNote: "MISSING coupon code — reason recorded, deal still valid.",
  },
  {
    id: "edge-missing-image",
    brand: "KFC",
    restaurantSlug: "kfc",
    offerType: "Family Meal",
    title: "Family Feast $19.99",
    description: "Feed the whole family for under twenty dollars.",
    discount: "$19.99",
    code: "FAMILY20",
    expiry: FUTURE,
    category: "Fried Chicken",
    terms: "Serves four.",
    fulfillment: ["Pickup", "Delivery"],
    currency: "USD",
    // image intentionally omitted
    tags: ["missing-image", "Fried Chicken"],
    placements: ["deals"],
    testNote: "MISSING image — image field reason should be recorded.",
  },
  {
    id: "edge-missing-brand",
    brand: "", // empty brand
    offerType: "Percentage",
    title: "Mystery Meal Deal 35% Off",
    description: "A surprise discount on a surprise meal.",
    discount: "35% OFF",
    code: "MYSTERY35",
    expiry: FUTURE,
    terms: "Surprise item chosen at random.",
    fulfillment: ["Pickup"],
    currency: "USD",
    image: food("mystery,meal"),
    tags: ["missing-brand"],
    placements: ["deals"],
    testNote: "MISSING restaurant name → Unknown Business / no_match.",
  },
  {
    id: "edge-missing-description",
    brand: "Starbucks",
    restaurantSlug: "starbucks",
    offerType: "Dollar",
    title: "Refill $0.50",
    discount: "$0.50",
    code: "REFILL50",
    expiry: FUTURE,
    category: "Coffee Shop",
    terms: "Same visit only.",
    fulfillment: ["Dine-in"],
    currency: "USD",
    image: food("coffee,refill"),
    tags: ["missing-description", "Coffee"],
    placements: ["deals"],
    testNote: "MISSING description — validation flags missing required field.",
  },
  {
    id: "edge-expired",
    brand: "Burger King",
    restaurantSlug: "burger-king",
    offerType: "Percentage",
    title: "Year-End 60% Off (Expired)",
    description: "An already-expired offer to test expiry validation.",
    discount: "60% OFF",
    code: "OLD60",
    expiry: PAST,
    category: "Burgers",
    terms: "This promo has ended.",
    fulfillment: ["Dine-in", "Pickup"],
    currency: "USD",
    image: banner("60% OFF", "D62300"),
    tags: ["expired", "banner-text", "Burgers"],
    placements: ["deals"],
    testNote: "PAST expiry — auto-publish blocked → needs review.",
  },
  {
    id: "edge-invalid-date",
    brand: "Domino's",
    restaurantSlug: "dominos",
    offerType: "BOGO",
    title: "BOGO Pizza (Invalid Date)",
    description: "Buy one pizza get one free — with an unparseable expiry.",
    discount: "BOGO",
    code: "BOGOPIZZA",
    expiry: "INVALID", // unparseable sentinel
    category: "Pizza",
    terms: "Date format intentionally broken.",
    fulfillment: ["Delivery", "Pickup"],
    currency: "USD",
    image: food("pizza,two"),
    tags: ["invalid-date", "Pizza"],
    placements: ["deals"],
    testNote: "INVALID expiry date — expiry validation should fail → needs review.",
  },
  {
    id: "edge-dup-a",
    brand: "Subway",
    restaurantSlug: "subway",
    offerType: "Dollar",
    title: "$5 Footlong of the Day",
    description: "Any Footlong for $5 every day this month.",
    discount: "$5",
    code: "FOOTLONG5",
    expiry: FUTURE,
    category: "Sandwiches",
    terms: "Select subs only.",
    fulfillment: ["Dine-in", "Pickup"],
    currency: "USD",
    image: banner("SAVE $5", "008C15"),
    tags: ["duplicate", "banner-text", "Sandwiches"],
    placements: ["home", "deals", "offers", "coupons", "specials"],
    testNote: "DUPLICATE — same deal on 5 pages; dedup should collapse it.",
  },
  // Non-food noise (content filter should skip)
  {
    id: "noise-electronics",
    brand: "TechMart",
    offerType: "Percentage",
    title: "70% Off Laptops & TVs",
    description: "Huge electronics clearance on laptops, TVs and phones.",
    discount: "70% OFF",
    code: "TECH70",
    expiry: FUTURE,
    category: "Electronics",
    terms: "Electronics only.",
    fulfillment: ["Delivery"],
    currency: "USD",
    image: banner("70% OFF", "111827"),
    tags: ["non-food", "noise"],
    placements: ["deals"],
    testNote: "NON-FOOD (electronics) — content filter should skip.",
  },
  {
    id: "noise-fashion",
    brand: "StyleHub",
    offerType: "BOGO",
    title: "Buy 2 Get 1 Free Shoes",
    description: "Fashion sale on shoes, jackets and accessories.",
    discount: "BOGO",
    code: "STYLE3",
    expiry: FUTURE,
    category: "Fashion",
    terms: "Apparel only.",
    fulfillment: ["Delivery"],
    currency: "USD",
    image: banner("FASHION SALE", "7C3AED"),
    tags: ["non-food", "noise"],
    placements: ["deals"],
    testNote: "NON-FOOD (fashion) — content filter should skip.",
  },
  {
    id: "noise-giftcard",
    brand: "CashBackPro",
    offerType: "Reward Points",
    title: "5% Cashback on Gift Cards",
    description: "Earn cashback when you buy any gift card.",
    discount: "5% CASHBACK",
    code: "GIFT5",
    expiry: FUTURE,
    category: "Gift Cards",
    terms: "Gift cards only.",
    fulfillment: ["Delivery"],
    currency: "USD",
    image: banner("CASHBACK", "0EA5E9"),
    tags: ["non-food", "noise"],
    placements: ["deals"],
    testNote: "NON-FOOD (gift cards/cashback) — content filter should skip.",
  },
];

export const deals: Deal[] = [...completeDeals, ...generated, ...edgeCases];

export const dealById = (id: string) => deals.find((d) => d.id === id);

export const dealsForPage = (page: PageKey) =>
  deals.filter((d) => d.placements.includes(page));

export const dealsForRestaurant = (slug: string) =>
  deals.filter((d) => d.restaurantSlug === slug);

export const relatedDeals = (deal: Deal, limit = 3) =>
  deals
    .filter((d) => d.id !== deal.id && d.category === deal.category)
    .slice(0, limit);

export const DEAL_COUNT = deals.length;
