import type { Metadata } from "next";
import GarageBoard from "@/components/garage-board";
import { JsonLd, garageBoardJsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/garage/board");

export default function GarageBoardPage() {
  return (
    <>
      <JsonLd data={garageBoardJsonLd()} />
      <GarageBoard />
    </>
  );
}
