import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { DealsGrid } from "@/components/deals-grid";
import { dealsForPage } from "@/lib/data/deals";

export const metadata: Metadata = {
  title: "Coupons",
  description: "Coupon-code deals you can use at checkout.",
};

export default function CouponsPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Coupons" }]} />
      <PageHeader
        title="Coupons"
        badge="Coupon parsing"
        description="Coupon-code focused deals (/coupons). Tests coupon code extraction; cards use the .coupon markup variant."
      />
      <DealsGrid deals={dealsForPage("coupons")} variant="coupon" />
    </div>
  );
}
