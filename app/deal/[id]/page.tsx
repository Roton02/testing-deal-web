import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DealsGrid } from "@/components/deals-grid";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/json-ld";
import { deals, dealById, relatedDeals } from "@/lib/data/deals";
import { restaurantBySlug } from "@/lib/data/restaurants";
import { DealScrapeFields } from "@/components/deal-scrape-fields";

export function generateStaticParams() {
  return deals.map((d) => ({ id: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const deal = dealById(id);
  if (!deal) return { title: "Deal" };
  return {
    title: deal.title,
    description: deal.description ?? "Deal details",
    openGraph: {
      title: deal.title,
      description: deal.description,
      images: deal.image ? [deal.image] : [],
      type: "website",
    },
  };
}

export default async function DealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deal = dealById(id);
  if (!deal) notFound();

  const restaurant = deal.restaurantSlug
    ? restaurantBySlug(deal.restaurantSlug)
    : undefined;
  const related = relatedDeals(deal);

  const offerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: deal.title,
    description: deal.description,
    category: deal.category,
    priceCurrency: deal.currency ?? "USD",
    validFrom:
      deal.startAt && deal.startAt !== "INVALID" ? deal.startAt : undefined,
    validThrough:
      deal.expiry && deal.expiry !== "INVALID" ? deal.expiry : undefined,
    seller: deal.brand
      ? { "@type": "Restaurant", name: deal.brand }
      : undefined,
    image: deal.image,
  };

  return (
    <div>
      <JsonLd data={offerJsonLd} />
      <Breadcrumbs
        items={[
          { label: "Deals", href: "/deals" },
          ...(restaurant
            ? [{ label: restaurant.name, href: `/restaurant/${restaurant.slug}` }]
            : []),
          { label: deal.title },
        ]}
      />

      <article className="deal grid gap-8 lg:grid-cols-2">
        {deal.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={deal.image}
            alt={deal.title}
            className="aspect-[3/2] w-full rounded-2xl border object-cover"
          />
        ) : (
          <div className="grid aspect-[3/2] w-full place-items-center rounded-2xl border bg-muted text-muted-foreground">
            No image provided
          </div>
        )}

        <div>
          <div className="flex items-center gap-2">
            {deal.brand ? (
              <span className="brand merchant text-sm font-semibold uppercase text-primary">
                {deal.brand}
              </span>
            ) : (
              <span className="brand text-sm italic text-muted-foreground">
                Unknown brand
              </span>
            )}
            {deal.category && (
              <span className="category text-sm text-muted-foreground">
                · {deal.category}
              </span>
            )}
          </div>

          <h1 className="title mt-2 text-3xl font-bold">{deal.title}</h1>

          <DealScrapeFields deal={deal} />

          {deal.description ? (
            <p className="description mt-3 text-muted-foreground">
              {deal.description}
            </p>
          ) : (
            <p className="description mt-3 italic text-muted-foreground">
              No description provided.
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Badge className="discount badge text-base">{deal.discount}</Badge>
            {deal.code ? (
              <span className="code coupon-code rounded border border-dashed px-3 py-1 font-mono">
                {deal.code}
              </span>
            ) : (
              <span className="text-sm italic text-muted-foreground">
                No coupon code
              </span>
            )}
          </div>

          {(deal.originalPrice || deal.discountedPrice) && (
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              {deal.originalPrice && (
                <span className="original-price text-muted-foreground line-through">
                  {deal.originalPrice}
                </span>
              )}
              {deal.discountedPrice && (
                <span className="final-price text-lg font-semibold">
                  {deal.discountedPrice}
                </span>
              )}
              {deal.currency && (
                <span className="currency text-muted-foreground">
                  {deal.currency}
                </span>
              )}
            </div>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Offer type</dt>
              <dd className="offer-type font-medium">{deal.offerType}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Fulfillment</dt>
              <dd className="fulfillment font-medium">
                {deal.fulfillment.join(", ")}
              </dd>
            </div>
            {deal.startAt && (
              <div>
                <dt className="text-muted-foreground">Starts</dt>
                <dd className="start-at font-medium">{deal.startAt}</dd>
              </div>
            )}
            <div>
              <dt className="text-muted-foreground">Expiry</dt>
              <dd className="expiry font-medium">
                {deal.expiry
                  ? deal.isFullData
                    ? deal.expiry
                    : deal.expiry
                  : "Not provided"}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Currency</dt>
              <dd className="font-medium">{deal.currency ?? "—"}</dd>
            </div>
            {deal.website && (
              <div className="col-span-2">
                <dt className="text-muted-foreground">Website</dt>
                <dd>
                  <a
                    href={deal.website}
                    className="website text-primary hover:underline"
                  >
                    {deal.website}
                  </a>
                </dd>
              </div>
            )}
            {deal.minOrder && (
              <div>
                <dt className="text-muted-foreground">Minimum order</dt>
                <dd className="min-order font-medium">{deal.minOrder}</dd>
              </div>
            )}
            {deal.maxDiscount && (
              <div>
                <dt className="text-muted-foreground">Max discount</dt>
                <dd className="max-discount font-medium">{deal.maxDiscount}</dd>
              </div>
            )}
          </dl>

          {deal.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1">
              {deal.tags.map((t) => (
                <span
                  key={t}
                  className="tag rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {deal.locations && deal.locations.length > 0 && (
            <div className="locations mt-6 rounded-lg border bg-muted/30 p-4">
              <h3 className="mb-2 text-sm font-semibold">Participating locations</h3>
              <ul className="space-y-2 text-sm">
                {deal.locations.map((loc) => (
                  <li key={`${loc.name}-${loc.address}`} className="location">
                    <span className="location-name font-medium">{loc.name}</span>
                    {" — "}
                    <span className="location-address text-muted-foreground">
                      {loc.address}
                      {loc.city ? `, ${loc.city}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(deal.terms || deal.conditions) && (
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="terms">
                <AccordionTrigger>Terms &amp; Conditions</AccordionTrigger>
                <AccordionContent>
                  {deal.terms && (
                    <p className="terms text-muted-foreground">{deal.terms}</p>
                  )}
                  {deal.conditions && (
                    <p className="conditions text-muted-foreground">
                      {deal.conditions}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          {restaurant && (
            <p className="mt-6 text-sm">
              From{" "}
              <Link
                href={`/restaurant/${restaurant.slug}`}
                className="text-primary hover:underline"
              >
                {restaurant.name}
              </Link>{" "}
              · Official site:{" "}
              <a href={restaurant.website} className="text-primary hover:underline">
                {restaurant.website}
              </a>
            </p>
          )}
        </div>
      </article>

      <p className="mt-8 rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
        <strong>Test note:</strong> {deal.testNote}
        {deal.isFullData && (
          <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 font-semibold text-emerald-800">
            FULL DATA / AUTO-PUBLISH
          </span>
        )}
      </p>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold">Related Deals</h2>
          <DealsGrid deals={related} variant="cycle" />
        </section>
      )}
    </div>
  );
}
