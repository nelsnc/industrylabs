# PROJECT MASTER PLAN

# INDUSTRYLABS - YEAR 1 ESSENTIAL PLAN

**Version**: 1.4 – Strategic Research Integration & AI-Native Positioning (Executive Edition)

**Timeline**: 12 Months

**Time Commitment**: 28-32 hours/week planned (33-38 hours actual expected)

**Objective**: Build asset valued at £500K-£800K

---

## 0. PROJECT OVERVIEW

### What We're Building

IndustryLabs is a **curated marketplace exclusively for AI-native B2B tools** in People Operations, starting with HR & Talent, then expanding to L&D and Customer Support.

**AI-Native Only**: We list tools founded 2020+ with AI/ML as core capability (not traditional SaaS with "AI features added"). Research validated 120 qualifying HR tools vs initial assumption of 87 mixed traditional/AI tools.

**Curated, Not Comprehensive**: 60-75 rigorously vetted tools per vertical, not 200+ mediocre listings. Portfolio analysis of 55 tools revealed clear visibility/sales maturity tiers that inform curation strategy.

**Unlike generic AI directories** (Futurepedia, There's An AI For That) that organize by broad tech categories, we organize by **industry-specific buyer workflows** (recruiting pipelines, performance cycles, engagement programs).

**Unlike incumbent B2B directories** (G2, Capterra), we focus exclusively on AI-native solutions with deep workflow integration, not legacy software with AI bolt-ons.

### Target Customers

**Buyers**: HR/Talent/L&D/CS leaders in 50-500 employee companies (GTM focus)

- Need AI tools but lack time/expertise to evaluate dozens of options
- Care about compliance (GDPR, EEOC) and integrations with existing stack
- Want curated recommendations, not overwhelming lists
- Note: Platform supports all company sizes (filtering: 1-50, 51-200, 201-500, 500+), but Year 1 go-to-market specifically targets mid-market (50-500 employees)

**Vendors**: B2B SaaS/AI tool providers in People/Productivity space

- Want qualified, high-intent enterprise leads with context (budget, timeline, company size)
- Tired of passive directory listings that generate no actionable leads
- Willing to pay for actual lead generation, not just visibility

### Core Product (Phase 1: HR Only)

**Curated Tool Directory**

- HR AI tools organized by use case (Recruiting, Onboarding, Performance, Engagement, Analytics)
- Further filtered by company size, compliance requirements, and integrations
- Compliance information (GDPR, EEOC, SOC 2, HIPAA where relevant)
    - **Important**: All compliance information is vendor-supplied and represents vendor attestation, not legal certification or independent verification
- Integration mapping: Shows which tools work with Workday, BambooHR, Greenhouse, etc.

**Request Board** (Core Differentiator)

- Buyers describe their specific situation, budget, and constraints
- We match them to 2-3 relevant vendors and provide introductions
- **Scope**: We provide high-intent introductions and facilitate initial contact; we do not guarantee conversions, negotiate deals, or act as a transaction intermediary
- Vendors receive qualified leads with full context (not anonymous clicks)
- Creates network effects: More buyers → More vendor value → More vendors → Better matching

**Vendor Data Collection Workflow** (New - v2.3)

**Three-phase approach**:

1. **AI Research** (30-45 mins per tool):
   - ChatGPT researches pricing, integrations, compliance, implementation timeline
   - Gemini cross-checks and assigns confidence scores
   - Manual review of critical fields (pricing, top 5 integrations, compliance)
   - Output: Structured JSON with 80-90% confidence on Tier 1 data

2. **Vendor Verification** (Google Form):
   - Pre-filled form with AI research data
   - Vendors correct errors rather than fill blank form (psychology: 2-3x higher response rate)
   - 10-15 minute time commitment
   - Focus on Tier 1 fields (company size, pricing, integrations, compliance, regions)

3. **Import & Verification**:
   - Import form responses to Airtable
   - Create TOOLS_INTEGRATIONS records for each integration
   - Update verification_status = "Verified"
   - Tool ready for Premium listing

**Data Quality Standards**:
- Tier 1 (Must Have): 100% complete before listing
- Tier 2 (Should Have): 70%+ complete for Premium listings
- Tier 3 (Nice to Have): Best effort, not required

**Maintenance**:
- Vendors can update via form (no self-serve portal in Year 1)
- Pricing reviewed quarterly (flag if source is >6 months old)
- SOC 2 certificates checked annually (expire after 12 months)
- Integration quality spot-checked when vendors report issues

**AI-Assisted Content Engine**

- Tool comparisons ("Greenhouse vs Lever"), "Best AI for X" guides, buyer playbooks
- Generated from structured Airtable schema using Claude API
- AI drafts → Human review (20-30 mins) → Publish
- Saves 60% time vs manual writing (2.5 hrs/article vs 6-8 hrs)

### Technical Architecture (Year 1)

**Frontend & Application Layer**

- **Framework**: Next.js 14 (App Router)
- **UI Layer**: React 18, with deliberate use of **client components** in Phase 1 to build core React skills before gradually introducing Server Components
- **Styling**: Tailwind CSS
- **Component System**: shadcn/ui as the base for consistent, accessible UI primitives (buttons, cards, forms, dialogs)

**Data & Backend Layer**

- **Primary Data Store**: Airtable Schema v2.3 (12 tables, ~250 fields, 14 relationships)
    - Core tables: TOOLS, VENDORS, REQUESTS
    - Supporting: CATEGORIES, COMPLIANCE_TAGS, INTEGRATIONS (30 records)
    - Junction: TOOLS_INTEGRATIONS (integration quality tracking)
    - Content: ARTICLES, USE_CASES, NOTIFY_LIST
    - Recommendations: RECOMMENDATIONS (AI-generated buyer matches)
    - **New in v2.3**: Vendor data architecture complete (pricing engine, compliance verification, implementation timelines, integration quality tracking, personalized recommendations)
- **Data Access**: Server-side fetching in Next.js (no Airtable API key exposed to the client)
- **Backend Logic**: Next.js API Routes for:
    - Request Board submissions → create records in `REQUESTS`
    - Notification hooks (email, optional webhooks later)
    - Future: AI-powered recommendation engine using RECOMMENDATIONS table
- **Hosting**: Vercel (build, deploy, environment variables, preview environments)
- **SEO & Routing**:
    - File-based routing for `/`, `/hr-talent`, `/hr-talent/[slug]`, `/tools/[slug]`, `/articles/[slug]`, `/request-board`
    - Next.js Metadata API for SEO, open graph, and article metadata

**Development Phasing**

- **Month 1–3**:
    - Implement entire UI using client components (pure React mental model)
    - Server-side data fetching & API routes for Airtable integration
    - No premature optimization around Server Components
- **Month 4–12**:
    - Gradually introduce Server Components where valuable (e.g. content-heavy pages)
    - Incremental refactors for performance and SEO

### AI Assistant Strategy (Development Stack)

IndustryLabs is developed using multiple AI assistants in combination:

**Claude Code (VS Code Extension)**

- Model: Claude Sonnet 4.5
- Primary tool for:
    - Multi-file navigation and edits inside the repo
    - Implementing features in existing code structure
    - Refactors, migrations, and repetitive boilerplate work

**GPT-5 / Latest GPT Models (ChatGPT / OpenAI Codex)**

- Primary tool for:
    - System design, architecture decisions, and trade-off analysis
    - Complex TypeScript typing, API design, and edge-case reasoning
    - Generating or reviewing important docs (README, ADRs, specs)

**Other Models (e.g., Gemini, [Claude.ai](http://claude.ai/))**

- Optional for:
    - Cross-checking tricky logic or security-sensitive flows
    - Alternative implementations and performance ideas

**Rules for Any AI Assistant Reading This:**

1. Treat the GitHub repo as the **single source of truth**. Never assume files that do not exist.
2. When proposing work, explicitly note **which assistant should execute which part**:
    - "Use Claude Code in VS Code to apply these multi-file changes"
    - "Use GPT-5 to review the architecture and suggest improvements"
3. Never expose or hard-code secrets – all credentials live in `.env.local` and the Access document.
4. Prefer small, incremental changes with clear commit messages over large unreviewed rewrites.
5. Clearly state whether you are in **PLAN**, **IMPLEMENT**, or **REVIEW** mode.

---

### How It Scales (Phase 2-3: L&D and CS)

**Multi-Vertical Expansion via Vendor Overlap**

- 70% of HR vendors also serve L&D (performance tools, engagement platforms)
- 65% of HR vendors also serve CS (engagement, analytics, workforce planning)
- Once HR validated, we reuse vendor relationships, content templates, platform infrastructure
- Expansion cost per vertical: ~30% of initial HR investment

**Vendor Self-Serve Portal** (Month 9-12, only if triggers met)

- Vendors update their own profiles, pricing, features, release notes
- Changes automatically flow into listings, comparisons, and guides
- Expected to reduce manual update workload significantly (target: >50% reduction), with exact efficiency validated through real vendor usage patterns before Month 9
- Built as a simple authenticated vendor area within the existing Next.js app (backed by Airtable), not a separate platform
- Enables scaling to 4-6 verticals in Year 2 without proportional headcount

### Business Model & Unit Economics

**Free Tier**: Basic listing

- Company name, logo, one-line description
- Searchable within categories
- Website link
- Included in comparison tables (with note "Not a verified vendor")

**Premium Tier**: £99/month per vertical

- Enhanced profile page: Full description (500+ words), screenshots (up to 5), demo video
- Comprehensive features list with tooltips
- **Integration quality tracking** (v2.3): Shows Native/API/Zapier/Manual integration quality for top 30 platforms
- **Detailed pricing transparency** (v2.3): Annual min/max, contract options, free trial info, setup fees
- **Compliance verification** (v2.3): GDPR, EEOC, SOC2, HIPAA, ISO27001 badges (vendor-supplied with disclaimer)
- **Implementation timeline estimator** (v2.3): Weeks-to-deploy, IT/HR hours required, prerequisites
- **Case study showcase** (v2.3): Customer success stories with company size, industry, results
- Priority placement in category pages (top 3 positions rotate among Premium)
- Request Board lead notifications (email + SMS within 2 hours of matching request)
- **Enhanced buyer matching** (v2.3): Matched on budget, region, current stack, compliance needs
- Basic analytics dashboard (page views, clicks, requests matched)

**Subscription Counting**:

- Subscriptions are counted **per vertical**, not per vendor
- Example: Vendor A subscribes to both HR and L&D = 2 subscriptions = £198/month
- Rationale: Each vertical represents distinct audience, placement, and lead source value

**Revenue Model & Projections**:

- 100% from vendor subscriptions (no ads, no affiliate links, no pay-per-click)
- Year 1 Target (Yellow Zone):
    - 25-39 unique vendors
    - Average 1.5-2.2 verticals per vendor (due to overlap strategy)
    - Total subscriptions: 50-80 vendor-vertical combinations
    - MRR: £4,950-£7,920 (rounds to £5K-£8K MRR target)
- Aligned incentives: We succeed when vendors get qualified leads, not when we drive clicks

### Why This Works

**For Buyers**:

- Industry-specific context: "AI for HR at 200-person company with Workday HRIS"
- Not generic: "AI productivity tools" (too broad, not actionable)
- Compliance information built-in: Enterprise buyers need GDPR/EEOC context (disclaimer: vendor-supplied)
- Request Board reduces evaluation time: Describe needs once, get 2-3 pre-vetted introductions

**For Vendors**:

- Qualified leads with full context: Company size, budget, timeline, current stack, pain points
- Higher conversion potential than generic directories: Buyer already filtered for fit
- Multi-vertical opportunity: One vendor relationship can generate revenue across HR, L&D, CS (separate subscriptions)
- Self-serve updates (Month 9+): Don't wait for marketplace admin to update pricing/features
- Analytics: See which buyer profiles view your tool, which requests you're matched to

**For Us (Competitive Advantage)**:

- Multi-vertical overlap enables 3x faster expansion than competitors
- Request Board creates data moat (buyer intent graph)
- AI-first content makes scaling economical (not consulting-like)
- Compliance focus is high barrier for generic marketplaces to replicate

### Competitive Moat & Long-Term Defensibility

**1. Vertical Depth**

- Deep industry-specific taxonomy and content for HR/L&D/CS
- Not a generic "AI tools list" - we understand HR buyer workflows (ATS → Onboarding → Performance → Engagement)
- Competitors stay generic because going deep per vertical is labor-intensive (we solve this with AI + templates)

**2. Compliance Layer**

- Structured coverage of GDPR, EEOC, SOC 2, HIPAA (where relevant)
- **Disclaimer**: All compliance information is vendor-supplied and represents vendor attestation, not independent legal certification
- Enterprises will pay premium for organized compliance information - SMB directories can't justify the research cost
- Becomes regulatory moat: Competitors would need to hire compliance experts per vertical

**3. Buyer Intent Graph** (Accumulates Over Time)

- What buyers in each vertical actually ask for (not what vendors claim)
- Which tools they evaluate (comparison page views, Request Board matches)
- Which tools they adopt (vendor feedback, testimonials, churn data)
- This becomes proprietary "recommendation intelligence" that improves matching accuracy
- After 100+ requests in HR, we know: "200-person SaaS company, currently using Workday, hiring 50 people this year, GDPR-critical → Recommend Greenhouse + HireVue, NOT Lever"

**4. Network Effects via Request Board**

- More buyers posting requests → More valuable for vendors → More vendors join Premium
- More Premium vendors → Better matching for buyers → More buyers use Request Board
- Classic two-sided marketplace flywheel (similar to G2's review flywheel, but ours is request-based)

**5. AI-First Automation & Scalability**

- Content engine: Vendor updates → AI generates comparison updates → Human review → Publish
- Reduces content cost per tool from £50-100 (manual) to £10-15 (AI-assisted)
- Vendor portal: Self-serve updates reduce admin time significantly (target >50% reduction)
- This makes 4-6 verticals manageable in Year 2 (competitors need proportional headcount growth)

### Competitive Landscape Analysis

**Research Date**: December 2025
**Conclusion**: Massive white space opportunity; no direct competitor owns "AI-native only B2B tools for People Ops"

**Primary Competitors & Gaps**:

1. **G2 / Capterra / Shortlister** (Incumbent B2B Directories)
   - **Gap**: Mix legacy SaaS (BambooHR, Workday) with AI-native tools (Dover, Metaview)
   - **Gap**: Generic horizontal reviews, not vertical-specific workflows
   - **Gap**: Low-quality lead gen (anonymous clicks, not qualified requests)
   - **Our Advantage**: AI-native only + workflow-specific curation + Request Board matching

2. **FutureTools / Futurepedia / There's An AI For That** (AI Tool Aggregators)
   - **Gap**: Consumer-focused, generic AI categories (not B2B/enterprise workflows)
   - **Gap**: Breadth over depth (1,000+ tools, minimal vetting)
   - **Gap**: No compliance layer, no integration tracking
   - **Our Advantage**: B2B enterprise focus + compliance verification + integration quality + vendor credibility standards

3. **AI Tool Repositories (GitHub Awesome Lists, Reddit r/HR)**
   - **Gap**: Community-maintained, inconsistent quality, no verification
   - **Gap**: No business model, no vendor accountability
   - **Our Advantage**: Verified vendor data + structured schema + accountable vendor relationships

4. **HR Tech Analysts / Consultants** (Josh Bersin, RedThread Research)
   - **Gap**: High-cost consulting model (£10K+ engagements)
   - **Gap**: Reports behind paywalls, not self-serve
   - **Our Advantage**: Self-serve marketplace + free buyer access + scalable matching

5. **Niche HR Communities / Slack Groups** (People Geeks, HR Tech Weekly)
   - **Gap**: Fragmented, no central discovery platform
   - **Gap**: Anecdotal recommendations, not structured data
   - **Our Advantage**: Centralized, structured, verified tool database

**Five Core Competitive Differentiators** (See DEC-017):

1. **AI-Native Only Positioning**: Founded 2020+, AI/ML core capability
2. **Request Board as Buyer-Vendor Matching Engine**: Self-serve lead generation vs passive listings
3. **Curated 60-75 Tools**: Quality over quantity, tier-based vendor selection
4. **Compliance + Integration Depth**: GDPR/EEOC/SOC2 + 30 platform integrations
5. **Vertical-Specific Workflows**: HR recruiting pipelines, not generic "productivity tools"

**Market Validation**: 120 AI-native HR tools identified, 55-tool portfolio scored on visibility/sales maturity, competitive research confirms no direct overlap.

### Strategic Constraints & Trade-Offs

**What We Are NOT Building (Year 1)**

- NOT a review platform (no user reviews, no ratings - that's G2's model, requires massive scale)
- NOT a booking/transaction platform (no rev-share on deals - keeps incentives clean, simpler compliance)
- NOT a consulting service (no custom tool selection projects - would kill scalability)
- NOT broad horizontal (no "AI tools for developers/designers/marketers" - focus over breadth)

**Deliberate Limitations**

- Phase 1: HR only (not L&D/CS until Month 4+ and only if HR hits Yellow/Green)
- Pricing: Simple 2-tier only (Free + £99 Premium). No add-ons until Month 10+, and only if vendors repeatedly request specific features
- Geographic: English-speaking markets only (UK, US, Canada, Australia - no localization Year 1)
- Company size: GTM focuses 50-500 employees (platform supports all sizes, but marketing targets mid-market only)

**Why These Constraints**

- Focus enables depth: Better to dominate HR for 50-500 employee companies than be mediocre across 10 verticals
- Simplicity enables execution: Solo founder with full-time job cannot manage complex product
- Clear ICP enables marketing: "HR tools for mid-market" is targetable; "AI tools for everyone" is not

### Success Definition

**Yellow Zone = Validated Business** (Primary Target)

- £5,000-£8,000 MRR (50-80 vendor-vertical subscriptions)
- 25-39 unique paying vendors
- 2-3 operational verticals (HR + 1-2 others)
- 20-27 published articles
- 4,000-8,000 monthly visitors
- <5% monthly vendor churn
- Valuation: £480K-£672K (6-7x ARR for profitable marketplace with data moat)

**Green Zone = Stretch Performance**

- £8,000+ MRR (80+ vendor-vertical subscriptions)
- 40+ unique paying vendors
- 3 solid verticals
- 28+ published articles
- 8,000+ monthly visitors
- Valuation: £768K-£1.15M (8-12x ARR with strong growth trajectory)

**Red Zone = Strategic Reassessment**

- <£4,000 MRR
- <20 paying vendors
- Only 1 vertical without growth
- Consistent monthly decline
- Action: Pivot positioning, adjust pricing, or consider exit/shutdown

**Mental Model**: Yellow is the success target. Green is exceptional. Don't treat Yellow as failure.

## I. SUCCESS CRITERIA

### Month 12 Performance Zones

**STRETCH TARGET (Green Zone)**

- Monthly Recurring Revenue: ≥ £8,000
- Paying Vendors: ≥ 40
  - Tier 1 (YC Recent Grads, Well-Funded Seed): 15-20 vendors @ 70-85% conversion
  - Tier 2 (Niche Specialists, UK/EU Geographic): 12-15 vendors @ 50-70% conversion
  - Tier 3 (Early-Stage, Low Visibility): 8-12 vendors @ 20-40% conversion
  - Tier 4 (MVP Stage, Pre-PMF): <5 vendors @ 0-15% conversion
- Active Verticals: 3 solid (HR + 2 others)
- Published Content: ≥ 28 evergreen articles
- Monthly Visitors: ≥ 8,000
- Email Subscribers: ≥ 2,000

**BASE SUCCESS (Yellow Zone)** - Primary Target

- Monthly Recurring Revenue: £5,000-£7,999
- Paying Vendors: 25-39
  - Tier 1: 10-12 vendors @ 70-85% conversion
  - Tier 2: 8-12 vendors @ 50-70% conversion
  - Tier 3: 5-10 vendors @ 20-40% conversion
  - Tier 4: <5 vendors @ 0-15% conversion
- Active Verticals: 2-3 (HR foundation required)
- Published Content: 20-27 articles
- Monthly Visitors: 4,000-7,999
- Email Subscribers: 1,000-1,999

**REASSESSMENT REQUIRED (Red Zone)**

- Monthly Recurring Revenue: < £4,000
- Paying Vendors: < 20
- Active Verticals: Single vertical without growth
- Published Content: < 15 articles
- Monthly Visitors: < 2,000
- Trend: Consistent monthly decline

**Tier-Based Conversion Model** (DEC-016):

- **Tier 1**: YC Recent Grads (2022-2025), Well-Funded Seed (£3M+ raised) → 70-85% conversion probability
- **Tier 2**: Niche Specialists (strong product-market fit in specific use case), UK/EU Geographic (international expansion play) → 50-70% conversion
- **Tier 3**: Early-Stage (founded 2021-2023, <£1M raised), Low Visibility (minimal web presence) → 20-40% conversion
- **Tier 4**: MVP Stage (launched <12 months), Pre-PMF → 0-15% conversion (deprioritize outreach)

**Vendor Acquisition Strategy**: Prioritize Tier 1 outreach (80% of initial effort), expand to Tier 2 (15%), minimal Tier 3 (5%), exclude Tier 4 until Month 9+.

**Decision Framework**: Yellow zone represents validated business model and successful execution. Green zone represents exceptional performance. Red zone triggers strategic reassessment.

**Critical Mindset**: Yellow is the success target. Green is stretch achievement. Do not treat yellow performance as failure.

---

## II. CORE OPERATIONAL TRACKS

### Track 1: Content & SEO Strategy (35% time allocation)

**Annual Target**: 24-28 evergreen articles

**Measurement Approach**: Rolling 3-month average of 6-9 articles per quarter (allows natural productivity variation)

**Content Types**:

- Best-of-category compilations ("Best AI Tools for X")
- Head-to-head comparisons ("[Tool A] vs [Tool B]")
- Buyer decision guides ("How to Choose...")
- Use case deep dives (problem-solution format)

**Production Workflow**:

- AI-generated first draft: 1 hour
- Human editing and fact-checking: 1-1.5 hours
- SEO optimization and publishing: 30 minutes
- Total per article: 2.5-3 hours

**Accept Natural Variation**:

- High-productivity months: 4 articles
- Standard months: 2-3 articles
- Low-bandwidth months: 1 article
- Evaluate performance quarterly, not monthly

**Explicit Exclusions**:

- Daily or weekly blogging cadence
- News or trending topic coverage
- Social media-specific content creation
- Video content production
- Podcast production

**Time Investment**: 8-10 hours per week

---

### Track 2: Vendor Acquisition & Request Board (35% time allocation)

**Realistic Annual Target**: 25-35 paying vendors (40+ represents stretch performance)

**Acquisition Effort Curve**:

- First 10 paying vendors: 3-5 hours per vendor (includes multiple touchpoints, internal approvals, objection handling)
- Vendors 11-25: 1-2 hours per vendor (social proof accelerates conversion)
- Vendors 26+: <1 hour per vendor (established reputation, referrals)

**Month 1-6 Priorities**:

- Outreach to 40-50 target HR vendors
- Respond to all Request Board submissions within 24 hours
- Match buyer requests to appropriate vendors
- Maintain vendor relationships and gather feedback

**Month 7-12 Priorities**:

- Expand outreach to L&D and Customer Support vendors
- Convert free listings to premium subscriptions
- Reduce churn through value demonstration
- Implement simple upsells only when vendors explicitly request features

**Request Board Operations**:

- Response time target: 30 minutes per submission
- Include 2-3 tool recommendations with rationale
- Offer vendor introductions when appropriate
- Extract content themes for article development

**Explicit Exclusions**:

- Complex add-on feature menu
- Aggressive or high-pressure sales tactics
- Extended negotiation cycles (>3 touchpoints)
- Elaborate CRM system implementation

**Time Investment**: 8-10 hours per week (may increase to 12-14 hours during Month 3-6 acquisition push)

---

### Track 3: Platform Development (30% time allocation)

**Month 1-3 (Foundation Phase)**: 12-15 hours per week

- Next.js + React + Tailwind + shadcn/ui application setup and baseline implementation
- Airtable database architecture finalization and API integration
- Build core routes and pages (homepage, HR category, tool detail, article detail, Request Board)
- Implement Request Board form as a Next.js page + API Route that writes to the `REQUESTS` table
- Configure basic email notification pipeline (via API route + email provider, e.g. Resend/SendGrid)

**Month 4-12 (Maintenance Phase)**: 3-5 hours per week

- Ongoing platform maintenance (bug fixes, UI polish, performance improvements)
- Incremental improvements to existing pages and components
- Build new vertical templates and shared layout components as L&D/CS come online
- Introduce Server Components where beneficial (content-heavy pages, SEO-critical routes)

**Vendor Portal Decision Criteria** (all conditions must be met):

- Minimum 10 paying vendors
- Minimum 15 content update requests per week
- Manual update time exceeding 10 hours per week
- Explicit vendor requests for self-service capability

**Portal Alternative Solution (Version 0.5)**:

If update volume increases but full portal threshold not met:

- Airtable Interface for vendor access
- Lightweight authenticated vendor/update views built inside the existing Next.js app (simple forms posting to API routes)
- Optional use of simple forms + automation tools (e.g. Google Forms + Zapier) for edge cases
- Achieves 90% functionality at ~10% development cost and complexity

**Time Investment**: Average 6-8 hours per week across 12 months

### Track 3B: AI Agent Development (Optional Enhancement)

**Not a separate track, but integrated into existing tracks as productivity multiplier**

**Month 1-3 (Manual Baseline)**:

- No agents deployed
- Establish baseline metrics (time spent per article, per vendor research, per request match)
- Focus: Learn what tasks are most repetitive and well-defined

**Month 4-6 (First Agent)**:

- Deploy Content Writer agent (if baseline shows >8 hrs/week on article writing)
- Setup: 10-15 hours initial configuration
- Target: 30-40% time savings (8 hrs → 5 hrs per article cycle)
- Success criteria: 2 publishable articles/week at 70-80% quality

**Month 7-12 (Optimization)**:

- Optimize Content Writer agent (reduce review time to <2 hrs/week)
- Evaluate second agent need based on bottlenecks

**Year 2 Decision**:

- If continuing past Month 12 → Consider Vendor Research agent, Request Matcher agent
- If preparing for exit → Maintain current agent(s), focus on vendor relationships

**Philosophy**: Agents are tools, not team members. Only deploy when:

1. Task is repetitive and well-defined
2. Time savings justify 10-15 hr setup cost
3. Quality can be validated by you in <30 mins

---

## III. PRICING STRATEGY

### Month 1-9: Two-Tier Model

**Free Tier**:

- Basic directory listing
- Company name, logo, single-line description
- Searchable within category structure
- Website link

**Premium Tier (£99/month)**:

- Enhanced tool page with extended description
- Multiple screenshots (up to 5)
- Demo video embedding
- Comprehensive features list
- **Integration quality tracking (v2.3)**: Native/API/Zapier/Manual quality for 30 platforms
- **Detailed pricing (v2.3)**: Annual ranges, contracts, trials, setup fees
- **Compliance badges (v2.3)**: GDPR, EEOC, SOC2, HIPAA, ISO27001 (vendor-supplied)
- **Implementation timelines (v2.3)**: Weeks-to-deploy, effort hours, prerequisites
- Priority placement in categories
- Request Board lead notifications with **enhanced matching (v2.3)**: budget, region, stack, compliance
- Basic analytics (page view counts)

**Early Adopter Incentive**: First 10 vendors receive 3-month free trial

### Month 10-12: Optional Single Add-On

**Implementation Criteria**: Only if vendors repeatedly request specific capability

**Options** (select maximum of one):

- Category Boost: £49/month (enhanced ranking position)
- Lead Priority: £39/month (first notification for matching requests)

**Critical Constraint**: Do not build multiple add-ons speculatively. Wait for demonstrated demand.

**Year 2 Deferral**: All additional pricing tiers, co-marketing packages, and enterprise features

---

## IV. MULTI-VERTICAL EXPANSION

### Phase 1: HR Foundation (Month 1-4)

**Deliverables**:

- 20-30 tools catalogued
- 5-8 paying vendor relationships
- 15+ Request Board submissions
- 500-1,500 monthly unique visitors

**Gate 1 Decision Point (Month 4)**:

Must achieve Yellow or Green zone performance before proceeding to Phase 2.

**Hard Stop Criteria**: If HR vertical remains in Red zone at Month 4:

- MRR below £400
- Fewer than 5 paying vendors
- Fewer than 10 request submissions

**Action if Hard Stop triggered**: Allocate Month 5-6 to HR optimization. Do not commence L&D vertical until HR achieves Yellow zone.

---

### Phase 2: L&D Vertical (Month 5-8)

**Strategic Rationale**: 70% vendor overlap with HR vertical enables rapid deployment

**Deliverables**:

- 15-20 additional tools catalogued
- 8-12 paying L&D vendor relationships
- Content template replication from HR
- Cross-vertical vendor expansion

**Prerequisite**: HR vertical must have achieved Yellow zone at Gate 1

---

### Phase 3: Customer Support Vertical (Month 9-12)

**Strategic Rationale**: 65% vendor overlap with HR vertical

**Deliverables**:

- 15-20 additional tools catalogued
- 10-15 paying CS vendor relationships
- Platform totals: 3 verticals, 60-80 tools

**Acceptable Alternative**: 2 solid verticals by Month 12 represents Yellow zone success. Do not force 3rd vertical if capacity constraints exist.

---

## V. EXPLICIT YEAR 1 EXCLUSIONS

### Product Features Deferred to Year 2

- Complex multi-tier add-on menu (6+ options)
- Co-marketing package offerings
- Vendor Portal Version 2 intelligence features
- Automated competitor tracking
- AI-powered matching algorithms
- Buyer-facing quiz or shortlist tools
- Advanced analytics dashboards
- Public API access
- Mobile applications

### Marketing Activities Deferred to Year 2

- Paid advertising campaigns
- Conference speaking engagements
- Public relations initiatives
- Webinar series production
- Daily social media content creation

### Business Infrastructure Deferred to Year 2

- External funding acquisition
- Full-time employee hiring
- Physical office establishment
- Complex corporate structures
- Legal entity beyond sole proprietorship

### Vertical Markets Deferred to Year 2

- Finance AI (minimal overlap with HR)
- Legal AI (virtually no overlap with HR)
- Any verticals beyond 3 total

---

## VI. WEEKLY OPERATIONAL ROUTINE

### Weekday Structure (Monday-Friday)

**Morning Session (6:30-8:00am)**: 1.5 hours

- Monday/Wednesday/Friday: Content writing and editing
- Tuesday/Thursday: Platform maintenance or vendor administration

**Evening Session (8:00-9:30pm)**: 1.5-2 hours

- Monday: Vendor research and outreach emails
- Tuesday: Request Board response and vendor matching
- Wednesday: Content editing and publishing workflow
- Thursday: LinkedIn engagement and community participation
- Friday: Weekly review and following week planning

**Daily Micro-Tasks (15 minutes, flexible timing)**:

- Request Board monitoring
- Urgent vendor correspondence
- LinkedIn activity (comments, engagement)

**Weekday Total**: 15-17.5 hours per week

### Weekend Structure

**Saturday (6-7 hours)**:

- Deep work: Complete 1 SEO article or comparison piece
- Vendor relationship follow-up
- Platform improvements and optimization

**Sunday (6-8 hours)**:

- Deep work: Complete 1 SEO article or buyer guide
- Analytics review and interpretation
- Content scheduling for upcoming week
- Month-end administrative tasks (if applicable)

**Weekend Total**: 12-15 hours per week

**Weekly Aggregate**: 28-32.5 hours planned (expect 33-38 hours actual)

---

## VII. MILESTONE CHECKPOINTS

### Month 3: HR MVP Validation

**Required Achievements**:

- Platform operational with 20-30 tool listings (60-75 curated target by Month 12)
- 5-8 paying vendor relationships established
  - Target: 4-5 Tier 1 vendors, 2-3 Tier 2 vendors
- £500-£1,000 monthly recurring revenue
- 10-15 Request Board submissions received
- 8-10 articles published and indexed

**Vendor Acquisition Focus**: Prioritize Tier 1 outreach (YC Recent Grads, Well-Funded Seed)

**Decision**: If below minimum thresholds, allocate Month 4 to HR iteration before vertical expansion

---

### Month 6: Business Model Proof

**Required Achievements**:

- 2 operational verticals (HR + L&D)
- 15-20 paying vendor relationships
  - Target: 8-10 Tier 1 vendors, 5-7 Tier 2 vendors, 2-3 Tier 3 vendors
- £2,500-£4,000 monthly recurring revenue
- 1,500-3,000 monthly unique visitors
- 18-22 articles published
- Monthly vendor churn rate below 5%

**Tier-Based Conversion Validation**: Monitor Tier 1 conversion rate (should be 70-85%)

**Decision Point**: Evaluate Vendor Portal necessity (full version or 0.5 alternative)

---

### Month 9: Scaling Validation

**Required Achievements**:

- 2-3 operational verticals
- 25-35 paying vendor relationships
  - Target: 10-12 Tier 1 vendors, 8-12 Tier 2 vendors, 5-8 Tier 3 vendors, <5 Tier 4 vendors
- £4,500-£7,000 monthly recurring revenue
- 4,000-6,000 monthly unique visitors
- 22-26 articles published
- Documented positive vendor testimonials

**Financial Model Validation**: Confirm tier-based conversion probabilities match projections (Tier 1: 70-85%, Tier 2: 50-70%, Tier 3: 20-40%)

**Decision Points**:

- Consider single add-on if repeatedly requested
- Evaluate VA hiring if operational burden high

---

### Month 12: Exit Readiness Assessment

**Required Achievements**:

- Performance in Yellow or Green zone (see Section I)
- Documented operational processes
- VA managing 30-40% of routine operations
- 12+ months financial performance history
- Stable or growing MRR trend
- Preparation for sale listing or Year 2 scaling decision

---

## VIII. CRITICAL DECISION GATES

### Gate 1 (Month 4): Multi-Vertical Expansion Authorization

**Proceed Criteria**:

- Minimum 5 paying vendors
- Minimum £500 MRR
- Minimum 500 monthly visitors
- Minimum 10 Request Board submissions
- Positive vendor feedback documented

**Do Not Proceed Actions**:

- Continue HR vertical optimization for Month 5-6
- Reassess market positioning
- Strengthen core value proposition
- Delay L&D launch until HR achieves Yellow zone

---

### Gate 2 (Month 6): Vendor Portal Development Decision

**Full Portal Criteria** (all must be satisfied):

- Minimum 10 paying vendors
- Minimum 15 update requests per week
- Manual update time exceeding 10 hours per week
- Explicit vendor requests for self-service
- L&D vertical successfully launched

**Alternative Path**: Portal Version 0.5

- If update volume manageable but increasing
- Implement lightweight solution:
    - Airtable Interfaces for controlled vendor access, plus
    - Simple authenticated vendor update views within the Next.js app (forms posting to API routes), and/or
    - Google Forms + automation as a temporary intake channel
- Delivers ~90% benefit at ~10% development cost

**Do Not Proceed Actions**:

- Continue manual Airtable maintenance
- Prioritize content production and vendor acquisition
- Reassess at Month 9

### Gate 3 (Month 9): Resource Expansion Decision

**VA Hiring Criteria**:

- Minimum £5,000 MRR (ensures cost coverage)
- Operational tasks causing founder burnout
- Clear ROI calculation for delegated work

**Third Vertical Launch Criteria**:

- L&D vertical demonstrating profitability
- Multi-vertical template validated across 2 markets
- Founder capacity available (not overwhelmed)

---

## IX. TIME BUDGET & SUSTAINABILITY

### Sprint Period (Month 1-3)

- Planned allocation: 30-32 hours per week
- Expected actual: 35-38 hours per week
- Characterization: Temporary high-intensity foundation phase

### Sustainable Period (Month 4-12)

- Planned allocation: 26-30 hours per week
- Expected actual: 30-35 hours per week
- Target with VA support: 25-28 hours per week (Month 9+)

### Burnout Warning Indicators

Immediate reassessment required if experiencing:

- Consistent work weeks exceeding 40 hours for more than 2 months
- Missing deadlines or declining performance in full-time employment
- Measurable health deterioration or relationship strain
- Quality decline across both full-time and side project work

**Burnout Response Protocol**:

1. Immediate 1-week complete break from project
2. Reduce scope by 30% upon return
3. Accelerate VA hiring regardless of MRR threshold
4. Accept 3-month timeline extension
5. Recognize: Burnout equals total failure; delay equals minor setback

---

## X. PERFORMANCE TRACKING

### Weekly Metrics Dashboard

**Vendor Performance**:

- Total tools listed: ___
- Paying vendor count: ___
- Monthly Recurring Revenue: £___
- Monthly churn rate: ___%

**Traffic Performance**:

- Monthly unique visitors: ___
- Top 3 landing pages: ___, ___, ___
- Organic search percentage: ___%

**Engagement Performance**:

- Request Board submissions (current month): ___
- Email subscriber count: ___
- Newsletter open rate: ___%

**Content Performance**:

- Cumulative articles published: ___
- Top ranking keywords: ___, ___, ___
- Average article page views: ___

**Review Cadence**: Sunday evening, 15-minute session

---

## XI. MONTHLY REVIEW PROTOCOL

**Schedule**: Final Sunday of each month, 1-2 hour session

**Component 1: Metrics Analysis (30 minutes)**

- Update all dashboard metrics
- Compare performance against milestone targets
- Identify positive and negative trends
- Document notable changes

**Component 2: Retrospective (30 minutes)**

- Document 3 significant wins from past month
- Document 3 primary challenges encountered
- Identify 1-2 tactical adjustments for following month
- Note any strategic insights gained

**Component 3: Forward Planning (30 minutes)**

- Establish Priority 1 for next month
- Establish Priority 2 for next month
- Establish Priority 3 for next month
- Identify activities to discontinue

**Component 4: Strategic Alignment Check (15 minutes)**

- Brief review of full Master Plan 2.0
- Validate or invalidate key assumptions
- Note emerging opportunities
- Document required strategic pivots

**Critical Constraint**: Do not completely rewrite operational plan monthly. Adjust tactics while maintaining strategic direction.

---

## XII. FIRST 30 DAYS EXECUTION

### Week 1: Infrastructure Foundation

- Register industrylabs.ai domain
- Initialize **Next.js + TypeScript + Tailwind** project (create-next-app)
- Set up shadcn/ui and base design tokens (colors, typography)
- Connect Airtable base (create API wrapper and test a simple server-side fetch)
- Create Git repository and connect to Vercel for deployments

### Week 2: Core Platform Build (HR MVP Skeleton)

- Implement core routes and layouts:
    - `/` (Homepage – HR-focused)
    - `/hr-talent` (HR category overview)
    - `/tools/[slug]` (tool detail)
    - `/articles/[slug]` (article detail)
    - `/request-board` (Request Board form)
- Create initial UI components:
    - `Hero`, `ValuePropSection`, `CategoryGrid`, `ToolCard`, `ArticleCard`, `RequestBoardCTA`, `Layout`, `Navbar`, `Footer`
- Implement static or mock-data versions first, then connect to Airtable for:
    - Tools list
    - Categories
    - Articles

### Week 3: Data Integration & Request Board

- Wire up Airtable-backed data fetching for:
    - Homepage sections (categories, featured tools, recent articles)
    - HR category page
    - Tool and article detail pages
- Implement Request Board:
    - Build form UI with React Hook Form + shadcn/ui components
    - Create Next.js API Route that writes submissions into `REQUESTS` table
    - Add basic validation and error states
- Configure email notifications:
    - After a successful submission, trigger an email to founder inbox (via email provider)

### Week 4: Soft Launch & Initial Outreach

- Polish UI, test mobile responsiveness across core pages
- Conduct soft launch with 10 beta testers for feedback (focus: clarity, trust, navigation)
- Initiate outreach to first 10 target vendors (with working demo URLs)
- Write and publish:
    - "Best AI Tools for HR [2026]"
    - "Greenhouse vs Lever" comparison
- Establish LinkedIn content posting schedule
- Announce Request Board availability

**Day 30 Target State**:

Next.js platform operational on Vercel, 8-10 tools listed, 2-3 articles published, Request Board live and writing to Airtable, 10 vendor conversations initiated.

---

## XIII. DELEGATION ROADMAP

### Month 1-4: Solo Execution Phase

- Founder executes all operations
- Establish all systems and workflows
- Document what works and what doesn't
- Build operational knowledge

### Month 5-6: Initial VA Support (if £3,000+ MRR or burnout risk)

**Investment**: £500-800 per month

**Delegated Responsibilities**:

- Content copyediting and polishing (founder provides draft)
- Image sourcing and optimization
- Airtable data entry and maintenance
- Simple content updates in the Next.js app (following checklists/PRs)

**Time Savings**: 4-6 hours per week

### Month 7-12: Expanded VA Support (if £5,000+ MRR)

**Investment**: £800-1,200 per month

**Additional Delegated Responsibilities**:

- Template-based vendor outreach
- Initial Request Board response drafts (founder reviews and sends)
- LinkedIn content scheduling
- Weekly metrics compilation

**Time Savings**: 8-12 hours per week

### Role Evolution Timeline

- Month 1-4: Executor (direct execution of all tasks)
- Month 5-8: Manager (delegation of routine operations)
- Month 9-12: Strategist (focus on high-value decisions)

---

## XIV. CONTINGENCY PROTOCOLS

### Full-Time Job Intensification

**Response Options**:

1. Reduce side project to 20-25 hours per week; accept 3-month timeline extension
2. Accelerate VA hiring (at £2,000 MRR threshold instead of £3,000)
3. Pause new vertical expansion; consolidate existing operations
4. Extend overall timeline to 30 months (remains viable for exit strategy)

### MRR Growth Stagnation

**Diagnostic Actions**:

1. Conduct deep analysis of vendor churn (exit interviews, feedback analysis)
2. Increase content production cadence (additional SEO articles)
3. Optimize Request Board to vendor lead conversion process
4. Reassess pricing structure (market comparison, value analysis)
5. Evaluate product-market fit; consider targeted adjustments

### Founder Burnout Risk

**Immediate Response**:

1. Complete 1-week break from all project activities
2. Reduce operational scope by 30% upon return
3. Implement VA hiring immediately regardless of MRR level
4. Reduce operational tracks from 3 to 2 (pause lowest-priority track)
5. Recalibrate mental model: Yellow zone is success, not failure

---

## XV. OPERATIONAL PRINCIPLES

### Weekly Reminders

1. **Yellow Zone Represents Success**
    - £6,000 MRR validates business model
    - 2 solid verticals superior to 4 underdeveloped markets
    - 24 high-quality articles superior to 35 mediocre pieces
2. **Shipping Beats Perfection**
    - 60% complete and operational exceeds 100% perfect and delayed
    - Launch and iterate based on market feedback
    - Avoid analysis paralysis
3. **Initial Vendor Acquisition Is Hardest**
    - First 10 paying vendors require 3-5 hours each
    - Conversion accelerates with social proof and case studies
    - Do not become discouraged during Month 3-5 acquisition phase
4. **Context Switching Is Productivity Enemy**
    - Maintain focus on 3 core tracks, not 13 simultaneous projects
    - Deep work on single task exceeds shallow work on multiple tasks
    - Protect focused work blocks
5. **Marathon Mindset Required**
    - 28 hours per week sustained exceeds 45 hours per week leading to burnout
    - Year 2 exists for capability expansion
    - Timeline delay superior to complete burnout
6. **Data-Driven Decisions**
    - Monthly quantitative metrics review
    - Phase gate decisions based on numbers, not intuition
    - Strategy adjustments based on market reality, not original plan

---

## XVI. EXECUTION DIRECTIVE

**Primary Reference**: This document serves as daily operational guide

**Secondary Reference**: Master Plan 2.0 serves as comprehensive strategic universe

**Review Cadence**:

- This document: Weekly review
- Master Plan 2.0: Monthly review

**Critical Instruction**: Commence execution Monday. Cease planning activities. Implement adjustments based on market data, not additional planning cycles.

**Success Definition Reminder**: Yellow zone represents validated business and successful execution. Do not allow pursuit of perfection to undermine good outcomes.

---

**Document Version**: 1.4 – Strategic Research Integration & AI-Native Positioning

**Last Updated**: December 13, 2025

**Next Scheduled Review**: Month 3 Completion

**Status**: Approved for Execution

---

## CHANGELOG

### Version 1.4 – Strategic Research Integration & AI-Native Positioning (December 13, 2025)

**Research Context**: Three comprehensive research tasks completed December 2025:
- Research Task 1: 120 AI-native HR tools identified (vs initial 87 mixed traditional/AI)
- Research Task 2: 55-tool portfolio analyzed with visibility/sales maturity scoring
- Research Task 3: Competitive landscape analysis confirming massive white space

**Major Updates**:

1. **AI-Native Only Positioning** (Section 0 - What We're Building)
   - Established clear criteria: Founded 2020+, AI/ML as core capability
   - Excluded traditional SaaS with "AI features added"
   - Updated market validation: 120 qualifying tools vs 87 mixed

2. **Competitive Landscape Analysis** (New section after Competitive Moat)
   - Added comprehensive competitive analysis covering 5 competitor categories
   - Documented gaps in G2/Capterra, FutureTools/Futurepedia, HR Tech Analysts, Niche Communities
   - Established five core differentiators (AI-native only, Request Board, curated 60-75 tools, compliance/integration depth, workflow-specific)
   - Research validation: No direct competitor owns "AI-native only B2B tools for People Ops"

3. **Tier-Based Financial Modeling** (Section I - SUCCESS CRITERIA)
   - Tier 1 (YC Recent Grads, Well-Funded Seed): 70-85% conversion probability
   - Tier 2 (Niche Specialists, UK/EU Geographic): 50-70% conversion
   - Tier 3 (Early-Stage, Low Visibility): 20-40% conversion
   - Tier 4 (MVP Stage, Pre-PMF): 0-15% conversion (deprioritize)
   - Updated vendor acquisition strategy: 80% effort on Tier 1, 15% on Tier 2, 5% on Tier 3

4. **Month-by-Month Milestone Updates** (Section VII)
   - Month 3: Added tier-specific vendor targets (4-5 Tier 1, 2-3 Tier 2)
   - Month 6: Added tier distribution (8-10 Tier 1, 5-7 Tier 2, 2-3 Tier 3)
   - Month 9: Added tier validation metrics (10-12 Tier 1, 8-12 Tier 2, 5-8 Tier 3, <5 Tier 4)
   - All milestones now include tier-based conversion rate validation

5. **Curated Tool Count Strategy**
   - Established 60-75 tools per vertical as target (quality over quantity)
   - Research basis: 55-tool portfolio analysis revealed optimal curation range
   - Rejection of comprehensive directory approach (200+ tools)

**Strategic Decisions Incorporated**:
- DEC-014: AI-Native Only Positioning
- DEC-015: Curated 60-75 Tools Strategy
- DEC-016: Tier-Based Financial Modeling
- DEC-017: Five Competitive Advantages Framework
- DEC-018: Tier-Based Vendor Outreach Sequencing
- DEC-019: Request Board as Primary Differentiator

**Document Changes**:
- Version: 1.3 → 1.4
- Last Updated: November 2025 → December 13, 2025
- Next Review: Month 1 Completion → Month 3 Completion

### Version 1.3 – Next.js Architecture Update (November 2025)
- Migrated from standalone Architecture Doc to integrated technical specification
- Added comprehensive Next.js 14 App Router details
- Documented Airtable Schema v2.3 (12 tables, ~250 fields)
- Added AI Assistant Strategy section
- Foundation milestone achievement documented

---

## Milestone: Foundation Complete ✅

**Date:** 2025-11-23
**Status:** Production Ready

### Completed Deliverables

- ✅ Full website with 9 pages
- ✅ Airtable integration (4 tables)
- ✅ Request Board with email notifications
- ✅ Responsive design (mobile + desktop)
- ✅ Production deployment on Vercel

### Key Metrics

- Code: ~8,000 lines
- Components: 30+
- API Routes: 1
- Environment variables: 5

### Current Capabilities

- Users can browse 10+ HR AI tools
- Users can read 3+ articles
- Users can submit requests (→ Airtable → Email)
- All data managed via Airtable
- Automatic email notifications via Resend

### Technical Debt

- Minimal (TypeScript strict mode, proper error handling)
- Mock data as fallback for resilience

### Next Phase

Ready to begin Growth Phase (content creation, SEO, analytics)

### Next Phase

**Growth Phase (Month 1-3)** begins Week of 2025-11-26:

- Priority 1: Content production (Target: 3-4 articles by end Month 1)
- Priority 2: Vendor outreach (Target: First 5 vendor conversations by Week 4)
- Priority 3: Request Board activation (Announce availability, target 3-5 submissions Month 1)

**Current Focus**: Data architecture design (Topic 1.1) to support Growth Phase execution.