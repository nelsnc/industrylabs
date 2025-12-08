// lib/utils/format-card-data-v4.ts
// VERSION 4.0 - Simplified data formatting (NO pill objects)
// Returns plain strings for icon + text display

import type { Tool } from '@/lib/airtable-helpers';

/**
 * Format pricing for display (plain string, not pill)
 * Examples:
 * - "From £4K/year"
 * - "From £12K/year"
 * - "Contact for pricing"
 */
export function formatPricing(tool: Tool): string {
  const min = tool.pricingAnnualMin;
  const max = tool.pricingAnnualMax;
  const currency = tool.pricingCurrency || "GBP";

  // No pricing data
  if (!min && !max) {
    return "Contact for pricing";
  }

  // Currency symbol
  const symbol = currency === "GBP" ? "£" : currency === "USD" ? "$" : "€";

  // Only min price available
  if (min && !max) {
    return `From ${symbol}${formatThousands(min)}/year`;
  }

  // Both min and max available
  if (min && max) {
    return `${symbol}${formatThousands(min)}-${formatThousands(max)}/year`;
  }

  // Only max available (rare)
  if (!min && max) {
    return `Up to ${symbol}${formatThousands(max)}/year`;
  }

  return "Contact for pricing";
}

/**
 * Format company size for display (plain string, not pill)
 * Examples:
 * - "1-50 employees"
 * - "51-200 employees"
 * - "1-500 employees"
 */
export function formatCompanySize(tool: Tool): string {
  const sizes = tool.idealCompanySize || [];

  if (sizes.length === 0) {
    return "All company sizes";
  }

  // Parse size ranges
  const ranges = sizes.map((size) => {
    if (size === "1-50") return { min: 1, max: 50 };
    if (size === "51-200") return { min: 51, max: 200 };
    if (size === "201-500") return { min: 201, max: 500 };
    if (size === "500+") return { min: 501, max: 5000 };
    return null;
  }).filter(Boolean);

  if (ranges.length === 0) {
    return "All company sizes";
  }

  // Find min and max across all ranges
  const min = Math.min(...ranges.map((r) => r!.min));
  const max = Math.max(...ranges.map((r) => r!.max));

  // Format output
  if (max >= 5000) {
    return `${min}+ employees`;
  }

  return `${min}-${max} employees`;
}

/**
 * Get compliance badges (array of strings)
 * Examples:
 * - ["GDPR", "EEOC", "SOC2"]
 * - ["GDPR", "SOC2", "ISO27001"]
 */
export function getComplianceBadges(tool: Tool): string[] {
  const badges: string[] = [];

  if (tool.gdprCompliant) badges.push("GDPR");
  if (tool.eeocCompliant) badges.push("EEOC");
  if (tool.soc2Certified) badges.push("SOC2");
  if (tool.hipaaCompliant) badges.push("HIPAA");
  if (tool.iso27001Certified) badges.push("ISO27001");

  return badges;
}

/**
 * Get category label (plain string)
 * Uses category field
 */
export function getCategoryLabel(tool: Tool): string {
  if (tool.category) {
    return tool.category;
  }

  return "AI Tool";
}

/**
 * Check if tool is Premium tier
 */
export function isPremium(tool: Tool): boolean {
  return tool.tags.includes("Premium");
}

/**
 * Get free trial info
 */
export function getTrialInfo(tool: Tool): {
  hasTrial: boolean;
  duration: number | null;
} {
  return {
    hasTrial: tool.freeTrialAvailable || false,
    duration: tool.freeTrialDurationDays || null,
  };
}

// Helper: Format thousands (4000 -> "4K", 12000 -> "12K")
function formatThousands(num: number): string {
  if (num >= 1000) {
    return `${Math.round(num / 1000)}K`;
  }
  return num.toString();
}

/**
 * Main function: Format complete tool data for V4.0 card
 */
export function formatToolCardData(tool: Tool) {
  const { hasTrial, duration } = getTrialInfo(tool);

  return {
    pricing: formatPricing(tool),
    companySize: formatCompanySize(tool),
    freeTrial: hasTrial,
    trialDuration: duration,
    compliance: getComplianceBadges(tool),
    category: getCategoryLabel(tool),
    isPremium: isPremium(tool),
  };
}
