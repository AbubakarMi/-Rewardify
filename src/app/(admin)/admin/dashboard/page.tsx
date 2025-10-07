import { StatCard } from "@/components/StatCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { users, rewards } from "@/lib/data";
import { Users, Award, Activity, Lightbulb } from "lucide-react";
import { summarizeRewardData } from "@/ai/flows/summarize-reward-data";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function AISummary() {
    const { summary } = await summarizeRewardData({});
    return (
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-xl">
              <Lightbulb className="text-accent" /> AI-Powered Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </CardContent>
        </Card>
    );
};

function AISummarySkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <Lightbulb className="text-accent" /> AI-Powered Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  )
}

export default function AdminDashboardPage() {
  const totalEmployees = users.filter(u => u.role === 'employee').length;
  const rewardsIssued = rewards.length;
  const totalPoints = rewards.filter(r => r.type === 'points').reduce((sum, r) => sum + (r.value as number), 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-headline text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">An overview of your rewards program.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Employees" value={totalEmployees.toString()} icon={<Users className="h-5 w-5 text-muted-foreground" />} />
        <StatCard title="Rewards Issued (All Time)" value={rewardsIssued.toString()} icon={<Award className="h-5 w-5 text-muted-foreground" />} />
        <StatCard title="Total Points Awarded" value={totalPoints.toLocaleString()} icon={<Activity className="h-5 w-5 text-muted-foreground" />} />
      </div>
      <div>
        <Suspense fallback={<AISummarySkeleton />}>
          <AISummary />
        </Suspense>
      </div>
    </div>
  )
}
