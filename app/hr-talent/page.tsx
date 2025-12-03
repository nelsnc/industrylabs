import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { getToolsByFilters } from "@/lib/airtable-helpers";
import { hrTools as mockHrTools } from "@/lib/mock-data";
import { ToolFilters } from "@/components/filters/tool-filters";
import { ActiveFilters } from "@/components/filters/active-filters";
import { MobileFilterSheet } from "@/components/filters/mobile-filter-sheet";
import { CategoryNavigation } from "@/components/hr/category-navigation";
import { CategorySection } from "@/components/hr/category-section";
import { ToolSearchBar } from "@/components/tools/tool-search-bar";
import { RequestBoardCompactCTA } from "@/components/request/request-board-compact-cta";
import { Suspense, Fragment } from "react";
import { FilterSkeleton } from "@/components/filters/filter-skeleton";
import { UserPlus, GraduationCap, Target, Heart, BarChart3 } from "lucide-react";
import Link from "next/link";
import type { Tool } from "@/lib/airtable-helpers";

interface PageProps {
  searchParams: Promise<{
    size?: string;
    budgetMin?: string;
    budgetMax?: string;
    region?: string;
    compliance?: string;
    integrations?: string;
    category?: string;
    search?: string;
  }>;
}

export const dynamic = 'force-dynamic';

const categoryDefinitions = [
  {
    id: "recruiting-ats",
    name: "Recruiting & ATS",
    slug: "recruiting-ats",
    description: "AI-powered applicant tracking and recruiting tools",
    icon: UserPlus,
    keywords: ["recruit", "ats", "hiring", "applicant", "candidate", "sourcing", "talent acquisition"],
  },
  {
    id: "onboarding",
    name: "Onboarding",
    slug: "onboarding",
    description: "Streamline new hire onboarding and training programs",
    icon: GraduationCap,
    keywords: ["onboard", "training", "learning", "new hire", "orientation"],
  },
  {
    id: "performance-management",
    name: "Performance Management",
    slug: "performance-management",
    description: "Goal setting, reviews, and continuous feedback tools",
    icon: Target,
    keywords: ["performance", "review", "goal", "okr", "feedback", "evaluation", "appraisal"],
  },
  {
    id: "employee-engagement",
    name: "Employee Engagement",
    slug: "employee-engagement",
    description: "Measure and improve employee satisfaction and culture",
    icon: Heart,
    keywords: ["engagement", "culture", "satisfaction", "pulse", "survey", "wellbeing", "retention"],
  },
  {
    id: "hr-analytics",
    name: "HR Analytics",
    slug: "hr-analytics",
    description: "Workforce analytics and people data insights",
    icon: BarChart3,
    keywords: ["analytics", "reporting", "insights", "data", "metrics", "workforce planning"],
  },
];

function getToolsForCategory(tools: Tool[], categorySlug: string) {
  const category = categoryDefinitions.find((c) => c.slug === categorySlug);
  if (!category) return [];

  return tools.filter((tool) => {
    const toolText = `${tool.name} ${tool.shortDescription || ""} ${tool.fullDescription || ""}`.toLowerCase();
    return category.keywords.some((keyword) => toolText.includes(keyword));
  });
}

export default async function HrTalentPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const companySizes = params.size?.split(",").filter(Boolean) || undefined;
  const budgetMin = params.budgetMin ? parseInt(params.budgetMin, 10) : undefined;
  const budgetMax = params.budgetMax ? parseInt(params.budgetMax, 10) : undefined;
  const regions = params.region?.split(",").filter(Boolean) || undefined;
  const complianceNeeds = params.compliance?.split(",").filter(Boolean) || undefined;
  const requiredIntegrations = params.integrations?.split(",").filter(Boolean) || undefined;
  const selectedCategory = params.category;
  const searchQuery = params.search?.toLowerCase().trim();

  let tools: Awaited<ReturnType<typeof getToolsByFilters>>;
  try {
    tools = await getToolsByFilters({ vertical: "HR & Talent" });

    if (tools.length === 0) {
      console.warn("No HR tools found in Airtable, using mock data");
      tools = mockHrTools;
    }

    if (companySizes && companySizes.length > 0) {
      tools = tools.filter((tool) => {
        const sizeField = tool.idealCompanySize || tool.companySizeFit;
        if (!sizeField || sizeField.length === 0) {
          return false;
        }
        return companySizes.some((selectedSize) =>
          sizeField?.includes(selectedSize)
        );
      });
    }

    if (budgetMin !== undefined || budgetMax !== undefined) {
      tools = tools.filter((tool) => {
        if (tool.pricingAnnualMin !== undefined && tool.pricingAnnualMax !== undefined) {
          const toolMin = tool.pricingAnnualMin;
          const toolMax = tool.pricingAnnualMax;

          if (budgetMin && budgetMax) {
            return toolMin <= budgetMax && toolMax >= budgetMin;
          } else if (budgetMin) {
            return toolMax >= budgetMin;
          } else if (budgetMax) {
            return toolMin <= budgetMax;
          }
        }
        return true;
      });
    }

    if (regions && regions.length > 0) {
      tools = tools.filter((tool) => {
        if (!tool.supportedRegions || tool.supportedRegions.length === 0) {
          return false;
        }
        return tool.supportedRegions.includes('Global') ||
          regions.some((selectedRegion) => tool.supportedRegions?.includes(selectedRegion));
      });
    }

    if (complianceNeeds && complianceNeeds.length > 0) {
      tools = tools.filter((tool) => {
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

    if (requiredIntegrations && requiredIntegrations.length > 0) {
      tools = tools.filter((tool) => {
        if (!tool.otherIntegrations) return false;
        return requiredIntegrations.every((required) =>
          tool.otherIntegrations?.toLowerCase().includes(required.toLowerCase())
        );
      });
    }

    if (searchQuery) {
      tools = tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery) ||
          tool.shortDescription?.toLowerCase().includes(searchQuery) ||
          tool.fullDescription?.toLowerCase().includes(searchQuery)
      );
    }
  } catch (error) {
    console.error("Failed to load HR tools from Airtable:", error);
    tools = mockHrTools;
  }

  const hasActiveFilters =
    companySizes !== undefined ||
    budgetMin !== undefined ||
    budgetMax !== undefined ||
    regions !== undefined ||
    complianceNeeds !== undefined ||
    requiredIntegrations !== undefined ||
    !!searchQuery;

  return (
    <Container className="py-12 md:py-16">
      <div className="mb-12">
        <Badge variant="outline" className="mb-4">
          Vertical: HR & Talent
        </Badge>
        <h1 className="mb-4 text-4xl font-bold text-gray-900">AI Tools for HR & Talent Teams</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Curated AI-powered tools for recruiting, onboarding, performance management,
          engagement, and analytics. Organized by use case and verified for mid-market companies.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
          <Suspense fallback={<FilterSkeleton />}>
            <ToolFilters />
          </Suspense>
        </aside>

        <div>
          <ToolSearchBar currentSearch={searchQuery || ""} />

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
            <div className="text-center py-12 p-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-4">
                No tools match your current filters.
              </p>
              <Link
                href="/hr-talent"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </Link>
            </div>
          ) : (
            <>
              <CategoryNavigation />

              <div className="space-y-16 mt-8">
                {selectedCategory ? (
                  (() => {
                    const category = categoryDefinitions.find((c) => c.slug === selectedCategory);
                    if (!category) return null;

                    const categoryTools = getToolsForCategory(tools, category.slug);
                    return (
                      <CategorySection
                        key={category.id}
                        id={category.slug}
                        name={category.name}
                        description={category.description}
                        icon={category.icon}
                        tools={categoryTools}
                        showCount={100}
                      />
                    );
                  })()
                ) : (
                  categoryDefinitions.map((category, index) => {
                    const categoryTools = getToolsForCategory(tools, category.slug);
                    return (
                      <Fragment key={category.id}>
                        <CategorySection
                          id={category.slug}
                          name={category.name}
                          description={category.description}
                          icon={category.icon}
                          tools={categoryTools}
                          showCount={8}
                        />
                        {index === 1 && (
                          <div className="my-12">
                            <RequestBoardCompactCTA
                              headline="Can't find the perfect HR tool?"
                              subheadline="Tell us your HR needs and we'll match you with 2-3 tools that fit your budget, team size, and compliance requirements."
                            />
                          </div>
                        )}
                      </Fragment>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
