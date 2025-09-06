'use server';

/**
 * @fileOverview Flow to get a hotel destination ID from a city name using LiteAPI.
 *
 * - getHotelDestinationId - A function that takes a city name and returns its destination ID.
 * - GetHotelDestinationIdInput - The input type for the function.
 * - GetHotelDestinationIdOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import axios from 'axios';
import type { LiteAPIDestination } from '@/lib/types';

const GetHotelDestinationIdInputSchema = z.object({
  cityName: z.string().describe('The name of the city to search for.'),
});
export type GetHotelDestinationIdInput = z.infer<typeof GetHotelDestinationIdInputSchema>;

const GetHotelDestinationIdOutputSchema = z.object({
  destinationId: z.string().optional().describe('The destination ID for the given city.'),
});
export type GetHotelDestinationIdOutput = z.infer<typeof GetHotelDestinationIdOutputSchema>;


async function getDestinationId(city: string): Promise<string | null> {
    const apiKey = process.env.LITEAPI_API_KEY;
    if (!apiKey) {
      throw new Error('LiteAPI key is not configured.');
    }
  
    const options = {
      method: 'GET',
      url: 'https://book-sandbox.liteapi.travel/v2/locations/search',
      params: { query: city },
      headers: {
        'X-API-KEY': apiKey,
      }
    };
  
    try {
      const response = await axios.request<{data: LiteAPIDestination[]}>(options);
      // Find the first location of type 'city' and return its id
      const cityLocation = response.data.data.find(loc => loc.type === 'city');
      return cityLocation?.id || null;
    } catch (error) {
      console.error('Failed to get destination ID from LiteAPI', error);
      return null;
    }
}


export const getHotelDestinationIdFlow = ai.defineFlow(
  {
    name: 'getHotelDestinationIdFlow',
    inputSchema: GetHotelDestinationIdInputSchema,
    outputSchema: GetHotelDestinationIdOutputSchema,
  },
  async ({ cityName }) => {
    const destinationId = await getDestinationId(cityName);
    return { destinationId };
  }
);

export async function getHotelDestinationId(input: GetHotelDestinationIdInput): Promise<GetHotelDestinationIdOutput> {
    return getHotelDestinationIdFlow(input);
}
