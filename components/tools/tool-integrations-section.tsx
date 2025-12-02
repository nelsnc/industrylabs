import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Link2, Zap, FileText } from "lucide-react";
import type { ToolIntegration } from "@/lib/types/integration";

interface ToolIntegrationsSectionProps {
  integrations: ToolIntegration[];
  otherIntegrations?: string | null;
}

const QualityIcon = {
  Native: CheckCircle2,
  API: Link2,
  Zapier: Zap,
  Manual: FileText,
  "Not Supported": null,
};

const QualityColor = {
  Native: "bg-green-100 text-green-700 border-green-300",
  API: "bg-blue-100 text-blue-700 border-blue-300",
  Zapier: "bg-orange-100 text-orange-700 border-orange-300",
  Manual: "bg-gray-100 text-gray-700 border-gray-300",
  "Not Supported": "bg-red-100 text-red-700 border-red-300",
};

export function ToolIntegrationsSection({
  integrations,
  otherIntegrations,
}: ToolIntegrationsSectionProps) {
  // Group by quality
  const native = integrations.filter((i) => i.quality === "Native");
  const api = integrations.filter((i) => i.quality === "API");
  const zapier = integrations.filter((i) => i.quality === "Zapier");
  const manual = integrations.filter((i) => i.quality === "Manual");

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Integrations</h2>

      {/* Summary badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {native.length > 0 && (
          <Badge variant="outline" className={QualityColor.Native}>
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {native.length} Native
          </Badge>
        )}
        {api.length > 0 && (
          <Badge variant="outline" className={QualityColor.API}>
            <Link2 className="w-3 h-3 mr-1" />
            {api.length} API
          </Badge>
        )}
        {zapier.length > 0 && (
          <Badge variant="outline" className={QualityColor.Zapier}>
            <Zap className="w-3 h-3 mr-1" />
            {zapier.length} via Zapier
          </Badge>
        )}
      </div>

      {/* Detailed list */}
      <Accordion type="single" collapsible className="w-full">
        {/* Native integrations */}
        {native.length > 0 && (
          <AccordionItem value="native">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Native Integrations ({native.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {native.map((int) => (
                  <div
                    key={int.integrationName}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium text-sm">
                      {int.integrationName}
                    </div>
                    {int.notes && (
                      <div className="text-xs text-gray-500 mt-1">
                        {int.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* API integrations */}
        {api.length > 0 && (
          <AccordionItem value="api">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-blue-600" />
                <span>API Integrations ({api.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {api.map((int) => (
                  <div
                    key={int.integrationName}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium text-sm">
                      {int.integrationName}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Requires API setup
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Zapier integrations */}
        {zapier.length > 0 && (
          <AccordionItem value="zapier">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-600" />
                <span>Via Zapier ({zapier.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {zapier.map((int) => (
                  <div
                    key={int.integrationName}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="font-medium text-sm">
                      {int.integrationName}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Via Zapier/Make
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>

      {/* Other integrations (long-tail) */}
      {otherIntegrations && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-semibold text-gray-900 mb-2">
            Additional Integrations
          </div>
          <div className="text-sm text-gray-600">{otherIntegrations}</div>
        </div>
      )}
    </section>
  );
}
