import type { MetadataRoute } from 'next';
import { cupDriverSlugs } from '@/lib/cup-top10-drivers';
import { legendDriverSlugs } from '@/lib/nascar-legends';
import { trackSlugs } from '@/lib/tracks';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const driverPages = [
    {
      url: `${SITE_URL}/drivers/kyle-larson`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    ...cupDriverSlugs().map((slug) => ({
      url: `${SITE_URL}/drivers/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...legendDriverSlugs().map((slug) => ({
      url: `${SITE_URL}/drivers/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ];

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/beginners`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/iracing`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/drivers`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...driverPages,
    {
      url: `${SITE_URL}/pit-strategy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/tracks`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...trackSlugs().map((slug) => ({
      url: `${SITE_URL}/tracks/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/track-types`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/chase`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/garage`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/garage/board`,
      lastModified,
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/garage/rules`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/trivia`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/trivia/play`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/trivia/board`,
      lastModified,
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/trivia/rules`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/2027-schedule`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
