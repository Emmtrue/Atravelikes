import { Suspense } from 'react';
import { DestinationGuide } from '@/components/destination-guide';
import { HotelResultCard } from '@/components/hotel-result-card';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-dynamic';

export default function HotelsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const destination = searchParams?.destination as string || 'your destination';

  const mockHotels = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    name: `Hotel Paradiso #${i + 1}`,
    image: `https://picsum.photos/400/300?random=hotel${i}`,
    rating: (4.5 - i * 0.2).toFixed(1),
    price: 120 + i * 30,
    amenities: ['Free WiFi', 'Pool', 'Breakfast'],
  }));

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockHotels.map((hotel) => (
            <HotelResultCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
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
