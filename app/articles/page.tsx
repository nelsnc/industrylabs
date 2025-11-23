import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { articles } from "@/lib/mock-data";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlesPage() {
  return (
    <Container>
      <div className="py-12 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Insights & Guides</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert insights on AI hiring tools, best practices, and industry trends
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/articles/${article.slug}`} className="block h-full">
              <Card className="h-full flex flex-col p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <Badge className="bg-secondary/10 text-secondary-foreground border border-secondary/20 mb-3">
                    {article.category}
                  </Badge>
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{article.author}</span>
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
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
