
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPlaceId } from '@/ai/flows/get-hotel-place-id';

const LITE_API_URL = 'https://api.liteapi.travel/v3.0';

const HotelSearchSchema = z.object({
  city: z.string().optional(),
  hotelIds: z.array(z.string()).optional(),
  checkin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkout: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  adults: z.coerce.number().int().min(1),
  rooms: z.coerce.number().int().min(1),
});

export async function POST(request: NextRequest) {
  const apiKey = process.env.LITEAPI_API_KEY;

  if (!apiKey) {
    console.error('LiteAPI key is not configured.');
    return NextResponse.json({ message: 'Server configuration error for hotel search.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const validation = HotelSearchSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: 'Invalid search parameters', errors: validation.error.flatten() }, { status: 400 });
    }

    const { city, hotelIds, checkin, checkout, adults, rooms } = validation.data;

    const occupancies = Array.from({ length: rooms }, () => ({ 
        adults: Math.ceil(adults / rooms), 
        children: [] 
    }));

    let searchParams: any = {
      checkin: checkin,
      checkout: checkout,
      occupancies: occupancies,
      guestNationality: "US",
      currency: "USD",
    };

    if (hotelIds && hotelIds.length > 0) {
        searchParams.hotelIds = hotelIds;
    } else if (city) {
        const placeIdResponse = await getPlaceId({ cityName: city });
        const placeId = placeIdResponse.placeId;

        if (!placeId) {
          return NextResponse.json({ message: `Could not find a location match for "${city}". Please try a different city name.` }, { status: 404 });
        }
        searchParams.placeId = placeId;
    } else {
        return NextResponse.json({ message: 'Either city or a list of hotel IDs must be provided.' }, { status: 400 });
    }
    
    const response = await fetch(`${LITE_API_URL}/hotels/rates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify(searchParams),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'The API returned a non-JSON error response.' }));
        console.error(`LiteAPI Error (${response.status}):`, errorData);
        const userMessage = errorData?.error?.message || `We're having trouble finding hotels right now. Please try again in a few moments.`;
        return NextResponse.json({ message: userMessage }, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Hotel API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An internal server error occurred.';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
