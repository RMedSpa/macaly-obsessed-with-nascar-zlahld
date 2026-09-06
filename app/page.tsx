import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { fetchSeriesNews, SERIES_CONFIG } from '@/lib/news';
import type { SeriesInfo, SeriesKey } from '@/lib/news';
import NascarHero from '@/components/nascar-hero';
import SeriesNewsGrid from '@/components/series-news-grid';
import DriverHubCTA from '@/components/driver-hub-cta';
import BeginnersCTA from '@/components/beginners-cta';
import IracingCTA from '@/components/iracing-cta';
import RaceSchedule from '@/components/race-schedule';
import CupStandings from '@/components/cup-standings';
import CupChaseCTA from '@/components/cup-chase-cta';
import TracksCta from '@/components/tracks-cta';
import LoveGarageCta from '@/components/love-garage-cta';
import TriviaNightCta from '@/components/trivia-night-cta';
import Schedule2027CTA from '@/components/schedule-2027-cta';
import CupRaceDebrief from '@/components/cup-race-debrief';
import NhmsLiveDesk from '@/components/nhms-live-desk';
import DarlingtonWeekendDesk from '@/components/darlington-weekend-desk';
import { getLiveCupRace } from '@/lib/nhms-live';
import TvGuide from '@/components/tv-guide';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd, websiteOrganizationJsonLd } from '@/components/json-ld';

// Defer social client bundle + X widgets off the critical path
const SocialFeed = dynamic(() => import('@/components/social-feed'), {
  loading: () => (
    <section
      id="social"
      className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12"
      aria-label="Social feed loading"
    >
      <div className="h-10 w-56 mx-auto mb-6 rounded bg-muted animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 h-80 rounded-md border border-border bg-card animate-pulse" />
        <div className="h-80 rounded-md border border-border bg-card animate-pulse" />
      </div>
    </section>
  ),
});

export const revalidate = 300;

export const metadata: Metadata = buildPageMetadata('/');

export default async function Home() {
  const seriesKeys: SeriesKey[] = ['cup', 'xfinity', 'truck', 'arca', 'indycar'];

  const results = await Promise.allSettled(
    seriesKeys.map((key) => fetchSeriesNews(key, 6))
  );

  const allSeriesNews: SeriesInfo[] = seriesKeys.map((key, i) => {
    const config = SERIES_CONFIG[key];
    const result = results[i];
    const items = result.status === 'fulfilled' ? result.value : [];
    return {
      key,
      name: config.name,
      shortName: config.shortName,
      color: config.color,
      label: config.label,
      items,
    };
  });

  console.log(
    'Loaded series news:',
    allSeriesNews.map((s) => `${s.key}: ${s.items.length} items`)
  );

  return (
    <>
      <JsonLd data={websiteOrganizationJsonLd()} />
      <main>
        <NascarHero />
        <DarlingtonWeekendDesk />
        {getLiveCupRace() && <NhmsLiveDesk />}
        {/* Weekly Cup race debrief — last weekend stays below the live desk */}
        <CupRaceDebrief />
        <BeginnersCTA />
        <IracingCTA />
        <DriverHubCTA />
        <TvGuide />
        <CupStandings />
        <CupChaseCTA />
        <TracksCta />
        <LoveGarageCta />
        <TriviaNightCta />
        <Schedule2027CTA />
        <RaceSchedule />
        <SeriesNewsGrid seriesNews={allSeriesNews} />
        <SocialFeed />
      </main>
    </>
  );
}
