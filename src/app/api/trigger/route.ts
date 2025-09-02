
import { NextRequest, NextResponse } from 'next/server';

// This endpoint is a simple wrapper to trigger the scraper API.
// It should be secured, for example, by checking a secret key or using a service like Cloud Scheduler with OIDC.

export async function POST(req: NextRequest) {
  // IMPORTANT: In a production environment, you MUST secure this endpoint.
  // A simple way is to check for a 'secret' query parameter.
  // e.g., if (req.nextUrl.searchParams.get('secret') !== process.env.TRIGGER_SECRET) { return new NextResponse('Unauthorized', { status: 401 }); }
  
    try {
      console.log('Received scheduler trigger. Calling scraper API...');
      // We call our own API route.
      const internalScrapeUrl = new URL('/api/scrape', req.url);
      
      const scrapeResponse = await fetch(internalScrapeUrl.toString(), {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({}), // Trigger with default seed list
      });

      if (!scrapeResponse.ok) {
          const errorData = await scrapeResponse.json().catch(() => ({ message: 'Scraper API failed with a non-JSON response' }));
          throw new Error(errorData.message || `Scraper API failed with status ${scrapeResponse.status}`);
      }

      const results = await scrapeResponse.json();
      console.log(`Scheduled scrape finished.`, results.data?.length);
      return NextResponse.json({ success: true, message: `Scraping complete. Found ${results.data?.length} items.` });
    } catch (error) {
      console.error('Error during scheduled scrape trigger:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}
