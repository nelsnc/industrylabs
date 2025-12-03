import { notFound } from "next/navigation";
import Link from "next/link";
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
import { Scale } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    companySize?: string; // For personalized timeline estimates
    from?: string; // For bidirectional comparison navigation
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

  // Check if user came from another tool (for "Compare with X" link)
  const referrerSlug = search.from;
  const referrerTool = referrerSlug ? await getToolBySlug(referrerSlug) : null;

  return (
    <Container className="py-12">
      {/* Show "Comparing with X" banner if came from competitor */}
      {referrerTool && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-blue-900">
                Comparing with {referrerTool.name}
              </div>
              <div className="text-xs text-blue-700">
                You're viewing an alternative from {referrerTool.name}'s comparison
              </div>
            </div>
          </div>
          <Link
            href={`/tools/${referrerTool.slug}`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
          >
            Back to {referrerTool.name}
          </Link>
        </div>
      )}

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
          <ToolAlternatives
            currentTool={{
              id: tool.id,
              name: tool.name,
              slug: tool.slug,
              category: tool.category,
            }}
            competitorIds={tool.primaryCompetitorIds}
          />
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
