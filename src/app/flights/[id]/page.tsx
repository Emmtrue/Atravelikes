
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Plane, Clock, Check, Users, UserPlus, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useParams, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Flight } from '@/lib/types';
import { parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

function FlightDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className='space-y-2'>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-6 w-48" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-sm">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
             <Separator className="my-6" />
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        </div>
    </div>
  );
}


export default function FlightDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params;
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedFare, setSelectedFare] = useState<string | null>(null);
  const { toast } = useToast();

  const passengers = parseInt(searchParams.get('passengers') || '1', 10);
  const [passengerNames, setPassengerNames] = useState(Array(passengers).fill(''));

  useEffect(() => {
    if (!id) return;

    async function fetchFlightDetails() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/flights?flightId=${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch flight details');
        }
        const data = await response.json();
        // The API response for a specific flight is an array
        const flightData = data && data.length > 0 ? data[0] : null;

        if (!flightData) {
            throw new Error('Flight not found.');
        }
        setFlight(flightData);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFlightDetails();
  }, [id]);

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...passengerNames];
    newNames[index] = name;
    setPassengerNames(newNames);
  };

  const handleSelectFare = (fareName: string, farePrice: number) => {
    setSelectedFare(fareName);
    toast({
      title: 'Fare Selected',
      description: `You have selected the ${fareName} option for ${passengers} passenger(s). Total: $${farePrice * passengers}`,
    });
  };
  
  const fareOptions = [
    { name: 'Basic Economy', price: 475, features: ['1 Personal Item', 'Last to Board'] },
    { name: 'Main Cabin', price: 525, features: ['1 Personal Item', '1 Carry-on Bag', 'Seat Selection'] },
    { name: 'First Class', price: 950, features: ['2 Checked Bags', 'Priority Boarding', 'Premium Dining', 'Lounge Access'] },
  ];
  
  const formatTime = (time: string | null | undefined) => {
    if (!time) return 'N/A';
    try {
        const date = parseISO(time);
        return formatInTimeZone(date, 'UTC', 'HH:mm');
    } catch (e) {
        return 'N/A';
    }
  }

  const formatDate = (time: string | null | undefined) => {
    if (!time) return 'N/A';
    try {
        const date = parseISO(time);
        return formatInTimeZone(date, 'UTC', 'PPP');
    } catch (e) {
        return 'N/A';
    }
  }

  const calculateDuration = (start?: string | null, end?: string | null): string => {
    if (!start || !end) return 'N/A';
    try {
        const startDate = parseISO(start);
        const endDate = parseISO(end);
        const diffMs = endDate.getTime() - startDate.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${diffHours}h ${diffMins}m`;
    } catch (e) {
        return 'N/A';
    }
  }

  if (loading) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <FlightDetailsSkeleton />
        </div>
    );
  }

  if (error) {
    return (
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4"/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
    )
  }

  if (!flight) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p>Flight details not found.</p>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image src={`https://picsum.photos/80/80?random=${flight.airline.name || 'airline_lg'}`} alt={flight.airline.name || 'Airline'} width={64} height={64} className="rounded-full" data-ai-hint="airline logo"/>
                <div>
                  <CardTitle className="text-3xl">{flight.airline.name} {flight.number}</CardTitle>
                  <CardDescription className="text-lg">
                    {flight.departure.airport?.municipalityName} ({flight.departure.airport?.iata}) to {flight.arrival.airport?.municipalityName} ({flight.arrival.airport?.iata})
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-around items-center py-6 text-center border-y">
                <div>
                  <p className="text-2xl font-bold">{formatTime(flight.departure.scheduledTime.local)}</p>
                  <p className="text-muted-foreground">{flight.departure.airport.iata}</p>
                </div>
                <div className="flex items-center text-muted-foreground">
                    <Plane className="h-6 w-6" />
                    <Separator className="w-24 mx-4 border-dashed" />
                    <div className="flex flex-col items-center">
                        <Clock className="h-4 w-4 mb-1" />
                        <span className="text-sm font-medium">{calculateDuration(flight.departure.scheduledTime.local, flight.arrival.scheduledTime.local)}</span>
                    </div>
                    <Separator className="w-24 mx-4 border-dashed" />
                    <Plane className="h-6 w-6 rotate-90" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatTime(flight.arrival.scheduledTime.local)}</p>
                  <p className="text-muted-foreground">{flight.arrival.airport.iata}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-sm">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Departure Details</h3>
                    <p><strong>Date:</strong> {formatDate(flight.departure.scheduledTime.local)}</p>
                    <p><strong>Terminal:</strong> {flight.departure.terminal || 'N/A'}</p>
                    <p><strong>Gate:</strong> {flight.departure.gate || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Arrival Details</h3>
                    <p><strong>Date:</strong> {formatDate(flight.arrival.scheduledTime.local)}</p>
                    <p><strong>Terminal:</strong> {flight.arrival.terminal || 'N/A'}</p>
                    <p><strong>Gate:</strong> {flight.arrival.gate || 'N/A'}</p>
                  </div>
              </div>
               <Separator className="my-6" />
                <div>
                    <h3 className="font-semibold text-lg mb-2">Aircraft Information</h3>
                    <p><strong>Type:</strong> {flight.aircraft?.model || 'N/A'}</p>
                    <p><strong>Amenities:</strong> In-flight Wi-Fi, Power outlets, Free snacks</p>
                </div>
            </CardContent>
          </Card>

          {selectedFare && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><UserPlus />Passenger Details</CardTitle>
                <CardDescription>Enter the names for all {passengers} passengers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: passengers }).map((_, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <Label htmlFor={`passenger-${index}`}>Passenger {index + 1} Full Name</Label>
                    <Input 
                      id={`passenger-${index}`} 
                      placeholder="e.g., Jane Doe"
                      value={passengerNames[index]}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                 <Button className="w-full">Confirm Booking</Button>
              </CardFooter>
            </Card>
          )}

        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users /> Select Your Fare</CardTitle>
              <CardDescription>Price is per person. Choose the option that's best for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {fareOptions.map((option) => (
                <Card key={option.name} className={cn("p-4 transition-colors", selectedFare === option.name ? "border-primary ring-2 ring-primary" : "hover:border-primary/50")}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{option.name}</h4>
                    <p className="font-bold text-primary">${option.price}</p>
                  </div>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {option.features.map(feature => <li key={feature} className="flex items-center"><Check className="h-3 w-3 mr-2 text-green-500" />{feature}</li>)}
                  </ul>
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => handleSelectFare(option.name, option.price)}
                    variant={selectedFare === option.name ? 'secondary' : 'default'}
                  >
                    {selectedFare === option.name ? 'Selected' : 'Select'}
                  </Button>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
