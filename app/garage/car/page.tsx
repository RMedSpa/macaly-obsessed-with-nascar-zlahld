import type { Metadata } from "next";
import GarageCarForm from "@/components/garage-car-form";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/garage/car");

export default function GarageCarPage() {
  return <GarageCarForm />;
}
