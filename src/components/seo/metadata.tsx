import { Metadata } from 'next';

/**
 * Default metadata values
 */
const defaultMetadata = {
  title: 'Next.js + shadcn/ui Template',
  description: 'A production-ready template using Next.js 14 and shadcn/ui components',
  siteName: 'Next.js + shadcn/ui',
  url: 'https://yourwebsite.com',
};

type PageMetadataProps = {
  title?: string;
  description?: string;
  path?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: string | string[];
    type?: 'website' | 'article' | 'profile';
    publishedTime?: string;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image';
    creator?: string;
    site?: string;
  };
};

/**
 * Generate metadata for a page using Next.js Metadata API
 * @param props page-specific metadata properties
 * @returns Metadata object compatible with Next.js App Router
 */
export function generatePageMetadata(props: PageMetadataProps): Metadata {
  const {
    title,
    description = defaultMetadata.description,
    path = '',
    openGraph,
    twitter,
  } = props;

  const pageTitle = title ? `${title} | ${defaultMetadata.siteName}` : defaultMetadata.title;
  const fullUrl = `${defaultMetadata.url}${path}`;
  
  // Prepare image URLs for Open Graph
  const ogImages = openGraph?.images 
    ? (Array.isArray(openGraph.images) 
        ? openGraph.images.map(img => ({ url: img.startsWith('http') ? img : `${defaultMetadata.url}${img}` }))
        : [{ url: openGraph.images.startsWith('http') ? openGraph.images : `${defaultMetadata.url}${openGraph.images}` }]
      ) 
    : [{ url: `${defaultMetadata.url}/opengraph-image.png` }];
  
  return {
    metadataBase: new URL(defaultMetadata.url),
    title: pageTitle,
    description,
    openGraph: {
      type: openGraph?.type || 'website',
      title: openGraph?.title || pageTitle,
      description: openGraph?.description || description,
      siteName: defaultMetadata.siteName,
      url: fullUrl,
      images: ogImages,
      ...(openGraph?.publishedTime && { publishedTime: openGraph.publishedTime }),
    },
    twitter: {
      card: twitter?.card || 'summary_large_image',
      title: pageTitle,
      description,
      creator: twitter?.creator || '@yourhandle',
      site: twitter?.site || '@yourhandle',
      images: ogImages,
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Usage example in a page:
 * 
 * export const metadata = generatePageMetadata({
 *   title: 'Dashboard',
 *   description: 'View your application statistics and metrics',
 *   path: '/dashboard',
 *   openGraph: {
 *     images: '/images/dashboard-og.png',
 *   }
 * });
 */
