import Link from "next/link";
import { FOOTER_NAV, SOCIAL_NAV, SITE } from "@/lib/site";

/** Footer: broad internal-link discovery surface + social links. */
export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-muted/30">
      <div className="container grid gap-8 py-12 md:grid-cols-5">
        <div className="md:col-span-1">
          <p className="text-lg font-bold">{SITE.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{SITE.tagline}</p>
        </div>

        {FOOTER_NAV.map((group) => (
          <div key={group.title}>
            <p className="mb-3 text-sm font-semibold">{group.title}</p>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            Follow us:{" "}
            {SOCIAL_NAV.map((s, i) => (
              <span key={s.href}>
                <Link href={s.href} className="hover:text-foreground">
                  {s.label}
                </Link>
                {i < SOCIAL_NAV.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
          <p>Internal scraping test environment — not a real business.</p>
        </div>
      </div>
    </footer>
  );
}
