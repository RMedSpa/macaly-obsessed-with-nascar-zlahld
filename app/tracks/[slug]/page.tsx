import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TrackDesk from '@/components/track-desk';
import { JsonLd, trackDeskJsonLd } from '@/components/json-ld';
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/site';
import { getTrack, trackSlugs } from '@/lib/tracks';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return trackSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const track = getTrack(slug);
  if (!track) {
    return { title: `Track not found | ${SITE_NAME}` };
  }
  const title = `${track.name} | Cup Track Desk`;
  const description = `${track.nickname} · ${track.location}. ${track.kindLabel}, ${track.length}. Last 10 Cup winners and the 2026 Chase date. Fan desk on nascarlove.org.`;
  const canonicalUrl = `${SITE_URL}/tracks/${track.slug}`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} social preview` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function TrackDeskRoute({ params }: PageProps) {
  const { slug } = await params;
  const track = getTrack(slug);
  if (!track) notFound();

  return (
    <>
      <JsonLd data={trackDeskJsonLd(track)} />
      <main>
        <TrackDesk track={track} />
      </main>
    </>
  );
}
