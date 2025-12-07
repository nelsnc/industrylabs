/**
 * Utility functions for formatting tool card data
 * Created for TASK-117: Improve Tool Card Design
 */

/**
 * Format pricing range for card display
 * Examples:
 *   £15,000-£60,000 → £15K-60K
 *   £5,000-£10,000 → £5K-10K
 */
export function formatCardPricing(
  min: number | undefined,
  max: number | undefined
): string {
  if (!min && !max) return "Contact for pricing";

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${Math.round(num / 1000)}K`;
    }
    return num.toString();
  };

  if (min && max) {
    return `£${formatNumber(min)}-${formatNumber(max)}`;
  }
  if (min) {
    return `From £${formatNumber(min)}`;
  }
  if (max) {
    return `Up to £${formatNumber(max)}`;
  }
  return "Contact for pricing";
}

/**
 * Format company size for card display
 * Examples:
 *   ["51-200", "201-500"] → "51-500 employees"
 *   ["1-50"] → "1-50 employees"
 */
export function formatCardCompanySize(sizes: string[] | undefined): string {
  if (!sizes || sizes.length === 0) return "All company sizes";

  // Extract min and max from size ranges
  const ranges = sizes.map((size) => {
    const parts = size.split("-").map((s) => s.replace("+", ""));
    return {
      min: parseInt(parts[0], 10),
      max: parts[1] ? parseInt(parts[1], 10) : Infinity,
    };
  });

  const min = Math.min(...ranges.map((r) => r.min));
  const max = Math.max(...ranges.map((r) => r.max));

  if (max === Infinity) {
    return `${min}+ employees`;
  }
  return `${min}-${max} employees`;
}

/**
 * Get top compliance badges (max 2) for display
 */
export function getTopComplianceBadges(
  compliance: string[] | undefined
): string[] {
  if (!compliance || compliance.length === 0) return [];
  return compliance.slice(0, 2);
}

/**
 * Get count of additional compliance badges
 */
export function getAdditionalComplianceCount(
  compliance: string[] | undefined
): number {
  if (!compliance || compliance.length <= 2) return 0;
  return compliance.length - 2;
}

/**
 * Format free trial text for display
 */
export function formatFreeTrial(
  hasTrial: boolean | undefined,
  trialDays: number | undefined
): string | null {
  if (!hasTrial) return null;
  if (trialDays) {
    return `${trialDays}-day free trial`;
  }
  return "Free trial available";
}

/**
 * Format view count with social proof
 */
export function formatViewCount(views: number | undefined): string | null {
  if (!views || views === 0) return null;

  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  }
  return `${views} views`;
}

/**
 * Truncate description to max length with ellipsis
 */
export function truncateDescription(
  description: string | undefined,
  maxLength: number = 150
): string {
  if (!description) return "";
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength).trim() + "...";
}
