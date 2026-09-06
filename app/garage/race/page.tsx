import type { Metadata } from "next";
import GarageRaceHq from "@/components/garage-race-hq";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/garage/race");

export default function GarageRacePage() {
  return <GarageRaceHq />;
}
