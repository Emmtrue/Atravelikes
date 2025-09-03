
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Save } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export function AdminPanel() {
  const [websites, setWebsites] = useState<string[]>([]);
  const [editedWebsites, setEditedWebsites] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  async function fetchWebsites() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/websites');
      if (!response.ok) {
        throw new Error('Failed to fetch websites');
      }
      const data = await response.json();
      setWebsites(data.websites);
      setEditedWebsites(data.websites.join('\n'));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }
  
  async function handleSaveChanges() {
    setIsSaving(true);
    toast({
      title: 'Saving changes...',
      description: 'Updating the seed website list.',
    });
    try {
      const siteList = editedWebsites.split('\n').map(s => s.trim()).filter(Boolean);
      const response = await fetch('/api/websites', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ websites: siteList }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to save changes');
      }

      setWebsites(siteList);
      toast({
        title: 'Websites Updated!',
        description: 'The new list has been saved successfully.',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: message,
      });
    } finally {
      setIsSaving(false);
    }
  }


  useEffect(() => {
    fetchWebsites();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Seed Websites</CardTitle>
        <CardDescription>
          Manage the list of websites the scraper uses. Enter one URL per line.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-40 w-full" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <Textarea
            value={editedWebsites}
            onChange={(e) => setEditedWebsites(e.target.value)}
            rows={15}
            placeholder="Enter one website URL per line..."
            className="font-mono text-sm"
            disabled={isSaving}
          />
        )}
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={handleSaveChanges} disabled={isSaving || isLoading}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardFooter>
    </Card>
  );
}
