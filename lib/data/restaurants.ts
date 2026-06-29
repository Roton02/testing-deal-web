/**
 * Restaurant brands hosted on the test site.
 *
 * Real brands should EXACT-match restaurants already in the scraper DB; fake
 * brands should trigger the new-restaurant flow. `matchExpectation` is
 * documentation only (surfaced on /testing-guide), not consumed by the scraper.
 */

export type Restaurant = {
  slug: string;
  name: string;
  /** Alternate spellings used by some deals to test alias/fuzzy matching. */
  aliases: string[];
  category: string;
  cuisine: string[];
  website: string;
  logo: string;
  hero: string;
  description: string;
  real: boolean;
  matchExpectation: "exact" | "alias" | "fuzzy" | "new restaurant";
  locationIds: string[];
};

const img = (q: string, w = 1200, h = 600) =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(q)}`;
const logo = (text: string, color: string) =>
  `https://placehold.co/200x200/${color}/white/png?text=${encodeURIComponent(text)}`;

export const restaurants: Restaurant[] = [
  {
    slug: "mcdonalds",
    name: "McDonald's",
    aliases: ["McDonalds", "Mc Donald's", "Mcdonald", "Maccas"],
    category: "Burgers",
    cuisine: ["Burgers", "Fast Food", "Breakfast"],
    website: "https://www.mcdonalds.com",
    logo: logo("M", "DA291C"),
    hero: img("mcdonalds,burger"),
    description:
      "World-famous burgers, fries and McCafé coffee. Home of the Big Mac and Happy Meal.",
    real: true,
    matchExpectation: "exact",
    locationIds: ["us-ca-la", "us-tx-austin", "us-ny-nyc", "ca-on-toronto", "uk-london", "au-sydney"],
  },
  {
    slug: "subway",
    name: "Subway",
    aliases: ["Sub way", "Subways"],
    category: "Sandwiches",
    cuisine: ["Sandwiches", "Healthy", "Fast Food"],
    website: "https://www.subway.com",
    logo: logo("S", "008C15"),
    hero: img("subway,sandwich"),
    description: "Made-to-order subs, salads and wraps with fresh ingredients.",
    real: true,
    matchExpectation: "exact",
    locationIds: ["us-ny-nyc", "uk-london", "bd-dhaka", "au-sydney"],
  },
  {
    slug: "kfc",
    name: "KFC",
    aliases: ["Kentucky Fried Chicken", "K F C"],
    category: "Fried Chicken",
    cuisine: ["Fried Chicken", "Fast Food"],
    website: "https://www.kfc.com",
    logo: logo("KFC", "A4151A"),
    hero: img("fried,chicken"),
    description: "Finger lickin' good fried chicken, buckets and zinger burgers.",
    real: true,
    matchExpectation: "exact",
    locationIds: ["us-tx-austin", "bd-dhaka", "uk-london", "ca-on-toronto"],
  },
  {
    slug: "burger-king",
    name: "Burger King",
    aliases: ["BurgerKing", "BK"],
    category: "Burgers",
    cuisine: ["Burgers", "Fast Food"],
    website: "https://www.bk.com",
    logo: logo("BK", "D62300"),
    hero: img("whopper,burger"),
    description: "Home of the Whopper — flame-grilled burgers since 1954.",
    real: true,
    matchExpectation: "exact",
    locationIds: ["us-fl-miami", "uk-london", "au-melbourne"],
  },
  {
    slug: "pizza-hut",
    name: "Pizza Hut",
    aliases: ["PizzaHut", "Pizza-Hut"],
    category: "Pizza",
    cuisine: ["Pizza", "Italian", "Fast Food"],
    website: "https://www.pizzahut.com",
    logo: logo("PH", "E3000F"),
    hero: img("pizza,cheese"),
    description: "Pan pizzas, stuffed crust and wings delivered hot.",
    real: true,
    matchExpectation: "exact",
    locationIds: ["us-il-chicago", "bd-dhaka", "au-sydney"],
  },
  {
    slug: "dominos",
    name: "Domino's",
    aliases: ["Dominos", "Domino's Pizza", "Dominoes"],
    category: "Pizza",
    cuisine: ["Pizza", "Italian"],
    website: "https://www.dominos.com",
    logo: logo("D", "006491"),
    hero: img("pizza,pepperoni"),
    description: "Fast pizza delivery with the Domino's Tracker.",
    real: true,
    matchExpectation: "exact",
    locationIds: ["us-ca-la", "ca-on-toronto", "uk-london"],
  },
  {
    slug: "starbucks",
    name: "Starbucks",
    aliases: ["Star bucks", "Starbuck"],
    category: "Coffee Shop",
    cuisine: ["Coffee", "Cafe", "Bakery"],
    website: "https://www.starbucks.com",
    logo: logo("SB", "00704A"),
    hero: img("starbucks,coffee"),
    description: "Handcrafted coffee, Frappuccinos and seasonal favorites.",
    real: true,
    matchExpectation: "exact",
    locationIds: ["us-ny-nyc", "us-ca-la", "uk-london", "au-melbourne"],
  },

  // ── Fake brands (new-restaurant flow) ─────────────────────────────────────
  {
    slug: "abc-burger",
    name: "ABC Burger",
    aliases: ["ABC Burgers"],
    category: "Burgers",
    cuisine: ["Burgers", "American"],
    website: "https://abcburger.test",
    logo: logo("ABC", "7C3AED"),
    hero: img("gourmet,burger"),
    description: "A fictional gourmet smash-burger joint for new-restaurant testing.",
    real: false,
    matchExpectation: "new restaurant",
    locationIds: ["us-ca-la", "us-tx-austin"],
  },
  {
    slug: "pizza-planet",
    name: "Pizza Planet",
    aliases: ["PizzaPlanet"],
    category: "Pizza",
    cuisine: ["Pizza", "Italian"],
    website: "https://pizzaplanet.test",
    logo: logo("PP", "2563EB"),
    hero: img("pizza,wood,oven"),
    description: "A fictional galaxy-themed pizzeria for new-restaurant testing.",
    real: false,
    matchExpectation: "new restaurant",
    locationIds: ["us-tx-austin"],
  },
  {
    slug: "coffee-world",
    name: "Coffee World",
    aliases: ["CoffeeWorld"],
    category: "Coffee Shop",
    cuisine: ["Coffee", "Cafe"],
    website: "https://coffeeworld.test",
    logo: logo("CW", "92400E"),
    hero: img("cafe,latte"),
    description: "A fictional global coffee chain for new-restaurant testing.",
    real: false,
    matchExpectation: "new restaurant",
    locationIds: ["ca-on-toronto"],
  },
  {
    slug: "food-express",
    name: "Food Express",
    aliases: ["FoodExpress"],
    category: "Food Delivery",
    cuisine: ["Food Delivery", "Multi-cuisine"],
    website: "https://foodexpress.test",
    logo: logo("FE", "BE123C"),
    hero: img("food,delivery"),
    description: "A fictional food delivery aggregator for new-restaurant testing.",
    real: false,
    matchExpectation: "new restaurant",
    locationIds: ["bd-dhaka"],
  },
];

export const realRestaurants = restaurants.filter((r) => r.real);
export const fakeRestaurants = restaurants.filter((r) => !r.real);
export const restaurantBySlug = (slug: string) =>
  restaurants.find((r) => r.slug === slug);
