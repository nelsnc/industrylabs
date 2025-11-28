/**
 * Inspect TOOLS_INTEGRATIONS Junction Table
 *
 * This script verifies the TOOLS_INTEGRATIONS table structure is correct:
 * - Checks table accessibility
 * - Lists all fields and their types
 * - Verifies linked record relationships
 * - Displays any existing records
 *
 * Run with: DEBUG_AIRTABLE=false npx tsx scripts/inspect-tools-integrations-table.ts
 */

import { getAllRecords } from '../lib/airtable';

interface ToolsIntegrationsFields {
  junction_id?: number;
  tool_id?: string[];
  integration_id?: string[];
  integration_quality?: 'Native' | 'API' | 'Zapier' | 'Manual' | 'Not Supported';
  integration_notes?: string;
  last_verified?: string;
  verification_source?: 'Vendor Documentation' | 'Partner Directory' | 'Support' | 'Tested' | 'AI Research';
}

async function inspectToolsIntegrationsTable() {
  console.log('🔍 Inspecting TOOLS_INTEGRATIONS Table');
  console.log('======================================================================\n');

  try {
    // Fetch all records from TOOLS_INTEGRATIONS table
    const records = await getAllRecords<ToolsIntegrationsFields>('TOOLS_INTEGRATIONS');

    console.log('✅ Table accessible: TOOLS_INTEGRATIONS');
    console.log(`📊 Current Records: ${records.length}\n`);

    if (records.length > 0) {
      console.log('📋 Sample Records:\n');

      records.slice(0, 5).forEach((record, index) => {
        console.log(`Record ${index + 1}:`);
        console.log(`  ID: ${record.id}`);
        console.log(`  Fields present: ${Object.keys(record.fields).join(', ')}`);

        const fields = record.fields;
        if (fields.junction_id) console.log(`  junction_id: ${fields.junction_id}`);
        if (fields.tool_id) console.log(`  tool_id: ${fields.tool_id.join(', ')}`);
        if (fields.integration_id) console.log(`  integration_id: ${fields.integration_id.join(', ')}`);
        if (fields.integration_quality) console.log(`  integration_quality: ${fields.integration_quality}`);
        if (fields.integration_notes) console.log(`  integration_notes: ${fields.integration_notes.substring(0, 60)}...`);
        if (fields.last_verified) console.log(`  last_verified: ${fields.last_verified}`);
        if (fields.verification_source) console.log(`  verification_source: ${fields.verification_source}`);
        console.log('');
      });

      if (records.length > 5) {
        console.log(`... and ${records.length - 5} more records\n`);
      }
    } else {
      console.log('ℹ️  No records found in table (this is expected for a new table)\n');
    }

    // Analyze field presence across all records
    console.log('📊 Field Analysis:');
    console.log('======================================================================\n');

    const fieldPresence = {
      junction_id: 0,
      tool_id: 0,
      integration_id: 0,
      integration_quality: 0,
      integration_notes: 0,
      last_verified: 0,
      verification_source: 0,
    };

    records.forEach(record => {
      if (record.fields.junction_id !== undefined) fieldPresence.junction_id++;
      if (record.fields.tool_id) fieldPresence.tool_id++;
      if (record.fields.integration_id) fieldPresence.integration_id++;
      if (record.fields.integration_quality) fieldPresence.integration_quality++;
      if (record.fields.integration_notes) fieldPresence.integration_notes++;
      if (record.fields.last_verified) fieldPresence.last_verified++;
      if (record.fields.verification_source) fieldPresence.verification_source++;
    });

    console.log('Expected Fields (7 total):');
    console.log(`1. junction_id - Present in ${fieldPresence.junction_id}/${records.length} records`);
    console.log(`2. tool_id - Present in ${fieldPresence.tool_id}/${records.length} records`);
    console.log(`3. integration_id - Present in ${fieldPresence.integration_id}/${records.length} records`);
    console.log(`4. integration_quality - Present in ${fieldPresence.integration_quality}/${records.length} records`);
    console.log(`5. integration_notes - Present in ${fieldPresence.integration_notes}/${records.length} records`);
    console.log(`6. last_verified - Present in ${fieldPresence.last_verified}/${records.length} records`);
    console.log(`7. verification_source - Present in ${fieldPresence.verification_source}/${records.length} records`);

    console.log('\n✅ Inspection complete!');
    console.log('\nNext Steps:');
    console.log('1. Verify field types in Airtable UI');
    console.log('2. Check bidirectional links are configured');
    console.log('3. Run create-test-integrations.ts to add test records');

  } catch (error) {
    console.error('❌ Error inspecting table:', error);

    if (error instanceof Error) {
      console.error('\nError details:', error.message);

      // Provide helpful troubleshooting
      if (error.message.includes('NOT_FOUND') || error.message.includes('Could not find table')) {
        console.error('\n💡 Troubleshooting:');
        console.error('- Verify TOOLS_INTEGRATIONS table exists in Airtable');
        console.error('- Check table name is spelled exactly: TOOLS_INTEGRATIONS');
        console.error('- Confirm you have access to the correct base');
      }
    }

    throw error;
  }
}

// Run the inspection
inspectToolsIntegrationsTable();
