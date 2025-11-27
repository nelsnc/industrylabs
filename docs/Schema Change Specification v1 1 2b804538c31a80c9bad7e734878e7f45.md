# Schema Change Specification v1.1

**Incorporating ChatGPT + Gemini Feedback**

**Date**: 2025-11-27
**Status**: FINALIZED - Ready for Implementation
**Changes from v1.0**: Critical fixes for Airtable record limits, integration duplicates, pricing display, and implementation logic

---

## CRITICAL CHANGES BASED ON FEEDBACK

### **CHANGE 1: Two-Track Integration Strategy (ChatGPT Warning)**

**Problem Identified**: Junction table will consume 40% of Airtable's 50K record limit with just 1,000 tools.

**Solution**: Dual-track approach

**Track 1 - Structured (High-Value Integrations)**:

- Use `TOOLS_INTEGRATIONS` junction table ONLY for **Top 30 Core Integrations**
- These are integrations where quality distinction (Native vs Zapier) is critical
- Includes: HRIS (Workday, BambooHR, etc.), ATS (Greenhouse, Lever, etc.), Core Communication (Slack, Teams)

**Track 2 - Unstructured (Long-Tail Integrations)**:

- Add new field in TOOLS table: `other_integrations` (Long Text)
- Format: Comma-separated list or simple JSON
- Example: "Zoom, Discord, Calendly, Loom, Notion, Asana"
- Used for: Integrations users rarely filter by

**Record Count Impact**:

- Before: 1,000 tools × 20 integrations = 20,000 records
- After: 1,000 tools × 5 core integrations = 5,000 records (75% reduction)

---

### **CHANGE 2: Fix Integration Duplicates (Gemini Warning)**

**Problem Identified**: ADP, Gusto, Rippling appear in both HRIS and Payroll lists

**Solution**: Change `integration_category` from Single Select → Multiple Select

**Affected Field**:

`INTEGRATIONS table:
- integration_category (Multiple Select): ["HRIS", "ATS", "Payroll", "Communication", "Calendar", "Other"]

Example:
- "Rippling": ["HRIS", "Payroll"]
- "Gusto": ["HRIS", "Payroll"]
- "ADP Workforce Now": ["Payroll"]`

**Canonical Names** (no duplicates):

`HRIS/Payroll Hybrids:
- Rippling (categories: ["HRIS", "Payroll"])
- Gusto (categories: ["HRIS", "Payroll"])

Payroll-Only:
- ADP Workforce Now (category: ["Payroll"])
- Paychex (category: ["Payroll"])
- Justworks (category: ["Payroll"])

HRIS-Only:
- Workday (category: ["HRIS"])
- BambooHR (category: ["HRIS"])
- Namely (category: ["HRIS"])`

---

### **CHANGE 3: Pricing Display Formula Clarification (Gemini Warning)**

**Problem Identified**: Formula produces "GBP 6000" but example shows "£6,000"

**Solution**: Keep Airtable formula simple, format in Next.js

**Airtable Formula** (stores raw data):

`IF(
  AND({pricing_annual_min}, {pricing_annual_max}),
  CONCATENATE(
    {pricing_currency}, 
    " ",
    {pricing_annual_min}, 
    " - ", 
    {pricing_annual_max}
  ),
  IF(
    {pricing_annual_min},
    CONCATENATE({pricing_currency}, " ", {pricing_annual_min}, "+"),
    "Custom"
  )
)`

**Output**: "GBP 6000 - 15000" or "USD 10000+" or "Custom"

**Next.js Formatting** (display to users):

javascript

`function formatPricing(airtableValue) {
  if (!airtableValue || airtableValue === "Custom") {
    return "Custom Pricing - Contact Vendor";
  }
  
  *// Parse: "GBP 6000 - 15000" or "USD 10000+"*
  const [currency, ...rest] = airtableValue.split(' ');
  const numbers = rest.join(' ');
  
  const symbol = {
    'GBP': '£',
    'USD': '$',
    'EUR': '€'
  }[currency] || currency;
  
  *// Add thousand separators*
  const formatted = numbers.replace(/\b\d+\b/g, num => 
    parseInt(num).toLocaleString('en-GB')
  );
  
  return `${symbol}${formatted}/year`;
}

*// Output: "£6,000 - £15,000/year" or "$10,000+/year"*`

---

### **CHANGE 4: Implementation Timeline Logic Correction (Gemini Warning)**

**Problem Identified**: Pseudocode references non-existent `ideal_company_size_max` field

**Solution**: Proper bucket-based logic

**Correct Implementation**:

javascript

`*// Bucket definitions*
const SIZE_BUCKETS = {
  "1-50": { min: 1, max: 50 },
  "51-200": { min: 51, max: 200 },
  "201-500": { min: 201, max: 500 },
  "500+": { min: 501, max: 5000 }
};

function estimateTimelineForBuyer(tool, buyerCompanySize) {
  const minWeeks = tool.implementation_timeline_weeks_min;
  const maxWeeks = tool.implementation_timeline_weeks_max;
  
  if (!minWeeks || !maxWeeks) {
    return null; *// No estimate available*
  }
  
  const idealBuckets = tool.ideal_company_size || []; *// e.g., ["51-200", "201-500"]*
  
  *// Check if buyer's size falls within any ideal bucket*
  const isInIdealRange = idealBuckets.some(bucket => {
    const range = SIZE_BUCKETS[bucket];
    if (!range) return false;
    return buyerCompanySize >= range.min && buyerCompanySize <= range.max;
  });
  
  if (isInIdealRange) {
    *// Use midpoint for companies in ideal range*
    return Math.round((minWeeks + maxWeeks) / 2);
  }
  
  *// Find maximum ideal size across all buckets*
  const maxIdealSize = Math.max(
    ...idealBuckets.map(bucket => SIZE_BUCKETS[bucket]?.max || 0)
  );
  
  if (buyerCompanySize > maxIdealSize) {
    *// Larger than ideal: use max + buffer*
    return maxWeeks + 1;
  }
  
  *// Smaller than ideal: use minimum (faster)*
  return minWeeks;
}

*// Display:// "2-4 weeks typical, likely 3 weeks for your company (200 employees)"*
```

---

### **CHANGE 5: Add Missing Fields (ChatGPT Recommendations)**

**New fields in TOOLS table**:
```
DATA PROVENANCE:
- pricing_source_url (URL): Where pricing info came from
  Example: "https://vendor.com/pricing" or "https://g2.com/products/vendor/pricing"
  Purpose: Evidence when vendor disputes pricing

RICH MEDIA:
- demo_video_url (URL): Product demo video
  Example: "https://youtube.com/watch?v=abc123"
  Purpose: Higher conversion than screenshots alone

COMPETITIVE INTELLIGENCE:
- primary_competitor_ids (Link to TOOLS, multiple, max 3): Direct competitors
  Example: Links to Lever, Ashby (if tool is Greenhouse)
  Purpose: "Alternatives to X" internal linking, keep users on site

LONG-TAIL INTEGRATIONS:
- other_integrations (Long Text): Integrations not in core 30
  Example: "Zoom, Discord, Calendly, Loom, Notion, Asana, Jira, Trello"
  Purpose: Avoid junction table bloat for rarely-filtered integrations
```

**Total new fields in TOOLS**: 35 → **39 fields** (+4)

---

## REVISED SCHEMA SPECIFICATION

### PART A: NEW TABLES TO CREATE

#### **Table 1: INTEGRATIONS**

**Purpose**: Central registry of **Top 30 Core Integrations** only

**Fields** (8 total):

| Field Name | Type | Required | Options/Details | Example |
|------------|------|----------|----------------|---------|
| integration_id | Autonumber | Yes | Primary Key | 1, 2, 3 |
| integration_name | Single Line Text | Yes | Unique | "Workday" |
| integration_category | **Multiple Select** | Yes | ["HRIS", "ATS", "Payroll", "Communication", "Calendar", "Other"] | ["HRIS", "Payroll"] |
| integration_type | Single Select | Yes | "Core" (HRIS/ATS), "Complementary" (Slack/Calendar) | "Core" |
| logo_url | URL | No | Public logo URL | https://logo.clearbit.com/workday.com |
| website_url | URL | No | Integration homepage | https://www.workday.com |
| is_common | Checkbox | Yes | True for top 20 shown in filters | ✓ |
| tools_count | Count | Auto | Count from TOOLS_INTEGRATIONS | 25 |

**Initial Data to Populate** (30 core integrations, NO DUPLICATES):
```
HRIS (8):
1. Workday ["HRIS"] (Core, Common ✓)
2. BambooHR ["HRIS"] (Core, Common ✓)
3. ADP Workforce Now ["Payroll"] (Core, Common ✓)
4. Rippling ["HRIS", "Payroll"] (Core, Common ✓)
5. Gusto ["HRIS", "Payroll"] (Core, Common ✓)
6. Namely ["HRIS"] (Core)
7. Personio ["HRIS"] (Core)
8. Hibob ["HRIS"] (Core)

ATS (10):
9. Greenhouse ["ATS"] (Core, Common ✓)
10. Lever ["ATS"] (Core, Common ✓)
11. Ashby ["ATS"] (Core, Common ✓)
12. SmartRecruiters ["ATS"] (Core, Common ✓)
13. Workable ["ATS"] (Core)
14. JazzHR ["ATS"] (Core)
15. Breezy HR ["ATS"] (Core)
16. Recruitee ["ATS"] (Core)
17. iCIMS ["ATS"] (Core)
18. Jobvite ["ATS"] (Core)

Payroll (3 additional):
19. Paychex ["Payroll"] (Core)
20. Justworks ["Payroll"] (Core)
21. Zenefits ["Payroll"] (Core)

Communication (5):
22. Slack ["Communication"] (Complementary, Common ✓)
23. Microsoft Teams ["Communication"] (Complementary, Common ✓)
24. Google Chat ["Communication"] (Complementary)
25. Zoom ["Communication"] (Complementary)
26. Google Meet ["Communication"] (Complementary)

Calendar (4):
27. Google Calendar ["Calendar"] (Complementary, Common ✓)
28. Outlook Calendar ["Calendar"] (Complementary, Common ✓)
29. Office 365 ["Calendar"] (Complementary)
30. Apple Calendar ["Calendar"] (Complementary)
```

**Total**: 30 core integrations (not 35-40)

**Rule**: Only add to this table if integration is commonly filtered by users

---

#### **Table 2: TOOLS_INTEGRATIONS**

**Purpose**: Junction table for **core 30 integrations only**

**(No changes from v1.0 - fields remain the same)**

**Expected Record Count**:
- 1,000 tools × 5 core integrations average = 5,000 records
- Well within Airtable limits

---

#### **Table 3: RECOMMENDATIONS**

**(No changes from v1.0)**

**Note on JSON Fields** (per Gemini feedback):
```
Fields tool_fit_scores and tool_fit_reasoning are JSON-encoded in Long Text format.

⚠️  These fields are NOT intended for Airtable filtering/sorting.
    All ranking and display logic implemented in Next.js backend.
    
    If Airtable-driven analysis becomes needed in v2, consider:
    - Child table: RECOMMENDED_TOOLS
      - recommendation_id (link)
      - tool_id (link)
      - fit_score (Number)
      - fit_reasons (Long Text)
```

---

### PART B: TOOLS TABLE - REVISED NEW FIELDS

**Current**: ~33 fields
**New fields to add**: **39 fields** (was 35, +4 from ChatGPT recommendations)
**Total after update**: ~72 fields

---

#### **Group 1: Company Size & Regions** (3 fields - unchanged)

**(Same as v1.0)**

---

#### **Group 2: Pricing** (14 fields - was 11, +3 new)

| Field Name | Type | Required | Options/Details | Example |
|------------|------|----------|----------------|---------|
| pricing_annual_min | Number | No | Minimum annual cost | 6000 |
| pricing_annual_max | Number | No | Maximum annual cost | 15000 |
| pricing_currency | Single Select | Yes | "GBP", "USD", "EUR" | "GBP" |
| pricing_model | Single Select | No | "Per User", "Per Hire", "Flat Rate", "Custom" | "Flat Rate" |
| pricing_notes | Long Text | No | Additional pricing context | "Volume discounts for 100+ employees" |
| pricing_display | Formula | Auto | Raw pricing string (format in Next.js) | "GBP 6000 - 15000" |
| **pricing_source_url** | **URL** | **No** | **Evidence for pricing data** | **"https://vendor.com/pricing"** |
| setup_fee | Number | No | One-time setup cost | 1500 |
| setup_fee_included | Checkbox | No | True if no separate fee | ✓ |
| free_trial_available | Checkbox | No | Has free trial? | ✓ |
| free_trial_duration_days | Number | No | Trial length in days | 14 |
| contract_length_options | Multiple Select | No | ["Monthly", "Annual", "Multi-Year", "Custom"] | ["Monthly", "Annual"] |

**NEW FIELDS**:
1. `pricing_source_url` (URL) - Where pricing info came from
2. Two more pricing-related fields added in integration section below

**Formula for `pricing_display`** (REVISED - simpler):
```
IF(
  AND({pricing_annual_min}, {pricing_annual_max}),
  CONCATENATE(
    {pricing_currency}, 
    " ",
    {pricing_annual_min}, 
    " - ", 
    {pricing_annual_max}
  ),
  IF(
    {pricing_annual_min},
    CONCATENATE({pricing_currency}, " ", {pricing_annual_min}, "+"),
    "Custom"
  )
)
```

**Output**: "GBP 6000 - 15000" or "USD 10000+" or "Custom"

**Next.js will format this to**: "£6,000 - £15,000/year" or "$10,000+/year" or "Custom Pricing - Contact Vendor"

---

#### **Group 3: Compliance** (7 fields - unchanged)

**(Same as v1.0)**

**Display Pattern Reminder**:
```
✅ GDPR Compliant (Vendor-Supplied)*

*Compliance information is provided by vendors and represents 
their attestation. We do not independently verify compliance. 
Consult legal counsel before making decisions.
```

---

#### **Group 4: Implementation** (8 fields - unchanged)

**(Same as v1.0, but with corrected pseudocode from CHANGE 4)**

---

#### **Group 5: Case Study & Social Proof** (6 fields - unchanged)

**(Same as v1.0)**

---

#### **Group 6: Integrations** (2 NEW fields)

| Field Name | Type | Required | Options/Details | Example |
|------------|------|----------|----------------|---------|
| **other_integrations** | **Long Text** | **No** | **Long-tail integrations (comma-separated)** | **"Zoom, Discord, Calendly, Loom, Notion, Asana, Jira, Trello"** |
| **demo_video_url** | **URL** | **No** | **Product demo video** | **"https://youtube.com/watch?v=abc123"** |

**Purpose of `other_integrations`**:
- Avoid junction table bloat for rarely-filtered integrations
- Users rarely filter by "Loom integration" but may want to know it exists
- Display in tool detail page, not used for filtering

---

#### **Group 7: Competitive Intelligence** (1 NEW field)

| Field Name | Type | Required | Options/Details | Example |
|------------|------|----------|----------------|---------|
| **primary_competitor_ids** | **Link to TOOLS** | **No** | **Multiple links (max 3)** | **Links to Lever, Ashby** |

**Purpose**:
- Manual curation of direct competitors
- Powers "Alternatives to X" internal linking
- Better than algorithmic similarity (more accurate, keeps users on site)

---

#### **Group 8: Data Quality Metadata** (DEFERRED - 0 fields)

**Status**: EXPLICITLY DEFERRED to v2.0

**Do NOT implement these fields in this schema change**:
- `data_completeness_score` (Formula)
- `last_vendor_update` (Date)
- `research_completed` (Checkbox)
- `vendor_verified` (Checkbox)

**Rationale**: Not needed for MVP, adds complexity

---

**TOTAL NEW FIELDS IN TOOLS**: 39 fields
- Group 1: 3
- Group 2: 12 (was 11, +1)
- Group 3: 7
- Group 4: 8
- Group 5: 6
- Group 6: 2 (NEW)
- Group 7: 1 (NEW)
- Group 8: 0 (DEFERRED)

---

### PART C: REQUESTS TABLE - REVISED NEW FIELDS

**Current**: ~25 fields
**New fields to add**: **7 fields** (was 6, +1)
**Total after update**: ~32 fields

#### **Group: Buyer Context** (7 fields)

| Field Name | Type | Required | Options/Details | Example |
|------------|------|----------|----------------|---------|
| requester_company_size_exact | Number | No | Precise employee count | 200 |
| requester_current_stack_names | Multiple Select | No | Generated from INTEGRATIONS where is_common=true | ["Workday", "Slack", "Google Calendar"] |
| **requester_current_stack_other** | **Single Line Text** | **No** | **Free text for unlisted integrations** | **"Monday.com, ClickUp"** |
| requester_budget_min | Number | No | Minimum budget (annual) | 5000 |
| requester_budget_max | Number | No | Maximum budget (annual) | 15000 |
| requester_region | Single Select | No | ["UK", "US", "EU", "Australia", "Canada", "Other"] | "UK" |
| requester_compliance_needs | Multiple Select | No | ["GDPR", "EEOC", "SOC2", "HIPAA", "ISO27001"] | ["GDPR", "SOC2"] |

**NEW FIELD**:
- `requester_current_stack_other` (Single Line Text) - Escape hatch for integrations not in dropdown

**Multiple Select Options Sync**:
- `requester_current_stack_names` options should be **auto-generated from INTEGRATIONS table where is_common = true**
- Do not maintain two separate lists manually
- Update when new common integrations added to INTEGRATIONS table

---

### PART D: REVISED MIGRATION STEPS

#### **Step 1: Create INTEGRATIONS Table** (15-20 minutes)

1. Create table with 8 fields
2. **CRITICAL**: Change `integration_category` to **Multiple Select** (not Single Select)
3. Populate with **30 canonical integrations** (no duplicates)
   - Rippling: categories = ["HRIS", "Payroll"]
   - Gusto: categories = ["HRIS", "Payroll"]
   - ADP Workforce Now: categories = ["Payroll"]
4. Mark top 20 as `is_common = true`

---

#### **Step 2: Create TOOLS_INTEGRATIONS Table** (10-15 minutes)

**(Same as v1.0 - no changes)**

---

#### **Step 3: Create RECOMMENDATIONS Table** (10-15 minutes)

**(Same as v1.0 - no changes)**

---

#### **Step 4: Add Fields to TOOLS Table** (20-25 minutes)

**Add 39 new fields in groups**:

1. Group 1: Company Size & Regions (3 fields)
2. Group 2: Pricing (12 fields, including `pricing_source_url`)
3. Group 3: Compliance (7 fields)
4. Group 4: Implementation (8 fields)
5. Group 5: Case Study (6 fields)
6. Group 6: Integrations (`other_integrations`, `demo_video_url`)
7. Group 7: Competitive Intelligence (`primary_competitor_ids`)

**DO NOT ADD**: Group 8 (data quality metadata) - deferred

**Formula Fields**:
- `pricing_display`: Use REVISED simpler formula (produces "GBP 6000 - 15000")
- `implementation_timeline_display`: Use formula from v1.0

**Required vs Optional**:
- Mark as "Required" in spec = **logically required for launch**, NOT enforced by Airtable UI
- Enforcement via frontend forms and internal SOP
- Airtable "Required" constraint: Use sparingly to avoid bulk import friction

---

#### **Step 5: Add Fields to REQUESTS Table** (5-10 minutes)

**Add 7 new fields** (was 6, +1):
- 6 fields from v1.0
- 1 new field: `requester_current_stack_other`

**Multiple Select Setup**:
- `requester_current_stack_names`: Manually create options matching INTEGRATIONS.integration_name where is_common = true
  - Initial list: "Workday", "BambooHR", "ADP Workforce Now", "Rippling", "Gusto", "Greenhouse", "Lever", "Ashby", "SmartRecruiters", "Slack", "Microsoft Teams", "Google Calendar", "Outlook Calendar"
- **SOP**: When new integration added to INTEGRATIONS with is_common = true, also add to this Multiple Select

---

#### **Step 6: Backfill Existing TOOLS** (30-60 minutes)

**Minimal Backfill** (required for filtering):
1. `ideal_company_size`: ["51-200", "201-500"] (mid-market default)
2. `supported_regions`: ["Global"] (safe default)
3. `pricing_currency`: "GBP" (UK vendors) or "USD" (US vendors)
4. `other_integrations`: Leave blank (populate during AI research)

**Full Backfill**: Happens during AI research + vendor data collection (Deliverable 3)

---

#### **Step 7: Test Schema** (15-20 minutes)

**Create 1 complete test record** (e.g., Greenhouse):
```
TOOLS table:
- ideal_company_size: ["51-200", "201-500"]
- supported_regions: ["UK", "US", "Global"]
- pricing_annual_min: 6000
- pricing_annual_max: 15000
- pricing_currency: "GBP"
- pricing_display: "GBP 6000 - 15000" (auto-calculated)
- pricing_source_url: "https://greenhouse.com/pricing"
- gdpr_compliant: ✓
- eeoc_compliant: ✓
- soc2_certified: ✓
- implementation_timeline_weeks_min: 2
- implementation_timeline_weeks_max: 4
- other_integrations: "Zoom, Calendly, Loom"
- demo_video_url: "https://youtube.com/watch?v=example"
- primary_competitor_ids: Links to Lever, Ashby

TOOLS_INTEGRATIONS records (3-5):
- Greenhouse + Workday: integration_quality = "Native"
- Greenhouse + Slack: integration_quality = "Native"
- Greenhouse + Google Calendar: integration_quality = "Zapier"

REQUESTS table:
- requester_company_size_exact: 200
- requester_current_stack_names: ["Workday", "Slack"]
- requester_current_stack_other: "Monday.com"
- requester_budget_max: 15000
- requester_region: "UK"
- requester_compliance_needs: ["GDPR"]

RECOMMENDATIONS table:
- recommendation_id: 1
- request_id: Link to test request
- recommended_tools: Links to Greenhouse, Ashby, Lever
- tool_fit_scores: {"recGreenhouse": 95, "recAshby": 87, "recLever": 71}
- tool_fit_reasoning: {"recGreenhouse": ["Built for 50-500 employees", "Native Workday integration", "GDPR compliant", "Within budget"]}
- recommendation_url_token: "7hJ9kLm3nP2q"`

**Verify**:

- [ ]  All formulas calculate correctly
- [ ]  All relationships link correctly
- [ ]  Multiple Select options work
- [ ]  Filtering by company size works
- [ ]  Filtering by integrations works (via junction table)
- [ ]  Recommendation URL works: `/recommendations/7hJ9kLm3nP2q`

### PART E: FINAL SUMMARY

**New Tables**: 3

- INTEGRATIONS (8 fields, **30 initial records** - no duplicates)
- TOOLS_INTEGRATIONS (7 fields, junction for core 30 only)
- RECOMMENDATIONS (10 fields, initially empty)

**Modified Tables**: 2

- TOOLS: +**39 new fields** (total ~72 fields)
- REQUESTS: +**7 new fields** (total ~32 fields)

**Total New Fields Across All Tables**: **71 fields**

- INTEGRATIONS: 8
- TOOLS_INTEGRATIONS: 7
- RECOMMENDATIONS: 10
- TOOLS: 39 (was 35, +4)
- REQUESTS: 7 (was 6, +1)

**Estimated Setup Time**: 90-120 minutes

- Create INTEGRATIONS (20 mins) + populate 30 records (10 mins)
- Create TOOLS_INTEGRATIONS (15 mins)
- Create RECOMMENDATIONS (15 mins)
- Add 39 fields to TOOLS (25 mins)
- Add 7 fields to REQUESTS (10 mins)
- Backfill minimal data (30 mins)
- Test (20 mins)

**Record Count Projection**:

- 1,000 tools × 5 core integrations = 5,000 TOOLS_INTEGRATIONS records
- **10% of Airtable's 50K limit** (vs 40% in v1.0) ✅

---

## VALIDATION CHECKLIST

After migration:

**Critical Fixes Implemented**:

- [ ]  INTEGRATIONS.integration_category is **Multiple Select** (not Single Select)
- [ ]  No duplicate integrations (Rippling, Gusto, ADP appear once each)
- [ ]  TOOLS.pricing_display formula produces "GBP 6000 - 15000" format (not "£6,000 - £15,000")
- [ ]  TOOLS.other_integrations field exists for long-tail integrations
- [ ]  TOOLS.demo_video_url field exists
- [ ]  TOOLS.pricing_source_url field exists
- [ ]  TOOLS.primary_competitor_ids field exists
- [ ]  REQUESTS.requester_current_stack_other field exists
- [ ]  Group 8 metadata fields (data_completeness_score, etc.) are **NOT** added

**Schema Structure**:

- [ ]  INTEGRATIONS table has exactly 30 records (no duplicates)
- [ ]  INTEGRATIONS table has 8 fields
- [ ]  TOOLS table has 39 new fields added (total ~72)
- [ ]  REQUESTS table has 7 new fields added (total ~32)
- [ ]  All formulas calculate correctly

**Test Record**:

- [ ]  Test Greenhouse record created with all fields
- [ ]  Test integrations created (Workday Native, Slack Native, GCal Zapier)
- [ ]  Test request created with all context fields
- [ ]  Test recommendation created with JSON fit scores

---

## CHANGE LOG v1.0 → v1.1

1. **INTEGRATIONS.integration_category**: Single Select → Multiple Select
2. **INTEGRATIONS initial data**: 35-40 records → 30 records (removed duplicates)
3. **TOOLS.pricing_display formula**: Simplified (removed currency symbol formatting)
4. **TOOLS new fields**: +4 fields (pricing_source_url, other_integrations, demo_video_url, primary_competitor_ids)
5. **REQUESTS new fields**: +1 field (requester_current_stack_other)
6. **Implementation timeline logic**: Corrected pseudocode with proper bucket handling
7. **Data quality metadata**: Explicitly deferred to v2.0
8. **Documentation**: Added notes on JSON fields, required field enforcement, integration sync SOP