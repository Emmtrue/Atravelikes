
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plane, Calendar, User, Mail } from 'lucide-react';
import { FlightResultCard } from '@/components/flight-result-card';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


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
];

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-48 mb-4" />
        <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Access Denied</h2>
        <p className="text-muted-foreground mt-2">Please log in to view your dashboard.</p>
        <Link href="/?auth=true" passHref>
             <Button className="mt-4">Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card>
            <CardHeader>
                <CardTitle>Welcome to your Dashboard, {user.displayName || 'Traveler'}!</CardTitle>
                <CardDescription>Here's a summary of your account and recent activity.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                            <User className="h-6 w-6 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">User ID</p>
                                <p className="text-sm font-medium text-muted-foreground">{user.uid.substring(0,10)}...</p>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Full User ID</DialogTitle>
                            <DialogDescription>
                                This is your unique identifier on Atravelikes.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="p-2 bg-muted rounded-md">
                            <p className="text-sm font-mono break-all">{user.uid}</p>
                        </div>
                    </DialogContent>
                </Dialog>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Calendar className="h-6 w-6 text-primary" />
                     <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="text-sm font-medium">{new Date(user.metadata.creationTime!).toLocaleDateString()}</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Plane /> Recent Bookings</h2>
            <div className="space-y-6">
                {mockBookedFlights.length > 0 ? (
                    mockBookedFlights.map((flight) => (
                        <FlightResultCard key={flight.id} flight={flight} />
                    ))
                ) : (
                    <Card className="flex flex-col items-center justify-center p-12 text-center">
                         <CardTitle>No Flights Booked</CardTitle>
                        <CardDescription className="mt-2">You haven't booked any flights yet. Start searching now!</CardDescription>
                        <Link href="/" passHref>
                           <Button className="mt-4">Search Flights</Button>
                        </Link>
                    </Card>
                )}
            </div>
        </div>
    </div>
  );
}
