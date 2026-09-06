import type { Metadata } from 'next';
import CupChaseBoard from '@/components/cup-chase-board';
import { fetchCupChaseBoard } from '@/lib/cup-chase';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd, cupChaseJsonLd } from '@/components/json-ld';

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata('/chase');

export default async function ChasePage() {
  const board = await fetchCupChaseBoard();
  console.log(
    'Chase page board',
    board.source,
    'inside',
    board.inside.length,
    'cut',
    board.cutLineDriver
  );

  return (
    <>
      <JsonLd data={cupChaseJsonLd()} />
      <main>
        <CupChaseBoard board={board} />
      </main>
    </>
  );
}
