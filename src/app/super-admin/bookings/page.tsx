
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration purposes
const initialBookings = [
  {
    bookingId: 'bk_101',
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
    },
    bookingDate: '2024-05-15',
    price: 475.50,
    status: 'Confirmed',
  },
  {
    bookingId: 'bk_102',
    user: {
      userId: 'usr_2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://picsum.photos/40/40?random=user2',
    },
    flight: {
      number: 'BA245',
      origin: 'LHR',
      destination: 'CDG',
    },
    bookingDate: '2024-05-14',
    price: 150.00,
    status: 'Confirmed',
  },
  {
    bookingId: 'bk_103',
    user: {
      userId: 'usr_3',
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      avatar: 'https://picsum.photos/40/40?random=user3',
    },
     flight: {
      number: 'EK202',
      origin: 'DXB',
      destination: 'JFK',
    },
    bookingDate: '2024-05-12',
    price: 1250.75,
    status: 'Cancelled',
  },
    {
    bookingId: 'bk_104',
    user: {
      userId: 'usr_4',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      avatar: 'https://picsum.photos/40/40?random=user4',
    },
     flight: {
      number: 'SQ31',
      origin: 'SFO',
      destination: 'SIN',
    },
    bookingDate: '2024-05-11',
    price: 980.00,
    status: 'Confirmed',
  },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const { toast } = useToast();

  const handleCancelBooking = (bookingId: string) => {
    setBookings(currentBookings =>
      currentBookings.map(booking => {
        if (booking.bookingId === bookingId) {
          if (booking.status === 'Cancelled') {
            toast({
              variant: 'default',
              title: 'Already Cancelled',
              description: 'This booking has already been cancelled.',
            });
            return booking;
          }
          toast({
            title: 'Booking Cancelled',
            description: `Booking ID ${booking.bookingId} has been cancelled.`,
          });
          return { ...booking, status: 'Cancelled' };
        }
        return booking;
      })
    );
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Bookings Management</h1>
        <p className="text-muted-foreground">
          View and manage all flight bookings across the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            A list of all flight bookings. (Mock Data)
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Flight</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Booking Date</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.bookingId}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={booking.user.avatar} alt={booking.user.name} />
                            <AvatarFallback>
                              {booking.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{booking.user.name}</div>
                            <div className="text-sm text-muted-foreground">{booking.user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{booking.flight.number}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                            {booking.flight.origin} <ArrowRight className="h-3 w-3" /> {booking.flight.destination}
                        </div>
                      </TableCell>
                       <TableCell>${booking.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            booking.status === 'Confirmed' ? 'secondary' : 'destructive'
                          }
                          className={
                            booking.status === 'Confirmed' ? 'border-green-300 bg-green-50 text-green-700' : 'border-yellow-300 bg-yellow-50 text-yellow-700'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                             <DropdownMenuItem asChild>
                               <Link href={`/super-admin/bookings/${booking.bookingId}`}>View Booking</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/super-admin/users/${booking.user.userId}`}>View User Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleCancelBooking(booking.bookingId)}
                              className="text-destructive"
                            >
                              Cancel Booking
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
