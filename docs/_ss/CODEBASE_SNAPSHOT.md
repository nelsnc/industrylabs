# IndustryLabs MVP - Codebase Snapshot

> 📅 Generated: 2025-12-03 (Updated from 2025-11-23)
> 🎯 Purpose: Complete reference for project structure, tech stack, and key functionality
> 📊 Status: Foundation → Schema v2.3 → Enhanced Features Complete

---

## Research Phase Complete ✅ (December 2025)

**Strategic Research Completion**: Three comprehensive research tasks validated business model and refined positioning:

**Research Task 1: AI-Native Tool Discovery** (November 25-27, 2025)
- 120 AI-native HR tools identified across 12 categories
- Geographic distribution: US (54%), Europe (25%), India (10%), Other (11%)
- Funding stages: Seed (48%), Series A+ (35%), Pre-Seed (17%)
- 22 YC-backed tools from W22-X25 batches
- Key categories: Recruiting (42 tools), Engagement (11 tools), Analytics (8 tools)

**Research Task 2: Portfolio Analysis** (December 2-5, 2025)
- 55-tool portfolio analyzed with visibility/sales maturity scoring
- Tier classification framework established:
  - Tier 1 (13 tools, 70-85% conversion): YC recent grads, well-funded seed, niche specialists
  - Tier 2 (19 tools, 50-70% conversion): Early-stage high potential
  - Tier 3 (18 tools, 20-40% conversion): Growing but need extra channel
  - Tier 4 (5 tools, 0-15% conversion): SEO anchors only
- Category gap analysis: 84% Talent Acquisition focused, need to add 7 missing categories
- Expected MRR outcomes: Conservative (£3,960), Recommended (£8,415), Aggressive (£12,375)

**Research Task 3: Competitive Landscape** (December 8-12, 2025)
- 20+ competitors analyzed across 5 categories
- CRITICAL FINDING: **NO competitor has all 5 advantages**:
  1. AI-native only (vs G2/Capterra/FutureTools all mix AI + non-AI)
  2. HR vertical depth (vs horizontal breadth)
  3. Mid-market focus (vs enterprise/SMB)
  4. Request Board (vs passive browse)
  5. Curated 60-75 tools (vs 1000s or 20 static)
- Massive white space opportunity validated
- Clear positioning established: "The only marketplace for AI-native HR tools built for mid-market companies"

**Strategic Decisions Made** (December 13, 2025):
- DEC-014: AI-Native Only Positioning
- DEC-015: Curated 60-75 Tools Strategy
- DEC-016: Tier-Based Financial Modeling
- DEC-017: Five Competitive Advantages Framework
- DEC-018: Tier-Based Vendor Outreach Sequencing
- DEC-019: Request Board as Primary Differentiator

**Documentation Updated**:
- PROJECT_MASTER_PLAN: v1.3 → v1.4 (comprehensive competitive landscape section added)
- DECISION_LOG: v1.3 → v1.4 (6 new strategic decisions documented)
- EXECUTION_HUB: Updated with post-research integration sprint
- RESOURCES: Tier-specific vendor outreach templates added
- AIRTABLE_SCHEMA: Verified 12-category support

**Current Phase**: Growth Phase preparation (Week of Dec 13-19, 2025)
- Tool curation: Classifying 55 researched tools + identifying 15 Tier 1 candidates
- Vendor outreach prep: Tier-specific templates, Batch 1 targeting (YC W25/S25/F25 grads)
- Request Board: Operational and ready for first submissions

**Next Milestone**: Gate 1 (Month 3 - February 2026)
- Target: 5+ paying vendors, £800-1,500 MRR, 10+ Request Board submissions

---

## 📁 Project Structure Tree

```
industrylabs/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx                # Root layout with Header/Footer
│   ├── page.tsx                  # Homepage with Most Viewed Tools (TASK-113)
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── hr-talent/
│   │   └── page.tsx              # HR & Talent with sub-categories (TASK-108)
│   ├── request/
│   │   └── page.tsx              # Request Board form page
│   ├── articles/
│   │   ├── page.tsx              # Articles listing page
│   │   └── [slug]/
│   │       └── page.tsx          # Individual article page
│   ├── tools/
│   │   └── [slug]/
│   │       └── page.tsx          # Enhanced tool detail (TASK-210/211/212)
│   └── api/
│       ├── request/
│       │   └── route.ts          # POST /api/request endpoint
│       ├── subscribe/            # NEW (TASK-112)
│       │   └── route.ts          # POST /api/subscribe (ConvertKit)
│       └── tools/                # NEW (TASK-113)
│           └── [toolId]/
│               └── view/
│                   └── route.ts  # POST /api/tools/[toolId]/view (analytics)
│
├── components/                   # React components (~60-70 components)
│   ├── layout/
│   │   ├── header.tsx            # Global header with navigation
│   │   ├── footer.tsx            # Global footer
│   │   └── container.tsx         # Max-width wrapper component
│   │
│   ├── home/
│   │   ├── home-hero.tsx         # Hero section
│   │   ├── home-featured-tools.tsx       # Featured tools section
│   │   ├── home-value-props.tsx          # Value propositions
│   │   ├── home-categories.tsx           # Category preview cards
│   │   ├── home-request-cta.tsx          # CTA to Request Board (enhanced TASK-111)
│   │   ├── newsletter-form.tsx           # Newsletter signup (TASK-112)
│   │   └── most-viewed-tools-section.tsx # NEW (TASK-113)
│   │
│   ├── hr/                       # NEW (TASK-108)
│   │   ├── category-navigation.tsx       # Sticky quick-jump nav
│   │   └── category-section.tsx          # Individual category display
│   │
│   ├── tools/
│   │   ├── tool-card.tsx                 # Enhanced with v2.3 data + views
│   │   ├── tool-search-bar.tsx           # NEW (TASK-110)
│   │   ├── tool-view-tracker.tsx         # NEW (TASK-113)
│   │   ├── tool-hero.tsx                 # NEW (TASK-210)
│   │   ├── tool-quick-facts.tsx          # NEW (TASK-210)
│   │   ├── tool-pricing-section.tsx      # NEW (TASK-210)
│   │   ├── tool-implementation-section.tsx  # NEW (TASK-210)
│   │   ├── tool-integrations-section.tsx    # NEW (TASK-210)
│   │   ├── tool-compliance-section.tsx      # NEW (TASK-210)
│   │   ├── tool-case-study-section.tsx      # NEW (TASK-210)
│   │   ├── tool-alternatives.tsx            # NEW (TASK-212)
│   │   └── tool-comparison-table.tsx        # NEW (TASK-212)
│   │
│   ├── filters/                  # NEW (TASK-209)
│   │   ├── tool-filters.tsx              # Main filter container
│   │   ├── company-size-filter.tsx       # Company size checkboxes
│   │   ├── budget-range-filter.tsx       # Min/max inputs
│   │   ├── region-filter.tsx             # Geographic coverage
│   │   ├── compliance-filter.tsx         # Regulatory requirements
│   │   ├── integration-filter.tsx        # Platform integrations
│   │   ├── active-filters.tsx            # Active filter badges
│   │   └── filter-skeleton.tsx           # Loading state
│   │
│   ├── request/
│   │   ├── request-form-new.tsx          # Main request form (active)
│   │   ├── request-board-cta.tsx         # NEW Full-width CTA (TASK-111)
│   │   └── request-board-compact-cta.tsx # NEW Inline CTA (TASK-111)
│   │
│   └── ui/                       # shadcn/ui components
│       ├── alert.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── textarea.tsx
│       └── BADGE_USAGE.md
│
├── lib/                          # Utilities and helpers
│   ├── airtable.ts               # Airtable SDK + updateRecord (TASK-113)
│   ├── airtable-helpers.ts       # Tool/Article fetching + v2.3 helpers
│   ├── email.ts                  # Resend email notifications
│   ├── mock-data.ts              # Mock data for development
│   ├── utils.ts                  # Utility functions (cn, etc.)
│   │
│   ├── utils/                    # NEW
│   │   ├── pricing-formatter.ts  # NEW (TASK-206)
│   │   └── timeline-estimator.ts # NEW (TASK-207)
│   │
│   ├── types/
│   │   ├── request.ts            # Request form types
│   │   └── integration.ts        # NEW (TASK-202)
│   │
│   └── validation/
│       └── request.ts            # Zod validation schemas
│
├── scripts/                      # Development scripts
│   ├── test-airtable.ts
│   ├── test-newsletter-api.ts    # NEW (TASK-112)
│   ├── check-convertkit-setup.ts # NEW (TASK-112)
│   └── test-view-tracking.ts     # NEW (TASK-113)
│
├── docs/
│   ├── CODEBASE_SNAPSHOT.md      # This file (updated)
│   └── ENV_SETUP.md              # Environment variables guide
│
├── .claude/
│   └── settings.local.json       # Claude Code settings
│
├── public/                       # Static assets
├── .env.local                    # Environment variables (gitignored)
├── .gitignore
├── components.json               # shadcn/ui config
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
├── vitest.config.ts              # NEW Vitest test configuration
├── package.json
└── README.md
```

---

## 🗂️ Key Directories Overview

### **app/** - Next.js 14 App Router Pages
Application routes using Next.js App Router with Server Components. Each folder represents a route, with `page.tsx` as the entry point. API routes now include 3 endpoints: request submissions, newsletter subscriptions (TASK-112), and view tracking (TASK-113). All pages use Server Components for data fetching from Airtable, with fallback to mock data for development.

### **components/** - React Components (~60-70 total)
Organized by feature and purpose. Expanded significantly with schema v2.3 implementation:
- **Layout components** (4): Header, Footer, Container, Breadcrumbs
- **Home page components** (6): Hero, ValueProps, FeaturedTools, RequestCTA, Newsletter, MostViewedTools
- **HR category components** (2): CategoryNavigation, CategorySection (TASK-108)
- **Tool components** (15): Cards, search, detail sections, alternatives, comparison
- **Filter components** (8): Smart filtering system (TASK-209)
- **Request components** (3): Form, full CTA, compact CTA (TASK-111)
- **UI primitives** (10+): shadcn/ui components

### **lib/** - Business Logic & Utilities
Contains all non-UI logic. `airtable.ts` provides low-level API wrappers including new `updateRecord()` function (TASK-113). `airtable-helpers.ts` expanded with 10+ new smart filtering functions (TASK-208). New `utils/` directory contains pricing formatter (TASK-206) and timeline estimator (TASK-207) with full test coverage.

### **scripts/** - Development Tools
Helper scripts for testing and debugging. Expanded with ConvertKit testing scripts (TASK-112) and view tracking validation (TASK-113). All scripts use `tsx` for TypeScript execution.

---

## 🛠️ Technology Stack

### **Framework & Core**
- **Next.js 16.0.3** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework

### **UI Components & Styling**
- **shadcn/ui** - Accessible component system
- **Radix UI** - Headless UI primitives
  - `@radix-ui/react-checkbox`
  - `@radix-ui/react-select`
  - `@radix-ui/react-label`
  - `@radix-ui/react-separator`
  - `@radix-ui/react-slot`
  - `@radix-ui/react-dialog`
- **Lucide React 0.554.0** - Icon library (50+ icons used)
- **class-variance-authority 0.7.1** - Component variant API
- **clsx 2.1.1** - Conditional classnames
- **tailwind-merge 3.4.0** - Merge Tailwind classes
- **tailwindcss-animate 1.0.7** - Animation utilities

### **Data & API**
- **Airtable** - Database (using official REST API, 12 tables, ~250 fields)
- **Zod 4.1.12** - Schema validation
- **Resend 6.5.2** - Transactional email service

### **External Integrations**
- **ConvertKit** - Newsletter/email marketing (TASK-112)
- Analytics tracking (custom implementation, TASK-113)

### **Testing & Development Tools**
- **Vitest** - Unit testing framework (NEW - TASK-206/207)
- **ESLint 9** - Code linting
- **dotenv 17.2.3** - Environment variables
- **tsx** - TypeScript execution for scripts

### **Deployment**
- **Vercel** - Hosting platform (implied by Next.js setup)

---

## 🔐 Environment Variables

```bash
# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key              # Get from Airtable account settings
AIRTABLE_BASE_ID=your_base_id                       # Found in Airtable base URL

# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx              # From https://resend.com/api-keys
REQUEST_NOTIFICATION_FROM="IndustryLabs <notifications@industrylabs.ai>"
REQUEST_NOTIFICATION_TO="admin@industrylabs.ai"

# ConvertKit Newsletter (NEW - TASK-112)
CONVERTKIT_API_SECRET=your_convertkit_api_secret    # From ConvertKit settings
CONVERTKIT_FORM_ID=your_form_id                     # Numeric form ID

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX                      # Google Analytics ID

# Optional: Enable Airtable debugging
DEBUG_AIRTABLE=true                                 # Logs all Airtable requests
```

**Setup Guide:** See [ENV_SETUP.md](../ENV_SETUP.md) for detailed configuration instructions.

---

## 📦 Component Architecture

### Layout Components (4)
- **Container**: Max-width wrapper with padding
- **Header**: Main navigation with logo and links
- **Footer**: Site footer with links and legal
- **Breadcrumbs**: Navigation breadcrumbs

### Home Page Components (7)
- **Hero**: Homepage hero section
- **ValuePropSection**: Key benefits display
- **FeaturedToolsSection**: Showcase top tools
- **FeaturedArticlesSection**: Recent articles display
- **EmailCaptureSection**: Newsletter signup (TASK-112)
- **HomeRequestCta**: Enhanced CTA to Request Board (TASK-111)
- **MostViewedToolsSection**: Popular tools analytics (TASK-113)

### HR Category Components (2)
- **CategoryNavigation**: Sticky quick-jump nav with IntersectionObserver (TASK-108)
- **CategorySection**: Individual category display with tools (TASK-108)

### Tool Components (15)

**List/Grid:**
- **ToolCard**: Enhanced card with v2.3 data (pricing, badges, integrations, views)
- **ToolGrid**: Responsive grid container
- **ToolCardSkeleton**: Loading state

**Search & Discovery:**
- **ToolSearchBar**: Search with URL state (TASK-110)
- **ToolViewTracker**: Analytics tracking (TASK-113)

**Detail Page Sections:**
- **ToolHero**: Header with logo, name, pricing, badges, CTAs (TASK-210)
- **ToolQuickFacts**: Company size, regions, timeline, best for (TASK-210)
- **ToolPricingSection**: Sticky sidebar with detailed pricing (TASK-210)
- **ToolImplementationSection**: Timeline estimates with personalization (TASK-210)
- **ToolIntegrationsSection**: Integration quality display (TASK-210)
- **ToolComplianceSection**: Compliance badges with disclaimer (TASK-210)
- **ToolCaseStudySection**: Customer success stories (TASK-210)
- **ToolAlternatives**: Competitor comparison (TASK-212)
- **ToolComparisonTable**: Side-by-side feature comparison (TASK-212)

### Filter Components (8)
- **CompanySizeFilter**: Multiple select checkboxes (TASK-209)
- **BudgetRangeFilter**: Min/max inputs with apply button (TASK-209)
- **RegionFilter**: Geographic coverage selection (TASK-209)
- **ComplianceFilter**: Regulatory requirements (TASK-209)
- **IntegrationFilter**: Platform integrations (TASK-209)
- **ToolFilters**: Container combining all filters (TASK-209)
- **ActiveFilters**: Display active filters with remove buttons (TASK-209)
- **FilterSkeleton**: Loading state (TASK-209)

### Request Board Components (4)
- **RequestBoardForm**: Main form component (Foundation)
- **RequestBoardCTA**: Full-width CTA section (TASK-111)
- **RequestBoardInlineCTA**: Compact sidebar CTA (TASK-111)
- **RequestBoardStickyCTA**: Sticky sidebar CTA [if created] (TASK-111)

### Article Components (1)
- **ArticleCard**: Article preview card (Foundation)

### UI Components (shadcn/ui - 10+)
- Alert, Badge, Button, Card, Checkbox, Input, Label, Select, Separator, Sheet, Textarea

---

## 🌐 API Routes

### POST /api/request
**File:** `app/api/request/route.ts`
**Purpose:** Handle Request Board form submissions

**Features:**
- Zod validation (client + server)
- Writes to Airtable REQUESTS table
- Sends email notification via Resend
- Auto-detects source channel
- Captures request source URL

**Request Body:** RequestFormPayload (see `lib/types/request.ts`)
**Response:** `{ success: boolean, requestId?: string, error?: string }`

---

### POST /api/subscribe (NEW - TASK-112)
**File:** `app/api/subscribe/route.ts`
**Purpose:** Newsletter subscription via ConvertKit

**Features:**
- Email validation (client + server)
- ConvertKit API integration
- Tags applied: "IndustryLabs Website", "Newsletter Signup"
- Duplicate detection (already subscribed)
- Optional: Writes to Airtable NOTIFY_LIST table

**Request Body:** `{ email: string }`
**Response:** `{ success: boolean, message: string, subscriberId?: string }`

**Environment Variables:**
- CONVERTKIT_API_SECRET (required)
- CONVERTKIT_FORM_ID (required)

---

### POST /api/tools/[toolId]/view (NEW - TASK-113)
**File:** `app/api/tools/[toolId]/view/route.ts`
**Purpose:** Track tool page views for analytics

**Features:**
- Increments page_views in Airtable
- Updates last_view_date
- Rate limiting: 1 count per IP per hour (in-memory cache)
- Non-blocking: Failures don't crash page
- Privacy-friendly: No cookies, no user tracking

**Request:** Empty POST to /api/tools/{toolId}/view
**Response:** `{ success: boolean, views?: number, message: string }`

---

## 🗄️ Data Layer (Airtable Schema v2.3)

### Current State:
- **Total Tables:** 12 (was 9 at Foundation)
- **Total Fields:** ~250 (was ~180)
- **Relationships:** 14 bidirectional (was 11)

### Tables:

**Core Tables:**

#### 1. TOOLS (73 fields total)
**Original Fields (34):** tool_name, tool_slug, vendor_id, tier, status, verticals, short_description, long_description, pricing_model, starting_price, g2_rating, review_count, website_url, date_added, last_updated, etc.

**NEW v2.3 Fields (39):**

**Group 1: Company Size & Regional Fit (3 fields)**
- `ideal_company_size` - Array: ["1-50", "51-200", "201-500", "500+"]
- `company_size_notes` - Text: Vendor guidance on fit
- `supported_regions` - Array: ["UK", "US", "EU", "Australia", "Canada", "Global"]

**Group 2: Pricing Engine (12 fields)**
- `pricing_annual_min` - Number: Minimum annual cost (GBP)
- `pricing_annual_max` - Number: Maximum annual cost (GBP)
- `pricing_currency` - Select: "GBP", "USD", "EUR"
- `pricing_notes` - Text: Volume discounts, custom pricing notes
- `pricing_display` - Formula: Auto-formatted display string
- `pricing_source_url` - URL: Link to vendor pricing page
- `setup_fee` - Number: One-time setup cost
- `setup_fee_included` - Checkbox: Is setup fee included in annual?
- `free_trial_available` - Checkbox
- `free_trial_duration_days` - Number: Trial length (7, 14, 30, etc.)
- `contract_length_options` - Array: ["Monthly", "Annual", "Multi-year"]

**Group 3: Compliance & Certifications (7 fields)**
- `gdpr_compliant` - Checkbox
- `eeoc_compliant` - Checkbox (US employment law)
- `soc2_certified` - Checkbox
- `hipaa_compliant` - Checkbox
- `iso27001_certified` - Checkbox
- `compliance_documentation_url` - URL: Link to compliance docs
- `compliance_notes` - Text: Additional attestation details

**Group 4: Implementation Timeline (8 fields)**
- `implementation_timeline_weeks_min` - Number: Fastest implementation
- `implementation_timeline_weeks_max` - Number: Slowest implementation
- `implementation_timeline_display` - Formula: "2-4 weeks typical"
- `it_hours_required` - Number: IT team effort estimate
- `hr_admin_hours_required` - Number: HR team effort estimate
- `training_hours_admin` - Number: Admin training time
- `training_hours_enduser` - Number: End-user training time
- `implementation_prerequisites` - Text: Requirements before starting
- `common_implementation_delays` - Text: Known blockers/delays

**Group 5: Case Study & Social Proof (6 fields)**
- `case_study_url` - URL: Link to customer success story
- `case_study_company_size` - Number: Customer employee count
- `case_study_industry` - Text: Customer vertical
- `case_study_implementation_weeks` - Number: Actual timeline
- `case_study_results` - Text: Key metrics and outcomes
- `notable_customers` - Text: Comma-separated customer list

**Group 6: Integrations & Rich Media (3 fields)**
- `other_integrations` - Text: Comma-separated list (non-canonical)
- `demo_video_url` - URL: Product demo video
- `primary_competitor_ids` - Array: Linked TOOLS records (for alternatives)

**Analytics (1 field - TASK-113)**
- `page_views` - Number: Total page view count

---

#### 2. VENDORS (22 fields)
Vendor/company profiles with subscription management.

---

#### 3. REQUESTS (25 fields)
**Original Fields (18):** request_id, submission_date, requester_name, requester_email, requester_company, company_size, company_location, vertical, timeline, requirements, budget_range, current_tools, source_channel, status, gdpr_consent, matched_tools

**NEW v2.3 Fields (7):**
- `requester_company_size_exact` - Number: Exact employee count
- `requester_current_stack_names` - Array: Linked to TOOLS table
- `requester_current_stack_other` - Text: Non-listed tools
- `requester_budget_min` - Number: Minimum annual budget
- `requester_budget_max` - Number: Maximum annual budget
- `requester_region` - Select: ["UK", "US", "EU", "Other"]
- `requester_compliance_needs` - Array: Linked to COMPLIANCE_TAGS

---

**Supporting Tables:**

#### 4. CATEGORIES (12 fields)
Verticals and sub-categories with hierarchy.

---

#### 5. COMPLIANCE_TAGS (8 fields)
Master compliance registry: GDPR, EEOC, SOC2, HIPAA, ISO27001, etc.

---

#### 6. INTEGRATIONS (8 fields - TASK-201)
**Purpose:** Master integration registry

**Fields:**
- `integration_name` - Text: "Slack", "Workday", etc.
- `integration_category` - Select: "HRIS", "ATS", "Payroll", "Communication", "Calendar", "Analytics"
- `tools_count` - Count: Number of tools with this integration
- `status` - Select: "Active", "Deprecated"

**Current Records:** 30 canonical integrations (Slack, Workday, BambooHR, Greenhouse, Lever, etc.)

---

#### 7. TOOLS_INTEGRATIONS (7 fields - TASK-202)
**Purpose:** Junction table tracking integration quality

**Fields:**
- `junction_id` - Auto-number
- `tool_id` - Linked to TOOLS (single)
- `integration_id` - Linked to INTEGRATIONS (single)
- `integration_quality` - Select: "Native", "API", "Zapier", "Manual Export", "Not Supported"
- `integration_notes` - Text: Implementation details
- `last_verified` - Date: Last quality check
- `verification_source` - Select: "Vendor Website", "Documentation", "Customer Support", "AI Research"

**Integration Quality Definitions:**
- **Native**: Built-in integration, real-time sync
- **API**: Official API connection, may need setup
- **Zapier**: Via third-party automation platform
- **Manual Export**: CSV/Excel export/import
- **Not Supported**: No integration available

---

**Content Tables:**

#### 8. ARTICLES (19 fields)
Blog posts, comparisons, and guides. Supports SEO and content marketing.

---

#### 9. USE_CASES (7 fields)
Problem-solution workflow templates.

---

#### 10. NOTIFY_LIST (5 fields)
Email subscribers for newsletters and product updates.

---

**Recommendation Engine:**

#### 11. RECOMMENDATIONS (10 fields - TASK-203)
**Purpose:** AI-generated tool matches for buyer requests

**Fields:**
- `recommendation_id` - Auto-number
- `request_id` - Linked to REQUESTS
- `tool_id` - Linked to TOOLS
- `fit_score` - Number: 0-100 match score
- `fit_reasoning` - Text: Why this tool matches
- `generated_date` - Date: When recommendation created
- `status` - Select: "Pending", "Sent", "Viewed", "Clicked"
- `recommendation_url_token` - Text: Unique token for private URLs
- `buyer_feedback` - Text: Optional feedback from buyer
- `admin_notes` - Text: Internal notes

---

### Helper Functions (lib/airtable-helpers.ts)

**Original Functions:**
- `getAllTools()` - Fetch all Live tools
- `getFeaturedTools(limit)` - Get Premium tools first
- `getToolsByVertical(vertical)` - Filter by category
- `getToolBySlug(slug)` - Single tool lookup
- `getAllArticles()` - Fetch published articles
- `getArticleBySlug(slug)` - Single article lookup

**New v2.3 Functions (TASK-208):**
- `getToolsByBudgetRange(min, max, vertical?)` - Filter by annual budget
- `getToolsByCompanySize(size, vertical?)` - Filter by employee count
- `getToolsByRegion(region, vertical?)` - Filter by supported regions
- `getToolsByCompliance(needs[], vertical?)` - Filter by compliance requirements
- `getToolsByIntegration(name, minQuality?, vertical?)` - Filter by integration
- `getToolsByFilters(filters)` - Combined smart filtering
- `getIntegrationsForTool(toolId)` - Fetch integration quality data
- `getMostViewedTools(limit)` - Analytics (TASK-113)

---

## 🛠️ Utility Functions

### Pricing Formatter (TASK-206)
**File:** `lib/utils/pricing-formatter.ts`
**Purpose:** Format pricing data from Airtable into user-friendly strings

**Main Function:** `formatPricing(data: PricingData): FormattedPricing`

**Features:**
- Multi-currency support (GBP, USD, EUR)
- Range formatting ("£5,000-£15,000/year")
- Free trial indicators ("14-day free trial")
- Setup fee display
- Contract length options
- "Contact for pricing" fallback

**Test Coverage:** 100% (30+ unit tests with Vitest)

**Usage Example:**
```typescript
const formatted = formatPricing({
  pricing_annual_min: 5000,
  pricing_annual_max: 15000,
  pricing_currency: "GBP",
  free_trial_available: true,
  free_trial_duration_days: 14,
});
// Returns: {
//   display: "£5,000-£15,000/year",
//   period: "annual",
//   hasTrial: true,
//   trialText: "14-day free trial"
// }
```

---

### Timeline Estimator (TASK-207)
**File:** `lib/utils/timeline-estimator.ts`
**Purpose:** Estimate implementation timeline based on buyer company size

**Main Function:** `estimateTimelineForBuyer(tool, buyerSize): TimelineEstimate`

**Logic:**
- Matches buyer size against tool's ideal_company_size ranges
- Returns average if in ideal range (high confidence)
- Adds buffer if buyer is larger (medium confidence)
- Handles missing data gracefully

**Size Buckets:**
- "1-50": 1-50 employees
- "51-200": 51-200 employees
- "201-500": 201-500 employees
- "500+": 501-10,000 employees

**Test Coverage:** 100% (25+ unit tests with Vitest)

**Usage Example:**
```typescript
const estimate = estimateTimelineForBuyer(
  {
    implementation_timeline_weeks_min: 2,
    implementation_timeline_weeks_max: 4,
    ideal_company_size: ["51-200", "201-500"],
  },
  200 // Buyer has 200 employees
);
// Returns: {
//   estimatedWeeks: 3,
//   confidence: "high",
//   display: "3 weeks typical for your company size"
// }
```

---

## 🎯 Key Features

### Content & Discovery
✅ Homepage with hero, value props, featured tools/articles
✅ HR & Talent category page with sub-category organization (TASK-108)
✅ 5 HR sub-categories: Recruiting, Onboarding, Performance, Engagement, Analytics
✅ Tool detail pages with rich v2.3 data display (TASK-210)
✅ Article detail pages with markdown rendering
✅ Tool search functionality with URL-driven state (TASK-110)
✅ Category navigation with IntersectionObserver (TASK-108)

### Smart Filtering System (TASK-209)
✅ Company size filter (4 buckets: 1-50, 51-200, 201-500, 500+)
✅ Budget range filter (min/max inputs with apply button)
✅ Region filter (6 options: UK, US, EU, Australia, Canada, Global)
✅ Compliance filter (GDPR, EEOC, SOC2, HIPAA, ISO27001)
✅ Integration filter (16 common platforms grouped by category)
✅ Active filters display with individual remove buttons
✅ Combined filtering with URL persistence
✅ Mobile-responsive (sidebar on desktop, sheet on mobile)

### Tool Detail Pages (TASK-210, TASK-211, TASK-212)
✅ Enhanced hero with pricing, badges, CTAs
✅ Quick facts bar (company size, regions, timeline, best for)
✅ Sticky pricing sidebar with detailed breakdown
✅ Personalized implementation timeline estimates
✅ Integration quality display (Native/API/Zapier)
✅ Compliance badges with vendor attestation disclaimer
✅ Case study showcase with results and metrics
✅ Competitor alternatives with comparison context
✅ Side-by-side comparison table
✅ Bidirectional navigation between competing tools

### Request Board
✅ Multi-step form with validation (Zod + React Hook Form)
✅ Writes to Airtable REQUESTS table
✅ Email notifications via Resend
✅ Source channel auto-detection
✅ Request source URL tracking
✅ Multiple CTA placements (TASK-111):
   - Full-width section (homepage, category pages)
   - Inline compact variant (between HR sections)

### Email & Newsletter (TASK-112)
✅ Email capture section on homepage
✅ ConvertKit integration for newsletter
✅ Server-side subscription API (/api/subscribe)
✅ Success/error state handling
✅ Privacy reassurance messaging
✅ Duplicate detection (already subscribed)
✅ Auto-tagging: "IndustryLabs Website", "Newsletter Signup"

### Analytics & Tracking (TASK-113)
✅ Tool page view tracking (increments in Airtable)
✅ Rate limiting (1 view per IP per hour)
✅ Non-blocking tracking (doesn't slow page load)
✅ View count display on tool cards with Eye icon
✅ Most Viewed Tools section on homepage
✅ Privacy-friendly (no cookies, no user tracking)
✅ Automatic cache cleanup (in-memory Map)

### Data & Backend
✅ Airtable as backend (12 tables, ~250 fields)
✅ Schema v2.3 with comprehensive vendor data
✅ 30 canonical integrations in master registry
✅ Integration quality tracking (Native/API/Zapier/Manual)
✅ Pricing engine with multi-currency support
✅ Compliance verification system (vendor-supplied)
✅ Implementation timeline estimation
✅ Case study management
✅ View analytics tracking

### Technical Features
✅ Next.js 14 App Router with Server Components
✅ TypeScript strict mode
✅ Tailwind CSS for styling
✅ shadcn/ui component library
✅ Server-side Airtable fetching
✅ URL-driven filter state (shareable, SSR-compatible)
✅ Responsive design (mobile-first)
✅ SEO optimization (metadata, static generation)
✅ Error boundaries and graceful fallbacks
✅ Loading states and skeletons
✅ Form validation (client + server)
✅ Email delivery (Resend)
✅ Newsletter management (ConvertKit)
✅ Unit testing (Vitest) for critical utilities

---

## 📊 Codebase Statistics (Updated Dec 3, 2025)

### File Counts:
- **Total Files:** ~120-140 (estimated)
- **Components:** ~60-70
- **Pages (routes):** ~10-12
- **API Routes:** 3
- **Utility Functions:** 2 libraries
- **Test Files:** 2 (pricing, timeline)

### Lines of Code (estimated):
- **Total:** ~15,000-18,000 lines
- **Components:** ~8,000-10,000 lines
- **Pages:** ~2,000-2,500 lines
- **API Routes:** ~400-500 lines
- **Utilities:** ~300-400 lines
- **Tests:** ~400-500 lines
- **Config/Setup:** ~500-600 lines

### Airtable Schema:
- **Tables:** 12 (was 9)
- **Fields:** ~250 (was ~180)
- **Relationships:** 14 bidirectional (was 11)
- **Sample Records:** 30+ tools, 30 integrations

### Dependencies:
- **Production:** ~25-30 packages
- **Development:** ~15-20 packages
- **Total:** ~40-50 packages

### Performance Metrics:
- **Build Time:** ~2-3 minutes
- **Bundle Size:** TBD (run `npm run build` to check)
- **API Response Time:** <500ms for tool fetches
- **Page Load:** <2s for initial load

---

## 📈 Recent Changes (Foundation → Current)

### Phase: Foundation Complete (Nov 23, 2025)
- Basic Next.js app with 9 pages
- Request Board form with email notifications
- Tool and article detail pages
- Simple tool listings
- Airtable integration (9 tables, ~180 fields)
- ~8,000 lines of code

---

### Phase: Schema v2.3 Implementation (Nov 27 - Dec 1, 2025)
**Tasks:** TASK-201 to TASK-212

**New Tables:**
- INTEGRATIONS (30 records)
- TOOLS_INTEGRATIONS (junction table)
- RECOMMENDATIONS (AI matching system)

**TOOLS Table Expansion:**
- Added 39 fields across 6 groups
- Pricing engine (12 fields)
- Compliance tracking (7 fields)
- Implementation timelines (8 fields)
- Case studies (6 fields)
- Integration quality (3 fields)
- Company fit (3 fields)

**New Components:**
- 2 utility functions (pricing, timeline)
- 8 filter components
- 8 tool detail sections
- Comparison/alternatives system

**Lines Added:** ~4,000-5,000

---

### Phase: HR Page Enhancement (Dec 2, 2025)
**Tasks:** TASK-108, TASK-110

**New Features:**
- 5 HR sub-category sections (Recruiting, Onboarding, Performance, Engagement, Analytics)
- Category navigation (sticky with IntersectionObserver)
- Tool search bar (URL-driven with Enter key + button)
- Restructured /hr-talent page with keyword-based categorization

**New Components:**
- CategoryNavigation (89 lines)
- CategorySection (97 lines)
- ToolSearchBar (80 lines)

**Lines Added:** ~700-900

---

### Phase: Conversion Optimization (Dec 2-3, 2025)
**Tasks:** TASK-111, TASK-112

**New Features:**
- Request Board CTAs (2 variants: full-width, compact inline)
- Email capture with ConvertKit integration
- Newsletter subscription API with server-side validation
- Auto-tagging and duplicate detection

**New Components:**
- Enhanced HomeRequestCta (gradient design with benefits)
- RequestBoardCompactCTA (42 lines)
- NewsletterForm (142 lines with states)

**New API Routes:**
- POST /api/subscribe (81 lines)

**New Scripts:**
- check-convertkit-setup.ts
- test-newsletter-api.ts

**Lines Added:** ~600-800

---

### Phase: Analytics Implementation (Dec 3, 2025)
**Task:** TASK-113

**New Features:**
- Tool page view tracking with rate limiting
- Most Viewed Tools section on homepage
- View count display on tool cards
- Non-blocking analytics (failures don't crash page)

**New Components:**
- ToolViewTracker (30 lines)
- MostViewedToolsSection (50 lines)

**New API Routes:**
- POST /api/tools/[toolId]/view (75 lines)

**New Helper Functions:**
- getMostViewedTools() in airtable-helpers.ts
- updateRecord() in airtable.ts (supports PATCH requests)

**Enhanced Functions:**
- airtableFetch() now supports path segments (not just query params)

**New Scripts:**
- test-view-tracking.ts

**Lines Added:** ~300-400

---

### Total Transformation:
- **Before:** ~8,000 lines, 30 components, 1 API route
- **After:** ~15,000-18,000 lines, 60-70 components, 3 API routes
- **Growth:** ~2x codebase size in 10 days
- **New Features:** 50+ major additions

---

## 🔒 Security & Best Practices

### Environment Variables
- Never commit `.env.local` to git
- Use Vercel environment variables for production
- Validate all env vars at runtime in `lib/airtable.ts`
- API keys stored server-side only (never exposed to client)

### Data Validation
- All API inputs validated with Zod schemas
- Client-side AND server-side validation
- Type-safe throughout with TypeScript

### API Security
- Server Components for sensitive data fetching
- API routes validate request method (block GET on POST-only routes)
- No API keys exposed to client
- Rate limiting on view tracking (IP-based)
- Non-blocking analytics (don't expose tracking failures to users)

### Error Handling
- Graceful degradation with mock data fallbacks
- User-friendly error messages
- Server logs for debugging (console.error)
- Try-catch blocks in all async operations

---

## 🧪 Testing & Development

### Development Server
```bash
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Vitest unit tests
```

### Testing Utilities
```bash
# Airtable
npx tsx scripts/test-airtable.ts           # Test connection
DEBUG_AIRTABLE=true npm run dev            # Enable debug logs

# ConvertKit Newsletter
npx tsx scripts/check-convertkit-setup.ts  # Verify env vars
npx tsx scripts/test-newsletter-api.ts     # Test subscription

# View Tracking
npx tsx scripts/test-view-tracking.ts      # Test analytics API

# Unit Tests
npm run test                                # Run Vitest
npm run test -- --coverage                  # With coverage report
```

### Mock Data
- Located in `lib/mock-data.ts`
- Used as fallback when Airtable fetch fails
- Contains sample tools and articles for development

---

## 📚 Additional Resources

- **Airtable API Docs:** https://airtable.com/developers/web/api/introduction
- **Next.js Docs:** https://nextjs.org/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Resend Docs:** https://resend.com/docs
- **ConvertKit API:** https://developers.convertkit.com
- **Zod Docs:** https://zod.dev
- **Vitest Docs:** https://vitest.dev

---

## 📝 Notes

**Last Updated:** 2025-12-03
**Next.js Version:** 16.0.3 (Turbopack)
**Node Version:** 20.19.5
**Package Manager:** npm 10.8.2

**Recent Major Changes:**
- ✅ Schema v2.3 implementation with 39 new TOOLS fields (TASK-201-212)
- ✅ Smart filtering system with 5 filter types (TASK-209)
- ✅ Enhanced tool detail pages with v2.3 data (TASK-210)
- ✅ Competitor alternatives and comparison (TASK-212)
- ✅ HR sub-category sections with navigation (TASK-108)
- ✅ Tool search with URL state (TASK-110)
- ✅ Request Board CTAs (TASK-111)
- ✅ Email capture with ConvertKit (TASK-112)
- ✅ Tool page view tracking and analytics (TASK-113)
- ✅ Pricing formatter with full test coverage (TASK-206)
- ✅ Timeline estimator with full test coverage (TASK-207)

---

_This snapshot serves as a reference point for the current state of the codebase. Update as needed when major changes occur._
