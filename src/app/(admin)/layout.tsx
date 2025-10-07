import type { ReactNode } from "react";
import { AppLayout } from "@/components/AppLayout";
import { currentUser } from "@/lib/data";
import type { User } from "@/lib/types";
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

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AppLayout
      user={currentUser as User}
      navItems={adminNavItems}
      secondaryNavItems={adminSecondaryNavItems}
    >
      {children}
    </AppLayout>
  );
}
