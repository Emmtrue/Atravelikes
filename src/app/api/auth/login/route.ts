
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as admin from 'firebase-admin';
import type { Auth, DecodedIdToken } from 'firebase-admin/auth';

function getAuth(): Auth | null {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
        console.error('CRITICAL: FIREBASE_SERVICE_ACCOUNT_KEY is not set. Auth API cannot function.');
        return null;
    }
    try {
        if (admin.apps.length === 0) {
            const credentials = JSON.parse(serviceAccountKey);
            admin.initializeApp({
                credential: admin.credential.cert(credentials),
            });
        }
        return admin.auth();
    } catch (error) {
        console.error('CRITICAL: Firebase Admin SDK initialization failed in Auth API.', (error as Error).message);
        return null;
    }
}

export async function POST(request: NextRequest) {
  const adminAuth = getAuth();
  if (!adminAuth) {
      return NextResponse.json({ error: 'Authentication service is not configured on the server.' }, { status: 500 });
  }
  
  try {
    const body = await request.json();
    const idToken = body.idToken;
    if (!idToken) {
        return NextResponse.json({ error: 'ID token is required.' }, { status: 400 });
    }

    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    
    let decodedIdToken: DecodedIdToken;
    try {
        decodedIdToken = await adminAuth.verifyIdToken(idToken);
    } catch (error) {
        console.error('Error verifying ID token:', error);
        return NextResponse.json({ error: 'Invalid ID token.' }, { status: 401 });
    }

    // Determine redirect path based on role
    const isSuperAdmin = decodedIdToken.role === 'superadmin';
    const redirectPath = isSuperAdmin ? '/super-admin/dashboard' : '/profile';


    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    };

    cookies().set(options);
    
    return NextResponse.json({ status: "success", path: redirectPath }, { status: 200 });

  } catch (error: any) {
    console.error('Session Creation Error:', error);
    return NextResponse.json({ error: 'Failed to create session. Server log may have more details.' }, { status: 500 });
  }
}
