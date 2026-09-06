import type { Metadata } from 'next';
import siteMetadata from '@/app/metadata.json';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';

type RouteKey = keyof typeof siteMetadata;

type RouteMeta = {
  title?: string;
  description?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: string;
  };
};

function asRouteMeta(value: unknown): RouteMeta {
  return (value ?? {}) as RouteMeta;
}

export function buildPageMetadata(path: RouteKey | '/'): Metadata {
  const defaults = asRouteMeta(siteMetadata.default);
  const route = asRouteMeta(siteMetadata[path as RouteKey] ?? {});

  const title = route.title ?? defaults.title ?? SITE_NAME;
  const description =
    route.description ??
    defaults.description ??
    'NASCAR and IndyCar news hub.';

  const ogTitle = route.openGraph?.title ?? title;
  const ogDescription = route.openGraph?.description ?? description;
  const ogImage =
    route.openGraph?.images ??
    defaults.openGraph?.images ??
    DEFAULT_OG_IMAGE;

  const canonicalPath = path === '/' ? '/' : String(path);
  const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} social preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}
