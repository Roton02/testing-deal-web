import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { DealsGrid } from "@/components/deals-grid";
import { dealsForPage } from "@/lib/data/deals";

export const metadata: Metadata = {
  title: "Promotions",
  description: "Ongoing promotions and reward campaigns.",
};

export default function PromotionsPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Promotions" }]} />
      <PageHeader
        title="Promotions"
        badge="Discovery · Duplicates"
        description="Promotions (/promotions). Some deals here also appear on Rewards to test duplicate detection."
      />
      <DealsGrid deals={dealsForPage("promotions")} variant="cycle" />
    </div>
  );
}
