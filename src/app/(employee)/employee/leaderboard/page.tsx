import { Card, CardContent } from "@/components/ui/card";
import { LeaderboardTable } from "@/components/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-headline text-3xl font-bold tracking-tight">Leaderboard</h2>
        <p className="text-muted-foreground">See how you stack up against your peers.</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <LeaderboardTable />
        </CardContent>
      </Card>
    </div>
  );
}
