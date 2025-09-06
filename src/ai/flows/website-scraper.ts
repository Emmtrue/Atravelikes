
'use server';

/**
 * @fileOverview A web scraper for extracting data from websites.
 *
 * - scrapeWebsite - A function that scrapes a given URL.
 * - WebsiteScraperInput - The input type for the scrapeWebsite function.
 * - WebsiteScraperOutput - The return type for the scrapeWebsite function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import axios from 'axios';
import * as cheerio from 'cheerio';


export const ScrapeWebsiteInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to scrape.'),
});
export type ScrapeWebsiteInput = z.infer<typeof ScrapeWebsiteInputSchema>;

export const ScrapeWebsiteOutputSchema = z.object({
    title: z.string().optional().describe('The title of the scraped page.'),
    content: z.string().optional().describe('The main content extracted from the page.'),
    links: z.array(z.string()).optional().describe('A list of unique links found on the page.'),
    images: z.array(z.string()).optional().describe('A list of unique image URLs found on the page.'),
});
export type ScrapeWebsiteOutput = z.infer<typeof ScrapeWebsiteOutputSchema>;

export async function scrapeWebsite(input: ScrapeWebsiteInput): Promise<ScrapeWebsiteOutput> {
  return websiteScraperFlow(input);
}


const websiteScraperFlow = ai.defineFlow(
  {
    name: 'websiteScraperFlow',
    inputSchema: ScrapeWebsiteInputSchema,
    outputSchema: ScrapeWebsiteOutputSchema,
  },
  async ({ url }) => {
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
             timeout: 10000
        });

        const $ = cheerio.load(data);
        const title = $('title').text();
        const content = $('body').text().replace(/\s\s+/g, ' ').trim(); // Simple text extraction
        
        const links: string[] = [];
        $('a').each((i, link) => {
            const href = $(link).attr('href');
            if (href) {
                try {
                    links.push(new URL(href, url).href);
                } catch (e) {
                    // Ignore invalid URLs
                }
            }
        });

        const images: string[] = [];
         $('img').each((i, image) => {
            const src = $(image).attr('src');
            if (src) {
                 try {
                    images.push(new URL(src, url).href);
                } catch (e) {
                    // Ignore invalid URLs
                }
            }
        });

        return {
            title,
            content: content.substring(0, 5000), // Limit content size
            links: [...new Set(links)], // Return unique links
            images: [...new Set(images)], // Return unique images
        };

    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
      throw new Error(`Failed to scrape the website at ${url}.`);
    }
  }
);
