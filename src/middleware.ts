import { NextResponse, type NextRequest } from "next/server";

// This is a template middleware file that can be customized based on your needs
// The code below demonstrates how you would protect routes and redirect users

export function middleware(request: NextRequest) {
  // Example of path matching
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Mock authentication check - replace with your actual auth logic
    // For example, checking for a session token
    const authToken = request.cookies.get("authToken")?.value;

    // If no auth token exists, redirect to login
    if (!authToken) {
      // This is an example redirect to login with the return URL
      const loginUrl = new URL("/api/auth/signin", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Example of adding headers
  const response = NextResponse.next();
  response.headers.set("x-middleware-cache", "no-cache");
  
  return response;
}

export const config = {
  // Specify which paths this middleware should run on
  // This example will run on all paths starting with /dashboard or /admin
  // But will skip API routes and static files
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/* (API routes)
     * 2. /_next/* (Next.js internals)
     * 3. /_static/* (inside /public)
     * 4. /_vercel/* (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml, /robots.txt (common static files)
     */
    // '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml|robots.txt).*)',
    
    // Or specify exactly which paths to protect:
    '/dashboard/:path*',
  ],
};
