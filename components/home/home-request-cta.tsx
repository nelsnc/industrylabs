import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Clock, Shield, CheckCircle2 } from "lucide-react";

export function HomeRequestCta() {
  const benefits = [
    {
      icon: Clock,
      text: "Save 10+ hours of research",
    },
    {
      icon: Shield,
      text: "Expert-curated recommendations",
    },
    {
      icon: CheckCircle2,
      text: "Personalized to your needs",
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 border-0">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-200" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Find Your Perfect AI Tool in Minutes
            </h2>
          </div>

          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Skip the research. Tell us what you need, and we'll match you with 2-3 tools
            that actually fit your budget, company size, and requirements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="flex items-center gap-2 text-blue-100">
                  <Icon className="w-5 h-5 text-blue-300" />
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 h-auto">
              <Link href="/request" className="flex items-center gap-2">
                Get Personalized Recommendations
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <p className="text-sm text-blue-200">
              Free • 2 minutes • No sales calls
            </p>
          </div>

          <div className="mt-8 text-blue-200 text-sm">
            Trusted by HR leaders at 200+ companies
          </div>
        </div>
      </Card>
    </section>
  );
}
