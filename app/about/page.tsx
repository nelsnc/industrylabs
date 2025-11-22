import { Container } from "@/components/layout/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <Container className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Hero Section */}
        <div className="space-y-4 text-center">
          <h1>About IndustryLabs</h1>
          <p className="text-lg text-muted-foreground">
            A B2B AI tool marketplace built for HR & Talent teams
          </p>
        </div>

        <Separator />

        {/* What We Are */}
        <section className="space-y-4">
          <h2>What is IndustryLabs?</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            IndustryLabs is a curated marketplace of AI tools organized by industry vertical.
            Starting with HR & Talent, we help mid-market companies (50-500 employees) discover,
            evaluate, and adopt AI tools with confidence.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Unlike generic tool directories, we focus on what matters to your vertical:
            compliance requirements (GDPR, EEOC), relevant integrations, and real use cases
            from companies like yours.
          </p>
        </section>

        {/* Mission */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              To help HR and Talent teams evaluate and adopt AI tools faster, safer,
              and with full context about compliance and integrations.
            </p>
          </CardContent>
        </Card>

        {/* Value Props */}
        <section className="space-y-6">
          <h2>How It Works</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>For Buyers</CardTitle>
                <CardDescription>HR & Talent Teams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                  <li>Curated directory of AI tools</li>
                  <li>Request Board for personalized matching</li>
                  <li>Compliance and integration context</li>
                  <li>Real use cases from similar companies</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>For Vendors</CardTitle>
                <CardDescription>AI Tool Providers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                  <li>Access qualified leads with full context</li>
                  <li>Vertical-specific exposure (£99/month)</li>
                  <li>Request Board lead notifications</li>
                  <li>Enhanced listing with compliance tags</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Roadmap */}
        <section className="space-y-4">
          <h2>Our Roadmap</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            We&apos;re starting with <strong>HR & Talent</strong> (Month 1-4),
            then expanding to <strong>Learning & Development</strong> (Month 5-8),
            and <strong>Customer Support</strong> (Month 9-12).
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Our focus: depth over breadth. Each vertical gets dedicated compliance research,
            integration mapping, and use case documentation before we move to the next.
          </p>
        </section>
      </div>
    </Container>
  );
}
