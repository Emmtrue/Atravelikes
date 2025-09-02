
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Download, Bot, PlusCircle, Search, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrapedDataTable } from './scraped-data-table';
import type { ScrapedFlight } from '@/ai/flows/website-scraper';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { WebsiteListEditor } from './website-list-editor';

// This function now calls our new API route
async function triggerScraper(sites?: string[]): Promise<ScrapedFlight[]> {
    const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sites }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to trigger scraper');
    }

    const result = await response.json();
    return result.data;
}


export function AdminDashboard() {
  const [isScraping, setIsScraping] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapedFlight[]>([]);
  const [newWebsites, setNewWebsites] = useState('');
  const [singleWebsite, setSingleWebsite] = useState('');
  const [isAutoScrapingOn, setIsAutoScrapingOn] = useState(true);
  const { toast } = useToast();

  const handleRunScraper = async (sites?: string[]) => {
    setIsScraping(true);
    const scrapingAll = !sites || sites.length === 0;

    toast({
      title: 'Scraper started',
      description: scrapingAll
        ? 'Fetching data from the default seed list. This may take a few minutes...'
        : `Scraping ${sites?.length} custom website(s). This may take a while...`,
    });

    try {
      const results = await triggerScraper(sites);
      setScrapedData(prevData => [...prevData, ...results]);
      toast({
        title: 'Scraping complete!',
        description: `Found ${results.filter(r => !r.error).length} successful results out of ${results.length}. Check the table below.`,
      });
    } catch (error) {
      console.error('Scraping failed:', error);
      toast({
        variant: 'destructive',
        title: 'Scraping failed',
        description: (error as Error).message || 'Could not fetch data. Check the server logs for details.',
      });
    } finally {
      setIsScraping(false);
    }
  };


  const handleDownload = (format: 'csv' | 'json') => {
    if (scrapedData.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No data to download',
        description: 'Please run the scraper first.',
      });
      return;
    }

    const dataStr =
      format === 'json'
        ? `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(scrapedData, null, 2)
          )}`
        : `data:text/csv;charset=utf-8,${encodeURIComponent(
            convertToCSV(scrapedData)
          )}`;

    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `scraped_flights.${format}`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    toast({
      title: 'Download started',
      description: `Your ${format.toUpperCase()} file is being downloaded.`,
    });
  };

  const convertToCSV = (data: ScrapedFlight[]) => {
    if (data.length === 0) return "";
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(row =>
      Object.values(row)
        .map(value => (typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value))
        .join(',')
    );
    return [header, ...rows].join('\n');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Master Scraper</CardTitle>
            <CardDescription>
              Fetch data from the entire default seed list of websites.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button onClick={() => handleRunScraper()} disabled={isScraping}>
              <Bot className="mr-2 h-4 w-4" />
              {isScraping ? 'Scraping in Progress...' : 'Run Full Scrape'}
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleDownload('csv')}
                disabled={scrapedData.length === 0 || isScraping}
              >
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDownload('json')}
                disabled={scrapedData.length === 0 || isScraping}
              >
                <Download className="mr-2 h-4 w-4" />
                Download JSON
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Manual Single Website Scrape</CardTitle>
                <CardDescription>
                Enter a single URL to scrape it immediately.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="single-website">Website URL</Label>
                <Input
                    id="single-website"
                    placeholder="https://example.com"
                    value={singleWebsite}
                    onChange={(e) => setSingleWebsite(e.target.value)}
                    disabled={isScraping}
                />
                </div>
                <Button onClick={() => handleRunScraper([singleWebsite])} disabled={isScraping || !singleWebsite} className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Scrape This Website
                </Button>
            </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Manual List Scrape</CardTitle>
            <CardDescription>
              Paste a list of websites to scrape them. This will NOT scrape the default seed list.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-websites">Websites (one per line)</Label>
              <Textarea 
                id="new-websites"
                placeholder="https://website1.com\nhttps://website2.com"
                value={newWebsites}
                onChange={(e) => setNewWebsites(e.target.value)}
                className="min-h-[100px]"
                disabled={isScraping}
              />
              <Button onClick={() => handleRunScraper(newWebsites.split('\n').filter(w => w.trim() !== ''))} size="sm" disabled={isScraping || !newWebsites.trim()}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Scrape From List
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scraper Automation</CardTitle>
            <CardDescription>
              Configure the automatic scraping schedule.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center space-x-2">
                <Switch id="automation-toggle" checked={isAutoScrapingOn} onCheckedChange={setIsAutoScrapingOn} />
                <Label htmlFor="automation-toggle">Automatic Scraping</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="auto-scrape-interval">Scraping Interval</Label>
              <Select defaultValue='hourly' disabled={!isAutoScrapingOn}>
                <SelectTrigger id="auto-scrape-interval" className="w-full">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="every-5-minutes">Every 5 Minutes</SelectItem>
                  <SelectItem value="hourly">Every Hour</SelectItem>
                  <SelectItem value="six-hours">Every 6 Hours</SelectItem>
                  <SelectItem value="daily">Once a Day</SelectItem>
                </SelectContent>
              </Select>
               <p className="text-xs text-muted-foreground pt-1">
                  Note: Automatic scraping requires setting up a Cloud Scheduler job in your Firebase project to call the app's trigger URL.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Scraped Data</CardTitle>
            <CardDescription>
              Results from the most recent scraping task.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setScrapedData([])}
            disabled={scrapedData.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Results
          </Button>
        </CardHeader>
        <CardContent>
          <ScrapedDataTable data={scrapedData} isLoading={isScraping} />
        </CardContent>
      </Card>
    </div>
  );
}
