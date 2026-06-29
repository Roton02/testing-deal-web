"use client";

import * as React from "react";
import type { Deal } from "@/lib/data/deals";
import { DealCard } from "@/components/deal-card";
import { Button } from "@/components/ui/button";

/**
 * Infinite-scroll deal list. Starts with a page of deals and appends more as
 * the sentinel scrolls into view. Tests how the scraper handles content that
 * only appears after scrolling (a load-more fallback button is also provided).
 */
export function InfiniteDeals({
  deals,
  pageSize = 6,
}: {
  deals: Deal[];
  pageSize?: number;
}) {
  const [count, setCount] = React.useState(pageSize);
  const sentinel = React.useRef<HTMLDivElement>(null);

  const loadMore = React.useCallback(() => {
    setCount((c) => Math.min(c + pageSize, deals.length));
  }, [pageSize, deals.length]);

  React.useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) loadMore();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  const visible = deals.slice(0, count);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((deal, i) => (
          <DealCard
            key={deal.id}
            deal={deal}
            variant={(["deal", "offer", "coupon", "data"] as const)[i % 4]}
          />
        ))}
      </div>

      {count < deals.length && (
        <div className="mt-8 flex flex-col items-center gap-3" ref={sentinel}>
          <p className="text-sm text-muted-foreground">
            Showing {count} of {deals.length} deals
          </p>
          <Button variant="outline" onClick={loadMore}>
            Load more deals
          </Button>
        </div>
      )}
    </div>
  );
}
