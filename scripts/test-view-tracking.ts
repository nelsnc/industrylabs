/**
 * Test script for view tracking functionality
 * Run: npx tsx scripts/test-view-tracking.ts
 */

import { getAllTools } from "@/lib/airtable-helpers";

console.log("🧪 Testing View Tracking System\n");
console.log("━".repeat(50));

async function testViewTracking() {
  try {
    // Step 1: Fetch a tool from Airtable
    console.log("\n1️⃣  Fetching tools from Airtable...");
    const tools = await getAllTools();

    if (tools.length === 0) {
      console.log("❌ No tools found in Airtable");
      return;
    }

    const testTool = tools[0];
    console.log(`✅ Found ${tools.length} tools`);
    console.log(`   Testing with: ${testTool.name} (${testTool.id})`);
    console.log(`   Current views: ${testTool.page_views || 0}`);

    // Step 2: Test the view tracking API
    console.log("\n2️⃣  Testing view tracking API...");
    const response = await fetch(`http://localhost:3000/api/tools/${testTool.id}/view`, {
      method: "POST",
    });

    const data = await response.json();

    console.log(`\nStatus: ${response.status} ${response.statusText}`);
    console.log("\nResponse:");
    console.log(JSON.stringify(data, null, 2));

    if (response.ok && data.success) {
      console.log("\n✅ SUCCESS!");
      console.log("━".repeat(50));
      console.log("View tracking is working correctly!");
      console.log(`New view count: ${data.views}`);
      console.log("\nNext steps:");
      console.log("1. Visit http://localhost:3000/tools/" + testTool.slug);
      console.log("2. Check that view count increments in Airtable");
      console.log("3. Check that view count displays on tool cards");
      console.log("4. Check 'Most Viewed Tools' section on homepage");
    } else {
      console.log("\n❌ FAILED");
      console.log("━".repeat(50));
      console.log("Possible issues:");
      console.log("- Airtable credentials not set in .env.local");
      console.log("- Dev server not running (npm run dev)");
      console.log("- Tool record not found");
      console.log("- Rate limiting (wait 1 hour between views from same IP)");
    }
  } catch (error) {
    console.log("\n❌ ERROR");
    console.log("━".repeat(50));
    console.log(error);
    console.log("\nMake sure:");
    console.log("1. Dev server is running (npm run dev)");
    console.log("2. Airtable credentials are set in .env.local");
    console.log("3. You're testing against http://localhost:3000");
  }
}

testViewTracking();
