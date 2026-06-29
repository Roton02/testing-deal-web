import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { menu } from "@/lib/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description: "Our full menu. No deals on this page.",
};

export default function MenuPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Menu" }]} />
      <PageHeader
        title="Our Menu"
        badge="Content-only · Tabs"
        description="A content-only page (no deal markup) rendered with client-side tabs. The deal-bearing page is /menu/deals."
      />

      <Tabs defaultValue={menu[0].name}>
        <TabsList className="flex-wrap">
          {menu.map((cat) => (
            <TabsTrigger key={cat.name} value={cat.name}>
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {menu.map((cat) => (
          <TabsContent key={cat.name} value={cat.name}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="overflow-hidden rounded-xl border bg-card"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="flex items-center justify-between p-4">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-primary">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <p className="mt-8 text-sm text-muted-foreground">
        Looking for discounts?{" "}
        <Link href="/menu/deals" className="text-primary hover:underline">
          See menu deals →
        </Link>
      </p>
    </div>
  );
}
