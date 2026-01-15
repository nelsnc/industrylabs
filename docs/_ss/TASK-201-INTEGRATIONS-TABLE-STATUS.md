# TASK-201: INTEGRATIONS Table Creation - Status Report

**Date:** 2025-11-28
**Task:** Create INTEGRATIONS table in Airtable with 30 canonical integration records
**Status:** ❌ **BLOCKED - Manual Schema Update Required**

---

## Executive Summary

The INTEGRATIONS table **already exists** in Airtable but has an **outdated schema** that doesn't match Schema v2.3 specifications from the Airtable Schema documentation.

**Current State:**
- ✅ Table exists (ID: `tbl1L7qSrySwruND1`)
- ✅ 8 records already populated (Workday, BambooHR, Slack, Greenhouse, Zendesk, etc.)
- ❌ Schema is outdated (uses `platform_name`, wrong field types)
- ❌ Missing required fields (`integration_type`, `website_url`, `is_common`, etc.)

**Why Blocked:**
The Airtable REST API **cannot modify table schemas** - it can only create/read/update/delete records. Schema changes (renaming fields, changing field types, adding new fields) must be done manually in the Airtable Web UI.

**Required Action:**
Nelson must manually update the table schema in Airtable Web UI, then the remaining 22 records can be populated programmatically.

---

## Current Schema vs Required Schema

### Current Schema (OLD ❌)

| Field Name | Type | Notes |
|------------|------|-------|
| `platform_name` | Single line text | Should be `integration_name` |
| `platform_category` | Single select | Should be Multiple select with different options |
| `tools_with_integration` | Multiple record links | Links to TOOLS table |
| `integration_count` | Formula | Should be Count field named `tools_count` |

**Missing Fields:**
- `integration_id` (Autonumber - Primary key)
- `integration_type` (Single select: Core/Complementary)
- `logo_url` (URL)
- `website_url` (URL, required)
- `is_common` (Checkbox, required)

### Required Schema (Schema v2.3 ✅)

| Field Name | Type | Required | Options/Notes |
|------------|------|----------|---------------|
| `integration_id` | Autonumber | Auto | Primary key |
| `integration_name` | Single line text | ✓ | Official product name |
| `integration_category` | Multiple select | ✓ | Options: HRIS, ATS, Payroll, Communication, Calendar, Other |
| `integration_type` | Single select | ✓ | Options: Core, Complementary |
| `logo_url` | URL | | Integration logo |
| `website_url` | URL | ✓ | Official website |
| `is_common` | Checkbox | ✓ | Show in filters? (Top 20) |
| `tools_count` | Count | Auto | Links from TOOLS_INTEGRATIONS (TASK-202) |

---

## Existing Data (8 Records)

Current records in the table:

1. **Greenhouse** - ATS → Keep (already in target list)
2. **Zendesk** - Helpdesk → Keep (categorize as "Other")
3. **BambooHR** - HRIS → Keep (already in target list)
4. **Workday** - HRIS → Keep (already in target list)
5. **Slack** - Comms → Keep (already in target list)
6. **Salesforce** - CRM → **Decision needed:** Keep as "Other" or remove?
7. **Microsoft Teams** - Comms → Keep (already in target list)
8. **Google Workspace** - Comms → **Decision needed:** Use as umbrella for Google services or remove?

**Note:** 5 out of 8 existing records are already in the target list of 30. The other 3 (Salesforce, Zendesk, Google Workspace) need decisions on whether to keep or replace.

These records have:
- ✓ `platform_name` values
- ✓ `platform_category` values
- ✓ Links to TOOLS table
- ❌ Missing `integration_type`, `website_url`, `is_common`

---

## Manual Schema Update Steps

### Option A: Update Existing Table (RECOMMENDED - Preserves Data)

**Access the table:**
https://airtable.com/appSVag6nxAUixXOa/tbl1L7qSrySwruND1

**1. Rename and Update Fields**

#### Field 1: `platform_name` → `integration_name`
- Click field header → "Customize field"
- Name: `integration_name`
- Type: Single line text (keep as is)
- Required: ✓ Check
- Save

#### Field 2: `platform_category` → `integration_category`
- Click field header → "Customize field"
- Name: `integration_category`
- Type: Change from "Single select" to **"Multiple select"**
- Delete old options, add these:
  - HRIS
  - ATS
  - Payroll
  - Communication
  - Calendar
  - Other
- Required: ✓ Check
- Save
- ⚠️ **WARNING:** This will clear existing category data - you'll need to re-assign

#### Field 3: Rename `integration_count` → `tools_count`
- Click field header → "Customize field"
- Name: `tools_count`
- Type: Keep as is (Count or Formula)
- Save

**2. Add New Fields**

#### Field 4: Add `integration_id`
- Click "+" button
- Name: `integration_id`
- Type: **Autonumber**
- Save
- Note: This will auto-assign IDs to existing records

#### Field 5: Add `integration_type`
- Click "+" button
- Name: `integration_type`
- Type: **Single select**
- Options:
  - Core
  - Complementary
- Required: ✓ Check
- Save

#### Field 6: Add `logo_url`
- Click "+" button
- Name: `logo_url`
- Type: **URL**
- Save

#### Field 7: Add `website_url`
- Click "+" button
- Name: `website_url`
- Type: **URL**
- Required: ✓ Check
- Save

#### Field 8: Add `is_common`
- Click "+" button
- Name: `is_common`
- Type: **Checkbox**
- Required: ✓ Check
- Save

**3. Update Existing 8 Records**

Manually populate the new fields for existing records:

| integration_name | integration_category | integration_type | website_url | is_common |
|-----------------|---------------------|------------------|-------------|-----------|
| Greenhouse | [ATS] | Core | https://www.greenhouse.io | ☑ |
| Zendesk | [Other] | Complementary | https://www.zendesk.com | ☑ |
| BambooHR | [HRIS] | Core | https://www.bamboohr.com | ☑ |
| Workday | [HRIS] | Core | https://www.workday.com | ☑ |
| Slack | [Communication] | Complementary | https://slack.com | ☑ |
| Salesforce | [Other] | Complementary | https://www.salesforce.com | ☑ |
| Microsoft Teams | [Communication] | Complementary | https://www.microsoft.com/en-us/microsoft-teams | ☑ |
| Google Workspace | [Communication, Calendar] | Complementary | https://workspace.google.com | ☑ |

**Note:** Microsoft Teams is already in the target list. Salesforce, Zendesk, and Google Workspace are extras - keep them or remove based on business needs.

**4. Add Remaining 22 Records**

After schema is updated, run this script:

```bash
npx tsx scripts/populate-integrations-table.ts
```

This will programmatically add the 22 missing integrations.

---

### Option B: Delete and Recreate Table (NOT RECOMMENDED)

⚠️ **WARNING:** This will delete 8 existing records and any links to TOOLS table.

Only use this if Option A is too difficult or if the existing data is not important.

**Steps:**
1. Go to Airtable base
2. Click INTEGRATIONS table → Table settings → Delete table
3. Create new table named "INTEGRATIONS"
4. Add all 8 fields manually (see schema above)
5. Import data using CSV file: `data/integrations-import.csv`

---

## CSV Import File

**Location:** `/data/integrations-import.csv`

Contains all 30 integration records ready for import. Use this if:
- You chose Option B (delete and recreate)
- You want to import via Airtable's CSV import feature

**Import Instructions:**
1. Go to INTEGRATIONS table in Airtable
2. Click "..." menu → "Import data" → "CSV file"
3. Upload: `/Users/nelsnc/Projects/industrylabs/data/integrations-import.csv`
4. Map fields:
   - integration_name → integration_name
   - integration_category → integration_category (Airtable will parse comma-separated values)
   - integration_type → integration_type
   - website_url → website_url
   - is_common → is_common (TRUE/FALSE → checked/unchecked)
5. Import

---

## Programmatic Population Script

**Location:** `/scripts/populate-integrations-table.ts`

**Usage:**
```bash
npx tsx scripts/populate-integrations-table.ts
```

**What it does:**
- Creates 30 integration records using Airtable API
- Handles rate limiting (250ms between requests)
- Shows progress and error handling
- **ONLY run this AFTER updating the table schema**

**Features:**
- Validates data before insertion
- Reports success/failure counts
- Lists any errors encountered

---

## Testing and Validation

**Location:** `/scripts/test-integrations-table.ts`

**Usage:**
```bash
npx tsx scripts/test-integrations-table.ts
```

**What it tests:**
1. ✅ Table accessible
2. ✅ Record count (expected: 30)
3. ✅ All required fields present
4. ✅ No duplicate integration names
5. ✅ All expected categories present (HRIS, ATS, Payroll, Communication, Calendar)
6. ✅ Integration types correctly distributed (21 Core, 9 Complementary)
7. ✅ All required fields populated
8. ✅ is_common field set for all records
9. 📊 Sample record display
10. 📊 Category breakdown

**Expected Output:**
```
✅ ALL CHECKS PASSED - INTEGRATIONS table is ready!
✅ Ready for TASK-202 (TOOLS_INTEGRATIONS junction table)
```

---

## 30 Canonical Integrations (Reference)

### HRIS (8 records - Core)
1. Workday
2. BambooHR
3. Rippling (also Payroll)
4. Gusto (also Payroll)
5. Namely
6. Personio
7. Hibob
8. ADP Workforce Now (also Payroll)

### ATS (10 records - Core)
9. Greenhouse
10. Lever
11. Ashby
12. SmartRecruiters
13. Workable
14. JazzHR
15. Breezy HR
16. Recruitee
17. iCIMS
18. Jobvite

### Payroll (3 records - Core)
19. Paychex
20. Justworks
21. Zenefits (also HRIS)

### Communication (5 records - Complementary)
22. Slack
23. Microsoft Teams
24. Google Chat
25. Zoom
26. Google Meet

### Calendar (4 records - Complementary)
27. Google Calendar
28. Outlook Calendar
29. Office 365
30. Apple Calendar

**Note:** Some integrations have multiple categories (e.g., Rippling = [HRIS, Payroll])

---

## Next Steps - Completion Workflow

### Step 1: Manual Schema Update (Nelson - Required)
- [ ] Go to Airtable Web UI
- [ ] Update table schema following "Option A" steps above
- [ ] Update 8 existing records with new required fields
- [ ] Verify schema matches Schema v2.3 specification

### Step 2: Populate Remaining Records (Can be done by Claude or Nelson)
- [ ] Run: `npx tsx scripts/populate-integrations-table.ts`
- [ ] Or import CSV: `data/integrations-import.csv`

### Step 3: Validation (Required)
- [ ] Run: `npx tsx scripts/test-integrations-table.ts`
- [ ] Verify all checks pass
- [ ] Confirm 30 records total

### Step 4: Mark TASK-201 Complete
- [ ] Update Execution Hub
- [ ] Proceed to TASK-202 (TOOLS_INTEGRATIONS junction table)

---

## Files Created

| File | Purpose |
|------|---------|
| `scripts/inspect-integrations-table.ts` | Inspect current table schema and data |
| `scripts/populate-integrations-table.ts` | Programmatically add 30 integration records |
| `scripts/test-integrations-table.ts` | Validate table structure and data quality |
| `data/integrations-import.csv` | CSV file with all 30 records for manual import |
| `docs/TASK-201-INTEGRATIONS-TABLE-STATUS.md` | This status report |

---

## Blockers and Limitations

### Why Can't Claude Do This Automatically?

**Technical Limitation:**
The Airtable REST API (`https://api.airtable.com/v0/`) **does not support schema modifications**. It can only:
- ✅ Create records (POST)
- ✅ Read records (GET)
- ✅ Update records (PATCH)
- ✅ Delete records (DELETE)

It **cannot**:
- ❌ Create tables
- ❌ Rename fields
- ❌ Change field types
- ❌ Add new fields
- ❌ Modify select options

**Metadata API:**
The Airtable Metadata API (`https://api.airtable.com/v0/meta/`) is **read-only** - it can view table schemas but not modify them.

**Solutions that don't work:**
- Third-party SDKs (e.g., `airtable-schema-generator`) - not installed
- Airtable Scripting API - requires Airtable interface, not accessible via REST
- Manual API calls - not supported by Airtable's API design

**Only solution:**
Manual schema updates via Airtable Web UI by a human user (Nelson).

---

## Questions & Support

**If you encounter issues:**

1. **Schema update problems:**
   - Check field type compatibility in Airtable docs
   - Ensure no data will be lost when changing field types
   - Consider backing up data before major changes

2. **CSV import issues:**
   - Verify CSV format matches Airtable's expected format
   - Check that column headers exactly match field names
   - For multiple select values, use comma separation

3. **Script errors:**
   - Run: `npx tsx scripts/debug-airtable-connection.ts` to verify connection
   - Check that `.env.local` has correct credentials
   - Verify table schema matches expected structure

4. **Validation failures:**
   - Review test output for specific issues
   - Check for missing or duplicate data
   - Verify field types and required fields

---

## Related Documentation

- Schema Specification: `AIRTABLE_SCHEMA___DATA_MODEL_2b004538c31a80b78a2bcb16dcd9f947.md` (Section 10)
- Execution Hub: `EXECUTION_HUB_2b004538c31a802d9297cb2d88d83a84.md` (TASK-201)
- Next Task: TASK-202 - Create TOOLS_INTEGRATIONS junction table

---

## Estimated Time to Complete

**Manual Schema Update:** 15-20 minutes
**Populate Records:** 2 minutes (automated script)
**Testing & Validation:** 5 minutes

**Total:** ~25 minutes

---

**Report generated by:** Claude Code
**Timestamp:** 2025-11-28
