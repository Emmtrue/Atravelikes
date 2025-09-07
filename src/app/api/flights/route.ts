
import { NextRequest, NextResponse } from 'next/server';
import { format, add, sub } from 'date-fns';
import { fetchAndProcessFlights } from '@/lib/flight-search';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiKey = process.env.AERODATABOX_RAPIDAPI_KEY;
  const apiHost = process.env.AERODATABOX_RAPIDAPI_HOST;

  if (!apiKey || !apiHost) {
    console.error('AeroDataBox API key or host is not configured.');
    return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
  }

  const headers = {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': apiHost,
  };

  const flightId = searchParams.get('flightId');
  const airportCode = searchParams.get('airportCode');
  const flightNumber = searchParams.get('flightNumber');
  const date = searchParams.get('date');
  
  try {
    // Flight Details for Booking page
    if (flightId) {
        const flightIdParts = flightId.split('-');
        if (flightIdParts.length < 2) { 
            return NextResponse.json({ message: 'Invalid flight identifier format for detail view.' }, { status: 400 });
        }
        const fNumber = flightIdParts[0];
        const fDate = flightIdParts.slice(1).join('-'); 

        if (!fNumber || !fDate) {
            return NextResponse.json({ message: 'Invalid flight identifier for detail view.' }, { status: 400 });
        }
        const aeroApiUrl = `https://${apiHost}/flights/number/${fNumber}/${fDate}`;
        const data = await fetchAndProcessFlights(aeroApiUrl, headers);
        return NextResponse.json(data, { status: 200 });
    }

    // Airport Status
    if (airportCode) {
        const today = new Date();
        const fromLocal = format(sub(today, { hours: 2 }), "yyyy-MM-dd'T'HH:mm");
        const toLocal = format(add(today, { hours: 10 }), "yyyy-MM-dd'T'HH:mm");
        const aeroApiUrl = `https://${apiHost}/flights/airports/iata/${airportCode}/${fromLocal}/${toLocal}?withLeg=true&direction=Both&withCancelled=true&withCodeshared=true&withCargo=false&withPrivate=false&withLocation=false`;
        const data = await fetchAndProcessFlights(aeroApiUrl, headers);
        return NextResponse.json(data, { status: 200 });
    }

    // Flight Status search
    if (flightNumber && date) {
        const aeroApiUrl = `https://${apiHost}/flights/number/${flightNumber}/${date}`;
        const data = await fetchAndProcessFlights(aeroApiUrl, headers);
        return NextResponse.json(data, { status: 200 });
    }

    // NOTE: Flight Search logic has been moved to a direct server function call in `src/app/flights/page.tsx`
    // to avoid internal API calls in a server component environment.

    return NextResponse.json({ message: 'Insufficient or invalid search parameters provided.' }, { status: 400 });

  } catch (error) {
    console.error('Internal error fetching from AeroDataBox API:', error);
    const errorMessage = error instanceof Error ? error.message : 'An internal server error occurred.';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
