Tezi (Max) — Sourcing & Talent Intelligence: Strategic Analysis of the Autonomous Recruiting Agent

1. Executive Summary

The global Talent Acquisition (TA) landscape is currently navigating a profound structural inflection point, characterized by the transition from "digitized" workflows to "autonomous" agency. For the past two decades, the primary function of recruitment technology—manifested in Applicant Tracking Systems (ATS) and Candidate Relationship Management (CRM) platforms—has been to digitize the filing cabinet, creating systems of record that rely entirely on human manipulation to function. Tezi, a Menlo Park-based startup founded in 2024, represents the vanguard of the next generation: Agentic AI.

Tezi's flagship product, "Max," is not marketed as a software tool but as an "autonomous recruiting partner".1 This distinction is fundamental to the company's strategic positioning. While traditional tools function as passive repositories of data, Max operates as an active agent, capable of executing complex, multi-step workflows—sourcing, screening, scheduling, and communicating—with a degree of autonomy that previously required human intervention. Backed by a $9 million Seed round led by 8VC and Audacious Ventures 2, Tezi aims to solve the "Iron Triangle" of recruiting: the historic trade-off between speed, quality, and cost.3

This report provides an exhaustive analysis of Tezi's operational architecture, market positioning, and technological infrastructure. It examines the company's attempt to democratize "99th percentile" recruiting heuristics through Large Language Models (LLMs) and assesses the viability of its "Service-as-Software" business model in a highly regulated and competitive market. The analysis suggests that while Tezi offers a compelling Return on Investment (ROI) by potentially displacing costly external agencies and reducing time-to-hire, its long-term success will depend on its ability to navigate the "Black Box" trust paradox in enterprise adoption, maintain strict compliance with emerging AI regulations like NYC Local Law 144 and GDPR, and integrate seamlessly with the entrenched oligopoly of legacy ATS providers.

2. The Evolution of Talent Acquisition Technology

To understand Tezi's strategic significance, one must first contextualize it within the broader historical arc of HR technology. The industry is currently shifting from Generation 3 (Cloud/SaaS) to Generation 4 (Agentic AI), a move that fundamentally alters the economic and operational logic of hiring.

2.1 The Four Generations of Recruiting Tech

The progression of recruiting technology has been defined by increasing levels of abstraction and automation.

Generation

Era

Primary Technology

Core Function

Human Role

Representative Players

Gen 1

1990s

On-Premise Software

Digitization: Moving paper resumes to digital storage.

Data Entry & Retrieval

Taleo, BrassRing

Gen 2

2000s

Web 1.0 / Job Boards

Aggregation: Centralizing job postings and candidate visibility.

Search & Filter

Monster, CareerBuilder

Gen 3

2010s

Cloud SaaS / CRM

Engagement: Passive candidate sourcing and pipeline management.

Sourcing & Outreach

LinkedIn Recruiter, Greenhouse, Gem

Gen 4

2024+

Agentic AI

Autonomy: End-to-end execution of complex workflows.

Supervision & Closing

Tezi, Moonhub, Paradox

Tezi sits firmly at the forefront of Generation 4. Unlike Gen 3 tools, which act as "co-pilots" requiring constant human steering (e.g., writing a Boolean search string, clicking "send" on an email campaign), Tezi's Max is an "autopilot." It is designed to take a high-level command—"Find me a Senior Backend Engineer"—and execute the thousands of micro-decisions required to deliver a qualified, interested candidate to an interview slot.1

2.2 The "Iron Triangle" of Hiring

Historically, talent acquisition leaders have operated under the constraint of the "Iron Triangle": you can hire Fast, you can hire Good (high quality), or you can hire Cheap, but you can rarely do all three simultaneously.

Fast + Good = Expensive: Relying on executive search firms or headhunters (Agency model).

Fast + Cheap = Low Quality: "Post and Pray" methods that yield high volumes of unqualified applicants.

Good + Cheap = Slow: Relying on internal referrals or organic employer branding.

Tezi's core value proposition is the disruption of this triangle. By leveraging the near-zero marginal cost of AI for cognitive tasks (sourcing, screening), Tezi claims to offer unlimited capacity (Speed) and high precision (Quality) at a fraction of the cost of human labor (Cheap).3 This promise of "breaking the triangle" is the central thesis driving the current wave of investment in AI recruiting agents.

3. Corporate Profile and Strategic Origins

3.1 Founding Vision and Leadership Pedigree

Tezi was established in 2024 by Raghavendra Prabhu (RVP) and Jason James, a leadership duo whose backgrounds provide significant insight into the product's design philosophy and technical capability.5

Raghavendra Prabhu (CEO): Prabhu's pedigree is deeply rooted in high-scale engineering and algorithmic matching. He previously led engineering teams at Thumbtack, Covariant AI, Pinterest, X (Twitter), Google, and Microsoft.3 His experience at Thumbtack is particularly relevant. Thumbtack is a two-sided marketplace matching local professionals with customers. Recruiting is, at its core, a similar two-sided marketplace matching problem (Companies <-> Candidates). Prabhu's background suggests a product DNA built around matching algorithms, search relevance, and market liquidity—ensuring that the supply of candidates matches the demand of open roles efficiently.

Jason James (COO/CPO): James brings a strong product and design sensibility, having led teams at Instacart, Thumbtack, and Intercom.3 His tenure at Intercom is notable because Intercom revolutionized customer support via chat and automation. This influence is clearly visible in Tezi's user interface, which relies heavily on a conversational, "human-like" interaction model ("Max") rather than static dashboards. James has publicly discussed the importance of "meticulously designed" interactions, arguing that the success of AI depends not just on the underlying model but on the User Experience (UX) of delegation.6 If the user doesn't trust the agent, they won't delegate to it.

The founders' mission is explicit: to "democratize excellent recruiting support".3 They operate on the premise that the skills of a "99th percentile" recruiter—pattern recognition, effective outreach, calibrated screening—can be encoded into software and distributed to every hiring manager, effectively giving every company a world-class recruiting team for the price of software.

3.2 Financial Backing and Investor Thesis

In July 2024, Tezi secured a $9 million Seed funding round.2 This is a substantial sum for a seed round, reflecting the high capital requirements of building robust AI agents (which require significant compute for training and inference) and the strong investor conviction in the space.

The round was led by 8VC and Audacious Ventures, with participation from Liquid 2 Ventures, Afore Capital, PrimeSet, and South Park Commons.7

8VC (Joe Lonsdale): 8VC is known for its "Smart Enterprise" thesis, backing companies like Palantir, OpenGov, and Addepar that apply vertical integration and data intelligence to unsexy, friction-heavy industries. Their investment in Tezi suggests they view recruiting not as a "support function" but as a complex logistical workflow ripe for AI remediation.

Audacious Ventures (Nakul Mandan): A firm known for backing ambitious, early-stage B2B SaaS.

PeopleTech Partners: The involvement of PeopleTech Partners is strategically vital. This group is a network of current and former Chief People Officers and Heads of Talent. Their participation functions as both capital support and a distribution channel, giving Tezi direct access to high-level decision-makers for beta testing and early enterprise sales.8

3.3 Operational Footprint

Tezi is headquartered in Menlo Park, California, at 1259 El Camino Real.9 As of late 2024, the company maintained a lean headcount of approximately 12 employees.7 This high revenue-potential-per-employee ratio is characteristic of the "AI Native" startup model, where small teams leverage generative AI to build products that previously would have required hundreds of engineers and operations staff.

4. Product Deep Dive: "Max" The Autonomous Recruiter

The core of Tezi’s offering is "Max," an autonomous AI agent. It is crucial to distinguish Max from a "tool." A tool (like LinkedIn Recruiter) is passive; it waits for a user to input queries. Max is an agent; it is active, goal-oriented, and persistent. It is designed to replace the "tedious" parts of recruiting—sourcing, screening, and logistics—so that human recruiters can focus on the "human" parts: selling the vision, assessing cultural fit, and closing offers.4

4.1 The Agentic Workflow: From Calibration to Hire

Max's operation follows a cyclical workflow that mimics the behavior of a human sourcer or recruiting coordinator.

4.1.1 Phase 1: Contextual Calibration (The "Intake")

In traditional recruiting, a search begins with a "Boolean string" (e.g., (Java OR Kotlin) AND "San Francisco"). In Tezi, it begins with Calibration. The hiring manager or recruiter inputs the job description and discusses the role with Max in natural language.

Iterative Learning: Max presents a series of "sample profiles" to the user, asking, "Does someone like Logan look like a better match?".1 The user's binary feedback (Yes/No) allows Max to adjust its hidden vector weights, fine-tuning its understanding of "seniority," "pedigree," or "domain expertise" beyond what is written in the job description.11

The "Vibe Check": This process captures the tacit knowledge of the hiring manager—the "I'll know it when I see it" factor—which has historically been the hardest thing to encode in software.

4.1.2 Phase 2: Autonomous Sourcing (The "Hunter")

Once calibrated, Max initiates a search across a database of 750 million candidate profiles.2

Data Aggregation: While the exact sources are proprietary, a database of this scale implies aggregation from open web sources (LinkedIn public profiles, GitHub, StackOverflow, Dribbble) and potential data partnerships.

Skill Adjacency: Max utilizes "Skill Adjacency" models. Unlike keyword matching, it understands semantic relationships. It knows that a "Backend Engineer" who uses "Flask" is likely proficient in "Python," even if Python isn't explicitly listed on their profile.13

Unlimited Capacity: Max can review thousands of profiles per hour, a task that would take a human weeks. It builds a "Long List," filters it down to a "Short List," and prepares them for outreach.4

4.1.3 Phase 3: Outreach and Engagement (The "Marketer")

Max is an autonomous email marketing engine.

Hyper-Personalization: Utilizing LLMs (likely OpenAI or Anthropic models via API), Max drafts outreach emails that reference specific details from the candidate's profile (e.g., "I saw your recent contribution to the React repository..."). This increases open and response rates compared to generic templates.4

Drip Campaigns: Max manages the follow-up cadence. If a candidate doesn't reply in 3 days, Max sends a nudge. If they reply with a question ("Is this remote?"), Max answers it using its knowledge base of the company's policies.1

Brand Protection: To prevent "spamming," Max likely employs frequency caps and domain health monitoring, ensuring that the company's email domain doesn't get blacklisted—a common risk with automated sourcing tools.

4.1.4 Phase 4: Screening and Inbound Management (The "Gatekeeper")

For roles that receive high volumes of inbound applications (e.g., 1,000+ applicants for a remote junior role), Max acts as the first filter.

Resume Parsing: Max reads resumes and ranks them against the calibrated model, surfacing the top 5-10% for human review.14

Chat Screening: Max can conduct a text-based "screen" via chat. It asks knockout questions ("Do you have visa sponsorship requirements?", "What is your salary expectation?") and technical queries. It can clarify ambiguities in a resume before a human commits 30 minutes to a phone call.1

Scorecards: The system generates a summary or "scorecard" for the human recruiter, explaining why a candidate was advanced or rejected, providing interpretability to the AI's decision.1

4.1.5 Phase 5: Scheduling and Logistics (The "Coordinator")

Scheduling is widely cited as the biggest time-sink in recruiting. Max automates this entirely.

Calendar Integration: It has read/write access to interviewers' calendars (Google/Outlook).

Negotiation: Max proposes times to the candidate, handles the back-and-forth negotiation, sends the calendar invites (with video links), and handles rescheduling if conflicts arise.1

Nudging Internal Teams: Uniquely, Max manages internal compliance. It "chases" hiring managers who are late in submitting their interview scorecards, acting as a project manager for the hiring process.1

4.2 The User Interface: "Partner" vs. "Dashboard"

Tezi's UI is designed to minimize cognitive load.

Pipeline View: A Kanban-style board showing candidates moving from "Sourced" to "Offer".11

Activity Feed: A transparent, chronological log of Max's actions ("Max emailed candidate X," "Max scheduled candidate Y"). This transparency is crucial for building trust; the user can "audit" the agent's work at any time.1

Slack Integration: Users can interact with Max directly in Slack, delegating tasks ("Hey Max, update the requirements for the Senior Dev role") without context-switching out of their primary communication tool.1

5. Technological Infrastructure and Integrations

Tezi is built to coexist with the complex ecosystem of enterprise HR software. It does not seek to replace the "System of Record" (the ATS) but rather to serve as the "System of Intelligence" or "Action Layer" on top of it.

5.1 The Integration Ecosystem

Integration is a critical barrier to entry in HR Tech. Tezi has invested in deep, bi-directional syncs with the major platforms used by tech-forward companies.

Category

Integration Partners

Functionality & Mechanism

Applicant Tracking Systems (ATS)

Greenhouse, Ashby, Lever

Bi-directional Sync: Max pushes candidate data (resumes, contact info) into the ATS. It pulls status updates (e.g., if a human moves a candidate to "Offer"). It links interview scorecards. This ensures the ATS remains the "single source of truth" for compliance and reporting. 1

Productivity & Collaboration

Slack

Command & Control: Acts as the primary interface for delegation and notifications. Max notifies the hiring channel when a candidate accepts an offer or a scorecard is late. 1

Calendaring

Google Calendar, Outlook

Read/Write Access: Max scans for "free" blocks based on complex logic (e.g., "don't book during lunch," "load balance between interviewers") and inserts calendar events. 1

Video Conferencing

Zoom, Google Meet, Microsoft Teams

Link Generation: Automatically generates unique video links for interviews and appends them to calendar invites. 15

5.2 Security and Compliance Architecture

Operating in the HR space requires rigorous adherence to data privacy and anti-bias laws. Tezi has established an "Enterprise-grade" security posture, a significant differentiator for a seed-stage startup.

5.2.1 SOC 2 Type II Certification

Tezi has completed its SOC 2 Type II audit.11

Significance: Unlike Type I (which is a snapshot in time), Type II tests the operational effectiveness of security controls over a period (typically 6-12 months). Achieving this rapidly indicates that Tezi was "security-first" in its architectural design.

Impact: This certification is a prerequisite for selling to mid-market and enterprise customers, who will not procure software without it.

5.2.2 GDPR and Global Privacy

Tezi is compliant with the General Data Protection Regulation (GDPR).

EU Representative: The company has appointed Workstreet (specifically Ria Pardeep, ria@workstreet.com) as its authorized representative in the EU.17 This provides a legal mechanism for EU citizens to exercise their data rights (Right to be Forgotten, Right to Access).

Data Residency: While not explicitly detailed, GDPR compliance often requires capabilities for data residency or Standard Contractual Clauses (SCCs) for data transfer.

5.2.3 AI Bias and NYC Local Law 144

New York City's Local Law 144 regulates the use of "Automated Employment Decision Tools" (AEDT). It requires annual bias audits to ensure tools do not discriminate based on race or gender.

Compliance Strategy: Tezi's Max undergoes 3rd-party audits for bias.1

Human-in-the-Loop (HITL): Crucially, Tezi designs its workflow so that Max cannot make final rejection decisions autonomously.1 It effectively "recommends" rejection, but a human must validate it. This legal firewall protects Tezi and its customers from liability associated with fully automated adverse employment decisions.

Data Isolation: Tezi explicitly states it "doesn't train models on customer data".1 This addresses a primary fear of enterprise CIOs: that their proprietary hiring data (e.g., who they are targeting, their internal scorecards) would be used to train the model that helps their competitors hire.

6. Market Analysis and Competitive Landscape

Tezi enters a crowded and fragmented market. The "HR Tech" sector is inundated with point solutions. Tezi's strategy is Consolidation: replacing multiple disjointed tools with a single agent.

6.1 Target Market and Persona

Primary Audience: Technology companies, High-growth Startups, and Mid-market Finance.

Role Focus: "Desk jobs" and "Knowledge Workers" (Software Engineers, Product Managers, Account Executives, Data Scientists). These roles have rich digital footprints (GitHub, LinkedIn) that make AI sourcing effective.

Buyer Persona:

Founders: Who need to hire core teams but lack a recruiting function.

Heads of Talent: Who are under pressure to "do more with less" and reduce agency spend.

Recruiting Operations Leaders: Who manage the tech stack and workflow efficiency.

6.2 Competitive Matrix

Tezi competes on three fronts: against legacy incumbents, direct AI competitors, and specialized point solutions.

6.2.1 The Incumbent: LinkedIn

LinkedIn Recruiter is the dominant player.

Tezi's Advantage: LinkedIn is a "walled garden." Max aggregates data from the entire web (GitHub, StackOverflow), providing a fuller picture of technical talent. Furthermore, LinkedIn requires manual driving; Tezi is autonomous.

Tezi's Disadvantage: LinkedIn owns the most real-time, self-verified dataset in the world. Max's data is inevitably a derivative or snapshot of this real-time truth.

6.2.2 Direct "AI Agent" Competitors

Moonhub: Positions itself as "AI + Human Experts." Moonhub often includes a service layer where their own human recruiters manage the AI for the client. Tezi is a pure SaaS platform (Self-service).

Paradox (Olivia): The leader in high-volume, hourly recruiting (retail, logistics). Paradox excels at chat-based scheduling via SMS/WhatsApp. Tezi is more focused on the complex, email-based workflows of professional/white-collar recruiting.

Juicebox (PeopleGPT): A strong competitor in the "Search" phase, using natural language to find candidates. However, Juicebox is primarily a search engine; Tezi is an end-to-end workflow agent (Search + Email + Schedule).

6.2.3 Point Solutions (The Bundle Thesis)

Tezi aims to replace a stack of separate tools:

Sourcing: Gem, hireEZ.

Scheduling: Calendly, GoodTime, ModernLoop.

Chat: Paradox, Sense.By bundling these into one $10k/year seat, Tezi offers significant vendor consolidation value.

6.3 Comparative Feature Analysis: Tezi vs. Ribbon AI

The table below illustrates how Tezi positions itself against niche AI tools like Ribbon.18

Feature

Tezi (Max)

Ribbon AI

Analysis

Core Identity

Autonomous Agent

Integration Layer

Tezi is a "teammate"; Ribbon is infrastructure/API.

Security Audit

SOC 2 Type II

SOC 2 Type I

Tezi demonstrates a more mature, enterprise-ready security posture.

Bias Control

3rd Party Audit

Transparent Scoring

Tezi's external audit directly addresses NYC LL 144 compliance; Ribbon's approach is more internal.

Workflow

End-to-End

Screening Focus

Tezi handles the entire funnel; Ribbon focuses on the interview/screening slice.

7. Financial Analysis and Commercial Model

7.1 Pricing Strategy: The Value-Based Arbitrage

Tezi's pricing is opaque (typical for B2B Enterprise SaaS), but market intelligence suggests a price point of ~$10,000 per user per year.19

Context: A license for LinkedIn Recruiter costs ~$5,000-$9,000/year. A license for a specialized tool like Gem is ~$3,000-$5,000.

The Arbitrage: Tezi does not compare its price to software; it compares it to services.

Agency Fee: 20-30% of a hire's salary. Hiring one $150k engineer via an agency costs $30,000 - $45,000.

Internal Recruiter: Salary of $80k - $120k/year.

ROI Argument: If Max replaces one agency hire, it pays for itself 3x over. If it increases a recruiter's capacity from 10 hires/year to 20 hires/year, it effectively halves the cost-per-hire.

Beta Discount: Early adopters are likely seeing discounted pricing or pilot programs to gather training data and case studies.12

7.2 Economic Efficiency and "Unlimited Capacity"

The central economic claim of Tezi is "Unlimited Capacity".4

Human Constraint: A human sourcer can reasonably send 50-100 personalized emails a day before quality degrades or burnout sets in.

AI Constraint: Max is constrained only by API rate limits and spam filters. It can analyze 10,000 profiles and send 500 emails in the same timeframe.

Implication: This allows companies to cover the "Total Addressable Market" of talent for a role, rather than just the first 50 people found. It shifts recruiting from a "sampling" problem to a "comprehensive coverage" problem.

8. Implementation, Customer Success, and Case Studies

8.1 The Implementation Timeline

Deploying an autonomous agent is more complex than installing a Chrome extension.

Weeks 1-2 (Technical Setup): Integrating with the ATS (Greenhouse), setting up email domains (DNS/DKIM records to ensure deliverability), and configuring calendar access.16

Weeks 2-4 (Calibration & Pilot): The "Training Phase." Hiring managers must spend time interacting with Max to "teach" it the company's preferences. This is critical; an uncalibrated agent will generate noise (spam) at scale.

Weeks 4+ (Live Sourcing): Max begins autonomous operation.

8.2 Customer Success Stories

During a presentation at the HR Technology Conference, co-founder Jason James highlighted three case studies.21

The "29 Candidates" Win: In one specific case cited by Tezi, a customer had an overwhelming backlog of inbound applicants. Max autonomously reviewed the backlog and identified 29 strong candidates who had been buried in the noise. The company closed a "great hire" from this pool in just over one month.14

Analysis: This highlights Max's value in "Resurfacing" talent. Often, the best candidate is already in the ATS but ignored due to volume. Max monetizes the existing database.

Operational Velocity: Early adopters report that Max acts like a "10-person recruiting team," allowing lean startups to compete for talent against larger incumbents without scaling their HR headcount.22

8.3 The "Black Box" Adoption Hurdle

A key challenge in implementation is the "Black Box" problem. Recruiters are often skeptical of AI ranking.

Trust Building: Tezi addresses this through Explainability. By providing scorecards and "reasoning" for why a candidate was picked, Tezi attempts to bridge the trust gap.

Change Management: Successful implementation requires a cultural shift. The recruiting team must transition from "doing the work" (sourcing) to "managing the machine" (calibrating and closing).

9. Risks, Challenges, and Ethical Considerations

9.1 The "Spam" Ecosystem Risk

The most significant systemic risk posed by Tezi (and its cohort) is the potential degradation of the candidate ecosystem.

The Tragedy of the Commons: If every company uses an AI agent to send "unlimited" personalized emails, candidates' inboxes will become unusable. "Personalization" will lose its signal value.

Platform Retaliation: LinkedIn and Google (Gmail) fight aggressively against automation. If Tezi's outreach patterns trigger spam filters, its value proposition collapses. Tezi must maintain sophisticated "human-like" sending patterns to evade detection.

9.2 Hallucinations and Accuracy

Generative AI models are prone to hallucinations—inventing facts or misinterpreting data.

False Negatives: The risk that Max rejects a qualified candidate because it misunderstood a nuance in their resume (e.g., rejecting a "Principal Engineer" because the role asked for a "Senior Engineer," failing to recognize the hierarchy).

False Positives: Advancing unqualified candidates wastes the hiring manager's time, eroding trust in the system.

9.3 Regulatory Headwinds

The regulatory environment for AI in HR is tightening.

EU AI Act: Classifies AI in employment as "High Risk," imposing strict obligations on transparency, data governance, and human oversight. Tezi's GDPR compliance is a good start, but the AI Act goes further.

Litigation Risk: As AI hiring becomes more common, class-action lawsuits regarding algorithmic discrimination are likely. Tezi's "Human-in-the-Loop" defense will be tested in the coming years.

10. Conclusion and Strategic Outlook

Tezi represents a sophisticated evolution in the trajectory of Human Resources technology. It is a bet that the future of recruiting is Agentic—that software should do work, not just store data. By combining a massive proprietary data graph (750M profiles) with an autonomous execution engine, Tezi offers a compelling solution to the "Iron Triangle" of hiring, promising speed and quality at a lower cost than traditional agencies.

Strengths:

Founders: Strong technical and product DNA (Marketplace + Consumer UX).

Security: Elite compliance posture (SOC 2 Type II) for a seed-stage company.

Product: A comprehensive "bundle" that consolidates a fragmented tech stack.

Weaknesses:

Data: Reliance on aggregated data vs. LinkedIn's real-time truth.

Adoption: The cultural resistance of recruiters fearing replacement.

Market Risk: The potential saturation of candidate channels via AI automation.

Verdict:

For investors and forward-thinking Talent leaders, Tezi is a high-potential innovation. It transforms the Recruiter from a "Sourcer/Scheduler" into a "Talent Advisor." However, its success is not guaranteed. It must navigate the perilous waters of AI ethics, avoid the "spam trap," and prove that its agentic judgments are truly indistinguishable from—or better than—those of a human expert. If Max succeeds, it doesn't just change how companies hire; it changes the fundamental unit of labor in the corporate recruiting function.

11. Appendix: Structured Data Analysis

Table 1: Tezi Corporate & Financial Profile

Metric

Details

Source

Total Funding

$9 Million (Seed Round)

2

Lead Investors

8VC, Audacious Ventures

23

Strategic Backers

Liquid 2 Ventures, PeopleTech Partners, South Park Commons

7

Founding Year

2024

5

Headquarters

Menlo Park, CA (Silicon Valley)

9

Est. Pricing

~$10,000 / user / year (Implied Enterprise SaaS model)

19

Table 2: Technical & Compliance Stack

Feature

Specification

Strategic Implication

Source

Security Certification

SOC 2 Type II

Enterprise-readiness; enables sales to Fortune 500.

11

Privacy Regulation

GDPR Compliant

Required for global/EU hiring; utilizes Workstreet as EU Rep.

17

Bias Audit

NYC Local Law 144

3rd-party audited; mitigates disparate impact liability.

1

ATS Integrations

Greenhouse, Ashby, Lever

Ensures data integrity; fits into existing enterprise stacks.

15

Database Scale

750 Million Profiles

Competes with LinkedIn on volume; aggregates global talent.

12

Table 3: "Max" Agent Capabilities vs. Traditional Tools

Capability

Traditional Tool (e.g., LinkedIn Recruiter)

Tezi "Max" Agent

Sourcing

User searches manually (Boolean).

Autonomous: AI searches & ranks based on intake.

Outreach

User writes templates & hits send.

Generative: AI writes personalized emails & manages follow-up.

Screening

User reviews resumes one-by-one.

Automated: AI ranks inbound & chats with candidates.

Scheduling

User emails times or uses link.

Agentic: AI negotiates times & books calendar directly.

Capacity

Limited by human hours.

Unlimited: constrained only by API limits.

Works cited

Tezi — Your agentic AI recruiting partner, accessed on December 13, 2025, https://tezi.ai/

Tezi Raises $9M in Seed Funding for Autonomous AI Recruiting Platform - Feed The AI, accessed on December 13, 2025, https://www.feedtheai.com/tezi-raises-9m-in-seed-funding-for-autonomous-ai-recruiting-platform/

About Us - Tezi.ai, accessed on December 13, 2025, https://tezi.ai/about

Tezi – AI Recruiting Agent for HR Operators & Growth Stage Companies, accessed on December 13, 2025, https://tezi.ai/for-operators

Tezi, Inc. Company Profile: Financials, Valuation, and Growth | PrivCo, accessed on December 13, 2025, https://system.privco.com/company/tezi

Q: What is your biggest, most visible design regret? | by Jason James | Medium, accessed on December 13, 2025, https://medium.com/@jas0njames/q-what-is-your-biggest-most-visible-design-regret-8c5eaf19fbca

Tezi - 2025 Company Profile, Team, Funding & Competitors - Tracxn, accessed on December 13, 2025, https://tracxn.com/d/companies/tezi/__2ZLWJfwhXE-jH1gXv-_MbYgkHctYlReOQRq4BO_QJMo

accessed on December 13, 2025, https://pitchbook.com/profiles/company/591116-50#:~:text=Who%20are%20Tezi's%20investors%3F,who%20have%20invested%20in%20Tezi.

Terms of Service - Tezi, accessed on December 13, 2025, https://tezi.ai/terms

Meet Max – your autonomous AI recruiting partner - YouTube, accessed on December 13, 2025, https://www.youtube.com/watch?v=dHCyJCriwjo

Trust Center - Tezi.ai, accessed on December 13, 2025, https://security.tezi.ai/updates

Tezi AI Recruiting pricing 2025: what does it cost you - HeroHunt.ai, accessed on December 13, 2025, https://www.herohunt.ai/blog/tezi-ai-recruiting-pricing

Max by Tezi AI - AI Agent Reviews, Features, Use Cases & Alternatives (2025), accessed on December 13, 2025, https://aiagentsdirectory.com/agent/max-by-tezi-ai

Tezi – AI Recruiting Agent for Founders & Early Stage Startups, accessed on December 13, 2025, https://tezi.ai/for-founders

Integrations - Lever, accessed on December 13, 2025, https://www.lever.co/ai-interview-companion-integrations/

Best AI recruiting software in 2025: 30+ tools compared with pricing and features - Truffle, accessed on December 13, 2025, https://www.hiretruffle.com/blog/ai-recruiting-software

Privacy Policy - Tezi AI, accessed on December 13, 2025, https://tezi.ai/privacy

Compared to Tezi AI - Ribbon.ai, accessed on December 13, 2025, https://www.ribbon.ai/vs-tezi-ai

Looking for Harver Alternatives? Compare with Tezi AI in 2025 - JoinArena.ai, accessed on December 13, 2025, https://www.joinarena.ai/compare/harver-vs-tezi-ai

Looking for Tezi AI Alternatives? Compare with JoinArena AI in 2025, accessed on December 13, 2025, https://www.joinarena.ai/compare/tezi-ai-vs-joinarena-ai

Agentic AI Recruiters Are Making Their First Hires. How?!? - HR Tech Las Vegas, accessed on December 13, 2025, https://www.hrtechnologyconference.com/hr-tech-2025-agenda/tezi

AI Agents in recruitment: the practical guide (2025) - HeroHunt.ai, accessed on December 13, 2025, https://www.herohunt.ai/blog/ai-agents-in-recruitment-the-practical-guide

2025 Funding Rounds & List of Investors - Tezi - Tracxn, accessed on December 13, 2025, https://tracxn.com/d/companies/tezi/__2ZLWJfwhXE-jH1gXv-_MbYgkHctYlReOQRq4BO_QJMo/funding-and-investors