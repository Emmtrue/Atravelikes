
import { Suspense } from 'react';
import { DestinationGuide } from '@/components/destination-guide';
import { HotelResultCard } from '@/components/hotel-result-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bed } from 'lucide-react';

export const dynamic = 'force-dynamic';

// In a real app, this would fetch from a hotel API
async function getHotels(destination: string) {
    console.log(`Fetching hotels for ${destination}...`);
    // Mocking an API call
    await new Promise(resolve => setTimeout(resolve, 500)); 

    if (destination.toLowerCase() === 'nowhere') {
        return [];
    }

    return Array.from({ length: 6 }, (_, i) => ({
        id: i,
        name: `Hotel Paradiso #${i + 1}`,
        image: `https://picsum.photos/400/300?random=hotel${i}`,
        rating: (4.5 - i * 0.2).toFixed(1),
        price: 120 + i * 30,
        amenities: ['Free WiFi', 'Pool', 'Breakfast'],
    }));
}


async function HotelsContent({ destination }: { destination: string }) {
    const hotels = await getHotels(destination);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels && hotels.length > 0 ? (
                hotels.map((hotel) => (
                    <HotelResultCard key={hotel.id} hotel={hotel} />
                ))
            ) : (
                <div className="md:col-span-2 lg:col-span-3">
                    <Alert>
                        <Bed className="h-4 w-4" />
                        <AlertTitle>No Hotels Found</AlertTitle>
                        <AlertDescription>
                            We couldn't find any hotels in {destination}. Please try a different location.
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </div>
    )
}


export default function HotelsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const destination = searchParams?.destination as string || 'your destination';

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
            <HotelsContent destination={destination} />
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
