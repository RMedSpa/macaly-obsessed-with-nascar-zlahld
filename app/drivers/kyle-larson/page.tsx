import type { Metadata } from "next";
import KyleLarsonPage from "@/components/kyle-larson-page";
import { JsonLd, kyleLarsonJsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/drivers/kyle-larson");

export default function KyleLarsonRoute() {
  return (
    <>
      <JsonLd data={kyleLarsonJsonLd()} />
      <KyleLarsonPage />
    </>
  );
}
