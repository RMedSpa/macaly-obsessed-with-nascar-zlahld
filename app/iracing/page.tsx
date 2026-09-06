import type { Metadata } from 'next';
import IracingTipsGuide from '@/components/iracing-tips-guide';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd, iracingTipsJsonLd } from '@/components/json-ld';

export const metadata: Metadata = buildPageMetadata('/iracing');

export default function IracingPage() {
  return (
    <>
      <JsonLd data={iracingTipsJsonLd()} />
      <IracingTipsGuide />
    </>
  );
}
