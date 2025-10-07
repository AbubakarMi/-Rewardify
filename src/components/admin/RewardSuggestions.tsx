'use server';
import { generateRewardSuggestions } from "@/ai/flows/generate-reward-suggestions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lightbulb, Sparkles } from "lucide-react";

export async function RewardSuggestions() {
  const mockPerformanceData = "Completed the Q2 project ahead of schedule and mentored a junior developer.";
  const mockCompanyValues = "Teamwork, Innovation, Excellence.";

  const { rewardSuggestions } = await generateRewardSuggestions({
    employeePerformanceData: mockPerformanceData,
    companyValues: mockCompanyValues,
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <Sparkles className="text-accent" />
          AI Reward Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Based on performance and company values, consider these rewards:</p>
        <ul className="space-y-2">
          {rewardSuggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-3 rounded-lg border bg-secondary/50 p-3 text-sm">
              <Lightbulb className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
