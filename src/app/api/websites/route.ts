
import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import type { Firestore } from 'firebase-admin/firestore';

// Safely initialize Firebase Admin SDK
function initializeFirebaseAdmin(): Firestore | null {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
        // This is not a critical error, the app can use the fallback list.
        console.warn('FIREBASE_SERVICE_ACCOUNT_KEY is not set. API will use fallback website list.');
        return null;
    }
    if (admin.apps.length > 0) {
        return admin.firestore();
    }
    try {
        const credentials = JSON.parse(serviceAccountKey);
        admin.initializeApp({
            credential: admin.credential.cert(credentials),
        });
        console.log('Firebase Admin SDK initialized successfully in websites API.');
        return admin.firestore();
    } catch (error) {
        console.error('Firebase Admin SDK initialization failed in websites API. Using fallback list.', (error as Error).message);
        return null;
    }
}

const FALLBACK_SEED_WEBSITES = [
    'trip.com', 'expedia.com', 'skyscanner.com', 'kayak.com', 'momondo.com', 'google.com/flights',
    'cheapflights.com', 'aviasales.com', 'edreams.com', 'opodo.com', 'flightsfinder.com', 'flightconnections.com',
    'hopper.com', 'secretflying.com', 'airfarewatchdog.com', 'flightmatrix.com', 'booking.com', 'priceline.com',
    'hotwire.com', 'going.com', 'cheapoair.com', 'tripadvisor.com', 'flightradar24.com', 'flightaware.com',
    'flightstats.com', 'travelocity.com', 'orbitz.com', 'airasia.com', 'ryanair.com', 'easyjet.com',
    'southwest.com', 'klm.com', 'emirates.com', 'flydubai.com', 'qatarairways.com',
];

/**
 * GET handler to fetch the list of seed websites.
 */
export async function GET() {
    const db = initializeFirebaseAdmin();

    if (!db) {
        // If DB is not available (no service key), return the fallback list.
        return NextResponse.json({ websites: FALLBACK_SEED_WEBSITES });
    }

    try {
        const configDoc = await db.collection('config').doc('scraper').get();

        if (!configDoc.exists) {
            // If the document doesn't exist, return the fallback list.
            return NextResponse.json({ websites: FALLBACK_SEED_WEBSITES });
        }

        const data = configDoc.data();
        const websites = data?.seedUrls || [];
        
        // If DB has no URLs, still use the fallback
        if (websites.length === 0) {
            return NextResponse.json({ websites: FALLBACK_SEED_WEBSITES });
        }

        return NextResponse.json({ websites });

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error('Error fetching websites, returning fallback:', errorMessage);
        // On ANY error, return the fallback list to ensure the app can function.
        return NextResponse.json({ websites: FALLBACK_SEED_WEBSITES });
    }
}

/**
 * POST handler to update the list of seed websites.
 */
export async function POST(req: NextRequest) {
    const db = initializeFirebaseAdmin();

    if (!db) {
         return NextResponse.json({ message: 'Cannot update website list: Firebase Admin SDK not configured.' }, { status: 500 });
    }

    try {
        const { websites } = await req.json();
        
        if (!Array.isArray(websites) || websites.some(w => typeof w !== 'string')) {
            return NextResponse.json({ message: 'Invalid payload. "websites" must be an array of strings.' }, { status: 400 });
        }

        const configRef = db.collection('config').doc('scraper');

        await configRef.set({ seedUrls: websites }, { merge: true });

        return NextResponse.json({ success: true, message: 'Website list updated successfully.' });

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error('Error updating websites:', errorMessage);
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}
