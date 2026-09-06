import type { Metadata } from 'next';
import BeginnersGuide from '@/components/beginners-guide';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd, beginnersJsonLd } from '@/components/json-ld';

export const metadata: Metadata = buildPageMetadata('/beginners');

export default function BeginnersPage() {
  return (
    <>
      <JsonLd data={beginnersJsonLd()} />
      <BeginnersGuide />
    </>
  );
}
