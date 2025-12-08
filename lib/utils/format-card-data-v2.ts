/**
 * Card Data Formatting Utilities v3.0
 *
 * Purpose: Format tool data as plain text for simplified card layout
 * Optimized for: Professional B2B aesthetic, minimal visual styling
 *
 * Changes from v2.0:
 * - Plain text formatters (no pill objects)
 * - No emoji icons
 * - Simple string returns
 * - Clean typography focus
 */

/**
 * Format pricing as plain text for metadata line
 * Example: "£5K-25K/year"
 */
export function formatPricingText(
  pricingMin?: number,
  pricingMax?: number,
  currency: string = 'GBP'
): string {
  const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';

  if (!pricingMin && !pricingMax) {
    return 'Contact for pricing';
  }

  const formatK = (num: number) => {
    if (num >= 1000) return `${Math.round(num / 1000)}K`;
    return num.toString();
  };

  if (pricingMin && pricingMax) {
    return `${symbol}${formatK(pricingMin)}-${formatK(pricingMax)}/year`;
  }

  if (pricingMin) {
    return `${symbol}${formatK(pricingMin)}+/year`;
  }

  return `Up to ${symbol}${formatK(pricingMax!)}/year`;
}

/**
 * Format company size as plain text
 * Example: "1-200 employees"
 */
export function formatCompanySizeText(companySizeFit?: string[]): string {
  if (!companySizeFit || companySizeFit.length === 0) {
    return 'All company sizes';
  }

  const ranges = companySizeFit.map(size => {
    if (size === '500+') return { min: 500, max: Infinity };
    const [min, max] = size.split('-').map(s => parseInt(s.replace('+', '')));
    return { min, max: max || min };
  });

  const overallMin = Math.min(...ranges.map(r => r.min));
  const overallMax = Math.max(...ranges.map(r => r.max));

  if (overallMax === Infinity) {
    return `${overallMin}+ employees`;
  }

  if (overallMin === overallMax) {
    return `~${overallMin} employees`;
  }

  return `${overallMin}-${overallMax} employees`;
}

/**
 * Format free trial as plain text
 * Example: "7-day trial"
 */
export function formatFreeTrialText(
  hasFreeTrial?: boolean,
  trialDays?: number
): string | null {
  if (!hasFreeTrial) return null;
  const days = trialDays || 14;
  return `${days}-day trial`;
}

/**
 * Get compliance list as plain text array
 * Example: ["GDPR", "EEOC", "SOC2"]
 */
export function getComplianceList(
  gdprCompliant?: boolean,
  eeocCompliant?: boolean,
  soc2Certified?: boolean,
  hipaaCompliant?: boolean,
  iso27001Certified?: boolean
): string[] {
  const list: string[] = [];

  if (gdprCompliant) list.push('GDPR');
  if (eeocCompliant) list.push('EEOC');
  if (soc2Certified) list.push('SOC2');
  if (hipaaCompliant) list.push('HIPAA');
  if (iso27001Certified) list.push('ISO27001');

  return list;
}

/**
 * Get category display text from use cases
 * Examples:
 * - "Recruiting • ATS"
 * - "Performance Management"
 * - "HR Analytics"
 */
export function getCategoryLabel(
  useCases?: string[],
  primaryVertical?: string
): string {
  if (!useCases || useCases.length === 0) {
    return primaryVertical || 'HR Tools';
  }

  // Map use cases to readable labels
  const labelMap: Record<string, string> = {
    'recruiting': 'Recruiting • ATS',
    'onboarding': 'Onboarding',
    'performance': 'Performance Management',
    'engagement': 'Employee Engagement',
    'analytics': 'HR Analytics'
  };

  // Use first use case
  const firstUseCase = useCases[0].toLowerCase();
  return labelMap[firstUseCase] || useCases[0];
}
