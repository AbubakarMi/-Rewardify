'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { useCollection } from "@/firebase";
import type { User, LeaderboardEntry } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

function LeaderboardRowSkeleton() {
  return (
     <TableRow>
      <TableCell><Skeleton className="h-5 w-12" /></TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </div>
      </TableCell>
      <TableCell className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
    </TableRow>
  )
}


export function LeaderboardTable() {
  const { data: users, loading } = useCollection<User>('users');

  const leaderboard: LeaderboardEntry[] = users
    ? users
      .filter(u => u.role === 'employee')
      .sort((a, b) => b.points - a.points)
      .map((user, index) => ({
        rank: index + 1,
        userId: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        points: user.points,
      }))
    : [];

  const getTrophyColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-slate-400";
    if (rank === 3) return "text-orange-400";
    return "text-muted-foreground";
  }
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Rank</TableHead>
          <TableHead>Employee</TableHead>
          <TableHead className="text-right">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && [...Array(5)].map((_, i) => <LeaderboardRowSkeleton key={i} />)}
        {!loading && leaderboard.map((entry) => (
          <TableRow key={entry.userId} className={entry.rank <= 3 ? "bg-secondary/50" : ""}>
            <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    <Trophy className={`h-5 w-5 ${getTrophyColor(entry.rank)}`} />
                    <span>{entry.rank}</span>
                </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={entry.avatarUrl} alt={entry.name} />
                  <AvatarFallback>{getInitials(entry.name)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{entry.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-right font-semibold">{entry.points.toLocaleString()}</TableCell>
          </TableRow>
        ))}
         {!loading && leaderboard.length === 0 && (
          <TableRow>
            <TableCell colSpan={3} className="text-center h-24">
              No employees on the leaderboard yet.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
