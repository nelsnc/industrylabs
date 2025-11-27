# The IndustryLabs Documentation Guide

**Version**: 1.3

**Last Updated**: November 20, 2025

**Purpose**: How to work efficiently with the 6-document system from Day 1 to Month 12, including web development with Claude Code and GPT-5

---

## Table of Contents

1. Documentation System Overview
2. Core Work Rhythm
3. Document Usage Quick Reference
4. AI Assistant Management (Claude Code + GPT-5 Collaboration)
5. Complete Workflow
6. Document Update Rules
7. Version Management
8. FAQ
9. Success Indicators
10. Week 1 Action Checklist

---

## 1. Documentation System Overview

You now have a **6-document system**, each with clear responsibilities and no overlap:

`📄 PROJECT MASTER PLAN
├─ Strategy + Business model + Long-term roadmap
├─ Answers: "What are we building? Why?"
└─ Update frequency: Quarterly (Month 3, 6, 9, 12)

📄 EXECUTION HUB
├─ Current phase tasks + This week's focus + Rhythm management
├─ Answers: "What do I do this week? Today?"
└─ Update frequency: 1-2 times per week

📄 AIRTABLE SCHEMA & DATA MODEL
├─ Data structure definition + Field descriptions + Relationship mapping
├─ Answers: "How is data stored? What do fields mean?"
└─ Update frequency: 1-2 times per month (when fields change)

📄 PIPELINES - Content & Vendor Tracking
├─ Workflows + Stage definitions + Templates
├─ Answers: "What's the process for content/vendors?"
└─ Update frequency: Quarterly optimization

📄 RESOURCES - Templates, Schema, and Scripts
├─ Email templates + Checklists + Quick reference
├─ Answers: "How do I write this email? What's this checklist?"
└─ Update frequency: Quarterly based on effectiveness

📄 DECISION LOG
├─ Major decision records + Reasoning + Outcomes
├─ Answers: "Why did we decide this? What was the result?"
└─ Update frequency: Weekly for new decisions`

---

## 2. Core Work Rhythm

### Daily Rhythm

`Every morning (3 minutes)
├─ Daily Check-in (use AI assistant)
├─ Confirm 1-3 tasks for today
└─ Start execution

Work time (6-8 hours)
├─ Execute tasks from Execution Hub
├─ Check Resources for templates when needed
└─ Open AI assistant conversations for help

End of day (optional, 2 minutes)
└─ Quick note: What was completed, what continues tomorrow`

### Weekly Rhythm

`Monday morning (30 minutes)
├─ Read Execution Hub "This Week Top 3"
├─ Read "Active Tasks This Week"
└─ Mark priorities in calendar/todo app

Tuesday-Thursday (6-8 hours daily)
└─ Execute tasks, use AI assistants for help

Friday afternoon (1 hour)
├─ Combined Weekly Review (with AI assistant)
│   ├─ Part 1: Update Execution Hub
│   └─ Part 2: Update Decision Log
└─ Summarize week, plan next week`

### Monthly Rhythm

`Last Sunday of month (1.5 hours)
├─ Update Execution Hub (Month summary + Next month)
├─ Review Decision Log outcomes (if applicable)
└─ Update Current Metrics`

### Quarterly Rhythm

`End of quarter (Month 3, 6, 9, 12) (2-3 hours)
├─ Decision Log Pattern Analysis
├─ Gate Decision (continue/pivot?)
├─ Update Master Plan (if major adjustments needed)
└─ Optimize Pipelines and Resources (based on actual usage)`

---

## 3. Document Usage Quick Reference

### Scenario 1: Starting work each morning

**Your actions**:

1. Open new AI conversation (or continue this week's conversation)
2. Send **Daily Check-in Prompt**
3. AI helps confirm 1-3 tasks for today
4. Start execution

**Time**: 3 minutes

**No documents needed** (AI references Execution Hub logic)

### Scenario 2: Writing vendor outreach email

**Your actions**:

1. Open **Resources** document
2. Jump to "Quick Access" section
3. Click "Vendor Outreach - Tier 1 (1A)" link
4. Copy template
5. Personalize [First Name], [Specific feature]
6. Send

**Time**: 5 minutes (much faster than writing from scratch)

### Scenario 3: Pre-publishing article check

**Your actions**:

1. Open **Resources**
2. Jump to "Quick Access"
3. Click "Pre-Publishing SEO Checklist"
4. Check each item ✓
5. Publish after all pass

### Scenario 4: Updating vendor to Premium in Airtable

**Your actions**:

1. Open **Airtable Schema** document
2. Search "When Vendor Converts to Premium"
3. Follow checklist to update fields

### Scenario 5: Friday review - Update Hub + Decisions at once

**Your actions**:

1. New AI conversation: "Week X Review"
2. Upload **Execution Hub** + **Decision Log**
3. Send **Combined Weekly Review Prompt**
4. AI processes in two steps:
    - Part 1: Update Execution Hub (preview - approve - output)
    - Part 2: Update Decision Log (preview - approve - output)

### Scenario 6: Unsure what type of conversation to start

**Your actions**:

1. New AI conversation
2. Send **Universal Conversation Starter**
3. AI helps identify type and guide next steps

---

## 4. AI Assistant Management

> This section covers how to use Claude Code (VS Code extension) and GPT-5 (ChatGPT/OpenAI) together for web development and all other tasks.
> 

### 4.1 Your AI Development Stack

**Claude Code (VS Code Extension)**

- Model: Claude Sonnet 4.5
- Best for:
    - Multi-file navigation and edits in repo
    - Implementing features in existing code structure
    - Refactoring, migrations, repetitive boilerplate
    - Writing tests and reviewing code
    - Long explanations and API design

**GPT-5 (ChatGPT / OpenAI)**

- Access via: ChatGPT interface, API
- Best for:
    - System design, architecture decisions, trade-off analysis
    - Complex TypeScript typing and API design
    - Generating or reviewing important docs
    - Code review from a different perspective
    - Planning and breaking down complex tasks

**When to Use Each**

```
Task TypePrimary ToolSecondary ToolArchitecture planningGPT-5Claude Code (review)File creationClaude CodeGPT-5 (cross-check critical files)Multi-file refactoringClaude CodeGPT-5 (review plan)Code reviewGPT-5Claude Code (if available)Bug debuggingEither (whichever is open)Other (if stuck)Small editsEitherNot neededComplex algorithmsBoth (cross-check)-
```

---

### 4.2 Multi-Model Collaboration Principles

**1. Both models are "pair programming partners"**

- Claude Code: Better for long explanations, design, task breakdown, tests, code review
- GPT-5: Better for planning, architecture, cross-checking logic, documentation
- You are the Tech Lead; they provide suggestions, you make decisions

**2. Cross-check critical work**

- For important features, ask both models
- If answers differ significantly:
    - Have one model review the other's answer
    - Run tests locally
    - Choose based on your understanding

**3. Usage distribution strategy**

- Structural work (high token: design, long explanations) → One model primarily
- Batch code generation (many small functions) → Split between both
- If one model's quota is running low → Use it only for review/QA

**4. Always test locally**

- All AI-generated code can have bugs
- Run `npm run lint`, `npm run build`, `npm run dev`
- For "clever" changes, get the other model to review

---

### 4.3 Conversation Types

**Type 1: Daily Check-in (every morning)**

- Purpose: Confirm today's tasks
- Frequency: Once per workday
- Naming: "Week 1 Daily" or "Nov 2025 Daily"
- Save: Optional

**Type 2: Execution Task (specific work)**

- Purpose: Write article, do research, implement feature
- Frequency: Multiple per day
- Naming: "Content - Best AI HR Tools" / "Dev - Build Articles Page"
- Save: Important tasks only

**Type 3: Weekly Review (Friday)**

- Purpose: Update Execution Hub + Decision Log
- Frequency: Once per Friday
- Save: Required

**Type 4: Strategy/Thinking (decisions)**

- Purpose: Make decisions, analyze problems, adjust direction
- Frequency: Every 1-2 weeks
- Save: Required

**Type 5: Monthly/Quarterly Review**

- Purpose: Phase summary, Gate Decision
- Frequency: Once per month/quarter
- Save: Required

---

### 4.4 Conversation Naming Standards

**Good naming:**

- "Week 1 Review - Execution Hub"
- "Content - Best AI HR Tools 2026"
- "Dev - Next.js Articles Page"
- "Dev - Request Board Matching Logic"
- "Strategy - Pricing Decision"

**Bad naming:**

- "help"
- "new chat"
- "test"

---

### 4.5 When to Start New vs Continue Conversation

**Start new conversation:**

- New task (new page, new API, new article)
- New week review
- New strategy/architecture discussion

**Continue old conversation:**

- Further implementation of same feature
- Follow-up analysis of same decision
- Same week's Daily Check-ins

---

### 4.6 When to Upload Documents

**Must upload documents:**

- When asking AI to update Execution Hub, Decision Log, Master Plan
- When doing quarterly/monthly pattern analysis

**Don't need to upload documents:**

- Writing code, debugging, technical questions
- Daily check-in
- Using templates from Resources

---

### 4.7 Website Development: Multi-Model Workflow

### Scenario A: Implementing a new Next.js page `/articles/[slug]`

**Step 1 - Architecture & Data Flow Design (GPT-5)**

Prompt example:

`You are my Next.js Tech Lead.

I want to implement the `/articles/[slug]` page, fetching Markdown content from Airtable's ARTICLES table and rendering it.

Please help me design:
- What files are needed (app router structure)
- Data fetching approach (SSG, SSR, or ISR)
- How to organize utility functions like `lib/airtable.ts`

Return: File structure + responsibilities for each file.`

GPT-5 provides overall structure and recommendations.

---

**Step 2 - Code Skeleton Generation (Claude Code in VS Code)**

In Claude Code panel in VS Code:

`Based on this structure, implement the initial version in Next.js 14 app router:

[Paste GPT-5's structure]

Requirements:
- Use TypeScript
- Use `lib/airtable.ts` with `getArticleBySlug(slug: string)` function
- `/app/articles/[slug]/page.tsx` should:
  - Read slug parameter
  - Call Airtable function
  - Render Markdown as HTML (use react-markdown)`

Claude Code outputs specific code directly in your files.

---

**Step 3 - Cross-Review (GPT-5)**

Copy key files generated by Claude Code and paste to GPT-5:

`Below is the code generated by Claude Code for page.tsx and lib/airtable.ts.

Please:
1. Check for potential bugs
2. Optimize type definitions
3. Suggest the three most valuable improvements with complete updated versions`

GPT-5 will point out:

- Type safety issues
- Unhandled exceptions
- SEO/performance/DX improvements

You then integrate the feedback.

---

**Step 4 - Local Validation**

1. Run locally:
    - `npm run lint`
    - `npm run test` (if tests exist)
    - `npm run dev` - open browser and check
2. When encountering bugs:
    - Share error stack with either model
    - Compare debugging suggestions
    - Merge best advice

---

### Scenario B: Complex Logic (Request Board Matching Algorithm)

**Strategy:**

- Claude Code/GPT-5: Explain + pseudocode + test design
- Claude Code: Implement based on pseudocode + pass tests

Example flow:

1. Ask GPT-5:
    - Write pseudocode based on business rules and test cases
2. Give pseudocode + tests to Claude Code:
    - Implement function in TypeScript to pass tests
3. Paste implementation + tests back to GPT-5:
    - Review edge cases (empty arrays, null values, unusual budgets)

---

### 4.8 Prompt Templates for Model Roles

**For Claude Code (architectural/implementation):**

`You are my primary architect and code reviewer, responsible for:
- Designing interfaces
- Writing pseudocode
- Writing tests
- Reviewing code from other sources`

**For GPT-5 (planning/review):**

`You are my planning and architecture consultant, responsible for:
- System design and trade-off analysis
- Breaking down complex tasks into steps
- Providing alternative perspectives
- High-level code review`

**For cross-checking:**

`Below is code written by another AI model. Please code review only:
- Don't rewrite all code
- Only point out bugs and obvious improvements
- If changes needed, fix only the top 3 issues with updated versions`

This gives you control over:

- Who creates solutions
- Who implements
- Who reviews

And you can switch roles when usage is tight.

---

### 4.9 When to Use One Model vs Both

**One model is enough:**

- Fixing a single line, small bug
- Writing a small piece of CSS, UI tweaks
- Adding a simple util function

Use whichever is currently open.

**Better to use both:**

- Designing key data structures (Article, Request, Vendor, MatchingResult)
- Writing complex pages (Request Board form + matching logic + Airtable writes)
- Security, billing, permission logic
- Refactoring important modules (e.g., pages router → app router migration)

High-cost bugs make cross-checking worth it.

---

## 5. Complete Workflow

### 5.1 Daily Workflow

**Morning (9:00 AM, 3 minutes)**

1. Open AI conversation (continue weekly or start new)
2. Send Daily Check-in Prompt:

`Daily Check-in for [Day/Date]

Context:
- Current phase: [Month X, Week Y]
- Yesterday's progress: [brief note if continuing work]

Please:
1. Review my Execution Hub context (you have it in project knowledge)
2. Suggest 1-3 tasks for today based on:
   - This week's priorities
   - Current blockers
   - Upcoming deadlines
3. Recommend which task to start with

Format: Clear numbered list with time estimates.`

1. AI suggests 1-3 tasks
2. Choose first task

---

**Execution (9:15 AM - 5:00 PM)**

Example: Task is "Implement articles list page"

1. Open conversation: "Dev - Articles List Page"
2. Ask GPT-5 to break down task (components, data flow, pagination)
3. Use Claude Code in VS Code to generate initial code
4. Paste key code back to GPT-5 for review
5. Test locally
6. Update Execution Hub task status when complete

For non-dev tasks (content, vendor outreach), follow similar pattern but use appropriate templates from Resources.

---

**End of Day (optional, 5:30 PM, 2 minutes)**

Quick note in todo app or conversation:

`Today completed:
- [Task 1]
- [Task 2]

Tomorrow continuing:
- [Task 3]

Blockers: [if any]`

---

### 5.2 Weekly Workflow

**Monday Morning (30 minutes)**

1. Open Execution Hub
2. Read "This Week Top 3"
3. Read "Active Tasks This Week"
4. Mark priorities in calendar
5. (Optional) Send Monday Planning Prompt to AI for additional context

---

**Tuesday-Thursday (full days)**

Execute tasks following daily workflow.

---

**Friday Afternoon (1 hour)**

Combined Weekly Review:

1. New AI conversation: "Week X Review"
2. Upload Execution Hub + Decision Log
3. Send Combined Weekly Review Prompt:

`Week [X] Review - Combined Update

Please help me:

PART 1 - UPDATE EXECUTION HUB
1. Review this week's completed tasks
2. Update "Last Week Summary"
3. Update "Current Metrics" if I provide data
4. Propose "Next Week" priorities based on roadmap
5. Show me preview for approval

PART 2 - UPDATE DECISION LOG
1. Check if any decisions from this week need recording
2. If yes, draft new entries with proper format
3. Show me preview for approval

Context:
[Paste brief notes about week's work, decisions made, metrics if available]`

1. Review Part 1, approve, get output
2. Review Part 2, approve, get output
3. Copy updates back to documents

---

### 5.3 Monthly Workflow

**Last Sunday of Month (1.5 hours)**

1. New conversation: "Month X Summary"
2. Upload Execution Hub
3. Send Monthly Review Prompt:

`Monthly Review - Month [X]

Please help me:

1. Summarize Month [X] achievements against goals
2. Update Monthly Milestones section
3. Identify top 3 wins and top 3 challenges
4. Propose Month [X+1] priorities
5. Check if any Gate criteria need evaluation

Current Metrics:
[Paste metrics if available]

Key Events:
[List major events from the month]`

1. Review, approve, update Execution Hub
2. If any important decisions were made, update Decision Log with outcomes

---

### 5.4 Quarterly Workflow

**End of Quarter (Month 3, 6, 9, 12) (2-3 hours)**

1. New conversation: "Q[X] Pattern Analysis"
2. Upload Decision Log + Execution Hub
3. Send Quarterly Analysis Prompt:

`Quarterly Pattern Analysis - Q[X]

Please analyze:

1. DECISION PATTERNS
   - Review all decisions from past 3 months
   - Identify recurring themes
   - Highlight successful vs. problematic patterns

2. EXECUTION PATTERNS
   - What worked well in execution rhythm?
   - What slowed us down?
   - Suggested improvements

3. GATE DECISION
   - Are we on track for Yellow Zone (£5-8K MRR)?
   - Should we continue, adjust, or pivot?
   - Recommendation with reasoning

4. NEXT QUARTER PRIORITIES
   - Based on learnings, what should Q[X+1] focus on?`

1. Discuss findings
2. Make Gate Decision
3. Update Master Plan if major adjustments needed
4. Optimize Pipelines/Resources based on usage

---

## 6. Document Update Rules - Two-Step Approval

All system document updates must follow **two-step approval**:

### Step 1: Preview

AI generates proposed updates and shows you preview.

### Step 2: Approval & Output

You explicitly approve with: "Approved - update [document name]"

Then AI outputs complete updated version.

### Applies to These Documents:

- Project Master Plan
- Execution Hub
- Airtable Schema & Data Model
- Pipelines - Content & Vendor Tracking
- Resources - Templates, Schema, and Scripts
- Decision Log

### Does NOT Apply to:

- Code in Next.js project (managed by Git/GitHub)
- Quick notes or drafts
- Conversation transcripts

---

## 7. Version Management

### Document Naming Convention

`[YYYY-MM-DD]_[DOCUMENT_NAME]_v[X.Y].pdf

Example:
2025-11-20_PROJECT_MASTER_PLAN_v2.0.pdf
2025-11-20_EXECUTION_HUB_v1.3.pdf`

### Directory Structure

`IndustryLabs_Documentation/
├── 00_System_Docs/
│   ├── Current/ (always latest versions)
│   └── Archive/ (previous versions)
├── 01_Strategy/
├── 02_Operations/
├── 03_Content/
├── 04_Vendor/
├── 05_Legal_Compliance/
└── 06_Dev/
    ├── Architecture_Decisions/
    ├── API_Design/
    └── UI_Wireframes/`

Code is managed separately in GitHub repository.

---

## 8. FAQ

**Q1: How much time should I spend on documentation?**

A: Very little after setup:

- Daily: 0 minutes (AI handles check-in)
- Weekly: 15-20 minutes (Friday review)
- Monthly: 30 minutes
- Quarterly: 1-2 hours

**Q2: What if I skip a weekly review?**

A: Not ideal, but survivable. Do it next week and note "combined 2-week review."

**Q3: Can I change document structure?**

A: Yes, but record decision in Decision Log with reasoning.

**Q4: What if AI's updates don't match my thinking?**

A: Don't approve. Give feedback: "Change X to Y because..." and ask for revised preview.

**Q5: Do I need to backup documents?**

A: Yes. Weekly backup to cloud storage (Google Drive, Dropbox, etc.).

**Q6: Can I work without AI assistants?**

A: Yes, but you'll spend more time on administrative tasks. The system works without AI, just less efficiently.

**Q7: What if Claude Code and GPT-5 give conflicting advice?**

A:

1. Ask each to review the other's suggestion
2. Run tests locally
3. Trust your judgment and context
4. Record the decision and reasoning in Decision Log

**Q8: How do I know which model to use?**

A: Default rule:

- Planning/architecture → GPT-5
- Implementation in VS Code → Claude Code
- Review → Either or both
- If unsure → Ask whichever is open

**Q9: Is the two-step approval too slow?**

A: It takes 30 seconds but prevents costly mistakes. Worth it for system documents.

**Q10: What if I want to change from 6 documents to something else?**

A: Possible, but wait until Month 3. Don't change systems while learning them.

**Q11: Why use both Claude Code and GPT-5? Isn't it too complex?**

A:

- Core reasons:
    1. **Different strengths**: Each model excels at different tasks
    2. **Cross-checking**: Complex logic reviewed by two "brains" catches more bugs
    3. **Backup**: If one model is unavailable, you have the other
- Not forced to use both for everything:
    - Small changes: One model is fine
    - Big decisions/core logic: Both models safer
- Start simple:
    - Use Claude Code as default in VS Code
    - When something feels tricky or high-impact, get GPT-5's second opinion

---

## 9. Success Indicators

**Week 2:**

- You can complete Daily Check-in in <5 minutes
- You know which document to check for each type of question

**Month 1:**

- Friday reviews take <30 minutes
- You rarely search for "where did I write that?"
- AI conversations are organized with clear naming

**Month 2-3:**

- Document updates feel natural, not burdensome
- You've developed rhythm of Claude Code + GPT-5 for key dev tasks
- You can find any information in <2 minutes
- You trust the system enough to delegate tasks based on it

**Month 6:**

- The system adapts to your needs with minor optimizations
- You've made 15+ good decisions tracked in Decision Log
- Documents guide rather than constrain your work

---

## 10. Week 1 Action Checklist

**Day 0: Setup**

- [ ]  Create `IndustryLabs_Documentation` folder
- [ ]  Put 6 documents in `00_System_Docs/Current/`
- [ ]  Create GitHub repo for Next.js project
- [ ]  Install Claude Code extension in VS Code
- [ ]  Verify GPT-5 access via ChatGPT

**Day 1: First Real Day**

- [ ]  Morning: Daily Check-in with AI
- [ ]  Execute TASK-001 or first development task
- [ ]  Open "Dev - Foundation Setup" conversation
- [ ]  Use Claude Code in VS Code following Section 4 guidelines
- [ ]  End of day: Quick note on progress

**Day 2-4: Build Rhythm**

- [ ]  Daily Check-in each morning
- [ ]  Work on priority tasks
- [ ]  Use Resources templates when needed
- [ ]  Practice Claude Code + GPT-5 collaboration on at least one task

**Day 5 (Friday): First Review**

- [ ]  Afternoon: Combined Weekly Review
- [ ]  Update Execution Hub
- [ ]  Record any decisions in Decision Log
- [ ]  Plan Week 2 priorities

**Weekend:**

- [ ]  (Optional) Read through all 6 documents once
- [ ]  (Optional) Set up backup system

---

## 11. Advanced Tips

### 11.1 Create Custom Prompts for Development

**Example: "Cross-check Code Prompt"**

`You are a Code Reviewer.

The code below was generated by another AI model (either Claude Code or GPT-5).

Please:
1. Point out potential bugs
2. Identify type safety issues or unhandled edge cases
3. Fix only the top 3 issues and provide updated version

Code:
[paste code here]`

Create two versions:

- For GPT-5 (focus on architecture and type design)
- For Claude Code (focus on implementation and code patterns)

---

## 12. Version History

**v1.0** (2025-11-16)

- Initial Documentation Guide
- Defined 6-document system and overall rhythm

**v1.1** (2025-11-16)

- Added conversation management, Two-Step Approval flow
- Added extensive prompt templates and Week 1 checklist

**v1.2** (2025-11-19)

- Added multi-model collaboration (Claude + Codex concept)
- Added Section 4.6 on web development collaboration
- Expanded execution workflow for code development

**v1.3** (2025-11-20)

- Updated for actual tooling: Claude Code (VS Code extension) + GPT-5
- Removed references to Codex (not used)
- Clarified Claude Code = VS Code extension, not standalone app
- Updated all prompts and workflows for real development setup
- Added clearer guidance on when to use each model
- Simplified multi-model workflow based on actual capabilities

---

**END OF THE INDUSTRYLABS DOCUMENTATION GUIDE v1.3**

---

## Key Changes in v1.3:

1. **Corrected Tool Names:**
    - Claude Code = VS Code extension (not separate app)
    - GPT-5 via ChatGPT (not "Codex")
    - Removed confusion about multiple tools
2. **Clearer Model Roles:**
    - Claude Code: Implementation in VS Code
    - GPT-5: Planning, architecture, review
    - Both: Critical path cross-checking
3. **Simplified Workflow:**
    - Removed overly complex multi-model scenarios
    - Focused on practical "when to use which" guidance
    - Added realistic examples based on your actual setup
4. **Updated All Sections:**
    - Section 4 completely rewritten for accuracy
    - Removed Chinese language (was mixed in v1.2)
    - All prompts and examples now match your tools