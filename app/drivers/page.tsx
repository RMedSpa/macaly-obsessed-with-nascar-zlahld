import type { Metadata } from 'next';
import DriverHub from '@/components/driver-hub';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd, driversJsonLd } from '@/components/json-ld';

export const metadata: Metadata = buildPageMetadata('/drivers');

export default function DriversPage() {
  return (
    <>
      <JsonLd data={driversJsonLd()} />
      <DriverHub />
    </>
  );
}
