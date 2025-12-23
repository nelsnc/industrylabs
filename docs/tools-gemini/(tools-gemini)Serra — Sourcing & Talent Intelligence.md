Serra: The Agentic Shift in Talent Acquisition and Sourcing Intelligence

1. Executive Summary: The Dawn of Autonomous Talent Discovery

The global talent acquisition landscape is currently navigating a profound inflection point, characterized by the transition from static, database-driven candidate retrieval to dynamic, agentic talent intelligence. For the past two decades, the industry paradigm has been defined by the "search and filter" model—a manual, Boolean-heavy process where human recruiters act as the primary interface between job requirements and massive, unstructured talent pools. This model, while functional, is fraught with inefficiencies: low response rates, high noise-to-signal ratios, and the immense cognitive load of manual screening. Enter Serra, a San Francisco-based technology firm that is aggressively redefining this workflow through the deployment of autonomous AI agents.1

Emerging from the prestigious Y Combinator Summer 2023 (S23) cohort, Serra has rapidly positioned itself not merely as a tool for recruiters, but as a "Search Engine for Recruiters" that fundamentally alters the economics of hiring.3 By aggregating a unified "golden record" of over 800 million candidate profiles from more than 20 diverse data sources—including LinkedIn, GitHub, and Crunchbase—Serra creates a semantic understanding of the global talent graph.1 Unlike legacy platforms that rely on rigid keyword matching, Serra leverages Large Language Models (LLMs) and vector search architectures to interpret natural language queries, infer candidate capabilities, and autonomously execute outreach strategies that mimic the nuance of human interaction.4

The company's trajectory is notable for its roots in data infrastructure engineering. Founded by former data engineers from Disney+ and Amazon, Serra initially entered the market with a focus on simplifying ETL (Extract, Transform, Load) pipelines before pivoting to apply those same data-wrangling principles to human capital.3 This "engineering-first" DNA is evident in the platform's architecture, which prioritizes rigorous data verification—such as cross-referencing resume claims with open-source code contributions—over simple contact retrieval.

Serra's market entry comes at a time when efficiency is paramount. The platform’s promise—that companies can "skip sourcing entirely" and receive qualified interviews directly on their calendars—has resonated with high-growth, technical organizations.1 Early adoption by industry heavyweights such as Waymo (autonomous driving), Verkada (enterprise security), and Replit (AI development) serves as a potent validation of its capabilities in identifying specialized, hard-to-find talent in competitive markets.3

This report provides an exhaustive, multi-dimensional analysis of Serra’s operational model, technological underpinnings, and market impact. It dissects the shift from keyword-based sourcing to semantic intelligence, evaluates the competitive dynamics against both legacy incumbents like LinkedIn and emerging AI-native challengers like Moonhub and Juicebox, and explores the broader implications of the "warm graph"—Serra's proprietary mechanism for leveraging employee networks to digitize warm introductions. As AI agents begin to assume the cognitive burdens of the recruitment lifecycle, Serra stands as a primary case study in the automation of the white-collar supply chain.

2. The Evolution of Sourcing Technology: Contextualizing the Shift

To fully appreciate the disruption Serra introduces, one must first understand the historical stagnation of the sourcing function. For years, "sourcing" has essentially been a data entry and retrieval task, limited by the quality of available databases and the syntactic precision of the recruiter.

2.1 The Legacy Paradigm: Boolean and Keywords

Since the digitization of resumes in the late 1990s, sourcing has relied on Boolean logic. Recruiters construct complex strings of operators (AND, OR, NOT) to filter databases. For example, finding a Java developer might require a string like: (title:"Software Engineer" OR title:"Developer") AND (skill:"Java" OR skill:"JVM") AND NOT (company:"Competitor X").

This deterministic approach has severe limitations:

Semantic Blindness: A Boolean search cannot distinguish between a candidate who "used Java in 2010" and one who is a "Java Architect." It matches characters, not context.

Resume Stuffing: Candidates learned to game these systems by stuffing keywords into their profiles, leading to high false-positive rates.

The "Dark Matter" of Talent: Many highly qualified candidates do not explicitly list every skill. A "Backend Engineer at Netflix" implies a certain caliber and tech stack (Java/Spring) even if not explicitly stated, but a keyword search would miss this inference.

2.2 The Professional Network Era (LinkedIn)

LinkedIn revolutionized sourcing by moving data from static resumes to dynamic, self-updating profiles. It became the de facto system of record for professional identity. However, as LinkedIn grew, it faced the "noise" problem. InMails—LinkedIn's paid messaging feature—became ubiquitous, leading to plummeting response rates. High-quality talent, bombarded by generic outreach, disengaged from the platform. Furthermore, LinkedIn's search remained largely keyword-driven, forcing recruiters to act as manual filters for thousands of results.

2.3 The Agentic Era: Serra’s Entry

Serra represents the third epoch: Agentic Intelligence. In this paradigm, the software is no longer a passive database but an active agent. It doesn't just "find" records; it "reads" them, "evaluates" them against a rubric, and "engages" the candidate.1

The shift is from Syntax (Do these words match?) to Semantics (Is this person a fit?). Serra’s use of GPT-powered search engines allows for queries like "Product managers with SaaS experience and UX design skills," which the system interprets conceptually rather than literally.2 This moves the recruiter up the value chain, from data miner to talent strategist.

3. Corporate Genealogy and Strategic Pivot

Understanding Serra's capability requires a forensic examination of its origins. Unlike many HR tech companies founded by former recruiters, Serra was born from the world of hardcore data infrastructure.

3.1 The Founders: Engineering DNA

The company was co-founded by Alan Wang (CEO) and Albert Stanley (CTO).3 Their pedigrees are rooted in high-scale data processing:

Alan Wang: Previously a Data Engineer at Disney+. In the streaming world, data engineering involves moving massive petabytes of user telemetry data to power recommendation engines. This background is directly applicable to recruiting, which is essentially a recommendation problem (matching candidates to jobs).

Albert Stanley: Formerly a Software Engineer at Amazon and a Computer Science graduate student at UCLA, where he worked on neural networks for genomic prediction (RNA-DNA hybrids).3 This academic grounding in deep learning and neural networks provides the theoretical foundation for Serra’s vector search and ranking algorithms.

3.2 The Pivot: From "Serra SQL" to "Serra Recruiter"

Snippets reveal a fascinating pivot. Approximately two years prior to its current iteration, the founders launched a product also named Serra which was a "Low-code, modular SQL" tool and a "Python-based dbt alternative".5 This tool was designed to "simplify ETL" (Extract, Transform, Load) processes, reducing 200-line SQL scripts into manageable Python objects.5

Strategic Implication: This is not a trivial detail. It indicates that the underlying architecture of the Serra recruiting platform is likely built on the robust data ingestion engine they originally built for developers.

Ingestion: The ability to scrape and process 800 million profiles 1 requires an industrial-grade ETL pipeline—exactly what the founders built in their first iteration.

Transformation: Cleaning unstructured resume data and mapping it to a structured schema is a classic data transformation problem.

Load: Indexing this data for real-time vector search parallels the data warehousing challenges they previously aimed to solve.

The pivot suggests the founders realized their data pipeline technology had a higher-value application in aggregating human capital data than in competing with tools like dbt in the crowded developer tools market. This "infrastructure-first" approach gives Serra a significant advantage over competitors who might rely on third-party data APIs; Serra appears to own its data processing layer down to the metal.

3.3 Y Combinator and Market Validation

Serra was accepted into Y Combinator’s Summer 2023 (S23) batch.3 YC is known for backing companies that solve "hair on fire" problems—urgent, painful issues for businesses. The urgency in 2023/2024 was the need to hire efficiently in a constrained economic environment. Companies moved from "growth at all costs" to "efficiency," making a tool that claims to replace expensive agencies and save "15 hours per role" highly attractive.3

The company also achieved significant visibility by being voted the #1 Product of the Day on Product Hunt 2, a key indicator of product-market fit within the tech-savvy early adopter community.

4. Technological Architecture: The Semantic Search Engine

Serra’s core innovation is the application of Vector Search and Large Language Models (LLMs) to the domain of candidate discovery. This section dissects the technical components that enable its "Autopilot" capabilities.

4.1 The Unified Data Lake: The "Golden Record"

Data quality is the Achilles' heel of AI. If the underlying data is stale, the AI's decisions will be flawed. Serra claims to index 800 million+ profiles.1 To put this in perspective, LinkedIn has approximately 1 billion users. Serra’s coverage is approaching near-parity with the market leader, achieved by aggregating 20+ data sources.1

This aggregation creates a "Golden Record" for each candidate. A single profile in Serra is likely a composite of:

Identity & History: LinkedIn (Employment dates, titles).

Technical Verification: GitHub (Repositories, languages, commit history).1

Business Context: Crunchbase (Employer funding stage, industry sector).3

Internal Data: The hiring company’s ATS (Past applications, interview notes).2

Contact Information: Third-party enrichment providers (Personal email, mobile phone).1

Insight: By fusing public web data with private ATS data, Serra solves the "Data Silo" problem. Usually, a candidate exists in two places: as a "lead" in LinkedIn and as an "applicant" in the ATS. Serra unifies these, allowing the system to recognize that a "new" prospect actually applied two years ago and was rated highly, effectively resurrecting the "Silver Medalists".1

4.2 Vector Search vs. Deterministic Search

Serra moves beyond keyword matching by using Vector Embeddings. In this model, text (job descriptions, resumes, queries) is converted into numerical vectors in a high-dimensional space. The distance between vectors represents semantic similarity.

The "Context" Breakthrough:

Traditional search fails when vocabulary mismatches occur.

Recruiter Query: "Frontend Ninja"

Candidate Profile: "UI Developer specializing in React"

Boolean Result: No Match (Strings do not align).

Serra Vector Result: Match. The system understands that "Frontend Ninja" and "UI Developer" are semantically adjacent concepts in the vector space.4

This architecture allows for Natural Language Queries. Recruiters can type, "Find me a product manager who has led growth at a B2B SaaS series B company," and the system parses the intent (Role: PM, Skill: Growth, Context: B2B/Series B) without requiring specific field filters.2

4.3 The Fact-Checking Verification Layer

In an era of resume embellishment and AI-generated cover letters, verification is critical. Serra introduces a Fact-Checking Layer, particularly for technical roles. The platform integrates deeply with GitHub to "enrich searches".1

Mechanism: If a candidate claims "Expert in PyTorch," Serra analyzes their GitHub activity. Does the candidate have public repositories using PyTorch? Are they the primary contributor? Do they have stars or forks indicating community validation?

Implication: This moves sourcing from "Trust" to "Verify." For clients like Replit and Waymo, this is non-negotiable. A resume keyword means nothing if the code isn't there. Serra provides this evidence upfront.4

5. The "Warm Graph": Digitizing Social Capital

Perhaps the most defensible moat Serra is building is the AI Referral Network.3 While data can be scraped and search algorithms can be replicated, a proprietary network graph is unique to each customer.

5.1 The Failure of Cold Outreach

The recruiting industry is suffering from the "Tragedy of the Commons." Because it is easy to send bulk emails, every candidate is inundated, leading to near-zero response rates. The only channel that consistently performs is the warm introduction—a referral from a mutual contact.

5.2 Mapping the Corporate Social Graph

Serra automates the discovery of these connections. By integrating with a company’s internal systems (likely G-Suite, Outlook, Slack, and employee LinkedIn connections via authentication), Serra builds a "Warm Graph".3

Scenario: A recruiter sources "Alice," a Senior Engineer.

Standard Tool: Provides Alice’s email. Recruiter sends a cold note.

Serra: Identifies that "Bob," a current Engineering Manager at the company, worked with Alice at a previous employer (e.g., Google) for 3 years.

Action: Serra prompts the recruiter to ask Bob for an intro, or even drafts the intro request for Bob to send.

5.3 Network Effects and Response Rates

Serra claims this approach yields 5–10x higher reply rates compared to cold outreach.3 This feature transforms recruitment from a numbers game (spamming thousands) to a relationship game (leveraging social capital). As more employees in a company connect their networks to Serra, the "Warm Graph" becomes denser and more valuable, creating a powerful internal network effect that locks customers into the platform.

6. The Agentic Workflow: From Sourcing to Scheduling

Serra positions itself as an "AI Recruiter" that runs on "Autopilot".1 This implies an agentic workflow where the software acts autonomously to achieve a goal (booking interviews) rather than just waiting for user input.

6.1 Automated Sourcing and Ranking

The user inputs a job description or a natural language query. Serra’s agents then scan the 800M+ database and the internal ATS simultaneously.6

Ranking: Candidates are ranked based on "predicted job performance".2 This likely uses a regression model trained on successful hires to weigh factors like career progression, school tier (e.g., "filters by top 10 business schools automatically" 7), and tenure stability.

Filtering: The system allows for granular filtering, such as "narrow down... to only technical ones that have worked at healthcare startups".7 This demonstrates the system's entity recognition capabilities—it knows which companies are "healthcare startups."

6.2 Multi-Channel Outreach Automation

Once candidates are selected, Serra initiates a multi-channel campaign.

Waterfall Enrichment: The system queries multiple data providers in sequence to find the best contact info (personal email, work email, mobile number).1

Personalization: Using Generative AI, Serra drafts personalized messages. It likely uses data from the candidate's profile (e.g., "I saw your recent commit on the React repo...") to increase relevance.

Auto-Reply Handling: Crucially, the "Campaigns don't stop once someone responds".1 The AI is capable of handling initial replies, potentially answering logistical questions or scheduling the meeting, effectively qualifying the candidate before they ever speak to a human recruiter.

6.3 Inbound Automation

For inbound applicants, Serra integrates with the ATS to "read" every resume. It applies the same ranking logic to inbound applicants as it does to sourced candidates.1 This ensures that high-quality inbound applicants aren't lost in the "black hole" of the ATS, a common complaint in high-volume hiring.

7. Competitive Landscape & Market Positioning

The "AI for Recruiting" market is crowded. Serra competes on multiple fronts: against legacy data providers, outreach tools, and new AI-native startups.

7.1 Legacy Incumbents

LinkedIn Recruiter:

The Incumbent: The default database. Strongest data for non-tech roles.

Serra’s Differentiation: Aggregated Data. Serra has LinkedIn data plus GitHub plus private ATS data. Search Experience. Serra offers natural language search vs. LinkedIn’s Boolean. Cost. Serra’s pricing ($500/mo) is often cheaper per seat than LinkedIn Recruiter Corporate. Outreach. Serra automates the sequence; LinkedIn Recruiter is primarily for discovery.

Customer Voice: "It's just so much better at surfacing candidates than LinkedIn Recruiter... ever were".1

Gem:

The Incumbent: Leader in recruiting CRM and email sequencing.

Serra’s Differentiation: Gem is a workflow tool; it assumes you already found the candidate (usually on LinkedIn). Serra is the search engine and the workflow tool combined. It replaces the LinkedIn+Gem stack with a single platform.

Customer Voice: "You're better than Gem... existing solutions".1

7.2 AI-Native Challengers

The S23/W24 YC batches and the broader VC landscape have funded several competitors.

Competitor

Primary Focus

Serra's Comparative Advantage

Moonhub

Service-Hybrid. Positions itself as an "AI Recruiter" but often involves human-in-the-loop experts to verify matches.

Pure SaaS. Serra appears to be a pure software play ("Autopilot"). This likely allows for lower pricing ($500/mo) compared to Moonhub's service-heavy model.

Juicebox (PeopleGPT)

Search Interface. Focuses heavily on the "ChatGPT for Recruiting" interface.

The Warm Graph. While Juicebox excels at search, Serra’s focus on the "referral network" 3 adds a layer of social intelligence that pure search tools lack.

Pin

Generalist AI. Another strong contender in the AI sourcing space.

Engineering Focus. Serra’s deep integration with GitHub and its adoption by dev-tools companies (Replit) gives it an edge in technical recruiting.

8. Customer Ecosystem & Use Case Analysis

Serra’s customer list acts as a signal of its product-market fit. The concentration of Engineering-First and Deep Tech companies is significant.

8.1 Waymo: The Needle in the Haystack

3

Waymo, the autonomous driving subsidiary of Alphabet, represents the apex of recruiting difficulty.

The Challenge: Hiring for autonomous vehicle (AV) tech requires finding candidates with intersections of niche skills: Computer Vision + C++ + Real-time Systems + Robotics. These candidates are rare and often buried in academic labs or niche competitors.

Serra's Fit: Serra’s vector search excels here. A query like "Engineers with SLAM experience in robotics" leverages semantic understanding to find relevant academic papers or GitHub repos, even if the candidate's LinkedIn is sparse. The "Warm Graph" is also critical here; AV is a small world, and referrals are the primary currency.

8.2 Replit: Hiring Builders for Builders

3

Replit is a platform for software developers.

The Challenge: Developers have a high "BS detector" for recruiters. They ignore generic outreach.

Serra's Fit: Serra’s GitHub integration allows Replit’s team to source based on code quality, not just resume buzzwords. They can find candidates who actually contribute to open source, aligning with Replit’s "builder" culture. The ability to mention specific code contributions in the automated outreach increases response rates from this skeptical demographic.

8.3 Verkada: Scaling Velocity

3

Verkada is a hyper-growth enterprise security company.

The Challenge: Volume and Speed. Rapid scaling requires processing thousands of leads.

Serra's Fit: The "Autopilot" feature allows Verkada to scale their sourcing efforts without linearly scaling their recruiting headcount. The "inbound automation" ensures they can handle the flood of applicants that comes with brand visibility.

8.4 ROI Evidence

The testimonials provide quantitative proof of value:

Inkorp: "Closed 20 interviews in the first week" and avoided hiring an additional recruiter.1 This is the ultimate ROI: displacing salary cost (approx. $100k-$150k) with software cost ($12k/year).

Nash: "Booked three interviews... in the first hour".1 Speed to market is critical for startups competing for talent.

9. The Economics of AI Recruiting

Serra’s pricing strategy is disruptive, targeting the "middle" of the market that is underserved by expensive enterprise contracts and overwhelmed by manual tools.

9.1 Transparent, Tiered SaaS Pricing

Unlike many HR enterprise tools that hide pricing, Serra publishes it 2:

Starter ($500/mo): 5 Active Roles. Accessible to early-stage startups.

Team ($1000/mo): 10 Roles, Automated Sourcing. The "sweet spot" for growth-stage companies.

Enterprise: Custom.

Analysis: This pricing creates a low barrier to entry. A single placement fee for a recruiter is often $25,000+. If Serra costs $6,000/year (Starter) and yields even one hire, the ROI is 400%. This makes the purchase decision a "no-brainer" for founders and Heads of Talent.

9.2 The Disintermediation of Agencies

Serra poses an existential threat to contingency recruiting agencies. Agencies typically charge for "sourcing and screening." Serra automates sourcing and creates a "warm" path for screening. By empowering internal teams to find candidates that agencies would otherwise surface, Serra allows companies to bring recruitment in-house at a fraction of the cost.

9.3 Operational Efficiency

The claim that the "Average recruiter saves 15 hours per role" 3 translates to significant operational efficiency. If a recruiter handles 10 roles a year, that is 150 hours saved—essentially nearly a month of work. This time can be redirected toward high-value activities like closing candidates, improving employer brand, or strategic workforce planning.

10. Legal, Ethical, and Compliance Frameworks

The aggregation of personal data on this scale (800M profiles) necessitates a rigorous look at compliance and ethics.

10.1 GDPR and Data Scraping

Serra aggregates "publicly available" data. However, under GDPR (General Data Protection Regulation), even public data is subject to regulation if it identifies a living individual.

Right to be Forgotten: Serra must have mechanisms for candidates to request removal from their database.

Data Accuracy: Snippets mention "fact-checking".4 This is crucial for compliance. If an AI incorrectly attributes a negative trait or lack of skill to a candidate, it could be liable for damaging their employment prospects.

Legitimate Interest: Serra likely operates under the "Legitimate Interest" basis for processing data, arguing that connecting candidates to job opportunities is a valid business interest that doesn't harm the individual.

10.2 Algorithmic Bias and EEO

The use of AI to "rank" candidates 2 introduces the risk of bias.

The Risk: If the training data (historical hires) is biased against certain demographics, the AI will replicate that bias.

Serra's Mitigation: By focusing on skills (via GitHub) and experience context (via Crunchbase) rather than just keywords or names, Serra attempts to create a more objective ranking. However, vector embeddings can still encode societal biases found in the language models they are built upon.

Compliance: U.S. Equal Employment Opportunity (EEO) laws require that selection procedures do not have a disparate impact on protected groups. Serra users must be careful to use the AI as a recommendation engine, not a decision engine, keeping a human in the loop for final selection.

10.3 Enterprise Readiness (SOC 2)

For clients like Waymo and Verkada, security is paramount. While snippets don't explicitly detail Serra's SOC 2 status, the "Enterprise Support" and integration with secure ATS environments imply a robust security posture. Handling PII (Personally Identifiable Information) requires encryption at rest and in transit, strict access controls, and regular audits.

11. Future Trajectory & Industry Implications

Serra is not just a better search bar; it is a harbinger of the Autonomous Enterprise.

11.1 The "Talent Operating System"

Serra is moving toward becoming a "Talent Operating System" where the ATS is just a database, and Serra is the intelligence layer on top. By unifying inbound, outbound, and referrals, it centralizes the entire hiring workflow.

11.2 The End of "Cold" Networking

With the "Warm Graph" 3, Serra suggests a future where "cold" networking is obsolete. If AI can instantly map the path of least resistance to any human on earth via mutual connections, the value of a professional network shifts from "who you know" to "who your company knows." This democratizes access to talent, making the collective network of the organization a shared asset.

11.3 Conclusion: The Agentic Advantage

Serra successfully capitalizes on the convergence of three trends: the maturity of LLMs, the commoditization of vector search, and the market demand for hiring efficiency. By pivoting from data infrastructure to talent intelligence, its founders have built a platform that treats recruiting as a rigorous engineering problem rather than a soft-skill administrative task.

For the modern enterprise, Serra offers a compelling promise: the ability to scale talent acquisition without scaling the recruiting team. As it deepens its "warm graph" capabilities and expands its verification layers, Serra is poised to become a critical infrastructure layer in the modern tech stack, challenging the dominance of legacy incumbents and setting a new standard for how the world hires.

12. Summary of Key Specifications

The following table summarizes the core operational and technical specifications of the Serra platform as derived from the research analysis.

Feature Domain

Specification & Detail

Strategic Implication

Data Universe

800 Million+ Profiles aggregated from 20+ Sources (LinkedIn, GitHub, Crunchbase, etc.).1

Approaches market parity with LinkedIn; reduces reliance on single-source data; enables cross-platform verification.

Search Tech

GPT-4 Powered Vector Search; Semantic understanding of natural language queries; Context-aware filtering.2

Eliminates Boolean string complexity; surfaces "hidden gem" candidates who lack specific keywords but have relevant context.

Network Intelligence

AI Referral Network ("Warm Graph"); Maps employee connections to identify warm intro paths.3

Increases response rates by 5-10x; creates a defensive network effect moat that grows with usage.

Verification

GitHub / Open Source Integration; Validates code contributions and technical claims.1

Critical for engineering-focused clients; moves from "trusting resumes" to "verifying skills."

Automation Level

"Autopilot" Sourcing; Automated multi-channel outreach (Email, Mobile); Auto-reply handling.1

Shifts recruiter role from "hunter" to "closer"; significantly reduces time-to-hire and operational overhead.

Integrations

80+ ATS Integrations (Greenhouse, Lever, etc.); Bi-directional sync for "Silver Medalist" resurrection.1

Unifies inbound and outbound workflows; maximizes ROI on existing candidate databases.

Pricing

Starter: $500/mo (5 roles). Team: $1000/mo (10 roles). Enterprise: Custom.2

Disruptive, transparent pricing undercuts enterprise incumbents; facilitates Product-Led Growth (PLG).

Key Customers

Waymo, Verkada, Replit, Nash, Inkorp.3

Validates efficacy in high-bar, technical, and high-volume hiring environments.

Corporate Origin

Y Combinator (S23); Founders ex-Disney+ (Data Eng) & Amazon (SWE).3

Engineering-first DNA ensures robust data infrastructure and scalability; focus on "hair on fire" efficiency problems.

Works cited

Serra, accessed on December 14, 2025, https://serra.io/

Serra, accessed on December 13, 2025, https://cloud.serra.io/

Serra: Your 24/7 AI Recruiter | Y Combinator, accessed on December 14, 2025, https://www.ycombinator.com/companies/serra

Launch YC: Serra — Find the best talent using AI | Y Combinator, accessed on December 14, 2025, https://www.ycombinator.com/launches/Lpi-serra-find-the-best-talent-using-ai

Launch YC: Serra - Low-code, modular SQL | Y Combinator, accessed on December 13, 2025, https://www.ycombinator.com/launches/J1Y-serra-low-code-modular-sql

Meet Serra: An AI-Driven Search Engine for Recruiters to Find Best-Fit Candidates both Within Their ATS and Outside of It - MarkTechPost, accessed on December 13, 2025, https://www.marktechpost.com/2024/07/18/meet-serra-an-ai-driven-search-engine-for-recruiters-to-find-best-fit-candidates-both-within-their-ats-and-outside-of-it/

Introducing Serra, the new way to find talent - YouTube, accessed on December 13, 2025, https://www.youtube.com/watch?v=KWGNcVFMH_k