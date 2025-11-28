/**
 * Populate INTEGRATIONS Table with 30 Canonical Records
 *
 * Run this AFTER manually updating the table schema to match Schema v2.3
 *
 * Usage: npx tsx scripts/populate-integrations-table.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { createRecord, getAllRecords } from '../lib/airtable';

// Load environment variables
config({ path: resolve(__dirname, '../.env.local') });

interface IntegrationRecord {
  integration_name: string;
  integration_category: string[];
  integration_type: 'Core' | 'Complementary';
  website_url: string;
  is_common: boolean;
  logo_url?: string;
}

const INTEGRATIONS_DATA: IntegrationRecord[] = [
  // HRIS (8 records) - Core
  {
    integration_name: 'Workday',
    integration_category: ['HRIS'],
    integration_type: 'Core',
    website_url: 'https://www.workday.com',
    is_common: true,
  },
  {
    integration_name: 'BambooHR',
    integration_category: ['HRIS'],
    integration_type: 'Core',
    website_url: 'https://www.bamboohr.com',
    is_common: true,
  },
  {
    integration_name: 'Rippling',
    integration_category: ['HRIS', 'Payroll'],
    integration_type: 'Core',
    website_url: 'https://www.rippling.com',
    is_common: true,
  },
  {
    integration_name: 'Gusto',
    integration_category: ['HRIS', 'Payroll'],
    integration_type: 'Core',
    website_url: 'https://gusto.com',
    is_common: true,
  },
  {
    integration_name: 'Namely',
    integration_category: ['HRIS'],
    integration_type: 'Core',
    website_url: 'https://www.namely.com',
    is_common: true,
  },
  {
    integration_name: 'Personio',
    integration_category: ['HRIS'],
    integration_type: 'Core',
    website_url: 'https://www.personio.com',
    is_common: true,
  },
  {
    integration_name: 'Hibob',
    integration_category: ['HRIS'],
    integration_type: 'Core',
    website_url: 'https://www.hibob.com',
    is_common: true,
  },
  {
    integration_name: 'ADP Workforce Now',
    integration_category: ['HRIS', 'Payroll'],
    integration_type: 'Core',
    website_url: 'https://www.adp.com',
    is_common: true,
  },

  // ATS (10 records) - Core
  {
    integration_name: 'Greenhouse',
    integration_category: ['ATS'],
    integration_type: 'Core',
    website_url: 'https://www.greenhouse.io',
    is_common: true,
  },
  {
    integration_name: 'Lever',
    integration_category: ['ATS'],
    integration_type: 'Core',
    website_url: 'https://www.lever.co',
    is_common: true,
  },
  {
    integration_name: 'Ashby',
    integration_category: ['ATS'],
    integration_type: 'Core',
    website_url: 'https://www.ashbyhq.com',
    is_common: true,
  },
  {
    integration_name: 'SmartRecruiters',
    integration_category: ['ATS'],
    integration_type: 'Core',
    website_url: 'https://www.smartrecruiters.com',
    is_common: true,
  },
  {
    integration_name: 'Workable',
    integration_category: ['ATS'],
    integration_type: 'Core',
    website_url: 'https://www.workable.com',
    is_common: true,
  },
  {
    integration_name: 'JazzHR',
    integration_category: ['ATS'],
    integration_type: 'Core',
    website_url: 'https://www.jazzhr.com',
    is_common: true,
  },
  {
    integration_name: 'Breezy HR',
    integration_category: ['ATS'],
    integration_type: 'Core',
    website_url: 'https://breezy.hr',
    is_common: true,
  },
  {
    integration_name: 'Recruitee',
    integration_category: ['ATS'],
    integration_type: 'Core',
    website_url: 'https://recruitee.com',
    is_common: true,
  },
  {
    integration_name: 'iCIMS',
    integration_category: ['ATS'],
    integration_type: 'Core',
    website_url: 'https://www.icims.com',
    is_common: true,
  },
  {
    integration_name: 'Jobvite',
    integration_category: ['ATS'],
    integration_type: 'Core',
    website_url: 'https://www.jobvite.com',
    is_common: true,
  },

  // Payroll (3 records) - Core
  {
    integration_name: 'Paychex',
    integration_category: ['Payroll'],
    integration_type: 'Core',
    website_url: 'https://www.paychex.com',
    is_common: true,
  },
  {
    integration_name: 'Justworks',
    integration_category: ['Payroll'],
    integration_type: 'Core',
    website_url: 'https://justworks.com',
    is_common: true,
  },
  {
    integration_name: 'Zenefits',
    integration_category: ['HRIS', 'Payroll'],
    integration_type: 'Core',
    website_url: 'https://www.zenefits.com',
    is_common: true,
  },

  // Communication (5 records) - Complementary
  {
    integration_name: 'Slack',
    integration_category: ['Communication'],
    integration_type: 'Complementary',
    website_url: 'https://slack.com',
    is_common: true,
  },
  {
    integration_name: 'Microsoft Teams',
    integration_category: ['Communication'],
    integration_type: 'Complementary',
    website_url: 'https://www.microsoft.com/en-us/microsoft-teams',
    is_common: true,
  },
  {
    integration_name: 'Google Chat',
    integration_category: ['Communication'],
    integration_type: 'Complementary',
    website_url: 'https://chat.google.com',
    is_common: true,
  },
  {
    integration_name: 'Zoom',
    integration_category: ['Communication'],
    integration_type: 'Complementary',
    website_url: 'https://zoom.us',
    is_common: true,
  },
  {
    integration_name: 'Google Meet',
    integration_category: ['Communication'],
    integration_type: 'Complementary',
    website_url: 'https://meet.google.com',
    is_common: true,
  },

  // Calendar (4 records) - Complementary
  {
    integration_name: 'Google Calendar',
    integration_category: ['Calendar'],
    integration_type: 'Complementary',
    website_url: 'https://calendar.google.com',
    is_common: true,
  },
  {
    integration_name: 'Outlook Calendar',
    integration_category: ['Calendar'],
    integration_type: 'Complementary',
    website_url: 'https://outlook.com/calendar',
    is_common: true,
  },
  {
    integration_name: 'Office 365',
    integration_category: ['Calendar'],
    integration_type: 'Complementary',
    website_url: 'https://www.office.com',
    is_common: true,
  },
  {
    integration_name: 'Apple Calendar',
    integration_category: ['Calendar'],
    integration_type: 'Complementary',
    website_url: 'https://www.icloud.com/calendar',
    is_common: true,
  },
];

async function populateIntegrationsTable() {
  console.log('\n🚀 Populating INTEGRATIONS Table\n');
  console.log('='.repeat(70));

  // Step 1: Fetch existing records
  console.log('\n📋 Step 1: Checking existing records...\n');
  const existingRecords = await getAllRecords<any>('INTEGRATIONS');
  const existingNames = existingRecords.map((r: any) => r.fields.integration_name);

  console.log(`✓ Found ${existingRecords.length} existing records:`);
  existingNames.forEach((name: string) => console.log(`  - ${name}`));

  // Step 2: Identify missing integrations
  console.log(`\n📋 Step 2: Identifying missing integrations...\n`);
  const missingIntegrations = INTEGRATIONS_DATA.filter(
    integration => !existingNames.includes(integration.integration_name)
  );

  console.log(`✓ Need to add ${missingIntegrations.length} missing integrations:`);
  missingIntegrations.forEach(integration => console.log(`  - ${integration.integration_name}`));

  if (missingIntegrations.length === 0) {
    console.log('\n✅ All integrations already exist! No records to add.\n');
    return;
  }

  // Step 3: Create missing records
  console.log(`\n📋 Step 3: Creating ${missingIntegrations.length} missing records...\n`);

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;
  const errors: Array<{ name: string; error: string }> = [];

  for (const integration of missingIntegrations) {
    try {
      console.log(`Creating: ${integration.integration_name}...`);

      // IMPORTANT: integration_category is currently Single Select (not Multiple Select)
      // We use the FIRST category only until the schema is updated to Multiple Select
      const primaryCategory = integration.integration_category[0];

      await createRecord('INTEGRATIONS', {
        integration_name: integration.integration_name,
        integration_category: primaryCategory, // Single Select - use first category only
        integration_type: integration.integration_type,
        website_url: integration.website_url,
        is_common: integration.is_common,
        ...(integration.logo_url && { logo_url: integration.logo_url }),
      });

      console.log(`  ✓ Created successfully (category: ${primaryCategory})`);
      if (integration.integration_category.length > 1) {
        console.log(`  ⚠️  Note: Multiple categories [${integration.integration_category.join(', ')}] - only used first one`);
      }
      successCount++;

      // Rate limiting: Airtable allows 5 requests per second
      await new Promise(resolve => setTimeout(resolve, 250));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      // Check if it's a duplicate error
      if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
        console.log(`  ⚠️  Skipped (already exists)`);
        skippedCount++;
      } else {
        console.error(`  ✗ Failed: ${errorMessage}`);
        errorCount++;
        errors.push({
          name: integration.integration_name,
          error: errorMessage,
        });
      }
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n📊 Summary:\n');
  console.log(`  ✅ Successfully created: ${successCount}`);
  console.log(`  ⚠️  Skipped (duplicates): ${skippedCount}`);
  console.log(`  ❌ Failed: ${errorCount}`);
  console.log(`  📋 Total in database now: ${existingRecords.length + successCount}`);

  if (errors.length > 0) {
    console.log('\n❌ Errors:\n');
    errors.forEach(({ name, error }) => {
      console.log(`  - ${name}: ${error}`);
    });
  }

  const totalExpected = 30;
  const totalNow = existingRecords.length + successCount;

  if (totalNow === totalExpected) {
    console.log('\n🎉 All 30 integrations are now in the table!\n');
    console.log('✅ Next step: Run npx tsx scripts/test-integrations-table.ts to validate\n');
  } else if (totalNow > totalExpected) {
    console.log(`\n⚠️  Note: Database has ${totalNow} records (expected: ${totalExpected})`);
    console.log('   This includes extra integrations (Salesforce, Zendesk, Google Workspace)\n');
  } else {
    console.log(`\n⚠️  Warning: Database has ${totalNow} records (expected: ${totalExpected})`);
    console.log(`   Missing ${totalExpected - totalNow} integrations\n`);
  }
}

populateIntegrationsTable().catch(console.error);
