import { Card } from "@/components/ui/card";
import { Award, Gift, Star } from "lucide-react";
import type { Reward } from "@/lib/types";
import { format } from "date-fns";

const iconMap = {
  points: <Star className="h-5 w-5 text-accent" />,
  badge: <Award className="h-5 w-5 text-primary" />,
  'gift-card': <Gift className="h-5 w-5 text-green-500" />,
};

export function RewardItem({ reward }: { reward: Reward }) {
  return (
    <div className="flex items-start gap-4 p-4 transition-colors sm:items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
          {iconMap[reward.type]}
        </div>
        <div className="grid flex-1 gap-1">
            <p className="font-semibold">
                {reward.type === 'points' ? `${reward.value} Points` : reward.value}
            </p>
            <p className="text-sm text-muted-foreground">{reward.description}</p>
        </div>
        <div className="text-right text-sm text-muted-foreground">
            {format(new Date(reward.date), "MMM d, yyyy")}
        </div>
    </div>
  );
}
