import { Badge } from "@/components/ui/badge";
import { Building2, Globe2, Clock, Users } from "lucide-react";
import { estimateTimelineForBuyer } from "@/lib/utils/timeline-estimator";
import type { Tool } from "@/lib/airtable-helpers";

interface ToolQuickFactsProps {
  tool: Tool;
  buyerCompanySize?: number;
}

export function ToolQuickFacts({ tool, buyerCompanySize }: ToolQuickFactsProps) {
  // Get personalized timeline if buyer size provided
  const timelineEstimate = buyerCompanySize
    ? estimateTimelineForBuyer(
        {
          implementation_timeline_weeks_min: tool.implementationTimelineWeeksMin,
          implementation_timeline_weeks_max: tool.implementationTimelineWeeksMax,
          ideal_company_size: tool.idealCompanySize,
        },
        buyerCompanySize
      )
    : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-lg">
      {/* Company Size */}
      {tool.idealCompanySize && tool.idealCompanySize.length > 0 && (
        <div className="flex items-start gap-3">
          <Building2 className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-gray-900">
              Company Size
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {tool.idealCompanySize.map((size) => (
                <Badge key={size} variant="secondary" className="mr-1 mb-1">
                  {size}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regions */}
      {tool.supportedRegions && tool.supportedRegions.length > 0 && (
        <div className="flex items-start gap-3">
          <Globe2 className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-gray-900">Regions</div>
            <div className="text-sm text-gray-600 mt-1">
              {tool.supportedRegions.slice(0, 3).join(", ")}
              {tool.supportedRegions.length > 3 &&
                ` +${tool.supportedRegions.length - 3}`}
            </div>
          </div>
        </div>
      )}

      {/* Implementation Timeline */}
      {(tool.implementationTimelineDisplay || timelineEstimate) && (
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-gray-900">
              Implementation
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {timelineEstimate ? (
                <>
                  <div className="font-medium">
                    {timelineEstimate.estimatedWeeks} weeks for you
                  </div>
                  <div className="text-xs text-gray-500">
                    ({timelineEstimate.rangeDisplay})
                  </div>
                </>
              ) : (
                tool.implementationTimelineDisplay
              )}
            </div>
          </div>
        </div>
      )}

      {/* Best For - using category */}
      <div className="flex items-start gap-3">
        <Users className="w-5 h-5 text-gray-500 mt-0.5" />
        <div>
          <div className="text-sm font-semibold text-gray-900">Best For</div>
          <div className="text-sm text-gray-600 mt-1">
            {tool.category || "HR & Talent teams"}
          </div>
        </div>
      </div>
    </div>
  );
}
