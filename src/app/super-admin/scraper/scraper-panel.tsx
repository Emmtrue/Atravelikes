

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Download, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface ScrapedFlight {
  site: string;
  sourceUrl: string;
  scrapedAt: string;
  flightNumber?: string;
  origin?: string;
  destination?: string;
  price?: number;
  error?: string;
}

export function ScraperPanel() {
  const [manualUrl, setManualUrl] = useState('');
  const [multiUrlList, setMultiUrlList] = useState('');
  const [scrapedData, setScrapedData] = useState<ScrapedFlight[]>([]);
  const [isScraping, setIsScraping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSchedulerEnabled, setIsSchedulerEnabled] = useState(false);
  const { toast } = useToast();

  async function handleTriggerScrape(sites?: string | string[]) {
    setIsScraping(true);
    setScrapedData([]);
    setError(null);
    toast({
      title: 'Scraping initiated...',
      description: sites ? `Scraping provided site(s).` : 'Scraping all seed websites. This may take a few minutes.',
    });

    try {
      const body = sites ? (Array.isArray(sites) ? { sites } : { site: sites }) : {};
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to trigger scrape');
      }

      setScrapedData(data.data);
      toast({
        title: 'Scraping Complete!',
        description: `Found data for ${data.data.length} site(s).`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      toast({
        variant: 'destructive',
        title: 'Scraping Failed',
        description: message,
      });
    } finally {
      setIsScraping(false);
    }
  }

  function downloadJSON() {
    const dataStr = JSON.stringify(scrapedData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'scraped_data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  function convertToCSV(data: ScrapedFlight[]): string {
    const headers = ['site', 'sourceUrl', 'scrapedAt', 'flightNumber', 'origin', 'destination', 'price', 'error'];
    const rows = data.map(row => 
        headers.map(header => JSON.stringify(row[header as keyof ScrapedFlight] || '', (key, value) => value === null ? '' : value)).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  }

  function downloadCSV() {
    const csvData = convertToCSV(scrapedData);
    const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData);
    const exportFileDefaultName = 'scraped_data.csv';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
  
  const handleMultiUrlScrape = () => {
    const urls = multiUrlList.split('\n').map(u => u.trim()).filter(u => u);
    if (urls.length > 0) {
      handleTriggerScrape(urls);
    } else {
      toast({
        variant: 'destructive',
        title: 'No URLs provided',
        description: 'Please enter at least one URL in the textarea.',
      });
    }
  };

  const handleSchedulerToggle = (checked: boolean) => {
    setIsSchedulerEnabled(checked);
    toast({
        title: `Auto Scraper ${checked ? 'Enabled' : 'Disabled'}`,
        description: checked ? "The scraper will now run on the selected schedule." : "Automated scraping has been turned off.",
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
       <div className="space-y-6">
            <Card>
                <CardHeader>
                <CardTitle>Manual Scraper</CardTitle>
                <CardDescription>
                    Enter a single URL to scrape it immediately.
                </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                    <Input 
                        placeholder="e.g., expedia.com"
                        value={manualUrl}
                        onChange={(e) => setManualUrl(e.target.value)}
                        disabled={isScraping}
                    />
                    <Button onClick={() => handleTriggerScrape(manualUrl)} disabled={isScraping || !manualUrl}>
                        {isScraping ? '...' : 'Scrape URL'}
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Multi-Site Scraper</CardTitle>
                <CardDescription>
                    Enter a list of URLs (one per line) to scrape them all at once.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea 
                        placeholder="expedia.com&#10;kayak.com&#10;google.com/flights"
                        value={multiUrlList}
                        onChange={(e) => setMultiUrlList(e.target.value)}
                        disabled={isScraping}
                        rows={5}
                    />
                </CardContent>
                 <CardFooter>
                    <Button onClick={handleMultiUrlScrape} disabled={isScraping || !multiUrlList}>
                        {isScraping ? '...' : 'Scrape List'}
                    </Button>
                </CardFooter>
            </Card>
       </div>
       <Card>
            <CardHeader>
                <CardTitle>Auto Scraper</CardTitle>
                <CardDescription>
                    Trigger a full scrape of all default seed websites or schedule it to run periodically.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Button onClick={() => handleTriggerScrape()} disabled={isScraping} className="w-full">
                    {isScraping ? 'Scraping in Progress...' : 'Trigger Full Scrape Now'}
                </Button>
                <Separator />
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="scheduler-enable" className="font-bold">Enable Scheduler</Label>
                        <Switch id="scheduler-enable" checked={isSchedulerEnabled} onCheckedChange={handleSchedulerToggle} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="scheduler-interval">Interval</Label>
                        <Select defaultValue="3600" disabled={!isSchedulerEnabled}>
                            <SelectTrigger id="scheduler-interval" className="w-full">
                                <SelectValue placeholder="Select an interval" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="900">Every 15 minutes</SelectItem>
                                <SelectItem value="1800">Every 30 minutes</SelectItem>
                                <SelectItem value="3600">Every 1 hour</SelectItem>
                                <SelectItem value="10800">Every 3 hours</SelectItem>
                                <SelectItem value="21600">Every 6 hours</SelectItem>
                                <SelectItem value="43200">Every 12 hours</SelectItem>
                                <SelectItem value="86400">Every 24 hours</SelectItem>
                            </SelectContent>
                        </Select>
                     </div>
                </div>
            </CardContent>
       </Card>
      
      {(isScraping || scrapedData.length > 0 || error) && (
         <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Results</CardTitle>
                <CardDescription>
                  {isScraping ? 'Scraping in progress...' : `Scraping complete. Found ${scrapedData.length} result(s).`}
                </CardDescription>
              </div>
              {scrapedData.length > 0 && !isScraping && (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={downloadCSV}><Download className="mr-2 h-4 w-4"/>Download CSV</Button>
                    <Button variant="outline" size="sm" onClick={downloadJSON}><Download className="mr-2 h-4 w-4"/>Download JSON</Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
                 {isScraping ? (
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-4/5" />
                    </div>
                ) : error ? (
                    <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                ) : (
                    <div className="border rounded-md max-h-[400px] overflow-y-auto">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Website</TableHead>
                            <TableHead>Flight No.</TableHead>
                            <TableHead>Price</TableHead>
                             <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {scrapedData.map((item, index) => (
                            <TableRow key={`${item.sourceUrl}-${index}`}>
                                <TableCell className="font-medium">{item.site}</TableCell>
                                <TableCell>{item.flightNumber || 'N/A'}</TableCell>
                                <TableCell>{item.price ? `$${item.price}`: 'N/A'}</TableCell>
                                <TableCell>
                                {item.error ? (
                                    <Badge variant="destructive">Failed</Badge>
                                ) : (
                                    <Badge variant="secondary">Success</Badge>
                                )}
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
         </Card>
      )}
    </div>
  );
}
