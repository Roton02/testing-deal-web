import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { DealsGrid } from "@/components/deals-grid";
import { dealsForPage } from "@/lib/data/deals";

export const metadata: Metadata = {
  title: "Menu Deals",
  description: "Combo meals, lunch deals and family feasts.",
};

export default function MenuDealsPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Menu", href: "/menu" }, { label: "Deals" }]} />
      <PageHeader
        title="Menu Deals"
        badge="Nested discovery path"
        description="Deals nested under /menu/deals — a positive discovery path that proves the ranker follows nested URLs."
      />
      <DealsGrid deals={dealsForPage("menu-deals")} variant="offer" />
    </div>
  );
}
