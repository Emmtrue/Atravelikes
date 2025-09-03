
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Plane, Terminal, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AirportStatusSchema = z.object({
  airportCode: z.string().min(3, 'Airport code must be at least 3 characters').max(4, 'Airport code can be max 4 characters').regex(/^[A-Z]{3,4}$/, 'Please enter a valid ICAO/IATA airport code (e.g., JFK, EGLL)'),
});

type Flight = {
  ident: string;
  type: string;
  origin: { code: string } | null;
  destination: { code: string } | null;
  scheduled_out: string;
  estimated_out: string;
  scheduled_in: string;
  estimated_in: string;
  status: string;
  gate_origin: string | null;
  gate_destination: string | null;
};

export default function AirportStatusPage() {
  const [flights, setFlights] = useState<{ arrivals: Flight[]; departures: Flight[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof AirportStatusSchema>>({
    resolver: zodResolver(AirportStatusSchema),
    defaultValues: { airportCode: '' },
  });

  async function onSubmit(data: z.infer<typeof AirportStatusSchema>) {
    setIsLoading(true);
    setError(null);
    setFlights(null);
    try {
      const response = await fetch(`/api/flights?airportCode=${data.airportCode}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `An error occurred: ${response.statusText}`);
      }
      const result = await response.json();
      setFlights(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  
  const renderFlightRow = (flight: Flight, type: 'departure' | 'arrival') => (
    <TableRow key={flight.ident}>
      <TableCell className="font-medium">{flight.ident}</TableCell>
      <TableCell>{type === 'departure' ? flight.destination?.code || 'N/A' : flight.origin?.code || 'N/A'}</TableCell>
      <TableCell>{flight.status}</TableCell>
      <TableCell>{type === 'departure' ? flight.gate_origin || 'N/A' : flight.gate_destination || 'N/A'}</TableCell>
      <TableCell>{new Date(flight.scheduled_out).toLocaleTimeString()}</TableCell>
      <TableCell>{flight.estimated_out ? new Date(flight.estimated_out).toLocaleTimeString() : 'N/A'}</TableCell>
    </TableRow>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2"><Plane /> Airport Flight Status</CardTitle>
          <CardDescription>
            Enter a valid ICAO or IATA airport code to get live flight information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="airportCode"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel className="sr-only">Airport Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., JFK, LAX, LHR" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-40 w-full" />
           <Skeleton className="h-10 w-1/4 mt-8" />
          <Skeleton className="h-40 w-full" />
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {flights && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Departures</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Flight</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Gate</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead>Estimated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flights.departures.map(flight => renderFlightRow(flight, 'departure'))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Arrivals</CardTitle>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Flight</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Gate</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead>Estimated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flights.arrivals.map(flight => renderFlightRow(flight, 'arrival'))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
