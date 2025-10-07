
import { NextResponse, type NextRequest } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initializeAdminApp } from "@/firebase/admin-init";

// Force the route to run on the Node.js runtime.
export const runtime = 'nodejs';

initializeAdminApp();

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: "ID token is required." }, { status: 400 });
  }

  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  try {
    const decodedIdToken = await getAuth().verifyIdToken(token);
    
    // Only process if the user just signed in in the last 5 minutes.
    if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
      const sessionCookie = await getAuth().createSessionCookie(token, { expiresIn });
      const response = NextResponse.json({ status: "success" });
      response.cookies.set("__session", sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: "/",
      });
      return response;
    }
    
    return NextResponse.json({ error: "Recent sign-in required." }, { status: 401 });

  } catch (error) {
    console.error("Error creating session cookie:", error);
    return NextResponse.json({ error: "Failed to create session." }, { status: 401 });
  }
}
