# Environment Variables Setup

## Required Environment Variables

Add these to your `.env.local` file:

### Airtable Configuration (Already configured)
```bash
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_base_id
```

### Email Notifications (NEW - for Request Board)
```bash
# Resend API Key (get from https://resend.com/api-keys)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Email addresses for notifications
REQUEST_NOTIFICATION_FROM="IndustryLabs <notifications@industrylabs.ai>"
REQUEST_NOTIFICATION_TO="your-email@example.com"
```

## Setting up Resend

1. **Create a Resend Account**
   - Go to https://resend.com
   - Sign up for a free account
   - Free tier includes 100 emails/day

2. **Get your API Key**
   - Navigate to https://resend.com/api-keys
   - Click "Create API Key"
   - Copy the key (starts with `re_`)
   - Add it to `.env.local` as `RESEND_API_KEY`

3. **Configure Email Addresses**

   **For Testing (Test Mode):**
   - You can send to ANY email address in test mode
   - Just use a valid email for `REQUEST_NOTIFICATION_TO`
   - No domain verification needed

   **For Production:**
   - You need to verify your sending domain
   - Go to https://resend.com/domains
   - Add your domain (e.g., industrylabs.ai)
   - Add the required DNS records
   - Once verified, you can send from addresses on that domain

4. **Environment Variable Examples**

   For local testing:
   ```bash
   RESEND_API_KEY=re_abc123def456ghi789
   REQUEST_NOTIFICATION_FROM="Test <test@resend.dev>"
   REQUEST_NOTIFICATION_TO="yourpersonal@gmail.com"
   ```

   For production:
   ```bash
   RESEND_API_KEY=re_live_xxxxxxxxx
   REQUEST_NOTIFICATION_FROM="IndustryLabs <notifications@industrylabs.ai>"
   REQUEST_NOTIFICATION_TO="admin@industrylabs.ai"
   ```

## How it Works

When a user submits the Request Board form:

1. **Frontend** → Validates data with Zod schema
2. **API Route** (`/api/request`) → Creates record in Airtable REQUESTS table
3. **Email Helper** → Sends formatted email notification via Resend
4. **Response** → Returns success with request ID

If email fails (e.g., RESEND_API_KEY not set), the request still succeeds in Airtable, but `emailSent` will be `false`.

## Testing Without Email

If you want to test the form without setting up Resend:

1. Leave `RESEND_API_KEY` unset or empty
2. The form will still work and create records in Airtable
3. You'll see a warning in the server logs: "⚠️ RESEND_API_KEY is not set"
4. The API will return `emailSent: false` in the response

## Verifying Setup

After adding environment variables:

1. Restart your dev server: `npm run dev`
2. Submit a test request at http://localhost:3000/request
3. Check:
   - Airtable REQUESTS table for new record
   - Email inbox for notification (if Resend configured)
   - Server logs for success/error messages

## Troubleshooting

### Email not sending
- Check `RESEND_API_KEY` is correct
- Verify email addresses are valid
- Check Resend dashboard for delivery status
- Look for error messages in server logs

### Form validation errors
- Check all required fields are filled
- Ensure use case is at least 10 characters
- Ensure requirements are at least 20 characters
- GDPR consent checkbox must be checked

### Airtable errors
- Verify `AIRTABLE_API_KEY` and `AIRTABLE_BASE_ID`
- Check that REQUESTS table exists in your base
- Ensure field names match schema (snake_case)
