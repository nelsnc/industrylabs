import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function HomeRequestCta() {
  return (
    <section className="py-12 md:py-16">
      <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Post your HR AI use case for free</h2>
          <p className="text-lg text-muted-foreground">
            Tell us what you're trying to solve, and we'll match you with the right tools.
            No commitment, no vendor spam—just curated recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/request">Post a Request</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
