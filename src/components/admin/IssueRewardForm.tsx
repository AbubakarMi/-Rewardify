"use client";

import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCollection } from "@/firebase";
import type { User } from "@/lib/types";
import { useState } from "react";
import { doc, runTransaction, serverTimestamp, collection, addDoc } from "firebase/firestore";
import { useFirestore } from "@/firebase";

export function IssueRewardForm() {
    const { toast } = useToast();
    const { data: users, loading } = useCollection<User>('users');
    const employeeList = users?.filter(u => u.role === 'employee');
    const firestore = useFirestore();

    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [rewardType, setRewardType] = useState('');
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedEmployee || !rewardType || !value || !description) {
            toast({ variant: "destructive", title: "Missing fields", description: "Please fill out all fields to issue a reward." });
            return;
        }

        setIsSubmitting(true);
        
        try {
            const rewardData = {
                userId: selectedEmployee,
                type: rewardType,
                value: rewardType === 'points' ? parseInt(value, 10) : value,
                description: description,
                date: new Date().toISOString(),
            };

            // Add reward to the rewards collection
            await addDoc(collection(firestore, "rewards"), rewardData);

            // If points were awarded, update the user's total points
            if (rewardType === 'points') {
                const userRef = doc(firestore, "users", selectedEmployee);
                await runTransaction(firestore, async (transaction) => {
                    const userDoc = await transaction.get(userRef);
                    if (!userDoc.exists()) {
                        throw "User document does not exist!";
                    }
                    const newPoints = (userDoc.data().points || 0) + parseInt(value, 10);
                    transaction.update(userRef, { points: newPoints });
                });
            }

            toast({
                title: "Reward Issued!",
                description: `The reward has been successfully issued to the employee.`
            });

            // Reset form
            setSelectedEmployee('');
            setRewardType('');
            setValue('');
            setDescription('');

        } catch (error) {
            console.error("Error issuing reward:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Could not issue the reward. Please try again."
            });
        } finally {
            setIsSubmitting(false);
        }
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
                        <Select onValueChange={setSelectedEmployee} value={selectedEmployee} disabled={loading}>
                            <SelectTrigger id="employee">
                                <SelectValue placeholder="Select an employee" />
                            </SelectTrigger>
                            <SelectContent>
                                {employeeList?.map(emp => (
                                    <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="reward-type">Reward Type</Label>
                        <Select onValueChange={setRewardType} value={rewardType}>
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
                        <Input 
                          id="value" 
                          placeholder={rewardType === 'points' ? "e.g., 100" : "e.g., 'Innovator Badge'"}
                          type={rewardType === 'points' ? 'number' : 'text'}
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Reason / Description</Label>
                        <Textarea 
                          id="description" 
                          placeholder="For excellent work on..." 
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Issuing...' : 'Issue Reward'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
