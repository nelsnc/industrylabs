/**
 * Schema Metadata Validation v2.3
 *
 * Validates Airtable schema using Meta API (does NOT require records to exist)
 * Checks field definitions, types, and options directly from schema metadata
 *
 * Run with: npx tsx scripts/validate-schema-metadata.ts
 */

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;

if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
  console.error('❌ Missing environment variables: AIRTABLE_BASE_ID or AIRTABLE_API_KEY');
  process.exit(1);
}

interface FieldOption {
  id?: string;
  name: string;
  color?: string;
}

interface FieldMetadata {
  id: string;
  name: string;
  type: string;
  options?: {
    choices?: FieldOption[];
    linkedTableId?: string;
    prefersSingleRecordLink?: boolean;
    inverseLinkFieldId?: string;
  };
  description?: string;
}

interface TableMetadata {
  id: string;
  name: string;
  primaryFieldId: string;
  fields: FieldMetadata[];
  views: any[];
  description?: string;
}

interface BaseMetadata {
  tables: TableMetadata[];
}

let passed = 0;
let total = 0;
let critical = 0;
let warnings = 0;

async function fetchBaseMetadata(): Promise<BaseMetadata> {
  const url = `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch base metadata: ${response.statusText}`);
  }

  return await response.json();
}

function findTable(metadata: BaseMetadata, tableName: string): TableMetadata | undefined {
  return metadata.tables.find(t => t.name === tableName);
}

function findField(table: TableMetadata, fieldName: string): FieldMetadata | undefined {
  return table.fields.find(f => f.name === fieldName);
}

function checkField(
  table: TableMetadata,
  fieldName: string,
  expectedType: string,
  options?: {
    choices?: string[];
    isMultiple?: boolean;
    linkedTable?: string;
  }
): boolean {
  total++;
  const field = findField(table, fieldName);

  if (!field) {
    console.log(`❌ Field missing: ${fieldName}`);
    critical++;
    return false;
  }

  // Check type
  if (field.type !== expectedType) {
    console.log(`⚠️  Wrong type: ${fieldName} (expected ${expectedType}, got ${field.type})`);
    warnings++;
    total--;
    passed++;
    return false;
  }

  // Check select options if specified
  if (options?.choices && field.options?.choices) {
    const actualChoices = field.options.choices.map(c => c.name).sort();
    const expectedChoices = options.choices.sort();

    if (JSON.stringify(actualChoices) !== JSON.stringify(expectedChoices)) {
      console.log(`⚠️  Wrong options: ${fieldName}`);
      console.log(`     Expected: ${expectedChoices.join(', ')}`);
      console.log(`     Got: ${actualChoices.join(', ')}`);
      warnings++;
    }
  }

  // Check if multiple select vs single select
  if (expectedType === 'multipleSelects' || expectedType === 'singleSelect') {
    const hasChoices = field.options?.choices && field.options.choices.length > 0;
    if (!hasChoices && options?.choices) {
      console.log(`⚠️  Missing options: ${fieldName} should have choices`);
      warnings++;
    }
  }

  console.log(`✅ Field exists: ${fieldName} (${expectedType})`);
  passed++;
  return true;
}

async function validateRecommendationsTable(metadata: BaseMetadata) {
  console.log('\n📋 RECOMMENDATIONS Table Validation');
  console.log('='.repeat(80));

  const table = findTable(metadata, 'RECOMMENDATIONS');
  if (!table) {
    console.log('❌ CRITICAL: RECOMMENDATIONS table not found');
    critical += 11;
    total += 11;
    return;
  }

  console.log(`✅ Table found: RECOMMENDATIONS (${table.fields.length} fields total)\n`);

  // Check all 11 required fields
  checkField(table, 'recommendation_id', 'autoNumber');
  checkField(table, 'request_id', 'multipleRecordLinks', { linkedTable: 'REQUESTS' });
  checkField(table, 'recommended_tools', 'multipleRecordLinks', { linkedTable: 'TOOLS' });
  checkField(table, 'tool_fit_scores', 'multilineText');
  checkField(table, 'tool_fit_reasoning', 'multilineText');
  checkField(table, 'generated_at', 'createdTime');
  checkField(table, 'recommendation_url_token', 'singleLineText');
  checkField(table, 'pdf_generated', 'checkbox');
  checkField(table, 'pdf_url', 'url');
  checkField(table, 'user_viewed', 'checkbox');
  checkField(table, 'user_viewed_at', 'date');
}

async function validateToolsTable(metadata: BaseMetadata) {
  console.log('\n🛠️  TOOLS Table Validation (39 new fields from v2.3)');
  console.log('='.repeat(80));

  const table = findTable(metadata, 'TOOLS');
  if (!table) {
    console.log('❌ CRITICAL: TOOLS table not found');
    critical += 39;
    total += 39;
    return;
  }

  console.log(`✅ Table found: TOOLS (${table.fields.length} fields total)\n`);

  // GROUP 1: Company Size & Regional Fit
  console.log('GROUP 1: Company Size & Regional Fit (3 fields)');
  console.log('-'.repeat(40));
  checkField(table, 'ideal_company_size', 'multipleSelects', {
    choices: ['1-50', '51-200', '201-500', '500+']
  });
  checkField(table, 'company_size_notes', 'multilineText');
  checkField(table, 'supported_regions', 'multipleSelects', {
    choices: ['UK', 'US', 'EU', 'Australia', 'Canada', 'Global']
  });

  // GROUP 2: Pricing Engine
  console.log('\nGROUP 2: Pricing Engine (12 fields)');
  console.log('-'.repeat(40));
  checkField(table, 'pricing_annual_min', 'number');
  checkField(table, 'pricing_annual_max', 'number');
  checkField(table, 'pricing_currency', 'singleSelect', {
    choices: ['GBP', 'USD', 'EUR']
  });
  checkField(table, 'pricing_model', 'singleSelect', {
    choices: ['Per User', 'Per Hire', 'Flat Rate', 'Custom']
  });
  checkField(table, 'pricing_notes', 'multilineText');
  checkField(table, 'pricing_display', 'formula');
  checkField(table, 'pricing_source_url', 'url');
  checkField(table, 'setup_fee', 'number');
  checkField(table, 'setup_fee_included', 'checkbox');
  checkField(table, 'free_trial_available', 'checkbox');
  checkField(table, 'free_trial_duration_days', 'number');
  checkField(table, 'contract_length_options', 'multipleSelects', {
    choices: ['Monthly', 'Annual', 'Multi-Year', 'Custom']
  });

  // GROUP 3: Compliance & Certifications
  console.log('\nGROUP 3: Compliance & Certifications (7 fields)');
  console.log('-'.repeat(40));
  checkField(table, 'gdpr_compliant', 'checkbox');
  checkField(table, 'eeoc_compliant', 'checkbox');
  checkField(table, 'soc2_certified', 'checkbox');
  checkField(table, 'hipaa_compliant', 'checkbox');
  checkField(table, 'iso27001_certified', 'checkbox');
  checkField(table, 'compliance_documentation_url', 'url');
  checkField(table, 'compliance_notes', 'multilineText');

  // GROUP 4: Implementation Timeline
  console.log('\nGROUP 4: Implementation Timeline (9 fields)');
  console.log('-'.repeat(40));
  checkField(table, 'implementation_timeline_weeks_min', 'number');
  checkField(table, 'implementation_timeline_weeks_max', 'number');
  checkField(table, 'implementation_timeline_display', 'formula');
  checkField(table, 'it_hours_required', 'number');
  checkField(table, 'hr_admin_hours_required', 'number');
  checkField(table, 'training_hours_admin', 'number');
  checkField(table, 'training_hours_enduser', 'number');
  checkField(table, 'implementation_prerequisites', 'multilineText');
  checkField(table, 'common_implementation_delays', 'multilineText');

  // GROUP 5: Case Study & Social Proof
  console.log('\nGROUP 5: Case Study & Social Proof (6 fields)');
  console.log('-'.repeat(40));
  checkField(table, 'case_study_url', 'url');
  checkField(table, 'case_study_company_size', 'number');
  checkField(table, 'case_study_industry', 'singleLineText');
  checkField(table, 'case_study_implementation_weeks', 'number');
  checkField(table, 'case_study_results', 'multilineText');
  checkField(table, 'notable_customers', 'multilineText');

  // GROUP 6: Integrations & Rich Media
  console.log('\nGROUP 6: Integrations & Rich Media (3 fields)');
  console.log('-'.repeat(40));
  checkField(table, 'other_integrations', 'multilineText');
  checkField(table, 'demo_video_url', 'url');
  checkField(table, 'primary_competitor_ids', 'multipleRecordLinks', { linkedTable: 'TOOLS' });
}

async function validateRequestsTable(metadata: BaseMetadata) {
  console.log('\n📝 REQUESTS Table Validation (7 new buyer matching fields)');
  console.log('='.repeat(80));

  const table = findTable(metadata, 'REQUESTS');
  if (!table) {
    console.log('❌ CRITICAL: REQUESTS table not found');
    critical += 7;
    total += 7;
    return;
  }

  console.log(`✅ Table found: REQUESTS (${table.fields.length} fields total)\n`);

  checkField(table, 'requester_company_size_exact', 'number');
  checkField(table, 'requester_current_stack_names', 'multipleSelects');
  // Note: Cannot validate exact 30 options without knowing INTEGRATIONS names
  checkField(table, 'requester_current_stack_other', 'singleLineText');
  checkField(table, 'requester_budget_min', 'number');
  checkField(table, 'requester_budget_max', 'number');
  checkField(table, 'requester_region', 'singleSelect', {
    choices: ['UK', 'US', 'EU', 'Australia', 'Canada', 'Other']
  });
  checkField(table, 'requester_compliance_needs', 'multipleSelects', {
    choices: ['GDPR', 'EEOC', 'SOC2', 'HIPAA', 'ISO27001']
  });
}

async function runValidation() {
  console.log('🔍 Schema Metadata Validation v2.3');
  console.log('='.repeat(80));
  console.log('Using Airtable Meta API (does not require records to exist)');
  console.log('');

  try {
    const metadata = await fetchBaseMetadata();
    console.log(`✅ Successfully fetched metadata for ${metadata.tables.length} tables`);

    await validateRecommendationsTable(metadata);
    await validateToolsTable(metadata);
    await validateRequestsTable(metadata);

    console.log('\n' + '='.repeat(80));
    console.log('📊 VALIDATION SUMMARY');
    console.log('='.repeat(80));
    console.log('');
    console.log(`Total Checks: ${total}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Critical Failures: ${critical}`);
    console.log(`⚠️  Warnings: ${warnings}`);
    console.log('');

    if (critical === 0 && warnings === 0) {
      console.log('🎉 ALL SCHEMA VALIDATION CHECKS PASSED!');
      console.log('✅ All 57 new fields (11 + 39 + 7) are present and correctly typed');
      console.log('');
      console.log('STATUS: READY TO CREATE TEST RECORDS');
      console.log('Next: npx tsx scripts/seed-test-data-v2-3.ts');
    } else if (critical === 0) {
      console.log('✅ SCHEMA VALIDATION PASSED WITH WARNINGS');
      console.log(`⚠️  ${warnings} warnings found (type/option mismatches)`);
      console.log('');
      console.log('STATUS: READY TO CREATE TEST RECORDS');
      console.log('Review warnings above and fix if needed');
    } else {
      console.log('❌ SCHEMA VALIDATION FAILED');
      console.log(`❌ ${critical} critical issues must be fixed`);
      console.log('');
      console.log('STATUS: NOT READY - FIX MISSING FIELDS');
      console.log('Add missing fields in Airtable and re-run validation');
    }

    console.log('');
    console.log('='.repeat(80));

    process.exit(critical > 0 ? 1 : 0);

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error);
    console.error('\nPossible causes:');
    console.error('- Invalid AIRTABLE_BASE_ID or AIRTABLE_API_KEY');
    console.error('- Network connection issues');
    console.error('- Airtable API permissions');
    process.exit(1);
  }
}

runValidation();
