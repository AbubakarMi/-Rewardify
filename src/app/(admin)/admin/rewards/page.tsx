'use client';
import { IssueRewardForm } from "@/components/admin/IssueRewardForm";
import { RewardSuggestions } from "@/components/admin/RewardSuggestions";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { AppLayout } from "@/components/AppLayout";
import { FirebaseClientProvider } from "@/firebase";
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

function SuggestionsSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <div className="space-y-2">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </div>
        </div>
    )
}

function IssueRewardContent() {
    return (
      <AppLayout
        navItems={adminNavItems}
        secondaryNavItems={adminSecondaryNavItems}
      >
        <div className="space-y-6">
            <div>
                <h2 className="font-headline text-3xl font-bold tracking-tight">Issue Rewards</h2>
                <p className="text-muted-foreground">Recognize your employees' hard work.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <IssueRewardForm />
                </div>
                <div className="lg:col-span-2">
                    <Suspense fallback={<SuggestionsSkeleton/>}>
                        <RewardSuggestions />
                    </Suspense>
                </div>
            </div>
        </div>
      </AppLayout>
    )
}

export default function IssueRewardPage() {
    return (
        <FirebaseClientProvider>
            <IssueRewardContent />
        </FirebaseClientProvider>
    )
}
