/**
 * Show Existing INTEGRATIONS Records
 *
 * Displays the current 8 records with their data and what needs to be updated
 *
 * Usage: npx tsx scripts/show-existing-integrations.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env.local') });

const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0';

async function showExistingIntegrations() {
  console.log('\n📋 Current INTEGRATIONS Table Records\n');
  console.log('='.repeat(80));

  const apiKey = process.env.AIRTABLE_API_KEY!;
  const baseId = process.env.AIRTABLE_BASE_ID!;
  const dataUrl = `${AIRTABLE_BASE_URL}/${baseId}/INTEGRATIONS`;

  try {
    const response = await fetch(dataUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    const records = data.records || [];

    console.log(`\n✅ Found ${records.length} existing records\n`);

    // Mapping of platform names to full integration data
    const integrationUpdates: Record<string, any> = {
      'Greenhouse': {
        integration_category: ['ATS'],
        integration_type: 'Core',
        website_url: 'https://www.greenhouse.io',
        is_common: true,
      },
      'Zendesk': {
        integration_category: ['Other'],
        integration_type: 'Complementary',
        website_url: 'https://www.zendesk.com',
        is_common: true,
      },
      'BambooHR': {
        integration_category: ['HRIS'],
        integration_type: 'Core',
        website_url: 'https://www.bamboohr.com',
        is_common: true,
      },
      'Workday': {
        integration_category: ['HRIS'],
        integration_type: 'Core',
        website_url: 'https://www.workday.com',
        is_common: true,
      },
      'Slack': {
        integration_category: ['Communication'],
        integration_type: 'Complementary',
        website_url: 'https://slack.com',
        is_common: true,
      },
      'Salesforce': {
        integration_category: ['Other'],
        integration_type: 'Complementary',
        website_url: 'https://www.salesforce.com',
        is_common: true,
      },
      'Microsoft Teams': {
        integration_category: ['Communication'],
        integration_type: 'Complementary',
        website_url: 'https://www.microsoft.com/en-us/microsoft-teams',
        is_common: true,
      },
      'Google Workspace': {
        integration_category: ['Communication', 'Calendar'],
        integration_type: 'Complementary',
        website_url: 'https://workspace.google.com',
        is_common: true,
      },
    };

    console.log('Current Data & Required Updates:\n');
    console.log('='.repeat(80));

    records.forEach((record: any, index: number) => {
      // Handle both old field names (platform_name) and new (integration_name)
      const name = record.fields.integration_name || record.fields.platform_name || 'Unnamed';
      const category = record.fields.integration_category || record.fields.platform_category || 'Unknown';
      const type = record.fields.integration_type || 'Not set';
      const website = record.fields.website_url || 'Not set';
      const isCommon = record.fields.is_common;

      console.log(`\n${index + 1}. ${name}`);
      console.log('-'.repeat(80));
      console.log(`   Record ID: ${record.id}`);
      console.log(`   Current category: ${category}`);
      console.log(`   Current type: ${type}`);
      console.log(`   Current website: ${website}`);
      console.log(`   Current is_common: ${isCommon !== undefined ? (isCommon ? '☑' : '☐') : 'Not set'}`);

      const updates = integrationUpdates[name];

      if (updates) {
        console.log(`\n   📝 TARGET VALUES (from Schema v2.3):`);
        // Handle category safely - could be array
        const categoryStr = Array.isArray(updates.integration_category)
          ? updates.integration_category.join(', ')
          : updates.integration_category;
        console.log(`      integration_category: [${categoryStr}]`);
        console.log(`      integration_type: ${updates.integration_type}`);
        console.log(`      website_url: ${updates.website_url}`);
        console.log(`      is_common: ${updates.is_common ? '☑' : '☐'}`);
      } else {
        console.log(`\n   ⚠️  NOT IN CANONICAL LIST - May need to decide: keep, update, or remove`);
      }
    });

    console.log('\n' + '='.repeat(80));
    console.log('\n📊 Summary:\n');
    console.log(`   Total existing records: ${records.length}`);
    console.log(`   Records needing updates: ${records.length} (all)`);
    console.log(`   New records to add: ${30 - records.length}`);
    console.log(`   Final target: 30 records total`);

    console.log('\n📝 Manual Update Checklist:\n');
    console.log('   1. [ ] Rename fields (platform_name → integration_name, etc.)');
    console.log('   2. [ ] Change platform_category to Multiple select');
    console.log('   3. [ ] Add new fields (integration_type, website_url, is_common, etc.)');
    console.log('   4. [ ] Update all 8 existing records with new field values');
    console.log('   5. [ ] Run: npx tsx scripts/populate-integrations-table.ts');
    console.log('   6. [ ] Run: npx tsx scripts/test-integrations-table.ts');
    console.log('');

  } catch (error) {
    console.error('\n❌ Failed to fetch records:', error);
  }
}

showExistingIntegrations();
