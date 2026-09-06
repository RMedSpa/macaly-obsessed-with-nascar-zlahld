import type { Metadata } from "next";
import GarageRules from "@/components/garage-rules";
import { JsonLd, garageRulesJsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/garage/rules");

export default function GarageRulesPage() {
  return (
    <>
      <JsonLd data={garageRulesJsonLd()} />
      <GarageRules />
    </>
  );
}
