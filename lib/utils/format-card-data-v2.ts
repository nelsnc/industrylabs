/**
 * Card Data Formatting Utilities v2.0
 *
 * Purpose: Format tool data for horizontal pill-based card layout
 * Optimized for: B2B buyer scanning, <3 second comprehension
 *
 * Changes from v1:
 * - Horizontal pill format (not vertical list)
 * - Shorter text (scannable)
 * - Separate compliance icons from marketing badges
 * - Remove view count formatting
 */

export interface CardPill {
  text: string;
  icon?: string;
  variant: 'gray' | 'blue' | 'green' | 'amber';
}

/**
 * Format pricing for horizontal pill display
 * Examples:
 * - "£5K-25K/yr"
 * - "£15K+/yr"
 * - "Contact"
 */
export function formatCardPricingPill(
  pricingMin?: number,
  pricingMax?: number,
  currency: string = 'GBP'
): CardPill {
  const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€';

  if (!pricingMin && !pricingMax) {
    return {
      text: 'Contact for pricing',
      icon: '💰',
      variant: 'gray'
    };
  }

  const formatK = (num: number) => {
    if (num >= 1000) {
      return `${Math.round(num / 1000)}K`;
    }
    return num.toString();
  };

  if (pricingMin && pricingMax) {
    return {
      text: `${symbol}${formatK(pricingMin)}-${formatK(pricingMax)}/yr`,
      icon: '💰',
      variant: 'gray'
    };
  }

  if (pricingMin) {
    return {
      text: `${symbol}${formatK(pricingMin)}+/yr`,
      icon: '💰',
      variant: 'gray'
    };
  }

  return {
    text: `Up to ${symbol}${formatK(pricingMax!)}/yr`,
    icon: '💰',
    variant: 'gray'
  };
}

/**
 * Format company size for horizontal pill display
 * Examples:
 * - "1-50 employees"
 * - "51-500 employees"
 * - "500+ employees"
 */
export function formatCardCompanySizePill(
  companySizeFit?: string[]
): CardPill {
  if (!companySizeFit || companySizeFit.length === 0) {
    return {
      text: 'All company sizes',
      icon: '👥',
      variant: 'blue'
    };
  }

  // Parse size ranges
  const ranges = companySizeFit.map(size => {
    if (size === '500+') return { min: 500, max: Infinity };
    const [min, max] = size.split('-').map(s => parseInt(s.replace('+', '')));
    return { min, max: max || min };
  });

  // Find overall min and max
  const overallMin = Math.min(...ranges.map(r => r.min));
  const overallMax = Math.max(...ranges.map(r => r.max));

  if (overallMax === Infinity) {
    return {
      text: `${overallMin}+ employees`,
      icon: '👥',
      variant: 'blue'
    };
  }

  if (overallMin === overallMax) {
    return {
      text: `~${overallMin} employees`,
      icon: '👥',
      variant: 'blue'
    };
  }

  return {
    text: `${overallMin}-${overallMax} employees`,
    icon: '👥',
    variant: 'blue'
  };
}

/**
 * Format free trial for horizontal pill display
 * Examples:
 * - "14-day trial"
 * - "7-day trial"
 * - null (if no trial)
 */
export function formatCardFreeTrialPill(
  hasFreeTrial?: boolean,
  trialDays?: number
): CardPill | null {
  if (!hasFreeTrial) return null;

  const days = trialDays || 14; // Default to 14 if not specified

  return {
    text: `${days}-day trial`,
    icon: '✓',
    variant: 'green'
  };
}

/**
 * Get compliance icons for display
 * Returns array of { name, icon, color } objects
 * Max 3 displayed, rest shown as "+N"
 */
export interface ComplianceIcon {
  name: string;
  icon: string;
  color: string;
  tooltip: string;
}

export function getComplianceIcons(
  gdprCompliant?: boolean,
  eeocCompliant?: boolean,
  soc2Certified?: boolean,
  hipaaCompliant?: boolean,
  iso27001Certified?: boolean
): ComplianceIcon[] {
  const icons: ComplianceIcon[] = [];

  if (gdprCompliant) {
    icons.push({
      name: 'GDPR',
      icon: '🛡️',
      color: 'text-emerald-600',
      tooltip: 'GDPR Compliant (vendor-supplied)'
    });
  }

  if (eeocCompliant) {
    icons.push({
      name: 'EEOC',
      icon: '🛡️',
      color: 'text-blue-600',
      tooltip: 'EEOC Compliant (vendor-supplied)'
    });
  }

  if (soc2Certified) {
    icons.push({
      name: 'SOC2',
      icon: '🔒',
      color: 'text-purple-600',
      tooltip: 'SOC 2 Type II Certified'
    });
  }

  if (hipaaCompliant) {
    icons.push({
      name: 'HIPAA',
      icon: '🏥',
      color: 'text-red-600',
      tooltip: 'HIPAA Compliant'
    });
  }

  if (iso27001Certified) {
    icons.push({
      name: 'ISO27001',
      icon: '🌐',
      color: 'text-indigo-600',
      tooltip: 'ISO 27001 Certified'
    });
  }

  return icons;
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

/**
 * Rewrite descriptions to be benefit-first
 * This is a mapping function - actual rewrites done separately
 */
export function getBenefitDescription(
  toolName: string,
  originalDescription?: string
): string {
  // For now, return original
  // TODO: Replace with benefit-first copy per tool
  return originalDescription || 'AI-powered HR solution';
}
