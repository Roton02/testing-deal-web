import Link from "next/link";
import type { Deal } from "@/lib/data/deals";
import { Badge } from "@/components/ui/badge";

/**
 * A single deal card.
 *
 * Markup deliberately uses the CSS classes the scraper's default extractor
 * targets so static selector extraction works without AI:
 *   container: .deal / .offer / .coupon / [data-deal]
 *   .title .description .discount/.badge .code/.coupon-code
 *   time.expiry .brand/.merchant .category .terms/.conditions img a[href]
 *
 * `variant` changes only the wrapper class to prove the extractor tolerates
 * different structures across pages.
 */
export function DealCard({
  deal,
  variant = "deal",
}: {
  deal: Deal;
  variant?: "deal" | "offer" | "coupon" | "data";
}) {
  const wrapperClass =
    variant === "offer"
      ? "offer"
      : variant === "coupon"
        ? "coupon"
        : variant === "data"
          ? "promo"
          : "deal";

  const dataDeal = variant === "data" ? { "data-deal": "" } : {};

  return (
    <article
      {...dataDeal}
      className={`${wrapperClass} group flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md`}
    >
      {deal.image ? (
        // Plain <img> with the original absolute URL so the scraper extracts it.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={deal.image}
          alt={deal.title}
          loading="lazy"
          className="aspect-[3/2] w-full object-cover"
        />
      ) : (
        <div className="grid aspect-[3/2] w-full place-items-center bg-muted text-sm text-muted-foreground">
          No image provided
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          {deal.brand ? (
            <span className="brand merchant text-xs font-semibold uppercase tracking-wide text-primary">
              {deal.brand}
            </span>
          ) : (
            <span className="brand text-xs italic text-muted-foreground">
              Unknown brand
            </span>
          )}
          {deal.category && (
            <span className="category text-xs text-muted-foreground">
              {deal.category}
            </span>
          )}
        </div>

        <h3 className="title text-base font-semibold leading-snug">
          {deal.title}
        </h3>

        {deal.description && (
          <p className="description text-sm text-muted-foreground">
            {deal.description}
          </p>
        )}

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Badge className="discount badge">{deal.discount}</Badge>
          {deal.code && (
            <span className="code coupon-code rounded border border-dashed px-2 py-0.5 font-mono text-xs">
              {deal.code}
            </span>
          )}
        </div>

        <div className="mt-1 flex flex-wrap gap-1 text-xs text-muted-foreground">
          {deal.fulfillment.map((f) => (
            <span key={f} className="fulfillment rounded bg-muted px-1.5 py-0.5">
              {f}
            </span>
          ))}
          {deal.minOrder && (
            <span className="min-order rounded bg-muted px-1.5 py-0.5">
              Min {deal.minOrder}
            </span>
          )}
        </div>

        {deal.expiry ? (
          <time className="expiry mt-1 text-xs text-muted-foreground" dateTime={deal.expiry}>
            Expires {deal.expiry}
          </time>
        ) : (
          <span className="expiry mt-1 text-xs italic text-muted-foreground">
            No expiry date
          </span>
        )}

        {(deal.terms || deal.conditions) && (
          <div className="terms conditions mt-1 text-[11px] text-muted-foreground">
            {[deal.terms, deal.conditions].filter(Boolean).join(" ")}
          </div>
        )}

        <div className="mt-auto pt-3">
          <Link
            href={`/deal/${deal.id}`}
            className="deal-link text-sm font-medium text-primary hover:underline"
          >
            View deal details →
          </Link>
        </div>
      </div>
    </article>
  );
}
