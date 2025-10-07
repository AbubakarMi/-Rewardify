import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from 'firebase-admin';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const sessionCookie = request.cookies.get('__session')?.value;

  // Public paths
  if (pathname === '/login' || pathname === '/register') {
      if (sessionCookie) {
          try {
              // If user is logged in, redirect them from login/register
              const decodedClaims = await auth().verifySessionCookie(sessionCookie, true);
              const role = decodedClaims.role || 'employee';
              if (role === 'admin') {
                  return NextResponse.redirect(new URL('/admin/dashboard', request.url));
              }
              return NextResponse.redirect(new URL('/employee/dashboard', request.url));
          } catch (error) {
              // Cookie is invalid, let them proceed to login/register
              return NextResponse.next();
          }
      }
      return NextResponse.next();
  }

  // If no session cookie, redirect to login for protected routes
  if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
      const decodedClaims = await auth().verifySessionCookie(sessionCookie, true);
      const userRole = decodedClaims.role || 'employee'; // default to employee if no role
      
      // Admin route protection
      if (pathname.startsWith('/admin')) {
          if (userRole !== 'admin') {
              return NextResponse.redirect(new URL('/employee/dashboard', request.url));
          }
      }

      // Employee route protection
      if (pathname.startsWith('/employee')) {
          if (userRole !== 'employee') {
              return NextResponse.redirect(new URL('/admin/dashboard', request.url));
          }
      }

      return NextResponse.next();

  } catch (error) {
      // Session cookie is invalid. Redirect to login.
      const response = NextResponse.redirect(new URL('/login', request.url));
      // Clear the invalid cookie
      response.cookies.delete('__session');
      return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
