import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail + BreadcrumbList JSON-LD (internal-link discovery). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href ? `${SITE.url}${c.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <JsonLd data={jsonLd} />
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {trail.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {c.href ? (
              <Link href={c.href} className="hover:text-foreground">
                {c.label}
              </Link>
            ) : (
              <span className="text-foreground">{c.label}</span>
            )}
            {i < trail.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
