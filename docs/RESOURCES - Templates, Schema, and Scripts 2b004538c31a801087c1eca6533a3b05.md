# RESOURCES - Templates, Schema, and Scripts

**Version**: 1.2

**Last Updated**: November 19, 2025

**Purpose**: Central repository for all templates, email scripts, checklists, and reference materials

---

## AI Prompt Templates (Development)

Standard templates for working with Claude Code, GPT-5, and other AI assistants.

### Planning Prompt (Use GPT-5)

```
You are helping with IndustryLabs.ai (Next.js 14, TypeScript, Tailwind, Airtable backend).

Current task from Execution Hub: [paste task description]

Relevant files: [list files or paste key excerpts]

Please:
1. Break this into 3-7 concrete implementation steps
2. Call out any risks or edge cases
3. Specify which files will be changed/created
4. Suggest tests or validation checks to run
5. Output a clear numbered checklist

Context from .cursorrules: [paste relevant sections if needed]

```

### Implementation Prompt (Use Claude Code in VS Code)

```
You are Claude Code working inside the IndustryLabs repo.

Task plan and checklist:
[paste numbered checklist from planning phase]

Please:
- Create/edit only the necessary files
- Keep code consistent with existing patterns (see .cursorrules)
- Follow TypeScript strict mode
- Use Tailwind utility classes (no custom CSS unless necessary)
- Handle errors gracefully
- After edits, ensure `npm run lint` and `npm run build` will pass

Do not invent new Airtable fields - check AIRTABLE SCHEMA document first.

```

### Review Prompt (Use GPT-5)

```
Code review request for IndustryLabs.ai.

Changed files: [list or paste diff]

Please act as a senior TypeScript/Next.js engineer and:
1. Review for correctness, readability, and safety
2. Check alignment with .cursorrules principles
3. Point out any anti-patterns or better abstractions
4. Verify error handling is robust
5. Suggest concrete, small improvements
6. Check for any hardcoded values that should be environment variables

Focus areas: [specific concerns if any]

```

**Any AI assistant that sees this section should follow these patterns by default.**

```

---

## Summary: What You Need to Do

1. **Update `.cursorrules`** - Add "AI Assistant Strategy" section
2. **Update `README.md`** - Add "AI-Assisted Development" section
3. **Create `AI_WORKFLOW.md`** - New file with full workflow
4. **Update PROJECT MASTER PLAN** - Add AI strategy section
5. **Update EXECUTION HUB** - Add SOP section
6. **Update DECISION LOG** - Add DL-007 entry
7. **Update CREDENTIALS** - Add AI tools safety section
8. **Update AIRTABLE SCHEMA** - Add note at top
9. **Update RESOURCES** - Add prompt templates section

**Total time:** 15-20 minutes to add all sections

**Then commit:**

```

Add comprehensive AI assistant documentation and workflow

- Dual-AI strategy: Claude Code (Sonnet 4.5) + GPT-5
- Clear PLAN/IMPLEMENT/REVIEW workflow
- Security rules for AI tool usage
- Prompt templates for standard tasks

---

## DOCUMENT PURPOSE

**What This Is**:

- Template library for vendor outreach, content creation, and operations
- Email scripts with personalization guidance
- Checklists for quality control
- Quick reference materials for common tasks

**What This Is NOT**:

- NOT a strategy document (see Master Plan)
- NOT a workflow guide (see Pipelines)
- NOT a data definition (see Airtable Schema)

**How to Use**:

- Copy templates when needed
- Customize the bracketed sections [like this]
- Track what works and refine over time

---

## QUICK ACCESS (MOST USED TEMPLATES)

**Jump directly to your most frequently used templates:**

**Vendor Outreach**:

- Tier 1 Initial Email (1A) – For established vendors like Greenhouse, Workday
- Tier 2 Initial Email (1B) – For growth-stage startups
- Follow-up Day 3 (1C) – First follow-up if no response
- Follow-up Day 7 (1D) – Second follow-up
- Post-Demo Follow-up (1G) – After demo call

**Content Creation**:

- Pre-Publishing SEO Checklist
- AI Draft Quality Check

**Request Board**:

- Standard Response (3A) – Most common request response
- Budget Too Low Response (3B) – When budget doesn't match

**Vendor Management**:

- Premium Welcome Email (4A) – After vendor converts
- Monthly Check-in (5A) – Retention touchpoint

**Social Media**:

- LinkedIn Article Post (6A) – Promote new content
- LinkedIn Request Board Promo (6B) – Drive Request Board traffic

**Quick References**:

- Airtable Common Updates – Frequent database operations
- Common Objections – Vendor sales objections

---

## TABLE OF CONTENTS

1. Vendor Outreach Email Templates
2. Content Creation Checklists
3. Request Board Response Templates
4. Onboarding & Welcome Emails
5. Retention & Check-in Templates
6. Social Media Templates
7. Airtable Quick Reference
8. Common Objection Responses
9. Pricing Sheets & Value Props
10. VA Task Templates

---

## 1. VENDOR OUTREACH EMAIL TEMPLATES

### Template 1A: Tier 1 Vendor - Initial Outreach (Large Established Tools)

**Subject**: IndustryLabs partnership - [Vendor Name] listing

**Body**:

```
Hi [First Name],

I came across [Vendor Name] while researching [specific use case, e.g., "AI-powered recruiting tools"], and I was impressed by [specific feature or recent achievement, e.g., "your bias-reduction feature" or "your recent Series B announcement"].

I'm building IndustryLabs - a curated B2B AI tool marketplace organized by industry verticals. Unlike generic directories (Futurepedia, G2), we focus on depth over breadth: HR tools for HR buyers, L&D tools for L&D buyers, etc.

What makes us different:
- Qualified leads: Our Request Board matches buyers who describe specific needs (budget, company size, compliance requirements) directly to 2–3 relevant vendors
- Industry-specific context: We organize by use case (Recruiting, Onboarding, Performance) and company size, not just generic "productivity tools"
- Compliance focus: GDPR, EEOC, SOC 2 coverage that enterprise buyers need

We're launching with HR & Talent vertical and currently onboarding the first 10 premium partners. Would [Vendor Name] be interested in a Premium listing (£99/mo)?

Early Bird offer: First 10 vendors receive 3 months free to see results before committing.

Premium includes:
- Enhanced tool page (long description, screenshots, video, features list)
- Request Board lead notifications (email within 2 hours of match)
- Priority placement in category pages
- Basic analytics dashboard

Happy to show you the platform and discuss how we match buyers to tools. Available for a 15-minute call this week?

Best,
Nelson

---
Nelson Chen
Founder, IndustryLabs
industrylabs.ai
[LinkedIn Profile URL]

```

**Personalization Required**:

- [First Name]
- [Vendor Name]
- [Specific use case]
- [Specific feature or achievement]

**When to Use**: Large, established vendors (Greenhouse, Workday, BambooHR, etc.)

---

### Template 1B: Tier 2 Vendor - Initial Outreach (Growth-Stage Tools)

**Subject**: Early partner opportunity - IndustryLabs

**Body**:

```
Hi [First Name],

I'm launching IndustryLabs, a vertical-focused AI tool marketplace starting with HR & Talent, and I think [Vendor Name] would be a great fit as an early partner.

Quick context on what we're building:
- Vertical-first marketplace: We organize by industry (HR, L&D, CS) instead of generic categories
- Request Board for qualified leads: Buyers describe their exact needs, we match them to 2–3 tools with full context (budget, timeline, company size, compliance requirements)
- Compliance-focused: GDPR, EEOC, SOC 2 - the stuff enterprise buyers actually care about

Unlike passive directories, vendors receive actionable leads with context, not just anonymous page views.

Why I'm reaching out to you: [Specific reason - e.g., "Your focus on mid-market companies (50–500 employees) aligns perfectly with our ICP" or "Your GDPR-first approach resonates with our UK buyer base"]

We're onboarding our first 10 Premium partners with a special offer:
- 3 months free to test the platform
- £99/mo per vertical after trial (we're starting with HR, expanding to L&D and CS)
- Enhanced listing + Request Board lead notifications + analytics

Would you be open to a quick call to see if this makes sense for [Vendor Name]?

Best,
Nelson

---
Nelson Chen
Founder, IndustryLabs
industrylabs.ai

```

**Personalization Required**:

- [Specific reason] — tie to ICP, feature, geography, growth, etc.

---

### Template 1C: Follow-up Email - Day 3 (No Response)

**Subject**: Re: IndustryLabs partnership - [Vendor Name] listing

```
Hi [First Name],

Following up on my email from [day of week, e.g., "Monday"].

I know inbound partnership requests can pile up, so I wanted to resurface this quickly:

TL;DR: IndustryLabs sends you qualified HR buyer leads (with budget, company size, timeline) when they match your tool. £99/mo, first 10 vendors get 3 months free.

If timing isn't right or you're not interested, no problem - just let me know and I won't follow up again.

If you'd like to see a quick demo (10 mins), here's my calendar: [Calendly link or available times]

Best,
Nelson

```

**When to Use**: 3 days after initial email with no response.

---

### Template 1D: Follow-up Email - Day 7 (Still No Response)

**Subject**: [Vendor Name] + IndustryLabs – quick question

```
Hi [First Name],

Quick question: Are you the right person to discuss marketplace partnerships at [Vendor Name]?

If not, could you point me to who handles this? Happy to get out of your inbox and connect with the right person.

If it is you and timing just isn't right, totally understand - happy to circle back in [Q1 2026 / 3 months / 6 months].

Context: I'm building a vertical-focused marketplace (starting with HR tools) that sends qualified leads to vendors. Early results from our soft launch show [specific traction metric if available, e.g., "150+ monthly visitors and 5 Request Board submissions in first 2 weeks"].

Available this week for a 10-min call if you're curious.

Best,
Nelson

```

---

### Template 1E: Follow-up Email - Day 14 (Final Attempt)

**Subject**: Last note - IndustryLabs + [Vendor Name]

```
Hi [First Name],

This is my last follow-up - I know you're busy and don't want to spam you.

If [Vendor Name] isn't interested in being featured on IndustryLabs right now, no worries. I'll add you to our Free tier so you're still discoverable, and I'll reach out again in 6 months when we have more traction.

If I'm reaching the wrong person, just point me in the right direction and I'll leave you alone!

Either way, best of luck with [Vendor Name] - [specific compliment about their product or recent news].

Best,
Nelson

---
Nelson Chen
Founder, IndustryLabs
industrylabs.ai

```

After this, mark as **Not Interested** in your Pipelines system.

---

### Template 1F: Response to Positive Reply - Scheduling Demo

**Subject**: Re: IndustryLabs partnership - [Vendor Name] listing

```
Hi [First Name],

Great to hear from you! Happy to show you the platform and walk through how the Request Board works.

I can do:
- [Day 1], [Time 1] or [Time 2]
- [Day 2], [Time 1] or [Time 2]
- [Day 3], [Time 1] or [Time 2]

All times [Your Timezone]. The call will be 15–20 minutes - quick tour of the platform, how lead matching works, and answer any questions.

Or if it's easier, here's my calendar: [Calendly link]

In the meantime, here's a preview of what a Premium tool page looks like: [Link to example if available, or describe structure]

Looking forward to it!

Best,
Nelson

```

---

### Template 1G: Post-Demo Follow-up (Interested but Needs Time)

**Subject**: IndustryLabs partnership - next steps

```
Hi [First Name],

Thanks for the call today! Really enjoyed learning more about [Vendor Name]'s [specific thing discussed, e.g., "roadmap for 2026" or "approach to GDPR compliance"].

As discussed, here's a summary of IndustryLabs Premium:

Pricing: £99/month per vertical (starting with HR & Talent)

What's Included:
- Enhanced tool page with full description, screenshots, demo video
- Request Board lead notifications (email within 2 hours)
- Priority placement in HR category pages
- Basic analytics (page views, click-through, request matches)

Early Bird Offer (First 10 partners): 3 months free, then £99/mo

Next Steps:
[Option 1 if they're ready]: If you're ready to move forward, I can get [Vendor Name] set up this week. I'll need:
1. Logo (PNG, square format, 500x500px minimum)
2. Tool description (we can use website copy or I can draft something)
3. 3–5 screenshots
4. Contact email for Request Board notifications

[Option 2 if they need internal approval]: Let me know what you need from me to get internal approval. Happy to jump on a call with [decision maker] or provide any additional materials.

[Option 3 if they want to see traction first]: Totally understand wanting to see traction first. I'll keep you updated on our metrics (monthly visitors, Request Board volume, vendor feedback) and circle back in [timeframe they mentioned].

Any questions in the meantime, just let me know.

Best,
Nelson

```

---

## 2. CONTENT CREATION CHECKLISTS

### Pre-Publishing Checklist – SEO Article (Next.js + Airtable)

**Before marking Stage = "Published" and letting it go live:**

**Content Quality**:

- [ ]  Article meets minimum word count (1500+ for best-of, 1000+ for comparisons)
- [ ]  All tool features and pricing fact-checked against vendor websites
- [ ]  No obvious AI hallucinations or outdated information
- [ ]  Personal insights or Request Board patterns added (not just AI output)
- [ ]  Intro has a clear hook (speaks to a specific pain)
- [ ]  Conclusion has a clear CTA (Request Board, newsletter signup, or related article)

**SEO Optimization**:

- [ ]  Primary keyword in H1 title (naturally)
- [ ]  Primary keyword appears in first 100 words
- [ ]  Meta description written (150–160 characters, includes keyword)
- [ ]  URL slug is clean and keyword-friendly (e.g., `/best-ai-hr-tools-2026`)
- [ ]  At least 3 internal links to tools or other articles
- [ ]  At least 2 external links to authoritative sources (non-competitors)
- [ ]  All images have descriptive alt text

**Technical (Next.js-focused)**:

- [ ]  All links tested and working (no 404s)
- [ ]  Images compressed (target <200KB each)
- [ ]  Featured image renders correctly in the article layout
- [ ]  Mobile view of `/articles/[slug]` looks good (font sizes, spacing)
- [ ]  **Next.js page at `/articles/[slug]` renders the correct content from Airtable and matches your final draft**

**Airtable Updates**:

- [ ]  Article entry created/updated in **ARTICLES** table
- [ ]  `title`, `slug`, `article_type`, `primary_keyword`, `meta_description` filled
- [ ]  Final Markdown content pasted into `content` field
- [ ]  `status = "Published"`
- [ ]  `publish_date` set
- [ ]  `related_tools` linked (3–5 tools, where relevant)

**Promotion**:

- [ ]  LinkedIn post drafted and posted/scheduled
- [ ]  Internal links from older articles updated if relevant
- [ ]  Added to newsletter content queue if it’s a pillar article

---

### AI Draft Quality Check

**Before moving from “AI Draft Generated” → “Human Review”:**

**Accuracy**:

- [ ]  Tool names spelled correctly
- [ ]  No tools invented by AI (cross-check with Airtable / web)
- [ ]  Pricing verified on vendor sites
- [ ]  Feature claims aligned with vendor wording
- [ ]  Compliance claims clearly marked as vendor-supplied

**Structure**:

- [ ]  Intro not pure AI cliché (“In today’s rapidly changing landscape…”)
- [ ]  Sections follow the outline you gave
- [ ]  Headings specific and useful (not “Key Features” only)
- [ ]  Flow: problem → options → trade-offs → recommendations

**Completeness**:

- [ ]  Every tool in the outline appears in the article
- [ ]  No placeholder text like [Add details here]
- [ ]  Conclusion clearly tells reader what to do next

---

## 3. REQUEST BOARD RESPONSE TEMPLATES

### Template 3A: Standard Request Response (2–3 Tool Matches)

**Subject**: Your IndustryLabs request – [Use Case] recommendations

```
Hi [Requester Name],

Thanks for submitting your request to IndustryLabs! Based on your details:

Your Requirements:
- Company size: [X employees]
- Use case: [Specific need from their request]
- Budget: [Budget range]
- Timeline: [Their timeline]
- [Any specific requirements they mentioned]

My Recommendations:

1. [Tool Name 1] – Best for [specific reason matching their needs]
- Key strength: [Specific feature aligned to their need]
- Pricing: [Starting price or range]
- Why it fits: [1–2 sentences tied to size, stack, compliance, geography]
- Learn more: [Link to tool page on IndustryLabs]

2. [Tool Name 2] – Best for [different angle than Tool 1]
- Key strength: [Specific feature]
- Pricing: [Starting price or range]
- Why it fits: [1–2 sentences]
- Learn more: [Link]

3. [Tool Name 3] – Alternative if [specific condition]
- Key strength: [Specific feature]
- Pricing: [Starting price or range]
- Why it fits: [1–2 sentences]
- Learn more: [Link]

Next steps:
I've notified these vendors about your request (with your company details and requirements). Expect to hear from them within 1–2 business days.

If you'd like me to facilitate an introduction to any specific vendor, just reply and let me know.

Related resources:
You might also find this helpful: [Link to relevant comparison or guide]

Any questions, just reply to this email.

Best,
Nelson

---
Nelson Chen
Founder, IndustryLabs
industrylabs.ai

```

### Template 3B: Budget Too Low

**Subject**: Your IndustryLabs request – budget-friendly options

```
Hi [Requester Name],

Thanks for your request! I noticed your budget is [stated budget], and I want to be transparent: most tools in the [use case] category start around [typical price range].

However, here are some options that might still work:

1. [Tool Name] – [Starting price]
- Why it's more affordable: [smaller feature set, newer tool, freemium, etc.]
- Best for: [Companies willing to trade X for lower cost]

2. [Tool Name] – Freemium
- Free tier includes: [What's included]
- Paid tier starts at: [Price] if you later need [premium features]

Other considerations:
- Some vendors offer startup discounts
- Annual billing typically saves 15–20% vs monthly
- Volume discounts may apply at [their company size]

If your budget has any flexibility, I'd also look at [slightly more expensive but high-ROI tool] – it’s more expensive, but includes [feature] that often pays for itself via [specific ROI angle].

Happy to help you think through ROI or negotiation if useful.

Best,
Nelson

```

---

### Template 3C: No Good Matches (Honest Response)

**Subject**: Your IndustryLabs request – current options

```
Hi [Requester Name],

Thanks for your request. I want to be upfront: I don't currently have tools listed that perfectly match your combination of [requirements, e.g., "HIPAA compliance + under £500/mo + video interviewing"].

Closest matches (with caveats):

[Tool Name] – Meets [X and Y] but not [Z]
- [Short explanation]
- Might work if [specific compromise is acceptable]

What I'd recommend:
1. Consider whether [requirement Z] is truly a must-have vs nice-to-have
2. I’m actively adding more [vertical] tools – if you can wait 4–6 weeks, I expect better matches
3. If it's urgent, I can run a deeper manual search beyond current listings and come back in 2–3 days

Would you like me to:
- Reach out to [Tool Name] about [missing feature]?
- Do a broader search and follow up?
- Keep your request on file and notify you when I add closer matches?

Let me know how I can help.

Best,
Nelson

```

---

### Template 3D: Not in Target Scope / Likely Spam

**Subject**: Your IndustryLabs request

```
Hi [Name],

Thanks for your submission. I noticed [reason – e.g., "you're looking for consumer AI apps" or "your request is for a vertical we don't cover yet"].

Just to clarify: IndustryLabs focuses on B2B AI tools for HR, L&D, and Customer Support teams at companies with roughly 50–500 employees.

If that doesn’t match what you’re looking for, I might not be the best resource.

If I’ve misunderstood your request, please clarify and I’m happy to take another look.

Best,
Nelson

```

Mark as **Spam** or **Out of Scope** in Airtable if appropriate.

---

## 4. ONBOARDING & WELCOME EMAILS

### Template 4A: Premium Vendor Welcome Email

**Subject**: Welcome to IndustryLabs Premium – [Vendor Name]

```
Hi [First Name],

Welcome to IndustryLabs! I'm excited to have [Vendor Name] as one of our Premium partners.

What happens next:

This week:
- Your enhanced tool page is live: [Link to their tool page]
- Request Board notifications are active (you'll receive emails when we match buyers to your tool)
- I’ll feature [Vendor Name] in our upcoming "[Article Name]" article (publishing [date])

How Request Board matching works:
When an HR buyer submits a request (e.g., "200-person UK SaaS company, needs AI ATS, £5K budget, GDPR-critical, using Workday"), our system matches them to 2–3 relevant tools based on:
- Company size fit
- Use case alignment
- Geographic market (UK buyers → UK or Global vendors)
- Compliance requirements

You’ll receive an email with:
- Buyer company name and size
- Their requirements
- Budget and timeline
- Contact details (if they opt in)

Your responsibility: respond to matched leads within 24–48 hours for best conversion.

Updating your listing:
For now, just email me any updates (pricing, features, screenshots) and I’ll update Airtable + the site. A Vendor Portal is planned for later, once volume justifies it.

Any questions, just reply. I read this inbox daily.

Looking forward to sending you qualified leads.

Best,
Nelson

---
P.S. If you have HR leaders in your network who could benefit from curated AI tool recommendations, feel free to share: industrylabs.ai/request

```

---

### Template 4B: Free Tier Vendor Notification

**Subject**: [Vendor Name] is now listed on IndustryLabs

```
Hi [First Name],

Quick heads up: I've added [Vendor Name] to IndustryLabs (industrylabs.ai), a new curated marketplace for B2B AI tools focused on HR & Talent.

Your Free listing:
- Tool page: [Link]
- Includes: company name, logo, 1-line description, link to your website
- Searchable in [category names]

No action needed – this is just an FYI.

If you’d like more visibility and lead flow, Premium partners (£99/mo per vertical) receive:
- Enhanced page with screenshots, video, full description
- Request Board lead notifications
- Priority placement in categories
- Basic analytics

We’re giving our first 10 Premium partners 3 months free. If you’d like details, just reply.

Best,
Nelson

---
Nelson Chen
Founder, IndustryLabs
industrylabs.ai

```

---

## 5. RETENTION & CHECK-IN TEMPLATES

### Template 5A: Monthly Check-in (Active Premium Vendor)

**Subject**: IndustryLabs check-in – how’s it going for [Vendor Name]?

```
Hi [First Name],

Quick monthly check-in on how IndustryLabs is working for [Vendor Name].

Your stats (last 30 days):
- Page views: [X]
- Request Board matches: [X]
- Click-through rate from recommendations: [X]%

Quick question: Have any of these leads turned into demos or customers yet? Even directional feedback helps me improve matching.

Anything we can improve?
- Match quality (company size, geography, use case)?
- Speed of notifications?
- Tool page content (do we need better screenshots or updated copy)?

What’s new on our side:
- [Any platform updates, new verticals, new content featuring them, etc.]

Happy to jump on a short call if easier to discuss.

Thanks again for being an early partner.

Best,
Nelson

```

---

### Template 5B: Churn Risk – Low Engagement

**Subject**: Quick question about your IndustryLabs results

```
Hi [First Name],

I noticed [Vendor Name] hasn’t been getting many Request Board matches recently (only [X] in the past month), and wanted to check in.

A couple of questions:
1) Are the leads we send relevant? If not, what’s off – company size, geography, use case?
2) Is the platform meeting your expectations overall?
3) Would different positioning on your tool page help (e.g., highlighting different features or use cases)?

Your subscription renews on [date]. If IndustryLabs isn’t delivering value, I’d rather have an honest conversation than keep you paying for something that doesn’t work.

At the same time, I’m keen to fix what’s not working if we can.

Would you be open to a 15-min call this week?

Best,
Nelson

```

---

### Template 5C: Renewal Reminder (7 Days Before)

**Subject**: IndustryLabs Premium renewal – [Vendor Name]

```
Hi [First Name],

Your IndustryLabs Premium subscription renews on [date] (7 days from now).

Quick recap of the last [3/6/12] months:
- Request Board leads sent: [X]
- Total page views: [X]
- Current plan: £99/mo for [vertical(s)]

No action needed – your payment method on file will be charged automatically.

If you’d like to:
- Add another vertical (e.g., L&D or CS)
- Cancel before renewal
- Or just review performance in more detail

…reply here and I’ll sort it for you.

Thanks for partnering with us.

Best,
Nelson

```

---

## 6. SOCIAL MEDIA TEMPLATES

### Template 6A: LinkedIn – Article Announcement

```
New guide on IndustryLabs 📊

[Article Title]

[2–3 sentences on key insights or surprising findings]

Key topics:
- [Bullet point 1]
- [Bullet point 2]
- [Bullet point 3]

[If comparison]: Direct comparison of [Tool A] vs [Tool B] across [X] criteria.
[If best-of]: Covered [X] tools, all focused on [vertical + company size].

Read the full guide: [Link]

#AITools #[VerticalTag, e.g., HRTech] #[TopicTag]

[Optional: Tag a couple of vendors mentioned if appropriate]

```

---

### Template 6B: LinkedIn – Request Board Promotion

```
Built something for [job title, e.g., HR leaders]:

A Request Board where you describe your specific needs (budget, company size, compliance, current stack) and get matched to 2–3 AI tools that actually fit.

No "here’s a list of 50 tools" overwhelm. Just curated matches.

How it works:
1. Fill in what you need (2 minutes)
2. Get curated recommendations within 24 hours
3. Vendors reach out with context, not generic pitches

Free to use: [Link]

Why I built this: [1–2 sentences on the problem: "HR teams don’t have time to vet 30+ AI tools…"]

#HRTech #AITools #FutureOfWork

```

---

### Template 6C: LinkedIn – Monthly Founder Update

```
IndustryLabs – Month [X] update 🚀

Highlights:
📊 Traffic: [X] monthly visitors
📮 Request Board: [X] submissions
🤝 Vendors: [X] total partners, [Y] Premium
📝 Content: [X] articles published (cumulative)

What worked:
- [Learning 1]
- [Learning 2]

What didn’t:
- [Challenge / failed experiment]

Next-month focus:
- [Goal 1]
- [Goal 2]

Building this in public – happy to answer questions or hear feedback.

#BuildingInPublic #HRTech #AITools

```

---

## 7. AIRTABLE QUICK REFERENCE

### Common Field Updates – Quick Guide

**When a Vendor Converts to Premium**

**VENDORS** table:

- `subscription_status = "Premium"`
- `subscribed_verticals` – select vertical(s) (e.g., “HR & Talent”)
- `subscription_start_date = [today]`
- `subscription_renewal_date = [today + 30 days]` (or actual billing cycle)
- `contact_email = [their email]`
- `request_notifications = ✅`

**TOOLS** table (for each of their tools):

- `tier = "Premium"`
- `verification_status = "Verified"`

---

**When Publishing an Article (Next.js + Airtable)**

**ARTICLES** table:

- `title` – final H1 title
- `slug` – URL slug used by Next.js `/articles/[slug]`
- `article_type` – Comparison / Best-of / Guide / Playbook
- `primary_keyword` – main SEO term
- `meta_description` – 150–160 chars
- `content` – full Markdown body
- `status = "Published"`
- `publish_date = [today]`
- `related_tools` – link 3–5 tools if applicable

---

**When Matching a Request**

**REQUESTS** table:

- `matched_tools` – link 2–3 tools
- `notified_vendors` – link Premium vendors of those tools
- `status = "Matched"`
- `response_date = [today]`

---

### Airtable Views – Quick Config

**TOOLS**:

- **Premium Tools**
    - Filter: `tier = "Premium"`
    - Sort: `tool_name` A→Z
- **By Vertical**
    - Group: `primary_vertical`
    - Sort: `tool_name` A→Z
- **Needs Verification**
    - Filter: `verification_status = "Unverified"` AND `tier = "Premium"`
    - Sort: `date_added` (newest first)

**VENDORS**:

- **Active Premium**
    - Filter: `subscription_status = "Premium"`
    - Sort: `company_name` A→Z
- **Renewal This Month**
    - Filter: `subscription_renewal_date` within “this month”
    - Sort: `subscription_renewal_date` ascending
- **Churn Risk**
    - Filter: `churn_risk = "High"`
    - Sort: `last_contact_date` oldest first

**REQUESTS**:

- **New Requests**
    - Filter: `status = "New"`
    - Sort: `submission_date` newest first
- **This Week**
    - Filter: `submission_date` within “this week”
    - Sort: `submission_date` newest first
- **By Source Channel**
    - Group: `source_channel`
    - Sort: `submission_date` newest first

---

## 8. COMMON OBJECTION RESPONSES

(unchanged logic, adapted as needed when you reply)

### Objection 1: “We don’t do directories”

Emphasize Request Board and qualified, context-rich leads rather than passive listing.

### Objection 2: “We don’t have budget”

Offer Free tier, Early Bird 3-month free, and quick ROI framing around 1–2 deals easily covering £99/mo.

### Objection 3: “We’re already on G2 / Capterra”

Position IndustryLabs as vertical, workflow, and intent focused vs generic review directory – complementary, not duplicate.

### Objection 4: “How much traffic / traction do you have?”

If early: be honest, emphasize quality and ICP alignment, offer Early Bird or Free + upgrade path.

If later: share monthly visitors, Request Board volume, leads per vendor, etc.

### Objection 5: “Can we start free and upgrade later?”

“Yes” + explain Free listing now vs Early Bird potentially expiring. Let them choose risk profile.

(Use the full scripts from your v1.1 doc as-is; logic is unchanged.)

---

## 9. PRICING SHEETS & VALUE PROPS

### One-Page Vendor Value Prop (Talking Points)

- Premium = £99/mo per vertical
- Per-vertical: HR, L&D, CS etc.
- High-intent leads with full context, not anonymous clicks
- Early Bird = 3 months free for first 10 Premium partners
- Compare vs paid ads / big directories on cost and lead quality

(Use existing comparison table and ROI example from v1.1; still valid.)

---

## 10. VA TASK TEMPLATES

All VA tasks remain valid with Airtable + Next.js. Just mentally map “CMS” to “Airtable + Next.js site” instead of Softr.

### VA Task 1: Tool Research & Data Entry

### VA Task 2: Article Image Sourcing

### VA Task 3: Vendor Outreach Sending

### VA Task 4: Airtable Data Quality Check

### VA Task 5: Weekly Metrics Report

(Instructions stay the same; only platform names in your head have changed.)

---

## CHANGELOG

**Version 1.0** (Nov 16, 2025):

- Initial resource library
- Vendor outreach templates (6)
- Content checklists (2)
- Request Board response templates (4)
- Onboarding emails (2)
- Retention templates (3)
- Social media templates (3)
- Airtable quick reference
- Objection handling scripts (5)
- Pricing/value props
- VA task templates (5)

**Version 1.1** (Nov 16, 2025):

- Added “Quick Access (Most Used Templates)”
- Improved navigation / anchors

**Version 1.2** (Nov 19, 2025):

- Aligned content workflows with **Next.js + Airtable** architecture
- Updated Pre-Publishing checklist to reference `/articles/[slug]` rendering instead of generic “CMS”
- Clarified Airtable usage as the single source of truth for ARTICLES consumed by the Next.js frontend
- Confirmed all templates remain stack-agnostic where possible (email, outreach, VA tasks unchanged)

---

**USAGE NOTES**

- Treat this as a living library – update scripts when you see better lines in real conversations.
- When something works unusually well (reply rates, conversions), paste that updated wording back here.
- When you truly stop using a template, delete or archive it so the doc stays lean and useful.

**End of RESOURCES v1.2**

---

# CODE DOCUMENTATION & REFERENCES

**Last Updated:** 2025-11-23

**Foundation Phase:** Complete ✅

This section contains links to generated documentation and key reference files in the codebase.

---

## Generated Documentation Files

These files are version-controlled in the repository at `industrylabs-mvp/docs/`:

### 1. CODEBASE_SNAPSHOT.md

**Location:** `docs/CODEBASE_SNAPSHOT.md`

**Purpose:** Complete code structure reference

**Contents:**

- Full project file tree
- Key directory explanations
- Tech stack listing
- Environment variables reference
- Functional module descriptions
- Data flow diagrams

**Use Cases:**

- Onboarding new developers
- Providing context to AI assistants
- Project structure reference
- Code review preparation

**How to Use:**
Upload this file to ChatGPT/Claude when asking about the codebase for full context.

---

### 2. FOUNDATION_SUMMARY.md

**Location:** `docs/FOUNDATION_SUMMARY.md`

**Purpose:** Foundation phase completion summary

**Contents:**

- All completed tasks (TASK-007 through TASK-305)
- Technical achievements and metrics
- Current production status
- Known issues and technical debt
- Next phase preparation

**Use Cases:**

- Project status reporting
- Milestone documentation
- Historical reference
- Handoff documentation

---

### 3. ENV_SETUP.md

**Location:** `ENV_SETUP.md` (root directory)

**Purpose:** Environment configuration guide

**Contents:**

- Resend API setup (Test Mode vs Production)
- Airtable configuration
- Environment variables explanation
- DNS configuration steps (for production email)

**Use Cases:**

- Setting up local development environment
- Deploying to new Vercel projects
- Troubleshooting environment issues
- Onboarding developers

---

## Key Schema Files

### Airtable Schema Reference

**File:** `AIRTABLE_SCHEMA__DATA_MODEL.pdf`

**Status:** Authoritative source of truth

**Version:** 2.2 (Next.js Integration Ready)

**Important Note:**

Always refer to this document for field names, types, and relationships. The actual implementation may have some deviations (documented in Notion's "AIRTABLE SCHEMA & DATA MODEL" → Implementation Notes).

---

### TypeScript Type Definitions

**Location:** `lib/types/`

```
lib/types/
├── request.ts        # Request Board types (RequestFormPayload, API responses)
└── [future types]

```

**Validation Schemas:**

**Location:** `lib/validation/`

```
lib/validation/
└── request.ts        # Zod schema for Request Board validation

```

---

## Reusable Scripts & Utilities

### Test Airtable Connection

**Location:** `scripts/test-airtable-connection.ts`

**Purpose:** Verify Airtable API credentials and table access

**Usage:**

```bash
npx tsx scripts/test-airtable-connection.ts

```

**Output:**

```
✅ Connection successful!
Found X tools in TOOLS table

First tool sample:
- ID: recXXXXXXXXXX
- Fields: ['tool_name', 'tool_slug', ...]
- Tool name: [name]

```

**When to Use:**

- After environment variable changes
- Troubleshooting Airtable integration
- Verifying new field additions

---

## API Routes Documentation

### POST /api/request

**File:** `app/api/request/route.ts`

**Purpose:** Handle Request Board form submissions

**Request Body:**

```tsx
{
  requesterName: string;
  requesterEmail: string;
  requesterCompany: string;
  companySize: "1-50" | "51-200" | "201-500" | "500+";
  vertical: "HR & Talent" | "Learning & Development" | "Customer Support";
  useCase: string;
  timeline: "Immediate" | "1-3 months" | "3-6 months" | "Exploring";
  requirements: string;
  gdprConsent: true;
  // ... other optional fields
}

```

**Response (Success):**

```tsx
{
  success: true,
  requestId: "recXXXXXXXXXX",
  message: "Request submitted successfully...",
  emailSent: true
}

```

**Response (Error):**

```tsx
{
  success: false,
  error: "Validation failed...",
  fieldErrors?: {
    [fieldName]: "Error message"
  }
}

```

**Features:**

- ✅ Zod validation (client + server)
- ✅ Field-level error messages
- ✅ Writes to Airtable REQUESTS table
- ✅ Sends email notification (non-blocking)
- ✅ Auto-detects source channel
- ✅ Captures request source URL

---

## Component Library Reference

### UI Components (shadcn/ui)

**Location:** `components/ui/`

**Installed Components:**

```
alert          - Success/error messages
badge          - Category tags, labels
button         - Primary actions
card           - Content containers
checkbox       - Form checkboxes
input          - Text inputs
label          - Form labels
select         - Dropdown selects
separator      - Visual dividers
textarea       - Multi-line text inputs

```

**Adding New Components:**

```bash
npx shadcn@latest add [component-name]

```

**Documentation:** [https://ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)

---

### Custom Components

**Layout Components:**

```
components/layout/
├── header.tsx          - Main navigation
├── footer.tsx          - Site footer with links
└── container.tsx       - Max-width wrapper

```

**Feature Components:**

```
components/home/        - Homepage-specific components
components/tools/       - Tool-related components (ToolCard)
components/hr/          - HR category page components
components/navigation/  - Breadcrumbs, etc.
components/request/     - Request Board form

```

---

## Helper Functions Reference

### lib/airtable-helpers.ts

**Available Functions:**

```tsx
// Tools
getAllTools(): Promise<Tool[]>
getFeaturedTools(limit?: number): Promise<Tool[]>
getToolsByVertical(vertical: string): Promise<Tool[]>
getToolBySlug(slug: string): Promise<Tool | null>

// Articles
getAllArticles(): Promise<Article[]>
getArticleBySlug(slug: string): Promise<Article | null>
getRelatedToolsForArticle(article: Article): Promise<Tool[]>

```

**Usage Example:**

```tsx
// In a Server Component
import { getAllTools } from "@/lib/airtable-helpers";

export default async function ToolsPage() {
  const tools = await getAllTools();
  return <ToolsGrid tools={tools} />;
}

```

---

### lib/email.ts

**Available Functions:**

```tsx
sendNewRequestEmail(params: {
  requestId: string;
  values: RequestFormValues;
}): Promise<void>

```

**Email Features:**

- HTML and plain text versions
- Formatted with all request details
- Includes request ID for Airtable lookup
- Shows use case and requirements separately
- GB timezone formatting

---

## Code Templates & Patterns

### Creating a New Page with Airtable Data

**Template:**

```tsx
// app/new-page/page.tsx
import { Container } from "@/components/layout/container";
import { getAllTools } from "@/lib/airtable-helpers";
import { mockTools } from "@/lib/mock-data";

export default async function NewPage() {
  // Fetch data with fallback
  let tools;
  try {
    tools = await getAllTools();
    if (tools.length === 0) tools = mockTools;
  } catch (error) {
    console.error("Error fetching tools:", error);
    tools = mockTools;
  }

  return (
    <Container className="py-12">
      <h1>Page Title</h1>
      {/* Your content */}
    </Container>
  );
}

```

---

### Creating a New API Route

**Template:**

```tsx
// app/api/new-endpoint/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createRecord } from "@/lib/airtable";

// Define validation schema
const schema = z.object({
  field: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed" },
        { status: 400 }
      );
    }

    // Write to Airtable
    const record = await createRecord("TABLE_NAME", result.data);

    return NextResponse.json(
      { success: true, id: record.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

```

---

### Creating a New Form Component

**Template:**

```tsx
"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MyForm() {
  const [values, setValues] = useState({ field: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Failed");
        return;
      }

      setSuccess(true);
      setValues({ field: "" }); // Reset
    } catch (err) {
      setError("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="field">Field</Label>
        <Input
          id="field"
          value={values.field}
          onChange={(e) => setValues({ ...values, field: e.target.value })}
          disabled={isSubmitting}
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Success!</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}

```

---

## Development Workflow

### Local Development Setup

**Prerequisites:**

- Node.js 18+ installed
- Git repository cloned
- Environment variables configured

**Steps:**

1. **Install dependencies:**

```bash
   npm install

```

1. **Configure environment:**

```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys

```

1. **Run development server:**

```bash
   npm run dev

```

1. **Open browser:**

```
   <http://localhost:3000>

```

---

### Testing Checklist

**Before committing code:**

- [ ]  Run `npm run build` (ensures TypeScript compiles)
- [ ]  Test on mobile viewport (responsive design)
- [ ]  Verify all forms submit successfully
- [ ]  Check Airtable for new records
- [ ]  Test email notifications (if applicable)
- [ ]  Review console for errors/warnings
- [ ]  Test with network throttling (slow 3G)

---

### Deployment Workflow

**Current Setup:**

- **Platform:** Vercel
- **Branch:** `main` (auto-deploys)
- **URL:** [https://industrylabs.vercel.app](https://industrylabs.vercel.app/)

**Manual Deployment:**

1. **Commit and push:**

```bash
   git add .
   git commit -m "feat: description"
   git push origin main

```

1. **Vercel auto-deploys:**
    - Build takes ~2-3 minutes
    - Automatic preview for PRs
    - Production deployment on `main`
2. **Verify deployment:**
    - Check Vercel dashboard for build logs
    - Visit production URL
    - Test critical user flows

---

## Troubleshooting Resources

### Common Issues & Solutions

**Issue: "Cannot find module '@/lib/...'"**

- Solution: Check `tsconfig.json` paths configuration
- Verify file exists at expected location

**Issue: Airtable "Unauthorized" error**

- Solution: Verify `AIRTABLE_API_KEY` in environment variables
- Check API key has correct permissions

**Issue: Email not sending**

- Solution: Verify `RESEND_API_KEY` is set
- Check email is verified in Resend dashboard (Test Mode)
- Check Vercel logs for error details

**Issue: Build fails with TypeScript errors**

- Solution: Run `npm run build` locally to see full errors
- Fix type mismatches
- Ensure all imports are correct

**Issue: Page shows mock data instead of Airtable data**

- Solution: Check console for Airtable errors
- Verify table names are exactly correct (case-sensitive)
- Test Airtable connection with test script

---

## External Resources

### Official Documentation

- **Next.js:** [https://nextjs.org/docs](https://nextjs.org/docs)
- **TypeScript:** [https://www.typescriptlang.org/docs](https://www.typescriptlang.org/docs)
- **Tailwind CSS:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **shadcn/ui:** [https://ui.shadcn.com](https://ui.shadcn.com/)
- **Airtable API:** [https://airtable.com/developers/web/api/introduction](https://airtable.com/developers/web/api/introduction)
- **Resend API:** [https://resend.com/docs](https://resend.com/docs)
- **Zod:** [https://zod.dev](https://zod.dev/)

### Learning Resources

**Next.js App Router:**

- [https://nextjs.org/learn](https://nextjs.org/learn)

**TypeScript Best Practices:**

- [https://www.typescriptlang.org/docs/handbook/intro.html](https://www.typescriptlang.org/docs/handbook/intro.html)

**React Server Components:**

- [https://react.dev/reference/rsc/server-components](https://react.dev/reference/rsc/server-components)

---

## Version Control

### Branch Strategy

- `main` - Production branch (protected)
- Feature branches: `feature/task-xxx-description`
- Hotfixes: `hotfix/description`

### Commit Convention

**Format:** `type: description`

**Types:**

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**

```
feat: add Request Board email notifications
fix: resolve TypeScript build errors in request form
docs: update CODEBASE_SNAPSHOT with new components
refactor: optimize Airtable data fetching

```

---

## Contact & Support

### Getting Help

**For code-related questions:**

- Review this documentation
- Check `docs/CODEBASE_SNAPSHOT.md`
- Search codebase for examples

**For Airtable schema questions:**

- Refer to `AIRTABLE_SCHEMA__DATA_MODEL.pdf`
- Check Notion "AIRTABLE SCHEMA & DATA MODEL" for implementation notes

**For deployment issues:**

- Check Vercel dashboard logs
- Review environment variables
- Consult `ENV_SETUP.md`

---

## Quick Links

| Resource | Location | Purpose |
| --- | --- | --- |
| Codebase Snapshot | `docs/CODEBASE_SNAPSHOT.md` | Full code structure |
| Foundation Summary | `docs/FOUNDATION_SUMMARY.md` | Project milestones |
| Environment Setup | `ENV_SETUP.md` | Configuration guide |
| Airtable Schema | `AIRTABLE_SCHEMA__DATA_MODEL.pdf` | Data model reference |
| Production Site | [https://industrylabs.vercel.app](https://industrylabs.vercel.app/) | Live website |
| Vercel Dashboard | [https://vercel.com/dashboard](https://vercel.com/dashboard) | Deployment management |
| Airtable Base | [Your Airtable URL] | Database management |
| Resend Dashboard | [https://resend.com/dashboard](https://resend.com/dashboard) | Email management |

---

**Last Updated:** 2025-11-23

**Maintained By:** IndustryLabs Development Team

**Next Review:** When starting Growth Phase

---

**End of Resources Documentation**