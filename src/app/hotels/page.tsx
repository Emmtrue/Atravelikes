
import { Suspense } from 'react';
import { DestinationGuide } from '@/components/destination-guide';
import { HotelResultCard } from '@/components/hotel-result-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bed } from 'lucide-react';
import type { LiteAPIHotel } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getHotels(destination: string, checkIn: string, checkOut: string, adults: string, rooms: string): Promise<{ data: LiteAPIHotel[] | null; error: string | null }> {
    if (!destination || !checkIn || !checkOut || !adults) {
        return { data: null, error: 'Please provide all search parameters.' };
    }

    const url = '/api/hotels';

    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            city: destination,
            checkin: checkIn,
            checkout: checkOut,
            adults: parseInt(adults),
            rooms: parseInt(rooms),
          }),
          cache: 'no-store' 
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`API Error: ${response.status} ${response.statusText}`, data);
            return { data: null, error: data.message || 'Could not fetch hotel data.' };
        }
        
        return { data: data.data || [], error: null };
    } catch (error) {
        console.error("Failed to fetch hotels:", error);
        return { data: null, error: 'An unexpected error occurred while fetching hotels.' };
    }
}


async function HotelsContent({ destination, checkIn, checkOut, adults, rooms }: { destination: string, checkIn: string, checkOut: string, adults: string, rooms: string }) {
    const { data: hotels, error } = await getHotels(destination, checkIn, checkOut, adults, rooms);

    if (error) {
        return (
             <div className="md:col-span-2 lg:col-span-3">
                <Alert variant="destructive">
                    <Bed className="h-4 w-4" />
                    <AlertTitle>Could Not Fetch Hotels</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels && hotels.length > 0 ? (
                hotels.map((hotel) => (
                    <HotelResultCard key={hotel.hotelId} hotel={hotel} />
                ))
            ) : (
                <div className="md:col-span-2 lg:col-span-3">
                    <Alert>
                        <Bed className="h-4 w-4" />
                        <AlertTitle>No Hotels Found</AlertTitle>
                        <AlertDescription>
                            We couldn't find any hotels in {destination} for the selected dates. Please try a different location or adjust your dates.
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </div>
    )
}


export default function HotelsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const destination = searchParams?.destination as string || 'your destination';
  const checkInDate = searchParams?.checkInDate as string;
  const checkOutDate = searchParams?.checkOutDate as string;
  const guests = searchParams?.guests as string || '2';
  const rooms = searchParams?.rooms as string || '1';


  if (!checkInDate || !checkOutDate || !destination) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Alert variant="destructive">
                <Bed className="h-4 w-4" />
                <AlertTitle>Missing Information</AlertTitle>
                <AlertDescription>
                    Destination, check-in, and check-out dates are required. Please go back and complete the search form.
                </AlertDescription>
            </Alert>
        </div>
    )
  }


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Hotels in {destination.charAt(0).toUpperCase() + destination.slice(1)}</h1>
          <Suspense fallback={<DestinationGuideSkeleton />}>
            <div className="max-w-3xl">
              <DestinationGuide destination={destination} />
            </div>
          </Suspense>
        </div>
        <Suspense fallback={<HotelsSkeleton />}>
            <HotelsContent destination={destination} checkIn={checkInDate} checkOut={checkOutDate} adults={guests} rooms={rooms} />
        </Suspense>
      </div>
    </div>
  );
}

function DestinationGuideSkeleton() {
    return (
        <div className="space-y-2 p-4 border rounded-lg bg-card">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    )
}

function HotelsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                 <CardSkeleton key={i} />
            ))}
        </div>
    )
}

function CardSkeleton() {
    return (
        <div className="space-y-4 p-4 border rounded-lg">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-12" />
            </div>
            <div className="flex justify-between items-center pt-4">
                 <Skeleton className="h-8 w-20" />
                 <Skeleton className="h-10 w-24" />
            </div>
        </div>
    )
}
