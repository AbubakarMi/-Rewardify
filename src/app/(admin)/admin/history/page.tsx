'use client';
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { rewards as allRewards, users } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Reward } from "@/lib/types";
import { format } from "date-fns";
import { Award, Gift, Star } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { currentUser } from "@/lib/data";
import type { User } from "@/lib/types";
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
  
function AdminRewardItem({ reward }: { reward: Reward }) {
    const user = users.find(u => u.id === reward.userId);
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

export default function RewardHistoryPage() {
    const sortedRewards = [...allRewards].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
      <AppLayout
        user={currentUser as User}
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
                        {sortedRewards.map((reward) => (
                            <AdminRewardItem key={reward.id} reward={reward} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </AppLayout>
    )
}
