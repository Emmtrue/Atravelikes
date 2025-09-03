
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Hotel = {
    id: number;
    name: string;
    image: string;
    rating: string;
    price: number;
    amenities: string[];
};

export function HotelResultCard({ hotel }: { hotel: Hotel }) {

    return (
        <Link href={`/hotels/${hotel.id}`} className="block h-full">
            <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative w-full h-48">
                    <Image src={hotel.image} alt={hotel.name} data-ai-hint="hotel room" fill className="object-cover" />
                </div>
                <CardHeader>
                    <CardTitle>{hotel.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{hotel.rating}</span>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                        {hotel.amenities.map(amenity => (
                            <Badge key={amenity} variant="secondary">{amenity}</Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
                    <div>
                        <p className="text-xl font-bold text-primary">${hotel.price}</p>
                        <p className="text-xs text-muted-foreground">per night</p>
                    </div>
                    <Button>View Deal</Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
