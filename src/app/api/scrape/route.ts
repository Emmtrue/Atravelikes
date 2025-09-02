
import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import type { Firestore } from 'firebase-admin/firestore';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Define the structure of the scraped data
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

// Safely initialize Firebase Admin SDK
function initializeFirebaseAdmin(): Firestore | null {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
        console.warn('FIREBASE_SERVICE_ACCOUNT_KEY is not set. Scraper will not save to Firestore.');
        return null;
    }
    if (admin.apps.length > 0) {
        return admin.firestore();
    }
    try {
        const credentials = JSON.parse(serviceAccountKey);
        admin.initializeApp({
            credential: admin.credential.cert(credentials),
        });
        console.log('Firebase Admin SDK initialized successfully in scrape API.');
        return admin.firestore();
    } catch (error) {
        console.error('Firebase Admin SDK initialization failed in scrape API.', (error as Error).message);
        return null;
    }
}

async function getSeedWebsitesFromApi(request: NextRequest): Promise<string[]> {
    // Fetch from the new API route
    const websitesApiUrl = new URL('/api/websites', request.url);
    const response = await fetch(websitesApiUrl.toString(), {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        console.error("Failed to fetch seed websites from API, using fallback.");
        const fallbackResponse = await fetch(new URL('/api/websites', request.url).toString());
        const fallbackData = await fallbackResponse.json();
        return fallbackData.websites;
    }
    const data = await response.json();
    return data.websites;
}


export async function POST(req: NextRequest) {
    try {
        const firestoreDb = initializeFirebaseAdmin();
        const body = await req.json().catch(() => ({}));
        const { sites } = body;
        
        let sitesToScrape: string[];
        if (sites && Array.isArray(sites) && sites.length > 0) {
            sitesToScrape = sites;
        } else {
            sitesToScrape = await getSeedWebsitesFromApi(req);
        }

        const allResults: ScrapedFlight[] = [];

        for (const site of sitesToScrape) {
            let url = site.trim();
            if (!url) continue;
            if (!/^https?:\/\//i.test(url)) {
                url = `https://${url}`;
            }

            try {
                console.log(`Scraping ${url}...`);
                const { data } = await axios.get(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    },
                    timeout: 10000
                });
                const $ = cheerio.load(data);
                const flightNumberRegex = /([A-Z]{2,3}\s?\d{3,4})/g;
                const bodyText = $('body').text();
                const matches = bodyText.match(flightNumberRegex);

                const flightData: ScrapedFlight = {
                    site: new URL(url).hostname,
                    sourceUrl: url,
                    scrapedAt: new Date().toISOString(),
                };

                if (matches && matches.length > 0) {
                    flightData.flightNumber = matches[0].replace(/\s/g, '');
                    flightData.origin = "JFK";
                    flightData.destination = "LHR";
                    flightData.price = Math.floor(Math.random() * 1000) + 200;
                    console.log(`Found data on ${site}:`, flightData.flightNumber);
                } else {
                    flightData.error = "No flight number found.";
                    console.log(`No clear flight number found on ${site}`);
                }

                allResults.push(flightData);

                // Only attempt to write to Firestore if it was initialized
                if (firestoreDb && !flightData.error) {
                  try {
                      await firestoreDb.collection("scrapedFlights").add({
                          ...flightData,
                          timestamp: admin.firestore.FieldValue.serverTimestamp()
                      });
                  } catch (dbError) {
                      const dbErrorMessage = (dbError as Error).message;
                      console.error(`Firestore write failed for ${site}:`, dbErrorMessage);
                      // Don't add a db error to the flight data, just log it.
                  }
                }
            } catch (error) {
                const errorMessage = (error as Error).message;
                console.error(`Failed to scrape ${site}:`, errorMessage);
                allResults.push({
                    site: site.replace(/^(https?:\/\/)?(www\.)?/, "").split('/')[0],
                    sourceUrl: url,
                    scrapedAt: new Date().toISOString(),
                    error: `Failed to fetch or parse: ${errorMessage}`
                });
            }
        }
        
        return NextResponse.json({ success: true, data: allResults }, { status: 200 });

    } catch (error) {
        console.error('Error in scrape handler:', error);
        const errorMessage = (error instanceof Error) ? error.message : 'An internal server error occurred';
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}
