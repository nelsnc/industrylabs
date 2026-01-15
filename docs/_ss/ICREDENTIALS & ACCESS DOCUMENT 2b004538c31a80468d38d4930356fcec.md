# ICREDENTIALS & ACCESS DOCUMENT

**Last Updated**: November 19, 2025

**IMPORTANT**: Keep this document secure and private. Do not share publicly.

**DO NOT** store passwords or API secrets here – use a password manager.

---

## AI Tools Access & Safety

We actively use multiple AI assistants (Claude Code, GPT-5/ChatGPT, Gemini, etc.) for development.

**Critical Security Rules:**

**Never Do This:**

- ❌ Paste raw API keys, access tokens, or full `.env.local` into any AI chat
- ❌ Share Airtable API keys or base IDs in prompts
- ❌ Include ConvertKit or Analytics credentials in code examples
- ❌ Hard-code any secrets in generated code

**Always Do This:**

- ✅ Redact secrets (`AIRTABLE_API_KEY=xxxxx`) before sharing config/logs
- ✅ Use environment variables for all credentials
- ✅ Keep `.env.local` in `.gitignore`
- ✅ Review AI-generated code for hardcoded secrets before accepting

**Assistant Roles & Access:**

- **Claude Code (VS Code):** Apply code edits inside the repo (no secret access needed)
- **GPT-5 (ChatGPT):** Architecture, specs, critical reviews (no secret access needed)
- **Other models:** Cross-checks as needed (no secret access needed)

**If an AI Assistant Is Given This Document:**

- Assume secrets are stored safely outside the codebase
- Never generate code that hardcodes credentials
- Never bypass security practices
- Suggest environment variables for any configuration

---

## DOMAIN & HOSTING

### Domain Registration

- **Domain**: industrylabs.ai
- **Registrar**: Namecheap
- **Registered**: [Date registered]
- **Renewal Date**: [Check registrar]
- **Account Email**: nelsnchn@gmail.com
- **Login URL**: [https://www.namecheap.com](https://www.namecheap.com/) (or your registrar login page)

### DNS Management

- **Managed by**: Namecheap DNS / Cloudflare / [Your DNS provider]
- **Login URL**: [DNS management login]
- **Notes**:
    - A/CNAME records should point to **Vercel** (for Next.js app)
    - TXT records used for email + ConvertKit + Google verification

---

## NEXT.JS FRONTEND & VERCEL (APP / WEBSITE)

### Next.js App

- **Framework**: Next.js 14 + React + Tailwind
- **Frontend Repo**: [GitHub repository URL]
- **Repo Owner**: [Your GitHub username]
- **Main Branch**: `main` (or `prod` if you use a separate prod branch)

### Vercel (Hosting & Deployment)

- **Provider**: Vercel
- **Account Email**: nelsnchn@gmail.com (or GitHub-linked)
- **Login URL**: [https://vercel.com/login](https://vercel.com/login)
- **Project Name**: `industrylabs` (or your actual Vercel project name)
- **Environment**:
    - **Production URL**: https://industrylabs.vercel.app (or your actual Vercel URL)
    - **Custom Domain**: [https://industrylabs.ai](https://industrylabs.ai/)
    - **Preview URLs**: Auto-generated per PR / branch

### Environment Variables (Example – DO NOT put actual values here)

Configured in **Vercel → Project → Settings → Environment Variables**:

- `AIRTABLE_API_KEY` – Airtable API key
- `AIRTABLE_BASE_ID` – IndustryLabs Airtable base ID
- `GA_MEASUREMENT_ID` – Google Analytics ID (e.g. `G-NHTPCQ2PHZ`)
- `CONVERTKIT_API_SECRET` – ConvertKit API secret (if used server-side)
- `CONVERTKIT_API_KEY` – Public key (if needed)

> Reminder: Only store actual secrets in Vercel env vars + password manager.
> 
> 
> This document should only list **names**, not values.
> 

### Deployment Flow

- **Trigger**: Push/merge to `main` → Vercel auto-deploys to Production
- **Preview**: Feature branches → Vercel Preview Deployments
- **Canonical Content Source**: Airtable **ARTICLES** table
- **Frontend Routing**:
    - `/` – Home
    - `/articles/[slug]` – Article pages (content pulled from Airtable ARTICLES)
    - `/request-board` – Request Board (form + matching logic)
    - `/tools/[slug]` – Tool pages (from Airtable TOOLS)

---

## AIRTABLE (PRIMARY DATA BACKEND)

### Account Details

- **Account Email**: nelsnc@gmail.com
- **Base Name**: IndustryLabs
- **Login URL**: [https://airtable.com/login](https://airtable.com/login)
- **Plan**: Free (sufficient for MVP; Plus/Pro later if needed)

### Base URL

- **Direct Link**: [Your Airtable base URL – copy from address bar]
- **Access**: Owner

### Tables (9 total)

1. **TOOLS** – 32 fields, 3 records
2. **VENDORS** – 22 fields, 3 records
3. **CATEGORIES** – 12 fields, 8 records
4. **REQUESTS** – 24 fields, 2 records
5. **COMPLIANCE_TAGS** – 8 fields, 5 records
6. **INTEGRATIONS** – 4 fields, 8 records
7. **USE_CASES** – 7 fields, 3 records
8. **ARTICLES** – 18 fields, 2 records
9. **NOTIFY_LIST** – 5 fields, 2 records

### Airtable as Canonical Content Store

- **Articles**:
    - Source of truth for article content, metadata, and SEO fields
    - Fields: `title`, `slug`, `article_type`, `primary_keyword`, `meta_description`, `content` (Markdown), `status`, `is_published`, `publish_date`
- **Vendors & Tools**:
    - Used by Next.js site for listing, detail pages, and Request Board matching
- **Requests**:
    - Used for Request Board submissions and matching workflow

### API Access (For Next.js & Future Integrations)

- **API Key / Personal Access Token**:
    - Get from **Airtable → Account → Developer Hub / Tokens**
    - Store in Vercel as `AIRTABLE_API_KEY`
- **API Documentation**: [https://airtable.com/api](https://airtable.com/api)
- **Base ID**:
    - Found in Airtable API docs → IndustryLabs base
    - Store in Vercel as `AIRTABLE_BASE_ID`

---

## CONVERTKIT (EMAIL AUTOMATION)

### Account Details

- **Account Email**: contact@industrylabs.ai
- **Login URL**: [https://app.convertkit.com/login](https://app.convertkit.com/login)
- **Plan**: Free (up to 1,000 subscribers)
- **Upgrade Target**: Creator ($29/mo) when >1,000 subscribers

### Sender Settings

- **Sender Email**: contact@industrylabs.ai
- **Sender Name**: IndustryLabs
- **Reply-To Email**: contact@industrylabs.ai
- **Status**: Verified ✓

### Landing Pages

- **Tool Notification Signup**: [https://industrylabs.kit.com/879f0237f1](https://industrylabs.kit.com/879f0237f1)
    - Clean URL (optional): industrylabs.kit.com/new-tools
    - Purpose: Email list for new tools / updates
    - Fields: Email only

### Email Templates

1. **Request Board – Buyer Confirmation** (Draft)
    - Subject: “We’ve received your AI tool request”
    - Status: Draft
2. **Request Board – Vendor Lead Notification** (Draft)
    - Subject: “New qualified lead for [Tool Name]”
    - Status: Draft

### Tags

- `hr-talent` – HR & Talent tools
- `learning-development` – L&D tools
- `customer-support` – CS tools
- `request-board-user` – Request Board submitters
- `premium-vendor` – Vendor contacts on Premium

### API Access (Optional, for Next.js/Zapier)

- **API Secret**: Get from *Settings → Advanced / Developer*
    - Store in Vercel as `CONVERTKIT_API_SECRET`
- **API Documentation**: [https://developers.convertkit.com/](https://developers.convertkit.com/)

### Settings Configured

- [x]  Sender email verified
- [x]  Mailing address: [Fill from account]
- [x]  GDPR: Show to EU/UK/Switzerland only
- [x]  Timezone: GMT / London
- [x]  Unsubscribe survey: Enabled

---

## GOOGLE ANALYTICS

### Account Details

- **Account Email**: nelsnchn@gmail.com
- **Property Name**: IndustryLabs
- **Measurement ID**: `G-NHTPCQ2PHZ`
- **Login URL**: [https://analytics.google.com](https://analytics.google.com/)

### Next.js Integration

- **Env Var**: `GA_MEASUREMENT_ID` in Vercel
- **Usage**:
    - Client-side script or Next.js GA integration
    - Track page views for `/articles/[slug]`, `/tools/[slug]`, `/request-board`, etc.

---

## EMAIL ACCOUNTS

### Business Email

- **Email**: contact@industrylabs.ai
- **Provider**: [e.g., Google Workspace / Namecheap email / other]
- **Forwarding**: contact@industrylabs.ai → nelsnc@gmail.com
- **Used For**:
    - ConvertKit sender
    - Vendor communications
    - General business inquiries

### Personal Email (Primary)

- **Email**: nelsnchn@gmail.com
- **Used For**:
    - Vercel, domain registrar, Google Analytics, future Stripe
    - Backup contact for platform logins

### Secondary Email

- **Email**: nelsnc@gmail.com
- **Used For**:
    - Airtable
    - Legacy accounts (if any)

---

## FUTURE / OPTIONAL INTEGRATIONS

### Zapier (Later)

- **Account Email**: [To be set up]
- **Login URL**: [https://zapier.com/login](https://zapier.com/login)
- **Plan**: Free (100 tasks/month) → upgrade if volume grows
- **Use Cases**:
    - REQUESTS → ConvertKit tagging
    - REQUESTS → Vendor notification email queues
    - REQUESTS → Slack / email alerts for you

### Google Search Console

- **Account Email**: nelsnchn@gmail.com
- **Purpose**: SEO monitoring, indexing status
- **Verification**: via DNS TXT or GA / HTML file

### Google Tag Manager (Optional)

- **Account Email**: [To be set up]
- **Purpose**: Add advanced tracking without redeploying Next.js

---

## SOCIAL MEDIA

### LinkedIn

- **Company Page**: [To be created – “IndustryLabs”]
- **Personal Profile**: [Your LinkedIn URL]
- **Use**: Main marketing and distribution channel for articles & Request Board

### Twitter/X (Optional)

- **Handle**: [To be created, e.g., @industrylabs_ai]
- **Use**: AI / HRTech / B2B community engagement

---

## PAYMENT PROCESSING (FUTURE – MONTH 3–6)

### Stripe

- **Account Email**: [To be set up – likely nelsnchn@gmail.com]
- **Login URL**: [https://dashboard.stripe.com](https://dashboard.stripe.com/)
- **Use**: Premium vendor subscriptions (£99/mo per vertical)
- **Integration**:
    - Next.js → Stripe Checkout / Billing
    - Sync subscription status back to Airtable `VENDORS` table

---

## IMPORTANT URLS – QUICK REFERENCE

### Public

- **Main Website**: [https://industrylabs.ai](https://industrylabs.ai/)
- **Vercel Default URL**: https://industrylabs.vercel.app (or your actual project URL)
- **Email Signup / Landing Page**: [https://industrylabs.kit.com/879f0237f1](https://industrylabs.kit.com/879f0237f1)

### Admin / Backend

- **Vercel Project**: [https://vercel.com/dashboard](https://vercel.com/dashboard) (select `industrylabs`)
- **GitHub Repo**: [GitHub URL for Next.js project]
- **Airtable Base**: [IndustryLabs Airtable base URL]
- **ConvertKit Dashboard**: [https://app.convertkit.com](https://app.convertkit.com/)
- **Google Analytics**: [https://analytics.google.com](https://analytics.google.com/)
- **Domain Registrar (Namecheap)**: [https://www.namecheap.com](https://www.namecheap.com/)

---

## BACKUP & SECURITY

### Passwords

- **Password Manager**: Recommended – 1Password / Bitwarden / LastPass
- **Store**:
    - Domain registrar
    - Vercel
    - GitHub
    - Airtable
    - ConvertKit
    - Google (Analytics, future GSC, Workspace)
- **Do NOT** store passwords or API keys in this document.

### 2FA (Enable on All Critical Accounts)

- [ ]  Namecheap (domain registrar) – **critical**
- [ ]  Vercel
- [ ]  GitHub
- [ ]  Airtable
- [ ]  ConvertKit
- [ ]  Google (Analytics / Workspace / GSC)
- [ ]  Stripe (when created)

### Backups

- **Airtable**:
    - Airtable internal backups
    - Monthly CSV export for TOOLS, VENDORS, ARTICLES, REQUESTS
- **Code (Next.js)**:
    - GitHub is primary source of truth
    - Optionally mirror to private backup repo
- **This Document**:
    - Store in:
        - Google Drive (private folder)
        - Password manager secure notes
        - Local encrypted storage (optional)

---

## COSTS SUMMARY (MONTHLY)

### Current (MVP – Month 0–1)

- Domain (Namecheap): ~**$15/year** ≈ **$1.25/mo**
- Vercel: **Free** (Hobby tier, low usage)
- Airtable: **Free**
- ConvertKit: **Free** (≤1,000 subscribers)
- Email: Free (forwarding) or included with domain/Workspace
- **Estimated Total**: **~$1–5/month**

### After Launch (Month 1–3)

- Domain: **$1.25/mo**
- Vercel: Still **Free** (unless high usage)
- Airtable: Free or **Plus ($10/mo)** if needed
- ConvertKit: Free (until >1,000 subs)
- Email: Up to **$6/mo** (Google Workspace)
- **Estimated Total**: **~$7–17/month**

### At Scale (Month 6–12)

- Domain: **$1.25/mo**
- Vercel: Possibly **Pro** (if needed) – e.g. **$20/mo**
- Airtable Plus: **$10/seat/mo**
- ConvertKit Creator: **$29/mo** (1,000+ subscribers)
- Email (Google Workspace): **$6/mo**
- Zapier Starter (if used): **$29/mo**
- Stripe: Platform fees only (no fixed monthly fee)
- **Estimated Total**: **~$95/mo** (excluding Stripe transaction fees)

---

## HANDOFF INFORMATION (VA / TEAM)

### Virtual Assistant

- **Needs**:
    - Airtable: Editor access to specific tables (ARTICLES, REQUESTS, TOOLS, VENDORS as needed)
    - No access to Vercel, GitHub, Stripe, or domain registrar
- **Typical Tasks**:
    - Data entry in Airtable
    - Content updates in ARTICLES table
    - Data quality checks

### Future Developer

- **Needs**:
    - GitHub: Collaborator access to Next.js repo
    - Vercel: Project access (to view logs, deployments, environment vars – no secrets in repo)
    - Airtable: Creator/editor access for schema changes
- **Optional**:
    - Stripe & ConvertKit access for deep integrations

### Content Writer

- **Needs**:
    - Airtable: Editor access to **ARTICLES** only
- **No Need For**:
    - Vercel, GitHub, Stripe, DNS, ConvertKit (unless doing email content)

---

## RECOVERY INFORMATION

### If Locked Out

1. **Vercel** – Password reset via account email (Google login)
2. **GitHub** – Password reset via email, 2FA backup codes
3. **Airtable** – Password reset via nelsnc@gmail.com
4. **ConvertKit** – Password reset via contact@industrylabs.ai or backup email
5. **Domain (Namecheap)** – Use domain verification + support if needed
6. **Google Accounts** – Use recovery email / phone for Analytics, GSC, Workspace

### Support Contacts

- **Vercel Support**: [https://vercel.com/support](https://vercel.com/support)
- **GitHub Support**: [https://support.github.com](https://support.github.com/)
- **Airtable Support**: support@airtable.com
- **ConvertKit Support**: help@convertkit.com
- **Namecheap Support**: [https://www.namecheap.com/support/](https://www.namecheap.com/support/)

---

## NOTES & REMINDERS

### To-Do

- [ ]  Verify Vercel custom domain `industrylabs.ai` is working (no SSL issues)
- [ ]  Wire Google Analytics into Next.js using `G-NHTPCQ2PHZ`
- [ ]  Set up Google Search Console once site is live
- [ ]  Create LinkedIn company page
- [ ]  Set up Stripe when first Premium vendor is ready to pay
- [ ]  Enable 2FA on **all** critical services

### Important Dates

- **Project Start**: November 16, 2025
- **MVP Target**: February 2026 (12 weeks from mid-Nov)
- **First Article Published**: [Fill date when live]
- **First Premium Vendor**: Target December 2025

---

## CHANGELOG

**November 18, 2025**

- Initial credentials document created
- Added Softr, Airtable, ConvertKit, and table list
- Documented ConvertKit landing page URL

**November 19, 2025**

- **Removed Softr stack** and replaced with **Next.js + Vercel** details
- Clarified Airtable ARTICLES as canonical content source
- Added Vercel project + env vars structure
- Updated cost summary to remove Softr plans
- Updated recovery and handoff sections for Vercel/GitHub setup

---

## SECURITY REMINDERS

- ⚠️ Never share this document publicly
- ⚠️ Never paste passwords or API secrets here – use a password manager
- ⚠️ Enable 2FA on registrar, Vercel, GitHub, Airtable, Google, Stripe
- ⚠️ Review access quarterly; remove anyone not needed
- ⚠️ Update this document whenever you add/remove tools or change architecture

---

**END OF CREDENTIALS & ACCESS DOCUMENT**