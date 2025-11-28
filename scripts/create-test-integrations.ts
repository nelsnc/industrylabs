/**
 * Create Test Junction Records for TOOLS_INTEGRATIONS
 *
 * This script creates 3-5 test records to verify the junction table works correctly:
 * 1. Find existing tools (BambooHR, Greenhouse, etc.)
 * 2. Find existing integrations (Workday, Slack, etc.)
 * 3. Create test junction records linking them
 * 4. Verify creation and bidirectional links
 *
 * Run with: DEBUG_AIRTABLE=false npx tsx scripts/create-test-integrations.ts
 */

import { getAllRecords, createRecord, AirtableRecord } from '../lib/airtable';

interface ToolFields {
  tool_name: string;
  tool_slug: string;
}

interface IntegrationFields {
  integration_name: string;
  integration_category?: string;
}

interface ToolsIntegrationsFields {
  junction_id?: number;
  tool_id?: string[];
  integration_id?: string[];
  integration_quality?: 'Native' | 'API' | 'Zapier' | 'Manual' | 'Not Supported';
  integration_notes?: string;
  last_verified?: string;
  verification_source?: 'Vendor Documentation' | 'Partner Directory' | 'Support' | 'Tested' | 'AI Research';
}

async function findToolByName(name: string): Promise<AirtableRecord<ToolFields> | null> {
  const tools = await getAllRecords<ToolFields>('TOOLS');
  return tools.find(t => t.fields.tool_name === name) || null;
}

async function findIntegrationByName(name: string): Promise<AirtableRecord<IntegrationFields> | null> {
  const integrations = await getAllRecords<IntegrationFields>('INTEGRATIONS');
  return integrations.find(i => i.fields.integration_name === name) || null;
}

async function checkJunctionExists(toolId: string, integrationId: string): Promise<AirtableRecord<ToolsIntegrationsFields> | null> {
  const junctions = await getAllRecords<ToolsIntegrationsFields>('TOOLS_INTEGRATIONS');
  return junctions.find(j =>
    j.fields.tool_id?.includes(toolId) &&
    j.fields.integration_id?.includes(integrationId)
  ) || null;
}

async function createTestIntegrations() {
  console.log('🔧 Creating Test Junction Records');
  console.log('======================================================================\n');

  try {
    // Step 1: Find Tools
    console.log('Step 1: Finding Tools');
    console.log('-------------------');

    // First, let's see what tools are available
    const allTools = await getAllRecords<ToolFields>('TOOLS');
    console.log(`ℹ️  Found ${allTools.length} total tools in TOOLS table`);

    if (allTools.length > 0) {
      console.log('Sample tools:', allTools.slice(0, 5).map(t => t.fields.tool_name).join(', '));
    }

    const bambooHR = await findToolByName('BambooHR');
    const greenhouse = await findToolByName('Greenhouse');

    if (bambooHR) {
      console.log(`✅ Found BambooHR: ${bambooHR.id}`);
    } else {
      console.log('⚠️  BambooHR not found - will skip related test records');
    }

    if (greenhouse) {
      console.log(`✅ Found Greenhouse: ${greenhouse.id}`);
    } else {
      console.log('⚠️  Greenhouse not found - will skip related test records');
    }

    // Step 2: Find Integrations
    console.log('\nStep 2: Finding Integrations');
    console.log('-------------------');

    // Let's see what integrations are available
    const allIntegrations = await getAllRecords<IntegrationFields>('INTEGRATIONS');
    console.log(`ℹ️  Found ${allIntegrations.length} total integrations in INTEGRATIONS table`);

    if (allIntegrations.length > 0) {
      console.log('Sample integrations:', allIntegrations.slice(0, 10).map(i => i.fields.integration_name).join(', '));
    }

    const workday = await findIntegrationByName('Workday');
    const slack = await findIntegrationByName('Slack');
    const salesforce = await findIntegrationByName('Salesforce');

    if (workday) {
      console.log(`✅ Found Workday: ${workday.id}`);
    } else {
      console.log('⚠️  Workday not found - will skip related test records');
    }

    if (slack) {
      console.log(`✅ Found Slack: ${slack.id}`);
    } else {
      console.log('⚠️  Slack not found - will skip related test records');
    }

    if (salesforce) {
      console.log(`✅ Found Salesforce: ${salesforce.id}`);
    } else {
      console.log('⚠️  Salesforce not found - will try alternative integrations');
    }

    // Step 3: Create Junction Records
    console.log('\nStep 3: Creating Junction Records');
    console.log('-------------------');

    const createdRecords: AirtableRecord<ToolsIntegrationsFields>[] = [];

    // Test Record 1: BambooHR ↔ Workday (Native Integration)
    if (bambooHR && workday) {
      const existing = await checkJunctionExists(bambooHR.id, workday.id);

      if (existing) {
        console.log('ℹ️  BambooHR ↔ Workday junction already exists, skipping');
      } else {
        const record = await createRecord<ToolsIntegrationsFields>('TOOLS_INTEGRATIONS', {
          tool_id: [bambooHR.id],
          integration_id: [workday.id],
          integration_quality: 'Native',
          integration_notes: 'Test record: Native bi-directional sync between BambooHR and Workday HRIS systems',
          last_verified: '2025-11-28',
          verification_source: 'Tested',
        });
        createdRecords.push(record);
        console.log(`✅ Created: BambooHR ↔ Workday (Native) - ID: ${record.id}`);
      }
    }

    // Test Record 2: BambooHR ↔ Slack (API Integration)
    if (bambooHR && slack) {
      const existing = await checkJunctionExists(bambooHR.id, slack.id);

      if (existing) {
        console.log('ℹ️  BambooHR ↔ Slack junction already exists, skipping');
      } else {
        const record = await createRecord<ToolsIntegrationsFields>('TOOLS_INTEGRATIONS', {
          tool_id: [bambooHR.id],
          integration_id: [slack.id],
          integration_quality: 'API',
          integration_notes: 'Test record: API integration with webhooks for employee notifications and updates',
          last_verified: '2025-11-28',
          verification_source: 'Vendor Documentation',
        });
        createdRecords.push(record);
        console.log(`✅ Created: BambooHR ↔ Slack (API) - ID: ${record.id}`);
      }
    }

    // Test Record 3: Greenhouse ↔ Slack (Native Integration)
    if (greenhouse && slack) {
      const existing = await checkJunctionExists(greenhouse.id, slack.id);

      if (existing) {
        console.log('ℹ️  Greenhouse ↔ Slack junction already exists, skipping');
      } else {
        const record = await createRecord<ToolsIntegrationsFields>('TOOLS_INTEGRATIONS', {
          tool_id: [greenhouse.id],
          integration_id: [slack.id],
          integration_quality: 'Native',
          integration_notes: 'Test record: Built-in Slack notifications for candidate updates and interview scheduling',
          last_verified: '2025-11-28',
          verification_source: 'Vendor Documentation',
        });
        createdRecords.push(record);
        console.log(`✅ Created: Greenhouse ↔ Slack (Native) - ID: ${record.id}`);
      }
    }

    // Test Record 4: BambooHR ↔ Salesforce (if available)
    if (bambooHR && salesforce) {
      const existing = await checkJunctionExists(bambooHR.id, salesforce.id);

      if (existing) {
        console.log('ℹ️  BambooHR ↔ Salesforce junction already exists, skipping');
      } else {
        const record = await createRecord<ToolsIntegrationsFields>('TOOLS_INTEGRATIONS', {
          tool_id: [bambooHR.id],
          integration_id: [salesforce.id],
          integration_quality: 'Zapier',
          integration_notes: 'Test record: Zapier integration for syncing employee data with CRM',
          last_verified: '2025-11-28',
          verification_source: 'Partner Directory',
        });
        createdRecords.push(record);
        console.log(`✅ Created: BambooHR ↔ Salesforce (Zapier) - ID: ${record.id}`);
      }
    }

    // Step 4: Verify Creation
    console.log('\nStep 4: Verification');
    console.log('-------------------');

    if (createdRecords.length === 0) {
      console.log('⚠️  No new records created (may already exist or tools/integrations not found)');
    } else {
      console.log(`✅ Created ${createdRecords.length} new junction record(s)\n`);

      // Fetch back and display
      console.log('📊 Created Records Details:\n');
      for (const record of createdRecords) {
        console.log(`Record ID: ${record.id}`);
        console.log(`  junction_id: ${record.fields.junction_id || 'auto-generated'}`);
        console.log(`  tool_id: ${record.fields.tool_id?.join(', ')}`);
        console.log(`  integration_id: ${record.fields.integration_id?.join(', ')}`);
        console.log(`  integration_quality: ${record.fields.integration_quality}`);
        console.log(`  integration_notes: ${record.fields.integration_notes}`);
        console.log(`  last_verified: ${record.fields.last_verified}`);
        console.log(`  verification_source: ${record.fields.verification_source}`);
        console.log('');
      }
    }

    // Check all junction records
    const allJunctions = await getAllRecords<ToolsIntegrationsFields>('TOOLS_INTEGRATIONS');
    console.log(`✅ Total junction records in table: ${allJunctions.length}`);

    console.log('\n✅ Test record creation complete!');
    console.log('\nNext Steps:');
    console.log('1. Check Airtable UI to verify bidirectional links work');
    console.log('2. Verify INTEGRATIONS.tools_count updates correctly');
    console.log('3. Run test-tools-integrations-table.ts for comprehensive validation');

  } catch (error) {
    console.error('❌ Error creating test records:', error);

    if (error instanceof Error) {
      console.error('\nError details:', error.message);
    }

    throw error;
  }
}

// Run the test record creation
createTestIntegrations();
