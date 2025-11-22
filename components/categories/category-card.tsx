import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { Category } from "@/lib/mock-data";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href="/hr-talent" className="block h-full">
      <Card className="h-full p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
            <span className="text-xl font-semibold text-accent">
              {category.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
            <p className="text-sm text-muted-foreground">
              {category.toolCount} tools
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-2">
          {category.description}
        </p>

        {category.highlight && (
          <p className="text-xs text-accent font-medium">{category.highlight}</p>
        )}
      </Card>
    </Link>
  );
}
