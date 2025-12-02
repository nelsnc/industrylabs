import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { formatPricing } from "@/lib/utils/pricing-formatter";
import type { Tool } from "@/lib/airtable-helpers";

interface ToolHeroProps {
  tool: Tool;
}

export function ToolHero({ tool }: ToolHeroProps) {
  // Format pricing if available
  const pricingData =
    tool.pricingAnnualMin || tool.pricingAnnualMax
      ? formatPricing({
          pricing_annual_min: tool.pricingAnnualMin,
          pricing_annual_max: tool.pricingAnnualMax,
          pricing_currency: tool.pricingCurrency || "GBP",
          pricing_model: "Custom",
          free_trial_available: tool.freeTrialAvailable || false,
          free_trial_duration_days: tool.freeTrialDurationDays,
        })
      : null;

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* Logo */}
      {tool.logoUrl && (
        <div className="flex-shrink-0">
          <div className="w-24 h-24 relative rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={tool.logoUrl}
              alt={`${tool.name} logo`}
              fill
              className="object-contain p-2"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 space-y-4">
        {/* Title and badges */}
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {tool.name}
            </h1>
            {tool.tags.includes("Premium") && (
              <Badge variant="default" className="bg-blue-600">
                Premium
              </Badge>
            )}
          </div>

          {/* Short description */}
          {tool.shortDescription && (
            <p className="text-lg text-gray-600">{tool.shortDescription}</p>
          )}
        </div>

        {/* Pricing and CTA row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Pricing */}
          {pricingData && (
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-900">
                {pricingData.display}
              </div>
              {pricingData.hasTrial && (
                <div className="text-sm text-green-600">
                  {pricingData.trialInfo}
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex gap-3">
            <Button asChild size="lg">
              <Link
                href={tool.websiteUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/request">Get Matched</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
