import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ToolCard } from "@/components/tools/tool-card";
import { getToolsByFilters, getAllTools } from "@/lib/airtable-helpers";
import { hrTools as mockHrTools } from "@/lib/mock-data";
import { ToolFilters } from "@/components/filters/tool-filters";
import { ActiveFilters } from "@/components/filters/active-filters";
import { MobileFilterSheet } from "@/components/filters/mobile-filter-sheet";
import { RequestBoardCompactCTA } from "@/components/request/request-board-compact-cta";
import { Suspense } from "react";
import { FilterSkeleton } from "@/components/filters/filter-skeleton";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    size?: string;
    budgetMin?: string;
    budgetMax?: string;
    region?: string;
    compliance?: string;
    integrations?: string;
    useCases?: string;
    search?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "AI Tools for HR & Talent Teams | IndustryLabs",
  description:
    "Curated AI-powered tools for recruiting, onboarding, performance management, engagement, and analytics. Organized by use case and verified for mid-market companies.",
};

export default async function HrTalentPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Parse filters from URL
  const companySizes = params.size?.split(",").filter(Boolean) || undefined;
  const budgetMin = params.budgetMin ? parseInt(params.budgetMin, 10) : undefined;
  const budgetMax = params.budgetMax ? parseInt(params.budgetMax, 10) : undefined;
  const regions = params.region?.split(",").filter(Boolean) || undefined;
  const complianceNeeds = params.compliance?.split(",").filter(Boolean) || undefined;
  const requiredIntegrations = params.integrations?.split(",").filter(Boolean) || undefined;
  const useCases = params.useCases?.split(",").filter(Boolean) || undefined;
  const searchQuery = params.search?.toLowerCase().trim();

  let filteredTools;
  try {
    // Get all HR tools for the vertical
    filteredTools = await getToolsByFilters({
      vertical: "HR & Talent",
      budgetMin,
      budgetMax,
      complianceNeeds,
      useCases,
    });

    if (filteredTools.length === 0) {
      console.warn("No HR tools found in Airtable, using mock data");
      filteredTools = mockHrTools;
    }

    // Apply additional client-side filters
    if (companySizes && companySizes.length > 0) {
      filteredTools = filteredTools.filter((tool) => {
        const sizeField = tool.idealCompanySize || tool.companySizeFit;
        if (!sizeField || sizeField.length === 0) {
          return false;
        }
        return companySizes.some((selectedSize) =>
          sizeField?.includes(selectedSize)
        );
      });
    }

    if (regions && regions.length > 0) {
      filteredTools = filteredTools.filter((tool) => {
        if (!tool.supportedRegions || tool.supportedRegions.length === 0) {
          return false;
        }
        return tool.supportedRegions.includes('Global') ||
          regions.some((selectedRegion) => tool.supportedRegions?.includes(selectedRegion));
      });
    }

    if (requiredIntegrations && requiredIntegrations.length > 0) {
      filteredTools = filteredTools.filter((tool) => {
        if (!tool.otherIntegrations) return false;
        return requiredIntegrations.every((required) =>
          tool.otherIntegrations?.toLowerCase().includes(required.toLowerCase())
        );
      });
    }

    if (searchQuery) {
      filteredTools = filteredTools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery) ||
          tool.shortDescription?.toLowerCase().includes(searchQuery) ||
          tool.fullDescription?.toLowerCase().includes(searchQuery)
      );
    }
  } catch (error) {
    console.error("Failed to load HR tools from Airtable:", error);
    filteredTools = mockHrTools;
  }

  // Check if any filters are active
  const hasActiveFilters =
    companySizes !== undefined ||
    budgetMin !== undefined ||
    budgetMax !== undefined ||
    regions !== undefined ||
    complianceNeeds !== undefined ||
    requiredIntegrations !== undefined ||
    useCases !== undefined ||
    !!searchQuery;

  return (
    <Container className="py-12 md:py-16">
      {/* Page Header */}
      <div className="mb-12">
        <Badge variant="outline" className="mb-4">
          Vertical: HR & Talent
        </Badge>
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          AI Tools for HR & Talent Teams
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Curated AI-powered tools for recruiting, onboarding, performance
          management, engagement, and analytics. Organized by use case and
          verified for mid-market companies.
        </p>
      </div>

      {/* Main Layout: Sidebar + Content */}
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
          <Suspense fallback={<FilterSkeleton />}>
            <ToolFilters />
          </Suspense>
        </aside>

        {/* Main Content */}
        <main className="space-y-6">
          {/* Active Filters */}
          <Suspense fallback={null}>
            {hasActiveFilters && (
              <div className="mb-4">
                <ActiveFilters />
              </div>
            )}
          </Suspense>

          {/* Results Count and Mobile Filter */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredTools.length}{" "}
              {filteredTools.length === 1 ? "tool" : "tools"} found
            </p>
            <Suspense fallback={null}>
              <MobileFilterSheet />
            </Suspense>
          </div>

          {/* Tools Grid or No Results */}
          {filteredTools.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No tools match your current filters. Try adjusting your criteria or{" "}
                <Link
                  href="/hr-talent"
                  className="font-medium text-blue-600 hover:underline"
                >
                  clear all filters
                </Link>
                .
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>

              {/* Request Board CTA */}
              <div className="mt-12">
                <RequestBoardCompactCTA
                  headline="Can't find the perfect HR tool?"
                  subheadline="Tell us your HR needs and we'll match you with 2-3 tools that fit your budget, team size, and compliance requirements."
                />
              </div>
            </>
          )}
        </main>
      </div>
    </Container>
  );
}
