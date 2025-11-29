/**
 * Unit tests for pricing formatter utility
 *
 * Tests all edge cases, currency handling, pricing models, and error scenarios.
 */

import { describe, it, expect, vi } from 'vitest';
import { formatPricing, type PricingData } from '../pricing-formatter';

describe('formatPricing', () => {
  // Test 1: Range pricing (both min and max)
  it('formats range pricing correctly', () => {
    const result = formatPricing({
      pricing_annual_min: 5000,
      pricing_annual_max: 10000,
      pricing_currency: "GBP",
      pricing_model: "Per User",
      free_trial_available: false,
    });

    expect(result.display).toBe("£5,000-£10,000/year");
    expect(result.range).toBe("£5,000-£10,000");
    expect(result.period).toBe("per user/year");
    expect(result.model).toBe("Per User");
    expect(result.currency).toBe("GBP");
    expect(result.currencySymbol).toBe("£");
    expect(result.hasTrial).toBe(false);
    expect(result.trialInfo).toBeNull();
    expect(result.notes).toBeNull();
  });

  // Test 2: From pricing (only min)
  it('formats "from" pricing when only min exists', () => {
    const result = formatPricing({
      pricing_annual_min: 5000,
      pricing_annual_max: null,
      pricing_currency: "USD",
      pricing_model: "Flat Rate",
      free_trial_available: false,
    });

    expect(result.display).toBe("From $5,000/year");
    expect(result.range).toBe("$5,000");
    expect(result.period).toBe("per year");
    expect(result.currencySymbol).toBe("$");
  });

  // Test 3: Up to pricing (only max)
  it('formats "up to" pricing when only max exists', () => {
    const result = formatPricing({
      pricing_annual_min: null,
      pricing_annual_max: 15000,
      pricing_currency: "EUR",
      pricing_model: "Per Hire",
      free_trial_available: false,
    });

    expect(result.display).toBe("Up to €15,000/year");
    expect(result.range).toBe("€15,000");
    expect(result.period).toBe("per hire");
    expect(result.currencySymbol).toBe("€");
  });

  // Test 4: Contact for pricing (neither)
  it('displays "Contact for pricing" when no prices exist', () => {
    const result = formatPricing({
      pricing_annual_min: null,
      pricing_annual_max: null,
      pricing_currency: "USD",
      pricing_model: "Custom",
      free_trial_available: false,
    });

    expect(result.display).toBe("Contact for pricing");
    expect(result.range).toBeNull();
    expect(result.period).toBe("custom pricing");
  });

  // Test 5: GBP currency symbol
  it('uses correct GBP currency symbol', () => {
    const result = formatPricing({
      pricing_annual_min: 1000,
      pricing_annual_max: 2000,
      pricing_currency: "GBP",
      pricing_model: "Flat Rate",
      free_trial_available: false,
    });

    expect(result.currencySymbol).toBe("£");
    expect(result.currency).toBe("GBP");
    expect(result.display).toContain("£");
  });

  // Test 6: USD currency symbol
  it('uses correct USD currency symbol', () => {
    const result = formatPricing({
      pricing_annual_min: 1000,
      pricing_annual_max: 2000,
      pricing_currency: "USD",
      pricing_model: "Flat Rate",
      free_trial_available: false,
    });

    expect(result.currencySymbol).toBe("$");
    expect(result.currency).toBe("USD");
    expect(result.display).toContain("$");
  });

  // Test 7: EUR currency symbol
  it('uses correct EUR currency symbol', () => {
    const result = formatPricing({
      pricing_annual_min: 1000,
      pricing_annual_max: 2000,
      pricing_currency: "EUR",
      pricing_model: "Flat Rate",
      free_trial_available: false,
    });

    expect(result.currencySymbol).toBe("€");
    expect(result.currency).toBe("EUR");
    expect(result.display).toContain("€");
  });

  // Test 8: Per User model appends to period
  it('formats "Per User" model correctly', () => {
    const result = formatPricing({
      pricing_annual_min: 5000,
      pricing_annual_max: 10000,
      pricing_currency: "GBP",
      pricing_model: "Per User",
      free_trial_available: false,
    });

    expect(result.period).toBe("per user/year");
    expect(result.model).toBe("Per User");
  });

  // Test 9: Per Hire model appends to period
  it('formats "Per Hire" model correctly', () => {
    const result = formatPricing({
      pricing_annual_min: 100,
      pricing_annual_max: 500,
      pricing_currency: "USD",
      pricing_model: "Per Hire",
      free_trial_available: false,
    });

    expect(result.period).toBe("per hire");
    expect(result.model).toBe("Per Hire");
  });

  // Test 10: Flat Rate model uses "per year"
  it('formats "Flat Rate" model correctly', () => {
    const result = formatPricing({
      pricing_annual_min: 12000,
      pricing_annual_max: 12000,
      pricing_currency: "GBP",
      pricing_model: "Flat Rate",
      free_trial_available: false,
    });

    expect(result.period).toBe("per year");
    expect(result.model).toBe("Flat Rate");
  });

  // Test 11: Custom model uses "custom pricing"
  it('formats "Custom" model correctly', () => {
    const result = formatPricing({
      pricing_annual_min: null,
      pricing_annual_max: null,
      pricing_currency: "USD",
      pricing_model: "Custom",
      free_trial_available: false,
    });

    expect(result.period).toBe("custom pricing");
    expect(result.model).toBe("Custom");
  });

  // Test 12: Free trial with days
  it('formats free trial with specific days', () => {
    const result = formatPricing({
      pricing_annual_min: 5000,
      pricing_annual_max: 10000,
      pricing_currency: "GBP",
      pricing_model: "Per User",
      free_trial_available: true,
      free_trial_duration_days: 14,
    });

    expect(result.hasTrial).toBe(true);
    expect(result.trialInfo).toBe("14-day free trial");
  });

  // Test 13: Free trial without days
  it('formats free trial without specific duration', () => {
    const result = formatPricing({
      pricing_annual_min: 5000,
      pricing_annual_max: 10000,
      pricing_currency: "GBP",
      pricing_model: "Per User",
      free_trial_available: true,
      free_trial_duration_days: null,
    });

    expect(result.hasTrial).toBe(true);
    expect(result.trialInfo).toBe("Free trial available");
  });

  // Test 14: No free trial
  it('handles no free trial correctly', () => {
    const result = formatPricing({
      pricing_annual_min: 5000,
      pricing_annual_max: 10000,
      pricing_currency: "GBP",
      pricing_model: "Per User",
      free_trial_available: false,
      free_trial_duration_days: null,
    });

    expect(result.hasTrial).toBe(false);
    expect(result.trialInfo).toBeNull();
  });

  // Test 15: Large numbers format with commas
  it('formats large numbers with comma separators', () => {
    const result = formatPricing({
      pricing_annual_min: 125000,
      pricing_annual_max: 350000,
      pricing_currency: "USD",
      pricing_model: "Flat Rate",
      free_trial_available: false,
    });

    expect(result.display).toBe("$125,000-$350,000/year");
    expect(result.range).toBe("$125,000-$350,000");
  });

  // Test 16: Same min and max shows single price
  it('shows single price when min equals max', () => {
    const result = formatPricing({
      pricing_annual_min: 12000,
      pricing_annual_max: 12000,
      pricing_currency: "EUR",
      pricing_model: "Flat Rate",
      free_trial_available: false,
    });

    expect(result.display).toBe("€12,000/year");
    expect(result.range).toBe("€12,000");
  });

  // Test 17: Null pricing_notes returns null
  it('returns null for null pricing notes', () => {
    const result = formatPricing({
      pricing_annual_min: 5000,
      pricing_annual_max: 10000,
      pricing_currency: "GBP",
      pricing_model: "Per User",
      pricing_notes: null,
      free_trial_available: false,
    });

    expect(result.notes).toBeNull();
  });

  // Test 18: Empty string pricing_notes returns null
  it('returns null for empty pricing notes', () => {
    const result = formatPricing({
      pricing_annual_min: 5000,
      pricing_annual_max: 10000,
      pricing_currency: "GBP",
      pricing_model: "Per User",
      pricing_notes: "   ",
      free_trial_available: false,
    });

    expect(result.notes).toBeNull();
  });

  // Test 19: Valid pricing_notes is preserved
  it('preserves valid pricing notes', () => {
    const result = formatPricing({
      pricing_annual_min: 5000,
      pricing_annual_max: 10000,
      pricing_currency: "GBP",
      pricing_model: "Per User",
      pricing_notes: "Volume discounts available",
      free_trial_available: false,
    });

    expect(result.notes).toBe("Volume discounts available");
  });

  // Test 20: Zero values treated as null
  it('treats zero prices as null', () => {
    const result = formatPricing({
      pricing_annual_min: 0,
      pricing_annual_max: 0,
      pricing_currency: "USD",
      pricing_model: "Custom",
      free_trial_available: false,
    });

    expect(result.display).toBe("Contact for pricing");
    expect(result.range).toBeNull();
  });

  // Test 21: Zero min with valid max
  it('treats zero min as null with valid max', () => {
    const result = formatPricing({
      pricing_annual_min: 0,
      pricing_annual_max: 10000,
      pricing_currency: "GBP",
      pricing_model: "Per User",
      free_trial_available: false,
    });

    expect(result.display).toBe("Up to £10,000/year");
    expect(result.range).toBe("£10,000");
  });

  // Test 22: Negative values logged and treated as null
  it('handles negative min price', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = formatPricing({
      pricing_annual_min: -5000,
      pricing_annual_max: 10000,
      pricing_currency: "USD",
      pricing_model: "Flat Rate",
      free_trial_available: false,
    });

    expect(result.display).toBe("Up to $10,000/year");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Negative price value detected: -5000")
    );

    consoleWarnSpy.mockRestore();
  });

  // Test 23: Negative max price
  it('handles negative max price', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = formatPricing({
      pricing_annual_min: 5000,
      pricing_annual_max: -10000,
      pricing_currency: "EUR",
      pricing_model: "Per User",
      free_trial_available: false,
    });

    expect(result.display).toBe("From €5,000/year");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Negative price value detected: -10000")
    );

    consoleWarnSpy.mockRestore();
  });

  // Test 24: Min > Max swaps values
  it('swaps min and max when min is greater', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = formatPricing({
      pricing_annual_min: 15000,
      pricing_annual_max: 5000,
      pricing_currency: "GBP",
      pricing_model: "Per User",
      free_trial_available: false,
    });

    expect(result.display).toBe("£5,000-£15,000/year");
    expect(result.range).toBe("£5,000-£15,000");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Min price (15000) is greater than max price (5000)")
    );

    consoleWarnSpy.mockRestore();
  });

  // Test 25: Complete example with all fields
  it('handles complete pricing data with all fields', () => {
    const result = formatPricing({
      pricing_annual_min: 5000,
      pricing_annual_max: 15000,
      pricing_currency: "GBP",
      pricing_model: "Per User",
      pricing_notes: "Based on company size",
      free_trial_available: true,
      free_trial_duration_days: 14,
    });

    expect(result.display).toBe("£5,000-£15,000/year");
    expect(result.range).toBe("£5,000-£15,000");
    expect(result.period).toBe("per user/year");
    expect(result.model).toBe("Per User");
    expect(result.currency).toBe("GBP");
    expect(result.currencySymbol).toBe("£");
    expect(result.hasTrial).toBe(true);
    expect(result.trialInfo).toBe("14-day free trial");
    expect(result.notes).toBe("Based on company size");
  });

  // Test 26: Free trial with 0 days
  it('treats 0-day trial as no specific duration', () => {
    const result = formatPricing({
      pricing_annual_min: 5000,
      pricing_annual_max: 10000,
      pricing_currency: "USD",
      pricing_model: "Flat Rate",
      free_trial_available: true,
      free_trial_duration_days: 0,
    });

    expect(result.hasTrial).toBe(true);
    expect(result.trialInfo).toBe("Free trial available");
  });

  // Test 27: Free trial with 30 days
  it('formats 30-day trial correctly', () => {
    const result = formatPricing({
      pricing_annual_min: 8000,
      pricing_annual_max: 12000,
      pricing_currency: "EUR",
      pricing_model: "Per User",
      free_trial_available: true,
      free_trial_duration_days: 30,
    });

    expect(result.trialInfo).toBe("30-day free trial");
  });

  // Test 28: Undefined pricing fields
  it('handles undefined pricing fields', () => {
    const result = formatPricing({
      pricing_annual_min: undefined,
      pricing_annual_max: undefined,
      pricing_currency: "GBP",
      pricing_model: "Custom",
      pricing_notes: undefined,
      free_trial_available: false,
      free_trial_duration_days: undefined,
    });

    expect(result.display).toBe("Contact for pricing");
    expect(result.range).toBeNull();
    expect(result.notes).toBeNull();
    expect(result.trialInfo).toBeNull();
  });

  // Test 29: Very large numbers
  it('formats very large numbers correctly', () => {
    const result = formatPricing({
      pricing_annual_min: 1000000,
      pricing_annual_max: 5000000,
      pricing_currency: "USD",
      pricing_model: "Flat Rate",
      free_trial_available: false,
    });

    expect(result.display).toBe("$1,000,000-$5,000,000/year");
    expect(result.range).toBe("$1,000,000-$5,000,000");
  });

  // Test 30: Small numbers (under 1000)
  it('formats small numbers without commas', () => {
    const result = formatPricing({
      pricing_annual_min: 500,
      pricing_annual_max: 999,
      pricing_currency: "EUR",
      pricing_model: "Per Hire",
      free_trial_available: false,
    });

    expect(result.display).toBe("€500-€999/year");
    expect(result.range).toBe("€500-€999");
  });
});
