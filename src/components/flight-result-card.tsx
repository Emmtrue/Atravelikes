
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaneTakeoff, PlaneLanding, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { Flight } from '@/lib/types';
import { parseISO, format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

function formatTime(timeString: string | null | undefined): string {
    if (!timeString) return 'N/A';
    try {
        const date = parseISO(timeString);
        return formatInTimeZone(date, 'UTC', 'HH:mm');
    } catch (error) {
        console.error("Invalid date format:", timeString, error);
        return 'Invalid';
    }
}

function calculateDuration(start: string, end: string): string {
    try {
        const startDate = parseISO(start);
        const endDate = parseISO(end);
        const diffMs = endDate.getTime() - startDate.getTime();
        if (isNaN(diffMs)) return 'N/A';
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${diffHours}h ${diffMins}m`;
    } catch (e) {
        return 'N/A';
    }
}

export function FlightResultCard({ flight, passengers }: { flight: Flight, passengers: string }) {

  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  searchParams.set('passengers', passengers);

  const departureTime = flight.departure?.scheduledTime?.local;
  const arrivalTime = flight.arrival?.scheduledTime?.local;

  const duration = departureTime && arrivalTime ? calculateDuration(departureTime, arrivalTime) : 'N/A';

  // Construct a unique but predictable ID for navigation
  const flightId = `${flight.number}-${format(new Date(departureTime || Date.now()), 'yyyy-MM-dd')}`;
  
  if (!flightId) {
    return null; // Don't render if we have no ID
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 ease-in-out group border-transparent hover:border-primary/50">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
        
          <div className="md:col-span-3 flex items-center gap-3">
            <Image src={`https://picsum.photos/40/40?random=${flight.airline.name || 'airline'}`} alt={flight.airline.name || 'Airline'} data-ai-hint="airline logo" width={40} height={40} className="rounded-full" />
            <div className="flex flex-col">
              <p className="font-bold text-base text-foreground">{flight.number}</p>
              <p className="text-xs text-muted-foreground">{flight.airline.name}</p>
            </div>
          </div>
          
          <div className="md:col-span-6 flex items-center justify-between text-center">
            <div className="flex flex-col items-start">
                <p className="font-bold text-2xl text-foreground">{formatTime(departureTime)}</p>
                <p className="text-sm font-medium text-muted-foreground">{flight.departure?.airport?.iata}</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center mx-4">
                <div className="w-full flex items-center gap-2">
                    <PlaneTakeoff className="h-4 w-4 text-muted-foreground/70" />
                    <Separator className="flex-1 border-dashed" />
                    <div className="flex flex-col items-center">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground font-semibold">{duration}</p>
                    </div>
                    <Separator className="flex-1 border-dashed" />
                    <PlaneLanding className="h-4 w-4 text-muted-foreground/70" />
                </div>
            </div>

            <div className="flex flex-col items-end">
                <p className="font-bold text-2xl text-foreground">{formatTime(arrivalTime)}</p>
                <p className="text-sm font-medium text-muted-foreground">{flight.arrival?.airport?.iata}</p>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col items-end justify-center gap-2 text-right">
            <p className="text-3xl font-extrabold text-primary">${(Math.random() * 800 + 200).toFixed(0)}</p>
            <Button size="sm" className="w-full" asChild>
                <Link href={`/flights/${flightId}?${searchParams.toString()}`}>Select</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
