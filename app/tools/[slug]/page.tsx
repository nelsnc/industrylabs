import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { hrTools, articles } from "@/lib/mock-data";
import { ExternalLink, ArrowRight } from "lucide-react";

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = hrTools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  return (
    <Container>
      <div className="py-12 md:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "HR & Talent", href: "/hr-talent" },
            { label: tool.name },
          ]}
        />

        {/* Tool Header */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-start mb-12">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-3xl font-semibold text-primary">
                {tool.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>
              {tool.tagline && (
                <p className="text-xl text-muted-foreground">{tool.tagline}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Pricing</p>
              <p className="text-2xl font-semibold">{tool.pricing}</p>
            </div>
            {tool.websiteUrl && (
              <Button asChild size="lg" className="w-full md:w-auto">
                <Link href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                  Visit Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Full Description */}
            {tool.fullDescription && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {tool.fullDescription}
                </p>
              </section>
            )}

            {/* Key Features */}
            {tool.features && tool.features.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Detailed Pricing */}
            {tool.detailedPricing && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Pricing Details</h2>
                <Card className="p-6">
                  <p className="text-muted-foreground">{tool.detailedPricing}</p>
                </Card>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Compliance Tags */}
            {tool.complianceTags && tool.complianceTags.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Compliance</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.complianceTags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-green-100 text-green-800 border border-green-200 dark:bg-green-900 dark:text-green-100"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Integration Tags */}
            {tool.integrationTags && tool.integrationTags.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Integrations</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.integrationTags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900 dark:text-blue-100"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Company Size Fit */}
            {tool.companySizeFit && tool.companySizeFit.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Best for Company Size</h3>
                <div className="space-y-2">
                  {tool.companySizeFit.map((size) => (
                    <div key={size} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-sm text-muted-foreground">{size} employees</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Geography */}
            {tool.geography && tool.geography.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Available In</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.geography.map((geo) => (
                    <Badge key={geo} variant="outline">
                      {geo}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Use Case Tags */}
            {tool.tags && tool.tags.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Use Cases</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="text-xs bg-secondary/10 text-secondary-foreground border border-secondary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Related Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Related Insights</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <Card key={article.id} className="p-6 hover:shadow-lg transition-shadow">
                <Badge className="bg-secondary/10 text-secondary-foreground border border-secondary/20 mb-3">
                  {article.category}
                </Badge>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Read more
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Back Navigation */}
        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/hr-talent">← Back to HR & Talent Tools</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
