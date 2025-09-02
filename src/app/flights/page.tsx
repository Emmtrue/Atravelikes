import { Suspense } from 'react';
import { DestinationGuide } from '@/components/destination-guide';
import { FlightResultCard } from '@/components/flight-result-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export const dynamic = 'force-dynamic';

const airlines = ['American Airlines', 'Delta', 'United', 'Southwest', 'British Airways'];

export default function FlightsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const origin = searchParams?.origin as string || 'Origin';
  const destination = searchParams?.destination as string || 'your destination';

  const mockFlights = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    airline: airlines[i % airlines.length],
    airlineLogo: `https://picsum.photos/40/40?random=airline${i}`,
    origin: origin.toUpperCase(),
    destination: destination.toUpperCase(),
    departureTime: '08:30',
    arrivalTime: '20:45',
    duration: '8h 15m',
    price: 450 + i * 50,
    stops: i % 2,
  }));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold">Flights to {destination.charAt(0).toUpperCase() + destination.slice(1)}</h1>
            <p className="text-muted-foreground">Showing best results from {origin.toUpperCase()} for {new Date(searchParams?.departureDate as string).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            {mockFlights.map((flight) => (
                <FlightResultCard key={flight.id} flight={flight} />
            ))}
        </div>
        <div className="lg:col-span-1 sticky top-24">
            <Suspense fallback={<DestinationGuideSkeleton />}>
                <DestinationGuide destination={destination} />
            </Suspense>
        </div>
      </div>
    </div>
  );
}

function DestinationGuideSkeleton() {
    return (
        <div className="space-y-4 p-6 border rounded-lg bg-card">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
            <Separator className="my-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    )
}
