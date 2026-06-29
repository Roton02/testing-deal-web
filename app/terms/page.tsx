import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Legal terms (must not be scraped).",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs items={[{ label: "Terms" }]} />
      <PageHeader
        title="Terms of Service"
        badge="Should be IGNORED + Disallowed"
        description="Legal text only. Disallowed in robots.txt and contains no deals."
      />
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>This is placeholder terms-of-service text for a test environment.</p>
        <p>
          Acceptance of terms, use of service, limitation of liability, and
          governing law. No promotional or deal content here.
        </p>
      </div>
    </div>
  );
}
