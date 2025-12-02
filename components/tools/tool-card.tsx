import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Tool } from "@/lib/airtable-helpers";

type ToolCardProps = {
  tool: Tool;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`} className="block h-full">
      <Card className="h-full flex flex-col p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">
              {tool.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1">{tool.name}</h3>
            <p className="text-sm text-muted-foreground">{tool.pricing}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 flex-1">
          {tool.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </Card>
    </Link>
  );
}
