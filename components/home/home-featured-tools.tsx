import { ToolCard } from "@/components/tools/tool-card";
import { featuredTools } from "@/lib/mock-data";

export function HomeFeaturedTools() {
  return (
    <section className="py-12 md:py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Featured AI tools</h2>
        <p className="text-muted-foreground">
          Popular tools helping HR teams automate and improve their workflows
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featuredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
