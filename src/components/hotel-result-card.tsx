
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase/client';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type Hotel = {
    id: number;
    name: string;
    image: string;
    rating: string;
    price: number;
    amenities: string[];
};

// This is a placeholder function for a real API call.
async function getIsHotelSaved(userId: string, hotelId: number): Promise<boolean> {
    console.log(`Checking if hotel ${hotelId} is saved for user ${userId}. Returning mock data.`);
    // In a real app, this would check a 'savedHotels' collection in Firestore.
    // To keep this component free of server-side SDKs, we use mock data.
    return [1, 3, 5].includes(hotelId);
}

// This is a placeholder function for a real API call.
async function toggleHotelSaveStatus(userId: string, hotelId: number, isCurrentlySaved: boolean): Promise<void> {
     console.log(`Toggling save status for hotel ${hotelId} for user ${userId}. Currently saved: ${isCurrentlySaved}`);
     // In a real app, this would call a secure API endpoint that uses the Admin SDK
     // to add or remove the hotel ID from the user's document in Firestore.
}

export function HotelResultCard({ hotel }: { hotel: Hotel }) {
    const { toast } = useToast();
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const user = auth.currentUser;
    const router = useRouter();


    useEffect(() => {
        const checkIfSaved = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            };
            setIsLoading(true);
            const savedStatus = await getIsHotelSaved(user.uid, hotel.id);
            setIsSaved(savedStatus);
            setIsLoading(false);
        };
        checkIfSaved();
    }, [user, hotel.id]);

    const handleSave = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
             toast({
                title: "Authentication required",
                description: "You need to be logged in to save hotels.",
                action: <Button onClick={() => router.push('/login')}>Login</Button>
            });
            return;
        }
        setIsSaving(true);
        try {
            await toggleHotelSaveStatus(user.uid, hotel.id, isSaved);
            setIsSaved(!isSaved);
            toast({ title: isSaved ? "Hotel unsaved!" : "Hotel saved!" });
        } catch (error) {
            console.error("Error saving hotel:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem saving your hotel.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Link href={`/hotels/${hotel.id}`} className="block h-full">
            <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative w-full h-48">
                    <Image src={hotel.image} alt={hotel.name} data-ai-hint="hotel room" fill className="object-cover" />
                    <Button size="icon" variant="secondary" className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/70 hover:bg-white" onClick={handleSave} disabled={isSaving || isLoading}>
                        <Heart className={cn("h-4 w-4 text-black/60 transition-colors", isSaved && "fill-red-500 text-red-500")} />
                    </Button>
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
