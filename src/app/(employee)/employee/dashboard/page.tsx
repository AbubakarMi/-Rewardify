import React from "react";
import { StatCard } from "@/components/StatCard";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { currentEmployee, rewards as allRewards, leaderboard } from "@/lib/data";
import { Star, Trophy } from "lucide-react";
import { RewardItem } from "@/components/RewardItem";
import { Separator } from "@/components/ui/separator";

export default function EmployeeDashboardPage() {
    const userRewards = allRewards
        .filter(r => r.userId === currentEmployee.id)
        .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const userRank = leaderboard.find(e => e.userId === currentEmployee.id)?.rank;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-headline text-3xl font-bold tracking-tight">Welcome, {currentEmployee.name.split(' ')[0]}!</h2>
                <p className="text-muted-foreground">Here's a summary of your achievements.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <StatCard 
                    title="Your Points"
                    value={currentEmployee.points.toLocaleString()}
                    icon={<Star className="h-5 w-5 text-muted-foreground" />}
                    description="Keep up the great work!"
                />
                <StatCard 
                    title="Leaderboard Rank"
                    value={userRank ? `#${userRank}` : "N/A"}
                    icon={<Trophy className="h-5 w-5 text-muted-foreground" />}
                    description={`out of ${leaderboard.length} employees`}
                />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Rewards</CardTitle>
                    <CardDescription>All the recognition you've received.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-border">
                        {userRewards.length > 0 ? (
                          userRewards.map((reward) => (
                              <RewardItem key={reward.id} reward={reward} />
                          ))
                        ) : (
                          <p className="p-6 text-sm text-muted-foreground">You haven't received any rewards yet.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
