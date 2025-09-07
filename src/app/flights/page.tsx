
import { Suspense } from 'react';
import { DestinationGuide } from '@/components/destination-guide';
import { FlightResultCard } from '@/components/flight-result-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, AlertTriangle } from 'lucide-react';
import type { Flight } from '@/lib/types';
import { LocationHint } from '@/components/location-hint';
import { destinations } from '@/lib/destinations';


async function getFlights(origin: string, destination: string, date: string): Promise<{ data: Flight[] | null; error: string | null }> {
    if (!origin || !destination || !date) {
        return { data: null, error: 'Please provide a valid origin, destination, and date.' };
    }

    // Find the airport codes from the destinations list
    const originDest = destinations.find(d => d.label.toLowerCase() === origin.toLowerCase());
    const destDest = destinations.find(d => d.label.toLowerCase() === destination.toLowerCase());

    const originCode = originDest?.iata || origin;
    const destCode = destDest?.iata || destination;

    if (originCode === 'Anywhere') {
         return { data: null, error: 'Please select a specific origin airport for your search.' };
    }
    
    // Construct the URL path and query string for the API request.
    const url = `/api/flights?origin=${encodeURIComponent(originCode)}&destination=${encodeURIComponent(destCode)}&departureDate=${encodeURIComponent(date)}`;
    
    try {
        // Fetch from the absolute path. This works correctly on the server.
        const response = await fetch(url, { cache: 'no-store' });
        const data = await response.json();

        if (!response.ok) {
            console.error(`API Error: ${response.status} ${response.statusText}`, data);
            return { data: null, error: data.message || 'Could not fetch flight data.' };
        }
        
        return { data: data || [], error: null };
    } catch (error) {
        console.error("Failed to fetch flights:", error);
        return { data: null, error: 'An unexpected error occurred while fetching flights.' };
    }
}

async function FlightsPageContent({ origin, destination, departureDate, passengers }: { origin: string, destination: string, departureDate: string, passengers: string }) {
  const { data: flights, error } = await getFlights(origin, destination, departureDate);

  const formattedDate = new Date(departureDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const destName = destinations.find(d => d.label.toLowerCase() === destination.toLowerCase())?.city || destination;
  const originName = destinations.find(d => d.label.toLowerCase() === origin.toLowerCase())?.city || origin;

  const capitalizedDestination = destName.charAt(0).toUpperCase() + destName.slice(1);
  const capitalizedOrigin = originName.charAt(0).toUpperCase() + originName.slice(1);

  return (
    <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold">Flights to {capitalizedDestination}</h1>
        <p className="text-muted-foreground">Showing results from {capitalizedOrigin} for {formattedDate}</p>
        
        <Suspense fallback={<Skeleton className="h-12 w-full" />}>
           <LocationHint origin={origin} destination={destination} />
        </Suspense>

        {error ? (
             <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Could Not Perform Search</AlertTitle>
                <AlertDescription>
                   {error} Please go back and try your search again.
                </AlertDescription>
            </Alert>
        ) : flights && flights.length > 0 ? (
            flights.map((flight, index) => (
                <FlightResultCard key={`${flight.number}-${index}`} flight={flight} passengers={passengers}/>
            ))
        ) : (
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>No Flights Found</AlertTitle>
                <AlertDescription>
                    We couldn't find any direct flights for the selected route and date. Try adjusting your search criteria.
                </AlertDescription>
            </Alert>
        )}
    </div>
  );
}


export default function FlightsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const destination = searchParams?.destination as string || 'your destination';
    const origin = searchParams?.origin as string || 'Anywhere';
    const departureDate = searchParams?.departureDate as string;
    const passengers = searchParams?.passengers as string || '1';
    
    const destLabel = destinations.find(d => d.iata.toLowerCase() === destination.toLowerCase())?.label || destination;
    const originLabel = destinations.find(d => d.iata.toLowerCase() === origin.toLowerCase())?.label || origin;


    if (!departureDate) {
         return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Missing Information</AlertTitle>
                    <AlertDescription>
                        Departure date is required to search for flights. Please go back and select a date.
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <Suspense fallback={<FlightsPageSkeleton />}>
                <FlightsPageContent origin={originLabel} destination={destLabel} departureDate={departureDate} passengers={passengers} />
            </Suspense>
            <div className="lg:col-span-1 sticky top-24">
                <Suspense fallback={<DestinationGuideSkeleton />}>
                    <DestinationGuide destination={destLabel} />
                </Suspense>
            </div>
          </div>
        </div>
    )
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

function FlightsPageSkeleton() {
    return (
        <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-6 w-3/4" />
            <div className="space-y-4">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
            </div>
        </div>
    );
}
