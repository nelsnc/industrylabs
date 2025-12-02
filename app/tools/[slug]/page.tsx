import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { getToolBySlug, getIntegrationsForTool } from "@/lib/airtable-helpers";
import { ToolHero } from "@/components/tools/tool-hero";
import { ToolQuickFacts } from "@/components/tools/tool-quick-facts";
import { ToolPricingSection } from "@/components/tools/tool-pricing-section";
import { ToolImplementationSection } from "@/components/tools/tool-implementation-section";
import { ToolIntegrationsSection } from "@/components/tools/tool-integrations-section";
import { ToolComplianceSection } from "@/components/tools/tool-compliance-section";
import { ToolCaseStudySection } from "@/components/tools/tool-case-study-section";
import { ToolAlternatives } from "@/components/tools/tool-alternatives";
import { Separator } from "@/components/ui/separator";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    companySize?: string; // For personalized timeline estimates
  }>;
}

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

export default async function ToolDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const search = searchParams ? await searchParams : {};

  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Fetch integrations with quality ratings
  const integrations = await getIntegrationsForTool(tool.id);

  // Parse company size from search params (for personalized estimates)
  const buyerCompanySize = search.companySize
    ? Number(search.companySize)
    : undefined;

  return (
    <Container className="py-12">
      {/* Hero section with name, logo, pricing, CTA */}
      <ToolHero tool={tool} />

      <Separator className="my-8" />

      {/* Quick facts bar */}
      <ToolQuickFacts tool={tool} buyerCompanySize={buyerCompanySize} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* Main content - 2 columns on desktop */}
        <div className="lg:col-span-2 space-y-8">
          {/* Long description */}
          {tool.fullDescription && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 whitespace-pre-line">
                  {tool.fullDescription}
                </p>
              </div>
            </section>
          )}

          {/* Features list */}
          {tool.features && tool.features.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {tool.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Demo video */}
          {tool.demoVideoUrl && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Demo</h2>
              <div className="aspect-video">
                <iframe
                  src={tool.demoVideoUrl}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {/* Integrations */}
          {integrations.length > 0 && (
            <ToolIntegrationsSection
              integrations={integrations}
              otherIntegrations={tool.otherIntegrations}
            />
          )}

          {/* Implementation timeline */}
          <ToolImplementationSection
            tool={tool}
            buyerCompanySize={buyerCompanySize}
          />

          {/* Compliance */}
          <ToolComplianceSection tool={tool} />

          {/* Case study */}
          {tool.caseStudyUrl && (
            <ToolCaseStudySection tool={tool} />
          )}
        </div>

        {/* Sidebar - 1 column on desktop */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Pricing card (sticky) */}
          <div className="lg:sticky lg:top-6">
            <ToolPricingSection tool={tool} />
          </div>
        </aside>
      </div>

      {/* Alternatives section at bottom */}
      {tool.primaryCompetitorIds && tool.primaryCompetitorIds.length > 0 && (
        <>
          <Separator className="my-12" />
          <ToolAlternatives toolId={tool.id} competitorIds={tool.primaryCompetitorIds} />
        </>
      )}
    </Container>
  );
}

// Metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: `${tool.name} - AI Tool for ${tool.category}`,
    description: tool.shortDescription || tool.fullDescription?.slice(0, 160),
  };
}
