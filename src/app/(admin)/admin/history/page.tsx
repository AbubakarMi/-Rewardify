'use client';
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Reward, User } from "@/lib/types";
import { format } from "date-fns";
import { Award, Gift, Star } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { FirebaseClientProvider, useCollection } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

import {
  LayoutDashboard,
  Users as UsersIcon,
  Award as AwardIcon,
  Trophy,
  History as HistoryIcon,
  Settings,
} from "lucide-react";

const adminNavItems = [
  { href: "/admin/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { href: "/admin/employees", icon: <UsersIcon />, label: "Employees" },
  { href: "/admin/rewards", icon: <AwardIcon />, label: "Issue Rewards" },
  { href: "/admin/leaderboard", icon: <Trophy />, label: "Leaderboard" },
  { href: "/admin/history", icon: <HistoryIcon />, label: "History" },
];

const adminSecondaryNavItems = [
  { href: "#", icon: <Settings />, label: "Settings" },
];


const iconMap = {
    points: <Star className="h-5 w-5 text-accent" />,
    badge: <Award className="h-5 w-5 text-primary" />,
    'gift-card': <Gift className="h-5 w-5 text-green-500" />,
};
  
function AdminRewardItem({ reward, user }: { reward: Reward, user: User | undefined }) {
    if (!user) return null;

    return (
      <div className="flex items-start gap-4 p-4 transition-colors hover:bg-secondary/50 sm:items-center">
          <Avatar className="hidden h-10 w-10 sm:flex">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 gap-1">
              <p className="text-sm">
                  <span className="font-semibold">{user.name}</span> received <span className="font-semibold text-primary">{reward.type === 'points' ? `${reward.value} Points` : `the "${reward.value}" badge`}</span>
              </p>
              <p className="text-sm text-muted-foreground">{reward.description}</p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
              {format(new Date(reward.date), "MMM d, yyyy")}
          </div>
      </div>
    );
}

function RewardHistoryContent() {
    const { data: rewards, loading: rewardsLoading } = useCollection<Reward>("rewards");
    const { data: users, loading: usersLoading } = useCollection<User>("users");

    const sortedRewards = rewards ? [...rewards].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];
    
    return (
      <AppLayout
        navItems={adminNavItems}
        secondaryNavItems={adminSecondaryNavItems}
      >
        <div className="space-y-6">
            <div>
                <h2 className="font-headline text-3xl font-bold tracking-tight">Reward History</h2>
                <p className="text-muted-foreground">A complete log of all rewards issued.</p>
            </div>
            <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-border">
                        {(rewardsLoading || usersLoading) && (
                          <div className="p-4 space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                          </div>
                        )}
                        {!rewardsLoading && !usersLoading && sortedRewards.map((reward) => {
                          const user = users?.find(u => u.id === reward.userId);
                          return <AdminRewardItem key={reward.id} reward={reward} user={user} />
                        })}
                         {!rewardsLoading && sortedRewards.length === 0 && (
                            <p className="p-6 text-center text-muted-foreground">No reward history found.</p>
                         )}
                    </div>
                </CardContent>
            </Card>
        </div>
      </AppLayout>
    )
}

export default function RewardHistoryPage() {
    return (
        <FirebaseClientProvider>
            <RewardHistoryContent />
        </FirebaseClientProvider>
    )
}
