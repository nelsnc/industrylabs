import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { getToolBySlug, getAllArticles } from "@/lib/airtable-helpers";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;

  // Fetch tool from Airtable
  let tool: Awaited<ReturnType<typeof getToolBySlug>> = null;
  try {
    tool = await getToolBySlug(slug);
  } catch (error) {
    console.error("Error fetching tool from Airtable:", error);
    tool = null;
  }

  if (!tool) {
    return notFound();
  }

  // Get related articles (first 3 for now)
  let articles: Awaited<ReturnType<typeof getAllArticles>> = [];
  try {
    const allArticles = await getAllArticles();
    articles = allArticles.slice(0, 3);
  } catch (error) {
    console.error("Error fetching articles:", error);
    articles = [];
  }

  return (
    <Container className="py-10 md:py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "HR & Talent", href: "/hr-talent" },
          { label: tool.name },
        ]}
      />

      {/* Tool Header */}
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Left: Tool Info */}
        <div className="flex-1">
          <div className="flex items-center gap-4">
            {tool.logoUrl ? (
              <img
                src={tool.logoUrl}
                alt={`${tool.name} logo`}
                className="h-16 w-16 rounded-lg border object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-muted">
                <span className="text-2xl font-bold text-primary">
                  {tool.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h1 className="mb-2">{tool.name}</h1>
              <p className="text-lg text-muted-foreground">
                {tool.tagline || tool.shortDescription}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Right: CTA */}
        <Card className="w-full md:w-80">
          <CardHeader>
            <CardTitle className="text-lg">Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl font-semibold">{tool.pricing}</p>
            {tool.websiteUrl && (
              <Button asChild className="w-full">
                <Link
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-12" />

      {/* Tool Details */}
      <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Description */}
          <section>
            <h2 className="mb-4">About {tool.name}</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground">
                {tool.fullDescription || tool.shortDescription}
              </p>
            </div>
          </section>

          {/* Features */}
          {tool.features && tool.features.length > 0 && (
            <section>
              <h2 className="mb-4">Key Features</h2>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                {tool.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Detailed Pricing */}
          {tool.detailedPricing && (
            <section>
              <h2 className="mb-4">Pricing Details</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">{tool.detailedPricing}</p>
                </CardContent>
              </Card>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Company Size Fit */}
          {tool.companySizeFit && tool.companySizeFit.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Company Size Fit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.companySizeFit.map((size) => (
                    <Badge key={size} variant="outline">
                      {size} employees
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Compliance */}
          {tool.complianceTags && tool.complianceTags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.complianceTags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Integrations */}
          {tool.integrationTags && tool.integrationTags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.integrationTags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Geography */}
          {tool.geography && tool.geography.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Available In</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.geography.map((geo) => (
                    <Badge key={geo} variant="outline">
                      {geo}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>

      {/* Related Insights */}
      {articles.length > 0 && (
        <>
          <Separator className="my-12" />
          <section>
            <h2 className="mb-6">Related Insights</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  <CardHeader>
                    <Badge variant="outline" className="mb-2 w-fit">
                      {article.category}
                    </Badge>
                    <CardTitle className="line-clamp-2 text-base">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Read more →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Back Link */}
      <div className="mt-12">
        <Link
          href="/hr-talent"
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          ← Back to HR & Talent Tools
        </Link>
      </div>
    </Container>
  );
}
