// Mock data for development

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  toolCount: number;
  highlight?: string;
};

export type Tool = {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  shortDescription: string;
  category: string;
  pricing: string;
  tags: string[];
  companySizeFit?: string[];
  geography?: string[];
  compliance?: string[];
  // Detail page fields
  tagline?: string;
  fullDescription?: string;
  features?: string[];
  complianceTags?: string[];
  integrationTags?: string[];
  websiteUrl?: string;
  detailedPricing?: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole?: string;
  publishedAt: string;
  readTimeMinutes?: number;
  featuredImageUrl?: string;
  content: string[];
  relatedToolSlugs?: string[];
};

export const categories: Category[] = [
  {
    id: "hr-talent",
    slug: "hr-talent",
    name: "HR & Talent",
    description: "AI tools for sourcing, screening, and hiring talent.",
    toolCount: 24,
    highlight: "Recruiting, screening, interview automation",
  },
];

export const hrTools: Tool[] = [
  {
    id: "tool-1",
    slug: "talentflow-screening",
    name: "TalentFlow Screening",
    shortDescription: "AI-powered candidate screening for high-volume roles.",
    category: "hr-talent",
    pricing: "From $99/mo",
    tags: ["Screening", "GDPR-ready", "ATS integration"],
    companySizeFit: ["51-200", "201-500"],
    geography: ["UK", "US"],
    compliance: ["GDPR"],
    tagline: "Screen thousands of candidates in minutes, not weeks",
    fullDescription: "TalentFlow Screening uses advanced AI algorithms to automatically evaluate candidates against your job requirements. Our platform analyzes resumes, cover letters, and application responses to surface the best matches for your open roles. Built specifically for high-volume recruiting teams, TalentFlow reduces time-to-hire by up to 70% while improving candidate quality.",
    features: [
      "Automated resume screening with 95%+ accuracy",
      "Custom scoring models tailored to your requirements",
      "Bulk candidate processing (up to 1000 candidates/batch)",
      "Integration with major ATS platforms (Greenhouse, Lever, Workday)",
      "Bias detection and mitigation tools",
      "Collaborative review workflows for hiring teams",
    ],
    complianceTags: ["GDPR", "Data Privacy"],
    integrationTags: ["Greenhouse", "Lever", "Workday", "BambooHR"],
    websiteUrl: "https://example.com/talentflow",
    detailedPricing: "Starter: $99/mo (up to 100 candidates), Professional: $299/mo (up to 500 candidates), Enterprise: Custom pricing for unlimited candidates",
  },
  {
    id: "tool-2",
    slug: "interview-gpt",
    name: "InterviewGPT",
    shortDescription: "Structured interview guides and AI-generated scorecards.",
    category: "hr-talent",
    pricing: "Usage-based",
    tags: ["Interviews", "Scorecards", "ATS integration"],
    companySizeFit: ["201-500", "500+"],
    geography: ["US", "Canada", "UK"],
    compliance: ["GDPR", "EEOC"],
    tagline: "Conduct better interviews with AI-powered guidance",
    fullDescription: "InterviewGPT transforms your interview process by providing structured interview guides, real-time question suggestions, and automated scorecard generation. Our AI analyzes job descriptions and candidate profiles to suggest the most relevant questions, ensuring consistency and fairness across all interviews. Perfect for enterprise teams looking to standardize their hiring process.",
    features: [
      "AI-generated interview questions based on job requirements",
      "Real-time interview guidance and follow-up suggestions",
      "Automated scorecard generation with competency mapping",
      "Interview recording and transcription (optional)",
      "Calibration tools to reduce interviewer bias",
      "Analytics dashboard for interview performance tracking",
    ],
    complianceTags: ["GDPR", "EEOC", "Interview Recording Consent"],
    integrationTags: ["Zoom", "Google Meet", "Microsoft Teams", "Greenhouse", "Lever"],
    websiteUrl: "https://example.com/interviewgpt",
    detailedPricing: "Pay-per-interview: $15/interview, or subscribe for volume discounts (100+ interviews/mo)",
  },
  {
    id: "tool-3",
    slug: "recruiter-ai-copilot",
    name: "RecruiterAI Copilot",
    shortDescription: "AI assistant for writing job descriptions and outreach messages.",
    category: "hr-talent",
    pricing: "From $149/mo",
    tags: ["Job descriptions", "Outreach", "LinkedIn integration"],
    companySizeFit: ["11-50", "51-200"],
    geography: ["US", "UK", "EU"],
    compliance: ["GDPR"],
    tagline: "Your AI-powered recruiting sidekick",
    fullDescription: "RecruiterAI Copilot helps recruiters write more effective job descriptions and personalized outreach messages in seconds. Trained on thousands of successful recruiting campaigns, our AI understands what language attracts top talent and how to craft messages that get responses. Integrates seamlessly with LinkedIn and your ATS.",
    features: [
      "AI-generated job descriptions optimized for search and conversion",
      "Personalized candidate outreach message templates",
      "LinkedIn message automation with compliance safeguards",
      "A/B testing for job descriptions and messaging",
      "Tone and bias analysis for inclusive language",
      "Browser extension for one-click access",
    ],
    complianceTags: ["GDPR", "CAN-SPAM"],
    integrationTags: ["LinkedIn", "Indeed", "Greenhouse", "Ashby"],
    websiteUrl: "https://example.com/recruiterai",
    detailedPricing: "Solo: $149/mo (1 user), Team: $499/mo (up to 5 users), Enterprise: Custom pricing",
  },
  {
    id: "tool-4",
    slug: "resume-parser-pro",
    name: "Resume Parser Pro",
    shortDescription: "Extract structured data from resumes with 99% accuracy.",
    category: "hr-talent",
    pricing: "Contact sales",
    tags: ["Resume parsing", "API", "Bulk processing"],
    companySizeFit: ["201-500", "500+"],
    geography: ["Global"],
    compliance: ["GDPR", "SOC 2"],
    tagline: "Enterprise-grade resume parsing API",
    fullDescription: "Resume Parser Pro offers the most accurate resume parsing technology on the market, with 99%+ accuracy across 50+ languages and formats. Built for high-volume enterprise recruiting teams and HR tech platforms, our API extracts structured data from resumes, CVs, and LinkedIn profiles in milliseconds. SOC 2 Type II certified with global data residency options.",
    features: [
      "99%+ parsing accuracy across all resume formats",
      "Support for 50+ languages including non-Latin scripts",
      "Bulk processing (up to 10,000 resumes/hour)",
      "RESTful API with comprehensive documentation",
      "Custom field extraction and training",
      "Global data residency options (US, EU, APAC)",
    ],
    complianceTags: ["GDPR", "SOC 2 Type II", "ISO 27001"],
    integrationTags: ["REST API", "Webhooks", "AWS", "Azure"],
    websiteUrl: "https://example.com/resumeparser",
    detailedPricing: "Contact sales for volume-based pricing. Typical enterprise customers pay $0.10-0.50 per resume parsed.",
  },
  {
    id: "tool-5",
    slug: "skillmatch-ai",
    name: "SkillMatch AI",
    shortDescription: "Match candidates to roles based on skills, not just keywords.",
    category: "hr-talent",
    pricing: "From $199/mo",
    tags: ["Skills matching", "ML-powered", "ATS integration"],
    companySizeFit: ["51-200", "201-500", "500+"],
    geography: ["US", "UK", "Canada", "Australia"],
    compliance: ["GDPR", "EEOC"],
    websiteUrl: "https://example.com/skillmatch",
  },
  {
    id: "tool-6",
    slug: "video-interview-ai",
    name: "Video Interview AI",
    shortDescription: "Automated video interviews with sentiment and speech analysis.",
    category: "hr-talent",
    pricing: "Usage-based",
    tags: ["Video interviews", "Sentiment analysis", "Async"],
    companySizeFit: ["51-200", "201-500"],
    geography: ["US", "UK", "EU"],
    compliance: ["GDPR", "EEOC"],
    websiteUrl: "https://example.com/videointerview",
  },
  {
    id: "tool-7",
    slug: "diversity-hiring-platform",
    name: "Diversity Hiring Platform",
    shortDescription: "Reduce bias in hiring with AI-powered anonymization and fairness metrics.",
    category: "hr-talent",
    pricing: "From $299/mo",
    tags: ["Diversity", "Bias reduction", "Compliance"],
    companySizeFit: ["201-500", "500+"],
    geography: ["US", "UK", "Canada"],
    compliance: ["GDPR", "EEOC", "OFCCP"],
    websiteUrl: "https://example.com/diversityhiring",
  },
  {
    id: "tool-8",
    slug: "onboarding-autopilot",
    name: "Onboarding Autopilot",
    shortDescription: "Automated onboarding workflows and personalized learning paths.",
    category: "hr-talent",
    pricing: "From $79/mo",
    tags: ["Onboarding", "Workflows", "HRIS integration"],
    companySizeFit: ["11-50", "51-200", "201-500"],
    geography: ["US", "UK", "EU", "Canada"],
    compliance: ["GDPR", "SOC 2"],
    websiteUrl: "https://example.com/onboardingautopilot",
  },
];

export const articles: Article[] = [
  {
    id: "article-1",
    slug: "ai-screening-tools-2025-guide",
    title: "The Complete Guide to AI Screening Tools in 2025",
    excerpt: "Everything you need to know about implementing AI-powered candidate screening in your hiring process, from ROI calculation to compliance considerations.",
    category: "Guides",
    author: "Sarah Chen",
    authorRole: "Head of Product",
    publishedAt: "2025-01-15",
    readTimeMinutes: 8,
    content: [
      "AI-powered screening tools have become essential for modern recruiting teams. With the average corporate job posting receiving 250 applications, manually reviewing each resume is no longer feasible. AI screening tools can process thousands of candidates in minutes, surfacing the best matches while reducing unconscious bias.",
      "The technology behind AI screening has advanced significantly. Modern tools use natural language processing (NLP) to understand context and intent, not just keyword matching. They can identify transferable skills, recognize non-traditional career paths, and even predict candidate success based on historical hiring data.",
      "However, implementing AI screening requires careful planning. You need to ensure your training data is diverse and representative, establish clear scoring criteria, and maintain human oversight to catch edge cases. The best implementations combine AI efficiency with human judgment.",
      "Compliance is another critical consideration. GDPR in Europe and EEOC guidelines in the US require that AI screening tools are transparent, auditable, and free from discriminatory bias. Look for vendors who can provide detailed documentation of their algorithms and regular bias audits.",
      "ROI for AI screening tools is typically measured in reduced time-to-hire and improved quality-of-hire metrics. Most teams see a 50-70% reduction in screening time and a 20-30% improvement in candidate quality within the first six months.",
      "When evaluating AI screening tools, consider factors like integration with your existing ATS, customization options for your specific requirements, and the vendor's approach to bias mitigation. Request a pilot program to test the tool with real job requisitions before committing.",
      "The future of AI screening looks promising. Advances in multimodal AI will enable analysis of video applications, portfolio work, and other non-traditional application materials. We'll also see more sophisticated candidate matching that considers company culture fit and long-term career trajectory.",
      "Whether you're a startup hiring your first employees or an enterprise processing thousands of applications monthly, AI screening tools can transform your recruiting process. The key is finding the right tool for your specific needs and implementing it thoughtfully.",
    ],
    relatedToolSlugs: ["talentflow-screening", "resume-parser-pro", "skillmatch-ai"],
  },
  {
    id: "article-2",
    slug: "structured-interviews-ai",
    title: "How AI is Making Structured Interviews Scalable",
    excerpt: "Structured interviews improve hiring outcomes, but they're time-consuming to design. Here's how AI is changing that.",
    category: "Best Practices",
    author: "Marcus Johnson",
    authorRole: "Talent Acquisition Lead",
    publishedAt: "2025-01-10",
    readTimeMinutes: 6,
    content: [
      "Structured interviews—where every candidate is asked the same questions in the same order—are proven to be more predictive of job performance than unstructured conversations. Yet most companies struggle to implement them at scale.",
      "The challenge is that creating a good structured interview guide requires deep expertise. You need to identify the key competencies for the role, craft behavioral questions that surface those competencies, and train interviewers on proper evaluation techniques.",
      "AI is now automating much of this process. Modern interview platforms can analyze job descriptions and generate relevant interview questions in seconds. They can suggest follow-up questions based on candidate responses and even provide real-time guidance to interviewers.",
      "The benefits extend beyond time savings. AI-generated interview guides are more consistent and less prone to bias than manually created ones. They ensure that all candidates are evaluated on the same criteria, making comparisons more fair and accurate.",
      "Implementation requires some upfront work. You need to validate that the AI-generated questions align with your company's values and the specific requirements of the role. It's also important to train interviewers on how to use the AI guidance without becoming overly reliant on it.",
      "The results speak for themselves. Companies using AI-powered structured interviews report higher interviewer confidence, better candidate experience scores, and more defensible hiring decisions. The combination of structure and AI support creates a best-of-both-worlds scenario.",
    ],
    relatedToolSlugs: ["interview-gpt"],
  },
  {
    id: "article-3",
    slug: "bias-reduction-ai-hiring",
    title: "The Truth About Bias Reduction in AI Hiring Tools",
    excerpt: "AI can reduce bias in hiring, but only if implemented correctly. Here's what actually works and what doesn't.",
    category: "Research",
    author: "Dr. Amelia Rodriguez",
    authorRole: "Research Scientist",
    publishedAt: "2025-01-05",
    readTimeMinutes: 10,
    content: [
      "The promise of AI in reducing hiring bias is compelling: algorithms don't have unconscious biases the way humans do. But the reality is more complex. AI tools can reduce bias, but they can also amplify it if not designed and implemented carefully.",
      "Bias in AI hiring tools typically comes from training data. If you train an AI on historical hiring decisions that reflect past biases, the AI will learn and perpetuate those biases. This is why diverse, representative training data is essential.",
      "Effective bias reduction requires multiple approaches. Blind resume screening—removing names, photos, and other demographic information—can reduce bias in initial screening. But it must be combined with diverse candidate sourcing to ensure your pipeline is representative.",
      "Another important technique is adversarial debiasing, where the AI is explicitly trained to ignore protected characteristics like gender, race, and age. Regular bias audits using test data sets can verify that the AI is making fair decisions across different demographic groups.",
      "Transparency is crucial. Candidates and hiring teams need to understand how AI tools make decisions. Black-box algorithms that can't explain their reasoning are problematic both from a trust perspective and a legal compliance standpoint.",
      "Human oversight remains essential. Even the best AI tools should be viewed as decision support, not decision replacement. Hiring managers need training on how to interpret AI recommendations and when to override them.",
      "The most successful implementations combine AI efficiency with human judgment. Use AI to screen large volumes of candidates and surface promising matches, but have humans make final decisions with full context.",
      "Regulation is coming. The EU AI Act and similar legislation will require regular bias testing and transparency documentation for AI hiring tools. Choose vendors who are already compliant and can provide detailed audit trails.",
      "Looking ahead, we'll see more sophisticated approaches to bias reduction. Contextual AI that understands industry-specific requirements, regional differences, and company culture will enable more nuanced and fair candidate evaluation.",
      "The goal isn't to eliminate human judgment from hiring—it's to augment human decision-making with AI tools that reduce bias, increase efficiency, and improve outcomes for everyone.",
    ],
    relatedToolSlugs: ["diversity-hiring-platform", "talentflow-screening"],
  },
  {
    id: "article-4",
    slug: "ai-job-descriptions-best-practices",
    title: "Writing Better Job Descriptions with AI: A Practical Guide",
    excerpt: "Job descriptions are your first touchpoint with candidates. Learn how AI can help you write more effective, inclusive postings that attract top talent.",
    category: "How-To",
    author: "Lisa Park",
    authorRole: "Recruiting Operations Manager",
    publishedAt: "2024-12-28",
    readTimeMinutes: 7,
    content: [
      "Your job description is often the first thing a candidate sees about your company. Yet most job descriptions are poorly written—too long, too jargon-heavy, and inadvertently exclusionary. AI can help fix these problems.",
      "AI writing assistants trained on successful job postings can suggest more engaging language, identify jargon and unnecessary requirements, and flag potentially biased language. They can also optimize descriptions for search engines and job boards.",
      "Start by giving the AI context about your company, the role, and your ideal candidate. The more specific you are, the better the output. Include information about required vs. nice-to-have skills, company culture, and growth opportunities.",
      "Review AI-generated descriptions with a critical eye. The AI might suggest industry-standard language that doesn't reflect your company's unique voice. Edit the output to sound authentic and aligned with your employer brand.",
      "Pay special attention to requirements lists. Research shows that women and other underrepresented groups are less likely to apply if they don't meet 100% of listed requirements. AI can help you distinguish truly essential skills from nice-to-haves.",
      "Test different versions of your job descriptions. AI tools can generate multiple variations, and you can A/B test them to see which gets more qualified applicants. Track metrics like application rate, quality of applicants, and diversity of your candidate pool.",
      "The best job descriptions tell a story: what the role is, why it matters, who thrives in it, and what's in it for the candidate. Use AI as a starting point, but infuse the final version with your company's authentic voice and values.",
    ],
    relatedToolSlugs: ["recruiter-ai-copilot"],
  },
];

export const featuredTools: Tool[] = hrTools.slice(0, 4);

export const valueProps = [
  {
    id: "curated",
    title: "Curated by vertical",
    description: "Every tool is tagged by HR-specific use cases, integrations, and compliance.",
  },
  {
    id: "context",
    title: "Full buying context",
    description: "Share your company size, geography, and stack once—vendors meet you where you are.",
  },
  {
    id: "faster",
    title: "Faster vendor discovery",
    description: "Turn a loose idea into a shortlist of AI tools in days, not weeks.",
  },
];
