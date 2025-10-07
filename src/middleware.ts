import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userRole = request.cookies.get('user_role')?.value;
  const { pathname } = request.nextUrl;

  // If user is not logged in, redirect to login page, but allow access to login/register
  if (!userRole) {
    if (pathname !== '/login' && pathname !== '/register') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // If logged in user tries to access login/register, redirect them
  if (pathname === '/login' || pathname === '/register') {
    if (userRole === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    if (userRole === 'employee') {
        return NextResponse.redirect(new URL('/employee/dashboard', request.url));
    }
  }
  
  // Admin route protection
  if (pathname.startsWith('/admin')) {
    if (userRole !== 'admin') {
      // Not an admin, redirect to employee dashboard
      return NextResponse.redirect(new URL('/employee/dashboard', request.url));
    }
  }

  // Employee route protection
  if (pathname.startsWith('/employee')) {
    if (userRole !== 'employee') {
      // Not an employee, redirect to admin dashboard
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
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
