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
import { Building2, Shield, Link2, ArrowRight, Eye } from "lucide-react";
import { formatPricing } from "@/lib/utils/pricing-formatter";
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

  // Format pricing if available
  const pricingData =
    (tool.pricingAnnualMin || tool.pricingAnnualMax) && showPricing
      ? formatPricing({
          pricing_annual_min: tool.pricingAnnualMin,
          pricing_annual_max: tool.pricingAnnualMax,
          pricing_currency: tool.pricingCurrency || "GBP",
          pricing_model: "Custom",
          free_trial_available: tool.freeTrialAvailable || false,
          free_trial_duration_days: tool.freeTrialDurationDays,
        })
      : null;

  // Truncate description to 2 lines (~100 chars)
  const truncatedDescription = tool.shortDescription
    ? tool.shortDescription.length > 100
      ? tool.shortDescription.slice(0, 100) + "..."
      : tool.shortDescription
    : null;

  // Count compliance badges (show up to 2)
  const complianceBadges = [
    tool.gdprCompliant && { icon: "GDPR", color: "blue" },
    tool.eeocCompliant && { icon: "EEOC", color: "blue" },
    tool.soc2Certified && { icon: "SOC2", color: "green" },
  ]
    .filter((badge): badge is { icon: string; color: string } => Boolean(badge))
    .slice(0, 2);

  return (
    <Card
      className={cn(
        "flex flex-col h-full hover:shadow-lg transition-shadow",
        variant === "compact" && "h-auto"
      )}
    >
      <CardHeader
        className={cn("space-y-3", variant === "compact" && "space-y-2 pb-3")}
      >
        {/* Logo and badges row */}
        <div className="flex items-start justify-between gap-3">
          {/* Logo */}
          {tool.logoUrl ? (
            <div className="flex-shrink-0 w-12 h-12 relative rounded-md overflow-hidden border border-gray-200">
              <Image
                src={tool.logoUrl}
                alt={`${tool.name} logo`}
                fill
                className="object-contain p-1"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
              <span className="text-xl font-bold text-gray-400">
                {tool.name[0]}
              </span>
            </div>
          )}

          {/* Tier and verification badges */}
          <div className="flex flex-wrap gap-1 justify-end">
            {tool.tags.includes("Premium") && (
              <Badge variant="default" className="bg-blue-600 text-xs">
                Premium
              </Badge>
            )}
          </div>
        </div>

        {/* Tool name */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {tool.name}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Description */}
        {truncatedDescription && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {truncatedDescription}
          </p>
        )}

        {/* Pricing */}
        {pricingData && (
          <div className="space-y-1">
            <div className="text-lg font-bold text-gray-900">
              {pricingData.range || "Contact for pricing"}
            </div>
            <div className="text-xs text-gray-500">{pricingData.period}</div>
            {pricingData.hasTrial && (
              <Badge
                variant="outline"
                className="text-xs bg-green-50 text-green-700 border-green-200"
              >
                {pricingData.trialInfo}
              </Badge>
            )}
          </div>
        )}

        {/* Quick info pills */}
        <div className="flex flex-wrap gap-2">
          {/* Company size */}
          {tool.idealCompanySize && tool.idealCompanySize.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
              <Building2 className="w-3 h-3" />
              <span>{tool.idealCompanySize[0]}</span>
              {tool.idealCompanySize.length > 1 && (
                <span className="text-gray-400">
                  +{tool.idealCompanySize.length - 1}
                </span>
              )}
            </div>
          )}

          {/* Top integrations */}
          {integrationPreview.slice(0, 2).map((integration) => (
            <div
              key={integration}
              className="flex items-center gap-1 text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded"
            >
              <Link2 className="w-3 h-3" />
              <span>{integration}</span>
            </div>
          ))}

          {integrationPreview.length > 2 && (
            <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
              +{integrationPreview.length - 2} more
            </div>
          )}

          {/* Compliance badges */}
          {complianceBadges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 text-xs text-gray-600 bg-green-50 px-2 py-1 rounded"
            >
              <Shield className="w-3 h-3" />
              <span>{badge.icon}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" className="flex-1 group">
          <Link href={detailUrl}>
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>

        {/* View count badge */}
        {tool.page_views && tool.page_views > 0 && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Eye className="w-3 h-3" />
            <span>{tool.page_views.toLocaleString()}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
