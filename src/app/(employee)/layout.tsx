import type { ReactNode } from "react";
import { AppLayout } from "@/components/AppLayout";
import { currentEmployee } from "@/lib/data";
import type { User } from "@/lib/types";
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

export default function EmployeeLayout({ children }: { children: ReactNode }) {
  return (
    <AppLayout
      user={currentEmployee as User}
      navItems={employeeNavItems}
      secondaryNavItems={employeeSecondaryNavItems}
    >
      {children}
    </AppLayout>
  );
}
