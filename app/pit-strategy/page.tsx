import type { Metadata } from 'next';
import PitStrategyCalculator from '@/components/pit-strategy-calculator';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd, pitStrategyJsonLd } from '@/components/json-ld';

export const metadata: Metadata = buildPageMetadata('/pit-strategy');

export default function PitStrategyPage() {
  return (
    <>
      <JsonLd data={pitStrategyJsonLd()} />
      <PitStrategyCalculator />
    </>
  );
}
