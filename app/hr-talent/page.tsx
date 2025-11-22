import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { HrFiltersSidebar } from "@/components/hr/hr-filters-sidebar";
import { HrToolsGrid } from "@/components/hr/hr-tools-grid";

export default function HrTalentPage() {
  return (
    <Container>
      <div className="py-12 md:py-16">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-secondary/10 text-secondary-foreground border border-secondary/20">Vertical: HR & Talent</Badge>
          </div>
          <h1 className="text-4xl font-bold">HR & Talent AI Tools</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Discover AI-powered solutions for candidate sourcing, screening, interview automation,
            and more. Filter by your company size, geography, and compliance requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,280px)_1fr]">
          <HrFiltersSidebar />
          <div>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing all 8 tools
              </p>
            </div>
            <HrToolsGrid />
          </div>
        </div>
      </div>
    </Container>
  );
}
