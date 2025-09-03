
'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export function LocationHint({ origin, destination }: { origin: string, destination: string }) {
  const [hint, setHint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHint() {
      if (!origin || !destination) {
          setIsLoading(false);
          return;
      };
      setIsLoading(true);
      try {
        const response = await fetch(`/api/location-hint?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
        if(response.ok) {
          const data = await response.json();
          setHint(data.hint);
        }
      } catch (error) {
        console.error("Failed to fetch location hint:", error);
        setHint(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHint();
  }, [origin, destination]);

  if (isLoading) {
    return <Skeleton className="h-12 w-full" />;
  }

  if (!hint) {
    return null;
  }

  return (
    <Alert className="bg-accent/50 border-accent">
      <Info className="h-4 w-4" />
      <AlertTitle>Travel Tip!</AlertTitle>
      <AlertDescription>
        {hint}
      </AlertDescription>
    </Alert>
  );
}
