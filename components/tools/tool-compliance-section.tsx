import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Tool } from "@/lib/airtable-helpers";

interface ToolComplianceSectionProps {
  tool: Tool;
}

const complianceItems = [
  {
    key: "gdprCompliant" as const,
    label: "GDPR",
    description: "EU data protection",
  },
  {
    key: "eeocCompliant" as const,
    label: "EEOC",
    description: "US equal opportunity",
  },
  {
    key: "soc2Certified" as const,
    label: "SOC 2 Type II",
    description: "Security audit",
  },
  {
    key: "hipaaCompliant" as const,
    label: "HIPAA",
    description: "Healthcare data",
  },
  {
    key: "iso27001Certified" as const,
    label: "ISO 27001",
    description: "Information security",
  },
];

export function ToolComplianceSection({ tool }: ToolComplianceSectionProps) {
  const hasCompliance = complianceItems.some((item) => tool[item.key] === true);

  if (!hasCompliance) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Compliance & Security
      </h2>

      {/* Disclaimer */}
      <Alert className="mb-4">
        <AlertCircle className="w-4 h-4" />
        <AlertDescription className="text-xs">
          All compliance information is vendor-supplied and represents vendor
          attestation only. We do not provide independent verification or legal
          advice. Consult your legal team before making compliance decisions.
        </AlertDescription>
      </Alert>

      {/* Compliance badges */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {complianceItems.map((item) => {
          const isCompliant = tool[item.key] === true;
          if (!isCompliant) return null;

          return (
            <div
              key={item.key}
              className="flex items-center gap-3 p-4 border border-green-200 bg-green-50 rounded-lg"
            >
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold text-sm text-green-900">
                  {item.label}
                </div>
                <div className="text-xs text-green-700">{item.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Documentation link */}
      {tool.complianceDocumentationUrl && (
        <Link
          href={tool.complianceDocumentationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          View compliance documentation
          <ExternalLink className="w-3 h-3" />
        </Link>
      )}

      {/* Additional notes */}
      {tool.complianceNotes && (
        <div className="mt-4 text-sm text-gray-600">{tool.complianceNotes}</div>
      )}
    </section>
  );
}
