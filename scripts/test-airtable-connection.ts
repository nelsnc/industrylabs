import { testConnection } from "@/lib/airtable";

async function main() {
  console.log("=== Airtable Connection Test ===\n");

  const result = await testConnection();

  if (result.success) {
    console.log("\n✅ All systems go! Ready to integrate Airtable data.");
    console.log(`Found ${result.count} tools ready to display.`);
  } else {
    console.log("\n❌ Connection failed. Please check:");
    console.log("1. AIRTABLE_API_KEY in .env.local");
    console.log("2. AIRTABLE_BASE_ID in .env.local");
    console.log("3. Table name is exactly 'TOOLS' (case-sensitive)");
  }
}

main();
