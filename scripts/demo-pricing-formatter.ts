/**
 * Demo script for pricing formatter utility
 *
 * Shows example outputs for different pricing scenarios.
 *
 * Run with: npx tsx scripts/demo-pricing-formatter.ts
 */

import { formatPricing } from '../lib/utils/pricing-formatter';

console.log('🎯 Pricing Formatter Demo\n');
console.log('='.repeat(80));

// Example 1: Standard Range Pricing
console.log('\n📊 Example 1: Standard Range Pricing (Per User)');
console.log('-'.repeat(80));
const example1 = formatPricing({
  pricing_annual_min: 5000,
  pricing_annual_max: 15000,
  pricing_currency: "GBP",
  pricing_model: "Per User",
  pricing_notes: "Based on company size",
  free_trial_available: true,
  free_trial_duration_days: 14
});
console.log('Input:');
console.log('  Min: £5,000, Max: £15,000, Currency: GBP');
console.log('  Model: Per User, Trial: 14 days');
console.log('\nOutput:');
console.log(`  Display:  "${example1.display}"`);
console.log(`  Range:    "${example1.range}"`);
console.log(`  Period:   "${example1.period}"`);
console.log(`  Trial:    "${example1.trialInfo}"`);
console.log(`  Notes:    "${example1.notes}"`);

// Example 2: Contact for Pricing
console.log('\n📊 Example 2: Contact for Pricing (Custom)');
console.log('-'.repeat(80));
const example2 = formatPricing({
  pricing_annual_min: null,
  pricing_annual_max: null,
  pricing_currency: "USD",
  pricing_model: "Custom",
  pricing_notes: "Enterprise pricing available",
  free_trial_available: false,
  free_trial_duration_days: null
});
console.log('Input:');
console.log('  Min: null, Max: null, Currency: USD');
console.log('  Model: Custom, Trial: No');
console.log('\nOutput:');
console.log(`  Display:  "${example2.display}"`);
console.log(`  Range:    ${example2.range}`);
console.log(`  Period:   "${example2.period}"`);
console.log(`  Trial:    ${example2.trialInfo}`);
console.log(`  Notes:    "${example2.notes}"`);

// Example 3: Flat Rate with Trial
console.log('\n📊 Example 3: Flat Rate with Trial');
console.log('-'.repeat(80));
const example3 = formatPricing({
  pricing_annual_min: 12000,
  pricing_annual_max: 12000,
  pricing_currency: "EUR",
  pricing_model: "Flat Rate",
  pricing_notes: null,
  free_trial_available: true,
  free_trial_duration_days: 30
});
console.log('Input:');
console.log('  Min: €12,000, Max: €12,000, Currency: EUR');
console.log('  Model: Flat Rate, Trial: 30 days');
console.log('\nOutput:');
console.log(`  Display:  "${example3.display}"`);
console.log(`  Range:    "${example3.range}"`);
console.log(`  Period:   "${example3.period}"`);
console.log(`  Trial:    "${example3.trialInfo}"`);
console.log(`  Notes:    ${example3.notes}`);

// Example 4: Per Hire Pricing
console.log('\n📊 Example 4: Per Hire Pricing (From)');
console.log('-'.repeat(80));
const example4 = formatPricing({
  pricing_annual_min: 100,
  pricing_annual_max: null,
  pricing_currency: "USD",
  pricing_model: "Per Hire",
  pricing_notes: "Charged per successful placement",
  free_trial_available: true,
  free_trial_duration_days: null
});
console.log('Input:');
console.log('  Min: $100, Max: null, Currency: USD');
console.log('  Model: Per Hire, Trial: Available (no duration)');
console.log('\nOutput:');
console.log(`  Display:  "${example4.display}"`);
console.log(`  Range:    "${example4.range}"`);
console.log(`  Period:   "${example4.period}"`);
console.log(`  Trial:    "${example4.trialInfo}"`);
console.log(`  Notes:    "${example4.notes}"`);

// Example 5: Large Numbers
console.log('\n📊 Example 5: Large Numbers (Enterprise)');
console.log('-'.repeat(80));
const example5 = formatPricing({
  pricing_annual_min: 125000,
  pricing_annual_max: 350000,
  pricing_currency: "GBP",
  pricing_model: "Flat Rate",
  pricing_notes: "Includes premium support and customization",
  free_trial_available: false,
  free_trial_duration_days: null
});
console.log('Input:');
console.log('  Min: £125,000, Max: £350,000, Currency: GBP');
console.log('  Model: Flat Rate, Trial: No');
console.log('\nOutput:');
console.log(`  Display:  "${example5.display}"`);
console.log(`  Range:    "${example5.range}"`);
console.log(`  Period:   "${example5.period}"`);
console.log(`  Trial:    ${example5.trialInfo}`);
console.log(`  Notes:    "${example5.notes}"`);

console.log('\n' + '='.repeat(80));
console.log('✅ All examples completed successfully!');
