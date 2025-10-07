import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Award, Zap, Users, Gift, ArrowRight, Star } from 'lucide-react';
import RotatingText from '@/components/ui/RotatingText';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex flex-col items-center p-6 text-center transition-transform duration-300 transform bg-card border rounded-xl shadow-sm hover:-translate-y-2">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="mb-2 font-headline text-xl font-semibold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-foreground">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Award className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-2xl font-bold">Rewardify</h1>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">How It Works</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-white">
          <div className="container mx-auto grid items-center gap-12 px-4 py-20 text-center md:py-32">
            <div className="space-y-6">
              <div className="mb-4 flex justify-center">
                <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
                  <Star className="h-4 w-4 fill-current text-blue-500" />
                  <span>Trusted by over 1,000+ companies</span>
                </div>
              </div>
              <h2 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                Recognize{' '}
                <RotatingText
                  texts={['Excellence.', 'Growth.', 'Teamwork.']}
                  mainClassName="px-3 bg-blue-200 text-primary overflow-hidden py-1 justify-center rounded-lg"
                  staggerFrom={'first'}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  staggerDuration={0.05}
                  splitLevelClassName="overflow-hidden pb-1"
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                  splitBy="characters"
                />
                <br />
                Inspire Growth.
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Rewardify is the ultimate platform to motivate your team, celebrate achievements, and foster a culture of recognition that drives results.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/register">Get Started for Free</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold">Why Choose Rewardify?</h2>
              <p className="text-muted-foreground">Everything you need to run a successful rewards program.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<Zap className="h-8 w-8" />}
                title="Instant Recognition"
                description="Immediately issue points, badges, or gift cards to individuals or teams for their hard work."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8" />}
                title="Boost Engagement"
                description="Create a fun and competitive environment with leaderboards and transparent reward tracking."
              />
              <FeatureCard
                icon={<Gift className="h-8 w-8" />}
                title="Flexible Rewards"
                description="Offer a customizable catalog of rewards, from gift cards to company-specific perks."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold">How It Works</h2>
              <p className="text-muted-foreground">A simple, intuitive process for recognition.</p>
            </div>
            <div className="mx-auto max-w-3xl">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-lg text-white">1</div>
                  <div>
                    <h3 className="text-xl font-semibold">Admins Issue Rewards</h3>
                    <p className="text-muted-foreground">Managers and admins can easily award points or badges for achievements, big and small.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-lg text-white">2</div>
                  <div>
                    <h3 className="text-xl font-semibold">Employees Track Progress</h3>
                    <p className="text-muted-foreground">Employees can see their points accumulate on their dashboard and climb the leaderboard.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-lg text-white">3</div>
                  <div>
                    <h3 className="text-xl font-semibold">Redeem for Gift Cards</h3>
                    <p className="text-muted-foreground">Points can be redeemed for a variety of popular gift cards from our curated catalog.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold">Ready to Boost Your Team's Morale?</h2>
            <p className="mx-auto mt-2 max-w-xl opacity-90">Join hundreds of companies building a culture of appreciation and recognition with Rewardify.</p>
            <div className="mt-8">
              <Button size="lg" variant="secondary" asChild className="text-primary hover:bg-slate-200">
                <Link href="/register">Sign Up for Free Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Rewardify. All rights reserved.</p>
          <p>Powered by <a href="https://nubenta.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary">Nubenta Technology Limited</a></p>
        </div>
      </footer>
    </div>
  );
}
