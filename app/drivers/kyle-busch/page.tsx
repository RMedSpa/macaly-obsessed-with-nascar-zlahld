import type { Metadata } from "next";
import LegendDriverProfilePage from "@/components/legend-driver-profile";
import { JsonLd, legendDriverJsonLd } from "@/components/json-ld";
import { getLegendDriver } from "@/lib/nascar-legends";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/drivers/kyle-busch");

export default function KyleBuschRoute() {
  const driver = getLegendDriver("kyle-busch");
  if (!driver) return null;

  return (
    <>
      <JsonLd data={legendDriverJsonLd(driver)} />
      <LegendDriverProfilePage driver={driver} />
    </>
  );
}
