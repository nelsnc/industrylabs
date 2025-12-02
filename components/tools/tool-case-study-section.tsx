import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Building2, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { Tool } from "@/lib/airtable-helpers";

interface ToolCaseStudySectionProps {
  tool: Tool;
}

export function ToolCaseStudySection({ tool }: ToolCaseStudySectionProps) {
  if (!tool.caseStudyUrl) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Case Study</h2>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Customer Success Story
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Company details */}
          <div className="grid grid-cols-2 gap-4">
            {tool.caseStudyCompanySize && (
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-gray-500 mt-1" />
                <div>
                  <div className="text-xs text-gray-600">Company Size</div>
                  <div className="font-semibold">
                    {tool.caseStudyCompanySize.toLocaleString()} employees
                  </div>
                </div>
              </div>
            )}

            {tool.caseStudyIndustry && (
              <div>
                <div className="text-xs text-gray-600">Industry</div>
                <div className="font-semibold">{tool.caseStudyIndustry}</div>
              </div>
            )}

            {tool.caseStudyImplementationWeeks && (
              <div>
                <div className="text-xs text-gray-600">Implementation Time</div>
                <div className="font-semibold">
                  {tool.caseStudyImplementationWeeks} weeks
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          {tool.caseStudyResults && (
            <div>
              <div className="text-sm font-semibold text-gray-900 mb-2">
                Results
              </div>
              <div className="text-sm text-gray-700 whitespace-pre-line">
                {tool.caseStudyResults}
              </div>
            </div>
          )}

          {/* CTA */}
          <Button asChild variant="outline" className="w-full">
            <Link
              href={tool.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Full Case Study
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Notable customers */}
      {tool.notableCustomers && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-semibold text-gray-900 mb-2">
            Notable Customers
          </div>
          <div className="text-sm text-gray-600">{tool.notableCustomers}</div>
        </div>
      )}
    </section>
  );
}
