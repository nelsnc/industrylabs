/**
 * Task 3: Integration Test - Pricing Formatter with Real Data
 *
 * End-to-end test using actual Airtable TOOLS records with v2.3 fields.
 * Tests the formatPricing() utility function with real data.
 *
 * Run with: DEBUG_AIRTABLE=false npx tsx scripts/test-pricing-formatter-integration.ts
 */

import { getAllRecords } from '../lib/airtable';
import { formatPricing, type PricingData } from '../lib/utils/pricing-formatter';

interface ToolFields {
  tool_name: string;
  pricing_annual_min?: number;
  pricing_annual_max?: number;
  pricing_currency?: 'GBP' | 'USD' | 'EUR';
  pricing_model?: 'Per User' | 'Per Hire' | 'Flat Rate' | 'Custom';
  pricing_notes?: string;
  free_trial_available?: boolean;
  free_trial_duration_days?: number;
}

async function runIntegrationTest() {
  console.log('🧪 Integration Test: Pricing Formatter with Real Airtable Data');
  console.log('='.repeat(80));
  console.log('');

  try {
    // Fetch all TOOLS records
    const tools = await getAllRecords<ToolFields>('TOOLS');
    console.log(`✅ Fetched ${tools.length} TOOLS from Airtable\n`);

    // Filter tools that have pricing data (any of the v2.3 pricing fields)
    const toolsWithPricing = tools.filter((tool) => {
      const fields = tool.fields;
      return (
        fields.pricing_annual_min !== undefined ||
        fields.pricing_annual_max !== undefined ||
        fields.pricing_currency !== undefined ||
        fields.pricing_model !== undefined
      );
    });

    console.log(`📊 Found ${toolsWithPricing.length} tools with v2.3 pricing data populated\n`);

    if (toolsWithPricing.length === 0) {
      console.log('⚠️  No tools found with pricing data.');
      console.log('   This likely means the test TOOLS record from seed-test-data-v2-3.ts');
      console.log('   was not created or does not have pricing fields populated.\n');
      process.exit(1);
    }

    let testsPassed = 0;
    let testsFailed = 0;

    // Test formatPricing() with each tool
    console.log('Testing formatPricing() with real tool data:\n');
    console.log('='.repeat(80));

    for (const tool of toolsWithPricing) {
      const fields = tool.fields;

      console.log(`\n🛠️  Tool: ${fields.tool_name}`);
      console.log('-'.repeat(80));

      // Build PricingData object from Airtable fields
      const pricingData: PricingData = {
        pricing_annual_min: fields.pricing_annual_min ?? null,
        pricing_annual_max: fields.pricing_annual_max ?? null,
        pricing_currency: fields.pricing_currency ?? 'GBP',
        pricing_model: fields.pricing_model ?? 'Per User',
        pricing_notes: fields.pricing_notes ?? null,
        free_trial_available: fields.free_trial_available ?? false,
        free_trial_duration_days: fields.free_trial_duration_days ?? null,
      };

      console.log('Input Data:');
      console.log(`  Min: ${pricingData.pricing_annual_min ?? 'null'}`);
      console.log(`  Max: ${pricingData.pricing_annual_max ?? 'null'}`);
      console.log(`  Currency: ${pricingData.pricing_currency}`);
      console.log(`  Model: ${pricingData.pricing_model}`);
      console.log(`  Free Trial: ${pricingData.free_trial_available}`);
      console.log(`  Trial Days: ${pricingData.free_trial_duration_days ?? 'null'}`);

      try {
        // Run formatPricing
        const result = formatPricing(pricingData);

        console.log('\nFormatted Output:');
        console.log(`  Display:  "${result.display}"`);
        console.log(`  Range:    ${result.range ?? 'null'}`);
        console.log(`  Period:   "${result.period}"`);
        console.log(`  Model:    "${result.model}"`);
        console.log(`  Currency: ${result.currency}`);
        console.log(`  Symbol:   ${result.currencySymbol}`);
        console.log(`  Trial:    ${result.hasTrial}`);
        console.log(`  Trial Info: ${result.trialInfo ?? 'null'}`);
        console.log(`  Notes:    ${result.notes ?? 'null'}`);

        // Validation checks
        const checks = [
          { name: 'Display string exists', pass: result.display.length > 0 },
          { name: 'Currency symbol correct', pass: result.currencySymbol.length > 0 },
          { name: 'Period string exists', pass: result.period.length > 0 },
          { name: 'Model matches input', pass: result.model === pricingData.pricing_model },
          { name: 'Currency matches input', pass: result.currency === pricingData.pricing_currency },
          { name: 'Trial flag matches', pass: result.hasTrial === (pricingData.free_trial_available ?? false) },
        ];

        let allChecksPassed = true;
        console.log('\nValidation Checks:');
        for (const check of checks) {
          const icon = check.pass ? '✅' : '❌';
          console.log(`  ${icon} ${check.name}`);
          if (!check.pass) allChecksPassed = false;
        }

        if (allChecksPassed) {
          console.log('\n✅ All validation checks PASSED');
          testsPassed++;
        } else {
          console.log('\n❌ Some validation checks FAILED');
          testsFailed++;
        }

      } catch (error) {
        console.log(`\n❌ ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
        testsFailed++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('📊 INTEGRATION TEST SUMMARY');
    console.log('='.repeat(80));
    console.log('');
    console.log(`Total Tools Tested: ${toolsWithPricing.length}`);
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log('');

    if (testsFailed === 0) {
      console.log('🎉 ALL INTEGRATION TESTS PASSED!');
      console.log('✅ formatPricing() works correctly with real Airtable data');
      console.log('✅ All v2.3 pricing fields are properly integrated');
      console.log('');
      console.log('STATUS: SCHEMA V2.3 VALIDATION COMPLETE');
      console.log('');
      console.log('Next Steps:');
      console.log('1. Review validation report: docs/SCHEMA_V2_3_VALIDATION_FINAL.md');
      console.log('2. Proceed to TASK-207: Timeline Estimator utility');
      console.log('');
    } else {
      console.log('⚠️  SOME INTEGRATION TESTS FAILED');
      console.log('Review errors above and fix issues before proceeding');
      console.log('');
    }

    console.log('='.repeat(80));

    process.exit(testsFailed > 0 ? 1 : 0);

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error);
    console.error('\nPossible causes:');
    console.error('- Cannot access TOOLS table');
    console.error('- Network connection issues');
    console.error('- Missing environment variables');
    process.exit(1);
  }
}

runIntegrationTest();
