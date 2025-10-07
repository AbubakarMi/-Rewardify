'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating reward suggestions based on employee performance data and company values.
 *
 * - generateRewardSuggestions - A function that takes employee performance data and company values as input and returns reward suggestions.
 * - GenerateRewardSuggestionsInput - The input type for the generateRewardSuggestions function.
 * - GenerateRewardSuggestionsOutput - The output type for the generateRewardSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRewardSuggestionsInputSchema = z.object({
  employeePerformanceData: z
    .string()
    .describe("Employee's performance data, including achievements, contributions, and areas for improvement."),
  companyValues: z
    .string()
    .describe('Company values and principles that should be considered when generating reward suggestions.'),
});

export type GenerateRewardSuggestionsInput = z.infer<typeof GenerateRewardSuggestionsInputSchema>;

const GenerateRewardSuggestionsOutputSchema = z.object({
  rewardSuggestions: z
    .array(z.string())
    .describe('An array of suggested rewards (points, badges, or gift cards) tailored to the employee performance and company values.'),
});

export type GenerateRewardSuggestionsOutput = z.infer<typeof GenerateRewardSuggestionsOutputSchema>;

export async function generateRewardSuggestions(
  input: GenerateRewardSuggestionsInput
): Promise<GenerateRewardSuggestionsOutput> {
  return generateRewardSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRewardSuggestionsPrompt',
  input: {schema: GenerateRewardSuggestionsInputSchema},
  output: {schema: GenerateRewardSuggestionsOutputSchema},
  prompt: `You are an HR assistant tasked with suggesting appropriate rewards for employees based on their performance data and the company's values.

  Consider the following employee performance data:
  {{employeePerformanceData}}

  Take into account these company values:
  {{companyValues}}

  Suggest a list of rewards that align with both the performance data and company values. Be creative and provide specific reward ideas, including points, badges, or gift cards. Focus on micro-rewards, and keep it short.
  Format your response as a JSON array of strings.
  `,
});

const generateRewardSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateRewardSuggestionsFlow',
    inputSchema: GenerateRewardSuggestionsInputSchema,
    outputSchema: GenerateRewardSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
