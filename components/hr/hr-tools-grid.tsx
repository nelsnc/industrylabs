import { ToolCard } from "@/components/tools/tool-card";
import { Tool } from "@/lib/airtable-helpers";

interface HrToolsGridProps {
  tools: Tool[];
}

export function HrToolsGrid({ tools }: HrToolsGridProps) {
  if (tools.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">No tools found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
