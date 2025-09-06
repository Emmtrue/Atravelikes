
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, BedDouble } from 'lucide-react';
import type { LiteAPIHotel } from '@/lib/types';
import { useSearchParams } from 'next/navigation';

export function HotelResultCard({ hotel }: { hotel: LiteAPIHotel }) {
    const searchParams = useSearchParams();
    const bestRate = hotel.rates?.[0];

    return (
        <Link href={`/hotels/${hotel.hotelId}?${searchParams.toString()}`} className="block h-full group">
            <Card className="flex flex-col h-full overflow-hidden group-hover:shadow-lg transition-shadow duration-300 group-hover:border-primary/50">
                <div className="relative w-full h-48">
                    {hotel.hotelImages && hotel.hotelImages.length > 0 ? (
                        <Image 
                            src={hotel.hotelImages[0].url} 
                            alt={hotel.name ?? 'Hotel Image'}
                            data-ai-hint="hotel room" 
                            fill 
                            className="object-cover" 
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <BedDouble className="h-16 w-16 text-muted-foreground" />
                        </div>
                    )}
                </div>
                <CardHeader className="flex-grow">
                    <CardTitle className="truncate text-lg">{hotel.name}</CardTitle>
                    {hotel.starRating && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{hotel.starRating}.0 Stars</span>
                        </div>
                    )}
                </CardHeader>
                <CardFooter className="flex justify-between items-center bg-muted/50 p-4 mt-auto">
                    <div>
                        {bestRate ? (
                           <>
                            <p className="text-muted-foreground text-xs">Prices from</p>
                            <p className="text-xl font-bold text-primary">${bestRate.retailRate.amount.toFixed(2)}</p>
                           </>
                        ) : (
                            <p className="text-sm text-muted-foreground">Prices unavailable</p>
                        )}
                    </div>
                    <Button>View Deal</Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
