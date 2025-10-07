'use client';
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EmployeeActions } from "@/components/admin/EmployeeActions";
import { AddEmployeeDialog } from "@/components/admin/AddEmployeeDialog";
import { AppLayout } from "@/components/AppLayout";
import { currentUser } from "@/lib/data";
import type { User } from "@/lib/types";
import {
  LayoutDashboard,
  Users as UsersIcon,
  Award as AwardIcon,
  Trophy,
  History,
  Settings,
} from "lucide-react";
import { useCollection } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

const adminNavItems = [
  { href: "/admin/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { href: "/admin/employees", icon: <UsersIcon />, label: "Employees" },
  { href: "/admin/rewards", icon: <AwardIcon />, label: "Issue Rewards" },
  { href: "/admin/leaderboard", icon: <Trophy />, label: "Leaderboard" },
  { href: "/admin/history", icon: <History />, label: "History" },
];

const adminSecondaryNavItems = [
  { href: "#", icon: <Settings />, label: "Settings" },
];

function EmployeeRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-48" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-12" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-8 w-8" />
      </TableCell>
    </TableRow>
  );
}

export default function EmployeesPage() {
    const { data: users, loading } = useCollection<User>('users');
    const employeeList = users?.filter(u => u.role === 'employee');
    
    return (
    <AppLayout
      user={currentUser as User}
      navItems={adminNavItems}
      secondaryNavItems={adminSecondaryNavItems}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
              <h2 className="font-headline text-3xl font-bold tracking-tight">Employees</h2>
              <p className="text-muted-foreground">Manage your team members.</p>
          </div>
          <AddEmployeeDialog />
        </div>
        <Card>
          <CardContent className="p-0">
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                      <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
              {loading && (
                <>
                  <EmployeeRowSkeleton />
                  <EmployeeRowSkeleton />
                  <EmployeeRowSkeleton />
                </>
              )}
              {!loading && employeeList && employeeList.length > 0 && employeeList.map((user) => (
                  <TableRow key={user.id}>
                      <TableCell>
                          <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{user.name}</span>
                          </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell className="text-right">{user.points.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                          <EmployeeActions employee={user} />
                      </TableCell>
                  </TableRow>
              ))}
              {!loading && (!employeeList || employeeList.length === 0) && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No employees found.
                  </TableCell>
                </TableRow>
              )}
              </TableBody>
          </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
