import type { Deal } from "@/lib/data/deals";

/**
 * Extra markup targeted by the backend Playwright extractor:
 *   .offer-type .website .start-at script.deal-locations script.deal-metadata
 */
export function DealScrapeFields({ deal }: { deal: Deal }) {
  return (
    <>
      <span className="offer-type sr-only">{deal.offerType}</span>

      {deal.website && (
        <a href={deal.website} className="website sr-only" rel="nofollow">
          {deal.website}
        </a>
      )}

      {deal.startAt && (
        <time className="start-at start-date" dateTime={deal.startAt}>
          {deal.startAt}
        </time>
      )}

      {deal.locations && deal.locations.length > 0 && (
        <script
          type="application/json"
          className="deal-locations"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(deal.locations),
          }}
        />
      )}

      {deal.metadata && Object.keys(deal.metadata).length > 0 && (
        <script
          type="application/json"
          className="deal-metadata"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(deal.metadata),
          }}
        />
      )}
    </>
  );
}
