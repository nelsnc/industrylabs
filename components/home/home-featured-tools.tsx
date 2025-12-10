import Link from "next/link";
import { ToolCard } from "@/components/tools/tool-card";
import type { Tool } from "@/lib/airtable-helpers";

interface HomeFeaturedToolsProps {
  tools: Tool[];
}

export function HomeFeaturedTools({ tools }: HomeFeaturedToolsProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Featured AI tools
        </h2>
        <p className="text-lg text-slate-600">
          Popular tools helping HR teams automate and improve their workflows
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/hr-talent"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          View all HR tools
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
