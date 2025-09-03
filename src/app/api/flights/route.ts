
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiKey = process.env.AEROAPI_KEY;

  if (!apiKey) {
    console.error('AeroAPI key is not configured.');
    return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
  }
  
  const flightId = searchParams.get('flightId');
  const flightNumber = searchParams.get('flightNumber');
  const date = searchParams.get('date');
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const departureDate = searchParams.get('departureDate');
  const airportCode = searchParams.get('airportCode');


  let aeroApiUrl = '';

  // Logic for a single flight's details (Booking Page)
  if (flightId) {
     aeroApiUrl = `https://aeroapi.flightaware.com/aeroapi/flights/${flightId}`;
  }
  // Logic for Airport Status Page (GET /airports/{id}/flights)
  else if (airportCode) {
    aeroApiUrl = `https://aeroapi.flightaware.com/aeroapi/airports/${airportCode}/flights?max_pages=1`;
  }
  // Logic for Flight Status Search (GET /flights/{ident})
  else if (flightNumber) {
    aeroApiUrl = `https://aeroapi.flightaware.com/aeroapi/flights/${flightNumber}`;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      aeroApiUrl += `?start=${startDate.toISOString()}&end=${endDate.toISOString()}`;
    }
  }
  // Logic for Flight Search (GET /schedules/{start}/{end})
  else if (origin && destination && departureDate) {
     if (origin.toLowerCase() === 'anywhere' || !/^[A-Z]{3,4}$/.test(origin)) {
        return NextResponse.json({ message: 'A specific, valid origin airport code (e.g., JFK) must be provided.' }, { status: 400 });
    }
     if (!/^[A-Z]{3,4}$/.test(destination)) {
        return NextResponse.json({ message: 'A specific, valid destination airport code (e.g., LAX) must be provided.' }, { status: 400 });
    }
    
    // The /schedules endpoint requires a date range. We'll search for the entire day.
    const startDate = new Date(departureDate);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    aeroApiUrl = `https://aeroapi.flightaware.com/aeroapi/schedules/${startDate.toISOString()}/${endDate.toISOString()}?origin=${origin}&destination=${destination}&max_pages=1`;
  }
  else {
    return NextResponse.json({ message: 'Insufficient or invalid search parameters provided.' }, { status: 400 });
  }

  try {
    const apiResponse = await fetch(aeroApiUrl, {
      headers: {
        'x-apikey': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!apiResponse.ok) {
        const errorBody = await apiResponse.json().catch(() => ({ title: 'Unknown API Error', detail: 'The API returned a non-JSON error response.' }));
        console.error(`AeroAPI Error (${apiResponse.status}):`, errorBody);
        const errorMessage = errorBody.title || errorBody.detail || `Failed to fetch data from FlightAware API. Status: ${apiResponse.status}`;
        return NextResponse.json({ message: errorMessage }, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Internal error fetching from AeroAPI:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
