import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { getToolsByFilters } from "@/lib/airtable-helpers";
import { hrTools as mockHrTools } from "@/lib/mock-data";
import { HRTalentClient } from "@/components/hr/hr-talent-client";

interface PageProps {
  searchParams: Promise<{
    size?: string;
    budgetMin?: string;
    budgetMax?: string;
    region?: string;
    compliance?: string;
    integrations?: string;
    useCases?: string;
    // search?: string; // TASK-116: Hidden for MVP (only 4 tools)
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
  // TASK-116: Search hidden for MVP (only 4 tools - visual scanning faster)
  // const searchQuery = params.search?.toLowerCase().trim();

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

    // TASK-116: Search filtering hidden for MVP
    // TODO: Re-enable when tool count reaches 25+
    // if (searchQuery) {
    //   filteredTools = filteredTools.filter(
    //     (tool) =>
    //       tool.name.toLowerCase().includes(searchQuery) ||
    //       tool.shortDescription?.toLowerCase().includes(searchQuery) ||
    //       tool.fullDescription?.toLowerCase().includes(searchQuery)
    //   );
    // }
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
    useCases !== undefined;
    // || !!searchQuery; // TASK-116: Search hidden for MVP

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

      {/* Client Component with Interactive UI */}
      <HRTalentClient
        filteredTools={filteredTools}
        hasActiveFilters={hasActiveFilters}
      />
    </Container>
  );
}
