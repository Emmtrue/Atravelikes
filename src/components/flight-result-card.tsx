
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase/client';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

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

// This is a placeholder function for a real API call.
async function getIsFlightSaved(userId: string, flightId: number): Promise<boolean> {
    console.log(`Checking if flight ${flightId} is saved for user ${userId}. Returning mock data.`);
    // In a real app, this would check a 'savedFlights' collection in Firestore.
    // To keep this component free of server-side SDKs, we use mock data.
    return [2, 4].includes(flightId);
}

// This is a placeholder function for a real API call.
async function toggleFlightSaveStatus(userId: string, flightId: number, isCurrentlySaved: boolean): Promise<void> {
     console.log(`Toggling save status for flight ${flightId} for user ${userId}. Currently saved: ${isCurrentlySaved}`);
     // In a real app, this would call a secure API endpoint that uses the Admin SDK
     // to add or remove the flight ID from the user's document in Firestore.
}


export function FlightResultCard({ flight }: { flight: Flight }) {
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
        const savedStatus = await getIsFlightSaved(user.uid, flight.id);
        setIsSaved(savedStatus);
        setIsLoading(false);
    };
    checkIfSaved();
  }, [user, flight.id]);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
        toast({
            title: "Authentication required",
            description: "You need to be logged in to save flights.",
            action: <Button onClick={() => router.push('/login')}>Login</Button>
        });
        return;
    }
    setIsSaving(true);
    
    try {
        await toggleFlightSaveStatus(user.uid, flight.id, isSaved);
        setIsSaved(!isSaved);
        toast({ title: isSaved ? "Flight unsaved!" : "Flight saved!" });
    } catch (error) {
        console.error("Error saving flight:", error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem saving your flight.",
        });
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <Link href={`/flights/${flight.id}`} className="block">
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
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 w-full">
                <Button size="sm" variant="outline" className="w-full" onClick={handleSave} disabled={isSaving || isLoading}>
                    <Heart className={cn("h-4 w-4 mr-2", isSaved && "fill-red-500 text-red-500")} /> 
                    {isSaving ? 'Saving...' : (isSaved ? 'Saved' : 'Save')}
                </Button>
                <Button size="sm" className="w-full">Select</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
