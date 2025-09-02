'use server';

/**
 * @fileOverview AI-powered destination guide generator.
 *
 * - generateDestinationGuide - A function that generates a travel guide for a given destination.
 * - DestinationGuideInput - The input type for the generateDestinationGuide function.
 * - DestinationGuideOutput - The return type for the generateDestinationGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DestinationGuideInputSchema = z.object({
  destination: z.string().describe('The destination to generate a travel guide for.'),
});
export type DestinationGuideInput = z.infer<typeof DestinationGuideInputSchema>;

const DestinationGuideOutputSchema = z.object({
  summary: z.string().describe('A summary of the destination, including travel tips and popular attractions.'),
});
export type DestinationGuideOutput = z.infer<typeof DestinationGuideOutputSchema>;

export async function generateDestinationGuide(input: DestinationGuideInput): Promise<DestinationGuideOutput> {
  return destinationGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'destinationGuidePrompt',
  input: {schema: DestinationGuideInputSchema},
  output: {schema: DestinationGuideOutputSchema},
  prompt: `You are a travel expert. Generate a travel guide for the following destination, including travel tips and popular attractions.\n\nDestination: {{{destination}}}`,
});

const destinationGuideFlow = ai.defineFlow(
  {
    name: 'destinationGuideFlow',
    inputSchema: DestinationGuideInputSchema,
    outputSchema: DestinationGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
