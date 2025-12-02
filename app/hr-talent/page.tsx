import { Container } from "@/components/layout/container";
import { HrToolsGrid } from "@/components/hr/hr-tools-grid";
import { Badge } from "@/components/ui/badge";
import { getToolsByFilters } from "@/lib/airtable-helpers";
import { hrTools as mockHrTools } from "@/lib/mock-data";
import { ToolFilters } from "@/components/filters/tool-filters";
import { ActiveFilters } from "@/components/filters/active-filters";
import { MobileFilterSheet } from "@/components/filters/mobile-filter-sheet";
import { Suspense } from "react";
import { FilterSkeleton } from "@/components/filters/filter-skeleton";

interface PageProps {
  searchParams: Promise<{
    size?: string;
    budgetMin?: string;
    budgetMax?: string;
    region?: string;
    compliance?: string;
    integrations?: string;
  }>;
}

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

export default async function HrTalentPage({ searchParams }: PageProps) {
  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams;

  // Parse filter params from URL
  const companySizes = params.size?.split(",").filter(Boolean) || undefined;
  const budgetMin = params.budgetMin ? parseInt(params.budgetMin, 10) : undefined;
  const budgetMax = params.budgetMax ? parseInt(params.budgetMax, 10) : undefined;
  const regions = params.region?.split(",").filter(Boolean) || undefined;
  const complianceNeeds = params.compliance?.split(",").filter(Boolean) || undefined;
  const requiredIntegrations = params.integrations?.split(",").filter(Boolean) || undefined;

  // Fetch all HR tools first
  let tools: Awaited<ReturnType<typeof getToolsByFilters>>;
  try {
    // Start with all HR & Talent tools
    tools = await getToolsByFilters({ vertical: "HR & Talent" });

    if (tools.length === 0) {
      console.warn("No HR tools found in Airtable, using mock data");
      tools = mockHrTools;
    }

    // CLIENT-SIDE FILTERING (since v2.3 fields aren't fully populated yet)

    // Filter by company size (using v2.3 field: idealCompanySize, fallback to old companySizeFit)
    if (companySizes && companySizes.length > 0) {
      tools = tools.filter((tool) => {
        // Prefer v2.3 idealCompanySize, fallback to old companySizeFit
        const sizeField = tool.idealCompanySize || tool.companySizeFit;

        // If tool has no size preference, exclude it
        if (!sizeField || sizeField.length === 0) {
          return false;
        }
        // Check if any selected size matches tool's size field
        return companySizes.some((selectedSize) =>
          sizeField?.includes(selectedSize)
        );
      });
    }

    // Filter by budget range (using v2.3 fields if available)
    if (budgetMin !== undefined || budgetMax !== undefined) {
      tools = tools.filter((tool) => {
        // If v2.3 pricing fields are populated, use them
        if (tool.pricingAnnualMin !== undefined && tool.pricingAnnualMax !== undefined) {
          const toolMin = tool.pricingAnnualMin;
          const toolMax = tool.pricingAnnualMax;

          // Overlap logic: tool range overlaps with budget range
          if (budgetMin && budgetMax) {
            return toolMin <= budgetMax && toolMax >= budgetMin;
          } else if (budgetMin) {
            return toolMax >= budgetMin;
          } else if (budgetMax) {
            return toolMin <= budgetMax;
          }
        }

        // If v2.3 fields not populated, include all tools (can't filter)
        return true;
      });
    }

    // Filter by region (using v2.3 supportedRegions field)
    if (regions && regions.length > 0) {
      tools = tools.filter((tool) => {
        if (!tool.supportedRegions || tool.supportedRegions.length === 0) {
          return false;
        }
        // Tool must support at least one of the selected regions
        // OR support "Global" (which matches all regions)
        return tool.supportedRegions.includes('Global') ||
          regions.some((selectedRegion) => tool.supportedRegions?.includes(selectedRegion));
      });
    }

    // Filter by compliance (using v2.3 compliance fields)
    if (complianceNeeds && complianceNeeds.length > 0) {
      tools = tools.filter((tool) => {
        // Tool must meet ALL selected compliance requirements (AND logic)
        return complianceNeeds.every((requirement) => {
          switch (requirement) {
            case 'GDPR':
              return tool.gdprCompliant === true;
            case 'EEOC':
              return tool.eeocCompliant === true;
            case 'SOC2':
              return tool.soc2Certified === true;
            case 'HIPAA':
              return tool.hipaaCompliant === true;
            case 'ISO27001':
              return tool.iso27001Certified === true;
            default:
              return false;
          }
        });
      });
    }

    // Filter by integrations (using old schema relationship)
    if (requiredIntegrations && requiredIntegrations.length > 0) {
      tools = tools.filter((tool) => {
        if (!tool.otherIntegrations) return false;
        // Check if tool has all required integrations
        return requiredIntegrations.every((required) =>
          tool.otherIntegrations?.toLowerCase().includes(required.toLowerCase())
        );
      });
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
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* Filters Sidebar - Hidden on mobile */}
        <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
          <Suspense fallback={<FilterSkeleton />}>
            <ToolFilters />
          </Suspense>
        </aside>

        {/* Tools Grid */}
        <div>
          {/* Active Filters */}
          <Suspense fallback={null}>
            <div className="mb-4">
              <ActiveFilters />
            </div>
          </Suspense>

          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {tools.length} {tools.length === 1 ? "tool" : "tools"} found
            </p>
            <Suspense fallback={null}>
              <MobileFilterSheet />
            </Suspense>
          </div>

          {tools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-2">No tools match your filters</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filter criteria to see more results
              </p>
            </div>
          ) : (
            <HrToolsGrid tools={tools} />
          )}
        </div>
      </div>
    </Container>
  );
}
