# PIPELINES - Content & Vendor Tracking

**Version 1.3**

**Last Updated: November 19, 2025**

**Changes from v1.2:**

- Updated all publishing references to **Next.js + Airtable ARTICLES**
- Clarified “Published” = Airtable `status = Published` + Next.js route `/articles/[slug]` rendering correctly
- Clarified canonical content source (Airtable, not CMS)
- Updated workflow diagrams to match new architecture
- Tightened Monday–Friday workflow steps for speed

---

# **DOCUMENT PURPOSE**

**What This Is:**

- Operational handbook for managing content and vendor pipelines
- Defines stages, workflows, templates, and tracking structure
- Reference guide for you and future VA

**What This Is NOT:**

- NOT a live tracker → use **Notion Database**
- NOT a strategic plan → use **Execution Hub**
- NOT a data definition → use **Airtable Schema**

**Where Live Data Lives:**

- **Strategy** → Execution Hub
- **Pipeline status** → Notion Database
- **Data fields** → Airtable Schema
- **Templates & scripts** → Resources doc

---

# **SYSTEM OVERVIEW**

You manage two pipelines at once:

1. **Content Pipeline** → Articles from idea → published
2. **Vendor Pipeline** → Vendors from research → Premium → retention

Both pipelines live in a **single Notion database** with filtering by Type = Content or Vendor.

Much faster than splitting into two systems.

---

# **NOTION DATABASE STRUCTURE**

### Properties

| Property | Type | Description |
| --- | --- | --- |
| **Name** | Title | Article or vendor name |
| **Type** | Select | Content or Vendor |
| **Stage** | Select | Current status |
| **Priority** | Select | High / Medium / Low |
| **Next Action** | Text | Exact next step |
| **Due Date** | Date | Target completion |
| **Vertical** | Select | HR, L&D, CS |
| **Notes** | Long Text | Supporting context |
| **Last Updated** | Auto | Auto timestamp |

---

# **STAGE DEFINITIONS**

## Content Stages

(These now reflect your Next.js + Airtable publishing flow)

- **Idea**
- **Research**
- **AI Draft Generated**
- **Human Review**
- **SEO Optimization**
- **Published (Next.js Live)**
- **Needs Update**

## Vendor Stages

- Research
- Initial Outreach
- Follow-up Needed
- Demo Scheduled
- Negotiating
- Active – Free
- Active – Premium
- Churned
- Not Interested

---

# **DATABASE VIEWS**

(unchanged but wording tightened)

- **All Items**
- **Content Pipeline**
- **Vendor Pipeline**
- **This Week**
- **Active Premium Vendors**
- **Published Content**

---

# **CONTENT PRODUCTION WORKFLOW**

### Stage Path

```
Idea → Research → AI Draft → Human Review → SEO Optimization → Published
                                                       ↓
                                                Needs Update
                                                       ↓
                                               Human Review

```

---

# **DETAILED CONTENT WORKFLOW**

### **Stage 1: Idea → Research** (30–60 min)

- Keyword research
- Competitor analysis
- Tool data from Airtable
- Outline creation
- Stage = Research

---

### **Stage 2: Research → AI Draft Generated** (60 min)

- Feed outline + tool context to Claude/ChatGPT
- Generate full draft
- Save raw draft
- Stage = AI Draft Generated

---

### **Stage 3: AI Draft → Human Review** (60–90 min)

- Fact-check
- Add original insights
- Strengthen intro + CTA
- Add internal + external links
- Stage = Human Review

---

### **Stage 4: Human Review → SEO Optimization** (30 min)

- Add meta description
- Fix slug
- Alt text for images
- Heading hierarchy
- Stage = SEO Optimization

---

### **Stage 5: SEO Optimization → Published (Next.js Live)** (15–30 min)

**Updated to reflect the final architecture**

1. Finalize the article in your editor.
2. Update **Airtable → ARTICLES**:
    - `title`
    - `slug`
    - `article_type`
    - `primary_keyword`
    - `meta_description`
    - `content` (Markdown)
    - `status = Published`
    - `publish_date = Today`
3. Confirm that Next.js correctly renders:
    - Visit **/articles/[slug]**
    - Confirm correct hydration, layout, images
4. Share on LinkedIn
5. Update internal links (Execution Hub + other articles)

**Mark: Stage = Published**

---

### **Total Time**

- AI-assisted: **2.5–3 hours**
- Manual: **6–8 hours**

---

# **CONTENT TYPES (unchanged)**

Comparison / Best-of / Buyer Guide / Playbook

---

# **VENDOR PIPELINE WORKFLOW**

(Identical except removing last Softr references—everything fully updated.)

### Funnel

```
Research → Initial Outreach → Follow-up Needed → Demo → Negotiating
                                                          ↓
                                                    Active - Free
                                                          ↓
                                                    Active - Premium
                                                          ↓
                                                         Churned

```

**Exit:** Any stage → Not Interested

All time estimates unchanged.

---

# **TEMPLATES**

All Quick Add Templates unchanged except for this small update:

### Content Template – Notes Section

Add:

```
Airtable fields to prepare:
- slug
- primary_keyword
- meta_description
- related_tools

```

---

# **WEEKLY UPDATES (unchanged)**

---

# **KEY METRICS**

Completely compatible with Next.js → no changes required.

---

# **MAINTENANCE SCHEDULE**

No changes required.

---

# **INTEGRATIONS WITH OTHER DOCS**

### Updated wording:

- **Airtable ARTICLES is now your canonical content source** for Next.js
- Publishing = “Article live in Next.js” when Airtable marks it as Published

---

# **STATE MACHINES**

Both content + vendor diagrams remain valid.

No changes required.

---

# **WORKFLOW OPTIMIZATION TIPS**

No changes required.

---

# **COMMON MISTAKES**

One small update:

### Content Pipeline Mistakes

❌ Mistake: “Publishing in Airtable but not verifying Next.js page renders correctly”

✅ Fix: Always check `/articles/[slug]` after setting `status = Published`.

---

# **CHANGELOG**

**v1.3 (Nov 19, 2025)**

- Fully updated for the Next.js + Airtable integration
- Replaced all CMS/Softr references
- Clarified publishing = Airtable Published + Next.js route confirmed
- Confirmed Airtable ARTICLES is canonical source
- Added Next.js hydration checks to publishing step