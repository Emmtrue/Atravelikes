
'use server';

/**
 * @fileOverview A web scraper for flight information.
 *
 * This file now only defines the data structures for scraped flights.
 * The scraping logic has been moved to the /api/scrape API route
 * to ensure a clean separation of server-side dependencies.
 */

import { z } from 'zod';

const ScrapedFlightSchema = z.object({
  site: z.string().describe('The source website domain.'),
  sourceUrl: z.string().url().describe('The specific URL the data was scraped from.'),
  flightNumber: z.string().optional().describe('The flight number.'),
  origin: z.string().optional().describe('The origin airport code.'),
  destination: z.string().optional().describe('The destination airport code.'),
  price: z.number().optional().describe('The price of the flight.'),
  scrapedAt: z.string().datetime().describe('The timestamp of when the data was scraped.'),
  error: z.string().optional().describe('Any error message encountered during scraping.')
});
export type ScrapedFlight = z.infer<typeof ScrapedFlightSchema>;
