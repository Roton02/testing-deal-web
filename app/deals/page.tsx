import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { InfiniteDeals } from "@/components/infinite-deals";
import { deals } from "@/lib/data/deals";

export const metadata: Metadata = {
  title: "All Deals",
  description: "Every restaurant deal, coupon and offer in one place.",
};

export default function DealsPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Deals" }]} />
      <PageHeader
        title="All Deals"
        badge="Extraction · Infinite scroll"
        description="The widest variety of offer types and markup variants. Uses infinite scroll + load-more to test scrolling extraction."
      />
      <InfiniteDeals deals={deals} pageSize={9} />
    </div>
  );
}
