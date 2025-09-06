
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Star, AlertTriangle, BedDouble, MapPin } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import type { LiteAPIHotel } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

async function getHotelDetails({ id, checkIn, checkOut, guests, rooms }: { id: string, checkIn: string, checkOut: string, guests: string, rooms: string }): Promise<{ data: LiteAPIHotel | null; error: string | null }> {
    const baseUrl = '/api/hotels';
    try {
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hotelId: id,
            checkin: checkIn,
            checkout: checkOut,
            adults: parseInt(guests),
            rooms: parseInt(rooms),
          }),
          cache: 'no-store' 
        });

        const result = await response.json();
        
        if (!response.ok) {
            console.error(`API Error: ${response.status} ${response.statusText}`, result);
            return { data: null, error: result.message || 'Could not fetch hotel data.' };
        }
        
        // The API returns an array, even for a single hotel ID
        const hotelData = result.data && result.data.length > 0 ? result.data[0] : null;
        
        if (!hotelData) {
            return { data: null, error: 'Hotel details not found for the given ID.' };
        }

        return { data: hotelData, error: null };
    } catch (error) {
        console.error("Failed to fetch hotel details:", error);
        return { data: null, error: 'An unexpected error occurred while fetching hotel details.' };
    }
}


function HotelDetailsSkeleton() {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <Skeleton className="w-full h-[300px] md:h-[500px]" />
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                    <div className="md:col-span-1">
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
                <Separator className="my-8" />
                 <div>
                    <Skeleton className="h-8 w-48 mb-4" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function HotelDetailsPage() {
  const [hotel, setHotel] = useState<LiteAPIHotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const params = useParams();
  const hotelId = params.id as string;
  
  useEffect(() => {
    async function fetchData() {
        const checkIn = searchParams.get('checkInDate');
        const checkOut = searchParams.get('checkOutDate');
        const guests = searchParams.get('guests');
        const rooms = searchParams.get('rooms');

        if (!checkIn || !checkOut || !guests || !rooms) {
            setError("Missing search parameters. Please start a new search.");
            setLoading(false);
            return;
        }

        if (!hotelId) {
            setError("Hotel ID is missing from the URL.");
            setLoading(false);
            return;
        }

        const { data, error } = await getHotelDetails({ id: hotelId, checkIn, checkOut, guests, rooms });
        
        if (error) {
            setError(error);
        } else {
            setHotel(data);
        }
        setLoading(false);
    }
    fetchData();
  }, [hotelId, searchParams]);

   const amenities = hotel?.hotelFacilities?.slice(0, 8) || [];
  
  if (loading) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HotelDetailsSkeleton />
        </div>
    );
  }

  if (error || !hotel) {
     return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4"/>
                <AlertTitle>{error ? 'Error Fetching Hotel' : 'Hotel Not Found'}</AlertTitle>
                <AlertDescription>{error || 'Could not find details for this hotel. Please go back and try again.'}</AlertDescription>
            </Alert>
        </div>
    )
  }
  
  const bestRate = hotel.rates?.[0];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
           <Carousel className="w-full">
            <CarouselContent>
                {hotel.hotelImages?.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="relative h-[300px] md:h-[500px]">
                        <Image src={img.url} alt={hotel.name || 'Hotel'} fill className="object-cover" data-ai-hint="hotel luxury" unoptimized priority={index === 0} />
                      </div>
                    </CarouselItem>
                ))}
                 {(!hotel.hotelImages || hotel.hotelImages.length === 0) && (
                    <CarouselItem>
                         <div className="relative h-[300px] md:h-[500px] bg-muted flex items-center justify-center">
                            <BedDouble className="h-24 w-24 text-muted-foreground" />
                        </div>
                    </CarouselItem>
                )}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4" />
            <CarouselNext className="absolute right-4" />
          </Carousel>
        </CardHeader>
        <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <CardTitle className="text-4xl font-bold">{hotel.name}</CardTitle>
                    {hotel.starRating && (
                        <div className="flex flex-wrap items-center gap-4 mt-2 mb-4">
                            <div className="flex items-center gap-1 text-yellow-500">
                                {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < (hotel.starRating || 0) ? 'fill-current' : 'stroke-current'}`} />)}
                            </div>
                             <Badge variant="secondary">{hotel.starRating}.0 Stars</Badge>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{hotel.address}</span>
                    </div>
                </div>
                 <div className="md:col-span-1">
                    <Card className="bg-muted/50 p-6">
                        {bestRate ? (
                             <>
                                <div className="flex justify-between items-baseline mb-4">
                                    <p className="text-muted-foreground">Prices from</p>
                                    <p className="text-3xl font-extrabold text-primary">${bestRate.retailRate.amount.toFixed(2)}</p>
                                </div>
                                <Button className="w-full text-lg py-6">
                                    Book Now
                                </Button>
                            </>
                        ) : (
                             <p className="text-center text-muted-foreground">No prices available for the selected dates.</p>
                        )}
                       
                    </Card>
                </div>
            </div>
            
            {amenities.length > 0 && (
                 <>
                    <Separator className="my-8" />
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Amenities</h3>
                        <div className="flex flex-wrap gap-2">
                            {amenities.map(amenity => (
                                <Badge key={amenity} variant="outline">{amenity}</Badge>
                            ))}
                        </div>
                    </div>
                 </>
            )}
        </CardContent>
      </Card>
    </div>
  );
}

    