# Deliverable 3: AI Research Prompts & Workflow

**Date**: 2025-11-27
**Status**: Ready to Use
**Purpose**: ChatGPT + Gemini research workflow for populating initial 20 tools

---

## WORKFLOW OVERVIEW

`Tool Research Flow:
┌─────────────────────────────────────────────────────────────┐
│ Step 1: ChatGPT Research (Primary Data Collection)         │
│ ↓ 30-45 mins per tool                                       │
│ Outputs: Structured JSON with all Tier 1 + Tier 2 data     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 2: Gemini Verification (Cross-Check & Confidence)     │
│ ↓ 15-20 mins per tool                                       │
│ Outputs: Verification report + confidence scores            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 3: Nelson Manual Review (Critical Fields Only)        │
│ ↓ 10-15 mins per tool                                       │
│ Outputs: Flagged items needing vendor confirmation          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 4: Vendor Outreach (Email with Pre-Filled Data)       │
│ ↓ Use EMAIL 1A template with AI research                    │
│ Outputs: Vendor corrects/confirms via Google Form           │
└─────────────────────────────────────────────────────────────┘`

**Time Investment per Tool**:

- ChatGPT research: 30-45 mins
- Gemini verification: 15-20 mins
- Manual review: 10-15 mins
- **Total: 55-80 mins per tool**

**For 20 tools**: 18-27 hours total (spread across Week 1-2)

---

## PART 1: CHATGPT RESEARCH PROMPT

### **Master Prompt Template**

**How to Use**:

1. Copy prompt below
2. Replace `[TOOL_NAME]` and `[VENDOR_WEBSITE]` with actual tool
3. Paste into ChatGPT-5.1
4. Wait for structured JSON output
5. Copy JSON to staging document

---

### **CHATGPT PROMPT v1.0**

`I'm researching [TOOL_NAME] for IndustryLabs, a B2B AI tool marketplace for HR/L&D/CS leaders.

TOOL TO RESEARCH:
- Tool Name: [TOOL_NAME]
- Vendor Website: [VENDOR_WEBSITE]
- Category: [HR Tech / ATS / HRIS / Performance Management / etc.]

YOUR TASK:
Research and provide detailed, structured information across 8 categories below.

CRITICAL RESEARCH RULES:
1. Prioritize PRIMARY SOURCES (vendor website, official docs, vendor blog)
2. Use SECONDARY SOURCES only if primary unavailable (G2, Capterra, news, Reddit)
3. CITE EVERY DATA POINT with source URL
4. FLAG UNCERTAINTY - if you're not confident (60%+ confidence), say so
5. NO HALLUCINATION - if info doesn't exist, say "Not found" not make it up
6. Focus on MID-MARKET (50-500 employees) - if tool only serves enterprise (500+) or SMB (1-50), flag this

---

CATEGORY 1: COMPANY SIZE FIT ⭐ TIER 1 - CRITICAL

Questions:
a) What company sizes (by employee count) is this tool built for?
b) Does marketing copy mention specific company size segments?
c) Does pricing page show tiers by company size?
d) Are there case studies or customer examples? What sizes are they?

Output Format:
{
  "ideal_company_size": ["51-200", "201-500"], // Multi-select from: "1-50", "51-200", "201-500", "500+"
  "company_size_notes": "Marketing copy mentions 'built for growing companies 100-500 employees'",
  "confidence": "High/Medium/Low",
  "sources": [
    "https://vendor.com/pricing - pricing tiers by company size",
    "https://vendor.com/customers - case study shows 250-employee company"
  ],
  "evidence": "Pricing page has 'Small (1-50)', 'Medium (51-200)', 'Large (201-500)' tiers. Customer page shows 3 case studies: 80 employees, 200 employees, 450 employees.",
  "flags": "None" // or "Only serves enterprise (500+)" or "Unclear - no size info found"
}

---

CATEGORY 2: PRICING ⭐ TIER 1 - CRITICAL

Questions:
a) Is there a public pricing page? If yes, what are the prices?
b) What is the pricing model? (per user, per hire, flat rate, custom)
c) What currency? (convert to GBP if USD/EUR)
d) Is there a setup fee mentioned?
e) Is there a free trial? How many days?
f) What contract lengths are offered? (monthly, annual, multi-year)

Output Format:
{
  "pricing_annual_min": 6000, // Number in GBP
  "pricing_annual_max": 15000, // Number in GBP
  "pricing_currency": "GBP", // or "USD", "EUR"
  "pricing_model": "Flat Rate", // "Per User", "Per Hire", "Flat Rate", "Custom"
  "pricing_notes": "Pricing varies by company size. Small (1-50): £6K, Medium (51-200): £10K, Large (201-500): £15K",
  "pricing_source_url": "https://vendor.com/pricing",
  "setup_fee": 1500, // Number or null if included
  "setup_fee_included": false, // true if no separate fee
  "free_trial_available": true,
  "free_trial_duration_days": 14,
  "contract_length_options": ["Monthly", "Annual"],
  "confidence": "High/Medium/Low",
  "sources": [
    "https://vendor.com/pricing - public pricing page"
  ],
  "evidence": "Pricing page clearly shows £6,000-£15,000/year for 50-500 employees. Setup fee: £1,500. Free 14-day trial mentioned.",
  "flags": "None" // or "No pricing - says 'Contact Sales'" or "Pricing only in USD, converted to GBP"
}

---

CATEGORY 3: INTEGRATIONS (CORE 30 ONLY) ⭐ TIER 1 - CRITICAL

Questions:
a) Check integrations page or documentation
b) For each integration below, determine: Native / API / Zapier / Manual / Not Supported
c) Look for "integration quality" clues (e.g., "native Workday sync" vs "connect via Zapier")

Check these 30 integrations ONLY (others go in "other_integrations"):
HRIS: Workday, BambooHR, ADP Workforce Now, Rippling, Gusto, Namely, Personio, Hibob
ATS: Greenhouse, Lever, Ashby, SmartRecruiters, Workable, JazzHR, Breezy HR, Recruitee, iCIMS, Jobvite
Payroll: ADP, Paychex, Justworks, Zenefits
Communication: Slack, Microsoft Teams, Google Chat, Zoom, Google Meet
Calendar: Google Calendar, Outlook Calendar, Office 365, Apple Calendar

Output Format:
{
  "integrations": [
    {
      "name": "Workday",
      "quality": "Native", // "Native", "API", "Zapier", "Manual", "Not Supported"
      "notes": "Real-time sync via native Workday integration",
      "source": "https://vendor.com/integrations/workday"
    },
    {
      "name": "Slack",
      "quality": "Native",
      "notes": "Notifications and reminders via Slack app",
      "source": "https://vendor.com/integrations"
    },
    {
      "name": "Google Calendar",
      "quality": "Zapier",
      "notes": "Available via Zapier, not native",
      "source": "https://zapier.com/apps/vendor/integrations"
    }
    // ... list ALL 30, even if "Not Supported"
  ],
  "other_integrations": "Zoom, Calendly, Loom, Notion, Asana, Jira", // Comma-separated
  "confidence": "High/Medium/Low",
  "sources": [
    "https://vendor.com/integrations - official integrations page"
  ],
  "evidence": "Integrations page lists 50+ integrations. Workday and Slack shown as 'Native Partners'. Google Calendar listed under 'Via Zapier'.",
  "flags": "None" // or "Integration page very vague - many listed but quality unclear"
}

---

CATEGORY 4: COMPLIANCE ⭐ TIER 1 - CRITICAL

Questions:
a) Check vendor's security/compliance/trust center page
b) Look for explicit mentions of GDPR, EEOC, SOC 2, ISO 27001, HIPAA
c) Look for compliance badges, certificates, or audit reports

Output Format:
{
  "gdpr_compliant": true, // true/false/null if unknown
  "eeoc_compliant": false,
  "soc2_certified": true,
  "iso27001_certified": false,
  "hipaa_compliant": null, // null if N/A (not healthcare)
  "compliance_documentation_url": "https://vendor.com/security",
  "compliance_notes": "SOC 2 Type II certified (report dated 2024). GDPR compliant per privacy policy. No EEOC info found.",
  "confidence": "High/Medium/Low",
  "sources": [
    "https://vendor.com/security - trust center with SOC 2 report",
    "https://vendor.com/privacy - GDPR compliance statement"
  ],
  "evidence": "Security page has downloadable SOC 2 Type II report (dated May 2024). Privacy policy states 'fully GDPR compliant'. No mention of EEOC or ISO 27001.",
  "flags": "None" // or "Only generic 'we take security seriously' - no certificates found"
}

---

CATEGORY 5: SUPPORTED REGIONS ⭐ TIER 1 - CRITICAL

Questions:
a) Which countries/regions does the vendor explicitly support?
b) Check "About Us", "Customers", pricing page (currency options), support page
c) Look for regional data centers or compliance (e.g., EU data residency for GDPR)

Output Format:
{
  "supported_regions": ["UK", "US", "EU", "Global"], // Multi-select
  "region_notes": "HQ in US, has EU data center for GDPR. Customer examples from UK, US, Germany, France.",
  "confidence": "High/Medium/Low",
  "sources": [
    "https://vendor.com/about - mentions US HQ and EU presence",
    "https://vendor.com/customers - customer logos from UK, US, EU"
  ],
  "evidence": "About page: 'Headquartered in San Francisco with EU data center in Dublin'. Customer page shows logos from companies in UK, US, Germany, France.",
  "flags": "None" // or "Only mentions US - unclear if supports international"
}

---

CATEGORY 6: IMPLEMENTATION TIMELINE ⭐ TIER 2 - HELPFUL

Questions:
a) Check documentation, help center, or implementation guides
b) Look for customer case studies mentioning timeline
c) Check blog posts or whitepapers about implementation
d) Look for mentions of "typical onboarding" or "time to value"

Output Format:
{
  "implementation_timeline_weeks_min": 2,
  "implementation_timeline_weeks_max": 4,
  "it_hours_required": 10,
  "hr_admin_hours_required": 20,
  "training_hours_admin": 2,
  "training_hours_enduser": 1,
  "implementation_prerequisites": "• Workday admin access\n• IT approval for SSO\n• Budget approval",
  "common_implementation_delays": "• IT Security SSO approval: +1-2 weeks\n• Data migration complexity: +1 week",
  "confidence": "High/Medium/Low",
  "sources": [
    "https://vendor.com/implementation-guide - official guide",
    "https://vendor.com/customers/case-study - mentions 3-week timeline"
  ],
  "evidence": "Implementation guide says '2-4 weeks typical'. Case study mentions '3 weeks from contract to go-live'.",
  "flags": "None" // or "No timeline info found - marked as estimates"
}

---

CATEGORY 7: CASE STUDY & SOCIAL PROOF ⭐ TIER 3 - NICE TO HAVE

Questions:
a) Check customers page, case studies, testimonials
b) Look for specific examples with metrics (company size, industry, results)
c) Are there publicly listed customer names?

Output Format:
{
  "case_study_url": "https://vendor.com/customers/acme-corp",
  "case_study_company_size": 200,
  "case_study_industry": "SaaS",
  "case_study_implementation_weeks": 3,
  "case_study_results": "40% reduction in time-to-hire, 60% less manual screening",
  "notable_customers": "Stripe, Airbnb, Monzo", // Only public info
  "confidence": "High/Medium/Low",
  "sources": [
    "https://vendor.com/customers/acme-corp - detailed case study"
  ],
  "evidence": "Case study for 'Acme Corp' (200 employees, SaaS): implemented in 3 weeks, achieved 40% faster hiring.",
  "flags": "None" // or "Only generic testimonials - no detailed case studies"
}

---

CATEGORY 8: RICH MEDIA ⭐ TIER 3 - NICE TO HAVE

Questions:
a) Is there a product demo video? (YouTube, Vimeo, Loom)
b) Are there screenshots on the website?

Output Format:
{
  "demo_video_url": "https://youtube.com/watch?v=abc123",
  "has_screenshots": true,
  "screenshot_count_estimate": 5,
  "confidence": "High/Medium/Low",
  "sources": [
    "https://vendor.com/product - embedded YouTube demo"
  ],
  "evidence": "Homepage has embedded YouTube demo (3 mins). Product page has 5 screenshots.",
  "flags": "None" // or "No video found, only screenshots"
}

---

OVERALL ASSESSMENT:

After completing all 8 categories, provide:

{
  "overall_data_quality": "High/Medium/Low",
  "overall_confidence": "High/Medium/Low", // Average across all categories
  "critical_gaps": [
    "Pricing not public - marked as 'Contact Sales'",
    "Integration quality unclear for most systems"
  ],
  "vendor_outreach_priority": "High/Medium/Low", // Should we prioritize asking vendor to verify?
  "ready_for_listing": true/false, // Can we list with current data or too many gaps?
  "research_time_minutes": 35, // How long did this take you?
  "notes": "Excellent documentation. All Tier 1 data found with high confidence. Recommend listing immediately and asking vendor to verify pricing."
}

---

OUTPUT FORMAT:

Please structure your response as valid JSON that can be copied directly:
```json
{
  "tool_name": "[TOOL_NAME]",
  "research_date": "2025-11-27",
  "category_1_company_size_fit": { ... },
  "category_2_pricing": { ... },
  "category_3_integrations": { ... },
  "category_4_compliance": { ... },
  "category_5_supported_regions": { ... },
  "category_6_implementation_timeline": { ... },
  "category_7_case_study": { ... },
  "category_8_rich_media": { ... },
  "overall_assessment": { ... }
}
```

BEGIN RESEARCH NOW.`

---

## PART 2: GEMINI VERIFICATION PROMPT

### **Master Verification Template**

**How to Use**:

1. Wait for ChatGPT to complete research
2. Copy ChatGPT's JSON output
3. Paste into Gemini prompt below (replace `[CHATGPT_OUTPUT]`)
4. Wait for Gemini's verification report
5. Review disagreements and confidence scores

---

### **GEMINI PROMPT v1.0**

`You are a fact-checking AI verifying research done by ChatGPT for IndustryLabs, a B2B AI tool marketplace.

CHATGPT RESEARCHED THIS TOOL:

[PASTE CHATGPT JSON OUTPUT HERE]

YOUR TASK:

Cross-check ChatGPT's findings and provide a verification report.

VERIFICATION RULES:

1. RE-RESEARCH each category independently (don't just trust ChatGPT)
2. Check the SAME SOURCES ChatGPT cited (verify they support the claims)
3. Look for ADDITIONAL SOURCES ChatGPT may have missed
4. IDENTIFY DISAGREEMENTS (where your research conflicts with ChatGPT's)
5. ASSIGN CONFIDENCE SCORES (0-100%) to each data point
6. FLAG OUTDATED INFO (e.g., pricing from 2023, old compliance certificates)
7. SUGGEST IMPROVEMENTS (better sources, missing data points)

---

CATEGORY-BY-CATEGORY VERIFICATION:

For EACH of the 8 categories, provide:

{
  "category": "Company Size Fit",
  "chatgpt_finding": "[TOOL] is built for 51-200 and 201-500 employee companies",
  "gemini_verification": "CONFIRMED / PARTIAL / CONFLICTED / UNABLE TO VERIFY",
  "gemini_confidence": 85, // 0-100%
  "agreement_details": "Confirmed pricing tiers for 'Medium (51-200)' and 'Large (201-500)'. Also found recent blog post mentioning 'ideal for 100-300 employee companies'.",
  "disagreements": [
    "ChatGPT marked confidence as 'High' but source is from 2023 pricing page - may be outdated"
  ],
  "additional_sources_found": [
    "https://vendor.com/blog/2024/11/announcing-new-pricing - updated pricing tiers"
  ],
  "missing_data_chatgpt_should_find": [
    "Vendor's LinkedIn About page mentions 'built for mid-market 100-500' - ChatGPT missed this"
  ],
  "recommended_action": "ACCEPT AS-IS / ASK VENDOR TO CONFIRM / MANUAL REVIEW NEEDED"
}

Repeat this structure for all 8 categories.

---

CRITICAL DATA POINTS - DEEP VERIFICATION:

Pay extra attention to these high-impact fields:

1. **Pricing** (buyers' #1 question):
   - Is the pricing page current? (check page footer, blog for "new pricing" announcements)
   - Are ChatGPT's numbers in the right currency?
   - Did ChatGPT correctly identify the pricing model?

2. **Integrations** (buyers' #2 question):
   - Did ChatGPT correctly identify "Native" vs "Zapier"?
   - Check vendor's official integrations page vs ChatGPT's interpretation
   - Look for integration quality clues ChatGPT may have missed

3. **Compliance** (critical for enterprise buyers):
   - Are certificates current? (SOC 2 reports expire after 1 year)
   - Is GDPR compliance just marketing fluff or substantiated?
   - Did ChatGPT find actual evidence or just infer from generic privacy policy?

---

DISAGREEMENT ANALYSIS:

If you find conflicts with ChatGPT's research, categorize by severity:

**CRITICAL DISAGREEMENT** (must resolve before listing):
- Pricing is wrong (e.g., ChatGPT said £6K-£15K, you found £20K-£50K)
- Integration quality is wrong (ChatGPT said "Native Workday", you found "Not supported")
- Compliance claim is unsupported (ChatGPT said "SOC 2 certified", you found no evidence)

**MODERATE DISAGREEMENT** (should ask vendor to confirm):
- ChatGPT said "2-4 weeks implementation", you found "4-8 weeks"
- ChatGPT said "51-200 employees ideal", you found "100-500 employees"

**MINOR DISAGREEMENT** (acceptable difference):
- ChatGPT confidence "High", you think "Medium" (source is 1 year old)
- ChatGPT found 5 integrations, you found 7 (both are valid, just different sources)

---

CONFIDENCE SCORING GUIDE:

Assign 0-100% confidence to each category based on:

**90-100% (Very High Confidence)**:
- Multiple recent primary sources (vendor website, official docs, current certificates)
- All sources agree
- Information is current (2024-2025)
- ChatGPT's claims are fully supported by evidence

**70-89% (High Confidence)**:
- Primary sources available but slightly dated (2023)
- OR only one primary source
- Minor ambiguity but interpretation is reasonable

**50-69% (Medium Confidence)**:
- Only secondary sources (G2, Capterra, Reddit)
- OR primary sources are vague/unclear
- Requires inference or assumptions

**30-49% (Low Confidence)**:
- Conflicting information from different sources
- OR very old information (2022 or earlier)
- OR ChatGPT made assumptions without evidence

**0-29% (Very Low Confidence)**:
- No sources found
- OR ChatGPT appears to have hallucinated
- OR critical disagreement with your independent research

---

OVERALL VERIFICATION SUMMARY:

After category-by-category verification, provide:

{
  "overall_verification_status": "APPROVED / APPROVED WITH NOTES / NEEDS VENDOR CONFIRMATION / REJECT",
  "overall_confidence_score": 78, // Average across all categories
  "critical_disagreements_count": 0,
  "moderate_disagreements_count": 2,
  "minor_disagreements_count": 5,
  "highest_confidence_categories": ["Compliance (95%)", "Supported Regions (90%)"],
  "lowest_confidence_categories": ["Pricing (60%)", "Implementation Timeline (55%)"],
  "must_ask_vendor": [
    "Confirm annual pricing range (source is from 2023, may be outdated)",
    "Confirm Workday integration is truly native (integration page is vague)"
  ],
  "safe_to_list_now": true/false, // Can we list with current data?
  "recommended_email_approach": "EMAIL 1A with pre-filled data - high confidence overall, just need vendor to verify pricing and Workday integration quality",
  "gemini_research_time_minutes": 18,
  "notes": "ChatGPT did excellent research. 95% of findings verified. Main gap: pricing page is from 2023, should confirm with vendor before listing."
}

---

OUTPUT FORMAT:

Please structure as valid JSON:
```json
{
  "tool_name": "[TOOL_NAME]",
  "verification_date": "2025-11-27",
  "chatgpt_research_quality": "Excellent/Good/Acceptable/Poor",
  "category_verifications": [
    {
      "category": "Company Size Fit",
      "chatgpt_finding": "...",
      "gemini_verification": "...",
      "gemini_confidence": 85,
      ...
    },
    // ... all 8 categories
  ],
  "overall_verification_summary": { ... }
}
```

BEGIN VERIFICATION NOW.`

---

## PART 3: CONSOLIDATED RESEARCH OUTPUT TEMPLATE

### **After ChatGPT + Gemini Complete**

**Create document**: `[TOOL_NAME]_research_YYYY-MM-DD.json`

**Combine outputs**:

json

`{
  "tool_name": "Greenhouse",
  "research_metadata": {
    "research_date": "2025-11-27",
    "chatgpt_research_time_minutes": 35,
    "gemini_verification_time_minutes": 18,
    "nelson_review_time_minutes": 12,
    "total_research_time_minutes": 65,
    "overall_confidence": 82,
    "ready_for_vendor_outreach": true,
    "vendor_outreach_priority": "High"
  },
  
  "chatgpt_research": {
    "category_1_company_size_fit": { ... },
    "category_2_pricing": { ... },
    "category_3_integrations": { ... },
    "category_4_compliance": { ... },
    "category_5_supported_regions": { ... },
    "category_6_implementation_timeline": { ... },
    "category_7_case_study": { ... },
    "category_8_rich_media": { ... },
    "overall_assessment": { ... }
  },
  
  "gemini_verification": {
    "category_verifications": [ ... ],
    "overall_verification_summary": { ... }
  },
  
  "nelson_manual_review": {
    "reviewed_date": "2025-11-27",
    "critical_issues_found": [],
    "moderate_issues_found": [
      "Pricing source is from 2023 - should confirm with vendor"
    ],
    "vendor_must_confirm": [
      "Annual pricing range (source outdated)",
      "Workday integration is native (integration page vague)"
    ],
    "approved_for_listing": true,
    "approved_for_vendor_email": true,
    "email_template_to_use": "EMAIL 1A",
    "notes": "High-quality research overall. Will send EMAIL 1A with pre-filled pricing, company size, integrations. Vendor should verify pricing and Workday integration quality."
  },
  
  "airtable_ready_data": {
    "ideal_company_size": ["51-200", "201-500"],
    "company_size_notes": "...",
    "supported_regions": ["UK", "US", "EU", "Global"],
    "pricing_annual_min": 6000,
    "pricing_annual_max": 15000,
    "pricing_currency": "GBP",
    "pricing_model": "Flat Rate",
    "pricing_notes": "...",
    "pricing_source_url": "https://greenhouse.com/pricing",
    "gdpr_compliant": true,
    "eeoc_compliant": true,
    "soc2_certified": true,
    "iso27001_certified": false,
    "hipaa_compliant": null,
    "compliance_documentation_url": "https://greenhouse.com/security",
    "implementation_timeline_weeks_min": 2,
    "implementation_timeline_weeks_max": 4,
    "other_integrations": "Zoom, Calendly, Loom",
    "demo_video_url": "https://youtube.com/watch?v=abc123",
    "case_study_url": "https://greenhouse.com/customers/acme",
    "case_study_company_size": 200,
    "integrations_to_create": [
      {
        "integration_name": "Workday",
        "integration_quality": "Native",
        "integration_notes": "Real-time sync",
        "verification_source": "Vendor"
      },
      {
        "integration_name": "Slack",
        "integration_quality": "Native",
        "integration_notes": "Notifications via Slack app",
        "verification_source": "Documentation"
      }
      *// ... all 30 core integrations*
    ]
  }
}`

---

## PART 4: NELSON MANUAL REVIEW CHECKLIST

### **10-15 Minute Review per Tool**

**After ChatGPT + Gemini complete, review these critical items**:

### **CRITICAL FIELDS (Must be accurate)**:

**1. Pricing** (5 mins)

- [ ]  Visit vendor's pricing page directly
- [ ]  Confirm ChatGPT's range is accurate
- [ ]  Check if pricing page has "Last updated: [date]"
- [ ]  If pricing says "Contact Sales", mark as: pricing_annual_min = null, pricing_notes = "Custom - Contact Vendor"
- [ ]  If ChatGPT converted currency (USD → GBP), verify exchange rate is reasonable

**2. Core Integrations (Workday, BambooHR, Greenhouse, Slack)** (3 mins)

- [ ]  Visit vendor's integrations page
- [ ]  Confirm top 5 integrations ChatGPT listed are accurate
- [ ]  Check if integration page says "Native" or "Via Zapier" explicitly
- [ ]  If vague, flag for vendor confirmation

**3. Compliance (GDPR, SOC 2)** (2 mins)

- [ ]  Visit vendor's security/compliance/trust page
- [ ]  Confirm GDPR compliance claim has evidence (not just generic privacy policy)
- [ ]  Confirm SOC 2 certificate exists and is current (within 1 year)
- [ ]  If no evidence found but ChatGPT marked true, change to false

**4. Company Size Fit** (2 mins)

- [ ]  Check if pricing page has tiers by company size
- [ ]  Check if customer page shows company size examples
- [ ]  Confirm ChatGPT's assessment aligns with mid-market (50-500 employees)
- [ ]  If tool only serves enterprise (500+) or SMB (1-50), flag and possibly skip

**5. Demo Video** (1 min)

- [ ]  Check if vendor homepage has embedded video
- [ ]  Verify YouTube/Vimeo link works
- [ ]  If no video, mark as null

---

### **APPROVAL DECISION**:

After review, decide:

**APPROVED FOR LISTING + VENDOR EMAIL**:

- [ ]  High confidence (80%+) across all Tier 1 fields
- [ ]  No critical disagreements between ChatGPT + Gemini
- [ ]  Pricing is current (within 1 year)
- [ ]  Core integrations are clear
- [ ]  Action: Send EMAIL 1A with pre-filled data, ask vendor to verify

**APPROVED FOR VENDOR EMAIL (NOT LISTING YET)**:

- [ ]  Medium confidence (60-79%) on some Tier 1 fields
- [ ]  Some moderate disagreements or outdated info
- [ ]  Pricing or integrations need vendor confirmation
- [ ]  Action: Send EMAIL 1A but wait for vendor confirmation before listing

**MANUAL RESEARCH NEEDED**:

- [ ]  Low confidence (<60%) on critical fields
- [ ]  ChatGPT + Gemini heavily conflicted
- [ ]  Pricing completely unclear ("Contact Sales" everywhere)
- [ ]  Action: Spend 30-60 mins doing deep manual research OR skip tool for now

**SKIP TOOL (NOT MID-MARKET FIT)**:

- [ ]  Tool only serves enterprise (500+)
- [ ]  Tool only serves SMB (1-50)
- [ ]  Tool is consumer-focused, not B2B
- [ ]  Action: Remove from target list

---

## PART 5: WORKFLOW EXECUTION PLAN

### **Week 1: Research 10 Tools**

**Day 1 (Monday)**: Tools 1-2

- 9:00am - 10:00am: ChatGPT research Tool 1
- 10:00am - 10:30am: Gemini verification Tool 1
- 10:30am - 10:45am: Manual review Tool 1
- [Break]
- 2:00pm - 3:00pm: ChatGPT research Tool 2
- 3:00pm - 3:30pm: Gemini verification Tool 2
- 3:30pm - 3:45pm: Manual review Tool 2

**Day 2 (Tuesday)**: Tools 3-4

- Repeat Day 1 pattern

**Day 3 (Wednesday)**: Tools 5-6

- Repeat Day 1 pattern

**Day 4 (Thursday)**: Tools 7-8

- Repeat Day 1 pattern

**Day 5 (Friday)**: Tools 9-10

- Morning: Research Tools 9-10
- Afternoon: Consolidate all 10 into staging document

**End of Week 1**:

- 10 tools researched
- 10 JSON files created
- Ready to send EMAIL 1A to all 10 vendors

---

### **Week 2: Research 10 More Tools + Vendor Outreach**

**Day 1-4**: Research Tools 11-20 (same pattern as Week 1)

**Day 5**: Consolidate + Start Vendor Outreach

- Consolidate Tools 11-20
- Send EMAIL 1A to all 20 vendors
- Set up tracking in Airtable (outreach_stage, next_follow_up_date)

---

## PART 6: TOOL RESEARCH PRIORITY LIST

### **Tier 1 Target Tools** (Research First - Weeks 1-2)

**HRIS / Core HR**:

1. Workday
2. BambooHR
3. Rippling
4. Gusto
5. Namely

**ATS / Recruiting**:
6. Greenhouse
7. Lever
8. Ashby
9. SmartRecruiters
10. Workable

**Performance Management**:
11. Lattice
12. Culture Amp
13. 15Five
14. Reflektive
15. Small Improvements

**Onboarding**:
16. Enboarder
17. Talmundo
18. WorkBright
19. Click Boarding
20. Sapling

---

## PART 7: AI RESEARCH TIPS & TRICKS

### **ChatGPT Research Best Practices**:

1. **Run research in ChatGPT-5.1** (not 4o) - better at following complex prompts
2. **Give ChatGPT 30-45 mins** - don't rush, let it do thorough research
3. **If ChatGPT can't find info**, try rephrasing: "Check [Vendor]'s blog for recent pricing announcements"
4. **For integrations**, explicitly ask: "Visit [Vendor]/integrations and list ALL 50+ integrations, then classify the top 30 from my list"
5. **For compliance**, ask: "Find [Vendor]'s SOC 2 report PDF or trust center page with certificates"

### **Gemini Verification Best Practices**:

1. **Use Gemini 2.0 Flash or Gemini 3 Pro** (whichever you have access to)
2. **Paste full ChatGPT JSON** - don't summarize, Gemini needs all context
3. **Gemini is better at finding disagreements** - trust Gemini when there's conflict
4. **If Gemini says "Unable to verify"**, that's a red flag - do manual review

### **When to Do Manual Research** (Skip AI):

- Pricing is completely hidden ("Contact Sales" everywhere)
- Vendor website is very minimal (startup with no docs)
- Tool is extremely niche (won't find info in ChatGPT's training data)
- Compliance claims need to be verified with actual certificates

---

## PART 8: OUTPUT EXAMPLES

### **Example: High-Confidence Research (Greenhouse)**

json

`{
  "tool_name": "Greenhouse",
  "research_metadata": {
    "overall_confidence": 92,
    "ready_for_vendor_outreach": true,
    "vendor_outreach_priority": "High",
    "chatgpt_research_time_minutes": 35,
    "gemini_verification_time_minutes": 15,
    "nelson_review_time_minutes": 8,
    "total_research_time_minutes": 58
  },
  "nelson_manual_review": {
    "approved_for_listing": true,
    "approved_for_vendor_email": true,
    "email_template_to_use": "EMAIL 1A",
    "vendor_must_confirm": [
      "Verify pricing is still £6K-£15K (source from 2024, looks current)"
    ],
    "notes": "Excellent research. All Tier 1 data found with high confidence. Can list immediately after vendor confirms."
  }
}`

### **Example: Medium-Confidence Research (Needs Vendor)**

json

`{
  "tool_name": "SmartRecruiters",
  "research_metadata": {
    "overall_confidence": 68,
    "ready_for_vendor_outreach": true,
    "vendor_outreach_priority": "High",
    "total_research_time_minutes": 72
  },
  "nelson_manual_review": {
    "approved_for_listing": false,
    "approved_for_vendor_email": true,
    "email_template_to_use": "EMAIL 1A",
    "vendor_must_confirm": [
      "Confirm annual pricing (website says 'Contact Sales')",
      "Confirm Workday integration quality (integration page vague)"
    ],
    "notes": "Moderate confidence. Pricing unclear, integration quality ambiguous. Send EMAIL 1A but wait for vendor confirmation before listing."
  }
}`

### **Example: Low-Confidence Research (Manual Needed)**

json

`{
  "tool_name": "NicheTool",
  "research_metadata": {
    "overall_confidence": 42,
    "ready_for_vendor_outreach": false,
    "vendor_outreach_priority": "Low",
    "total_research_time_minutes": 85
  },
  "nelson_manual_review": {
    "approved_for_listing": false,
    "approved_for_vendor_email": false,
    "manual_research_needed": true,
    "critical_issues_found": [
      "No pricing info anywhere (not even 'Contact Sales')",
      "Integration page doesn't exist",
      "No compliance information found"
    ],
    "notes": "Very low confidence. Website is minimal. Need 1-hour deep manual research OR skip this tool for now."
  }
}`