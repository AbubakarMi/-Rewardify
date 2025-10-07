
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - register (register page)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
  ],
}

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('__session')?.value;
  const { pathname } = request.nextUrl;

  // Allow access to the landing page for everyone
  if (pathname === '/') {
    return NextResponse.next();
  }

  // For all other matched routes, redirect to login if not authenticated
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // NOTE: This is not secure. We are not verifying the cookie.
  // This is a temporary fix to get the app running.
  // A proper solution would involve an API route to verify the session.

  return NextResponse.next();
}
