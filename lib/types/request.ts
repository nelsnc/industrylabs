// Frontend payload types (camelCase)
export type RequestFormPayload = {
  requesterName: string;
  requesterEmail: string;
  requesterCompany: string;
  companySize: "1-50" | "51-200" | "201-500" | "500+";
  companyLocation?: "UK" | "US" | "EU" | "Other";
  vertical: "HR & Talent" | "Learning & Development" | "Customer Support";
  useCase: string;
  budgetRange?: "<£500" | "£500-£2000" | "£2000-£5000" | "£5000+";
  timeline: "Immediate" | "1-3 months" | "3-6 months" | "Exploring";
  currentTools?: string;
  requirements: string;
  complianceNeeds?: string[];
  gdprConsent: boolean;
  sourceChannel?: "Direct" | "SEO" | "LinkedIn" | "Referral" | "Other";
  requestSourceUrl?: string;
};

// API response types
export type RequestApiSuccess = {
  success: true;
  requestId: string;
  message: string;
  emailSent: boolean;
};

export type RequestApiError = {
  success: false;
  error: string;
  fieldErrors?: Record<string, string>;
};

export type RequestApiResponse = RequestApiSuccess | RequestApiError;
