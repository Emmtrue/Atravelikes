
'use server'

import { z } from 'zod'
import { destinations } from '@/lib/destinations';
import type { Destination } from '@/lib/destinations';

async function saveSearch(type: 'flight' | 'hotel' | 'status', query: object) {
    // For now, we will not save search history as it requires a logged-in user.
    console.log(`Search performed (${type}):`, query);
}

const destinationLabels = destinations.map(d => d.label);

const FlightSearchSchema = z.object({
  origin: z.string().refine(val => destinationLabels.includes(val), {
    message: "Please select a valid origin from the list.",
  }),
  destination: z.string().refine(val => destinationLabels.includes(val), {
    message: "Please select a valid destination from the list.",
  }),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  passengers: z.coerce.number().int().min(1),
}).refine(data => {
    if (!data.origin || !data.destination) return true;
    return data.origin.toLowerCase() !== data.destination.toLowerCase()
}, {
  message: "Origin and destination cannot be the same.",
  path: ["destination"],
});

export async function handleFlightSearch(
    data: z.infer<typeof FlightSearchSchema>
) {
  const validatedFields = FlightSearchSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error('Flight Search Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  await saveSearch('flight', validatedFields.data);
  return { success: true, data: validatedFields.data };
}

const HotelSearchSchema = z.object({
    destination: z.string().min(1, 'Destination is required'),
    checkInDate: z.string(),
    checkOutDate: z.string(),
    guests: z.coerce.number().int().min(1),
})

export async function handleHotelSearch(
    data: z.infer<typeof HotelSearchSchema>,
) {
    const validatedFields = HotelSearchSchema.safeParse(data);

    if (!validatedFields.success) {
        console.error('Hotel Search Validation Errors:', validatedFields.error.flatten().fieldErrors);
        return { success: false, errors: validatedFields.error.flatten().fieldErrors };
    }
    
    await saveSearch('hotel', validatedFields.data);
     return { success: true, data: validatedFields.data };
}


const StatusSearchSchema = z.object({
    flightNumber: z.string().min(1, 'Flight number is required'),
    date: z.string(),
});

export async function handleStatusSearch(
    data: z.infer<typeof StatusSearchSchema>
) {

    const validatedFields = StatusSearchSchema.safeParse(data);

    if (!validatedFields.success) {
        console.error('Status Search Validation Errors:', validatedFields.error.flatten().fieldErrors);
        return { success: false, errors: validatedFields.error.flatten().fieldErrors };
    }
    
    await saveSearch('status', validatedFields.data);

    return { success: true, data: validatedFields.data };
}

export async function getAutocompleteSuggestions(input: string): Promise<Destination[]> {
    if (!input) {
        return [];
    }
    const searchTerm = input.toLowerCase();
    
    try {
        const suggestions = destinations
            .filter(place => place.label.toLowerCase().includes(searchTerm))
            .slice(0, 10); // Limit to 10 suggestions
        
        return suggestions;
    } catch (error) {
        console.error("Error filtering autocomplete suggestions:", error);
        return [];
    }
}
