"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { GiftCard } from "@/lib/types";
import { Star } from "lucide-react";

export function GiftCardItem({ giftCard, userPoints }: { giftCard: GiftCard; userPoints: number }) {
  const { toast } = useToast();
  const canRedeem = userPoints >= giftCard.pointsCost;

  const handleRedeem = () => {
    toast({
      title: "Reward Redeemed!",
      description: `You've successfully redeemed the ${giftCard.name}.`,
    });
  };

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="relative aspect-[16/10] bg-muted">
        <Image 
          src={giftCard.imageUrl} 
          alt={giftCard.name} 
          fill 
          className="object-cover transition-transform duration-300 group-hover:scale-105" 
          data-ai-hint={giftCard.imageHint}
        />
      </div>
      <CardContent className="space-y-3 p-4">
        <div>
            <h3 className="font-semibold">{giftCard.name}</h3>
            <p className="text-sm text-muted-foreground">${giftCard.value} Value</p>
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-lg font-bold text-primary">
                <Star className="h-5 w-5 text-accent" />
                <span>{giftCard.pointsCost.toLocaleString()}</span>
            </div>
            <Button onClick={handleRedeem} disabled={!canRedeem} size="sm" variant="secondary">
                Redeem
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
