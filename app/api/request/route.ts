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
  return {
    requester_name: values.requesterName,
    requester_email: values.requesterEmail,
    requester_company: values.requesterCompany,
    company_size: values.companySize,
    company_location: values.companyLocation,
    vertical: values.vertical,
    use_case: values.useCase,
    budget_range: values.budgetRange,
    timeline: values.timeline,
    current_tools: values.currentTools,
    requirements: values.requirements,
    compliance_needs: values.complianceNeeds,
    gdpr_consent: values.gdprConsent,
    source_channel: values.sourceChannel || "Direct",
    request_source_url: values.requestSourceUrl,
    status: "New",
  };
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
