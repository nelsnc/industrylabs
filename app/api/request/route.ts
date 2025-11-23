import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requestSchema, type RequestFormValues } from "@/lib/validation/request";
import { createRecord } from "@/lib/airtable";
import { sendNewRequestEmail } from "@/lib/email";
import type { RequestApiResponse } from "@/lib/types/request";

const REQUESTS_TABLE = "REQUESTS";

// Helper: Format Zod errors into field-level error messages
function formatZodErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const fieldName = issue.path[0];
    if (typeof fieldName === "string" && !fieldErrors[fieldName]) {
      fieldErrors[fieldName] = issue.message;
    }
  }
  return fieldErrors;
}

// Helper: Map frontend payload to Airtable fields (camelCase → snake_case)
function mapToAirtableFields(values: RequestFormValues) {
  // Combine use case and requirements into a single requirements field with clear formatting
  const combinedRequirements = values.useCase
    ? `USE CASE:\n${values.useCase}\n\n${"=".repeat(50)}\n\nDETAILED REQUIREMENTS:\n${values.requirements}`
    : values.requirements;

  const fields: Record<string, unknown> = {
    requester_name: values.requesterName,
    requester_email: values.requesterEmail,
    requester_company: values.requesterCompany,
    company_size: values.companySize,
    vertical: values.vertical,
    timeline: values.timeline,
    requirements: combinedRequirements,
    gdpr_consent: values.gdprConsent,
    source_channel: values.sourceChannel || "Direct",
    status: "New",
  };

  // Add optional fields only if they have values
  if (values.companyLocation) fields.company_location = values.companyLocation;
  if (values.budgetRange) fields.budget_range = values.budgetRange;
  if (values.currentTools) fields.current_tools = values.currentTools;
  // Note: request_source_url field doesn't exist in current Airtable schema
  // TODO: Add this field to Airtable REQUESTS table if needed for SEO attribution
  // if (values.requestSourceUrl) fields.request_source_url = values.requestSourceUrl;

  // compliance_needs appears to be a linked record field - only add if not empty
  if (values.complianceNeeds && values.complianceNeeds.length > 0) {
    // For now, skip this field as we don't know the record IDs
    // TODO: Map compliance need names to Airtable record IDs
  }

  return fields;
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate with Zod schema
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      const response: RequestApiResponse = {
        success: false,
        error: "Validation failed. Please check your input.",
        fieldErrors: formatZodErrors(parsed.error),
      };
      return NextResponse.json(response, { status: 400 });
    }

    const values = parsed.data;

    // Map to Airtable fields
    const airtableFields = mapToAirtableFields(values);

    // Create record in Airtable
    console.log("📝 Creating request in Airtable...");
    const record = await createRecord(REQUESTS_TABLE, airtableFields);
    const requestId = record.id;

    console.log(`✅ Request created: ${requestId}`);

    // Send email notification (non-blocking - don't fail if email fails)
    let emailSent = false;
    try {
      console.log("📧 Sending email notification...");
      await sendNewRequestEmail({ requestId, values });
      emailSent = true;
      console.log("✅ Email sent successfully");
    } catch (emailError) {
      console.error("❌ Failed to send email notification:", emailError);
      // Don't fail the request if email fails
      emailSent = false;
    }

    const response: RequestApiResponse = {
      success: true,
      requestId,
      message: "Request submitted successfully. We'll be in touch soon!",
      emailSent,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    console.error("❌ Unexpected error in /api/request:", error);

    const response: RequestApiResponse = {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };

    return NextResponse.json(response, { status: 500 });
  }
}

// Block non-POST methods
export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method not allowed" },
    { status: 405 }
  );
}
