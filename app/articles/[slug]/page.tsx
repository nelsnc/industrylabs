import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ToolCard } from "@/components/tools/tool-card";
import { articles, hrTools } from "@/lib/mock-data";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Get related tools
  const relatedTools = article.relatedToolSlugs
    ? hrTools.filter((tool) => article.relatedToolSlugs?.includes(tool.slug))
    : [];

  return (
    <Container>
      <div className="max-w-3xl mx-auto py-12 md:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Articles", href: "/" },
            { label: article.title },
          ]}
        />

        {/* Article Header */}
        <article>
          <header className="mb-8 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">
                  {article.author}
                </span>
                {article.authorRole && (
                  <>
                    <span>·</span>
                    <span>{article.authorRole}</span>
                  </>
                )}
              </div>
              <span>·</span>
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
              {article.readTimeMinutes && (
                <>
                  <span>·</span>
                  <span>{article.readTimeMinutes} min read</span>
                </>
              )}
              <Badge className="bg-secondary/10 text-secondary-foreground border border-secondary/20">
                {article.category}
              </Badge>
            </div>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground leading-relaxed">
              {article.excerpt}
            </p>
          </header>

          {/* Featured Image Placeholder */}
          <div className="mb-8 aspect-[16/9] rounded-xl bg-muted border flex items-center justify-center">
            <span className="text-sm text-muted-foreground">
              Featured Image Placeholder
            </span>
          </div>

          {/* Article Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {article.content.map((paragraph, index) => (
              <p key={index} className="mb-6 text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <>
            <Separator className="my-12" />
            <section>
              <h2 className="text-2xl font-semibold mb-6">Related Tools</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {relatedTools.slice(0, 3).map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          </>
        )}

        {/* Back to Home */}
        <Separator className="my-12" />
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </Container>
  );
}
