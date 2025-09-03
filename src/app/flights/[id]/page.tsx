
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Plane, Clock, User, Check, Wifi, Briefcase, Star, Users, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useParams, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function FlightDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params;
  const [selectedFare, setSelectedFare] = useState<string | null>(null);
  const { toast } = useToast();

  const passengers = parseInt(searchParams.get('passengers') || '1', 10);
  const [passengerNames, setPassengerNames] = useState(Array(passengers).fill(''));

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
  
  // In a real app, you'd fetch this data based on params.id
  const flight = {
    id: id,
    airline: 'American Airlines',
    airlineLogo: 'https://picsum.photos/80/80?random=airline_lg',
    flightNumber: 'AA456',
    origin: 'JFK',
    originCity: 'New York',
    destination: 'LAX',
    destinationCity: 'Los Angeles',
    departure: {
      time: '08:30',
      date: '2024-10-28',
      terminal: '4',
      gate: 'B22',
    },
    arrival: {
      time: '11:45',
      date: '2024-10-28',
      terminal: '2',
      gate: 'A7',
    },
    duration: '6h 15m',
    price: 475,
    stops: 0,
    aircraft: 'Boeing 737-800',
    amenities: ['In-flight Wi-Fi', 'Power outlets', 'Free snacks'],
  };

  const fareOptions = [
    { name: 'Basic Economy', price: 475, features: ['1 Personal Item', 'Last to Board'] },
    { name: 'Main Cabin', price: 525, features: ['1 Personal Item', '1 Carry-on Bag', 'Seat Selection'] },
    { name: 'First Class', price: 950, features: ['2 Checked Bags', 'Priority Boarding', 'Premium Dining', 'Lounge Access'] },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image src={flight.airlineLogo} alt={flight.airline} width={64} height={64} className="rounded-full" data-ai-hint="airline logo"/>
                <div>
                  <CardTitle className="text-3xl">{flight.airline} {flight.flightNumber}</CardTitle>
                  <CardDescription className="text-lg">
                    {flight.originCity} ({flight.origin}) to {flight.destinationCity} ({flight.destination})
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-around items-center py-6 text-center border-y">
                <div>
                  <p className="text-2xl font-bold">{flight.departure.time}</p>
                  <p className="text-muted-foreground">{flight.origin}</p>
                </div>
                <div className="flex items-center text-muted-foreground">
                    <Plane className="h-6 w-6" />
                    <Separator className="w-24 mx-4 border-dashed" />
                    <div className="flex flex-col items-center">
                        <Clock className="h-4 w-4 mb-1" />
                        <span className="text-sm font-medium">{flight.duration}</span>
                    </div>
                    <Separator className="w-24 mx-4 border-dashed" />
                    <Plane className="h-6 w-6 rotate-90" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{flight.arrival.time}</p>
                  <p className="text-muted-foreground">{flight.destination}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-sm">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Departure Details</h3>
                    <p><strong>Date:</strong> {new Date(flight.departure.date).toDateString()}</p>
                    <p><strong>Terminal:</strong> {flight.departure.terminal}</p>
                    <p><strong>Gate:</strong> {flight.departure.gate}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Arrival Details</h3>
                    <p><strong>Date:</strong> {new Date(flight.arrival.date).toDateString()}</p>
                    <p><strong>Terminal:</strong> {flight.arrival.terminal}</p>
                    <p><strong>Gate:</strong> {flight.arrival.gate}</p>
                  </div>
              </div>
               <Separator className="my-6" />
                <div>
                    <h3 className="font-semibold text-lg mb-2">Aircraft Information</h3>
                    <p><strong>Type:</strong> {flight.aircraft}</p>
                    <p><strong>Amenities:</strong> {flight.amenities.join(', ')}</p>
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
