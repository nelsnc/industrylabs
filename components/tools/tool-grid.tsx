import { ToolCard } from "./tool-card";
import type { Tool } from "@/lib/airtable-helpers";

interface ToolGridProps {
  tools: Tool[];
  integrationData?: Record<string, string[]>; // toolId -> integration names
  variant?: "default" | "compact";
}

export function ToolGrid({
  tools,
  integrationData = {},
  variant = "default",
}: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tools found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          integrationPreview={integrationData[tool.id] || []}
          variant={variant}
        />
      ))}
    </div>
  );
}
