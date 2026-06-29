import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions (not deals).",
};

const faqs = [
  { q: "How do I redeem a coupon?", a: "Enter the coupon code at checkout or show it in store." },
  { q: "Are deals available at all locations?", a: "Deals are valid at participating locations only." },
  { q: "Can I combine multiple offers?", a: "Most offers cannot be combined unless stated otherwise." },
  { q: "Do you have an app?", a: "Yes — download it from the App Download page for app-exclusive offers." },
  { q: "How often are new deals added?", a: "New deals are added regularly across all brands." },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="max-w-3xl">
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={[{ label: "FAQ" }]} />
      <PageHeader
        title="Frequently Asked Questions"
        badge="Accordion · FAQ JSON-LD"
        description="Content-only page using an accordion + FAQPage structured data. Not a deals page."
      />
      <Accordion type="single" collapsible>
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`q${i}`}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">{f.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
