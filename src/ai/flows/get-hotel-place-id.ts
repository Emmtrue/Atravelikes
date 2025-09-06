
'use server';

/**
 * @fileOverview Flow to get a hotel place ID from a city name using LiteAPI v3.
 *
 * - getPlaceId - A function that takes a city name and returns its place ID.
 * - GetPlaceIdInput - The input type for the function.
 * - GetPlaceIdOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import axios from 'axios';
import type { LiteAPIPlace } from '@/lib/types';

const GetPlaceIdInputSchema = z.object({
  cityName: z.string().describe('The name of the city to search for.'),
});
export type GetPlaceIdInput = z.infer<typeof GetPlaceIdInputSchema>;

const GetPlaceIdOutputSchema = z.object({
  placeId: z.string().optional().describe('The place ID for the given city.'),
});
export type GetPlaceIdOutput = z.infer<typeof GetPlaceIdOutputSchema>;


async function fetchPlaceId(city: string): Promise<string | null> {
    const apiKey = process.env.LITEAPI_API_KEY;
    if (!apiKey) {
      throw new Error('LiteAPI key is not configured.');
    }
  
    const options = {
      method: 'GET',
      url: 'https://api.liteapi.travel/v3.0/data/places',
      params: { textQuery: city },
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const response = await axios.request<{data: LiteAPIPlace[]}>(options);
      if (!response.data || !response.data.data || response.data.data.length === 0) {
        return null;
      }
      
      // Prioritize finding an exact match for 'city' type.
      const cityLocation = response.data.data.find(loc => loc.types.includes('city'));
      if (cityLocation) {
        return cityLocation.placeId;
      }

      // If no exact 'city' type is found, fall back to the first result.
      // This handles cases where the API returns a valid location (e.g., region) without the 'city' type.
      return response.data.data[0].placeId;

    } catch (error) {
      console.error('Failed to get place ID from LiteAPI', error);
      return null;
    }
}


export const getPlaceIdFlow = ai.defineFlow(
  {
    name: 'getPlaceIdFlow',
    inputSchema: GetPlaceIdInputSchema,
    outputSchema: GetPlaceIdOutputSchema,
  },
  async ({ cityName }) => {
    const placeId = await fetchPlaceId(cityName);
    return { placeId };
  }
);

export async function getPlaceId(input: GetPlaceIdInput): Promise<GetPlaceIdOutput> {
    return getPlaceIdFlow(input);
}
