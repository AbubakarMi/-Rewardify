"use client";

import { useToast } from "@/hooks/use-toast";
import { users } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function IssueRewardForm() {
    const { toast } = useToast();
    const employeeList = users.filter(u => u.role === 'employee');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Reward Issued!",
            description: "The reward has been successfully issued to the employee."
        });
    }

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Issue a New Reward</CardTitle>
                <CardDescription>Select an employee and the reward details.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="employee">Employee</Label>
                        <Select>
                            <SelectTrigger id="employee">
                                <SelectValue placeholder="Select an employee" />
                            </SelectTrigger>
                            <SelectContent>
                                {employeeList.map(emp => (
                                    <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="reward-type">Reward Type</Label>
                        <Select>
                            <SelectTrigger id="reward-type">
                                <SelectValue placeholder="Select reward type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="points">Points</SelectItem>
                                <SelectItem value="badge">Badge</SelectItem>
                                <SelectItem value="gift-card">Gift Card</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="value">Value / Name</Label>
                        <Input id="value" placeholder="e.g., 100 or 'Innovator Badge'" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Reason / Description</Label>
                        <Textarea id="description" placeholder="For excellent work on..." />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Issue Reward</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
