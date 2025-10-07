'use client';
import { Card, CardContent } from "@/components/ui/card";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { AppLayout } from "@/components/AppLayout";
import { FirebaseClientProvider } from "@/firebase";
import {
  LayoutDashboard,
  Trophy,
  Gift,
  Settings,
} from "lucide-react";

const employeeNavItems = [
  { href: "/employee/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { href: "/employee/leaderboard", icon: <Trophy />, label: "Leaderboard" },
  { href: "/employee/redeem", icon: <Gift />, label: "Redeem Rewards" },
];

const employeeSecondaryNavItems = [
    { href: "#", icon: <Settings />, label: "Settings" },
];

function LeaderboardContent() {
  return (
    <AppLayout
      navItems={employeeNavItems}
      secondaryNavItems={employeeSecondaryNavItems}
    >
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
    </AppLayout>
  );
}


export default function LeaderboardPage() {
    return (
        <FirebaseClientProvider>
            <LeaderboardContent />
        </FirebaseClientProvider>
    )
}
