import { IssueRewardForm } from "@/components/admin/IssueRewardForm";
import { RewardSuggestions } from "@/components/admin/RewardSuggestions";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

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

export default function IssueRewardPage() {
    return (
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
    )
}
