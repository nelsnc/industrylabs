import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { ToolCard } from "@/components/tools/tool-card";
import type { Tool } from "@/lib/airtable-helpers";

interface MostViewedToolsSectionProps {
  tools: Tool[];
}

export function MostViewedToolsSection({ tools }: MostViewedToolsSectionProps) {
  if (tools.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Most Viewed Tools
            </h2>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the tools that our community is exploring the most. Real
            insights from real users.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group"
          >
            Explore All Tools
            <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
