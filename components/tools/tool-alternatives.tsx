import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { ToolCard } from "@/components/tools/tool-card";
import { getAllTools } from "@/lib/airtable-helpers";
import type { Tool } from "@/lib/airtable-helpers";

interface ToolAlternativesProps {
  currentTool: {
    id: string;
    name: string;
    slug: string;
    category?: string;
  };
  competitorIds: string[];
}

export async function ToolAlternatives({
  currentTool,
  competitorIds,
}: ToolAlternativesProps) {
  // Fetch all tools and filter by competitor IDs
  const allTools = await getAllTools();
  const competitors = allTools
    .filter((tool) => competitorIds.includes(tool.id))
    .slice(0, 3); // Limit to 3 alternatives

  // If no competitors found, return null (don't show section)
  if (competitors.length === 0) {
    return null;
  }

  // Generate category link
  const categorySlug =
    currentTool.category?.toLowerCase().replace(/\s+/g, "-") || "hr-talent";

  return (
    <section className="space-y-6">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">
              Compare Alternatives to {currentTool.name}
            </h2>
          </div>
          <p className="text-gray-600">
            Similar tools in the {currentTool.category || "same"} category.
            Compare features, pricing, and fit for your needs.
          </p>
        </div>

        <Link
          href={`/${categorySlug}`}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 whitespace-nowrap"
        >
          View all tools
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Why compare badge */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex-1 space-y-2">
          <div className="text-sm font-semibold text-blue-900">
            Why compare alternatives?
          </div>
          <div className="text-sm text-blue-700">
            The right tool depends on your company size, existing stack, and
            specific needs. We show alternatives to help you make an informed
            decision based on your unique requirements.
          </div>
        </div>
      </div>

      {/* Competitor cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {competitors.map((competitor) => (
          <ToolCard
            key={competitor.id}
            tool={competitor}
            referrerSlug={currentTool.slug}
            showPricing={true}
          />
        ))}
      </div>

      {/* Comparison prompt */}
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-700 mb-4">Not sure which tool is right for you?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/request"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Personalized Recommendations
          </Link>
          <Link
            href={`/${categorySlug}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Browse All {currentTool.category || "Tools"}
          </Link>
        </div>
      </div>
    </section>
  );
}
