/**
 * Pricing Formatter Utility
 *
 * Formats raw pricing data from Airtable into user-friendly display strings.
 * Handles currency symbols, number formatting, pricing models, and free trials.
 *
 * @module lib/utils/pricing-formatter
 */

/**
 * Raw pricing data from Airtable TOOLS table
 */
export interface PricingData {
  /** Minimum annual price */
  pricing_annual_min?: number | null;
  /** Maximum annual price */
  pricing_annual_max?: number | null;
  /** Currency for pricing */
  pricing_currency: "GBP" | "USD" | "EUR";
  /** Pricing model/structure */
  pricing_model: "Per User" | "Per Hire" | "Flat Rate" | "Custom";
  /** Additional pricing notes */
  pricing_notes?: string | null;
  /** Whether free trial is available */
  free_trial_available: boolean;
  /** Duration of free trial in days */
  free_trial_duration_days?: number | null;
}

/**
 * Formatted pricing output for display
 */
export interface FormattedPricing {
  /** Primary display string (e.g., "£5,000-£10,000/year") */
  display: string;
  /** Price range only (e.g., "£5,000-£10,000") or null */
  range: string | null;
  /** Pricing period (e.g., "per user/year") */
  period: string;
  /** Pricing model */
  model: string;
  /** Currency code */
  currency: string;
  /** Currency symbol */
  currencySymbol: string;
  /** Whether free trial is available */
  hasTrial: boolean;
  /** Free trial information string or null */
  trialInfo: string | null;
  /** Additional pricing notes or null */
  notes: string | null;
}

/**
 * Currency symbol mapping
 */
const CURRENCY_SYMBOLS: Record<string, string> = {
  GBP: "£",
  USD: "$",
  EUR: "€",
};

/**
 * Format a number with comma separators
 *
 * @param num - Number to format
 * @returns Formatted number string with commas
 */
function formatNumber(num: number): string {
  return num.toLocaleString('en-GB');
}

/**
 * Normalize a price value
 *
 * Handles edge cases:
 * - Treats 0 as null (no pricing, not free)
 * - Treats negative values as null and logs warning
 * - Returns null for null/undefined
 *
 * @param value - Price value to normalize
 * @returns Normalized value or null
 */
function normalizePrice(value: number | null | undefined): number | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (value === 0) {
    return null;
  }

  if (value < 0) {
    console.warn(`[pricing-formatter] Negative price value detected: ${value}. Treating as null.`);
    return null;
  }

  return value;
}

/**
 * Get the pricing period string based on pricing model
 *
 * @param model - Pricing model
 * @returns Period string (e.g., "per user/year")
 */
function getPeriodString(model: string): string {
  switch (model) {
    case "Per User":
      return "per user/year";
    case "Per Hire":
      return "per hire";
    case "Flat Rate":
      return "per year";
    case "Custom":
      return "custom pricing";
    default:
      return "per year";
  }
}

/**
 * Format free trial information
 *
 * @param available - Whether free trial is available
 * @param days - Duration in days
 * @returns Formatted trial info or null
 */
function formatTrialInfo(available: boolean, days: number | null | undefined): string | null {
  if (!available) {
    return null;
  }

  if (days && days > 0) {
    return `${days}-day free trial`;
  }

  return "Free trial available";
}

/**
 * Format pricing data into user-friendly display strings
 *
 * Handles all edge cases including:
 * - Range pricing (both min and max)
 * - From pricing (only min)
 * - Up to pricing (only max)
 * - Contact for pricing (neither)
 * - Currency symbols and formatting
 * - Pricing model integration
 * - Free trial information
 *
 * @param data - Raw pricing data from Airtable
 * @returns Formatted pricing object ready for display
 *
 * @example
 * ```typescript
 * const pricing = formatPricing({
 *   pricing_annual_min: 5000,
 *   pricing_annual_max: 10000,
 *   pricing_currency: "GBP",
 *   pricing_model: "Per User",
 *   pricing_notes: "Volume discounts available",
 *   free_trial_available: true,
 *   free_trial_duration_days: 14
 * });
 * // Result:
 * // {
 * //   display: "£5,000-£10,000/year",
 * //   range: "£5,000-£10,000",
 * //   period: "per user/year",
 * //   ...
 * // }
 * ```
 */
export function formatPricing(data: PricingData): FormattedPricing {
  // Normalize prices
  let min = normalizePrice(data.pricing_annual_min);
  let max = normalizePrice(data.pricing_annual_max);

  // Handle min > max case
  if (min !== null && max !== null && min > max) {
    console.warn(`[pricing-formatter] Min price (${min}) is greater than max price (${max}). Swapping values.`);
    [min, max] = [max, min];
  }

  // Get currency symbol
  const currencySymbol = CURRENCY_SYMBOLS[data.pricing_currency] || "$";
  const period = getPeriodString(data.pricing_model);
  const trialInfo = formatTrialInfo(data.free_trial_available, data.free_trial_duration_days);

  // Normalize notes (convert empty string to null)
  const notes = data.pricing_notes?.trim() || null;

  // Build display string and range
  let display: string;
  let range: string | null;

  if (min !== null && max !== null) {
    if (min === max) {
      // Same min and max = single price
      const formattedPrice = `${currencySymbol}${formatNumber(min)}`;
      range = formattedPrice;
      display = `${formattedPrice}/year`;
    } else {
      // Range pricing
      range = `${currencySymbol}${formatNumber(min)}-${currencySymbol}${formatNumber(max)}`;
      display = `${range}/year`;
    }
  } else if (min !== null) {
    // Only min exists
    range = `${currencySymbol}${formatNumber(min)}`;
    display = `From ${range}/year`;
  } else if (max !== null) {
    // Only max exists
    range = `${currencySymbol}${formatNumber(max)}`;
    display = `Up to ${range}/year`;
  } else {
    // Neither exists
    range = null;
    display = "Contact for pricing";
  }

  return {
    display,
    range,
    period,
    model: data.pricing_model,
    currency: data.pricing_currency,
    currencySymbol,
    hasTrial: data.free_trial_available,
    trialInfo,
    notes,
  };
}
