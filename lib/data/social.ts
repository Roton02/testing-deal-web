/**
 * Simulated social media posts for the social-feed test pages.
 *
 * Some posts contain real deals (with a linked deal id), others are non-deal
 * brand chatter. Future social scraping must distinguish promotions from noise.
 */

export type SocialPlatform = "facebook" | "instagram" | "tiktok" | "x";

export type SocialPost = {
  id: string;
  platform: SocialPlatform;
  author: string;
  handle: string;
  avatar: string;
  timestamp: string;
  text: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  /** When set, this post advertises a real deal (id from deals.ts). */
  dealId?: string;
  isDeal: boolean;
  testNote: string;
};

const avatar = (text: string, color: string) =>
  `https://placehold.co/96x96/${color}/white/png?text=${encodeURIComponent(text)}`;
const photo = (q: string) =>
  `https://loremflickr.com/600/600/${encodeURIComponent(q)}`;
const banner = (text: string, color = "DA291C") =>
  `https://placehold.co/600x600/${color}/white/png?text=${encodeURIComponent(text)}`;

const base = (platform: SocialPlatform): Pick<SocialPost, "platform" | "author" | "handle" | "avatar"> => ({
  platform,
  author: "FlavorHub",
  handle: "@flavorhub",
  avatar: avatar("FH", "DA291C"),
});

export const socialPosts: SocialPost[] = [
  // Facebook
  {
    ...base("facebook"),
    id: "fb-1",
    timestamp: "2026-06-20T10:00:00Z",
    text: "🔥 50% OFF every Big Mac combo this week only! Use code BIGMAC50 at checkout. Tap to grab the deal 👇",
    image: banner("50% OFF"),
    likes: 1240, comments: 88, shares: 210,
    dealId: "mcdonalds-percentage-0",
    isDeal: true,
    testNote: "Facebook post WITH a deal (promo + code). Should be detected as a promotion.",
  },
  {
    ...base("facebook"),
    id: "fb-2",
    timestamp: "2026-06-19T14:00:00Z",
    text: "We're hiring crew members at our Downtown LA location! Join the FlavorHub family. #careers",
    image: photo("restaurant,team"),
    likes: 120, comments: 12, shares: 4,
    isDeal: false,
    testNote: "Facebook post WITHOUT a deal (hiring announcement). Should be ignored.",
  },
  {
    ...base("facebook"),
    id: "fb-3",
    timestamp: "2026-06-18T09:00:00Z",
    text: "Free Delivery on all orders over $15 from Domino's this weekend! 🍕🚚",
    image: photo("pizza,delivery"),
    likes: 880, comments: 40, shares: 95,
    dealId: "dominos-freedelivery-6",
    isDeal: true,
    testNote: "Facebook post WITH a free-delivery deal.",
  },
  // Instagram
  {
    ...base("instagram"),
    id: "ig-1",
    timestamp: "2026-06-21T12:00:00Z",
    text: "BOGO Whoppers all weekend 🍔🍔 Buy one, get one FREE. #BurgerKing #BOGO",
    image: banner("BOGO", "D62300"),
    likes: 5400, comments: 320, shares: 0,
    dealId: "burgerking-bogo-2",
    isDeal: true,
    testNote: "Instagram post WITH a BOGO deal.",
  },
  {
    ...base("instagram"),
    id: "ig-2",
    timestamp: "2026-06-20T08:00:00Z",
    text: "Behind the scenes at our coffee roastery ☕️ #coffee #roastery",
    image: photo("coffee,roastery"),
    likes: 2100, comments: 90, shares: 0,
    isDeal: false,
    testNote: "Instagram post WITHOUT a deal (lifestyle). Should be ignored.",
  },
  {
    ...base("instagram"),
    id: "ig-3",
    timestamp: "2026-06-19T16:00:00Z",
    text: "Students! Show your ID and save 15% at Subway 🥪 #StudentDiscount",
    image: photo("subway,sandwich"),
    likes: 1750, comments: 60, shares: 0,
    dealId: "subway-studentdiscount-13",
    isDeal: true,
    testNote: "Instagram post WITH a student discount.",
  },
  // TikTok
  {
    ...base("tiktok"),
    id: "tt-1",
    timestamp: "2026-06-21T18:00:00Z",
    text: "POV: you found the App-Only 30% OFF code 👀 #fyp #foodtok #deal",
    image: banner("APP ONLY", "111827"),
    likes: 98000, comments: 1200, shares: 4300,
    dealId: "dominos-appexclusive-16",
    isDeal: true,
    testNote: "TikTok post WITH an app-exclusive deal.",
  },
  {
    ...base("tiktok"),
    id: "tt-2",
    timestamp: "2026-06-20T20:00:00Z",
    text: "Trying every item on the secret menu 🤫 part 3 #foodtok",
    image: photo("burger,fries"),
    likes: 45000, comments: 800, shares: 900,
    isDeal: false,
    testNote: "TikTok post WITHOUT a deal (entertainment). Should be ignored.",
  },
  // X / Twitter
  {
    ...base("x"),
    id: "x-1",
    timestamp: "2026-06-21T11:00:00Z",
    text: "Double Star days are back ⭐️⭐️ Earn 2x Stars on every order through Sunday. #Starbucks",
    likes: 3200, comments: 110, shares: 540,
    dealId: "starbucks-rewardpoints-8",
    isDeal: true,
    testNote: "X post WITH a rewards deal (text-only, no image).",
  },
  {
    ...base("x"),
    id: "x-2",
    timestamp: "2026-06-20T15:00:00Z",
    text: "Thanks for 10M app downloads! You're the best 🧡",
    likes: 900, comments: 30, shares: 25,
    isDeal: false,
    testNote: "X post WITHOUT a deal (milestone). Should be ignored.",
  },
];

export const postsByPlatform = (p: SocialPlatform) =>
  socialPosts.filter((post) => post.platform === p);
