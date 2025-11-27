# AIRTABLE SCHEMA & DATA MODEL

# INDUSTRYLABS – AIRTABLE SCHEMA & DATA MODEL

**Version**: 2.2 (Next.js Integration Ready)

**Last Updated**: November 19, 2025

**Purpose**: Single source of truth for all data structures, field definitions, relationships, and taxonomy. This is the canonical reference for both Airtable and the Next.js app.

> Note for AI Assistants: This document is the canonical source of truth for all field names, types, and relationships.
> 
> 
> When generating code (`lib/airtable.ts`, API routes, TypeScript types), ALWAYS align with this schema.
> 
> Do not invent new fields or change field types without updating this document first.
> 

---

## OVERVIEW

This document defines the complete data architecture for IndustryLabs. It serves as:

- **Data dictionary** – What each field means, type, and allowed values
- **Relationship map** – How tables connect to each other
- **Vertical template** – Which fields are universal vs vertical-specific
- **Onboarding guide** – For VA, future developers, or collaborators

**Critical Rule**: This is the canonical reference. If Airtable and this document conflict, **this document is correct**. Airtable must be updated to match this document, not the other way around.

---

## TABLE ARCHITECTURE

### Implementation Status

**Current State**: Production-ready database with all 9 tables implemented and validated

- **Total Tables**: 9 (3 core, 3 supporting, 3 content)
- **Total Fields**: ~180 fields across all tables (previously 177, +3 new fields in v2.2)
- **Relationships**: 11 bidirectional relationships configured
- **Sample Data**: Realistic test data loaded in all tables
- **Validation**: 100% complete (Nov 17, 2025)
- **Frontend**: Ready for integration with **Next.js** via server-side Airtable API calls and API routes

> v2.2 adds small schema tweaks to better support Next.js routing, SEO, and analytics (no structural changes to relationships).
> 

### Tables Overview

**CORE TABLES (Priority 1):**

1. **TOOLS** – All AI tools we list (**now 33 fields**)
2. **VENDORS** – Companies behind the tools (**22 fields**)
3. **REQUESTS** – Buyer submissions from Request Board (**now 25 fields**)

**SUPPORTING TABLES (Priority 2):**

1. **CATEGORIES** – Industry verticals + categories in 2-level hierarchy (**12 fields**)
2. **COMPLIANCE_TAGS** – GDPR, EEOC, SOC2, etc. with vendor attestation disclaimers (**8 fields**)
3. **INTEGRATIONS** – Tech stack integrations (Workday, Slack, etc.) (**4 fields**)

**CONTENT TABLES (Priority 3):**

1. **ARTICLES** – All SEO content we publish (**now 19 fields**)
2. **USE_CASES** – Specific problem-solution workflows for AI implementation (**7 fields**)
3. **NOTIFY_LIST** – Email notification preferences by category (**5 fields**)

### Key Design Decisions

**Subscription Model**: Per-vertical pricing (£99/month per vertical)

- Vendors can subscribe to multiple verticals (HR, L&D, CS)
- Each vertical counts as a separate subscription
- MRR calculated per vendor: `number_of_subscribed_verticals × £99`

**Verification System**: Two-tier trust model

- **Unverified** – Tools added from research (default state)
- **Verified** – Vendor-confirmed information or Premium subscribers

**Taxonomy Structure**: Two-level hierarchy

- **Level 1 – Verticals**: HR & Talent, Learning & Development, Customer Support
- **Level 2 – Categories**: Recruiting & ATS, Onboarding, Performance Management, etc.
- Categories nest under Verticals via `parent_vertical` link

**Request Board Matching**: Geography-aware matching

- UK buyers matched to UK or Global vendors
- US buyers matched to US or Global vendors
- Compliance needs considered (GDPR for UK/EU, EEOC for US)

**Content Strategy**: SEO-focused with tool relationships

- Articles link to tools mentioned
- Tools show which articles feature them
- Bidirectional relationships for discovery

**Next.js Integration Constraints** (new in v2.2):

- **Stable slugs** for tools and articles (used in file-based routes)
- **Boolean flags** for published content (`ARTICLES.is_published`)
- **Request source tracking** (`REQUESTS.request_source_url`) for attribution
- Analytics fields (`page_views`, etc.) are **populated via Next.js API routes** pulling from GA4 or similar.

---

## 1. TOOLS TABLE

**Purpose**: Every AI tool we list, with all metadata for directory pages, comparisons, and matching.

### Fields

| Field Name | Type | Required | Description | Example | Notes |
| --- | --- | --- | --- | --- | --- |
| **tool_id** | Autonumber | Yes | Unique identifier | 1, 2, 3 | Primary key |
| **tool_name** | Single line text | Yes | Official product name | “Greenhouse” | Exact spelling as vendor uses |
| **tool_slug** | Single line text | Yes | URL-friendly version | “greenhouse” | Lowercase, hyphens only, MUST BE UNIQUE |
| **slug_source** | Single select | Yes | How slug was created | Manual, Auto | Helps avoid accidental slug changes |
| **vendor_id** | Link to VENDORS | Yes | Which company owns this | Link to “Greenhouse Inc” | One tool, one vendor |
| **tier** | Single select | Yes | Free or Premium listing | Free, Premium | Determines features shown |
| **status** | Single select | Yes | Current listing status | Draft, Live, Archived | Only “Live” shows on site |
| **verification_status** | Single select | Yes | Tool information verified? | Unverified, Verified | Default: Unverified |
| **verticals** | Multiple select | Yes | Which industries this serves | HR & Talent, L&D, CS | Can be in multiple verticals |
| **primary_vertical** | Single select | Yes | Main vertical for this tool | HR & Talent | Used for primary categorization |
| **use_cases** | Link to USE_CASES | No | Specific workflows tool solves | Links to use cases | Taxonomy defined in USE_CASES |
| **company_size_fit** | Multiple select | Yes | Which company sizes this fits | 1-50, 51-200, 201-500, 500+ | Based on vendor’s target market |
| **short_description** | Long text | Yes | 1-line summary (80 chars max) | “AI-powered applicant tracking system for modern recruiters” | Shows in category listings |
| **long_description** | Long text | Premium only | Full description (500+ words) | [Full product description] | Only for Premium tier |
| **features_list** | Long text | Premium only | Bullet list of key features | “• AI resume screening• Interview scheduling• Candidate pipeline” | Markdown format |
| **pricing_model** | Single select | No | How they charge | Free, Freemium, Paid, Enterprise | General pricing structure |
| **starting_price** | Number | No | Minimum monthly cost (£) | 99 | Leave blank if free/enterprise |
| **pricing_details** | Long text | No | Detailed pricing explanation | “Starts at £99/mo for up to 50 employees…” | Free text from vendor |
| **key_features** | Long text | No | Main capabilities | Comma-separated or bullet list | Can be same as features_list |
| **screenshots** | Attachment | Premium only | Product screenshots (max 5) | [image files] | JPG/PNG, max 2MB each |
| **demo_video_url** | URL | Premium only | YouTube/Vimeo embed link | https://youtube.com/watch?v=… | Must be embeddable |
| **website_url** | URL | Yes | Official product website | [https://greenhouse.io](https://greenhouse.io/) | Primary call-to-action |
| **logo** | Attachment | Yes | Product/company logo | [logo.png] | Square format, 500x500px minimum |
| **compliance_tags** | Link to COMPLIANCE_TAGS | No | GDPR, EEOC, SOC2, etc. | Links to compliance records | Vendor-supplied info |
| **integrations** | Link to INTEGRATIONS | No | Which tools this integrates with | Links to Workday, Slack, BambooHR | Links to INTEGRATIONS table |
| **g2_rating** | Number | No | G2 Crowd rating | 4.5 | 0-5 scale |
| **review_count** | Number | No | Number of G2 reviews | 1250 | Social proof |
| **page_views** | Number | Auto | Total page views (analytics) | 1250 | Populated via Next.js API pulling GA4 |
| **request_matches** | Number | Auto | How many times matched to requests | 15 | Incremented when requests matched |
| **date_added** | Date | Auto | When tool was first added | 2025-11-16 | Auto-populated on creation |
| **last_updated** | Date | Auto | Last modification date | 2025-11-20 | Auto-updated on any edit |

### Single Select Options

**tier**: Free, Premium

**status**: Draft, Live, Archived

**verification_status**: Unverified, Verified

**verticals**: HR & Talent, Learning & Development, Customer Support

**primary_vertical**: HR & Talent, Learning & Development, Customer Support

**company_size_fit**: 1-50, 51-200, 201-500, 500+

**pricing_model**: Free, Freemium, Paid, Enterprise

**slug_source**: Manual, Auto

### Validation Rules

- **tool_slug** must be unique across all tools
- **tier** cannot change from Premium → Free without review
- Only **status = "Live"** appears on the public site
- **verification_status** defaults to “Unverified”. Only set to “Verified” after vendor confirmation or first-hand validation
- **verticals**: At least 1, max 3
- **primary_vertical**: Must be one of the selected verticals
- If **tier = Premium** → must fill: `long_description`, `features_list`, `screenshots`

### Verification Status Logic

**Unverified** (Default):

- Tool added from research or early-stage vendor contact
- Info not fully confirmed
- No “Verified” badge on public page

**Verified**:

- Vendor has confirmed information
- OR you’ve personally tested and verified key features
- OR vendor is a Premium subscriber actively maintaining their listing
- “Verified” badge shown on tool page

---

## 2. VENDORS TABLE

**Purpose**: Companies that provide tools, manage Premium subscriptions and vertical-level pricing.

### Fields

| Field Name | Type | Required | Description | Example | Notes |
| --- | --- | --- | --- | --- | --- |
| **vendor_id** | Autonumber | Yes | Unique identifier | 1, 2, 3 | Primary key |
| **company_name** | Single line text | Yes | Legal company name | “Greenhouse Software Inc” | Official name |
| **display_name** | Single line text | Yes | Brand name | “Greenhouse” | What we show publicly |
| **website** | URL | Yes | Main company website | [https://greenhouse.io](https://greenhouse.io/) | Corporate site |
| **primary_market** | Single select | Yes | Main geographic market | Global, US, UK, EU, Other | Drives matching logic |
| **hq_country** | Single line text | No | HQ country | “United Kingdom” | For “UK-based tools” filtering |
| **logo** | Attachment | Yes | Company logo (square) | [logo.png] | PNG, 500x500px min, transparent preferred |
| **tools** | Link to TOOLS | Auto | Tools this vendor owns | Links to tools | Reverse relationship |
| **subscription_status** | Single select | Yes | Current subscription tier | Free, Premium, Churned | Determines features |
| **subscribed_verticals** | Multiple select | Premium only | Which verticals they pay for | HR & Talent, L&D | Each vertical = £99/mo |
| **vertical_count** | Number | Premium only | # of paid verticals | 2 | Used for MRR formula |
| **mrr** | Formula | Auto | Monthly recurring revenue | 198 | `IF(Premium, vertical_count * 99, 0)` |
| **subscription_start_date** | Date | Premium only | When Premium started | 2025-11-20 | For churn analysis |
| **subscription_renewal_date** | Date | Premium only | Next billing date | 2025-12-20 | For renewal reminders |
| **contact_name** | Single line text | No | Primary contact person | “Jane Smith” | Who we email/call |
| **contact_email** | Email | Premium only | Contact email address | jane@greenhouse.io | For lead notifications |
| **contact_phone** | Phone | No | Contact phone number | +44 20 1234 5678 | For urgent matches |
| **request_notifications** | Checkbox | Premium only | Receive Request Board matches? | checked | Default: yes for Premium |
| **last_contact_date** | Date | No | Last time we contacted them | 2025-11-15 | For follow-up |
| **next_follow_up_date** | Date | No | When to follow up next | 2025-11-22 | Sales pipeline |
| **notes** | Long text | No | Internal notes about vendor | “CEO is ex-Google, very responsive” | Private |
| **nps_score** | Number | No | Net Promoter Score (0-10) | 9 | From satisfaction surveys |
| **churn_risk** | Single select | Auto | Likelihood of cancellation | Low, Medium, High | Based on engagement |

### Single Select Options

**primary_market**: Global, US, UK, EU, Other

**subscription_status**: Free, Premium, Churned

**subscribed_verticals**: HR & Talent, Learning & Development, Customer Support

**churn_risk**: Low, Medium, High

### MRR Formula

Recommended MVP formula (with manual `vertical_count` field):

```
IF(
  {subscription_status} = "Premium",
  {vertical_count} * 99,
  0
)

```

Manual `vertical_count` is preferred for MVP to avoid formula complexity and edge cases.

---

## 3. REQUESTS TABLE

**Purpose**: Track all buyer submissions from Request Board, and link them to tools/vendors.

### Fields

| Field Name | Type | Required | Description | Example | Notes |
| --- | --- | --- | --- | --- | --- |
| **request_id** | Autonumber | Yes | Unique identifier | 1, 2, 3 | Primary key |
| **submission_date** | Date | Auto | When request submitted | 2025-11-16 | Timestamp |
| **source_channel** | Single select | Yes | How request came in | Direct, SEO, LinkedIn, Referral, Other | For ROI tracking |
| **request_source_url** | URL | No | Page URL where form was submitted | `https://industrylabs.ai/articles/best-ai-tools-hr-2026` | Helps attribution, new in v2.2 |
| **requester_name** | Single line text | Yes | Buyer’s name | “John Doe” | From form |
| **requester_email** | Email | Yes | Contact email | john@company.com | For follow-up |
| **requester_company** | Single line text | Yes | Company name | “Acme Corp” | Buyer’s organization |
| **company_size** | Single select | Yes | Number of employees | 1-50, 51-200, 201-500, 500+ | For tool matching |
| **company_location** | Single select | No | Primary location | UK, US, EU, Other | For market-specific matching |
| **vertical** | Single select | Yes | Which vertical they need | HR & Talent, L&D, CS | Primary categorization |
| **use_case** | Multiple select or Link to USE_CASES | Yes | Specific needs | Links to use cases | Align with USE_CASES table |
| **budget_range** | Single select | No | Monthly budget | <£500, £500-£2000, £2000-£5000, £5000+ | Optional but useful |
| **timeline** | Single select | Yes | When they need solution | Immediate, 1-3 months, 3-6 months, Exploring | Urgency indicator |
| **current_tools** | Long text | No | What they use now | “Currently using Workday HRIS…” | For integration needs |
| **requirements** | Long text | Yes | Detailed description of needs | “Need AI-powered screening for…” | Free text |
| **compliance_needs** | Multiple select / Link to COMPLIANCE_TAGS | No | Regulatory requirements | Links to GDPR, EEOC | For matching |
| **matched_tools** | Link to TOOLS | No | Tools we recommended | Links to 2-3 tools | Filled after review |
| **notified_vendors** | Link to VENDORS | No | Vendors we notified | Links to vendors | Premium vendors only |
| **status** | Single select | Yes | Request lifecycle | New, Matched, Closed, Spam | Workflow tracking |
| **response_date** | Date | No | When we responded to buyer | 2025-11-16 | SLA = within 24h |
| **vendor_response_count** | Number | Auto | How many vendors replied | 2 | Track engagement |
| **outcome** | Single select | No | Final result | Converted, No Response, Not a Fit | For conversion tracking |
| **gdpr_consent** | Checkbox | Yes | User consented to data processing | checked | Always true via form |
| **internal_notes** | Long text | No | Private notes | “Budget too low for Greenhouse…” | Internal only |

### Single Select Options

**source_channel**: Direct, SEO, LinkedIn, Referral, Other

**company_size**: 1-50, 51-200, 201-500, 500+

**company_location**: UK, US, EU, Other

**vertical**: HR & Talent, Learning & Development, Customer Support

**budget_range**: <£500, £500-£2000, £2000-£5000, £5000+

**timeline**: Immediate, 1-3 months, 3-6 months, Exploring

**status**: New, Matched, Closed, Spam

**outcome**: Converted, No Response, Not a Fit

### Source Channel & URL Tracking (Next.js-Aware)

- `source_channel` is set via URL param (`?source=seo`, `?source=linkedin`, etc.)
- `request_source_url` captures the **full URL** (e.g. article, tool, category) where the request was made. This is populated by the Next.js frontend.

This allows:

- “Article → Request” attribution
- “Tool page → Request” attribution
- Channel + page-level funnel analysis

### Request Matching Logic (Year 1: Manual, Next.js-Assistable)

**Year 1**: Matching is manual, performed in Airtable using filters and views.

**Future**: Next.js can partially automate filtering server-side, but the final decision remains human.

Manual algorithm:

1. Filter tools by `vertical`, `use_case`, `company_size_fit`, `compliance_needs`
2. Filter by `primary_market` using `company_location`:
    - UK buyer → Global or UK vendors
    - US buyer → Global or US vendors
3. Prefer `verification_status = Verified` over Unverified
4. Sort candidates by `page_views`, `request_matches` (historical success)
5. Choose 2-3 best-fit tools
6. Update `matched_tools` and `notified_vendors`
7. Set `status = "Matched"` and populate `response_date`
8. Follow up for `outcome` after ~7 days

## 4. CATEGORIES TABLE

**Purpose**: Define taxonomy for verticals and categories in 2-level hierarchy.

### Fields

| Field Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| **category_id** | Autonumber | Yes | Unique identifier | 1, 2, 3 |
| **category_type** | Single select | Yes | Vertical or Category | Vertical, Category |
| **parent_vertical** | Link to CATEGORIES | Conditional | If Category, which Vertical? | Link to “HR & Talent” |
| **category_name** | Single line text | Yes | Display name | “Recruiting & ATS” |
| **category_slug** | Single line text | Yes | URL slug | “recruiting-ats” |
| **description** | Long text | Yes | What this category covers | “Tools for sourcing, screening…” |
| **tools** | Link to TOOLS | Auto | Tools in this category | Links to tools |
| **tools_count** | Formula | Auto | Number of tools | 12 |
| **status** | Single select | Yes | Live, Coming Soon, Archived | Live |
| **seo_keywords** | Long text | No | Target keywords | “AI recruiting, ATS software…” |
| **display_order** | Number | No | Ordering within vertical | 1, 2, 3… |
| **icon** | Attachment / URL | No | Icon/emoji representation | [icon] |

### Single Select Options

**category_type**: Vertical, Category

**status**: Live, Coming Soon, Archived

**`tools_count` formula**:

```
COUNTA({tools})

```

### Taxonomy Structure (Example)

```
VERTICALS (Level 1):
├── HR & Talent
│   ├── Recruiting & ATS
│   ├── Onboarding
│   ├── Performance Management
│   ├── Employee Engagement
│   └── HR Analytics
│
├── Learning & Development
│   ├── Training Content Creation
│   ├── LMS Platforms
│   ├── Skill Assessment
│   └── Coaching & Mentoring
│
└── Customer Support
    ├── Helpdesk Automation
    ├── Knowledge Base
    ├── Customer Analytics
    └── Agent Assistance

```

---

## 5. COMPLIANCE_TAGS TABLE

**Purpose**: Track compliance/regulatory standards each tool claims to meet.

### Fields

| Field Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| **compliance_id** | Autonumber | Yes | Unique identifier | 1, 2, 3 |
| **standard_name** | Single line text | Yes | Official standard name | “GDPR Compliant” |
| **standard_abbreviation** | Single line text | Yes | Short form | “GDPR” |
| **description** | Long text | Yes | What this standard means | “EU data protection regulation…” |
| **relevant_verticals** | Multiple select | Yes | Which verticals care | HR & Talent, L&D, CS |
| **relevant_markets** | Multiple select | Yes | Geographic relevance | UK, EU, US, Global |
| **tools_with_tag** | Link to TOOLS | Auto | Tools claiming this | Links to tools |
| **disclaimer** | Long text | Yes | Legal protection text | “Vendor-supplied information…” |

### Select Options

**relevant_verticals**: HR & Talent, Learning & Development, Customer Support

**relevant_markets**: UK, EU, US, Global

**Global disclaimer** to show on frontend:

> “All compliance information is vendor-supplied and represents vendor attestation. We do not provide independent verification, legal certification, or legal advice. Consult your legal team before making compliance decisions.”
> 

---

## 6. INTEGRATIONS TABLE

**Purpose**: Track which tools integrate with which platforms (Workday, Slack, etc.).

### Fields

| Field Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| **integration_id** | Autonumber | Yes | Unique identifier | 1, 2, 3 |
| **platform_name** | Single line text | Yes | Name of platform | “Workday” |
| **platform_category** | Single select | Yes | Type of platform | HRIS, ATS, Comms, CRM, LMS, Helpdesk, Analytics |
| **tools_with_integration** | Link to TOOLS | Auto | Tools that integrate | Links to tools |
| **integration_count** | Formula | Auto | # of tools integrating | 45 |

**`integration_count` formula**:

```
COUNTA({tools_with_integration})

```

---

## 7. ARTICLES TABLE

**Purpose**: All SEO content (comparisons, guides, best-of lists).

### Fields

| Field Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| **article_id** | Autonumber | Yes | Unique identifier | 1, 2, 3 |
| **title** | Single line text | Yes | Full article title | “Greenhouse vs Lever: Which AI ATS is Right for You?” |
| **slug** | Single line text | Yes | URL slug | “greenhouse-vs-lever” |
| **article_type** | Single select | Yes | Content format | Comparison, Best-of, Guide, Playbook |
| **vertical** | Single select | Yes | Primary vertical | HR & Talent |
| **use_cases** | Link to USE_CASES | No | Related use cases | Links |
| **related_tools** | Link to TOOLS | No | Tools mentioned | Links to Greenhouse, Lever |
| **word_count** | Number | No | Total words | 2500 |
| **primary_keyword** | Single line text | Yes | Main SEO keyword | “AI ATS software” |
| **meta_description** | Long text | Yes | SEO meta description | “Compare Greenhouse vs Lever…” |
| **content** | Long text | Yes | Full article body (Markdown) | [Markdown text] |
| **featured_image_url** | URL | No | Header image | [https://images.unsplash.com/](https://images.unsplash.com/)... |
| **author** | Single line text | Yes | Byline name | “Nelson Chen” |
| **status** | Single select | Yes | Publication status | Draft, Published, Archived |
| **is_published** | Checkbox | Yes | For Next.js build filters | checked for live articles |
| **publish_date** | Date | No | When article went live | 2025-11-16 |
| **last_updated** | Date | Auto | Last content modification | 2025-11-20 |
| **page_views** | Number | Auto | Total article views | 3200 |
| **avg_time_on_page** | Number | Auto | Avg seconds spent | 245 |
| **ai_draft_date** | Date | No | When AI generated draft | 2025-11-14 |
| **human_review_time** | Number | No | Minutes spent editing | 25 |

### Single Select Options

**article_type**: Comparison, Best-of, Guide, Playbook

**vertical**: HR & Talent, Learning & Development, Customer Support

**status**: Draft, Published, Archived

**Next.js usage**:

- Dynamic route `/articles/[slug]` filters on `is_published = true` and `status = "Published"`
- `page_views` and `avg_time_on_page` populated via Next.js API pulling analytics (e.g. GA4).

---

## 8. USE_CASES TABLE

**Purpose**: Define specific use cases for AI implementation.

### Fields

| Field Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| **use_case_id** | Autonumber | Yes | Unique identifier | 1, 2, 3 |
| **use_case_title** | Single line text | Yes | Name of use case | “AI-Powered Resume Screening” |
| **description_challenge** | Long text | Yes | The problem being solved | “HR teams spend 40+ hours…” |
| **ai_solution_approach** | Long text | Yes | How AI solves this | “AI screening analyzes…” |
| **category** | Link to CATEGORIES | Yes | Which category/vertical | Link to “Recruiting & ATS” |
| **tools** | Link to TOOLS | Auto | Tools that address this | Links to tools |
| **status** | Single select | Yes | Publication status | Draft, Live, Archived |
| **created** | Date | Auto | When created | 2025-11-16 |

**status**: Draft, Live, Archived

---

## 9. NOTIFY_LIST TABLE

**Purpose**: Email notification preferences by category.

### Fields

| Field Name | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| **email** | Email | Yes | Subscriber email | user@example.com |
| **categories** | Link to CATEGORIES | No | Categories they want | Links |
| **signup_date** | Date | Auto | When subscribed | 2025-11-16 |
| **status** | Single select | Yes | Subscription status | Active, Unsubscribed |
| **notes** | Long text | No | Internal notes | “Signed up from article X” |

**status**: Active, Unsubscribed

---

## TABLE RELATIONSHIPS

```
VENDORS (1) ←→ (Many) TOOLS
TOOLS (Many) ←→ (Many) CATEGORIES
TOOLS (Many) ←→ (Many) INTEGRATIONS
TOOLS (Many) ←→ (Many) COMPLIANCE_TAGS
TOOLS (Many) ←→ (Many) USE_CASES
TOOLS (Many) ←→ (Many) ARTICLES
REQUESTS (Many) ←→ (Many) TOOLS
REQUESTS (Many) ←→ (Many) VENDORS
CATEGORIES (1) ←→ (Many) CATEGORIES (Vertical → Category)
USE_CASES (Many) ←→ (1) CATEGORIES
NOTIFY_LIST (Many) ←→ (Many) CATEGORIES

```

Next.js will:

- Fetch from these tables via server-side API wrapper
- Map relationships into TypeScript types (`Tool`, `Vendor`, `Request`, etc.)
- Use slugs (`tool_slug`, `category_slug`, `slug`) for dynamic routes.

---

## DATA ENTRY WORKFLOWS

*(Same logic as v2.1, just mentally replace “for Softr” with “for Next.js frontend” — flows are unchanged.)*

I’ll keep these concise:

### Adding New Tool

1. Create Vendor (if needed)
2. Create Tool with required fields (`tool_name`, `tool_slug`, `slug_source`, `tier`, `status`, `verticals`, `primary_vertical`, `company_size_fit`, `short_description`, `website_url`)
3. Link to Vendor
4. Add Premium fields if tier = Premium
5. Add compliance, integrations, use_cases
6. Set `status = Live` when ready
7. Set `verification_status` appropriately

**Time**: 15-20 mins (Free), 30-40 mins (Premium)

### New Vendor, New Request, etc.

All as per v2.1, unchanged in logic. The only conceptual shift is:

- **Frontend is Next.js**, not Softr
- Data still lives and is managed primarily inside Airtable

---

## ANALYTICS & REPORTING (Next.js Aware)

Metrics formulas remain the same, but **data flow** is updated:

- `TOOLS.page_views` and `ARTICLES.page_views` are updated via a **Next.js API route** that periodically pulls from GA4 (or similar) and writes to Airtable.
- This can run via:
    - Vercel Cron
    - Manual script
    - Or an external scheduled job

Everything under **“Analytics & Reporting”** in v2.1 stays valid; just mentally note:

> Analytics are no longer driven by Softr, but by Next.js + GA4 + Airtable updates.
> 

---

## AIRTABLE VIEWS TO CREATE

All previously defined views (All Tools, Premium Tools, Needs Verification, etc.) remain valid and useful. No changes required specifically for Next.js – they’re primarily operational and editorial.

---

## DATA MAINTENANCE & QUALITY RULES

All the existing **daily / weekly / monthly / quarterly** maintenance rules remain valid.

New mental note:

- When you deploy new routes or change URL structures in Next.js, double-check:
    - `tool_slug`, `category_slug`, `slug` consistency
    - `request_source_url` still accurately reflects entry page URLs

---

## CHANGELOG

**Version 1.0** (Nov 16, 2025)

- Initial schema definition
- 7 core tables defined
- HR vertical taxonomy
- Basic subscription logic

**Version 1.1** (Nov 16, 2025)

- Added `verification_status` (TOOLS)
- Added `primary_market`, `hq_country` (VENDORS)
- Added `source_channel`, `company_location`, `gdpr_consent` (REQUESTS)
- Added `relevant_markets` (COMPLIANCE_TAGS)
- Updated matching logic

**Version 2.0** (Nov 17, 2025)

- Complete rebuild for clean implementation
- Expanded to 9 tables (added ARTICLES, USE_CASES, NOTIFY_LIST)
- Removed RESPONSES table
- Enhanced all field definitions and options
- Added formula specs, validation checklist, views
- All field types aligned with Airtable implementation

**Version 2.1** (Nov 17, 2025) – **Production Implementation**

- All 9 tables built in Airtable, 177 fields
- 11 relationships tested and working
- Sample data loaded
- Verified subscription and matching logic
- Marked **Ready for frontend integration**

**Version 2.2** (Nov 19, 2025) – **Next.js Integration Ready**

- Added `slug_source` (TOOLS) for stable slug management
- Added `is_published` (ARTICLES) for Next.js build filters
- Added `request_source_url` (REQUESTS) for page-level attribution
- Clarified that analytics fields (`page_views`, etc.) are populated via Next.js API routes, not Softr
- Explicitly positioned schema as backend for a Next.js frontend (server-side Airtable fetching, API routes, ISR)
- Total fields now ~180 across all tables

---

**Current Version**: 2.2 (Next.js Integration Ready)

**Next Update (v2.3)**: Document concrete Next.js API wrapper, TypeScript types, and data-fetching patterns (e.g., `getToolBySlug`, `getArticles`, `getRequestsForMatching`).

---

# IMPLEMENTATION NOTES & ACTUAL USAGE

**Last Updated:** 2025-11-23

**Status:** Foundation Phase Complete

This section documents how the Airtable schema is actually used in the production codebase, including any deviations from the original design.

---

## Frontend Implementation Status

### Tables Currently Used in Production

| Table | Status | Usage | Files |
| --- | --- | --- | --- |
| TOOLS | ✅ Active | Tool directory, featured tools, detail pages | `lib/airtable-helpers.ts`, `app/tools/[slug]/page.tsx` |
| ARTICLES | ✅ Active | Article listing, article detail pages | `lib/airtable-helpers.ts`, `app/articles/[slug]/page.tsx` |
| CATEGORIES | ⚠️ Partial | Category metadata (not yet fully utilized) | Future implementation |
| REQUESTS | ✅ Active | Request Board form submissions | `app/api/request/route.ts` |
| VENDORS | ❌ Not Used | Not yet implemented in frontend | Future |
| COMPLIANCE_TAGS | ❌ Not Used | Linked records not yet mapped | Future |
| INTEGRATIONS | ❌ Not Used | Linked records not yet mapped | Future |
| USE_CASES | ❌ Not Used | Not yet implemented | Future |
| NOTIFY_LIST | ❌ Not Used | Newsletter feature pending | Future |

---

## TOOLS Table - Frontend Field Mapping

### Fields Used in Production

**List Views (Homepage, /hr-talent):**

```tsx
{
  id: record.id,
  slug: tool_slug,
  name: tool_name,
  shortDescription: short_description,
  pricing: (calculated from pricing_model + starting_price),
  tags: [tier, pricing_model, verticals],
  companySizeFit: company_size_fit,
  websiteUrl: website_url
}

```

**Detail Pages (/tools/[slug]):**

```tsx
// All list view fields PLUS:
{
  longDescription: long_description,
  features: key_features (parsed from text),
  complianceTags: [], // TODO: Not yet mapped
  integrationTags: []  // TODO: Not yet mapped
}

```

### Field Mapping Notes

**Pricing Display Logic:**

```tsx
if (pricing_model === "Free") → "Free"
if (pricing_model === "Freemium") → "Freemium"
if (starting_price) → "From £{starting_price}/mo"
else → "Contact for pricing"

```

**Features Parsing:**

- Source: `key_features` field (Long text)
- Method: Split by `\\n`, , or
- Output: String array

**Filtering:**

- Only tools with `status = "Live"` are displayed
- Vertical filtering uses `verticals` (Multiple select) or `primary_vertical`

---

## ARTICLES Table - Frontend Field Mapping

### Fields Used in Production

```tsx
{
  id: record.id,
  slug: slug,
  title: title,
  excerpt: meta_description (truncated to 160 chars),
  category: article_type,
  author: author,
  authorRole: "Editorial Team", // Hardcoded
  publishedAt: publish_date,
  readTimeMinutes: (calculated from word_count or content),
  featuredImageUrl: featured_image_url,
  content: content (split into paragraphs),
  relatedToolSlugs: related_tools // Record IDs, not yet fully utilized
}

```

### Filtering Logic

Articles are only displayed if:

- `status = "Published"` AND
- `is_published = true`

### Content Rendering

Currently uses simple paragraph splitting:

```tsx
content.split(/\\n\\n+/).filter(Boolean)

```

**Future:** Can upgrade to full Markdown rendering with `react-markdown`

---

## REQUESTS Table - Actual Implementation

### Fields Written from Frontend

| Frontend Field | Airtable Field | Type | Notes |
| --- | --- | --- | --- |
| requesterName | requester_name | Text | Required |
| requesterEmail | requester_email | Email | Required |
| requesterCompany | requester_company | Text | Required |
| companySize | company_size | Single select | Required |
| companyLocation | company_location | Single select | Optional |
| vertical | vertical | Single select | Required |
| useCase | (combined into requirements) | - | See note below |
| budgetRange | budget_range | Single select | Optional |
| timeline | timeline | Single select | Required |
| currentTools | current_tools | Long text | Optional |
| requirements | requirements | Long text | **Combined field** |
| gdprConsent | gdpr_consent | Checkbox | Required (always true) |
| sourceChannel | source_channel | Single select | Auto-detected |
| - | status | Single select | Hardcoded: "New" |

### Special Field Handling

**Combined Requirements Field:**

```tsx
requirements = `USE CASE:
${values.useCase}

==================================================

DETAILED REQUIREMENTS:
${values.requirements}`

```

**Reason:** The `use_case` field does not exist as a separate field in the Airtable schema, so we combine it with requirements for storage.

**Source Channel Auto-Detection:**

```tsx
// Priority order:
1. URL parameter (?source=seo)
2. Referrer domain (google.com → SEO, linkedin.com → LinkedIn)
3. Default: "Direct"

```

### Fields NOT Implemented

| Field | Reason | Status |
| --- | --- | --- |
| request_source_url | Field doesn't exist in current schema | ⚠️ TODO: Add field to schema |
| compliance_needs | Linked records require record ID mapping | 📋 Future implementation |
| matched_tools | Admin workflow, not set by frontend | ✅ Correct |
| notified_vendors | Admin workflow, not set by frontend | ✅ Correct |

### Auto-Generated Fields

These fields are set by Airtable automatically:

- `request_id` (Autonumber)
- `submission_date` (Created time)

---

## Data Fetching Architecture

### Server-Side Data Flow

```
Next.js Page (Server Component)
    ↓
lib/airtable-helpers.ts
    ↓
lib/airtable.ts (SDK wrapper)
    ↓
Airtable API
    ↓
Data Mapping (Airtable fields → TypeScript types)
    ↓
React UI Components

```

### Caching Strategy

- **Current:** No caching (fresh data on every request)
- **Future:** Can implement ISR (Incremental Static Regeneration) or SWR

### Error Handling

**Fallback Pattern:**

```tsx
try {
  const tools = await getToolsFromAirtable();
  if (tools.length === 0) return mockTools;
  return tools;
} catch (error) {
  console.error(error);
  return mockTools; // Fallback to mock data
}

```

This ensures the site remains functional even if Airtable is unreachable.

---

## Known Limitations & Technical Debt

### 1. Linked Records Not Fully Utilized

**Affected Fields:**

- `TOOLS.compliance_tags` → COMPLIANCE_TAGS
- `TOOLS.integrations` → INTEGRATIONS
- `ARTICLES.related_tools` → TOOLS
- `REQUESTS.compliance_needs` → COMPLIANCE_TAGS

**Current Behavior:**

- Frontend captures the data
- Not mapped to Airtable record IDs
- Displayed as empty arrays or not displayed

**Future Fix:**
Implement lookup functions to convert names/slugs to Airtable record IDs:

```tsx
async function getComplianceRecordIds(names: string[]): Promise<string[]> {
  const allTags = await getAllRecords("COMPLIANCE_TAGS");
  return allTags
    .filter(tag => names.includes(tag.fields.standard_name))
    .map(tag => tag.id);
}

```

### 2. request_source_url Field

**Issue:** Field exists in schema v2.2 but not in production Airtable table.

**Current Workaround:**

- Frontend captures `window.location.href`
- Passed to API route
- Commented out in Airtable mapping

**To Fix:**

1. Add `request_source_url` field to Airtable REQUESTS table (type: URL or Single line text)
2. Uncomment line in `app/api/request/route.ts`:

```tsx
   if (values.requestSourceUrl) fields.request_source_url = values.requestSourceUrl;

```

### 3. Categories Not Fully Implemented

**Current:** CATEGORIES table exists but not actively used for navigation.

**Future:** Implement category-based filtering and sub-category pages.

---

## Performance Considerations

### Current Performance

- **No database queries on client side** (all Server Components)
- **No caching** (every request fetches fresh data)
- **Fallback to mock data** prevents failures

### Recommended Optimizations (Future)

1. **Enable ISR (Incremental Static Regeneration):**

```tsx
   export const revalidate = 3600; // Revalidate every hour

```

1. **Implement `generateStaticParams` for dynamic routes:**

```tsx
   export async function generateStaticParams() {
     const tools = await getAllTools();
     return tools.map(tool => ({ slug: tool.slug }));
   }

```

1. **Add Redis/Vercel KV caching** for frequently accessed data

---

## Schema Evolution Recommendations

### Immediate Actions (Week 2)

- [ ]  Add `request_source_url` field to REQUESTS table
- [ ]  Verify all field types match schema documentation
- [ ]  Test linked records with sample data

### Short-term (Month 1)

- [ ]  Implement compliance_needs linked records
- [ ]  Implement related_tools for articles
- [ ]  Utilize CATEGORIES table for navigation

### Long-term (Month 2-3)

- [ ]  Implement VENDORS table and vendor workflows
- [ ]  Implement USE_CASES table
- [ ]  Add NOTIFY_LIST for newsletter feature

---

## Testing & Validation

### Current Test Coverage

✅ **Tested:**

- Tool listing and detail pages load correctly
- Article listing and detail pages load correctly
- Request Board form submission writes to Airtable
- Email notifications sent successfully
- Error handling with mock data fallback

⚠️ **Not Yet Tested:**

- Linked records functionality
- Large datasets (100+ tools)
- Concurrent request submissions
- Airtable rate limits

### Validation Checklist

Before adding new fields or tables, verify:

- [ ]  Field names match schema exactly (case-sensitive, including underscores)
- [ ]  Single/Multiple select options defined in Airtable
- [ ]  Required fields marked as such
- [ ]  Linked records have proper relationship configuration
- [ ]  Formula fields have correct syntax

---

## Migration Path from Mock to Real Data

When transitioning from mock data to production data:

1. **Verify field mapping** for each tool/article
2. **Check slug uniqueness** (critical for routing)
3. **Validate required fields** are populated
4. **Test with 3-5 real records** before bulk import
5. **Keep mock data** as permanent fallback

---

## API Rate Limits & Quotas

**Airtable Free Tier:**

- 5 requests/second per base
- 1,200 records per table (more than enough for MVP)

**Current Usage:**

- Average: <10 requests/page load
- Peak: Request Board submission (1 write request)

**Monitoring:**
No rate limit issues expected at current scale (<1000 visitors/day).

---

## Appendix: Quick Reference

### Key Files for Airtable Integration

| File | Purpose |
| --- | --- |
| `lib/airtable.ts` | Low-level SDK wrapper (getAllRecords, createRecord) |
| `lib/airtable-helpers.ts` | High-level functions (getTools, getArticles, mappers) |
| `lib/types/request.ts` | TypeScript types for Request Board |
| `lib/validation/request.ts` | Zod schema for validation |
| `app/api/request/route.ts` | API route for form submissions |

### Environment Variables

```bash
AIRTABLE_API_KEY=key...
AIRTABLE_BASE_ID=app...

```

Both required, stored in Vercel project settings.

---

**End of Implementation Notes**