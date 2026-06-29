import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AppLanding } from "@/components/app-landing";

export const metadata: Metadata = {
  title: "iOS App",
  description: "FlavorHub on the App Store.",
};

export default function IosAppPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "App", href: "/app" }, { label: "iOS" }]} />
      <AppLanding
        platform="iOS"
        storeName="App Store"
        storeUrl="https://apps.apple.com/app/flavorhub/id1234567890"
        version="8.12.0"
        versionHistory={[
          { version: "8.12.0", date: "2026-06-18", notes: "New app-only deals and Live Activities." },
          { version: "8.11.0", date: "2026-05-22", notes: "Widget support and bug fixes." },
          { version: "8.9.0", date: "2026-04-15", notes: "Apple Wallet rewards card." },
        ]}
      />
    </div>
  );
}
