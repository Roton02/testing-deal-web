"use client";

import * as React from "react";

/**
 * Renders its children only after the section scrolls into view (or after a
 * short delay). Simulates lazy-loaded content: a static fetch sees the
 * fallback/empty state, while a JS-rendering scraper (Playwright) sees the
 * real content after the wait window.
 */
export function LazySection({
  children,
  delayMs = 800,
  placeholder = "Loading offers…",
}: {
  children: React.ReactNode;
  delayMs?: number;
  placeholder?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setTimeout(() => setShow(true), delayMs);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} data-lazy-section data-loaded={show ? "true" : "false"}>
      {show ? (
        children
      ) : (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {placeholder}
        </p>
      )}
    </div>
  );
}
