# Schema Validation Scripts

## Purpose
Validates Airtable schema changes against specifications using the Meta API.

## Scripts

### `validate-schema-metadata.ts`
Checks schema structure via Airtable Meta API (doesn't require data).

**Usage:**
```bash
npx tsx scripts/validation/validate-schema-metadata.ts
```

**What it checks:**
- Field names match specification exactly
- Field types are correct (number, checkbox, multipleSelects, etc.)
- Select field options are present
- Link relationships are configured

**Output:** Pass/fail for each field, summary report with counts.

---

### `seed-test-data-v2-3.ts`
Creates test records for v2.3 fields validation.

**Usage:**
```bash
DEBUG_AIRTABLE=false npx tsx scripts/validation/seed-test-data-v2-3.ts
```

**What it does:**
- Creates 1 TOOLS record with all 39 new fields populated
- Creates 1 REQUESTS record with all 7 buyer matching fields
- Creates 1 RECOMMENDATIONS record linking them together

**Note:** Skips creation if "Test Tool v2.3" already exists.

---

### `test-pricing-formatter-integration.ts`
End-to-end test of pricing formatter with real Airtable data.

**Usage:**
```bash
DEBUG_AIRTABLE=false npx tsx scripts/validation/test-pricing-formatter-integration.ts
```

**What it tests:**
- formatPricing() utility with real TOOLS records
- All pricing fields (min, max, currency, model, trial)
- Number formatting, currency symbols, display strings
- 6 validation checks per tool

**Output:** Detailed test results for each tool, pass/fail summary.

---

## When to Use

**After manual Airtable schema changes:**
- Adding new fields or tables
- Modifying field types or options
- Changing link relationships

**Before deploying new features:**
- Features that depend on specific schema structure
- New utilities that read/write Airtable fields
- Integration with frontend components

**When debugging schema-related issues:**
- Fields not appearing in API responses
- Type mismatches causing errors
- Missing select options

**During developer onboarding:**
- Verify local environment connects to Airtable
- Understand schema structure and validation process
- Learn best practices for schema changes

---

## Complete Validation Workflow

Run all three scripts in sequence:

```bash
# 1. Validate schema structure
npx tsx scripts/validation/validate-schema-metadata.ts

# 2. Create test data (if needed)
DEBUG_AIRTABLE=false npx tsx scripts/validation/seed-test-data-v2-3.ts

# 3. Run integration tests
DEBUG_AIRTABLE=false npx tsx scripts/validation/test-pricing-formatter-integration.ts
```

All scripts should exit with code 0 (success).

---

## Reports

Validation reports saved to `docs/validation/`:
- `SCHEMA_V2_3_VALIDATION_FINAL.md` - Complete validation report with all results

---

## Environment Variables Required

```bash
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_API_KEY=your_api_key
```

Ensure these are set in your `.env` file.

---

## Troubleshooting

**"Cannot access table" errors:**
- Verify AIRTABLE_BASE_ID and AIRTABLE_API_KEY are correct
- Check table names match exactly (case-sensitive)
- Ensure API key has read permissions

**"Unknown field name" errors:**
- Field doesn't exist in Airtable schema
- Field name typo (check exact spelling/capitalization)
- Run validate-schema-metadata.ts to see all field names

**"Invalid select option" errors:**
- Trying to use option not in predefined list
- Check field options in Airtable UI
- Use get-requester-stack-options.ts to see valid options

---

## v2.3 Schema Validation Results

**Status:** ✅ ALL PASSED

- RECOMMENDATIONS: 11/11 fields ✅
- TOOLS: 39/39 new fields ✅
- REQUESTS: 7/7 new fields ✅
- Integration tests: 4/4 tools ✅
- Unit tests: 30/30 ✅

**Total:** 94/94 checks passed (100%)

See `docs/validation/SCHEMA_V2_3_VALIDATION_FINAL.md` for detailed report.
