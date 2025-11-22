import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="py-12 md:py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find the right AI tools for HR
            </h1>
            <p className="text-lg text-muted-foreground">
              Curated AI solutions for recruiting, screening, interviews, and more.
              Filter by your company size, geography, and compliance needs.
            </p>
            <p className="text-sm text-muted-foreground">
              Post your use case for free and we'll match you with the best tools.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/request">Post a Request</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/hr-talent">Browse HR Tools</Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-md aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center">
            <div className="text-center space-y-2 p-8">
              <div className="text-6xl font-bold text-primary/30">AI</div>
              <div className="text-sm text-muted-foreground">
                Illustration placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
