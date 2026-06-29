import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { DealsGrid } from "@/components/deals-grid";
import { dealsForPage } from "@/lib/data/deals";

export const metadata: Metadata = {
  title: "Weekend Specials",
  description: "Saturday & Sunday only specials.",
};

export default function SpecialsPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Specials" }]} />
      <PageHeader
        title="Weekend Specials"
        badge="Discovery · Duplicates"
        description="Weekend-only specials (/specials). Several deals repeat from Home/Deals/Offers to test duplicate detection."
      />
      <DealsGrid deals={dealsForPage("specials")} variant="offer" />
    </div>
  );
}
