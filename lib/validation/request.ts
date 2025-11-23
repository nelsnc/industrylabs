import { z } from "zod";

export const requestSchema = z.object({
  requesterName: z.string().min(1, "Name is required").max(100),
  requesterEmail: z.string().email("Valid email is required"),
  requesterCompany: z.string().min(1, "Company name is required").max(100),
  companySize: z.enum(["1-50", "51-200", "201-500", "500+"], {
    errorMap: () => ({ message: "Please select a company size" }),
  }),
  companyLocation: z.enum(["UK", "US", "EU", "Other"]).optional(),
  vertical: z.enum(
    ["HR & Talent", "Learning & Development", "Customer Support"],
    {
      errorMap: () => ({ message: "Please select a vertical" }),
    }
  ),
  useCase: z
    .string()
    .min(10, "Please describe your use case (at least 10 characters)")
    .max(500),
  budgetRange: z
    .enum(["<£500", "£500-£2000", "£2000-£5000", "£5000+"])
    .optional(),
  timeline: z.enum(
    ["Immediate", "1-3 months", "3-6 months", "Exploring"],
    {
      errorMap: () => ({ message: "Please select a timeline" }),
    }
  ),
  currentTools: z.string().max(500).optional(),
  requirements: z
    .string()
    .min(20, "Please provide more detail about your requirements (at least 20 characters)")
    .max(2000),
  complianceNeeds: z.array(z.string()).optional(),
  gdprConsent: z.literal(true, {
    errorMap: () => ({
      message: "You must consent to data processing to submit this request",
    }),
  }),
  sourceChannel: z
    .enum(["Direct", "SEO", "LinkedIn", "Referral", "Other"])
    .optional(),
  requestSourceUrl: z.string().url().optional().or(z.literal("")),
});

export type RequestFormValues = z.infer<typeof requestSchema>;
