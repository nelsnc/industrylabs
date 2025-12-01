/**
 * Timeline Estimator Unit Tests
 *
 * Comprehensive test suite with 25+ tests covering all edge cases.
 * Target: 100% code coverage (statements, branches, functions, lines)
 */

import { describe, it, expect } from "vitest";
import {
  estimateTimelineForBuyer,
  isInIdealRange,
  getMaxIdealSize,
  formatRangeDisplay,
  SIZE_BUCKETS,
} from "../timeline-estimator";

describe("Timeline Estimator", () => {
  describe("SIZE_BUCKETS constant", () => {
    it("should have correct bucket definitions", () => {
      expect(SIZE_BUCKETS["1-50"]).toEqual({ min: 1, max: 50 });
      expect(SIZE_BUCKETS["51-200"]).toEqual({ min: 51, max: 200 });
      expect(SIZE_BUCKETS["201-500"]).toEqual({ min: 201, max: 500 });
      expect(SIZE_BUCKETS["500+"]).toEqual({ min: 501, max: 10000 });
    });

    it("should have exactly 4 size buckets", () => {
      expect(Object.keys(SIZE_BUCKETS)).toHaveLength(4);
    });

    it("should have no overlapping ranges", () => {
      const buckets = [
        SIZE_BUCKETS["1-50"],
        SIZE_BUCKETS["51-200"],
        SIZE_BUCKETS["201-500"],
        SIZE_BUCKETS["500+"],
      ];

      // Verify each bucket's max is less than the next bucket's min
      for (let i = 0; i < buckets.length - 1; i++) {
        expect(buckets[i].max).toBeLessThan(buckets[i + 1].min);
      }
    });
  });

  describe("isInIdealRange()", () => {
    it("should return true when buyer is in single ideal bucket", () => {
      expect(isInIdealRange(100, ["51-200"])).toBe(true);
    });

    it("should return true when buyer is in one of multiple buckets", () => {
      expect(isInIdealRange(180, ["51-200", "201-500"])).toBe(true);
      expect(isInIdealRange(300, ["51-200", "201-500"])).toBe(true);
    });

    it("should return false when buyer is below all ideal buckets", () => {
      expect(isInIdealRange(30, ["51-200", "201-500"])).toBe(false);
    });

    it("should return false when buyer is above all ideal buckets", () => {
      expect(isInIdealRange(600, ["51-200", "201-500"])).toBe(false);
    });

    it("should return false when idealSizeBuckets is empty", () => {
      expect(isInIdealRange(100, [])).toBe(false);
    });

    it("should return false when idealSizeBuckets is null", () => {
      expect(isInIdealRange(100, null)).toBe(false);
    });

    it("should return false when idealSizeBuckets is undefined", () => {
      expect(isInIdealRange(100, undefined)).toBe(false);
    });

    it("should handle boundary values correctly", () => {
      // Lower boundary
      expect(isInIdealRange(51, ["51-200"])).toBe(true);
      expect(isInIdealRange(50, ["51-200"])).toBe(false);

      // Upper boundary
      expect(isInIdealRange(200, ["51-200"])).toBe(true);
      expect(isInIdealRange(201, ["51-200"])).toBe(false);
    });

    it("should handle unknown bucket names gracefully", () => {
      // Test with invalid bucket name
      expect(isInIdealRange(100, ["unknown-bucket"])).toBe(false);
      expect(isInIdealRange(100, ["51-200", "invalid-range", "201-500"])).toBe(true);
    });
  });

  describe("getMaxIdealSize()", () => {
    it("should return max from single bucket", () => {
      expect(getMaxIdealSize(["51-200"])).toBe(200);
    });

    it("should return highest max from multiple buckets", () => {
      expect(getMaxIdealSize(["1-50", "51-200", "201-500"])).toBe(500);
      expect(getMaxIdealSize(["500+", "1-50"])).toBe(10000);
    });

    it("should return 0 for empty array", () => {
      expect(getMaxIdealSize([])).toBe(0);
    });

    it("should return 0 for null", () => {
      expect(getMaxIdealSize(null)).toBe(0);
    });

    it("should return 0 for undefined", () => {
      expect(getMaxIdealSize(undefined)).toBe(0);
    });

    it("should handle unknown bucket names gracefully", () => {
      // Unknown bucket should default to 0
      expect(getMaxIdealSize(["unknown-bucket"])).toBe(0);
      // Mix of valid and invalid should return max of valid buckets
      expect(getMaxIdealSize(["51-200", "invalid-bucket", "201-500"])).toBe(500);
    });
  });

  describe("formatRangeDisplay()", () => {
    it("should format both min and max", () => {
      expect(formatRangeDisplay(2, 4)).toBe("2-4 weeks typical");
      expect(formatRangeDisplay(1, 3)).toBe("1-3 weeks typical");
    });

    it("should format min only", () => {
      expect(formatRangeDisplay(2, null)).toBe("From 2 weeks");
      expect(formatRangeDisplay(5, undefined)).toBe("From 5 weeks");
    });

    it("should format max only", () => {
      expect(formatRangeDisplay(null, 4)).toBe("Up to 4 weeks");
      expect(formatRangeDisplay(undefined, 6)).toBe("Up to 6 weeks");
    });

    it("should show contact message when both null", () => {
      expect(formatRangeDisplay(null, null)).toBe("Contact vendor for timeline");
      expect(formatRangeDisplay(undefined, undefined)).toBe("Contact vendor for timeline");
    });
  });

  describe("estimateTimelineForBuyer()", () => {
    describe("Category A: Buyer in ideal range", () => {
      it("should return average when buyer is in ideal range", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: ["51-200", "201-500"],
          },
          150 // Buyer size in "51-200" bucket
        );

        expect(result.estimatedWeeks).toBe(3); // (2+4)/2 = 3
        expect(result.confidence).toBe("high");
        expect(result.reasoning).toContain("matches this tool's ideal customer profile");
      });

      it("should round average to nearest integer", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 5,
            ideal_company_size: ["51-200"],
          },
          100
        );

        expect(result.estimatedWeeks).toBe(4); // Math.round((2+5)/2) = Math.round(3.5) = 4
      });
    });

    describe("Category B: Buyer larger than ideal", () => {
      it("should add 1 week when buyer is larger than ideal range", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: ["51-200"], // Max = 200
          },
          450 // Buyer larger than 200
        );

        expect(result.estimatedWeeks).toBe(5); // max + 1 = 4 + 1
        expect(result.confidence).toBe("medium");
        expect(result.reasoning).toContain("larger than typical customers");
      });

      it("should handle buyer much larger than ideal", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: ["1-50"],
          },
          5000
        );

        expect(result.estimatedWeeks).toBe(5);
        expect(result.confidence).toBe("medium");
      });
    });

    describe("Category C: Buyer smaller than ideal", () => {
      it("should use min when buyer is smaller than ideal range", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: ["201-500"],
          },
          100 // Buyer smaller than 201
        );

        expect(result.estimatedWeeks).toBe(2); // min
        expect(result.confidence).toBe("medium");
        expect(result.reasoning).toContain("smaller than typical customers");
      });

      it("should handle buyer much smaller than ideal", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 3,
            implementation_timeline_weeks_max: 6,
            ideal_company_size: ["500+"],
          },
          10
        );

        expect(result.estimatedWeeks).toBe(3);
        expect(result.confidence).toBe("medium");
      });
    });

    describe("Category D: Edge cases - Invalid inputs", () => {
      it("should handle invalid buyer size (zero)", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: ["51-200"],
          },
          0 // Invalid
        );

        expect(result.estimatedWeeks).toBeNull();
        expect(result.confidence).toBe("low");
        expect(result.reasoning).toContain("Invalid company size");
      });

      it("should handle invalid buyer size (negative)", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: ["51-200"],
          },
          -10 // Invalid
        );

        expect(result.estimatedWeeks).toBeNull();
        expect(result.confidence).toBe("low");
        expect(result.reasoning).toContain("Invalid company size");
      });

      it("should handle extremely large buyer size", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: ["51-200"],
          },
          100000 // Too large
        );

        expect(result.estimatedWeeks).toBeNull();
        expect(result.confidence).toBe("low");
        expect(result.reasoning).toContain("Company size too large");
      });
    });

    describe("Category E: Edge cases - Missing timeline data", () => {
      it("should handle missing timeline data (both null)", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: null,
            implementation_timeline_weeks_max: null,
            ideal_company_size: ["51-200"],
          },
          150
        );

        expect(result.estimatedWeeks).toBeNull();
        expect(result.confidence).toBe("low");
        expect(result.rangeDisplay).toBe("Contact vendor for timeline");
        expect(result.reasoning).toContain("Timeline data not available");
      });

      it("should handle only min timeline provided", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: null,
            ideal_company_size: ["51-200"],
          },
          150
        );

        expect(result.estimatedWeeks).toBe(2);
        expect(result.confidence).toBe("medium");
        expect(result.rangeDisplay).toBe("From 2 weeks");
      });

      it("should handle only max timeline provided", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: null,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: ["51-200"],
          },
          150
        );

        expect(result.estimatedWeeks).toBe(4);
        expect(result.confidence).toBe("medium");
        expect(result.rangeDisplay).toBe("Up to 4 weeks");
      });
    });

    describe("Category F: Hours calculation", () => {
      it("should calculate total hours correctly", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: ["51-200"],
            it_hours_required: 10,
            hr_admin_hours_required: 5,
            training_hours_admin: 3,
            training_hours_enduser: 2,
          },
          150
        );

        expect(result.totalHoursRequired).toBe(20); // 10+5+3+2
      });

      it("should handle missing hours data (all null)", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: ["51-200"],
            it_hours_required: null,
            hr_admin_hours_required: null,
            training_hours_admin: null,
            training_hours_enduser: null,
          },
          150
        );

        expect(result.totalHoursRequired).toBeNull();
      });

      it("should handle partial hours data", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: ["51-200"],
            it_hours_required: 10,
            hr_admin_hours_required: null,
            training_hours_admin: 5,
            training_hours_enduser: null,
          },
          150
        );

        expect(result.totalHoursRequired).toBe(15); // 10+0+5+0
      });
    });

    describe("Category G: Prerequisites and delays", () => {
      it("should pass through prerequisites and delays", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: ["51-200"],
            implementation_prerequisites: "Active HRIS required",
            common_implementation_delays: "Data migration complexity",
          },
          150
        );

        expect(result.prerequisites).toBe("Active HRIS required");
        expect(result.commonDelays).toBe("Data migration complexity");
      });

      it("should handle null prerequisites and delays", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: ["51-200"],
            implementation_prerequisites: null,
            common_implementation_delays: null,
          },
          150
        );

        expect(result.prerequisites).toBeNull();
        expect(result.commonDelays).toBeNull();
      });
    });

    describe("Category H: No ideal size defined", () => {
      it("should handle no ideal size with buyer outside any range", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 2,
            implementation_timeline_weeks_max: 4,
            ideal_company_size: null,
          },
          150
        );

        // With no ideal size, buyer can't be in range, and maxIdealSize = 0
        // buyer (150) > maxIdealSize (0) is true, so treated as larger
        // But the condition checks (maxIdealSize > 0), which is false
        // So it falls through to the else case (smaller than ideal)
        expect(result.estimatedWeeks).toBe(2); // min
        expect(result.confidence).toBe("medium");
      });
    });

    describe("Category I: Comprehensive integration tests", () => {
      it("should provide complete estimate for typical scenario", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 3,
            implementation_timeline_weeks_max: 6,
            ideal_company_size: ["51-200", "201-500"],
            it_hours_required: 20,
            hr_admin_hours_required: 15,
            training_hours_admin: 8,
            training_hours_enduser: 4,
            implementation_prerequisites: "Active HRIS system with API access",
            common_implementation_delays: "Data migration issues, stakeholder approvals",
          },
          250 // In ideal range
        );

        expect(result.estimatedWeeks).toBe(5); // Math.round((3+6)/2) = 5
        expect(result.confidence).toBe("high");
        expect(result.reasoning).toContain("matches this tool's ideal customer profile");
        expect(result.totalHoursRequired).toBe(47); // 20+15+8+4
        expect(result.prerequisites).toBe("Active HRIS system with API access");
        expect(result.commonDelays).toBe("Data migration issues, stakeholder approvals");
        expect(result.rangeDisplay).toBe("3-6 weeks typical");
      });

      it("should handle edge case with single-week timeline", () => {
        const result = estimateTimelineForBuyer(
          {
            implementation_timeline_weeks_min: 1,
            implementation_timeline_weeks_max: 1,
            ideal_company_size: ["1-50"],
          },
          25
        );

        expect(result.estimatedWeeks).toBe(1);
        expect(result.confidence).toBe("high");
        expect(result.rangeDisplay).toBe("1-1 weeks typical");
      });
    });
  });
});
