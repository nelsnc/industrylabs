/**
 * TypeScript Types for Tool Integrations
 *
 * Type definitions for the TOOLS_INTEGRATIONS junction table and related entities.
 * These types ensure type safety when working with tool-integration relationships.
 *
 * @module lib/types/integration
 */

/**
 * Integration quality levels
 *
 * - Native: Built-in integration provided by the vendor
 * - API: Custom API integration available
 * - Zapier: Integration available through Zapier
 * - Manual: Manual data export/import only
 * - Not Supported: No integration available
 */
export type IntegrationQuality =
  | 'Native'
  | 'API'
  | 'Zapier'
  | 'Manual'
  | 'Not Supported';

/**
 * Verification source for integration information
 *
 * - Vendor Documentation: Information from official vendor docs
 * - Partner Directory: Listed in vendor's partner/integration directory
 * - Support: Confirmed by vendor support team
 * - Tested: Personally tested and verified
 * - AI Research: Researched using AI tools
 */
export type VerificationSource =
  | 'Vendor Documentation'
  | 'Partner Directory'
  | 'Support'
  | 'Tested'
  | 'AI Research';

/**
 * Raw fields from TOOLS_INTEGRATIONS Airtable table
 *
 * This interface matches the exact field structure in Airtable.
 * Linked fields (tool_id, integration_id) are arrays of record IDs.
 */
export interface ToolsIntegrationsFields {
  junction_id?: number;
  tool_id?: string[];
  integration_id?: string[];
  integration_quality?: IntegrationQuality;
  integration_notes?: string;
  last_verified?: string;
  verification_source?: VerificationSource;
}

/**
 * Frontend-friendly ToolIntegration object
 *
 * This interface represents a fully resolved tool-integration relationship
 * with linked record details included for easy display.
 */
export interface ToolIntegration {
  /** Auto-generated junction ID */
  junctionId: number;

  /** Tool record ID */
  toolId: string;

  /** Tool name (resolved from link) */
  toolName: string;

  /** Integration record ID */
  integrationId: string;

  /** Integration name (resolved from link) */
  integrationName: string;

  /** Quality level of the integration */
  quality: IntegrationQuality;

  /** Optional notes about the integration */
  notes?: string;

  /** Date the integration was last verified (YYYY-MM-DD format) */
  lastVerified?: string;

  /** Source of verification */
  verificationSource: VerificationSource;
}

/**
 * Input data for creating a new tool-integration relationship
 */
export interface CreateToolIntegrationInput {
  /** Tool record ID */
  toolId: string;

  /** Integration record ID */
  integrationId: string;

  /** Quality level of the integration */
  quality: IntegrationQuality;

  /** Optional notes about the integration */
  notes?: string;

  /** Source of verification */
  verificationSource: VerificationSource;

  /** Optional date the integration was verified (defaults to today) */
  lastVerified?: string;
}

/**
 * Query options for fetching tool integrations
 */
export interface IntegrationQueryOptions {
  /** Filter by integration quality */
  quality?: IntegrationQuality;

  /** Filter by verification source */
  verificationSource?: VerificationSource;

  /** Only include integrations verified after this date */
  verifiedAfter?: string;

  /** Maximum number of results to return */
  limit?: number;
}
