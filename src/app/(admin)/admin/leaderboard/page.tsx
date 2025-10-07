'use client';
import { Card, CardContent } from "@/components/ui/card";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { AppLayout } from "@/components/AppLayout";
import { useUser } from "@/firebase";
import {
  LayoutDashboard,
  Users,
  Award,
  Trophy,
  History,
  Settings,
} from "lucide-react";

const adminNavItems = [
  { href: "/admin/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { href: "/admin/employees", icon: <Users />, label: "Employees" },
  { href: "/admin/rewards", icon: <Award />, label: "Issue Rewards" },
  { href: "/admin/leaderboard", icon: <Trophy />, label: "Leaderboard" },
  { href: "/admin/history", icon: <History />, label: "History" },
];

const adminSecondaryNavItems = [
  { href: "#", icon: <Settings />, label: "Settings" },
];

export default function LeaderboardPage() {
  const { user } = useUser();
  return (
    <AppLayout
      navItems={adminNavItems}
      secondaryNavItems={adminSecondaryNavItems}
    >
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
    </AppLayout>
  );
}
