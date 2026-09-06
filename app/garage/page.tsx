import type { Metadata } from "next";
import GarageLanding from "@/components/garage-landing";
import { JsonLd, garageJsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/garage");

export default function GaragePage() {
  return (
    <>
      <JsonLd data={garageJsonLd()} />
      <GarageLanding />
    </>
  );
}
