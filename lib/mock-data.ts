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
