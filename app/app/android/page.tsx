import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AppLanding } from "@/components/app-landing";

export const metadata: Metadata = {
  title: "Android App",
  description: "FlavorHub on Google Play.",
};

export default function AndroidAppPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "App", href: "/app" }, { label: "Android" }]} />
      <AppLanding
        platform="Android"
        storeName="Google Play"
        storeUrl="https://play.google.com/store/apps/details?id=com.flavorhub.app"
        version="8.12.0"
        versionHistory={[
          { version: "8.12.0", date: "2026-06-18", notes: "New app-only deals and faster checkout." },
          { version: "8.11.2", date: "2026-05-30", notes: "Bug fixes and rewards improvements." },
          { version: "8.10.0", date: "2026-05-01", notes: "Added order tracking." },
        ]}
      />
    </div>
  );
}
