import { Container } from "@/components/layout/container";
import { HrToolsGrid } from "@/components/hr/hr-tools-grid";
import { HrFiltersSidebar } from "@/components/hr/hr-filters-sidebar";
import { Badge } from "@/components/ui/badge";
import { getToolsByVertical } from "@/lib/airtable-helpers";
import { hrTools as mockHrTools } from "@/lib/mock-data";

export default async function HrTalentPage() {
  // Fetch HR tools from Airtable with fallback
  let tools: Awaited<ReturnType<typeof getToolsByVertical>>;
  try {
    tools = await getToolsByVertical("HR & Talent");

    if (tools.length === 0) {
      console.warn("No HR tools found in Airtable, using mock data");
      tools = mockHrTools;
    }
  } catch (error) {
    console.error("Failed to load HR tools from Airtable:", error);
    tools = mockHrTools;
  }

  return (
    <Container className="py-12 md:py-16">
      {/* Hero Section */}
      <div className="mb-12">
        <Badge variant="outline" className="mb-4">
          Vertical: HR & Talent
        </Badge>
        <h1 className="mb-4">HR & Talent AI Tools</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Discover AI-powered tools for recruiting, screening, onboarding, performance management,
          and employee engagement. Curated for HR teams at companies with 50-500 employees.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <HrFiltersSidebar />
        </aside>

        {/* Tools Grid */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {tools.length} {tools.length === 1 ? "tool" : "tools"} found
            </p>
          </div>

          <HrToolsGrid tools={tools} />
        </div>
      </div>
    </Container>
  );
}
