/**
 * Inspect INTEGRATIONS Table
 *
 * This script inspects the INTEGRATIONS table structure and data
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(__dirname, '../.env.local') });

const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0';

async function inspectIntegrationsTable() {
  console.log('\n🔍 Inspecting INTEGRATIONS Table\n');
  console.log('='.repeat(70));

  const apiKey = process.env.AIRTABLE_API_KEY!;
  const baseId = process.env.AIRTABLE_BASE_ID!;

  // Step 1: Get table metadata (schema)
  console.log('\n📋 Step 1: Table Schema (Fields Configuration)');
  console.log('-'.repeat(70));

  const metaUrl = `https://api.airtable.com/v0/meta/bases/${baseId}/tables`;

  try {
    const metaResponse = await fetch(metaUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!metaResponse.ok) {
      throw new Error(`Metadata API failed: ${metaResponse.status}`);
    }

    const metaData = await metaResponse.json();
    const integrationsTable = metaData.tables.find(
      (t: any) => t.name === 'INTEGRATIONS'
    );

    if (!integrationsTable) {
      console.error('❌ INTEGRATIONS table not found');
      process.exit(1);
    }

    console.log(`✓ Table Name: ${integrationsTable.name}`);
    console.log(`✓ Table ID: ${integrationsTable.id}`);
    console.log(`\n📊 Fields (${integrationsTable.fields.length} total):\n`);

    integrationsTable.fields.forEach((field: any, index: number) => {
      console.log(`${index + 1}. ${field.name}`);
      console.log(`   Type: ${field.type}`);

      if (field.options) {
        if (field.options.choices) {
          const choices = field.options.choices.map((c: any) => c.name).join(', ');
          console.log(`   Options: ${choices}`);
        }
        if (field.options.linkedTableId) {
          console.log(`   Linked to: ${field.options.linkedTableId}`);
        }
        if (field.options.isReversed !== undefined) {
          console.log(`   Is Reversed Link: ${field.options.isReversed}`);
        }
      }
      console.log('');
    });

  } catch (error) {
    console.error('❌ Failed to fetch table metadata:', error);
    process.exit(1);
  }

  // Step 2: Get records data
  console.log('\n📋 Step 2: Current Records');
  console.log('-'.repeat(70));

  const dataUrl = `${AIRTABLE_BASE_URL}/${baseId}/INTEGRATIONS`;

  try {
    const dataResponse = await fetch(dataUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!dataResponse.ok) {
      throw new Error(`Data API failed: ${dataResponse.status}`);
    }

    const data = await dataResponse.json();
    const records = data.records || [];

    console.log(`✓ Total Records: ${records.length}\n`);

    if (records.length === 0) {
      console.log('⚠️  Table is empty - no records found');
    } else {
      console.log('📄 Sample Records:\n');

      records.slice(0, 5).forEach((record: any, index: number) => {
        console.log(`${index + 1}. ${record.fields.integration_name || 'Unnamed'}`);
        console.log(`   ID: ${record.id}`);
        console.log(`   Fields: ${JSON.stringify(record.fields, null, 2)}`);
        console.log('');
      });

      if (records.length > 5) {
        console.log(`... and ${records.length - 5} more records\n`);
      }

      // Show all integration names
      console.log('\n📋 All Integration Names:\n');
      records.forEach((record: any, index: number) => {
        const name = record.fields.integration_name || 'Unnamed';
        const category = record.fields.integration_category || [];
        const type = record.fields.integration_type || 'Unknown';

        // Handle category safely - could be array, string, or null
        const categoryStr = Array.isArray(category)
          ? category.join(', ')
          : typeof category === 'string'
            ? category
            : 'N/A';

        console.log(`${index + 1}. ${name} - [${categoryStr}] - Type: ${type}`);
      });
    }

  } catch (error) {
    console.error('❌ Failed to fetch table records:', error);
    process.exit(1);
  }

  console.log('\n' + '='.repeat(70));
  console.log('✅ Inspection complete!\n');
}

inspectIntegrationsTable().catch(console.error);
