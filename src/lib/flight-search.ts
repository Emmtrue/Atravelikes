
import { format } from 'date-fns';
import { destinations } from './destinations';
import type { Flight } from './types';

export async function fetchAndProcessFlights(url: string, headers: HeadersInit, destinationIata?: string): Promise<any> {
    const response = await fetch(url, { headers, cache: 'no-store' });
    if (!response.ok) {
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
    
    // This is for airport status lookups which return arrivals and departures
    if (data.departures || data.arrivals) {
        return data;
    }
    
    // This is for single flight lookups
    return data;
}

export async function getFlightsByRoute(originLabel: string, destinationLabel: string, date: string): Promise<{ data: Flight[] | null; error: string | null }> {
    if (!originLabel || !destinationLabel || !date) {
        return { data: null, error: 'Please provide a valid origin, destination, and date.' };
    }

    const originDest = destinations.find(d => d.label.toLowerCase() === originLabel.toLowerCase());
    const destDest = destinations.find(d => d.label.toLowerCase() === destinationLabel.toLowerCase());

    const originCode = originDest?.iata || originLabel;
    const destCode = destDest?.iata || destinationLabel;

    if (originCode === 'Anywhere') {
         return { data: null, error: 'Please select a specific origin airport for your search.' };
    }

    const apiKey = process.env.AERODATABOX_RAPIDAPI_KEY;
    const apiHost = process.env.AERODATABOX_RAPIDAPI_HOST;

    if (!apiKey || !apiHost) {
        console.error('AeroDataBox API key or host is not configured.');
        return { data: null, error: 'Server configuration error.' };
    }

    const headers = {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
    };
    
    try {
        if (!/^[A-Z]{3}$/.test(originCode)) {
            return { data: null, error: 'A specific, valid 3-letter IATA origin airport code (e.g., JFK) must be provided.' };
        }
        if (!/^[A-Z]{3}$/.test(destCode)) {
            return { data: null, error: 'A specific, valid 3-letter IATA destination airport code (e.g., LAX) must be provided.' };
        }

        const fromLocal1 = `${date}T00:00`;
        const toLocal1 = `${date}T11:59`;
        const fromLocal2 = `${date}T12:00`;
        const toLocal2 = `${date}T23:59`;

        const commonParams = `?withLeg=true&direction=Departure&withCancelled=false&withCodeshared=false&withCargo=false&withPrivate=false`;
        
        const url1 = `https://${apiHost}/flights/airports/iata/${originCode}/${fromLocal1}/${toLocal1}${commonParams}`;
        const url2 = `https://${apiHost}/flights/airports/iata/${originCode}/${fromLocal2}/${toLocal2}${commonParams}`;

        const [results1, results2] = await Promise.all([
            fetchAndProcessFlights(url1, headers, destCode).catch(e => { console.error("Error in first API call:", e); return []; }),
            fetchAndProcessFlights(url2, headers, destCode).catch(e => { console.error("Error in second API call:", e); return []; })
        ]);
      
        const combinedResults = [...(results1 || []), ...(results2 || [])];
        
        return { data: combinedResults, error: null };

    } catch (error) {
        console.error("Failed to fetch flights:", error);
        return { data: null, error: 'An unexpected error occurred while fetching flights.' };
    }
}
