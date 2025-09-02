
import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import type { Auth } from 'firebase-admin/auth';

function getAuth(): Auth | null {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
        console.warn('FIREBASE_SERVICE_ACCOUNT_KEY is not set. User management API will be disabled.');
        return null;
    }
    if (admin.apps.length > 0) {
        return admin.auth();
    }
    try {
        const credentials = JSON.parse(serviceAccountKey);
        admin.initializeApp({
            credential: admin.credential.cert(credentials),
        });
        return admin.auth();
    } catch (error) {
        console.error('Firebase Admin SDK initialization failed in users API.', (error as Error).message);
        return null;
    }
}

// GET - List all users
export async function GET(request: NextRequest) {
    try {
        const adminAuth = getAuth();
        if (!adminAuth) {
            // If the admin SDK is not configured, return an empty list with a special header.
            // This prevents errors on the frontend and allows it to show a helpful message.
            return NextResponse.json([], {
                headers: { 'X-Api-Not-Configured': 'true' }
            });
        }
        const listUsersResult = await adminAuth.listUsers(1000); // Adjust limit as needed
        return NextResponse.json(listUsersResult.users);
    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error('Error listing users:', errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

// POST - Create a new user
export async function POST(request: NextRequest) {
    try {
        const adminAuth = getAuth();
        if (!adminAuth) {
            return NextResponse.json({ error: 'User management is not configured on the server.' }, { status: 503 });
        }
        const body = await request.json();
        const { email, password, displayName, disabled } = body;
        
        if (!email || !password || !displayName) {
            return NextResponse.json({ error: 'Email, password, and display name are required.' }, { status: 400 });
        }

        const newUser = await adminAuth.createUser({
            email,
            password,
            displayName,
            disabled: disabled || false,
        });

        // Set default role to 'user'
        await adminAuth.setCustomUserClaims(newUser.uid, { role: 'user' });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error('Error creating user:', errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

// PUT - Update an existing user
export async function PUT(request: NextRequest) {
    try {
        const adminAuth = getAuth();
        if (!adminAuth) {
            return NextResponse.json({ error: 'User management is not configured on the server.' }, { status: 503 });
        }
        const { searchParams } = new URL(request.url);
        const uid = searchParams.get('uid');
        const body = await request.json();

        if (!uid) {
            return NextResponse.json({ error: 'User UID is required.' }, { status: 400 });
        }

        const { customClaims, ...updatePayload } = body;

        // Update standard properties (email, password, displayName, disabled)
        if (Object.keys(updatePayload).length > 0) {
            await adminAuth.updateUser(uid, updatePayload);
        }

        // Update custom claims (e.g., role)
        if (customClaims) {
            const existingUser = await adminAuth.getUser(uid);
            const existingClaims = existingUser.customClaims || {};
            await adminAuth.setCustomUserClaims(uid, { ...existingClaims, ...customClaims });
        }
        
        const updatedUser = await adminAuth.getUser(uid);
        return NextResponse.json(updatedUser);

    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error(`Error updating user ${request.nextUrl.searchParams.get('uid')}:`, errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

// DELETE - Delete a user
export async function DELETE(request: NextRequest) {
    try {
        const adminAuth = getAuth();
        if (!adminAuth) {
            return NextResponse.json({ error: 'User management is not configured on the server.' }, { status: 503 });
        }
        const { searchParams } = new URL(request.url);
        const uid = searchParams.get('uid');

        if (!uid) {
            return NextResponse.json({ error: 'User UID is required.' }, { status: 400 });
        }

        await adminAuth.deleteUser(uid);
        return NextResponse.json({ message: 'User deleted successfully.' });

    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error(`Error deleting user ${request.nextUrl.searchParams.get('uid')}:`, errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
