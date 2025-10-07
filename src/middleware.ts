
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

// Force the middleware to run on the Node.js runtime.
export const runtime = 'nodejs';

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

function initializeAdminApp() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(
        Buffer.from(
          process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
          'base64'
        ).toString('utf-8')
      )
    : undefined;

  if (!cert) {
    // This should not happen in a deployed environment.
    // In local dev, it might mean the .env.local file is missing.
    console.error('Firebase service account key is not set.');
    return null;
  }

  return admin.initializeApp({
    credential: admin.credential.cert(cert),
    projectId: cert.project_id,
  });
}

export async function middleware(request: NextRequest) {
  const app = initializeAdminApp();
  if (!app) {
    // If Firebase isn't configured, bypass middleware.
    // This might happen in certain local dev or test environments.
     return NextResponse.redirect(new URL('/login', request.url));
  }
  const auth = getAuth(app);
  const { pathname } = request.nextUrl;
  
  const sessionCookie = request.cookies.get('__session')?.value;

  // Public paths that don't require authentication
  if (pathname === '/login' || pathname === '/register') {
      if (sessionCookie) {
          try {
              // If user is logged in, redirect them from login/register
              const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
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

  // If no session cookie, redirect to login for all other protected routes
  if (!sessionCookie) {
      // Allow root path to redirect to login via its page logic
      if (pathname === '/') {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
      const userRole = decodedClaims.role || 'employee'; // default to employee if no role
      
      // Admin route protection
      if (pathname.startsWith('/admin')) {
          if (userRole !== 'admin') {
              // If a non-admin tries to access an admin route, redirect them.
              return NextResponse.redirect(new URL('/employee/dashboard', request.url));
          }
      }

      // Employee route protection
      if (pathname.startsWith('/employee')) {
          if (userRole !== 'employee') {
               // If a non-employee (e.g., admin) tries to access an employee route, redirect them.
              return NextResponse.redirect(new URL('/admin/dashboard', request.url));
          }
      }

      // If everything is fine, proceed with the request.
      return NextResponse.next();

  } catch (error) {
      // Session cookie is invalid (e.g., expired). Redirect to login.
      const response = NextResponse.redirect(new URL('/login', request.url));
      // Clear the invalid cookie
      response.cookies.delete('__session');
      return response;
  }
}
