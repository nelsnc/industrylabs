"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { IntegrationOption } from "@/lib/airtable-helpers";

interface IntegrationFilterProps {
  availableIntegrations: IntegrationOption[];
}

export function IntegrationFilter({
  availableIntegrations,
}: IntegrationFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current selections from URL (comma-separated)
  const currentIntegrations = searchParams.get("integrations")?.split(",").filter(Boolean) || [];

  // Group integrations by category
  const grouped = availableIntegrations.reduce((acc, integration) => {
    const category = integration.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(integration);
    return acc;
  }, {} as Record<string, IntegrationOption[]>);

  const handleToggle = (integrationName: string) => {
    const params = new URLSearchParams(searchParams);

    let newIntegrations: string[];
    if (currentIntegrations.includes(integrationName)) {
      // Remove from selection
      newIntegrations = currentIntegrations.filter((i) => i !== integrationName);
    } else {
      // Add to selection
      newIntegrations = [...currentIntegrations, integrationName];
    }

    if (newIntegrations.length > 0) {
      params.set("integrations", newIntegrations.join(","));
    } else {
      params.delete("integrations");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // If no integrations available, show message
  if (availableIntegrations.length === 0) {
    return (
      <div className="space-y-3">
        <Label className="text-sm font-medium">Required Integrations</Label>
        <p className="text-sm text-gray-500 italic">
          No integration data available yet
        </p>
      </div>
    );
  }

  // Sort categories for consistent display
  const categoryOrder = ['HRIS & Payroll', 'ATS', 'Communication', 'Calendar', 'Job Boards', 'Other'];
  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label className="text-sm font-medium">Required Integrations</Label>
        <p className="text-xs text-gray-500">
          Tools must integrate with ALL selected systems
        </p>
      </div>

      {sortedCategories.map((category) => {
        const integrations = grouped[category];
        if (!integrations || integrations.length === 0) return null;

        return (
          <div key={category} className="space-y-2">
            {/* Category Header */}
            <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
              {category}
            </h4>

            {/* Integration Checkboxes */}
            <div className="space-y-2 pl-1">
              {integrations.map((integration) => {
                const isSelected = currentIntegrations.includes(integration.name);
                const isDisabled = integration.count === 0;

                return (
                  <div
                    key={integration.name}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`integration-${integration.name}`}
                      checked={isSelected}
                      onCheckedChange={() => handleToggle(integration.name)}
                      disabled={isDisabled}
                    />
                    <label
                      htmlFor={`integration-${integration.name}`}
                      className={cn(
                        "text-sm cursor-pointer flex-1",
                        isDisabled && "text-gray-400 cursor-not-allowed"
                      )}
                    >
                      {integration.name}
                      <span className="ml-1 text-xs text-gray-500">
                        ({integration.count})
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
