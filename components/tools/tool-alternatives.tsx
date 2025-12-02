import { getAllTools } from "@/lib/airtable-helpers";
import { ToolCard } from "@/components/tools/tool-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ToolAlternativesProps {
  toolId: string;
  competitorIds: string[];
}

export async function ToolAlternatives({
  toolId,
  competitorIds,
}: ToolAlternativesProps) {
  // Fetch all tools and filter by competitor IDs
  const allTools = await getAllTools();
  const competitorTools = allTools
    .filter((tool) => competitorIds.includes(tool.id))
    .slice(0, 3); // Limit to 3 alternatives

  if (competitorTools.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Compare Alternatives
        </h2>
        <Link
          href="/hr-talent"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View all tools
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {competitorTools.map((competitor) => (
          <ToolCard key={competitor.id} tool={competitor} />
        ))}
      </div>
    </section>
  );
}
