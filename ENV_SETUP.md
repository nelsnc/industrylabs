# Environment Setup Guide

## Email Notifications (Resend)

### Development / Test Mode (推荐先用这个)

在开发阶段，使用Resend的test mode可以立即开始测试，无需配置DNS：

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxx
REQUEST_NOTIFICATION_FROM="IndustryLabs <onboarding@resend.dev>"
REQUEST_NOTIFICATION_TO="your-personal-email@gmail.com"
```

**步骤：**

1. 访问 https://resend.com 并注册
2. 创建API key
3. 在Dashboard → Verified Emails中添加你的个人邮箱
4. 验证邮箱（点击验证链接）
5. 复制API key到.env.local
6. 立即开始测试！

**限制：**
- From地址必须使用 `@resend.dev` domain
- 只能发送到verified email addresses
- 免费tier: 100 emails/day（足够开发使用）

---

### Production Mode (上线后使用)

Production环境使用自定义domain，需要一次性DNS配置：

```bash
# Vercel环境变量
RESEND_API_KEY=re_xxxxxxxxxxxxx
REQUEST_NOTIFICATION_FROM="IndustryLabs <requests@industrylabs.ai>"
REQUEST_NOTIFICATION_TO="contact@industrylabs.ai"
```

**额外步骤（只需做一次）：**

1. **在Resend Dashboard添加domain：**
   - 进入 Domains → Add Domain
   - 输入 `industrylabs.ai`

2. **配置DNS记录：**

   Resend会提供3条DNS记录，类似：
   ```
   TXT  @  v=spf1 include:_spf.resend.com ~all
   CNAME resend._domainkey  [key].resend.com
   CNAME resend2._domainkey [key].resend.com
   ```

   在你的DNS provider添加这些记录：
   - 登录你的domain registrar (Namecheap/Cloudflare/etc)
   - 添加上述3条DNS记录
   - 等待5-10分钟DNS propagation

3. **验证domain：**
   - 回到Resend dashboard
   - 点击 "Verify Domain"
   - 看到 ✅ Verified

4. 更新Vercel环境变量并重新部署

完成后，你可以使用任何 @industrylabs.ai 邮箱作为发件人。

**推荐的邮箱地址：**
- ✅ `requests@industrylabs.ai` - 专门用于Request Board（最佳）
- ✅ `notifications@industrylabs.ai` - 通用通知邮件
- ✅ `contact@industrylabs.ai` - 如果你已经在用这个

**注意：** 你不需要在Gmail/Outlook创建这些邮箱账号，Resend会代表你的domain发送邮件。

---

## Airtable Configuration

Already configured - no changes needed:

```bash
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_base_id
```

---

## How it Works

When a user submits the Request Board form:

1. **Frontend** → Validates data with Zod schema
2. **API Route** (`/api/request`) → Creates record in Airtable REQUESTS table
3. **Email Helper** → Sends formatted email notification via Resend
4. **Response** → Returns success with request ID

If email fails (e.g., RESEND_API_KEY not set), the request still succeeds in Airtable, but `emailSent` will be `false`.

---

## Testing Without Email

If you want to test the form without setting up Resend:

1. Leave `RESEND_API_KEY` unset or empty
2. The form will still work and create records in Airtable
3. You'll see a warning in the server logs: "⚠️ RESEND_API_KEY is not set"
4. The API will return `emailSent: false` in the response

---

## Verifying Setup

After adding environment variables:

1. Restart your dev server: `npm run dev`
2. Submit a test request at http://localhost:3000/request
3. Check:
   - Airtable REQUESTS table for new record
   - Email inbox for notification (if Resend configured)
   - Server logs for success/error messages

---

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
