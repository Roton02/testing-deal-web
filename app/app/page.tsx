import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone, Apple } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Get the App",
  description: "Download the FlavorHub app for Android and iOS.",
};

export default function AppHubPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "App" }]} />
      <PageHeader
        title="Get the FlavorHub App"
        badge="App discovery (future)"
        description="Landing hub linking to the Android and iOS store pages. Future app-source scraping will discover deals from these."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="flex flex-col items-start gap-3 p-6">
            <Smartphone className="h-8 w-8 text-primary" />
            <h2 className="text-lg font-semibold">Android</h2>
            <p className="text-sm text-muted-foreground">
              Google Play listing with screenshots, ratings and app-only offers.
            </p>
            <Link href="/app/android" className="text-primary hover:underline">
              View Android app →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-start gap-3 p-6">
            <Apple className="h-8 w-8 text-primary" />
            <h2 className="text-lg font-semibold">iOS</h2>
            <p className="text-sm text-muted-foreground">
              App Store listing with screenshots, ratings and app-only offers.
            </p>
            <Link href="/app/ios" className="text-primary hover:underline">
              View iOS app →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
