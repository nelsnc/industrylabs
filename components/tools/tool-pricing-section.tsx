import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Check } from "lucide-react";
import Link from "next/link";
import { formatPricing } from "@/lib/utils/pricing-formatter";
import type { Tool } from "@/lib/airtable-helpers";

interface ToolPricingSectionProps {
  tool: Tool;
}

export function ToolPricingSection({ tool }: ToolPricingSectionProps) {
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
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price display */}
        {pricingData ? (
          <>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {pricingData.range || "Contact for pricing"}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {pricingData.period}
              </div>
            </div>

            {/* Free trial badge */}
            {pricingData.hasTrial && (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                <Check className="w-3 h-3 mr-1" />
                {pricingData.trialInfo}
              </Badge>
            )}
          </>
        ) : (
          <div className="text-gray-600">Contact vendor for pricing</div>
        )}

        <Separator />

        {/* Pricing details */}
        <div className="space-y-3 text-sm">
          {/* Pricing model */}
          {tool.pricing && (
            <div className="flex justify-between">
              <span className="text-gray-600">Model:</span>
              <span className="font-medium text-gray-900">{tool.pricing}</span>
            </div>
          )}

          {/* Setup fee */}
          {tool.setupFee !== undefined && tool.setupFee !== null && (
            <div className="flex justify-between">
              <span className="text-gray-600">Setup fee:</span>
              <span className="font-medium text-gray-900">
                {pricingData?.currencySymbol}
                {tool.setupFee.toLocaleString()}
                {tool.setupFeeIncluded && " (included)"}
              </span>
            </div>
          )}

          {/* Contract options */}
          {tool.contractLengthOptions && tool.contractLengthOptions.length > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Contract:</span>
              <span className="font-medium text-gray-900">
                {tool.contractLengthOptions.join(", ")}
              </span>
            </div>
          )}
        </div>

        {/* Pricing notes */}
        {tool.pricingNotes && (
          <>
            <Separator />
            <p className="text-sm text-gray-600">{tool.pricingNotes}</p>
          </>
        )}

        {/* CTA */}
        <Button asChild className="w-full" size="lg">
          <Link
            href={tool.websiteUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Pricing Details
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full">
          <Link href="/request">Get Personalized Recommendations</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
