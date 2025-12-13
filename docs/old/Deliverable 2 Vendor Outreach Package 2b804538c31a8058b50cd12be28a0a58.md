# Deliverable 2: Vendor Outreach Package

**Version**: 1.1 - Multi-Model Optimized
**Date**: 2025-11-27
**Status**: Ready to Use
**Purpose**: Complete package for collecting vendor data efficiently

---

## PACKAGE CONTENTS

1. **Google Form** (Ready to Deploy)
2. **Email Templates** (6 variants for different scenarios)
3. **Follow-up Sequence** (Days 3, 7, 14)
4. **Vendor FAQ** (Copy-paste responses)
5. **Internal Tracking Sheet** (Airtable view setup)

---

## PART 1: GOOGLE FORM STRUCTURE

### **Form Title**: "IndustryLabs Premium Listing - Quick Data Verification"

### **Form Description**:

`Thanks for partnering with IndustryLabs!

We've researched [Tool Name] using AI and public sources. This form takes 
10-15 minutes to verify accuracy and fill any gaps.

Your Premium listing goes live within 24 hours of submission.

Questions? Email nelson@industrylabs.ai`

---

### **SECTION 1: Confirmation (Pre-filled)**

**Section Header**: "Let's confirm the basics"

**Q1.1: Tool Name**

- Type: Short answer
- Pre-filled: [Tool Name from outreach]
- Required: Yes
- Helper text: "If this is incorrect, please correct it"

**Q1.2: Your Role**

- Type: Short answer
- Placeholder: "e.g., Product Marketing Manager"
- Required: Yes

**Q1.3: Contact Email**

- Type: Email
- Pre-filled: [From outreach]
- Required: Yes
- Helper text: "Where should we send Request Board lead notifications?"

---

### **SECTION 2: Company Size Fit** ⭐ CRITICAL

**Section Header**: "Who is [Tool] built for?"

**Q2.1: What company sizes (by employee count) is [Tool] best suited for?**

- Type: Multiple choice (checkboxes)
- Options:
    - [ ]  1-50 employees (Small businesses)
    - [ ]  51-200 employees (Growing mid-market)
    - [ ]  201-500 employees (Established mid-market)
    - [ ]  500+ employees (Enterprise)
- Required: Yes
- Helper text: "Check all that apply. Be honest - buyers appreciate clarity over 'fits everyone'"

**Q2.2: Is there a specific 'sweet spot' company size? (Optional)**

- Type: Short answer
- Placeholder: "e.g., 100-300 employees with dedicated HR team"
- Required: No
- Helper text: "Help us give more specific recommendations to buyers"

---

### **SECTION 3: Pricing** ⭐ CRITICAL

**Section Header**: "Pricing (Buyers' #1 question)"

**Q3.1a: Minimum typical annual price (for 50-500 employees)**

- Type: Short answer
- Placeholder: "6000"
- Required: Yes
- Helper text: "Approximate number only (no currency symbol or commas). We'll format it with £ symbol."

**Q3.1b: Maximum typical annual price**

- Type: Short answer
- Placeholder: "15000"
- Required: Yes
- Helper text: "Approximate number only. If your pricing varies significantly, you can explain in Q3.8 (Pricing Notes)."

**Q3.1c: If pricing is fully custom (optional)**

- Type: Checkbox
- Option: [ ] Our pricing is fully custom and cannot be estimated with a range
- Show only if checked: Long answer field for explanation

**Q3.2: Currency**

- Type: Multiple choice (radio)
- Options:
    - ( ) GBP (£)
    - ( ) USD ($)
    - ( ) EUR (€)
- Required: Yes

**Q3.3: Pricing Model**

- Type: Multiple choice (radio)
- Options:
    - ( ) Per User (per employee/recruiter)
    - ( ) Per Hire (per successful hire)
    - ( ) Flat Rate (fixed annual fee)
    - ( ) Custom (varies by usage/features)
- Required: Yes

**Q3.4: One-time Setup Fee**

- Type: Short answer
- Placeholder: "e.g., £1,500 or 'Included in annual fee'"
- Required: No

**Q3.5: Free Trial**

- Type: Multiple choice (radio)
- Options:
    - ( ) Yes - we offer a free trial
    - ( ) No free trial
- Required: Yes

**Q3.6: If yes, how many days?**

- Type: Short answer
- Placeholder: "e.g., 14"
- Required: Only if Q3.5 = Yes
- Show only if: Q3.5 = "Yes"

**Q3.7: Contract Length Options**

- Type: Multiple choice (checkboxes)
- Options:
    - [ ]  Monthly contracts available
    - [ ]  Annual contracts available
    - [ ]  Multi-year contracts available
    - [ ]  Custom terms
- Required: Yes

**Q3.8: Pricing Page URL (Optional)**

- Type: Short answer
- Placeholder: "[https://yoursite.com/pricing](https://yoursite.com/pricing)"
- Required: No
- Helper text: "If you have a public pricing page, we'll link to it"

---

### **SECTION 4: Integrations** ⭐ CRITICAL

**Section Header**: "Integrations (Buyers' #2 question)"

**Introduction text**:

`For each system below, tell us:
- Does [Tool] integrate with it?
- If yes, what type of integration?

This helps us match buyers with compatible tools.`

**Q4.1: Workday (HRIS)**

- Type: Multiple choice (radio)
- Options:
    - ( ) Native integration (built-in, no third-party)
    - ( ) API integration (requires API setup)
    - ( ) Via Zapier/middleware
    - ( ) Manual export/import only
    - ( ) Not supported
- Required: Yes

**Q4.2: BambooHR (HRIS)**

- Type: Multiple choice (radio)
- Options: Same as Q4.1
- Required: Yes

**Q4.3: ADP Workforce Now (Payroll)**

- Type: Multiple choice (radio)
- Options: Same as Q4.1
- Required: Yes

**Q4.4: Greenhouse (ATS)**

- Type: Multiple choice (radio)
- Options: Same as Q4.1
- Required: Yes

**Q4.5: Lever (ATS)**

- Type: Multiple choice (radio)
- Options: Same as Q4.1
- Required: Yes

**Q4.6: Slack (Communication)**

- Type: Multiple choice (radio)
- Options: Same as Q4.1
- Required: Yes

**Q4.7: Microsoft Teams (Communication)**

- Type: Multiple choice (radio)
- Options: Same as Q4.1
- Required: Yes

**Q4.8: Google Calendar (Calendar)**

- Type: Multiple choice (radio)
- Options: Same as Q4.1
- Required: Yes

**Q4.9: Outlook Calendar (Calendar)**

- Type: Multiple choice (radio)
- Options: Same as Q4.1
- Required: Yes

**Q4.10: Other Integrations (Optional)**

- Type: Long answer
- Placeholder: "List any other important integrations: Zoom, Calendly, Loom, etc."
- Required: No
- Helper text: "Comma-separated list using official product names (e.g., 'Rippling', 'Personio', 'Google Workspace', 'Zoom', 'Calendly'). These will be added to your profile as additional integrations beyond the core systems we asked about above."

---

### **SECTION 5: Compliance** ⭐ CRITICAL

**Section Header**: "Compliance & Certifications"

**Introduction text**:

`Mid-market buyers care about compliance, especially in HR/People tech.

Please confirm which certifications/standards [Tool] meets.

Note: This information will be displayed with the disclaimer:
"Compliance information is vendor-supplied and not independently verified by IndustryLabs."`

**Q5.1: GDPR Compliant**

- Type: Multiple choice (radio)
- Options:
    - ( ) Yes - GDPR compliant
    - ( ) No
    - ( ) Not applicable (we don't serve EU/UK)
- Required: Yes

**Q5.2: EEOC Compliant (US Equal Employment Opportunity)**

- Type: Multiple choice (radio)
- Options:
    - ( ) Yes - EEOC compliant
    - ( ) No
    - ( ) Not applicable (we don't serve US)
- Required: Yes

**Q5.3: SOC 2 Type II Certified**

- Type: Multiple choice (radio)
- Options:
    - ( ) Yes - SOC 2 Type II certified
    - ( ) No
    - ( ) In progress
- Required: Yes

**Q5.4: ISO 27001 Certified**

- Type: Multiple choice (radio)
- Options:
    - ( ) Yes - ISO 27001 certified
    - ( ) No
    - ( ) In progress
- Required: No

**Q5.5: HIPAA Compliant (if applicable)**

- Type: Multiple choice (radio)
- Options:
    - ( ) Yes - HIPAA compliant
    - ( ) No
    - ( ) Not applicable (not healthcare-focused)
- Required: No

**Q5.6: Compliance Documentation URL (Optional)**

- Type: Short answer
- Placeholder: "[https://yoursite.com/security](https://yoursite.com/security) or [https://yoursite.com/compliance](https://yoursite.com/compliance)"
- Required: No
- Helper text: "Link to your security/compliance page or trust center"

### **SECTION 6: Supported Regions**

**Section Header**: "Geographic Coverage"

**Q6.1: Which regions/countries does [Tool] support?**

- Type: Multiple choice (checkboxes)
- Options:
    - [ ]  United Kingdom
    - [ ]  United States
    - [ ]  European Union
    - [ ]  Australia
    - [ ]  Canada
    - [ ]  Global (all regions)
    - [ ]  Other (please specify below)
- Required: Yes

**Q6.2: If "Other", please specify**

- Type: Short answer
- Placeholder: "e.g., Southeast Asia, Latin America"
- Required: Only if Q6.1 includes "Other"
- Show only if: Q6.1 includes "Other"

---

### **SECTION 7: Implementation (Optional but Helpful)**

**Section Header**: "Implementation Timeline & Effort"

**Introduction text**:

`This helps buyers plan resources and timelines.

If you don't know exact numbers, rough estimates are fine.`

**Q7.1: Typical Implementation Timeline**

- Type: Short answer
- Placeholder: "e.g., 2-4 weeks"
- Required: No
- Helper text: "From contract signing to go-live"

**Q7.2: IT Support Required**

- Type: Short answer
- Placeholder: "e.g., ~10 hours for API setup and SSO configuration"
- Required: No

**Q7.3: HR Admin Time Required**

- Type: Short answer
- Placeholder: "e.g., ~20 hours for configuration and data migration"
- Required: No

**Q7.4: Common Prerequisites**

- Type: Long answer
- Placeholder: "e.g., Workday admin access, IT Security approval for SSO, budget approval"
- Required: No
- Helper text: "What buyers need to prepare before starting"

**Q7.5: Common Implementation Delays**

- Type: Long answer
- Placeholder: "e.g., Waiting for IT Security SSO approval (+1-2 weeks), Complex data migration (+1 week)"
- Required: No
- Helper text: "What commonly causes implementations to take longer than expected"

---

### **SECTION 8: Case Study & Social Proof (Optional)**

**Section Header**: "Customer Success Stories"

**Introduction text**:

`Customer examples help buyers understand real-world results.

Only share information that's already public or that you have permission to share.`

**Q8.1: Do you have a public case study we can reference?**

- Type: Short answer
- Placeholder: "[https://yoursite.com/customers/case-study](https://yoursite.com/customers/case-study)"
- Required: No

**Q8.2: If yes, what was the customer's company size?**

- Type: Short answer
- Placeholder: "e.g., ~200 employees"
- Required: No

**Q8.3: Customer's Industry**

- Type: Short answer
- Placeholder: "e.g., SaaS, E-commerce, Healthcare"
- Required: No

**Q8.4: Implementation Timeline (for this customer)**

- Type: Short answer
- Placeholder: "e.g., 3 weeks"
- Required: No

**Q8.5: Key Results**

- Type: Long answer
- Placeholder: "e.g., 40% reduction in time-to-hire, 60% less manual screening time"
- Required: No

**Q8.6: Notable Customers (Optional)**

- Type: Long answer
- Placeholder: "e.g., Stripe, Airbnb, Monzo"
- Required: No
- Helper text: "Only include customers you publicly list on your website"

---

### **SECTION 9: Rich Media (Optional)**

**Section Header**: "Product Demo & Screenshots"

**Q9.1: Demo Video URL**

- Type: Short answer
- Placeholder: "e.g., [https://youtube.com/watch?v=abc123](https://youtube.com/watch?v=abc123) or [https://loom.com/share/xyz](https://loom.com/share/xyz)"
- Required: No
- Helper text: "Product demos dramatically increase buyer interest"

**Q9.2: Anything else we should know?**

- Type: Long answer
- Placeholder: "Any other important details about [Tool] that buyers should know"
- Required: No

---

### **SECTION 10: Confirmation**

**Section Header**: "Final Step"

**Q10.0: Data Accuracy Confirmation**

- Type: Multiple choice (checkboxes)
- Options:
    - [ ]  I confirm this data is accurate and represents our current product (not outdated marketing materials)
    - [ ]  I understand IndustryLabs will display this information publicly and match buyers based on it
- Required: Yes

**Q10.1: I confirm this information is accurate**

- Type: Multiple choice (checkboxes)
- Options:
    - [ ]  I confirm this information is accurate and up-to-date
- Required: Yes

**Q10.2: I understand the compliance disclaimer**

- Type: Multiple choice (checkboxes)
- Options:
    - [ ]  I understand that compliance information will be displayed with a "vendor-supplied" disclaimer
- Required: Yes

---

### **THANK YOU PAGE**

**Title**: "Thank you! Your listing will be live within 24 hours."

**Message**:

`Thanks for taking the time to verify [Tool]'s information!

What happens next:

1. We'll review your responses (usually within 2-4 hours)
2. Your Premium listing goes live within 24 hours
3. You'll receive an email when it's live, with:
   - Direct link to your tool page
   - Request Board notification setup
   - How to update information in the future

Questions or need to update something?
Reply to the original email or contact nelson@industrylabs.ai

Thanks for being an early IndustryLabs partner!

Nelson
Founder, IndustryLabs
industrylabs.ai`

---

## PART 2: EMAIL TEMPLATES

### **EMAIL 1A: Initial Outreach (AI-Researched Data)**

**When to use**: First contact with vendor, you've already done AI research

**Subject**: [Tool Name] profile on IndustryLabs - please verify accuracy

**Body**:

`Hi [First Name],

I've already created [Tool Name]'s profile for IndustryLabs using AI and public sources. Before it goes live, I need you to verify we didn't get anything wrong.

Here's what we found:
✓ Built for: [Company sizes from research]
✓ Pricing: ~[Price range from research]
✓ Core integrations: [Top 3-5 integrations from research]
✓ Compliance: [GDPR/EEOC/SOC2 from research]

**If any of this is inaccurate, it could mean you miss qualified leads** (e.g., we might recommend your enterprise tool to a 50-person company, or vice versa).

Could you take 10 minutes to verify and correct?
[Google Form Link - Pre-filled with your data]

Early Partner Offer (First 10 Vendors):
- 3 months free Premium listing
- Then £99/month per vertical (we're starting with HR & Talent)
- Enhanced profile + Request Board lead notifications + analytics

Your Premium listing goes live within 24 hours of form submission.

Questions? Just reply to this email.

Best,
Nelson

---
Nelson Chen
Founder, IndustryLabs
industrylabs.ai
[LinkedIn Profile]`

**Personalization required**:

- [First Name]
- [Tool Name]
- [Company sizes from research] - e.g., "50-500 employees"
- [Price range from research] - e.g., "£6,000-£15,000/year"
- [Top 3-5 integrations] - e.g., "Workday, Slack, Greenhouse"
- [Compliance from research] - e.g., "GDPR compliant, SOC 2 certified"

---

### **EMAIL 1B: Initial Outreach (No AI Research Yet)**

**When to use**: First contact, haven't researched yet (faster outreach)

**Subject**: IndustryLabs Premium Partnership - [Tool Name]

**Body**:

`Hi [First Name],

I'm launching IndustryLabs - a vertical-focused B2B AI tool marketplace starting with HR & Talent.

Unlike G2/Capterra (generic directories), we:
- Organize by industry vertical (HR, L&D, CS) - not generic categories
- Match buyers to tools via Request Board (qualified leads with full context)
- Focus on mid-market (50-500 employees) - not "all companies"

I'd like to feature [Tool Name] as a Premium partner.

What makes us different for vendors:
✅ Qualified leads, not anonymous clicks (buyer provides budget, company size, compliance needs, current stack)
✅ Full context before you reach out (we send 2-3 matched tools per request, with reasoning)
✅ £99/month per vertical (vs £500-2,000 on G2/Capterra)

Early Partner Offer (First 10 Vendors):
- 3 months free Premium listing
- Then £99/month per vertical
- Enhanced profile + Request Board lead notifications + analytics

To get started, I need 10-15 minutes of your time to complete this form:
[Google Form Link]

Your Premium listing goes live within 24 hours of submission.

Would [Tool Name] be interested?

Best,
Nelson

---
Nelson Chen
Founder, IndustryLabs
industrylabs.ai`

---

### **EMAIL 1C: Post-AI-Research Correction Approach** (HIGHEST RESPONSE RATE)

**When to use**: You've completed AI research with 80%+ confidence, want vendor to verify

**Subject**: Quick verification: [Tool Name] on IndustryLabs

**Body**:

`Hi [First Name],

Quick heads-up: I'm listing [Tool Name] on IndustryLabs, a new curated marketplace for HR tools launching next month.

I've already drafted your profile using public data, but **I don't want to misrepresent your pricing or integrations** since our matching algorithm uses this to send you qualified leads.

Could you take 60 seconds to verify the critical data below?

**We found:**
- Pricing: [Price range] for mid-market companies
- Integrations: Native [Integration 1], [Integration 2]; API [Integration 3]
- Compliance: [GDPR/SOC2/etc.]

**Is this accurate?**
👉 [Link to Pre-filled Google Form with "Confirm" or "Correct" options]

If I don't hear back in 3 days, I'll go ahead with the data I found (no worries either way - you're listed for free regardless).

Thanks,
Nelson

---
Nelson Chen
Founder, IndustryLabs
industrylabs.ai`

**Personalization required**:

- [First Name]
- [Tool Name]
- [Price range] - e.g., "£8K-£18K/year"
- [Integration 1, 2, 3] - specific integrations found
- [GDPR/SOC2/etc.] - compliance certifications found

---

### **EMAIL 2: Follow-up Day 3 (No Response)**

**Subject**: Re: IndustryLabs Premium Partnership - [Tool Name]

**Body**:

`Hi [First Name],

Following up on my email from [Day of week].

Quick recap: IndustryLabs sends qualified HR buyer leads (with budget, company size, compliance needs) to Premium vendors. £99/mo per vertical, first 10 vendors get 3 months free.

I know partnership requests pile up. Here's the TL;DR:

**What you get:**
- Qualified leads: Buyers describe exact needs (budget, size, stack) → we match to 2-3 tools
- Full context: You see their requirements before reaching out
- £99/mo per vertical: vs £500-2,000 on G2/Capterra

**What I need:**
- 10-15 minutes to complete this form: [Google Form Link]
- Verify info on company size, pricing, integrations, compliance

If timing isn't right or you're not interested, no problem - just let me know and I won't follow up again.

If you'd like to see the platform first, here's a quick demo link: [Loom/YouTube]

Available this week?

Best,
Nelson`

---

### **EMAIL 3: Follow-up Day 7 (Still No Response)**

**Subject**: [Tool Name] + IndustryLabs - Quick Question

**Body**:

`Hi [First Name],

Quick question: Are you the right person to discuss marketplace partnerships at [Vendor]?

If not, could you point me to who handles this? Happy to get out of your inbox and connect with the right person.

If it is you and timing just isn't right, totally understand - happy to circle back in Q1 2026 or whenever works.

Context: I'm building a vertical-focused marketplace (starting with HR tools) that sends qualified leads to vendors. Early results show [specific traction if you have it, e.g., "150+ visitors and 5 Request Board submissions in first 2 weeks"].

Available for a 10-min call this week if you're curious: [Calendly link or available times]

Best,
Nelson`

---

### **EMAIL 4: Follow-up Day 14 (Final Attempt)**

**Subject**: Last note - IndustryLabs + [Tool Name]

**Body**:

`Hi [First Name],

This is my last follow-up - I know you're busy and don't want to spam you.

If [Tool Name] isn't interested in being featured on IndustryLabs right now, no worries. I'll add you to our Free tier so you're still discoverable, and I'll reach out again in 6 months when we have more traction.

If I'm reaching the wrong person, just point me in the right direction and I'll leave you alone!

Either way, best of luck with [Tool Name] - [specific compliment about their product or recent news, e.g., "congrats on the Series B!"].

Best,
Nelson

---
Nelson Chen
Founder, IndustryLabs
industrylabs.ai`

**After this**: Mark as "Not Interested (Now)" in tracking sheet, set reminder for 6 months

---

### **EMAIL 5: Response to Positive Reply - Next Steps**

**When to use**: Vendor replies with interest

**Subject**: Re: IndustryLabs Premium Partnership - [Tool Name]

**Body**:

`Hi [First Name],

Great to hear from you!

Here's what happens next:

**Step 1: Complete Data Form (10-15 minutes)**
[Google Form Link]

This verifies:
- Company size fit (who [Tool] is built for)
- Pricing (buyers' #1 question)
- Integrations (Workday, Slack, etc.)
- Compliance (GDPR, SOC 2, etc.)
- Implementation timeline

**Step 2: Your Listing Goes Live (within 24 hours)**
You'll receive:
- Direct link to your Premium tool page
- Request Board notification setup (email when buyers match to [Tool])
- Basic analytics dashboard access

**Step 3: First Lead Notification**
When an HR buyer submits a request matching [Tool], you'll receive:
- Buyer company details (name, size, region)
- Their requirements (budget, timeline, use case)
- Current stack (integrations they need)
- Your task: Respond within 24-48 hours

**Pricing Reminder:**
- First 3 months: FREE (Early Partner offer)
- Month 4+: £99/month per vertical
- Currently: HR & Talent only (expanding to L&D in Month 4-5)

Questions before starting?

Otherwise, here's the form: [Google Form Link]

Looking forward to partnering with you!

Best,
Nelson`

---

### **EMAIL 6: After Form Submission - Thank You & Next Steps**

**When to use**: Vendor completes Google Form

**Subject**: [Tool Name] Premium Listing - Going Live Soon

**Body**:

`Hi [First Name],

Thanks for completing the data verification form!

I've reviewed your responses - everything looks great.

**What happens next:**

**Today/Tomorrow:**
- I'll finalize your Premium listing
- You'll receive another email with:
  - Direct link to your live tool page
  - Request Board notification email confirmed
  - How to update information in the future

**This Week:**
- Your listing appears in HR & Talent category
- Request Board matching is active (you'll be notified when buyers match to [Tool])
- Featured in our upcoming "[Article Topic]" comparison article

**Monthly:**
- Basic analytics (page views, clicks, Request Board matches)
- Any Request Board leads matched to [Tool]

**Questions I got while reviewing:**

[If applicable, add 1-2 clarifying questions based on form responses, e.g.:]
- I see you marked Workday as "API integration" - does this require IT admin setup on the buyer's side?
- You mentioned £6K-£15K pricing - is that based on company size or number of users?

[If no questions:]
Everything was clear - no questions from my side!

Thanks again for being an early IndustryLabs partner. Excited to send you qualified leads!

Best,
Nelson

---
Nelson Chen
Founder, IndustryLabs
nelson@industrylabs.ai
industrylabs.ai`

---

## PART 3: VENDOR FAQ (Quick Copy-Paste Responses)

### **Q: What exactly is IndustryLabs?**

**A**:

`IndustryLabs is a vertical-focused B2B AI tool marketplace for HR, Learning & Development, and Customer Support.

Unlike G2/Capterra (generic directories showing 1000s of tools across all categories), we:
- Organize by industry vertical (HR tools for HR buyers, not "productivity tools for everyone")
- Focus on mid-market (50-500 employees) - clearer ICP than "all companies"
- Match buyers to tools via Request Board (qualified leads with budget, company size, compliance needs, current stack)

We're starting with HR & Talent vertical, expanding to L&D in Month 4-5, then Customer Support in Month 7-9.`

---

### **Q: How does the Request Board work?**

**A**:

`Request Board is our core differentiation:

Buyer Side:
1. HR leader submits request describing their specific needs:
   - Company: "200 employees, UK, SaaS company"
   - Current stack: "Workday (HRIS), Slack"
   - Budget: "£10K/year"
   - Timeline: "Need to implement in 1-3 months"
   - Requirements: "Need ATS with AI screening, GDPR compliant"

2. We match them to 2-3 tools that fit (not 20 tools)

Vendor Side:
1. You receive email notification: "New Request Board match for [Tool]"
2. Email includes full buyer context (company details, requirements, budget, timeline)
3. You decide whether to reach out
4. If yes, you contact buyer directly with context

This is fundamentally different from G2/Capterra where you get anonymous traffic and hope they convert.`

---

### **Q: What's included in Premium vs Free?**

**A**:

`Free Tier:
- Basic listing (company name, logo, one-line description, website link)
- Searchable in category pages
- Included in comparison tables

Premium Tier (£99/month per vertical):
- Enhanced profile page:
  - Full description (500+ words)
  - Screenshots (up to 5)
  - Demo video
  - Features list
  - Integrations directory
  - Compliance badges
- Request Board lead notifications (email within 2 hours of match)
- Priority placement in category pages (top 3 positions rotate among Premium vendors)
- Basic analytics (page views, clicks, Request Board matches)

Early Partner Offer (First 10 Vendors):
- 3 months free Premium
- Then £99/month per vertical`

---

### **Q: Why £99/month instead of higher (like G2's £500-2,000)?**

**A**:

`Three reasons:

1. We're early-stage (zero traction yet) - higher pricing requires proven ROI

2. Per-vertical pricing creates expansion revenue:
   - You pay £99/mo for HR listing
   - If you also serve L&D, you can add L&D for another £99/mo (£198/mo total)
   - This aligns with how your customers think ("I need HR tools" vs "I need tools")

3. Impulse-buy threshold:
   - £99/mo doesn't require executive approval at most vendors
   - Marketing manager can say "yes" and expense it
   - Lower friction = faster onboarding

We can always raise prices once we prove ROI. Early partners get grandfathered at £99/mo.`

---

### **Q: How many leads can I expect?**

**A**:

`Honest answer: I don't know yet - we're pre-launch.

Target metrics (Month 3):
- 500-1,500 monthly visitors
- 10-15 Request Board submissions
- 2-3 matched tools per request
- So roughly 20-40 total matches across all Premium vendors

Your share depends on:
- How well your tool fits buyer requirements
- Number of Premium vendors in your category (fewer = more matches)
- Your tool's company size fit, integrations, compliance

I'll share actual numbers monthly so you can track ROI.

Early Bird offer (3 months free) lets you test this risk-free.`

---

### **Q: Can I update my information later?**

**A**:

`Yes, two ways:

Month 1-6:
- Email me updates (pricing changes, new features, etc.)
- I update Airtable + site within 24 hours
- No vendor portal yet (not worth building until we have 10+ paying vendors)

Month 7+ (if we build Vendor Portal):
- Self-serve updates via vendor portal
- Changes sync to site automatically

For now, just email me - it's faster than building a portal nobody uses.`

---

### **Q: How is this different from G2 / Capterra?**

**A**:

`G2/Capterra: Review platforms (horizontal, all categories)
- 1000s of tools across all industries
- Buyers browse and read reviews
- You get anonymous traffic (no context on who they are or what they need)
- Pricing: £500-2,000/month

IndustryLabs: Vertical marketplace with concierge matching
- HR tools only (for now), organized by HR workflows
- Buyers submit specific requests with budget, company size, stack, compliance needs
- We match them to 2-3 relevant vendors
- You get qualified leads with full context (name, company, requirements)
- Pricing: £99/month per vertical

Complementary, not competitive:
- G2 = broad awareness, social proof
- IndustryLabs = qualified leads, intent-based matching`

---

### **Q: Do you take a commission on deals?**

**A**:

`No.

Revenue model: Fixed subscription (£99/mo per vertical), not commission/rev-share.

Why?
- Aligned incentives: We succeed when you get good leads, not when you close deals
- Simpler: No complex tracking, no contract reviews, no commission disputes
- Transparent: You know exactly what you're paying

You own the customer relationship 100%.`

---

## PART 4: INTERNAL TRACKING SYSTEM

### **Airtable View: Vendor Outreach Pipeline**

**Create in existing VENDORS table**:

**View Name**: "Outreach Pipeline"

**Filters**:

- subscription_status = "Free" OR subscription_status is empty

**Fields to Show**:

1. company_name
2. contact_name
3. contact_email
4. outreach_stage (New Single Select field)
5. last_contact_date
6. next_follow_up_date
7. outreach_method (New Single Select field)
8. notes

**New Fields to Add to VENDORS Table**:

`OUTREACH TRACKING:
- outreach_stage (Single Select):
  Options: "Not Contacted", "Initial Email Sent", "Follow-up 1 (Day 3)", 
           "Follow-up 2 (Day 7)", "Follow-up 3 (Day 14)", "Responded - Interested", 
           "Responded - Not Interested", "Form Completed", "Listing Live"
  
- outreach_method (Single Select):
  Options: "Email (Cold)", "Email (Warm Intro)", "LinkedIn", "Demo Call", "Conference"
  
- ai_research_completed (Checkbox):
  Purpose: Has ChatGPT/Gemini research been done?
  
- form_submitted (Checkbox):
  Purpose: Has vendor completed Google Form?
  
- form_submission_date (Date)`

**Group By**: outreach_stage

**Sort**: last_contact_date (newest first)

---

### **SOP: Daily Outreach Workflow**

**Monday - Friday (30-45 mins/day)**:

**Step 1: Check "Responded - Interested" (5 mins)**

- Open "Outreach Pipeline" view
- Filter: outreach_stage = "Responded - Interested"
- Send EMAIL 5 (Next Steps) with Google Form link
- Update: outreach_stage = "Form Sent"

**Step 2: Check "Form Completed" (10 mins)**

- Filter: form_submitted = true AND outreach_stage ≠ "Listing Live"
- Review Google Form responses
- Populate TOOLS table with vendor data
- Create TOOLS_INTEGRATIONS records
- Send EMAIL 6 (Thank You & Going Live)
- Update: outreach_stage = "Listing Live"

**Step 3: Send Follow-ups (15 mins)**

- Filter: next_follow_up_date = TODAY
- Check outreach_stage:
    - "Initial Email Sent" + Day 3 → Send EMAIL 2
    - "Follow-up 1 (Day 3)" + Day 7 → Send EMAIL 3
    - "Follow-up 2 (Day 7)" + Day 14 → Send EMAIL 4
- Update: outreach_stage + next_follow_up_date

**Step 4: New Outreach (10-15 mins)**

- Goal: 5-10 new vendors per day
- Pick from target vendor list (TASK-401 in Execution Hub)
- Use EMAIL 1A (if AI research done) or EMAIL 1B (if not)
- Update: outreach_stage = "Initial Email Sent", next_follow_up_date = +3 days

---

## PART 5: GOOGLE FORM SETUP INSTRUCTIONS

### **Create Form**:

1. Go to: [https://forms.google.com](https://forms.google.com/)
2. Click: "Blank Form"
3. Title: "IndustryLabs Premium Listing - Quick Data Verification"
4. Description: Copy from PART 1 above

### **Add Sections**:

Follow structure from PART 1:

- 10 sections total
- ~35 questions
- Use question types as specified (Short answer, Multiple choice, Checkboxes, Long answer)
- Mark required questions
- Add conditional logic (e.g., free trial days only if Q3.5 = Yes)

### **Form Settings**:

1. Click ⚙️ (Settings)
2. **General**:
    - ✓ Limit to 1 response (prevent duplicates)
    - ✓ Collect email addresses
3. **Presentation**:
    - ✓ Show progress bar
    - ✓ Shuffle question order: OFF
    - Confirmation message: Use text from PART 1 "Thank You Page"
4. **Quizzes**: OFF (this is not a quiz)

### **Form Responses**:

1. Click "Responses" tab
2. Click green Sheets icon: "Create Spreadsheet"
3. Name: "IndustryLabs Vendor Data Collection"
4. This creates auto-linked Google Sheet for easy review

### **Share Form**:

1. Click "Send" button
2. Copy link
3. Use this link in all email templates: [Google Form Link]

---

## PART 6: NEXT STEPS CHECKLIST

**Before Starting Outreach**:

- [ ]  Create Google Form (30-45 mins)
- [ ]  Test form submission yourself (5 mins)
- [ ]  Verify Google Sheet auto-population works (2 mins)
- [ ]  Add new fields to VENDORS table in Airtable (10 mins):
    - outreach_stage
    - outreach_method
    - ai_research_completed
    - form_submitted
    - form_submission_date
- [ ]  Create "Outreach Pipeline" view in Airtable (5 mins)
- [ ]  Copy email templates to Gmail/Notion for easy access (5 mins)
- [ ]  Prepare vendor target list (use TASK-401 from Execution Hub)

**Week 1 Execution**:

- [ ]  Day 1: Send 10 initial outreach emails (EMAIL 1A or 1B)
- [ ]  Day 2: Send 10 more initial outreach emails
- [ ]  Day 3: Send 10 more + follow up on Day 1 emails (EMAIL 2)
- [ ]  Day 4: Send follow-ups + process any form submissions
- [ ]  Day 5: Weekly review - how many responded? Form completion rate?

**Target Week 1**:

- 50 vendors contacted
- 5-10 responses expected
- 2-4 form submissions expected
- 1-2 listings go live

---

## CHANGELOG

**Version 1.0** (2025-11-27):
- Initial vendor outreach package created
- Google Form structure with 10 sections, ~35 questions
- 6 email templates (initial outreach, follow-ups, thank you)
- Vendor FAQ with copy-paste responses
- Internal tracking system with Airtable views
- Daily outreach workflow SOP

**Version 1.1** (2025-11-27):
- Restructured pricing questions (Q3.1a/b/c) for Airtable compatibility - enables direct paste to pricing_annual_min/max fields without manual cleaning
- Enhanced integrations helper text (Q4.10) for other_integrations field - clearer guidance on official product names and comma-separated format
- Strengthened EMAIL 1A "pre-filled" psychology - reframed as "prevent errors" not "fill out form", creates urgency around accuracy
- Added EMAIL 1C "correction approach" template - even shorter, frames as "prevent wrong data" not "sign up", includes soft deadline (HIGHEST RESPONSE RATE)
- Added data accuracy confirmation checkbox (Q10.0) - creates accountability, reduces disputes later
- Based on ChatGPT + Gemini + Claude multi-model feedback