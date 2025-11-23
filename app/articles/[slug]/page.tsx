import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ToolCard } from "@/components/tools/tool-card";
import { getArticleBySlug, getRelatedToolsForArticle } from "@/lib/airtable-helpers";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

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

  // Fetch article from Airtable
  let article: Awaited<ReturnType<typeof getArticleBySlug>> = null;
  try {
    article = await getArticleBySlug(slug);
  } catch (error) {
    console.error("Error fetching article from Airtable:", error);
    article = null;
  }

  if (!article) {
    return notFound();
  }

  // Get related tools
  let relatedTools: Awaited<ReturnType<typeof getRelatedToolsForArticle>> = [];
  try {
    relatedTools = await getRelatedToolsForArticle(article);
  } catch (error) {
    console.error("Error fetching related tools:", error);
    relatedTools = [];
  }

  return (
    <Container className="py-10 md:py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Articles", href: "/articles" },
          { label: article.title },
        ]}
      />

      {/* Article Header */}
      <article className="mx-auto mt-8 max-w-3xl">
        <header className="mb-8 space-y-4">
          <div>
            <Badge variant="outline" className="mb-4">
              {article.category}
            </Badge>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {article.title}
            </h1>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{article.author}</span>
            {article.authorRole && (
              <>
                <span>·</span>
                <span>{article.authorRole}</span>
              </>
            )}
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
          </div>

          {/* Excerpt */}
          <p className="text-xl leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        {article.featuredImageUrl ? (
          <div className="mb-8">
            <img
              src={article.featuredImageUrl}
              alt={article.title}
              className="aspect-video w-full rounded-xl border object-cover"
            />
          </div>
        ) : (
          <div className="mb-8 flex aspect-video items-center justify-center rounded-xl border bg-muted">
            <span className="text-sm text-muted-foreground">
              Featured Image Placeholder
            </span>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-slate max-w-none dark:prose-invert">
          {article.content.map((paragraph, index) => (
            <p key={index} className="mb-6 leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <>
          <Separator className="my-12" />

          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-semibold">Related Tools</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Back Link */}
      <Separator className="my-12" />
      <div className="mx-auto max-w-3xl text-center">
        <Link
          href="/articles"
          className="text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          ← Back to Articles
        </Link>
      </div>
    </Container>
  );
}
