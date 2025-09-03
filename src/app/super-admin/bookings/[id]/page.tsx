
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Mail, Plane, Calendar, DollarSign, Tag, ArrowRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Mock function to get booking data by ID
const getBookingById = (id: string) => {
  // In a real app, this would be a database call.
  return {
    bookingId: id,
    user: {
      userId: 'usr_1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://picsum.photos/40/40?random=user1',
    },
    flight: {
      number: 'AA456',
      origin: 'JFK',
      destination: 'LAX',
      departureTime: '08:30',
      arrivalTime: '11:45',
      duration: '6h 15m'
    },
    bookingDate: '2024-05-15T14:30:00Z',
    price: 475.50,
    status: 'Confirmed',
    passengers: 1,
  };
};

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const resolvedParams = React.use(params);
  const booking = getBookingById(resolvedParams.id);

  if (!booking) {
    return <div>Booking not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="outline" size="icon" asChild className="shrink-0">
          <Link href="/super-admin/bookings">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to bookings</span>
          </Link>
        </Button>
        <div className="flex-grow">
            <h1 className="text-3xl font-bold">Booking Details</h1>
            <p className="text-sm text-muted-foreground">Booking ID: {booking.bookingId}</p>
        </div>
        <Badge
          variant={booking.status === 'Confirmed' ? 'secondary' : 'destructive'}
          className={`capitalize shrink-0 ${booking.status === 'Confirmed' ? 'border-green-300 bg-green-50 text-green-700' : 'border-yellow-300 bg-yellow-50 text-yellow-700'}`}
        >
          {booking.status}
        </Badge>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Plane /> Flight Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-lg">
                        <div className="text-center sm:text-left">
                            <p className="text-sm text-muted-foreground">Flight Number</p>
                            <p className="font-bold text-lg">{booking.flight.number}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Route</p>
                            <p className="font-bold text-lg flex items-center gap-2">
                                {booking.flight.origin} <ArrowRight className="h-4 w-4" /> {booking.flight.destination}
                            </p>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground">Departure Time</p>
                            <p className="font-bold text-lg">{booking.flight.departureTime}</p>
                        </div>
                         <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground">Arrival Time</p>
                            <p className="font-bold text-lg">{booking.flight.arrivalTime}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><User /> User Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                         <Avatar className="h-12 w-12">
                            <AvatarImage src={booking.user.avatar} alt={booking.user.name} />
                            <AvatarFallback>{booking.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                            <p className="font-semibold truncate">{booking.user.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{booking.user.email}</p>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                         <Link href={`/super-admin/users/${booking.user.userId}`}>View Full Profile</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle  className="flex items-center gap-2"><Tag /> Booking Summary</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Booking Date</span>
                        <span className="font-medium">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Booking Time</span>
                        <span className="font-medium">{new Date(booking.bookingDate).toLocaleTimeString()}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Passengers</span>
                        <span className="font-medium">{booking.passengers}</span>
                    </div>
                    <Separator />
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-bold">Total Price</span>
                        <span className="font-extrabold text-lg text-primary">${booking.price.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
