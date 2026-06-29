import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { DealsGrid } from "@/components/deals-grid";
import { LazySection } from "@/components/lazy-section";
import { dealsForPage } from "@/lib/data/deals";

export const metadata: Metadata = {
  title: "Rewards",
  description: "Member rewards, points and birthday offers.",
};

export default function RewardsPage() {
  const rewardDeals = dealsForPage("rewards");
  return (
    <div>
      <Breadcrumbs items={[{ label: "Rewards" }]} />
      <PageHeader
        title="Rewards & Member Offers"
        badge="App-only · Lazy load"
        description="Loyalty, points and birthday offers (/rewards). Deals load lazily to test the extraction wait window."
      />
      <LazySection placeholder="Loading reward offers…">
        <DealsGrid deals={rewardDeals} variant="data" />
      </LazySection>
    </div>
  );
}
