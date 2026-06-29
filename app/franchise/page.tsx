import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Franchise",
  description: "Franchise opportunities (not deals).",
};

export default function FranchisePage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs items={[{ label: "Franchise" }]} />
      <PageHeader
        title="Franchise With Us"
        badge="Content-only (no deals)"
        description="Business/franchise information. No consumer deals — should rank low."
      />
      <div className="space-y-4 text-muted-foreground">
        <p>
          Become a FlavorHub franchise partner. This page describes investment
          requirements and support — it contains no consumer deals.
        </p>
        <ul className="list-disc pl-5">
          <li>Initial investment: from $250,000</li>
          <li>Multi-unit and master franchise options</li>
          <li>Training and supply-chain support</li>
        </ul>
      </div>
    </div>
  );
}
