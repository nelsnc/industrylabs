/**
 * Quick script to verify ConvertKit environment variables are set
 * Run: npx tsx scripts/check-convertkit-setup.ts
 */

export {};

console.log("🔍 Checking ConvertKit Setup...\n");

const apiSecret = process.env.CONVERTKIT_API_SECRET;
const formId = process.env.CONVERTKIT_FORM_ID;

console.log("Environment Variables:");
console.log("━".repeat(50));

if (apiSecret) {
  console.log("✅ CONVERTKIT_API_SECRET is set");
  console.log(`   Value: ${apiSecret.substring(0, 10)}...${apiSecret.substring(apiSecret.length - 4)}`);
} else {
  console.log("❌ CONVERTKIT_API_SECRET is NOT set");
  console.log("   Add to .env.local: CONVERTKIT_API_SECRET=your_secret_here");
}

if (formId) {
  console.log("✅ CONVERTKIT_FORM_ID is set");
  console.log(`   Value: ${formId}`);
} else {
  console.log("❌ CONVERTKIT_FORM_ID is NOT set");
  console.log("   Add to .env.local: CONVERTKIT_FORM_ID=your_form_id_here");
}

console.log("\n" + "━".repeat(50));

if (apiSecret && formId) {
  console.log("✅ All ConvertKit credentials are configured!");
  console.log("\n📝 Next steps:");
  console.log("   1. Restart your dev server (npm run dev)");
  console.log("   2. Visit http://localhost:3000");
  console.log("   3. Scroll to newsletter section");
  console.log("   4. Test with your email");
  console.log("   5. Check ConvertKit dashboard for new subscriber");
} else {
  console.log("⚠️  Setup incomplete. Follow these steps:");
  console.log("\n1. Get ConvertKit API Secret:");
  console.log("   → https://app.convertkit.com/account_settings/advanced_settings");
  console.log("   → Copy the 'API Secret' (NOT 'API Key')");
  console.log("\n2. Get ConvertKit Form ID:");
  console.log("   → https://app.convertkit.com/forms");
  console.log("   → Create or open a form");
  console.log("   → Look at URL: .../forms/XXXXXXX/edit");
  console.log("   → XXXXXXX is your Form ID");
  console.log("\n3. Add to .env.local:");
  console.log("   CONVERTKIT_API_SECRET=your_secret_here");
  console.log("   CONVERTKIT_FORM_ID=your_form_id_here");
  console.log("\n4. Restart dev server");
}
