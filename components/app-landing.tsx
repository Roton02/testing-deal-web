import Link from "next/link";
import { Download, Star, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DealsGrid } from "@/components/deals-grid";
import { dealsForPage } from "@/lib/data/deals";

/**
 * Reusable app-store landing layout for Android/iOS pages.
 * Mimics a real Play Store / App Store listing: screenshots, ratings, download
 * buttons, QR placeholder, version history, and app-exclusive offers. Future
 * app-discovery testing will plug into these pages.
 */
export function AppLanding({
  platform,
  storeName,
  storeUrl,
  version,
  versionHistory,
}: {
  platform: "Android" | "iOS";
  storeName: string;
  storeUrl: string;
  version: string;
  versionHistory: { version: string; date: string; notes: string }[];
}) {
  const appDeals = dealsForPage("app");
  const screenshots = [
    `https://loremflickr.com/300/600/app,food?lock=1`,
    `https://loremflickr.com/300/600/menu,phone?lock=2`,
    `https://loremflickr.com/300/600/coupon,phone?lock=3`,
  ];

  return (
    <div className="space-y-12">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <Badge variant="secondary">{storeName}</Badge>
          <h1 className="mt-3 text-3xl font-bold">FlavorHub for {platform}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.8
            </span>
            <span>· 1.2M ratings · Version {version}</span>
          </div>
          <p className="mt-4 text-muted-foreground">
            Order ahead, earn rewards and unlock app-exclusive deals. Download
            the official FlavorHub app for {platform}.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href={storeUrl}>
                <Download className="h-4 w-4" /> Download on {storeName}
              </a>
            </Button>
            <div className="flex items-center gap-2 rounded-lg border p-2 text-xs text-muted-foreground">
              <QrCode className="h-10 w-10" /> Scan to install
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          {screenshots.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={s}
              alt={`${platform} app screenshot ${i + 1}`}
              className="h-72 w-36 rounded-xl border object-cover"
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">App-Exclusive Offers</h2>
        <DealsGrid deals={appDeals} variant="data" />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Version History</h2>
        <ul className="divide-y rounded-xl border">
          {versionHistory.map((v) => (
            <li key={v.version} className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Version {v.version}</span>
                <span className="text-sm text-muted-foreground">{v.date}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{v.notes}</p>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm text-muted-foreground">
        Also available:{" "}
        <Link href="/app" className="text-primary hover:underline">
          all app platforms →
        </Link>
      </p>
    </div>
  );
}
