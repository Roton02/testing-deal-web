import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details (not deals).",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <PageHeader
        title="Contact Us"
        badge="Content-only (no deals)"
        description="Contact details only. No deal markup."
      />
      <ul className="space-y-3 text-muted-foreground">
        <li className="flex items-center gap-2">
          <Mail className="h-4 w-4" /> support@flavorhub.test
        </li>
        <li className="flex items-center gap-2">
          <Phone className="h-4 w-4" /> +1-800-555-0199
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="h-4 w-4" /> 1 Test Plaza, Internet
        </li>
      </ul>
    </div>
  );
}
