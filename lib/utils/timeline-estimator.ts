/**
 * Timeline Estimator Utility
 *
 * Personalizes implementation timeline estimates based on buyer company size
 * and tool's ideal customer profile.
 *
 * Usage:
 *   const estimate = estimateTimelineForBuyer(toolData, buyerCompanySize);
 *   console.log(estimate.rangeDisplay); // "2-4 weeks typical"
 *   console.log(estimate.estimatedWeeks); // 3
 */

/**
 * Timeline data from Airtable TOOLS table
 */
export interface TimelineData {
  implementation_timeline_weeks_min?: number | null;
  implementation_timeline_weeks_max?: number | null;
  ideal_company_size?: string[] | null; // ["51-200", "201-500"]
  it_hours_required?: number | null;
  hr_admin_hours_required?: number | null;
  training_hours_admin?: number | null;
  training_hours_enduser?: number | null;
  implementation_prerequisites?: string | null;
  common_implementation_delays?: string | null;
}

/**
 * Estimated timeline result with reasoning
 */
export interface TimelineEstimate {
  estimatedWeeks: number | null;
  confidence: "high" | "medium" | "low";
  reasoning: string;
  totalHoursRequired: number | null; // Sum of IT + HR + Training hours
  prerequisites: string | null;
  commonDelays: string | null;
  rangeDisplay: string; // "2-4 weeks typical", "Contact vendor", etc.
}

/**
 * Company size bucket definitions
 * Used to determine if buyer is in tool's ideal range
 */
export interface SizeBucket {
  min: number;
  max: number;
}

/**
 * Size bucket mapping
 * Keys match Airtable's ideal_company_size options
 */
export const SIZE_BUCKETS: Record<string, SizeBucket> = {
  "1-50": { min: 1, max: 50 },
  "51-200": { min: 51, max: 200 },
  "201-500": { min: 201, max: 500 },
  "500+": { min: 501, max: 10000 }, // Upper bound for practical purposes
};

/**
 * Checks if buyer company size falls within tool's ideal size buckets
 *
 * @param buyerSize - Exact employee count
 * @param idealSizeBuckets - Array of size ranges from TOOLS.ideal_company_size
 * @returns true if buyer falls in ANY of the ideal buckets
 *
 * @example
 * isInIdealRange(150, ["51-200", "201-500"]) // true (in "51-200")
 * isInIdealRange(450, ["51-200"]) // false (above max of 200)
 */
export function isInIdealRange(
  buyerSize: number,
  idealSizeBuckets: string[] | null | undefined
): boolean {
  if (!idealSizeBuckets || idealSizeBuckets.length === 0) {
    return false; // No ideal range specified = assume not in range
  }

  return idealSizeBuckets.some((bucketName) => {
    const bucket = SIZE_BUCKETS[bucketName];
    if (!bucket) {
      console.warn(`[timeline-estimator] Unknown size bucket: ${bucketName}`);
      return false;
    }
    return buyerSize >= bucket.min && buyerSize <= bucket.max;
  });
}

/**
 * Gets the maximum company size from ideal_company_size buckets
 * Used to determine if buyer is "larger than ideal"
 *
 * @param idealSizeBuckets - Array of size ranges
 * @returns Maximum employee count from all buckets, or 0 if none
 *
 * @example
 * getMaxIdealSize(["51-200", "201-500"]) // 500
 * getMaxIdealSize(["1-50"]) // 50
 * getMaxIdealSize([]) // 0
 */
export function getMaxIdealSize(
  idealSizeBuckets: string[] | null | undefined
): number {
  if (!idealSizeBuckets || idealSizeBuckets.length === 0) {
    return 0;
  }

  return Math.max(
    ...idealSizeBuckets.map((bucketName) => SIZE_BUCKETS[bucketName]?.max || 0)
  );
}

/**
 * Formats timeline range for display
 *
 * @param min - Minimum weeks (or null)
 * @param max - Maximum weeks (or null)
 * @returns Formatted string like "2-4 weeks typical" or "Contact vendor for timeline"
 *
 * @example
 * formatRangeDisplay(2, 4) // "2-4 weeks typical"
 * formatRangeDisplay(2, null) // "From 2 weeks"
 * formatRangeDisplay(null, 4) // "Up to 4 weeks"
 * formatRangeDisplay(null, null) // "Contact vendor for timeline"
 */
export function formatRangeDisplay(
  min: number | null | undefined,
  max: number | null | undefined
): string {
  if (min && max) {
    return `${min}-${max} weeks typical`;
  } else if (min && !max) {
    return `From ${min} weeks`;
  } else if (!min && max) {
    return `Up to ${max} weeks`;
  } else {
    return "Contact vendor for timeline";
  }
}

/**
 * Estimates implementation timeline for a specific buyer based on their company size
 *
 * Logic:
 * 1. Validates buyer company size (must be 1-50000)
 * 2. If no timeline data exists → return null with "Contact vendor" message
 * 3. If buyer size is in tool's ideal range → return average (mid-point)
 * 4. If buyer is larger than ideal range → return max + 1 week (longer timeline)
 * 5. If buyer is smaller than ideal range → return min (faster timeline)
 *
 * @param toolData - Timeline data from TOOLS table
 * @param buyerCompanySize - Exact employee count (e.g., 200)
 * @returns TimelineEstimate with personalized estimate and reasoning
 *
 * @example
 * const estimate = estimateTimelineForBuyer({
 *   implementation_timeline_weeks_min: 2,
 *   implementation_timeline_weeks_max: 4,
 *   ideal_company_size: ["51-200", "201-500"],
 *   it_hours_required: 10,
 *   hr_admin_hours_required: 5,
 * }, 150);
 *
 * console.log(estimate.estimatedWeeks); // 3 (average of 2-4)
 * console.log(estimate.confidence); // "high"
 * console.log(estimate.reasoning); // "Your company size matches..."
 */
export function estimateTimelineForBuyer(
  toolData: TimelineData,
  buyerCompanySize: number
): TimelineEstimate {
  const min = toolData.implementation_timeline_weeks_min ?? null;
  const max = toolData.implementation_timeline_weeks_max ?? null;
  const idealSize = toolData.ideal_company_size ?? null;

  // Calculate total hours required
  const itHours = toolData.it_hours_required ?? 0;
  const hrHours = toolData.hr_admin_hours_required ?? 0;
  const trainingAdminHours = toolData.training_hours_admin ?? 0;
  const trainingEnduserHours = toolData.training_hours_enduser ?? 0;

  const totalHours = itHours + hrHours + trainingAdminHours + trainingEnduserHours;
  const totalHoursRequired = totalHours > 0 ? totalHours : null;

  const prerequisites = toolData.implementation_prerequisites ?? null;
  const commonDelays = toolData.common_implementation_delays ?? null;
  const rangeDisplay = formatRangeDisplay(min, max);

  // Validation: Invalid company size
  if (buyerCompanySize <= 0) {
    return {
      estimatedWeeks: null,
      confidence: "low",
      reasoning: "Invalid company size provided. Please enter a valid employee count.",
      totalHoursRequired,
      prerequisites,
      commonDelays,
      rangeDisplay,
    };
  }

  // Validation: Company size too large
  if (buyerCompanySize > 50000) {
    return {
      estimatedWeeks: null,
      confidence: "low",
      reasoning: "Company size too large for automated estimation. Please contact vendor for enterprise timeline.",
      totalHoursRequired,
      prerequisites,
      commonDelays,
      rangeDisplay,
    };
  }

  // Edge case: No timeline data available
  if (min === null && max === null) {
    return {
      estimatedWeeks: null,
      confidence: "low",
      reasoning: "Timeline data not available. Contact vendor for implementation estimate.",
      totalHoursRequired,
      prerequisites,
      commonDelays,
      rangeDisplay,
    };
  }

  // Edge case: Only min provided
  if (min !== null && max === null) {
    return {
      estimatedWeeks: min,
      confidence: "medium",
      reasoning: "Estimated timeline based on typical implementation. Contact vendor for personalized estimate.",
      totalHoursRequired,
      prerequisites,
      commonDelays,
      rangeDisplay,
    };
  }

  // Edge case: Only max provided
  if (min === null && max !== null) {
    return {
      estimatedWeeks: max,
      confidence: "medium",
      reasoning: "Estimated timeline based on typical implementation. Contact vendor for personalized estimate.",
      totalHoursRequired,
      prerequisites,
      commonDelays,
      rangeDisplay,
    };
  }

  // Both min and max exist - proceed with size-based estimation
  const buyerInIdealRange = isInIdealRange(buyerCompanySize, idealSize);
  const maxIdealSize = getMaxIdealSize(idealSize);

  if (buyerInIdealRange) {
    // Buyer is in ideal range - use average (mid-point)
    const average = Math.round((min! + max!) / 2);
    return {
      estimatedWeeks: average,
      confidence: "high",
      reasoning: "Your company size matches this tool's ideal customer profile. Timeline estimate is highly accurate.",
      totalHoursRequired,
      prerequisites,
      commonDelays,
      rangeDisplay,
    };
  } else if (buyerCompanySize > maxIdealSize && maxIdealSize > 0) {
    // Buyer is larger than ideal range - add 1 week
    const estimate = max! + 1;
    return {
      estimatedWeeks: estimate,
      confidence: "medium",
      reasoning: "Your company is larger than typical customers - implementation may take longer due to scale and complexity.",
      totalHoursRequired,
      prerequisites,
      commonDelays,
      rangeDisplay,
    };
  } else {
    // Buyer is smaller than ideal range - use min
    return {
      estimatedWeeks: min!,
      confidence: "medium",
      reasoning: "Your company is smaller than typical customers - implementation may be faster with fewer integration points.",
      totalHoursRequired,
      prerequisites,
      commonDelays,
      rangeDisplay,
    };
  }
}
