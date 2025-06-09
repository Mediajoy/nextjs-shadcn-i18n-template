import { NextRequest, NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { locales, defaultLocale } from './config';

/**
 * Middleware to handle locale detection and routing
 * This is provided as an example of how to implement i18n routing in Next.js 14
 * 
 * Note: To use this middleware, you would need to:
 * 1. Install dependencies:
 *    npm install @formatjs/intl-localematcher negotiator
 * 2. Add appropriate types:
 *    npm install -D @types/negotiator
 * 3. Configure middleware.ts in your root to use this
 */

// Get locale based on headers
function getLocale(request: NextRequest): string {
  // Negotiator expects plain object with headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  // Add stored locale from cookie if available
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    languages = [cookieLocale, ...languages];
  }

  return matchLocale(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  // Skip middleware for static assets and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  
  // Check if pathname has supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if no locale found in path
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  // Preserve query parameters
  request.nextUrl.searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value);
  });

  return NextResponse.redirect(newUrl);
}

export const config = {
  // Only execute middleware on navigation requests
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
