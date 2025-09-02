
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { ScrapedFlight } from '@/ai/flows/website-scraper';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle } from 'lucide-react';

export function ScrapedDataTable({ data, isLoading }: { data: ScrapedFlight[], isLoading: boolean }) {
  if (isLoading) {
      return (
          <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
      )
  }
  
  if (data.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-8 border rounded-lg">
        No data to display. Run the scraper to see results.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead>Flight</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Scraped At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className={item.error ? 'bg-destructive/10' : ''}>
              <TableCell>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {item.site}
                </a>
              </TableCell>
              <TableCell>
                {item.flightNumber ? 
                    <Badge variant="outline">{item.flightNumber}</Badge> : 
                    <span className="text-muted-foreground">N/A</span>
                }
              </TableCell>
              <TableCell className="text-xs">
                {item.origin && <p><strong>From:</strong> {item.origin}</p>}
                {item.destination && <p><strong>To:</strong> {item.destination}</p>}
                {item.price && <p><strong>Price:</strong> ${item.price}</p>}
              </TableCell>
              <TableCell>
                {format(new Date(item.scrapedAt), 'PPP p')}
              </TableCell>
               <TableCell>
                {item.error ? (
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs font-medium" title={item.error}>
                      Failed: {item.error.length > 30 ? item.error.substring(0, 30) + '...' : item.error}
                    </span>
                  </div>
                ) : (
                  <Badge variant="secondary" className="text-green-700 bg-green-50">Success</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
