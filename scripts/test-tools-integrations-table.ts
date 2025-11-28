/**
 * Comprehensive Validation for TOOLS_INTEGRATIONS Junction Table
 *
 * This script performs 10 validation checks to ensure the junction table is fully operational:
 * 1. Table Accessible
 * 2. Schema Complete
 * 3. Required Fields Configured
 * 4. Select Options Correct
 * 5. Links Work Both Ways
 * 6. Test Records Valid
 * 7. Count Field Works
 * 8. Quality Values Valid
 * 9. Date Fields Functional
 * 10. Junction Query Works
 *
 * Run with: DEBUG_AIRTABLE=false npx tsx scripts/test-tools-integrations-table.ts
 */

import { getAllRecords, AirtableRecord } from '../lib/airtable';

interface ToolFields {
  tool_name: string;
  tool_slug: string;
  integrations?: string[];
}

interface IntegrationFields {
  integration_name: string;
  integration_category?: string;
  tools_count?: number;
  tools?: string[];
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

interface TestResult {
  testNumber: number;
  name: string;
  passed: boolean;
  details: string;
  warnings?: string[];
}

const testResults: TestResult[] = [];

function addTestResult(testNumber: number, name: string, passed: boolean, details: string, warnings?: string[]) {
  testResults.push({ testNumber, name, passed, details, warnings });

  const icon = passed ? '✅' : '❌';
  console.log(`${icon} Test ${testNumber}: ${name}`);
  console.log(`   ${details}`);
  if (warnings && warnings.length > 0) {
    warnings.forEach(w => console.log(`   ⚠️  ${w}`));
  }
  console.log('');
}

async function runValidationTests() {
  console.log('🧪 Testing TOOLS_INTEGRATIONS Junction Table');
  console.log('======================================================================\n');

  let junctionRecords: AirtableRecord<ToolsIntegrationsFields>[] = [];
  let toolRecords: AirtableRecord<ToolFields>[] = [];
  let integrationRecords: AirtableRecord<IntegrationFields>[] = [];

  // Test 1: Table Accessible
  try {
    junctionRecords = await getAllRecords<ToolsIntegrationsFields>('TOOLS_INTEGRATIONS');
    addTestResult(1, 'Table accessible', true, `Successfully connected to TOOLS_INTEGRATIONS table with ${junctionRecords.length} records`);
  } catch (error) {
    addTestResult(1, 'Table accessible', false, `Failed to access table: ${error instanceof Error ? error.message : 'Unknown error'}`);
    console.log('\n❌ CRITICAL: Cannot access table. Stopping tests.');
    return;
  }

  // Test 2: Schema Complete
  const expectedFields = ['junction_id', 'tool_id', 'integration_id', 'integration_quality', 'integration_notes', 'last_verified', 'verification_source'];
  const fieldsFound = new Set<string>();

  junctionRecords.forEach(record => {
    Object.keys(record.fields).forEach(field => fieldsFound.add(field));
  });

  const missingFields = expectedFields.filter(f => !fieldsFound.has(f));
  const schemaComplete = missingFields.length === 0;

  if (schemaComplete) {
    addTestResult(2, 'Schema complete (7 fields)', true, `All ${expectedFields.length} expected fields present: ${expectedFields.join(', ')}`);
  } else {
    const warnings = missingFields.map(f => `Missing field: ${f} (may not be visible if no records have this field populated)`);
    addTestResult(2, 'Schema complete (7 fields)', false, `${fieldsFound.size} fields found, ${missingFields.length} missing`, warnings);
  }

  // Test 3: Required Fields Configured
  const recordsWithToolId = junctionRecords.filter(r => r.fields.tool_id && r.fields.tool_id.length > 0);
  const recordsWithIntegrationId = junctionRecords.filter(r => r.fields.integration_id && r.fields.integration_id.length > 0);
  const recordsWithQuality = junctionRecords.filter(r => r.fields.integration_quality);
  const recordsWithSource = junctionRecords.filter(r => r.fields.verification_source);

  const requiredFieldsOk = (
    recordsWithToolId.length === junctionRecords.length &&
    recordsWithIntegrationId.length === junctionRecords.length &&
    recordsWithQuality.length === junctionRecords.length &&
    recordsWithSource.length === junctionRecords.length
  );

  if (requiredFieldsOk) {
    addTestResult(3, 'Required fields configured correctly', true, 'All records have tool_id, integration_id, integration_quality, and verification_source');
  } else {
    const warnings = [];
    if (recordsWithToolId.length < junctionRecords.length) warnings.push(`${junctionRecords.length - recordsWithToolId.length} records missing tool_id`);
    if (recordsWithIntegrationId.length < junctionRecords.length) warnings.push(`${junctionRecords.length - recordsWithIntegrationId.length} records missing integration_id`);
    if (recordsWithQuality.length < junctionRecords.length) warnings.push(`${junctionRecords.length - recordsWithQuality.length} records missing integration_quality`);
    if (recordsWithSource.length < junctionRecords.length) warnings.push(`${junctionRecords.length - recordsWithSource.length} records missing verification_source`);
    addTestResult(3, 'Required fields configured correctly', false, 'Some records are missing required fields', warnings);
  }

  // Test 4: Select Options Correct
  const validQualityOptions = ['Native', 'API', 'Zapier', 'Manual', 'Not Supported'];
  const validSourceOptions = ['Vendor Documentation', 'Partner Directory', 'Support', 'Tested', 'AI Research'];

  const qualityValues = new Set(junctionRecords.map(r => r.fields.integration_quality).filter(Boolean));
  const sourceValues = new Set(junctionRecords.map(r => r.fields.verification_source).filter(Boolean));

  const invalidQualityValues = Array.from(qualityValues).filter(v => !validQualityOptions.includes(v as string));
  const invalidSourceValues = Array.from(sourceValues).filter(v => !validSourceOptions.includes(v as string));

  const selectOptionsOk = invalidQualityValues.length === 0 && invalidSourceValues.length === 0;

  if (selectOptionsOk) {
    addTestResult(4, 'Select options correct', true,
      `integration_quality values: ${Array.from(qualityValues).join(', ')}\n   verification_source values: ${Array.from(sourceValues).join(', ')}`);
  } else {
    const warnings = [];
    if (invalidQualityValues.length > 0) warnings.push(`Invalid integration_quality values: ${invalidQualityValues.join(', ')}`);
    if (invalidSourceValues.length > 0) warnings.push(`Invalid verification_source values: ${invalidSourceValues.join(', ')}`);
    addTestResult(4, 'Select options correct', false, 'Some values are not in the allowed list', warnings);
  }

  // Test 5: Links Work Both Ways
  try {
    toolRecords = await getAllRecords<ToolFields>('TOOLS');
    integrationRecords = await getAllRecords<IntegrationFields>('INTEGRATIONS');

    const toolsWithIntegrations = toolRecords.filter(t => t.fields.integrations && t.fields.integrations.length > 0);
    const integrationsWithTools = integrationRecords.filter(i => i.fields.tools && i.fields.tools.length > 0);

    const linksOk = toolsWithIntegrations.length > 0 && integrationsWithTools.length > 0;

    if (linksOk) {
      addTestResult(5, 'Bidirectional links work', true,
        `${toolsWithIntegrations.length} tools have integrations, ${integrationsWithTools.length} integrations have tools`);
    } else {
      const warnings = [];
      if (toolsWithIntegrations.length === 0) warnings.push('No tools have integrations linked');
      if (integrationsWithTools.length === 0) warnings.push('No integrations have tools linked');
      addTestResult(5, 'Bidirectional links work', false, 'Bidirectional links may not be configured', warnings);
    }
  } catch (error) {
    addTestResult(5, 'Bidirectional links work', false, `Failed to check links: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Test 6: Test Records Valid
  const testRecords = junctionRecords.filter(r =>
    r.fields.integration_notes?.includes('Test record') ||
    r.fields.last_verified === '2025-11-28'
  );

  const testRecordsValid = testRecords.length >= 3;

  if (testRecordsValid) {
    addTestResult(6, 'Test records valid', true, `Found ${testRecords.length} test records created by test script`);
  } else {
    addTestResult(6, 'Test records valid', false, `Only ${testRecords.length} test records found (expected at least 3)`);
  }

  // Test 7: Count Field Works
  const workdayIntegration = integrationRecords.find(i => i.fields.integration_name === 'Workday');
  const slackIntegration = integrationRecords.find(i => i.fields.integration_name === 'Slack');

  const workdayCount = workdayIntegration?.fields.tools_count || 0;
  const slackCount = slackIntegration?.fields.tools_count || 0;

  const countFieldWorks = (workdayCount > 0 || slackCount > 0);

  if (countFieldWorks) {
    addTestResult(7, 'Count field works', true,
      `Workday tools_count: ${workdayCount}, Slack tools_count: ${slackCount}`);
  } else {
    const warnings = ['Count field may not be configured correctly'];
    if (workdayIntegration) warnings.push(`Workday exists but tools_count = ${workdayCount}`);
    if (slackIntegration) warnings.push(`Slack exists but tools_count = ${slackCount}`);
    addTestResult(7, 'Count field works', false, 'Count fields are not updating', warnings);
  }

  // Test 8: Quality Values Valid
  const qualityValuesValid = Array.from(qualityValues).every(v => validQualityOptions.includes(v as string));

  if (qualityValuesValid) {
    addTestResult(8, 'Quality values valid', true, `All integration_quality values are from allowed set: ${Array.from(qualityValues).join(', ')}`);
  } else {
    addTestResult(8, 'Quality values valid', false, `Some quality values are invalid: ${Array.from(qualityValues).join(', ')}`);
  }

  // Test 9: Date Fields Functional
  const recordsWithDates = junctionRecords.filter(r => r.fields.last_verified);
  const dateFormatValid = recordsWithDates.every(r => {
    const date = r.fields.last_verified;
    return date && /^\d{4}-\d{2}-\d{2}$/.test(date);
  });

  if (dateFormatValid && recordsWithDates.length > 0) {
    addTestResult(9, 'Date fields functional', true, `${recordsWithDates.length} records have valid last_verified dates in YYYY-MM-DD format`);
  } else {
    const warnings = [];
    if (recordsWithDates.length === 0) warnings.push('No records have last_verified dates');
    if (!dateFormatValid) warnings.push('Some dates are not in correct format (expected YYYY-MM-DD)');
    addTestResult(9, 'Date fields functional', false, 'Date fields may not be configured correctly', warnings);
  }

  // Test 10: Junction Query Works
  try {
    // Query 1: Get all integrations for BambooHR
    const bambooHR = toolRecords.find(t => t.fields.tool_name === 'BambooHR');
    const bambooHRIntegrations = bambooHR
      ? junctionRecords.filter(j => j.fields.tool_id?.includes(bambooHR.id))
      : [];

    // Query 2: Get all tools using Slack
    const slack = integrationRecords.find(i => i.fields.integration_name === 'Slack');
    const slackTools = slack
      ? junctionRecords.filter(j => j.fields.integration_id?.includes(slack.id))
      : [];

    const queryWorks = (bambooHRIntegrations.length > 0 || slackTools.length > 0);

    if (queryWorks) {
      let details = '';
      if (bambooHRIntegrations.length > 0) details += `BambooHR has ${bambooHRIntegrations.length} integrations. `;
      if (slackTools.length > 0) details += `Slack is used by ${slackTools.length} tools.`;
      addTestResult(10, 'Junction queries work', true, details);
    } else {
      addTestResult(10, 'Junction queries work', false, 'Cannot query junction records by tool or integration');
    }
  } catch (error) {
    addTestResult(10, 'Junction queries work', false, `Query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Summary
  console.log('\n======================================================================');
  console.log('📊 TEST SUMMARY');
  console.log('======================================================================\n');

  const passedTests = testResults.filter(r => r.passed).length;
  const totalTests = testResults.length;
  const allPassed = passedTests === totalTests;

  if (allPassed) {
    console.log(`✅ ALL CHECKS PASSED (${passedTests}/${totalTests})`);
    console.log('\n🎉 Junction table is ready!');
    console.log('✅ Ready for vendor data import (TASK-410 to TASK-418)');
  } else {
    console.log(`⚠️  ${passedTests}/${totalTests} checks passed\n`);
    console.log('Failed tests:');
    testResults.filter(r => !r.passed).forEach(r => {
      console.log(`  ${r.testNumber}. ${r.name}: ${r.details}`);
    });
    console.log('\n💡 Review failed tests and check Airtable configuration');
  }

  // Display sample junction record
  if (junctionRecords.length > 0) {
    console.log('\n📊 Sample Junction Record:\n');
    const sample = junctionRecords[0];

    // Look up tool and integration names
    const toolName = sample.fields.tool_id
      ? toolRecords.find(t => sample.fields.tool_id?.includes(t.id))?.fields.tool_name
      : 'Unknown';
    const integrationName = sample.fields.integration_id
      ? integrationRecords.find(i => sample.fields.integration_id?.includes(i.id))?.fields.integration_name
      : 'Unknown';

    console.log(JSON.stringify({
      junction_id: sample.fields.junction_id,
      tool_id: sample.fields.tool_id,
      tool_name: toolName,
      integration_id: sample.fields.integration_id,
      integration_name: integrationName,
      integration_quality: sample.fields.integration_quality,
      integration_notes: sample.fields.integration_notes?.substring(0, 60) + '...',
      last_verified: sample.fields.last_verified,
      verification_source: sample.fields.verification_source,
    }, null, 2));
  }

  // Display relationship test
  console.log('\n🔗 Relationship Test:\n');

  const bambooHR = toolRecords.find(t => t.fields.tool_name === 'BambooHR');
  if (bambooHR) {
    const bambooIntegrations = junctionRecords
      .filter(j => j.fields.tool_id?.includes(bambooHR.id))
      .map(j => {
        const integration = integrationRecords.find(i => j.fields.integration_id?.includes(i.id));
        return `${integration?.fields.integration_name} (${j.fields.integration_quality})`;
      });

    if (bambooIntegrations.length > 0) {
      console.log('BambooHR integrates with:');
      bambooIntegrations.forEach(i => console.log(`  - ${i}`));
      console.log('');
    }
  }

  const slack = integrationRecords.find(i => i.fields.integration_name === 'Slack');
  if (slack) {
    const slackTools = junctionRecords
      .filter(j => j.fields.integration_id?.includes(slack.id))
      .map(j => {
        const tool = toolRecords.find(t => j.fields.tool_id?.includes(t.id));
        return `${tool?.fields.tool_name} (${j.fields.integration_quality})`;
      });

    if (slackTools.length > 0) {
      console.log('Slack is used by:');
      slackTools.forEach(t => console.log(`  - ${t}`));
      console.log('');
    }
  }

  console.log('======================================================================\n');
}

// Run all validation tests
runValidationTests();
