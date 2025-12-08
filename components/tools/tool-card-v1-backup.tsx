import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Building2, Shield, ArrowRight, Eye, DollarSign } from "lucide-react";
import {
  formatCardPricing,
  formatCardCompanySize,
  getTopComplianceBadges,
  getAdditionalComplianceCount,
  formatFreeTrial,
  formatViewCount,
  truncateDescription,
} from "@/lib/utils/format-card-data";
import type { Tool } from "@/lib/airtable-helpers";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
  integrationPreview?: string[]; // Optional: ["Workday", "BambooHR", "Slack"]
  showPricing?: boolean; // Optional: hide pricing on certain pages
  variant?: "default" | "compact"; // Optional: compact for grids
  referrerSlug?: string; // Optional: for comparison tracking
}

export function ToolCard({
  tool,
  integrationPreview = [],
  showPricing = true,
  variant = "default",
  referrerSlug,
}: ToolCardProps) {
  // Build detail URL with optional referrer for comparison tracking
  const detailUrl = referrerSlug
    ? `/tools/${tool.slug}?from=${referrerSlug}`
    : `/tools/${tool.slug}`;

  // Format data using new utilities
  const pricingDisplay = showPricing
    ? formatCardPricing(tool.pricingAnnualMin, tool.pricingAnnualMax)
    : null;
  const companySizeDisplay = formatCardCompanySize(tool.idealCompanySize);
  const description = truncateDescription(tool.shortDescription, 150);
  const freeTrialDisplay = formatFreeTrial(
    tool.freeTrialAvailable,
    tool.freeTrialDurationDays
  );
  const viewCountDisplay = formatViewCount(tool.page_views);

  // Build compliance array for easier filtering
  const complianceList = [
    tool.gdprCompliant && "GDPR",
    tool.eeocCompliant && "EEOC",
    tool.soc2Certified && "SOC2",
  ].filter((badge): badge is string => Boolean(badge));

  const topCompliance = getTopComplianceBadges(complianceList);
  const additionalComplianceCount = getAdditionalComplianceCount(complianceList);

  // Extract logo URL (handle string or Airtable attachment array)
  const logoUrl = typeof tool.logoUrl === "string" ? tool.logoUrl : "";

  return (
    <Card
      className={cn(
        "flex flex-col h-full hover:shadow-lg transition-shadow border-gray-200",
        variant === "compact" && "h-auto"
      )}
    >
      {/* Header: Logo + Name + Premium Badge */}
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start gap-4">
          {/* Logo */}
          {logoUrl ? (
            <div className="flex-shrink-0 w-14 h-14 relative rounded-lg overflow-hidden border border-gray-200 bg-white">
              <Image
                src={logoUrl}
                alt={`${tool.name} logo`}
                fill
                className="object-contain p-2"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-500">
                {tool.name[0]}
              </span>
            </div>
          )}

          {/* Name + Premium Badge */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-tight">
                {tool.name}
              </h3>
              {tool.tags.includes("Premium") && (
                <Badge variant="default" className="bg-blue-600 text-xs shrink-0">
                  Premium
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}
      </CardHeader>

      <Separator />

      {/* Content: Key Info */}
      <CardContent className="flex-1 space-y-4 py-4">
        {/* Pricing Section */}
        {pricingDisplay && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Pricing</span>
            </div>
            <div className="pl-6">
              <div className="text-lg font-bold text-gray-900">
                {pricingDisplay}
              </div>
              <div className="text-xs text-gray-500">per year</div>
            </div>
            {freeTrialDisplay && (
              <div className="pl-6">
                <Badge
                  variant="outline"
                  className="text-xs bg-green-50 text-green-700 border-green-200"
                >
                  {freeTrialDisplay}
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Company Size Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Best for</span>
          </div>
          <div className="pl-6">
            <div className="text-sm text-gray-900">{companySizeDisplay}</div>
          </div>
        </div>

        {/* Compliance Section */}
        {topCompliance.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Compliance</span>
            </div>
            <div className="pl-6 flex flex-wrap gap-2">
              {topCompliance.map((badge) => (
                <Badge
                  key={badge}
                  variant="outline"
                  className="text-xs bg-green-50 text-green-700 border-green-200"
                >
                  {badge}
                </Badge>
              ))}
              {additionalComplianceCount > 0 && (
                <Badge variant="outline" className="text-xs text-gray-600">
                  +{additionalComplianceCount} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <Separator />

      {/* Footer: CTA + Social Proof */}
      <CardFooter className="pt-4 pb-4 flex items-center justify-between gap-3">
        <Button asChild variant="default" className="flex-1 group">
          <Link href={detailUrl}>
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>

        {/* View count */}
        {viewCountDisplay && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 shrink-0">
            <Eye className="w-3.5 h-3.5" />
            <span>{viewCountDisplay}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
