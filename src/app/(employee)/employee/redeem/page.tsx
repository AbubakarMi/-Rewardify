'use client';
import { GiftCardItem } from "@/components/GiftCardItem";
import { AppLayout } from "@/components/AppLayout";
import type { User, GiftCard } from "@/lib/types";
import { useUser, useDoc, useCollection, FirebaseClientProvider } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
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

function RedeemContent() {
  const { user, loading: userLoading } = useUser();
  const { data: employee, loading: employeeLoading } = useDoc<User>(user ? `users/${user.uid}` : '');
  const { data: giftCards, loading: giftCardsLoading } = useCollection<GiftCard>('gift-cards');

  const loading = userLoading || employeeLoading || giftCardsLoading;

  if (loading || !employee) {
    return (
        <AppLayout
            navItems={employeeNavItems}
            secondaryNavItems={employeeSecondaryNavItems}
        >
          <div className="space-y-6">
            <div>
              <h2 className="font-headline text-3xl font-bold tracking-tight">Redeem Rewards</h2>
              <p className="text-muted-foreground">Use your points to claim exciting gift cards.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </div>
        </AppLayout>
    )
  }

  return (
    <AppLayout
      navItems={employeeNavItems}
      secondaryNavItems={employeeSecondaryNavItems}
    >
      <div className="space-y-6">
        <div>
          <h2 className="font-headline text-3xl font-bold tracking-tight">Redeem Rewards</h2>
          <p className="text-muted-foreground">Use your points to claim exciting gift cards.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {giftCards && giftCards.map((gc) => (
            <GiftCardItem key={gc.id} giftCard={gc} userPoints={employee.points} />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export default function RedeemPage() {
    return (
        <FirebaseClientProvider>
            <RedeemContent />
        </FirebaseClientProvider>
    )
}
