# IndustryLabs MVP - Codebase Snapshot

> 📅 Generated: 2025-11-23
> 🎯 Purpose: Complete reference for project structure, tech stack, and key functionality

---

## 📁 Project Structure Tree

```
industrylabs/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx                # Root layout with Header/Footer
│   ├── page.tsx                  # Homepage (/)
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── hr-talent/
│   │   └── page.tsx              # HR & Talent category page
│   ├── request/
│   │   └── page.tsx              # Request Board form page
│   ├── articles/
│   │   ├── page.tsx              # Articles listing page
│   │   └── [slug]/
│   │       └── page.tsx          # Individual article page
│   ├── tools/
│   │   └── [slug]/
│   │       └── page.tsx          # Individual tool page
│   └── api/
│       └── request/
│           └── route.ts          # POST /api/request endpoint
│
├── components/                   # React components
│   ├── layout/
│   │   ├── header.tsx            # Global header with navigation
│   │   ├── footer.tsx            # Global footer
│   │   └── container.tsx         # Max-width wrapper component
│   ├── home/
│   │   ├── home-hero.tsx         # Hero section
│   │   ├── home-featured-tools.tsx  # Featured tools section
│   │   ├── home-value-props.tsx  # Value propositions
│   │   ├── home-categories.tsx   # Category preview cards
│   │   ├── home-request-cta.tsx  # CTA to Request Board
│   │   └── newsletter-form.tsx   # Newsletter signup (placeholder)
│   ├── categories/
│   │   └── category-card.tsx     # Category preview card
│   ├── tools/
│   │   └── tool-card.tsx         # Tool display card
│   ├── hr/
│   │   ├── hr-tools-grid.tsx     # HR tools grid display
│   │   └── hr-filters-sidebar.tsx # Filters sidebar (WIP)
│   ├── navigation/
│   │   └── breadcrumbs.tsx       # Breadcrumb navigation
│   ├── request/
│   │   ├── request-form-new.tsx  # Main request form (active)
│   │   └── request-form.tsx      # Legacy form (deprecated)
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
│       └── BADGE_USAGE.md        # Badge usage guidelines
│
├── lib/                          # Utilities and helpers
│   ├── airtable.ts               # Airtable SDK wrapper & fetch helpers
│   ├── airtable-helpers.ts       # Tool/Article data fetching & mapping
│   ├── email.ts                  # Resend email notifications
│   ├── mock-data.ts              # Mock data for development
│   ├── utils.ts                  # Utility functions (cn, etc.)
│   ├── types/
│   │   └── request.ts            # Request form types
│   └── validation/
│       └── request.ts            # Zod validation schemas
│
├── scripts/                      # Development scripts
│   ├── test-airtable.ts          # Airtable connection test
│   ├── test-airtable-connection.ts
│   └── debug-airtable-connection.ts
│
├── docs/
│   ├── CODEBASE_SNAPSHOT.md      # This file
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
├── package.json
└── README.md
```

---

## 🗂️ Key Directories Overview

### **app/** - Next.js 14 App Router Pages
Application routes using Next.js App Router with Server Components. Each folder represents a route, with `page.tsx` as the entry point. API routes are in `app/api/`. All pages use Server Components for data fetching from Airtable, with fallback to mock data for development.

### **components/** - React Components
Organized by feature and purpose. `layout/` contains global components (Header, Footer, Container). Feature-specific components are grouped (`home/`, `tools/`, `hr/`, `request/`). `ui/` contains shadcn/ui primitives built on Radix UI.

### **lib/** - Business Logic & Utilities
Contains all non-UI logic. `airtable.ts` provides low-level API wrappers, while `airtable-helpers.ts` contains domain-specific data fetching functions. `email.ts` handles Resend integration. `validation/` contains Zod schemas for runtime type checking.

### **scripts/** - Development Tools
Helper scripts for testing and debugging. `test-airtable.ts` validates Airtable connection and schema. Useful for troubleshooting API integration issues.

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
- **Lucide React 0.554.0** - Icon library
- **class-variance-authority 0.7.1** - Component variant API
- **clsx 2.1.1** - Conditional classnames
- **tailwind-merge 3.4.0** - Merge Tailwind classes
- **tailwindcss-animate 1.0.7** - Animation utilities

### **Data & API**
- **Airtable** - Database (using official REST API)
- **Zod 4.1.12** - Schema validation
- **Resend 6.5.2** - Transactional email service

### **Development Tools**
- **ESLint 9** - Code linting
- **dotenv 17.2.3** - Environment variables

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

# Optional: Enable Airtable debugging
DEBUG_AIRTABLE=true                                 # Logs all Airtable requests
```

**Setup Guide:** See [ENV_SETUP.md](../ENV_SETUP.md) for detailed configuration instructions.

---

## 🎯 Key Features & Modules

### **1. Tool Directory System**
📂 **Files:** `app/tools/[slug]/page.tsx`, `lib/airtable-helpers.ts` (getToolBySlug)

**Functionality:**
- Dynamic tool detail pages with SEO-friendly URLs
- Server-side data fetching from Airtable TOOLS table
- Displays tool metadata: pricing, features, integrations, compliance tags
- Related articles section
- Fallback to mock data during development

**Data Flow:**
```
User visits /tools/greenhouse
  ↓
Server Component fetches data via getToolBySlug()
  ↓
Maps Airtable fields (snake_case) to frontend format (camelCase)
  ↓
Renders tool details with related articles
```

**Key Features:**
- Logo/image support
- G2 rating display
- Pricing information
- Feature lists
- Related articles via linked records

---

### **2. Request Board (TASK-301-305)**
📂 **Files:**
- Frontend: `components/request/request-form-new.tsx`
- API: `app/api/request/route.ts`
- Validation: `lib/validation/request.ts`
- Email: `lib/email.ts`
- Types: `lib/types/request.ts`

**Functionality:**
- Multi-step form for buyer requests
- Client & server-side validation with Zod
- Airtable record creation
- Email notifications to admin
- Automatic source channel detection (SEO/LinkedIn/Direct/Referral)

**Form Fields:**
- Requester info: name, email, company, size, location
- Request details: vertical, use case, timeline, budget
- Requirements: current tools, detailed needs, compliance
- GDPR consent checkbox

**Validation Rules:**
- Name: 1-100 characters
- Email: valid email format
- Use case: 10-500 characters
- Requirements: 20-2000 characters
- GDPR consent: must be true (literal)

**Data Flow:**
```
User fills form
  ↓
Client-side Zod validation
  ↓
POST /api/request
  ↓
Server-side Zod validation
  ↓
Map to Airtable fields (camelCase → snake_case)
  ↓
Create record in REQUESTS table
  ↓
Send email notification (non-blocking)
  ↓
Return success with request ID
```

**Special Features:**
- **Auto Source Detection:** Detects traffic source from URL params or referrer
- **Combined Fields:** useCase + requirements merged into single field with separator
- **Non-blocking Email:** Request succeeds even if email fails
- **Field-level Errors:** Returns specific errors for each field

**Airtable Schema Mapping:**
```typescript
Frontend (camelCase)     →  Airtable (snake_case)
---------------------------------------------------
requesterName            →  requester_name
requesterEmail           →  requester_email
requesterCompany         →  requester_company
companySize              →  company_size
vertical                 →  vertical
timeline                 →  timeline
useCase + requirements   →  requirements (combined)
gdprConsent              →  gdpr_consent
sourceChannel            →  source_channel
```

---

### **3. Articles System**
📂 **Files:**
- Listing: `app/articles/page.tsx`
- Detail: `app/articles/[slug]/page.tsx`
- Data: `lib/airtable-helpers.ts` (getAllArticles, getArticleBySlug)

**Functionality:**
- Content marketing article system
- Dynamic article pages with SEO URLs
- Related tools display
- Author and publish date metadata

**Article Types:**
- Best-of lists
- Playbooks (comparisons)
- Thought leadership

**Data Flow:**
```
User visits /articles/greenhouse-vs-lever
  ↓
Server fetches article via getArticleBySlug()
  ↓
Fetches related tools via getRelatedToolsForArticle()
  ↓
Renders article content with tool recommendations
```

**Features:**
- Featured images
- Read time calculation (based on word count)
- Category/vertical filtering
- Related tools integration
- SEO metadata (title, description, keywords)

---

### **4. Homepage**
📂 **Files:**
- `app/page.tsx`
- `components/home/*`

**Functionality:**
- Hero section with value proposition
- Featured tools carousel/grid
- Category preview cards
- Value propositions section
- CTA to Request Board

**Data Fetching:**
- Fetches featured tools from Airtable (getTools)
- Server Component with async data loading
- Fallback to mock data

**Sections:**
1. **Hero** - Main headline and CTA
2. **Featured Tools** - Curated tool highlights
3. **Value Props** - Why use IndustryLabs
4. **Categories** - Preview of HR, L&D, Support verticals
5. **Request CTA** - Drive users to Request Board

---

### **5. Category Pages (HR & Talent)**
📂 **Files:**
- `app/hr-talent/page.tsx`
- `components/hr/hr-tools-grid.tsx`
- `components/hr/hr-filters-sidebar.tsx` (WIP)

**Functionality:**
- Vertical-specific tool listings
- Grid display of tools in category
- Filters sidebar (work in progress)

**Data Flow:**
```
User visits /hr-talent
  ↓
Server fetches tools via getToolsByVertical("HR & Talent")
  ↓
Filters to Live status tools
  ↓
Renders grid of tool cards
```

**Features:**
- Tool cards with logo, pricing, rating
- Company size fit indicators
- Tags/features display
- Link to tool detail pages

---

## 📊 Data Flow Diagrams

### **Request Submission Flow**
```
┌─────────────────┐
│  User Browser   │
└────────┬────────┘
         │ Fills form
         ▼
┌─────────────────────────┐
│ request-form-new.tsx    │
│ Client Validation (Zod) │
└────────┬────────────────┘
         │ POST /api/request
         ▼
┌─────────────────────────┐
│ app/api/request/route.ts│
│ Server Validation (Zod) │
└────────┬────────────────┘
         │
         ├──────────────────────────┐
         │                          │
         ▼                          ▼
┌──────────────────┐    ┌───────────────────┐
│ Airtable API     │    │ Resend Email API  │
│ Create Record    │    │ Send Notification │
│ (REQUESTS table) │    │ (non-blocking)    │
└──────────────────┘    └───────────────────┘
         │                          │
         └──────────┬───────────────┘
                    ▼
         ┌─────────────────────┐
         │ Return JSON         │
         │ { success, id, ... }│
         └──────────┬──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │ User sees success   │
         │ or error message    │
         └─────────────────────┘
```

### **Tool Page Data Flow**
```
┌─────────────────┐
│ User Browser    │
│ /tools/[slug]   │
└────────┬────────┘
         │
         ▼
┌────────────────────────┐
│ Server Component       │
│ app/tools/[slug]/page  │
└────────┬───────────────┘
         │
         ├────────────────────────┐
         │                        │
         ▼                        ▼
┌──────────────────┐    ┌──────────────────┐
│ getToolBySlug()  │    │ getAllArticles() │
│ Airtable TOOLS   │    │ Filter related   │
└────────┬─────────┘    └────────┬─────────┘
         │                        │
         │  Map snake_case        │
         │  to camelCase          │
         │                        │
         └────────┬───────────────┘
                  ▼
         ┌─────────────────┐
         │ Render Tool Page│
         │ + Related Posts │
         └─────────────────┘
```

### **Airtable Data Mapping**
```
┌──────────────────────┐
│ Airtable TOOLS       │
│ (snake_case fields)  │
│ - tool_name          │
│ - tool_slug          │
│ - short_description  │
│ - pricing_model      │
│ - g2_rating          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ mapToolRecord()      │
│ Field transformation │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Frontend Tool Type   │
│ (camelCase fields)   │
│ - name               │
│ - slug               │
│ - shortDescription   │
│ - pricingModel       │
│ - g2Rating           │
└──────────────────────┘
```

---

## 🗄️ Airtable Schema Overview

### **TOOLS Table**
**Purpose:** AI tool directory entries

**Key Fields:**
- `tool_name`, `tool_slug` - Identification
- `vendor_id` - Linked to VENDORS table
- `status` - "Draft", "Live", "Archived"
- `verticals`, `primary_vertical` - Categories
- `short_description`, `long_description` - Content
- `pricing_model`, `starting_price` - Pricing
- `g2_rating`, `review_count` - Social proof
- `website_url` - External link
- `INTEGRATIONS`, `COMPLIANCE_TAGS` - Linked records
- `ARTICLES` - Related content

### **ARTICLES Table**
**Purpose:** Content marketing articles

**Key Fields:**
- `title`, `slug` - Identification
- `article_type` - "Best-of", "Playbook", etc.
- `vertical` - Category
- `content` - Article body (newline-separated paragraphs)
- `status` - "Draft", "Published", "Archived"
- `publish_date` - Publication date
- `author` - Author name
- `word_count` - For read time calculation
- `related_tools` - Linked to TOOLS table

### **REQUESTS Table**
**Purpose:** Buyer request submissions

**Key Fields:**
- `request_id` - Auto-increment ID
- `submission_date` - Auto timestamp
- `requester_name`, `requester_email`, `requester_company`
- `company_size`, `company_location`
- `vertical` - Category of interest
- `timeline` - "Immediate", "1-3 months", etc.
- `requirements` - Combined use case + requirements
- `budget_range`, `current_tools`
- `source_channel` - "Direct", "SEO", "LinkedIn", etc.
- `status` - "New", "Matched", "Closed"
- `gdpr_consent` - Boolean
- `matched_tools` - Linked to TOOLS (for admin matching)

---

## 🧪 Testing & Development

### **Development Server**
```bash
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### **Testing Airtable Connection**
```bash
npx tsx scripts/test-airtable.ts           # Test connection
DEBUG_AIRTABLE=true npm run dev            # Enable debug logs
```

### **Mock Data**
- Located in `lib/mock-data.ts`
- Used as fallback when Airtable fetch fails
- Contains sample tools and articles for development

---

## 🔒 Security & Best Practices

### **Environment Variables**
- Never commit `.env.local` to git
- Use Vercel environment variables for production
- Validate all env vars at runtime in `lib/airtable.ts`

### **Data Validation**
- All API inputs validated with Zod schemas
- Client-side AND server-side validation
- Type-safe throughout with TypeScript

### **API Security**
- Server Components for sensitive data fetching
- API routes validate request method (block GET on POST-only routes)
- No API keys exposed to client

### **Error Handling**
- Graceful degradation with mock data fallbacks
- User-friendly error messages
- Server logs for debugging (console.error)

---

## 📈 Future Enhancements (TODOs)

From codebase analysis:

1. **Request Source URL Tracking**
   - Add `request_source_url` field to Airtable REQUESTS table
   - Uncomment line in `app/api/request/route.ts:48`

2. **Compliance Needs Mapping**
   - Map compliance need names to Airtable record IDs
   - Currently skipped in request submission

3. **Filters Sidebar**
   - Complete implementation in `hr-filters-sidebar.tsx`
   - Add filter logic to tool pages

4. **Newsletter Integration**
   - Implement newsletter-form.tsx logic
   - Connect to email service

5. **Image Optimization**
   - Use Next.js Image component for tool logos
   - Add image CDN for Airtable attachments

---

## 📚 Additional Resources

- **Airtable API Docs:** https://airtable.com/developers/web/api/introduction
- **Next.js Docs:** https://nextjs.org/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Resend Docs:** https://resend.com/docs
- **Zod Docs:** https://zod.dev

---

## 📝 Notes

**Last Updated:** 2025-11-23
**Next.js Version:** 16.0.3 (Turbopack)
**Node Version:** 20.19.5
**Package Manager:** npm 10.8.2

**Recent Major Changes:**
- ✅ Request Board backend implementation (TASK-301-305)
- ✅ Improved email templates with separated sections
- ✅ Auto-detection of traffic source
- ✅ Enhanced requirements field formatting
- ✅ Alert UI component added
- ✅ Badge readability improvements

---

_This snapshot serves as a reference point for the current state of the codebase. Update as needed when major changes occur._
