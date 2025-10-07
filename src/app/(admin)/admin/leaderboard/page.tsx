import { Card, CardContent } from "@/components/ui/card";
import { LeaderboardTable } from "@/components/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-headline text-3xl font-bold tracking-tight">Leaderboard</h2>
        <p className="text-muted-foreground">See who's at the top of their game.</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <LeaderboardTable />
        </CardContent>
      </Card>
    </div>
  );
}
