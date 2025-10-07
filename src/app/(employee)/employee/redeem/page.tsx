import { GiftCardItem } from "@/components/GiftCardItem";
import { giftCards, currentEmployee } from "@/lib/data";

export default function RedeemPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-headline text-3xl font-bold tracking-tight">Redeem Rewards</h2>
        <p className="text-muted-foreground">Use your points to claim exciting gift cards.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {giftCards.map((gc) => (
          <GiftCardItem key={gc.id} giftCard={gc} userPoints={currentEmployee.points} />
        ))}
      </div>
    </div>
  )
}
