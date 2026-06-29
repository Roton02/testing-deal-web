import type { Deal } from "@/lib/data/deals";
import { DealCard } from "@/components/deal-card";

/**
 * Server-rendered grid of deal cards. `variant` controls the card wrapper
 * markup; "cycle" rotates through all four variants to exercise the extractor
 * against mixed structures on a single page.
 */
export function DealsGrid({
  deals,
  variant = "deal",
}: {
  deals: Deal[];
  variant?: "deal" | "offer" | "coupon" | "data" | "cycle";
}) {
  const variants = ["deal", "offer", "coupon", "data"] as const;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {deals.map((deal, i) => (
        <DealCard
          key={deal.id}
          deal={deal}
          variant={variant === "cycle" ? variants[i % variants.length] : variant}
        />
      ))}
    </div>
  );
}
