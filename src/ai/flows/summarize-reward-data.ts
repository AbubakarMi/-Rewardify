'use server';
/**
 * @fileOverview Summarizes reward history and leaderboard analytics for admins.
 *
 * - summarizeRewardData - A function that generates a summary of reward data.
 * - SummarizeRewardDataInput - The input type for the summarizeRewardData function (currently empty).
 * - SummarizeRewardDataOutput - The return type for the summarizeRewardData function, containing the summary.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRewardDataInputSchema = z.object({});
export type SummarizeRewardDataInput = z.infer<typeof SummarizeRewardDataInputSchema>;

const SummarizeRewardDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the reward history and leaderboard analytics.'),
});
export type SummarizeRewardDataOutput = z.infer<typeof SummarizeRewardDataOutputSchema>;

export async function summarizeRewardData(input: SummarizeRewardDataInput): Promise<SummarizeRewardDataOutput> {
  return summarizeRewardDataFlow(input);
}

const summarizeRewardDataPrompt = ai.definePrompt({
  name: 'summarizeRewardDataPrompt',
  input: {schema: SummarizeRewardDataInputSchema},
  output: {schema: SummarizeRewardDataOutputSchema},
  prompt: `You are an expert in analyzing reward program data. Generate a concise summary of the reward history and leaderboard analytics to help admins understand trends and make data-driven decisions. Focus on key metrics and insights.
`,
});

const summarizeRewardDataFlow = ai.defineFlow(
  {
    name: 'summarizeRewardDataFlow',
    inputSchema: SummarizeRewardDataInputSchema,
    outputSchema: SummarizeRewardDataOutputSchema,
  },
  async input => {
    const {output} = await summarizeRewardDataPrompt(input);
    return output!;
  }
);
