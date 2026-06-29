/** Simple menu catalog used by /menu (no deals — tests a content-only page). */

export type MenuCategory = {
  name: string;
  items: { name: string; price: string; image: string }[];
};

const img = (q: string) =>
  `https://loremflickr.com/400/300/${encodeURIComponent(q)}`;

export const menu: MenuCategory[] = [
  {
    name: "Burgers",
    items: [
      { name: "Classic Cheeseburger", price: "$5.99", image: img("cheeseburger") },
      { name: "Double Bacon Burger", price: "$8.49", image: img("bacon,burger") },
      { name: "Crispy Chicken Burger", price: "$6.79", image: img("chicken,burger") },
    ],
  },
  {
    name: "Pizza",
    items: [
      { name: "Margherita", price: "$9.99", image: img("margherita,pizza") },
      { name: "Pepperoni Feast", price: "$12.99", image: img("pepperoni,pizza") },
      { name: "Veggie Supreme", price: "$11.49", image: img("veggie,pizza") },
    ],
  },
  {
    name: "Chicken",
    items: [
      { name: "8-Piece Bucket", price: "$14.99", image: img("fried,chicken,bucket") },
      { name: "Spicy Wings", price: "$7.99", image: img("chicken,wings") },
      { name: "Zinger Combo", price: "$9.49", image: img("chicken,sandwich") },
    ],
  },
  {
    name: "Coffee & Drinks",
    items: [
      { name: "Iced Caramel Latte", price: "$4.79", image: img("iced,latte") },
      { name: "Cappuccino", price: "$3.99", image: img("cappuccino") },
      { name: "Cold Brew", price: "$4.29", image: img("cold,brew,coffee") },
    ],
  },
  {
    name: "Sides & Desserts",
    items: [
      { name: "Large Fries", price: "$2.99", image: img("french,fries") },
      { name: "Chocolate Sundae", price: "$3.49", image: img("sundae,icecream") },
      { name: "Apple Pie", price: "$1.99", image: img("apple,pie") },
    ],
  },
];
