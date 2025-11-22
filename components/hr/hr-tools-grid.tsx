import { ToolCard } from "@/components/tools/tool-card";
import { hrTools } from "@/lib/mock-data";

export function HrToolsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {hrTools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
