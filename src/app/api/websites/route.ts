
import { NextRequest, NextResponse } from 'next/server';

// This acts as our in-memory "database" for the seed websites.
// In a real application, this would be stored in a persistent database like Firestore.
let seedWebsites = [
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
    return NextResponse.json({ websites: seedWebsites });
}

/**
 * POST handler to update the list of seed websites.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { websites } = body;

        if (!Array.isArray(websites)) {
            return NextResponse.json({ success: false, message: 'Invalid payload: websites must be an array.' }, { status: 400 });
        }

        // Validate that all items are strings.
        if (!websites.every(item => typeof item === 'string')) {
            return NextResponse.json({ success: false, message: 'Invalid payload: all items in the websites array must be strings.' }, { status: 400 });
        }

        // Update our in-memory list.
        seedWebsites = websites;

        console.log('Updated seed websites list:', seedWebsites);

        return NextResponse.json({ success: true, message: 'Website list updated successfully.' });

    } catch (error) {
        console.error('Error updating websites:', error);
        return NextResponse.json({ success: false, message: 'An internal server error occurred.' }, { status: 500 });
    }
}
