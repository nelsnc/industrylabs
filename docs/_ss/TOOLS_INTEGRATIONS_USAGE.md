# TOOLS_INTEGRATIONS Junction Table Usage Guide

**Last Updated:** 2025-11-28
**Status:** Operational (8/10 validation checks passing)

---

## Table of Contents

1. [Overview](#overview)
2. [Schema Reference](#schema-reference)
3. [Relationship Diagram](#relationship-diagram)
4. [Integration Quality Levels](#integration-quality-levels)
5. [Usage Examples](#usage-examples)
6. [Data Import Process](#data-import-process)
7. [Troubleshooting](#troubleshooting)
8. [API Reference](#api-reference)

---

## Overview

The `TOOLS_INTEGRATIONS` table is a **junction table** that creates many-to-many relationships between the `TOOLS` and `INTEGRATIONS` tables.

### Purpose

- Track which tools integrate with which platforms/services
- Record the **quality level** of each integration (Native, API, Zapier, etc.)
- Store verification status and notes about each integration
- Enable querying in both directions:
  - "What integrations does BambooHR support?"
  - "Which tools integrate with Slack?"

### Key Features

- **Bidirectional relationships**: Links work both ways (TOOLS ↔ INTEGRATIONS)
- **Count fields**: INTEGRATIONS table auto-counts connected tools
- **Quality tracking**: Native, API, Zapier, Manual, Not Supported
- **Verification metadata**: Source and date of verification
- **Notes field**: Store integration-specific details

---

## Schema Reference

### Table: TOOLS_INTEGRATIONS

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `junction_id` | Autonumber | Auto | Primary key (auto-generated) |
| `tool_id` | Link to TOOLS | Yes | The tool in this relationship |
| `integration_id` | Link to INTEGRATIONS | Yes | The integration platform/service |
| `integration_quality` | Single Select | Yes | Quality level of the integration |
| `integration_notes` | Long text | No | Notes about the integration |
| `last_verified` | Date | No | When the integration was last verified |
| `verification_source` | Single Select | Yes | How the integration was verified |

### Integration Quality Options

```typescript
type IntegrationQuality =
  | "Native"         // Built-in integration by vendor
  | "API"            // Custom API integration available
  | "Zapier"         // Available via Zapier
  | "Manual"         // Manual export/import only
  | "Not Supported"  // No integration available
```

### Verification Source Options

```typescript
type VerificationSource =
  | "Vendor Documentation"  // Official vendor docs
  | "Partner Directory"     // Listed in vendor's directory
  | "Support"               // Confirmed by support team
  | "Tested"                // Personally tested
  | "AI Research"           // Researched using AI tools
```

---

## Relationship Diagram

```
┌─────────────────┐         ┌───────────────────────┐         ┌──────────────────┐
│     TOOLS       │         │  TOOLS_INTEGRATIONS   │         │   INTEGRATIONS   │
├─────────────────┤         ├───────────────────────┤         ├──────────────────┤
│ tool_id (PK)    │◄────┐   │ junction_id (PK)      │   ┌────►│ integration_id   │
│ tool_name       │     │   │                       │   │     │ integration_name │
│ tool_slug       │     └───│ tool_id (FK)          │   │     │ tools_count      │
│ ...             │         │ integration_id (FK) ──┼───┘     │ ...              │
│ integrations[]  │◄────────│                       │         │ tools[]          │
└─────────────────┘         │ integration_quality   │         └──────────────────┘
                            │ integration_notes     │
                            │ last_verified         │
                            │ verification_source   │
                            └───────────────────────┘
```

### Bidirectional Links

- **TOOLS.integrations**: Auto-generated field linking to TOOLS_INTEGRATIONS
- **INTEGRATIONS.tools**: Auto-generated field linking to TOOLS_INTEGRATIONS
- **INTEGRATIONS.tools_count**: Count field that auto-updates based on junction records

---

## Integration Quality Levels

### When to Use Each Quality Level

#### Native
**Best for:** Built-in integrations provided by the vendor

**Examples:**
- BambooHR's native Workday HRIS sync
- Greenhouse's built-in Slack notifications
- Lever's native LinkedIn integration

**Indicators:**
- Appears in vendor's official integration menu
- No third-party tools required
- Vendor provides documentation and support

---

#### API
**Best for:** Integrations requiring custom API development

**Examples:**
- BambooHR's API for custom Slack webhooks
- Greenhouse API for custom dashboard integrations
- Any integration using REST/GraphQL APIs

**Indicators:**
- Requires API key or OAuth setup
- Developer documentation available
- Custom code or middleware needed

---

#### Zapier
**Best for:** Integrations available through Zapier (or similar)

**Examples:**
- BambooHR ↔ Salesforce via Zapier
- Greenhouse ↔ Trello via Zapier
- Any tool using iPaaS platforms

**Indicators:**
- Listed in Zapier's app directory
- Pre-built Zap templates available
- No custom code required

---

#### Manual
**Best for:** Tools requiring manual data export/import

**Examples:**
- CSV export from one tool, import to another
- Copy-paste workflows
- Screen scraping

**Indicators:**
- No API available
- No automation possible
- Requires manual intervention

---

#### Not Supported
**Best for:** Explicitly unsupported integrations

**Examples:**
- Competitor tools that don't integrate
- Legacy systems without APIs
- Confirmed non-integrations

**Indicators:**
- Vendor confirms no integration exists
- No API or export functionality
- Technically incompatible

---

## Usage Examples

### Example 1: Query All Integrations for a Tool

```typescript
import { getIntegrationsForTool } from '@/lib/airtable-helpers';

// Get all integrations for BambooHR
const bambooHRId = 'recIFqGyXNlVEYMGm';
const integrations = await getIntegrationsForTool(bambooHRId);

console.log(integrations);
// [
//   {
//     junctionId: 4,
//     toolId: 'recIFqGyXNlVEYMGm',
//     toolName: 'BambooHR',
//     integrationId: 'recK5kHdXXg0Q54zI',
//     integrationName: 'Workday',
//     quality: 'Native',
//     notes: 'Native bi-directional sync...',
//     lastVerified: '2025-11-28',
//     verificationSource: 'Tested'
//   },
//   ...
// ]
```

### Example 2: Filter Integrations by Quality

```typescript
import { getIntegrationsForTool } from '@/lib/airtable-helpers';

// Get only Native integrations for BambooHR
const nativeIntegrations = await getIntegrationsForTool(bambooHRId, {
  quality: 'Native'
});

// Get recently verified integrations
const recentIntegrations = await getIntegrationsForTool(bambooHRId, {
  verifiedAfter: '2025-11-01',
  limit: 5
});
```

### Example 3: Find All Tools Using an Integration

```typescript
import { getToolsUsingIntegration } from '@/lib/airtable-helpers';

// Find all tools that integrate with Slack
const slackId = 'recjBrSpMcvd4aBwI';
const slackTools = await getToolsUsingIntegration(slackId);

console.log(slackTools);
// [
//   { toolName: 'BambooHR', quality: 'API', ... },
//   { toolName: 'Greenhouse', quality: 'Native', ... }
// ]
```

### Example 4: Check Integration Quality Between Two Specific Records

```typescript
import { getIntegrationQuality } from '@/lib/airtable-helpers';

const bambooHRId = 'recIFqGyXNlVEYMGm';
const workdayId = 'recK5kHdXXg0Q54zI';

const quality = await getIntegrationQuality(bambooHRId, workdayId);
console.log(quality); // 'Native'
```

### Example 5: Create a New Integration Relationship

```typescript
import { createToolIntegration } from '@/lib/airtable-helpers';

const junctionId = await createToolIntegration({
  toolId: 'recXXXXXXXXXXXXX',
  integrationId: 'recYYYYYYYYYYYYY',
  quality: 'Native',
  notes: 'Built-in integration with bi-directional sync',
  verificationSource: 'Vendor Documentation',
  lastVerified: '2025-11-28'
});

console.log(`Created junction record: ${junctionId}`);
```

---

## Data Import Process

### For Bulk Importing Integration Data (TASK-415)

When importing vendor-specific integration data from research:

#### Step 1: Prepare Data Structure

```typescript
const vendorIntegrations = [
  {
    toolName: 'BambooHR',
    integrations: [
      {
        integrationName: 'Workday',
        quality: 'Native',
        notes: 'Bi-directional sync for employee data',
        verificationSource: 'Vendor Documentation'
      },
      {
        integrationName: 'Slack',
        quality: 'API',
        notes: 'Webhooks for notifications',
        verificationSource: 'Tested'
      }
    ]
  }
];
```

#### Step 2: Resolve Record IDs

```typescript
import { getAllRecords } from '@/lib/airtable';

// Get all tools
const tools = await getAllRecords('TOOLS');
const toolId = tools.find(t => t.fields.tool_name === 'BambooHR')?.id;

// Get all integrations
const integrations = await getAllRecords('INTEGRATIONS');
const integrationId = integrations.find(i =>
  i.fields.integration_name === 'Workday'
)?.id;
```

#### Step 3: Create Junction Records

```typescript
import { createToolIntegration } from '@/lib/airtable-helpers';

for (const integration of vendorIntegrations) {
  await createToolIntegration({
    toolId,
    integrationId,
    quality: integration.quality,
    notes: integration.notes,
    verificationSource: integration.verificationSource,
    lastVerified: new Date().toISOString().split('T')[0]
  });
}
```

#### Step 4: Verify Import

```typescript
// Check that count field updated
const updatedIntegration = await getAllRecords('INTEGRATIONS');
const workday = updatedIntegration.find(i =>
  i.fields.integration_name === 'Workday'
);
console.log(`Workday now used by ${workday.fields.tools_count} tools`);
```

### Bulk Import Script Template

See [scripts/create-test-integrations.ts](../scripts/create-test-integrations.ts) for a working example of:
- Finding tools and integrations by name
- Checking for existing junction records
- Creating multiple junction records in batch
- Verifying creation

---

## Troubleshooting

### Issue 1: "Integration relationship already exists"

**Problem:** Trying to create a duplicate junction record.

**Solution:**
```typescript
// Check if exists before creating
const existing = await getIntegrationQuality(toolId, integrationId);
if (existing) {
  console.log(`Integration already exists with quality: ${existing}`);
  // Update instead of create, or skip
} else {
  await createToolIntegration({ ... });
}
```

---

### Issue 2: Count field not updating

**Problem:** `INTEGRATIONS.tools_count` shows 0 even though junction records exist.

**Root Cause:** Count field may not be linked to the correct field in Airtable UI.

**Solution:**
1. Open Airtable UI
2. Navigate to INTEGRATIONS table
3. Click on `tools_count` field settings
4. Ensure it's counting records from the auto-generated `tools` link field
5. The link field should point to TOOLS_INTEGRATIONS table

---

### Issue 3: Bidirectional links not working

**Problem:** `TOOLS.integrations` field is empty even though junction records exist.

**Root Cause:** Reverse link not configured in Airtable.

**Solution:**
1. Open Airtable UI
2. Navigate to TOOLS_INTEGRATIONS table
3. Click on `tool_id` field settings
4. Under "Allow linking to multiple records", ensure it's checked
5. Check that the reverse link is created in TOOLS table
6. The reverse link should be named `integrations`

---

### Issue 4: TypeScript errors with helper functions

**Problem:** Type errors when using helper functions.

**Solution:**
```typescript
// Ensure you import from the correct module
import {
  getIntegrationsForTool,
  getToolsUsingIntegration,
  getIntegrationQuality,
  createToolIntegration
} from '@/lib/airtable-helpers';

// Import types separately
import type {
  ToolIntegration,
  IntegrationQuality,
  CreateToolIntegrationInput
} from '@/lib/types/integration';
```

---

### Issue 5: Missing tool_id in existing records

**Problem:** Old junction records don't have `tool_id` populated.

**Root Cause:** Records created before bidirectional link was configured.

**Solution:**
1. Identify affected records using [scripts/inspect-tools-integrations-table.ts](../scripts/inspect-tools-integrations-table.ts)
2. Manually update in Airtable UI, or
3. Delete and recreate with proper links

---

## API Reference

### Functions

#### `getIntegrationsForTool(toolId, options?)`

Get all integrations for a specific tool.

**Parameters:**
- `toolId` (string): Airtable record ID of the tool
- `options` (optional):
  - `quality`: Filter by integration quality
  - `verificationSource`: Filter by verification source
  - `verifiedAfter`: Only include integrations verified after date
  - `limit`: Maximum results to return

**Returns:** `Promise<ToolIntegration[]>`

**Example:**
```typescript
const integrations = await getIntegrationsForTool('recXXX', {
  quality: 'Native',
  limit: 10
});
```

---

#### `getToolsUsingIntegration(integrationId, options?)`

Get all tools using a specific integration.

**Parameters:**
- `integrationId` (string): Airtable record ID of the integration
- `options` (optional): Same as `getIntegrationsForTool`

**Returns:** `Promise<ToolIntegration[]>`

**Example:**
```typescript
const tools = await getToolsUsingIntegration('recYYY', {
  quality: 'Native'
});
```

---

#### `getIntegrationQuality(toolId, integrationId)`

Check the integration quality between a specific tool and integration.

**Parameters:**
- `toolId` (string): Airtable record ID of the tool
- `integrationId` (string): Airtable record ID of the integration

**Returns:** `Promise<IntegrationQuality | null>`

**Example:**
```typescript
const quality = await getIntegrationQuality('recXXX', 'recYYY');
if (quality === 'Native') {
  console.log('Native integration available!');
}
```

---

#### `createToolIntegration(data)`

Create a new tool-integration relationship.

**Parameters:**
- `data` (CreateToolIntegrationInput):
  - `toolId` (required): Tool record ID
  - `integrationId` (required): Integration record ID
  - `quality` (required): Integration quality level
  - `verificationSource` (required): How it was verified
  - `notes` (optional): Integration notes
  - `lastVerified` (optional): Verification date (defaults to today)

**Returns:** `Promise<string>` (created junction record ID)

**Throws:** Error if relationship already exists or validation fails

**Example:**
```typescript
const junctionId = await createToolIntegration({
  toolId: 'recXXX',
  integrationId: 'recYYY',
  quality: 'Native',
  verificationSource: 'Vendor Documentation',
  notes: 'Bi-directional sync available'
});
```

---

### Types

See [lib/types/integration.ts](../lib/types/integration.ts) for complete type definitions:

- `IntegrationQuality`: Union type for quality levels
- `VerificationSource`: Union type for verification sources
- `ToolsIntegrationsFields`: Raw Airtable fields
- `ToolIntegration`: Frontend-friendly object
- `CreateToolIntegrationInput`: Input for creating relationships
- `IntegrationQueryOptions`: Query filter options

---

## Next Steps

### For TASK-410 to TASK-418 (Vendor Data Import)

1. **Research vendor integrations** using vendor documentation
2. **Prepare data structure** in TypeScript/JSON format
3. **Run bulk import script** to create junction records
4. **Verify count fields** update correctly in INTEGRATIONS table
5. **Test queries** in both directions (tool→integrations, integration→tools)

### For Future Enhancements

- Add `integration_depth` field (e.g., "Read-only", "Read-Write", "Bi-directional")
- Add `setup_complexity` field (e.g., "Easy", "Medium", "Complex")
- Add `documentation_url` field for integration guides
- Create UI components to display integration badges
- Build integration comparison tools

---

## Related Files

- [lib/airtable-helpers.ts](../lib/airtable-helpers.ts): Helper functions
- [lib/types/integration.ts](../lib/types/integration.ts): TypeScript types
- [scripts/inspect-tools-integrations-table.ts](../scripts/inspect-tools-integrations-table.ts): Inspection script
- [scripts/create-test-integrations.ts](../scripts/create-test-integrations.ts): Test record creation
- [scripts/test-tools-integrations-table.ts](../scripts/test-tools-integrations-table.ts): Validation script

---

**Document maintained by:** Claude Code
**For questions or issues:** See TASK-202 in EXECUTION_HUB.md
