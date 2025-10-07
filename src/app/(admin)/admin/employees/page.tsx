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
import { users } from "@/lib/data";
import { EmployeeActions } from "@/components/admin/EmployeeActions";
import { AddEmployeeDialog } from "@/components/admin/AddEmployeeDialog";

export default function EmployeesPage() {
    const employeeList = users.filter(u => u.role === 'employee');
    return (
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
            {employeeList.map((user) => (
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
            </TableBody>
        </Table>
        </CardContent>
      </Card>
    </div>
  );
}
