"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Top 16 integrations grouped by category
const INTEGRATION_OPTIONS = [
  {
    category: "HRIS & Payroll",
    integrations: [
      { value: "BambooHR", label: "BambooHR" },
      { value: "Workday", label: "Workday" },
      { value: "ADP", label: "ADP" },
      { value: "Gusto", label: "Gusto" },
    ],
  },
  {
    category: "Communication",
    integrations: [
      { value: "Slack", label: "Slack" },
      { value: "Microsoft Teams", label: "Microsoft Teams" },
      { value: "Google Workspace", label: "Google Workspace" },
      { value: "Zoom", label: "Zoom" },
    ],
  },
  {
    category: "Productivity",
    integrations: [
      { value: "Asana", label: "Asana" },
      { value: "Jira", label: "Jira" },
      { value: "Monday.com", label: "Monday.com" },
      { value: "Trello", label: "Trello" },
    ],
  },
  {
    category: "CRM & Support",
    integrations: [
      { value: "Salesforce", label: "Salesforce" },
      { value: "HubSpot", label: "HubSpot" },
      { value: "Zendesk", label: "Zendesk" },
      { value: "Intercom", label: "Intercom" },
    ],
  },
];

export function IntegrationFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current selections from URL (comma-separated)
  const currentIntegrations = searchParams.get("integrations")?.split(",") || [];

  const handleToggle = (integrationValue: string) => {
    const params = new URLSearchParams(searchParams);

    let newIntegrations: string[];
    if (currentIntegrations.includes(integrationValue)) {
      // Remove from selection
      newIntegrations = currentIntegrations.filter((i) => i !== integrationValue);
    } else {
      // Add to selection
      newIntegrations = [...currentIntegrations, integrationValue];
    }

    if (newIntegrations.length > 0) {
      params.set("integrations", newIntegrations.join(","));
    } else {
      params.delete("integrations");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">
        Required Integrations
      </h3>
      <p className="text-xs text-gray-500">
        Tools must integrate with ALL selected systems
      </p>
      <div className="space-y-4">
        {INTEGRATION_OPTIONS.map((group) => (
          <div key={group.category}>
            <h4 className="text-xs font-medium text-gray-700 mb-2">
              {group.category}
            </h4>
            <div className="space-y-2">
              {group.integrations.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`integration-${option.value}`}
                    checked={currentIntegrations.includes(option.value)}
                    onCheckedChange={() => handleToggle(option.value)}
                  />
                  <Label
                    htmlFor={`integration-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
