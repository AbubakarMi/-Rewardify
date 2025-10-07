'use client';
import React from "react";
import { StatCard } from "@/components/StatCard";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Star, Trophy, Gift, Settings, LayoutDashboard } from "lucide-react";
import { RewardItem } from "@/components/RewardItem";
import { AppLayout } from "@/components/AppLayout";
import type { User, Reward, LeaderboardEntry } from "@/lib/types";
import { useUser, useDoc, useCollection, FirebaseClientProvider } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

const employeeNavItems = [
  { href: "/employee/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { href: "/employee/leaderboard", icon: <Trophy />, label: "Leaderboard" },
  { href: "/employee/redeem", icon: <Gift />, label: "Redeem Rewards" },
];

const employeeSecondaryNavItems = [
    { href: "#", icon: <Settings />, label: "Settings" },
];

function EmployeeDashboardContent() {
    const { user, loading: userLoading } = useUser();
    const { data: employee, loading: employeeLoading } = useDoc<User>(user ? `users/${user.uid}` : '');
    const { data: allRewards, loading: rewardsLoading } = useCollection<Reward>('rewards', 'userId', user?.uid);
    const { data: users, loading: usersLoading } = useCollection<User>('users');

    const leaderboard: LeaderboardEntry[] = users
      ? users
        .filter(u => u.role === 'employee')
        .sort((a, b) => b.points - a.points)
        .map((u, index) => ({
          rank: index + 1,
          userId: u.id,
          name: u.name,
          avatarUrl: u.avatarUrl,
          points: u.points,
        }))
      : [];

    const loading = userLoading || employeeLoading || rewardsLoading || usersLoading;

    if (loading || !employee) {
        return (
             <AppLayout
                navItems={employeeNavItems}
                secondaryNavItems={employeeSecondaryNavItems}
            >
                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-9 w-64" />
                    <Skeleton className="mt-2 h-5 w-80" />
                  </div>
                   <div className="grid gap-4 md:grid-cols-2">
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-32 w-full" />
                   </div>
                   <Skeleton className="h-64 w-full" />
                </div>
             </AppLayout>
        )
    }

    const userRewards = allRewards?.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()) ?? [];
    const userRank = leaderboard.find(e => e.userId === employee.id)?.rank;
    const displayName = employee.name.split(' ')[0];

    return (
      <AppLayout
        navItems={employeeNavItems}
        secondaryNavItems={employeeSecondaryNavItems}
      >
        <div className="space-y-6">
            <div>
                <h2 className="font-headline text-3xl font-bold tracking-tight">Welcome, {displayName}!</h2>
                <p className="text-muted-foreground">Here's a summary of your achievements.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <StatCard 
                    title="Your Points"
                    value={employee.points.toLocaleString()}
                    icon={<Star className="h-5 w-5 text-muted-foreground" />}
                    description="Keep up the great work!"
                />
                <StatCard 
                    title="Leaderboard Rank"
                    value={userRank ? `#${userRank}` : "N/A"}
                    icon={<Trophy className="h-5 w-5 text-muted-foreground" />}
                    description={leaderboard.length > 0 ? `out of ${leaderboard.length} employees` : ""}
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
                          <p className="p-6 text-sm text-center text-muted-foreground">You haven't received any rewards yet.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
      </AppLayout>
    )
}

export default function EmployeeDashboardPage() {
    return (
        <FirebaseClientProvider>
            <EmployeeDashboardContent />
        </FirebaseClientProvider>
    )
}
