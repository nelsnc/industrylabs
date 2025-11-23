/**
 * Debug Airtable Connection
 *
 * This script helps diagnose connection issues by:
 * 1. Verifying environment variables are loaded
 * 2. Testing the exact API endpoint URL
 * 3. Showing detailed error information
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(__dirname, '../.env.local') });

const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0';

async function debugConnection() {
  console.log('\n🔍 Airtable Connection Debugger\n');
  console.log('='.repeat(60));

  // Step 1: Check environment variables
  console.log('\n📋 Step 1: Environment Variables');
  console.log('-'.repeat(60));

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey) {
    console.error('❌ AIRTABLE_API_KEY is not set');
    process.exit(1);
  }

  if (!baseId) {
    console.error('❌ AIRTABLE_BASE_ID is not set');
    process.exit(1);
  }

  console.log(`✓ AIRTABLE_API_KEY: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)} (${apiKey.length} chars)`);
  console.log(`✓ AIRTABLE_BASE_ID: ${baseId}`);

  // Step 2: Test base metadata endpoint first
  console.log('\n📋 Step 2: Testing Base Metadata Access');
  console.log('-'.repeat(60));

  const metaUrl = `https://api.airtable.com/v0/meta/bases/${baseId}/tables`;
  console.log(`Endpoint: ${metaUrl}`);

  try {
    const metaResponse = await fetch(metaUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!metaResponse.ok) {
      const errorText = await metaResponse.text();
      console.error(`❌ Metadata API failed with status ${metaResponse.status}`);
      console.error(`Response: ${errorText}`);

      if (metaResponse.status === 404) {
        console.error('\n💡 Possible issues:');
        console.error('  1. Base ID is incorrect');
        console.error('  2. API token doesn\'t have access to this base');
      } else if (metaResponse.status === 401) {
        console.error('\n💡 Possible issues:');
        console.error('  1. API key is incorrect or expired');
        console.error('  2. API key doesn\'t have the correct scopes');
      }

      process.exit(1);
    }

    const metaData = await metaResponse.json();
    console.log('✓ Base metadata accessed successfully!');
    console.log(`\n📊 Available tables in this base:`);

    if (metaData.tables && Array.isArray(metaData.tables)) {
      metaData.tables.forEach((table: { id: string; name: string; primaryFieldId: string }, index: number) => {
        console.log(`  ${index + 1}. "${table.name}" (ID: ${table.id})`);
      });

      // Check if TOOLS table exists
      const toolsTable = metaData.tables.find((t: { name: string }) =>
        t.name.toUpperCase() === 'TOOLS'
      );

      if (toolsTable) {
        console.log(`\n✓ Found tools table: "${toolsTable.name}"`);
      } else {
        console.log(`\n⚠️  No table named "TOOLS" found. Available tables listed above.`);
        console.log(`\n💡 Update your code to use the exact table name from the list above.`);
      }
    }

  } catch (error) {
    console.error('❌ Failed to fetch base metadata:', error);
    process.exit(1);
  }

  // Step 3: Try to fetch from TOOLS table
  console.log('\n📋 Step 3: Testing TOOLS Table Access');
  console.log('-'.repeat(60));

  const tableUrl = `${AIRTABLE_BASE_URL}/${baseId}/TOOLS?maxRecords=1`;
  console.log(`Endpoint: ${tableUrl}`);

  try {
    const tableResponse = await fetch(tableUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!tableResponse.ok) {
      const errorData = await tableResponse.json();
      console.error(`❌ TOOLS table access failed with status ${tableResponse.status}`);
      console.error(`Error:`, JSON.stringify(errorData, null, 2));

      if (tableResponse.status === 404) {
        console.error('\n💡 The table name might not match exactly. Check the table list above.');
      }

      process.exit(1);
    }

    const tableData = await tableResponse.json();
    console.log('✓ Successfully accessed TOOLS table!');
    console.log(`  Records found: ${tableData.records?.length || 0}`);

    if (tableData.records && tableData.records.length > 0) {
      const firstRecord = tableData.records[0];
      console.log(`\n📄 First record sample:`);
      console.log(`  ID: ${firstRecord.id}`);
      console.log(`  Fields: ${Object.keys(firstRecord.fields).join(', ')}`);
    }

  } catch (error) {
    console.error('❌ Failed to fetch from TOOLS table:', error);
    process.exit(1);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ All connection tests passed!\n');
}

debugConnection().catch(console.error);
