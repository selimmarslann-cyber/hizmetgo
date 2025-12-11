/**
 * Shared SEO Metadata Configuration
 */

import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hizmetgo.app';
const siteName = 'Hizmetgo';
const defaultDescription =
  'Mahalle esnafı ve hizmet sağlayıcıları ile müşterileri buluşturan platform. Elektrik, tesisat, boya, marangoz ve daha fazlası için güvenilir esnaf bulun.';

export function createMetadata({
  title,
  description = defaultDescription,
  path = '',
  image,
  noindex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${baseUrl}${path}`;
  const ogImage = image || `${baseUrl}/og-image.jpg`;

  return {
    title: `${title} | ${siteName}`,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const defaultMetadata: Metadata = createMetadata({
  title: 'Hizmetgo - Esnaf/Hizmet Süper Uygulaması',
  description: defaultDescription,
});

