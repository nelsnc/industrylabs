import { Resend } from "resend";
import { RequestFormValues } from "./validation/request";

const resendApiKey = process.env.RESEND_API_KEY;
const fromAddress =
  process.env.REQUEST_NOTIFICATION_FROM || "IndustryLabs <notifications@industrylabs.ai>";
const adminToAddress =
  process.env.REQUEST_NOTIFICATION_TO || "admin@industrylabs.ai";

if (!resendApiKey) {
  console.warn(
    "⚠️ RESEND_API_KEY is not set. Email notifications will be disabled."
  );
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

type NewRequestEmailParams = {
  requestId: string;
  values: RequestFormValues;
};

export async function sendNewRequestEmail(params: NewRequestEmailParams) {
  if (!resend) {
    throw new Error("Resend client not configured - RESEND_API_KEY missing");
  }

  const { requestId, values } = params;

  const subject = `🔔 New Request: ${values.requesterCompany} - ${values.vertical}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h2 { color: #0f766e; border-bottom: 2px solid #0f766e; padding-bottom: 10px; }
        h3 { color: #0f766e; margin-top: 24px; }
        .info-box { background: #f0fdfa; padding: 16px; border-radius: 8px; margin: 16px 0; }
        .detail { margin: 8px 0; }
        .label { font-weight: 600; color: #0f766e; }
        .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>New Request Board Submission</h2>

        <div class="info-box">
          <div class="detail"><span class="label">Request ID:</span> ${requestId}</div>
          <div class="detail"><span class="label">Submitted:</span> ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}</div>
        </div>

        <h3>👤 Buyer Details</h3>
        <div class="detail"><span class="label">Name:</span> ${values.requesterName}</div>
        <div class="detail"><span class="label">Email:</span> <a href="mailto:${values.requesterEmail}">${values.requesterEmail}</a></div>
        <div class="detail"><span class="label">Company:</span> ${values.requesterCompany}</div>
        <div class="detail"><span class="label">Company Size:</span> ${values.companySize} employees</div>
        ${values.companyLocation ? `<div class="detail"><span class="label">Location:</span> ${values.companyLocation}</div>` : ""}

        <h3>📋 Request Details</h3>
        <div class="detail"><span class="label">Vertical:</span> ${values.vertical}</div>
        <div class="detail"><span class="label">Timeline:</span> ${values.timeline}</div>
        ${values.budgetRange ? `<div class="detail"><span class="label">Budget:</span> ${values.budgetRange}/month</div>` : ""}

        <h3>💡 Use Case</h3>
        <div class="info-box">
          <p style="white-space: pre-wrap;">${values.useCase}</p>
        </div>

        <h3>📝 Detailed Requirements</h3>
        <div class="info-box">
          <p style="white-space: pre-wrap;">${values.requirements}</p>
        </div>

        ${values.currentTools ? `
          <h3>🔧 Current Tools</h3>
          <div class="info-box">
            <p>${values.currentTools}</p>
          </div>
        ` : ""}

        ${values.complianceNeeds && values.complianceNeeds.length > 0 ? `
          <h3>✅ Compliance Needs</h3>
          <div class="detail">${values.complianceNeeds.join(", ")}</div>
        ` : ""}

        ${values.requestSourceUrl ? `
          <div class="detail" style="margin-top: 16px;">
            <span class="label">Source URL:</span> <a href="${values.requestSourceUrl}">${values.requestSourceUrl}</a>
          </div>
        ` : ""}

        <div class="footer">
          <p>You can find this request in your Airtable REQUESTS table by searching for Request ID: <strong>${requestId}</strong></p>
          <p>Next steps: Review the request and match with appropriate tools from your database.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
New Request Board Submission

Request ID: ${requestId}
Submitted: ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}

BUYER DETAILS
=============
Name: ${values.requesterName}
Email: ${values.requesterEmail}
Company: ${values.requesterCompany}
Company Size: ${values.companySize}
${values.companyLocation ? `Location: ${values.companyLocation}` : ""}

REQUEST DETAILS
===============
Vertical: ${values.vertical}
Timeline: ${values.timeline}
${values.budgetRange ? `Budget: ${values.budgetRange}/month` : ""}

USE CASE
========
${values.useCase}

DETAILED REQUIREMENTS
=====================
${values.requirements}

${values.currentTools ? `CURRENT TOOLS\n${"=".repeat(20)}\n${values.currentTools}\n` : ""}
${values.complianceNeeds?.length ? `\nCOMPLIANCE NEEDS\n${"=".repeat(20)}\n${values.complianceNeeds.join(", ")}\n` : ""}
${values.requestSourceUrl ? `\nSOURCE URL: ${values.requestSourceUrl}` : ""}

---
Find this request in Airtable REQUESTS table using Request ID: ${requestId}
  `.trim();

  await resend.emails.send({
    from: fromAddress,
    to: adminToAddress,
    subject,
    html,
    text,
  });
}
