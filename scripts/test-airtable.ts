/**
 * Airtable Integration Test Script
 *
 * This script tests the core functions from lib/airtable.ts
 * to ensure proper connectivity and data retrieval from Airtable.
 *
 * Usage: npx tsx scripts/test-airtable.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') });

import {
  getTools,
  getToolBySlug,
  getCategories,
  AirtableError,
} from '../lib/airtable';

/**
 * Test counter for reporting
 */
let testsRun = 0;
let testsPassed = 0;

/**
 * Print a test header
 */
function printTestHeader(testName: string): void {
  console.log('\n' + '='.repeat(60));
  console.log(`TEST ${++testsRun}: ${testName}`);
  console.log('='.repeat(60));
}

/**
 * Print test success
 */
function printSuccess(message: string): void {
  testsPassed++;
  console.log(`✓ ${message}`);
}

/**
 * Print test failure and exit
 */
function printFailure(message: string, error?: unknown): void {
  console.error(`✗ ${message}`);
  if (error) {
    if (error instanceof AirtableError) {
      console.error(`  AirtableError [${error.status}]: ${error.message}`);
      console.error(`  Code: ${error.code}`);
    } else if (error instanceof Error) {
      console.error(`  Error: ${error.message}`);
      console.error(`  Stack: ${error.stack}`);
    } else {
      console.error(`  Unknown error:`, error);
    }
  }
  process.exit(1);
}

/**
 * Test 1: getTools() - Fetch all Live tools
 */
async function testGetTools(): Promise<void> {
  printTestHeader('getTools() - Fetch all Live tools');

  try {
    const tools = await getTools();

    console.log(`📊 Total tools fetched: ${tools.length}`);

    if (tools.length === 0) {
      console.log('⚠️  Warning: No tools found in Airtable');
      printSuccess('getTools() succeeded (0 results)');
      return;
    }

    // Display first 3 tools
    const displayCount = Math.min(3, tools.length);
    console.log(`\n📋 Displaying first ${displayCount} tool(s):\n`);

    for (let i = 0; i < displayCount; i++) {
      const tool = tools[i];
      console.log(`${i + 1}. ${tool.name}`);
      console.log(`   - ID: ${tool.id}`);
      console.log(`   - Slug: ${tool.slug}`);
      console.log(`   - Tier: ${tool.tier}`);
      console.log(`   - Verification: ${tool.verificationStatus}`);
      console.log(`   - Primary Vertical: ${tool.primaryVertical}`);
      console.log(`   - Verticals: ${tool.verticals.join(', ')}`);
      console.log(`   - Company Size Fit: ${tool.companySizeFit.join(', ')}`);
      console.log(`   - Short Description: ${tool.shortDescription.substring(0, 80)}${tool.shortDescription.length > 80 ? '...' : ''}`);
      console.log(`   - Website: ${tool.websiteUrl}`);
      if (tool.g2Rating) {
        console.log(`   - G2 Rating: ${tool.g2Rating} (${tool.reviewCount || 0} reviews)`);
      }
      if (tool.pricingModel) {
        console.log(`   - Pricing: ${tool.pricingModel}${tool.startingPrice ? ` - Starting at $${tool.startingPrice}` : ''}`);
      }
      console.log('');
    }

    printSuccess(`getTools() succeeded with ${tools.length} tool(s)`);
  } catch (error) {
    printFailure('getTools() failed', error);
  }
}

/**
 * Test 2: getToolBySlug() - Fetch a specific tool by slug
 */
async function testGetToolBySlug(): Promise<void> {
  printTestHeader('getToolBySlug() - Fetch a specific tool');

  try {
    // First, get a valid slug from the available tools
    const tools = await getTools();

    if (tools.length === 0) {
      console.log('⚠️  Skipping test: No tools available to fetch by slug');
      printSuccess('getToolBySlug() skipped (no data)');
      return;
    }

    const testSlug = tools[0].slug;
    console.log(`🔍 Fetching tool with slug: "${testSlug}"\n`);

    const tool = await getToolBySlug(testSlug);

    if (!tool) {
      printFailure(`Tool with slug "${testSlug}" not found (expected to exist)`);
      return;
    }

    console.log(`📋 Tool found:\n`);
    console.log(`   - ID: ${tool.id}`);
    console.log(`   - Name: ${tool.name}`);
    console.log(`   - Slug: ${tool.slug}`);
    console.log(`   - Tier: ${tool.tier}`);
    console.log(`   - Verification: ${tool.verificationStatus}`);
    console.log(`   - Primary Vertical: ${tool.primaryVertical}`);
    console.log(`   - Short Description: ${tool.shortDescription}`);
    console.log(`   - Website: ${tool.websiteUrl}`);

    // Test non-existent slug
    console.log(`\n🔍 Testing non-existent slug: "non-existent-tool-12345"\n`);
    const nonExistentTool = await getToolBySlug('non-existent-tool-12345');

    if (nonExistentTool === null) {
      console.log(`   ✓ Correctly returned null for non-existent slug`);
    } else {
      printFailure('getToolBySlug() should return null for non-existent slug');
      return;
    }

    printSuccess('getToolBySlug() succeeded');
  } catch (error) {
    printFailure('getToolBySlug() failed', error);
  }
}

/**
 * Test 3: getCategories() - Fetch all Live categories
 */
async function testGetCategories(): Promise<void> {
  printTestHeader('getCategories() - Fetch all Live categories');

  try {
    const categories = await getCategories();

    console.log(`📊 Total categories fetched: ${categories.length}`);

    if (categories.length === 0) {
      console.log('⚠️  Warning: No categories found in Airtable');
      printSuccess('getCategories() succeeded (0 results)');
      return;
    }

    // Display first 3 categories
    const displayCount = Math.min(3, categories.length);
    console.log(`\n📋 Displaying first ${displayCount} category/categories:\n`);

    for (let i = 0; i < displayCount; i++) {
      const category = categories[i];
      console.log(`${i + 1}. ${category.name}`);
      console.log(`   - ID: ${category.id}`);
      console.log(`   - Type: ${category.type}`);
      console.log(`   - Slug: ${category.slug}`);
      console.log(`   - Status: ${category.status}`);
      console.log(`   - Description: ${category.description.substring(0, 80)}${category.description.length > 80 ? '...' : ''}`);
      if (category.parentVerticalId) {
        console.log(`   - Parent Vertical ID: ${category.parentVerticalId}`);
      }
      if (category.toolsCount !== undefined) {
        console.log(`   - Tools Count: ${category.toolsCount}`);
      }
      if (category.displayOrder !== undefined) {
        console.log(`   - Display Order: ${category.displayOrder}`);
      }
      console.log('');
    }

    printSuccess(`getCategories() succeeded with ${categories.length} category/categories`);
  } catch (error) {
    printFailure('getCategories() failed', error);
  }
}

/**
 * Test 4: getCategories(vertical) - Fetch categories for a specific vertical
 */
async function testGetCategoriesByVertical(): Promise<void> {
  printTestHeader('getCategories(vertical) - Fetch categories by vertical');

  try {
    // Test with a known vertical
    const testVertical = 'HR & Talent';
    console.log(`🔍 Fetching categories for vertical: "${testVertical}"\n`);

    const categories = await getCategories(testVertical);

    console.log(`📊 Total categories fetched: ${categories.length}`);

    if (categories.length === 0) {
      console.log(`⚠️  Warning: No categories found for vertical "${testVertical}"`);
      printSuccess(`getCategories(vertical) succeeded (0 results for "${testVertical}")`);
      return;
    }

    // Display first 3 categories
    const displayCount = Math.min(3, categories.length);
    console.log(`\n📋 Displaying first ${displayCount} category/categories:\n`);

    for (let i = 0; i < displayCount; i++) {
      const category = categories[i];
      console.log(`${i + 1}. ${category.name}`);
      console.log(`   - Type: ${category.type}`);
      console.log(`   - Slug: ${category.slug}`);
      console.log(`   - Description: ${category.description.substring(0, 60)}...`);
      if (category.toolsCount !== undefined) {
        console.log(`   - Tools Count: ${category.toolsCount}`);
      }
      console.log('');
    }

    printSuccess(`getCategories(vertical) succeeded with ${categories.length} category/categories`);
  } catch (error) {
    printFailure('getCategories(vertical) failed', error);
  }
}

/**
 * Main test runner
 */
async function runTests(): Promise<void> {
  console.log('\n🧪 Starting Airtable Integration Tests');
  console.log('━'.repeat(60));

  const startTime = Date.now();

  // Run all tests sequentially
  await testGetTools();
  await testGetToolBySlug();
  await testGetCategories();
  await testGetCategoriesByVertical();

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Print summary
  console.log('\n' + '━'.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('━'.repeat(60));
  console.log(`Total tests run: ${testsRun}`);
  console.log(`Tests passed: ${testsPassed}`);
  console.log(`Tests failed: ${testsRun - testsPassed}`);
  console.log(`Duration: ${duration}s`);
  console.log('━'.repeat(60));

  if (testsPassed === testsRun) {
    console.log('\n✅ All tests passed!\n');
    process.exit(0);
  } else {
    console.log('\n❌ Some tests failed\n');
    process.exit(1);
  }
}

// Run tests
runTests().catch((error) => {
  console.error('\n❌ Unexpected error during test execution:');
  console.error(error);
  process.exit(1);
});
