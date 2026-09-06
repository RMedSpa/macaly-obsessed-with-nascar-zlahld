import type { Metadata } from 'next';
import Schedule2027Desk from '@/components/schedule-2027-desk';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd, schedule2027JsonLd } from '@/components/json-ld';

export const metadata: Metadata = buildPageMetadata('/2027-schedule');

export default function Schedule2027Page() {
  console.log('2027 schedule desk render');

  return (
    <>
      <JsonLd data={schedule2027JsonLd()} />
      <main>
        <Schedule2027Desk />
      </main>
    </>
  );
}
