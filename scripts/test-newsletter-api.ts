/**
 * Test script for newsletter subscription API
 * Run: npx tsx scripts/test-newsletter-api.ts
 */

export {};

const TEST_EMAIL = "test@example.com"; // Change this to your test email

console.log("🧪 Testing Newsletter Subscription API\n");
console.log(`Test email: ${TEST_EMAIL}`);
console.log("━".repeat(50));

async function testSubscription() {
  try {
    console.log("\n1️⃣  Sending subscription request...");

    const response = await fetch("http://localhost:3000/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: TEST_EMAIL }),
    });

    const data = await response.json();

    console.log(`\nStatus: ${response.status} ${response.statusText}`);
    console.log("\nResponse:");
    console.log(JSON.stringify(data, null, 2));

    if (response.ok && data.success) {
      console.log("\n✅ SUCCESS!");
      console.log("━".repeat(50));
      console.log("Next steps:");
      console.log("1. Check ConvertKit dashboard for new subscriber");
      console.log("2. Verify tags: 'IndustryLabs Website', 'Newsletter Signup'");
      console.log("3. Check your email for confirmation (if double opt-in enabled)");
    } else {
      console.log("\n❌ FAILED");
      console.log("━".repeat(50));
      console.log("Possible issues:");
      console.log("- ConvertKit credentials not set in .env.local");
      console.log("- Dev server not running (npm run dev)");
      console.log("- Email already subscribed");
      console.log("- Invalid API Secret or Form ID");
    }
  } catch (error) {
    console.log("\n❌ ERROR");
    console.log("━".repeat(50));
    console.log(error);
    console.log("\nMake sure:");
    console.log("1. Dev server is running (npm run dev)");
    console.log("2. You're testing against http://localhost:3000");
  }
}

// Check environment first
const apiSecret = process.env.CONVERTKIT_API_SECRET;
const formId = process.env.CONVERTKIT_FORM_ID;

if (!apiSecret || !formId) {
  console.log("\n⚠️  ConvertKit credentials not found!");
  console.log("Run: npx tsx scripts/check-convertkit-setup.ts");
  console.log("\nNote: This test script needs credentials to validate,");
  console.log("but the actual API will show helpful errors if they're missing.");
} else {
  console.log("✅ ConvertKit credentials found in environment");
  console.log(`   Form ID: ${formId}`);
  console.log(`   API Secret: ${apiSecret.substring(0, 10)}...`);
}

console.log("\n2️⃣  Starting test...");
testSubscription();
