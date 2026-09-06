import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CupDriverProfilePage from "@/components/cup-driver-profile";
import { JsonLd, cupDriverJsonLd } from "@/components/json-ld";
import { cupDriverSlugs, getCupDriver } from "@/lib/cup-top10-drivers";
import { buildPageMetadata } from "@/lib/seo";
import type siteMetadata from "@/app/metadata.json";

type RouteKey = keyof typeof siteMetadata;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cupDriverSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const driver = getCupDriver(slug);
  if (!driver) {
    return { title: "Driver not found | Obsessed with NASCAR" };
  }
  return buildPageMetadata(`/drivers/${slug}` as RouteKey);
}

export default async function CupDriverRoute({ params }: PageProps) {
  const { slug } = await params;
  const driver = getCupDriver(slug);
  if (!driver) notFound();

  return (
    <>
      <JsonLd data={cupDriverJsonLd(driver)} />
      <CupDriverProfilePage driver={driver} />
    </>
  );
}
