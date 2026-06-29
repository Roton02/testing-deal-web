import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Login page (must not be scraped).",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm">
      <Breadcrumbs items={[{ label: "Sign In" }]} />
      <PageHeader title="Sign In" badge="Should be IGNORED + Disallowed" />
      <form className="space-y-4 rounded-xl border p-6">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            placeholder="••••••••"
          />
        </div>
        <Button type="button" className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
}
