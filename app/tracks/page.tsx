import type { Metadata } from 'next';
import TracksIndex from '@/components/tracks-index';
import { JsonLd, tracksJsonLd } from '@/components/json-ld';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/tracks');

export default function TracksPage() {
  return (
    <>
      <JsonLd data={tracksJsonLd()} />
      <main>
        <TracksIndex />
      </main>
    </>
  );
}
