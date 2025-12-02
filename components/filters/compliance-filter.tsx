"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const COMPLIANCE_OPTIONS = [
  {
    value: "GDPR",
    label: "GDPR",
    description: "EU data protection regulation",
  },
  {
    value: "EEOC",
    label: "EEOC",
    description: "US equal employment compliance",
  },
  {
    value: "SOC2",
    label: "SOC 2",
    description: "Security & data handling certification",
  },
  {
    value: "HIPAA",
    label: "HIPAA",
    description: "Healthcare data protection (US)",
  },
  {
    value: "ISO27001",
    label: "ISO 27001",
    description: "Information security management",
  },
];

export function ComplianceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current selections from URL (comma-separated)
  const currentCompliance = searchParams.get("compliance")?.split(",") || [];

  const handleToggle = (complianceValue: string) => {
    const params = new URLSearchParams(searchParams);

    let newCompliance: string[];
    if (currentCompliance.includes(complianceValue)) {
      // Remove from selection
      newCompliance = currentCompliance.filter((c) => c !== complianceValue);
    } else {
      // Add to selection
      newCompliance = [...currentCompliance, complianceValue];
    }

    if (newCompliance.length > 0) {
      params.set("compliance", newCompliance.join(","));
    } else {
      params.delete("compliance");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">
        Compliance & Certifications
      </h3>
      <p className="text-xs text-gray-500">
        Tools must meet ALL selected requirements
      </p>
      <div className="space-y-3">
        {COMPLIANCE_OPTIONS.map((option) => (
          <div key={option.value} className="flex items-start space-x-2">
            <Checkbox
              id={`compliance-${option.value}`}
              checked={currentCompliance.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
              className="mt-0.5"
            />
            <div className="flex-1">
              <Label
                htmlFor={`compliance-${option.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {option.label}
              </Label>
              <p className="text-xs text-gray-500 mt-0.5">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
