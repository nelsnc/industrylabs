import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getAllArticles } from "@/lib/airtable-helpers";
import { articles as mockArticles } from "@/lib/mock-data";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlesPage() {
  // Fetch articles from Airtable with fallback
  let articles: Awaited<ReturnType<typeof getAllArticles>>;
  try {
    articles = await getAllArticles();

    if (articles.length === 0) {
      console.warn("No articles found in Airtable, using mock data");
      articles = mockArticles;
    }
  } catch (error) {
    console.error("Failed to load articles from Airtable:", error);
    articles = mockArticles;
  }

  return (
    <Container className="py-12 md:py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4">Articles & Insights</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Deep dives into HR AI tools, use cases, and buying guides
        </p>
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/articles/${article.slug}`}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="outline">{article.category}</Badge>
                    {article.readTimeMinutes && (
                      <span className="text-xs text-muted-foreground">
                        {article.readTimeMinutes} min read
                      </span>
                    )}
                  </div>
                  <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.author}</span>
                    <time dateTime={article.publishedAt}>
                      {formatDate(article.publishedAt)}
                    </time>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No articles published yet.</p>
        </div>
      )}
    </Container>
  );
}
