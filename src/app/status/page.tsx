
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plane, CheckCircle2, AlertTriangle, Clock } from 'lucide-react'
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Flight } from '@/lib/types';
import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";


const StatusIcon = ({ status }: { status?: string }) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('on time') || s.includes('scheduled')) return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    if (s.includes('delayed') || s.includes('diverted')) return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    if (s.includes('landed') || s.includes('arrived') || s.includes('enroute')) return <CheckCircle2 className="h-4 w-4 text-blue-600" />;
    return <Clock className="h-4 w-4 text-muted-foreground" />;
}

function StatusResult() {
    const searchParams = useSearchParams();
    const flightNumber = searchParams.get('flightNumber');
    const date = searchParams.get('date');

    const [flight, setFlight] = useState<Flight | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!flightNumber || !date) {
            setIsLoading(false);
            return;
        }

        async function fetchFlightStatus() {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/flights?flightNumber=${flightNumber}&date=${date}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Flight not found.');
                }
                const data = await response.json();
                const flightData = data && data.length > 0 ? data[0] : null;

                if (flightData) {
                     setFlight(flightData);
                } else {
                    throw new Error(`Flight ${flightNumber} could not be found for the selected date.`);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchFlightStatus();
    }, [flightNumber, date]);


    if (isLoading) {
       return <Skeleton className="h-64 w-full" />;
    }

    if(error){
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4"/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
    }

    if (!flight) {
        return (
            <div className="text-center">
                <p className="text-muted-foreground">Please search for a flight status on the home page.</p>
            </div>
        )
    }
    
    const formatTime = (timeInfo: {local: string} | null | undefined) => {
      if (!timeInfo?.local) return 'N/A';
      try {
        const date = parseISO(timeInfo.local);
        return formatInTimeZone(date, 'UTC', 'HH:mm');
      } catch (e) {
        return 'N/A';
      }
    };

    return (
        <Card className="w-full shadow-lg">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl">Flight {flight.number}</CardTitle>
                        <CardDescription>{flight.airline.name} &middot; {flight.departure.scheduledTime.local ? new Date(flight.departure.scheduledTime.local).toLocaleDateString() : ''}</CardDescription>
                    </div>
                    <Badge variant="outline" className={`capitalize text-base px-3 py-1`}>
                        <StatusIcon status={flight.status} /> <span className="ml-2">{flight.status}</span>
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center text-center">
                    <div>
                        <p className="text-3xl font-bold">{flight.departure.airport.iata}</p>
                        <p className="text-muted-foreground">{flight.departure.airport.municipalityName}</p>
                    </div>
                    <div className="my-4 md:my-0 flex items-center justify-center text-primary">
                        <Separator className="md:hidden w-1/4" />
                        <Plane className="mx-4 h-8 w-8" />
                        <Separator className="flex-1 hidden md:block" />
                    </div>
                    <div>
                        <p className="text-3xl font-bold">{flight.arrival.airport.iata}</p>
                        <p className="text-muted-foreground">{flight.arrival.airport.municipalityName}</p>
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                        <h3 className="font-semibold text-lg text-muted-foreground">Departure</h3>
                        <p>Scheduled: {formatTime(flight.departure.scheduledTime)}</p>
                        <p className="font-bold text-xl">
                            Actual: {flight.departure.runwayTime ? formatTime(flight.departure.runwayTime) : (flight.departure.revisedTime ? formatTime(flight.departure.revisedTime) + ' (Est)' : 'N/A')}
                        </p>
                    </div>
                    <div className="text-center">
                        <h3 className="font-semibold text-lg text-muted-foreground">Arrival</h3>
                        <p>Scheduled: {formatTime(flight.arrival.scheduledTime)}</p>
                        <p className="font-bold text-xl">
                           Actual: {flight.arrival.runwayTime ? formatTime(flight.arrival.runwayTime) : (flight.arrival.revisedTime ? formatTime(flight.arrival.revisedTime) + ' (Est)' : 'N/A')}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function StatusPage() {
    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
                <StatusResult />
            </Suspense>
        </div>
    )
}
