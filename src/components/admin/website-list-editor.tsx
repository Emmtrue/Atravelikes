
'use client';

import { useEffect, useState, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

async function fetchWebsites(): Promise<string[]> {
    const response = await fetch('/api/websites');
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch website list.');
    }
    const data = await response.json();
    return data.websites;
}

async function saveWebsites(websites: string[]): Promise<void> {
    const response = await fetch('/api/websites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ websites }),
    });

     if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save website list.');
    }
}


export function WebsiteListEditor() {
  const [websites, setWebsites] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    async function loadWebsites() {
      setIsLoading(true);
      try {
        const websiteList = await fetchWebsites();
        setWebsites(websiteList.join('\n'));
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to load website list',
          description: (error as Error).message,
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadWebsites();
  }, [toast]);

  const handleSave = () => {
    startTransition(async () => {
      const websiteList = websites.split('\n').filter(w => w.trim() !== '');
      try {
        await saveWebsites(websiteList);
        toast({
          title: 'Success!',
          description: 'The default website list has been updated.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to save',
          description: (error as Error).message,
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Default Website List</CardTitle>
        <CardDescription>
          This is the master list of websites used when "Run Full Scrape" is
          triggered.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="seed-websites">Websites (one per line)</Label>
          {isLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : (
            <Textarea
              id="seed-websites"
              placeholder="https://website1.com\nhttps://website2.com"
              value={websites}
              onChange={(e) => setWebsites(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              disabled={isPending}
            />
          )}
        </div>
        <Button onClick={handleSave} disabled={isLoading || isPending}>
          <Save className="mr-2 h-4 w-4" />
          {isPending ? 'Saving...' : 'Save List'}
        </Button>
      </CardContent>
    </Card>
  );
}
