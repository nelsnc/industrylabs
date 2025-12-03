import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolGrid } from "@/components/tools/tool-grid";
import type { Tool } from "@/lib/airtable-helpers";

interface CategorySectionProps {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tools: Tool[];
  showCount?: number;
}

export function CategorySection({
  id,
  name,
  description,
  icon: Icon,
  tools,
  showCount = 8,
}: CategorySectionProps) {
  const sortedTools = [...tools].sort((a, b) => {
    if (a.tags.includes("Premium") && !b.tags.includes("Premium")) return -1;
    if (!a.tags.includes("Premium") && b.tags.includes("Premium")) return 1;
    return a.name.localeCompare(b.name);
  });

  const displayedTools = sortedTools.slice(0, showCount);
  const hasMore = tools.length > showCount;

  if (tools.length === 0) {
    return (
      <section id={id} className="scroll-mt-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>

        <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600">
            No tools available in this category yet. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>

        {hasMore && (
          <Link
            href={`/hr-talent?category=${id}`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 whitespace-nowrap"
          >
            View all {tools.length} tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <ToolGrid tools={displayedTools} />

      {hasMore && (
        <div className="mt-6 text-center">
          <Link
            href={`/hr-talent?category=${id}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            View all {tools.length} {name} tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
