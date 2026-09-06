import type { Metadata } from "next";
import GarageAdmin from "@/components/garage-admin";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/garage/admin");

export default function GarageAdminPage() {
  return <GarageAdmin />;
}
