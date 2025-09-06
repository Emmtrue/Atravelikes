
import { NextRequest, NextResponse } from 'next/server';
import { format, add, sub } from 'date-fns';

async function fetchAndProcessFlights(url: string, headers: HeadersInit, destinationIata?: string) {
    const response = await fetch(url, { headers });
    if (!response.ok) {
        // Check for specific status codes like 401 for auth/credit issues
        if (response.status === 401) {
            console.error(`AeroDataBox API Error (401): Unauthorized. This might be due to an invalid API key or exhausted credits.`);
            throw new Error('We are currently unable to retrieve flight data due to a temporary issue with our provider. Please try again shortly.');
        }
        const errorBody = await response.json().catch(() => ({ message: 'The API returned a non-JSON error response.' }));
        console.error(`AeroDataBox API Error (${response.status}):`, errorBody);
        throw new Error(errorBody.message || `Failed to fetch data. Status: ${response.status}`);
    }
    const data = await response.json();
    if (destinationIata && data.departures) {
        return data.departures.filter((flight: any) => flight.arrival.airport.iata === destinationIata);
    }
    return data;
}

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
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const departureDate = searchParams.get('departureDate');

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

    // Flight Search
    if (origin && destination && departureDate) {
      if (!/^[A-Z]{3}$/.test(origin)) {
        return NextResponse.json({ message: 'A specific, valid 3-letter IATA origin airport code (e.g., JFK) must be provided.' }, { status: 400 });
      }
      if (!/^[A-Z]{3}$/.test(destination)) {
        return NextResponse.json({ message: 'A specific, valid 3-letter IATA destination airport code (e.g., LAX) must be provided.' }, { status: 400 });
      }

      // The API has a 12-hour limit for the time range. We'll make two calls to cover the full day.
      const fromLocal1 = `${departureDate}T00:00`;
      const toLocal1 = `${departureDate}T11:59`;
      const fromLocal2 = `${departureDate}T12:00`;
      const toLocal2 = `${departureDate}T23:59`;

      const commonParams = `?withLeg=true&direction=Departure&withCancelled=false&withCodeshared=false&withCargo=false&withPrivate=false`;
      
      const url1 = `https://${apiHost}/flights/airports/iata/${origin}/${fromLocal1}/${toLocal1}${commonParams}`;
      const url2 = `https://${apiHost}/flights/airports/iata/${origin}/${fromLocal2}/${toLocal2}${commonParams}`;

      const [results1, results2] = await Promise.all([
        fetchAndProcessFlights(url1, headers, destination).catch(e => { console.error("Error in first API call:", e); return []; }),
        fetchAndProcessFlights(url2, headers, destination).catch(e => { console.error("Error in second API call:", e); return []; })
      ]);
      
      const combinedResults = [...(results1 || []), ...(results2 || [])];

      return NextResponse.json(combinedResults, { status: 200 });
    }

    return NextResponse.json({ message: 'Insufficient or invalid search parameters provided.' }, { status: 400 });

  } catch (error) {
    console.error('Internal error fetching from AeroDataBox API:', error);
    const errorMessage = error instanceof Error ? error.message : 'An internal server error occurred.';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
