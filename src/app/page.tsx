import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Award, Zap, Users, Gift } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="dark flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex h-16 items-center justify-between border-b border-border/20 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Award className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold">Rewardify</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative h-[60vh] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight md:text-6xl">
              Recognize Excellence. Inspire Growth.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Rewardify is the ultimate platform to motivate your team, celebrate achievements, and foster a culture of recognition.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" asChild>
                <Link href="/register">Get Started for Free</Link>
              </Button>
              <Button size="lg" variant="outline">
                Request a Demo
              </Button>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <h3 className="font-headline text-3xl font-bold">Why Choose Rewardify?</h3>
              <p className="text-muted-foreground">Everything you need to run a successful rewards program.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Zap className="h-8 w-8" />
                </div>
                <h4 className="mb-2 font-headline text-xl font-semibold">Instant Recognition</h4>
                <p className="text-muted-foreground">
                  Immediately issue points, badges, or gift cards to individuals or teams for their hard work.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="h-8 w-8" />
                </div>
                <h4 className="mb-2 font-headline text-xl font-semibold">Boost Engagement</h4>
                <p className="text-muted-foreground">
                  Create a fun and competitive environment with leaderboards and transparent reward tracking.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Gift className="h-8 w-8" />
                </div>
                <h4 className="mb-2 font-headline text-xl font-semibold">Flexible Rewards</h4>
                <p className="text-muted-foreground">
                  Offer a customizable catalog of rewards, from gift cards to company-specific perks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border/20 py-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rewardify. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
