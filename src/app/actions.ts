
'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation';

// This file has been refactored to remove all `firebase-admin` dependencies,
// which were causing critical build failures. The logic for interacting with
// Firestore for seed websites has been moved to dedicated API routes.
// The frontend components using these actions will need to be updated
// to call the new API endpoints.

async function saveSearch(type: 'flight' | 'hotel' | 'status', query: object) {
    // For now, we will not save search history as it requires a logged-in user.
    console.log(`Search performed (${type}):`, query);
}


const FlightSearchSchema = z.object({
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  passengers: z.coerce.number().int().min(1),
})

export async function handleFlightSearch(
    data: z.infer<typeof FlightSearchSchema>,
    searchParams: URLSearchParams
) {
  const validatedFields = FlightSearchSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error('Flight Search Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return { path: null };
  }
  
  await saveSearch('flight', validatedFields.data);

  return {
      path: `/flights?${searchParams.toString()}`
  };
}

const HotelSearchSchema = z.object({
    destination: z.string().min(1, 'Destination is required'),
    checkInDate: z.string(),
    checkOutDate: z.string(),
    guests: z.coerce.number().int().min(1),
})

export async function handleHotelSearch(
    data: z.infer<typeof HotelSearchSchema>,
    searchParams: URLSearchParams
) {
    const validatedFields = HotelSearchSchema.safeParse(data);

    if (!validatedFields.success) {
        console.error('Hotel Search Validation Errors:', validatedFields.error.flatten().fieldErrors);
        return { path: null };
    }
    
    await saveSearch('hotel', validatedFields.data);
    
    return {
        path: `/hotels?${searchParams.toString()}`
    };
}


const StatusSearchSchema = z.object({
    flightNumber: z.string().min(1, 'Flight number is required'),
    date: z.string(),
});

export async function handleStatusSearch(
    data: z.infer<typeof StatusSearchSchema>,
    searchParams: URLSearchParams
) {

    const validatedFields = StatusSearchSchema.safeParse(data);

    if (!validatedFields.success) {
        console.error('Status Search Validation Errors:', validatedFields.error.flatten().fieldErrors);
        return { path: null };
    }
    
    await saveSearch('status', validatedFields.data);

    return {
        path: `/status?${searchParams.toString()}`
    };
}

export async function getAutocompleteSuggestions(input: string) {
    if (!input) {
        return [];
    }
    const searchTerm = input.toLowerCase();
    
    try {
        const { africanPlaces } = await import('@/lib/firebase/places-data');
        const suggestions = africanPlaces
            .filter(place => place.name.toLowerCase().includes(searchTerm))
            .slice(0, 10); // Limit to 10 suggestions
        
        return suggestions;
    } catch (error) {
        console.error("Error filtering autocomplete suggestions:", error);
        return [];
    }
}
