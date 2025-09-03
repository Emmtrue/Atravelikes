
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';

type Flight = {
    id: number;
    airline: string;
    airlineLogo: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    stops: number;
};

export function FlightResultCard({ flight }: { flight: Flight }) {
  const searchParams = useSearchParams();

  return (
    <Card className="hover:shadow-lg transition-all duration-300 ease-in-out group border-transparent hover:border-primary/50">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
        
          <div className="md:col-span-3 flex items-center gap-3">
            <Image src={flight.airlineLogo} alt={flight.airline} data-ai-hint="airline logo" width={40} height={40} className="rounded-full" />
            <div className="flex flex-col">
              <p className="font-bold text-base text-foreground">{flight.airline}</p>
              <p className="text-xs text-muted-foreground">{flight.stops === 0 ? 'Direct flight' : `${flight.stops} stop(s)`}</p>
            </div>
          </div>
          
          <div className="md:col-span-6 flex items-center justify-between text-center">
            <div className="flex flex-col items-start">
                <p className="font-bold text-2xl text-foreground">{flight.departureTime}</p>
                <p className="text-sm font-medium text-muted-foreground">{flight.origin}</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center mx-4">
                <div className="w-full flex items-center gap-2">
                    <PlaneTakeoff className="h-4 w-4 text-muted-foreground/70" />
                    <Separator className="flex-1 border-dashed" />
                    <div className="flex flex-col items-center">
                        <p className="text-xs text-muted-foreground font-semibold">{flight.duration}</p>
                    </div>
                    <Separator className="flex-1 border-dashed" />
                    <PlaneLanding className="h-4 w-4 text-muted-foreground/70" />
                </div>
            </div>

            <div className="flex flex-col items-end">
                <p className="font-bold text-2xl text-foreground">{flight.arrivalTime}</p>
                <p className="text-sm font-medium text-muted-foreground">{flight.destination}</p>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col items-end justify-center gap-2 text-right">
            <p className="text-3xl font-extrabold text-primary">${flight.price}</p>
            <Link href={`/flights/${flight.id}?${searchParams.toString()}`} className="w-full">
              <Button size="sm" className="w-full">Select</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
