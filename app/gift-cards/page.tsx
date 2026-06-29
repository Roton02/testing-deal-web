import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Gift Cards",
  description: "Gift cards (intentional near-miss: should NOT be treated as food deals).",
};

const cards = [
  { amount: "$25", image: "https://placehold.co/400x250/DA291C/white/png?text=Gift+Card+%2425" },
  { amount: "$50", image: "https://placehold.co/400x250/008C15/white/png?text=Gift+Card+%2450" },
  { amount: "$100", image: "https://placehold.co/400x250/006491/white/png?text=Gift+Card+%24100" },
];

export default function GiftCardsPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Gift Cards" }]} />
      <PageHeader
        title="Gift Cards"
        badge="Near-miss · Should be IGNORED as a deal"
        description="Gift cards are not restaurant deals. A good scraper should not treat these as food promotions (content-filter near-miss)."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.amount} className="overflow-hidden rounded-xl border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt={`Gift card ${c.amount}`} className="w-full" />
            <div className="p-4 font-medium">{c.amount} Gift Card</div>
          </div>
        ))}
      </div>
    </div>
  );
}
