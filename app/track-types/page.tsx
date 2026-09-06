import type { Metadata } from 'next';
import TrackTypesGuide from '@/components/track-types-guide';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd, trackTypesJsonLd } from '@/components/json-ld';

export const metadata: Metadata = buildPageMetadata('/track-types');

export default function TrackTypesPage() {
  return (
    <>
      <JsonLd data={trackTypesJsonLd()} />
      <TrackTypesGuide />
    </>
  );
}
