import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, AlertCircle } from "lucide-react";
import { estimateTimelineForBuyer } from "@/lib/utils/timeline-estimator";
import type { Tool } from "@/lib/airtable-helpers";

interface ToolImplementationSectionProps {
  tool: Tool;
  buyerCompanySize?: number;
}

export function ToolImplementationSection({
  tool,
  buyerCompanySize,
}: ToolImplementationSectionProps) {
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

  const totalHours =
    (tool.itHoursRequired || 0) +
    (tool.hrAdminHoursRequired || 0) +
    (tool.trainingHoursAdmin || 0) +
    (tool.trainingHoursEnduser || 0);

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Implementation</h2>

      {/* Timeline summary */}
      {timelineEstimate && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-blue-900">
                Estimated timeline for your company size
              </div>
              <div className="text-2xl font-bold text-blue-900 mt-2">
                {timelineEstimate.estimatedWeeks} weeks
              </div>
              <div className="text-sm text-blue-700 mt-1">
                {timelineEstimate.reasoning}
              </div>
              <Badge
                variant="outline"
                className="mt-2 bg-white border-blue-300 text-blue-700"
              >
                {timelineEstimate.confidence} confidence
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Detailed breakdown */}
      <Accordion type="single" collapsible className="w-full">
        {/* Effort required */}
        {totalHours > 0 && (
          <AccordionItem value="effort">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Effort Required</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="text-sm text-gray-600">
                  <strong>Total: {totalHours} hours</strong> across all teams
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {tool.itHoursRequired && tool.itHoursRequired > 0 && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">IT Team:</span>
                      <span className="font-semibold">
                        {tool.itHoursRequired}h
                      </span>
                    </div>
                  )}

                  {tool.hrAdminHoursRequired &&
                    tool.hrAdminHoursRequired > 0 && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">
                          HR Admin:
                        </span>
                        <span className="font-semibold">
                          {tool.hrAdminHoursRequired}h
                        </span>
                      </div>
                    )}

                  {tool.trainingHoursAdmin && tool.trainingHoursAdmin > 0 && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">
                        Admin Training:
                      </span>
                      <span className="font-semibold">
                        {tool.trainingHoursAdmin}h
                      </span>
                    </div>
                  )}

                  {tool.trainingHoursEnduser &&
                    tool.trainingHoursEnduser > 0 && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">
                          End-user Training:
                        </span>
                        <span className="font-semibold">
                          {tool.trainingHoursEnduser}h
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Prerequisites */}
        {tool.implementationPrerequisites && (
          <AccordionItem value="prerequisites">
            <AccordionTrigger>Prerequisites</AccordionTrigger>
            <AccordionContent>
              <div className="text-sm text-gray-700 whitespace-pre-line pt-2">
                {tool.implementationPrerequisites}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Common delays */}
        {tool.commonImplementationDelays && (
          <AccordionItem value="delays">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Common Delays</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-sm text-gray-700 whitespace-pre-line pt-2">
                {tool.commonImplementationDelays}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </section>
  );
}
