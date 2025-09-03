
'use client';

import { FlightResultCard } from '@/components/flight-result-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const mockBookedFlights = [
    {
        id: 101,
        airline: 'Atravelikes Air',
        airlineLogo: 'https://picsum.photos/40/40?random=airline1',
        origin: 'JFK',
        destination: 'LAX',
        departureTime: '08:30',
        arrivalTime: '11:45',
        duration: '6h 15m',
        price: 475,
        stops: 0,
    },
    {
        id: 102,
        airline: 'Skyways',
        airlineLogo: 'https://picsum.photos/40/40?random=airline2',
        origin: 'LHR',
        destination: 'CDG',
        departureTime: '14:00',
        arrivalTime: '16:20',
        duration: '1h 20m',
        price: 150,
        stops: 0,
    },
    {
        id: 103,
        airline: 'VistaJet',
        airlineLogo: 'https://picsum.photos/40/40?random=airline3',
        origin: 'DXB',
        destination: 'SIN',
        departureTime: '22:00',
        arrivalTime: '09:30',
        duration: '7h 30m',
        price: 1250,
        stops: 0,
    }
];

export default function MyFlightsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Flights</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <CardTitle>My Booked Flights</CardTitle>
          <CardDescription>View and manage all your upcoming and past flights.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {mockBookedFlights.length > 0 ? (
            mockBookedFlights.map((flight) => (
              <FlightResultCard key={flight.id} flight={flight} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2 rounded-lg">
              <CardTitle>No Flights Booked</CardTitle>
              <CardDescription className="mt-2">You haven't booked any flights yet. Start searching now!</CardDescription>
              <Link href="/" passHref>
                <Button className="mt-4">Search Flights</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
