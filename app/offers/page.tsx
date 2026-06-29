import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { DealsGrid } from "@/components/deals-grid";
import { dealsForPage } from "@/lib/data/deals";

export const metadata: Metadata = {
  title: "Current Offers",
  description: "Limited-time offers across all brands.",
};

export default function OffersPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Offers" }]} />
      <PageHeader
        title="Current Offers"
        badge="Discovery · Extraction"
        description="A positive discovery path (/offers). Cards use the .offer markup variant."
      />
      <DealsGrid deals={dealsForPage("offers")} variant="offer" />
    </div>
  );
}
