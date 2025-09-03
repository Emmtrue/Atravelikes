
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
import { ArrowLeft, User, Plane, ArrowRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Mock function to get booking data by ID
const getBookingById = (id: string) => {
  // In a real app, this would be a database call.
  // This is a sample structure based on the new flight details page.
  return {
    bookingId: id,
    user: {
      userId: 'usr_1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://picsum.photos/40/40?random=user1',
    },
    flight: {
      ident: 'KQA535',
      operator: 'Kenya Airways',
      origin: { code: 'LOS', city: 'Lagos' },
      destination: { code: 'NBO', city: 'Nairobi' },
      scheduled_out: '2024-08-15T08:30:00Z',
      scheduled_in: '2024-08-15T14:45:00Z',
    },
    bookingDate: '2024-07-21T14:30:00Z',
    price: 475.50,
    status: 'Confirmed',
    fareType: 'Main Cabin',
    passengers: 1,
  };
};

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const booking = getBookingById(params.id);

  if (!booking) {
    return <div>Booking not found</div>;
  }

  const formatTime = (time: string | null | undefined) => time ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A';
  const formatDate = (time: string | null | undefined) => time ? new Date(time).toLocaleDateString() : 'N/A';

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
                            <p className="font-bold text-lg">{booking.flight.ident}</p>
                        </div>
                         <div className="text-center sm:text-left">
                            <p className="text-sm text-muted-foreground">Airline</p>
                            <p className="font-bold text-lg">{booking.flight.operator}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Route</p>
                            <p className="font-bold text-lg flex items-center gap-2">
                                {booking.flight.origin.code} <ArrowRight className="h-4 w-4" /> {booking.flight.destination.code}
                            </p>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground">Departure</p>
                            <p className="font-bold text-lg">{formatDate(booking.flight.scheduled_out)} at {formatTime(booking.flight.scheduled_out)}</p>
                        </div>
                         <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground">Arrival</p>
                            <p className="font-bold text-lg">{formatDate(booking.flight.scheduled_in)} at {formatTime(booking.flight.scheduled_in)}</p>
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
                    <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Booking Date</span>
                        <span className="font-medium">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Passengers</span>
                        <span className="font-medium">{booking.passengers}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Fare Type</span>
                        <span className="font-medium">{booking.fareType}</span>
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
