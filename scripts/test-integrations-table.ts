/**
 * Test INTEGRATIONS Table
 *
 * Validates the INTEGRATIONS table structure and data quality
 *
 * Usage: npx tsx scripts/test-integrations-table.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { getAllRecords } from '../lib/airtable';

// Load environment variables
config({ path: resolve(__dirname, '../.env.local') });

interface IntegrationFields {
  integration_id?: number;
  integration_name: string;
  // Airtable may return this as either a Single Select string or Multiple Select array
  integration_category?: string | string[];
  integration_type: 'Core' | 'Complementary';
  website_url: string;
  is_common: boolean;
  logo_url?: string;
  tools_count?: number;
}

interface IntegrationRecord {
  id: string;
  fields: IntegrationFields;
  createdTime?: string;
}

async function testIntegrationsTable() {
  console.log('\n🧪 Testing INTEGRATIONS Table\n');
  console.log('='.repeat(70));

  try {
    // Fetch all records
    console.log('\n📋 Step 1: Fetching records...');
    const integrations = await getAllRecords<IntegrationFields>('INTEGRATIONS');

    console.log(`✅ Table accessible`);
    console.log(`✅ Record count: ${integrations.length} (expected: 30)`);

    if (integrations.length === 0) {
      console.log('\n⚠️  No records found. Table is empty.');
      return;
    }

    // Check for required fields
    console.log('\n📋 Step 2: Validating field structure...');
    const firstRecord = integrations[0];
    const requiredFields = [
      'integration_name',
      'integration_category',
      'integration_type',
      'website_url',
      'is_common',
    ];

    const missingFields = requiredFields.filter(
      field => !(field in firstRecord.fields)
    );

    if (missingFields.length === 0) {
      console.log('✅ All required fields present');
    } else {
      console.log('❌ Missing fields:', missingFields);
    }

    // Check for duplicates
    console.log('\n📋 Step 3: Checking for duplicate names...');
    const names = integrations.map(r => r.fields.integration_name);
    const uniqueNames = new Set(names);
    if (names.length === uniqueNames.size) {
      console.log('✅ No duplicate integration names');
    } else {
      console.log('❌ Duplicate names detected');
      const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
      console.log('   Duplicates:', [...new Set(duplicates)]);
    }

    // Check integration categories
    console.log('\n📋 Step 4: Validating categories...');
    // Handle both Single Select (string) and Multiple Select (array)
    const categories = integrations.flatMap(r => {
      const cat = r.fields.integration_category;
      if (Array.isArray(cat)) return cat;
      if (typeof cat === 'string') return [cat];
      return [];
    });
    const expectedCategories = ['HRIS', 'ATS', 'Payroll', 'Communication', 'Calendar'];
    const uniqueCategories = [...new Set(categories)];

    console.log(`   Found categories: ${uniqueCategories.join(', ')}`);

    const hasAllCategories = expectedCategories.every(cat =>
      categories.includes(cat)
    );

    if (hasAllCategories) {
      console.log('✅ All expected categories present');
    } else {
      const missingCategories = expectedCategories.filter(cat => !categories.includes(cat));
      console.log('❌ Missing categories:', missingCategories);
    }

    // Check integration types
    console.log('\n📋 Step 5: Validating integration types...');
    const types = integrations.map(r => r.fields.integration_type);
    const coreCount = types.filter(t => t === 'Core').length;
    const complementaryCount = types.filter(t => t === 'Complementary').length;

    console.log(`   Core: ${coreCount} (expected: 21 - HRIS/ATS/Payroll)`);
    console.log(`   Complementary: ${complementaryCount} (expected: 9 - Communication/Calendar)`);

    if (coreCount === 21 && complementaryCount === 9) {
      console.log('✅ Integration types correctly distributed');
    } else {
      console.log('⚠️  Integration type distribution may need review');
    }

    // Check required fields populated
    console.log('\n📋 Step 6: Checking required fields populated...');
    let validationErrors = 0;

    integrations.forEach((record, index) => {
      const f = record.fields;

      if (!f.integration_name) {
        console.log(`❌ Record ${index + 1}: Missing integration_name`);
        validationErrors++;
      }
      // Handle both array and string for integration_category
      const hasCategory = f.integration_category &&
        ((Array.isArray(f.integration_category) && f.integration_category.length > 0) ||
         (typeof f.integration_category === 'string' && f.integration_category.length > 0));

      if (!hasCategory) {
        console.log(`❌ Record ${index + 1} (${f.integration_name}): Missing integration_category`);
        validationErrors++;
      }
      if (!f.integration_type) {
        console.log(`❌ Record ${index + 1} (${f.integration_name}): Missing integration_type`);
        validationErrors++;
      }
      if (!f.website_url) {
        console.log(`❌ Record ${index + 1} (${f.integration_name}): Missing website_url`);
        validationErrors++;
      }
      if (f.is_common !== true && f.is_common !== false) {
        console.log(`❌ Record ${index + 1} (${f.integration_name}): is_common not set`);
        validationErrors++;
      }
    });

    if (validationErrors === 0) {
      console.log('✅ All required fields populated');
    } else {
      console.log(`❌ Found ${validationErrors} validation errors`);
    }

    // Check is_common checkboxes
    console.log('\n📋 Step 7: Checking is_common field...');
    const commonCount = integrations.filter(r => r.fields.is_common === true).length;
    console.log(`   Records marked as common: ${commonCount}/${integrations.length}`);

    if (integrations.length === 30 && commonCount === 30) {
      console.log('✅ All 30 integrations marked as common (expected for initial set)');
    } else if (commonCount >= 20) {
      console.log('✅ At least 20 integrations marked as common');
    } else {
      console.log('⚠️  Less than 20 integrations marked as common');
    }

    // Display sample record
    console.log('\n📋 Step 8: Sample record structure...');
    console.log('\n📊 Sample Record:');
    console.log(JSON.stringify(firstRecord.fields, null, 2));

    // Display breakdown by category
    console.log('\n📋 Step 9: Breakdown by category...');
    // Helper to check if category matches (handles both string and array)
    const hasCategory = (cat: any, searchCat: string): boolean => {
      if (Array.isArray(cat)) return cat.includes(searchCat);
      if (typeof cat === 'string') return cat === searchCat;
      return false;
    };

    const categoryBreakdown = {
      HRIS: integrations.filter(r => hasCategory(r.fields.integration_category, 'HRIS')).length,
      ATS: integrations.filter(r => hasCategory(r.fields.integration_category, 'ATS')).length,
      Payroll: integrations.filter(r => hasCategory(r.fields.integration_category, 'Payroll')).length,
      Communication: integrations.filter(r => hasCategory(r.fields.integration_category, 'Communication')).length,
      Calendar: integrations.filter(r => hasCategory(r.fields.integration_category, 'Calendar')).length,
      Other: integrations.filter(r => hasCategory(r.fields.integration_category, 'Other')).length,
    };

    console.log('\n   Category Distribution:');
    Object.entries(categoryBreakdown).forEach(([category, count]) => {
      console.log(`   - ${category}: ${count}`);
    });

    // List all integrations
    console.log('\n📋 Step 10: All integrations list...');
    console.log('\n📝 Complete Integration List:\n');

    const groupedByType = {
      Core: integrations.filter(r => r.fields.integration_type === 'Core'),
      Complementary: integrations.filter(r => r.fields.integration_type === 'Complementary'),
    };

    // Helper to format categories (handles both string and array)
    const formatCategory = (cat: any): string => {
      if (Array.isArray(cat)) return cat.join(', ');
      if (typeof cat === 'string') return cat;
      return 'None';
    };

    console.log('Core Integrations (HRIS/ATS/Payroll):');
    groupedByType.Core.forEach((r, i) => {
      const cats = formatCategory(r.fields.integration_category);
      console.log(`  ${i + 1}. ${r.fields.integration_name} - [${cats}]`);
    });

    console.log('\nComplementary Integrations (Communication/Calendar):');
    groupedByType.Complementary.forEach((r, i) => {
      const cats = formatCategory(r.fields.integration_category);
      console.log(`  ${i + 1}. ${r.fields.integration_name} - [${cats}]`);
    });

    // Summary
    console.log('\n' + '='.repeat(70));
    console.log('\n📊 VALIDATION SUMMARY\n');

    const allChecksPassed =
      integrations.length === 30 &&
      missingFields.length === 0 &&
      names.length === uniqueNames.size &&
      hasAllCategories &&
      validationErrors === 0;

    if (allChecksPassed) {
      console.log('✅ ALL CHECKS PASSED - INTEGRATIONS table is ready!');
      console.log('\n✅ Ready for TASK-202 (TOOLS_INTEGRATIONS junction table)\n');
    } else {
      console.log('⚠️  SOME CHECKS FAILED - Review errors above\n');
    }

  } catch (error) {
    console.error('\n❌ Test failed:', error);

    if (error instanceof Error && error.message.includes('Could not find table')) {
      console.log('\n💡 Possible issues:');
      console.log('  1. Table name might not be exactly "INTEGRATIONS"');
      console.log('  2. Table might not exist yet');
      console.log('  3. Run: npx tsx scripts/debug-airtable-connection.ts to verify');
    }
  }
}

testIntegrationsTable();
