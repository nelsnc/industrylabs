/**
 * Airtable Helper Functions
 *
 * Helper utilities for fetching and mapping Tool and Article data from Airtable.
 * These functions bridge between Airtable's data format and our frontend types.
 *
 * @module lib/airtable-helpers
 */

import { getTools as getAirtableTools, getToolBySlug as getAirtableToolBySlug, Tool as AirtableToolType, getAllRecords } from './airtable';

// Frontend Tool interface (matching our existing mock data structure)
export interface Tool {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  shortDescription: string;
  category: string;
  pricing: string;
  tags: string[];
  companySizeFit?: string[];
  geography?: string[];
  compliance?: string[];
  // Detail page fields
  tagline?: string;
  fullDescription?: string;
  features?: string[];
  complianceTags?: string[];
  integrationTags?: string[];
  websiteUrl?: string;
  detailedPricing?: string;
}

/**
 * Map Airtable Tool to frontend Tool format
 *
 * Transforms the Airtable tool structure into the format expected by our frontend components.
 * Handles pricing display, feature parsing, and tag aggregation.
 *
 * @param airtableTool - Tool from Airtable API
 * @returns Mapped Tool for frontend use
 */
function mapAirtableToolToFrontend(airtableTool: AirtableToolType): Tool {
  // Build pricing string for display
  let pricing = "Contact for pricing";
  if (airtableTool.pricingModel === "Free") {
    pricing = "Free";
  } else if (airtableTool.pricingModel === "Freemium") {
    pricing = "Freemium";
  } else if (airtableTool.startingPrice) {
    pricing = `From £${airtableTool.startingPrice}/mo`;
  } else if (airtableTool.pricingDetails) {
    // Use first 50 chars of pricing details
    pricing = airtableTool.pricingDetails.length > 50
      ? airtableTool.pricingDetails.substring(0, 50) + "..."
      : airtableTool.pricingDetails;
  }

  // Parse features from keyFeatures string
  const features = airtableTool.keyFeatures
    ? airtableTool.keyFeatures
        .split(/\n|•|-/)
        .map(s => s.trim())
        .filter(Boolean)
    : [];

  // Build tags array from verticals and tier
  const tags: string[] = [];
  if (airtableTool.tier === "Premium") tags.push("Premium");
  if (airtableTool.pricingModel === "Free") tags.push("Free");
  if (airtableTool.verticals) tags.push(...airtableTool.verticals);

  return {
    id: airtableTool.id,
    slug: airtableTool.slug,
    name: airtableTool.name,
    logoUrl: airtableTool.logoUrl,
    shortDescription: airtableTool.shortDescription,
    category: airtableTool.primaryVertical, // Use primary vertical as category
    pricing,
    tags,
    companySizeFit: airtableTool.companySizeFit,
    geography: [], // TODO: Add geography field to Airtable schema
    compliance: [], // TODO: Fetch linked compliance tags
    tagline: airtableTool.shortDescription, // Use short description as tagline
    fullDescription: airtableTool.longDescription,
    features,
    complianceTags: [], // TODO: Fetch linked compliance tags
    integrationTags: [], // TODO: Fetch linked integration tags
    websiteUrl: airtableTool.websiteUrl,
    detailedPricing: airtableTool.pricingDetails,
  };
}

/**
 * Get all Live tools from Airtable
 *
 * Fetches all tools with status='Live' and maps them to frontend format.
 * Results are sorted by date_added (newest first).
 *
 * @returns Array of mapped Tool objects
 * @throws {AirtableError} If the request fails
 */
export async function getAllTools(): Promise<Tool[]> {
  try {
    const airtableTools = await getAirtableTools();
    return airtableTools.map(mapAirtableToolToFrontend);
  } catch (error) {
    console.error("Error fetching tools from Airtable:", error);
    throw error;
  }
}

/**
 * Get featured tools for homepage
 *
 * Returns a curated list of tools for homepage display.
 * Premium tools are shown first, followed by regular tools.
 *
 * @param limit - Maximum number of tools to return (default: 4)
 * @returns Array of featured Tool objects
 */
export async function getFeaturedTools(limit = 4): Promise<Tool[]> {
  const tools = await getAllTools();

  // Separate Premium and regular tools
  const premium = tools.filter(t => t.tags.includes("Premium"));
  const regular = tools.filter(t => !t.tags.includes("Premium"));

  // Return Premium first, then regular, up to limit
  return [...premium, ...regular].slice(0, limit);
}

/**
 * Get tools by vertical (e.g., "HR & Talent")
 *
 * Filters tools that belong to a specific vertical.
 * Used for vertical-specific pages like /hr-talent.
 *
 * @param vertical - The vertical name to filter by
 * @returns Array of Tool objects for the specified vertical
 */
export async function getToolsByVertical(vertical: string): Promise<Tool[]> {
  const tools = await getAllTools();
  return tools.filter(t => t.tags.includes(vertical));
}

/**
 * Get a single tool by slug
 *
 * Fetches a specific tool by its slug for detail pages.
 * Returns null if no tool is found with the given slug.
 *
 * @param slug - The tool_slug to search for
 * @returns The Tool object if found, null otherwise
 * @throws {AirtableError} If the request fails
 */
export async function getToolBySlug(slug: string): Promise<Tool | null> {
  try {
    const airtableTool = await getAirtableToolBySlug(slug);
    if (!airtableTool) {
      return null;
    }
    return mapAirtableToolToFrontend(airtableTool);
  } catch (error) {
    console.error(`Error fetching tool by slug "${slug}":`, error);
    throw error;
  }
}

// ============================================================================
// Article Types and Functions
// ============================================================================

/**
 * Article interface for frontend use
 */
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole?: string;
  publishedAt: string;
  readTimeMinutes?: number;
  featuredImageUrl?: string;
  content: string[];
  relatedToolSlugs?: string[];
}

/**
 * Airtable Article fields
 */
interface ArticleFields {
  title: string;
  slug: string;
  article_type: string;
  vertical: string;
  primary_keyword: string;
  meta_description: string;
  content: string;
  featured_image_url?: string;
  author: string;
  status: "Draft" | "Published" | "Archived";
  is_published?: boolean; // Optional - may not exist in schema
  publish_date?: string;
  related_tools?: string[]; // Array of record IDs
  word_count?: number;
}

/**
 * Airtable Article record structure
 */
interface ArticleRecord {
  id: string;
  fields: ArticleFields;
  createdTime: string;
}

/**
 * Map Airtable Article record to frontend Article format
 *
 * Transforms the Airtable article structure into the format expected by our frontend components.
 * Only returns published articles with valid slugs.
 *
 * @param record - Article record from Airtable API
 * @returns Mapped Article for frontend use, or null if not publishable
 */
function mapArticleRecord(record: ArticleRecord): Article | null {
  const f = record.fields;

  // Only return published articles
  if (!f.slug || f.status !== "Published") {
    return null;
  }

  // Split content into paragraphs
  const content = f.content
    ? f.content.split(/\n\n+/).filter(Boolean)
    : [];

  // Calculate read time if not provided (rough estimate: 200 words per minute)
  const readTime = f.word_count
    ? Math.ceil(f.word_count / 200)
    : Math.ceil(content.join(" ").split(" ").length / 200);

  return {
    id: record.id,
    slug: f.slug,
    title: f.title,
    excerpt: f.meta_description.substring(0, 160),
    category: f.article_type,
    author: f.author,
    authorRole: "Editorial Team",
    publishedAt: f.publish_date || new Date().toISOString().split("T")[0],
    readTimeMinutes: readTime,
    featuredImageUrl: f.featured_image_url,
    content,
    relatedToolSlugs: f.related_tools || [],
  };
}

/**
 * Get all published articles from Airtable
 *
 * Fetches all articles with status='Published'.
 * Results are filtered to only include valid, publishable articles.
 *
 * @returns Array of mapped Article objects
 * @throws {AirtableError} If the request fails
 */
export async function getAllArticles(): Promise<Article[]> {
  try {
    const records = await getAllRecords("ARTICLES") as ArticleRecord[];
    return records
      .map(mapArticleRecord)
      .filter((a): a is Article => a !== null);
  } catch (error) {
    console.error("Error fetching articles from Airtable:", error);
    throw error;
  }
}

/**
 * Get a single article by slug
 *
 * Fetches a specific article by its slug for detail pages.
 * Returns null if no article is found with the given slug.
 *
 * @param slug - The article slug to search for
 * @returns The Article object if found, null otherwise
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find(a => a.slug === slug) || null;
}

/**
 * Get related tools for an article
 *
 * Fetches tools that are related to the given article.
 * Uses the relatedToolSlugs from the article to find matching tools.
 *
 * @param article - The article to find related tools for
 * @returns Array of related Tool objects (max 3)
 */
export async function getRelatedToolsForArticle(article: Article): Promise<Tool[]> {
  if (!article.relatedToolSlugs || article.relatedToolSlugs.length === 0) {
    return [];
  }

  const tools = await getAllTools();

  // For now, we have tool record IDs, but we need to match by slug
  // This is a simplified approach - in production you might want to
  // fetch specific records by ID
  return tools.slice(0, 3); // Return first 3 tools as related
}

// ============================================================================
// Tool Integration Types and Functions
// ============================================================================

import {
  ToolIntegration,
  ToolsIntegrationsFields,
  IntegrationQuality,
  VerificationSource,
  CreateToolIntegrationInput,
  IntegrationQueryOptions,
} from './types/integration';
import { createRecord } from './airtable';

/**
 * Airtable Integration fields
 */
interface IntegrationFields {
  integration_name: string;
  integration_category?: string;
  tools_count?: number;
}

/**
 * Airtable Tool fields (for integration lookup)
 */
interface ToolFieldsForIntegration {
  tool_name: string;
  tool_slug: string;
}

/**
 * Get all integrations for a specific tool
 *
 * Fetches junction records where tool_id matches the provided toolId
 * and resolves the linked integration details.
 *
 * @param toolId - The Airtable record ID of the tool
 * @param options - Optional query filters
 * @returns Array of ToolIntegration objects
 * @throws {AirtableError} If the request fails
 */
export async function getIntegrationsForTool(
  toolId: string,
  options?: IntegrationQueryOptions
): Promise<ToolIntegration[]> {
  try {
    // Fetch all junction records
    const junctionRecords = await getAllRecords('TOOLS_INTEGRATIONS') as Array<{
      id: string;
      fields: ToolsIntegrationsFields;
    }>;

    // Filter by toolId
    let filtered = junctionRecords.filter(
      record => record.fields.tool_id?.includes(toolId)
    );

    // Apply optional filters
    if (options?.quality) {
      filtered = filtered.filter(r => r.fields.integration_quality === options.quality);
    }
    if (options?.verificationSource) {
      filtered = filtered.filter(r => r.fields.verification_source === options.verificationSource);
    }
    if (options?.verifiedAfter) {
      filtered = filtered.filter(r =>
        r.fields.last_verified && r.fields.last_verified >= options.verifiedAfter!
      );
    }
    if (options?.limit) {
      filtered = filtered.slice(0, options.limit);
    }

    // Fetch tool and integration details for resolution
    const tools = await getAllRecords('TOOLS') as Array<{
      id: string;
      fields: ToolFieldsForIntegration;
    }>;
    const integrations = await getAllRecords('INTEGRATIONS') as Array<{
      id: string;
      fields: IntegrationFields;
    }>;

    // Map to ToolIntegration objects
    return filtered.map(record => {
      const tool = tools.find(t => record.fields.tool_id?.includes(t.id));
      const integration = integrations.find(i => record.fields.integration_id?.includes(i.id));

      return {
        junctionId: record.fields.junction_id || 0,
        toolId: record.fields.tool_id?.[0] || '',
        toolName: tool?.fields.tool_name || 'Unknown',
        integrationId: record.fields.integration_id?.[0] || '',
        integrationName: integration?.fields.integration_name || 'Unknown',
        quality: record.fields.integration_quality || 'Not Supported',
        notes: record.fields.integration_notes,
        lastVerified: record.fields.last_verified,
        verificationSource: record.fields.verification_source || 'AI Research',
      };
    });
  } catch (error) {
    console.error(`Error fetching integrations for tool "${toolId}":`, error);
    throw error;
  }
}

/**
 * Get all tools using a specific integration
 *
 * Fetches junction records where integration_id matches the provided integrationId
 * and resolves the linked tool details.
 *
 * @param integrationId - The Airtable record ID of the integration
 * @param options - Optional query filters
 * @returns Array of ToolIntegration objects
 * @throws {AirtableError} If the request fails
 */
export async function getToolsUsingIntegration(
  integrationId: string,
  options?: IntegrationQueryOptions
): Promise<ToolIntegration[]> {
  try {
    // Fetch all junction records
    const junctionRecords = await getAllRecords('TOOLS_INTEGRATIONS') as Array<{
      id: string;
      fields: ToolsIntegrationsFields;
    }>;

    // Filter by integrationId
    let filtered = junctionRecords.filter(
      record => record.fields.integration_id?.includes(integrationId)
    );

    // Apply optional filters
    if (options?.quality) {
      filtered = filtered.filter(r => r.fields.integration_quality === options.quality);
    }
    if (options?.verificationSource) {
      filtered = filtered.filter(r => r.fields.verification_source === options.verificationSource);
    }
    if (options?.verifiedAfter) {
      filtered = filtered.filter(r =>
        r.fields.last_verified && r.fields.last_verified >= options.verifiedAfter!
      );
    }
    if (options?.limit) {
      filtered = filtered.slice(0, options.limit);
    }

    // Fetch tool and integration details for resolution
    const tools = await getAllRecords('TOOLS') as Array<{
      id: string;
      fields: ToolFieldsForIntegration;
    }>;
    const integrations = await getAllRecords('INTEGRATIONS') as Array<{
      id: string;
      fields: IntegrationFields;
    }>;

    // Map to ToolIntegration objects
    return filtered.map(record => {
      const tool = tools.find(t => record.fields.tool_id?.includes(t.id));
      const integration = integrations.find(i => record.fields.integration_id?.includes(i.id));

      return {
        junctionId: record.fields.junction_id || 0,
        toolId: record.fields.tool_id?.[0] || '',
        toolName: tool?.fields.tool_name || 'Unknown',
        integrationId: record.fields.integration_id?.[0] || '',
        integrationName: integration?.fields.integration_name || 'Unknown',
        quality: record.fields.integration_quality || 'Not Supported',
        notes: record.fields.integration_notes,
        lastVerified: record.fields.last_verified,
        verificationSource: record.fields.verification_source || 'AI Research',
      };
    });
  } catch (error) {
    console.error(`Error fetching tools for integration "${integrationId}":`, error);
    throw error;
  }
}

/**
 * Get integration quality for a specific tool-integration pair
 *
 * Finds the junction record matching both IDs and returns the integration quality.
 *
 * @param toolId - The Airtable record ID of the tool
 * @param integrationId - The Airtable record ID of the integration
 * @returns The integration quality, or null if no relationship exists
 * @throws {AirtableError} If the request fails
 */
export async function getIntegrationQuality(
  toolId: string,
  integrationId: string
): Promise<IntegrationQuality | null> {
  try {
    // Fetch all junction records
    const junctionRecords = await getAllRecords('TOOLS_INTEGRATIONS') as Array<{
      id: string;
      fields: ToolsIntegrationsFields;
    }>;

    // Find matching junction record
    const match = junctionRecords.find(
      record =>
        record.fields.tool_id?.includes(toolId) &&
        record.fields.integration_id?.includes(integrationId)
    );

    return match?.fields.integration_quality || null;
  } catch (error) {
    console.error(`Error fetching integration quality for tool "${toolId}" and integration "${integrationId}":`, error);
    throw error;
  }
}

/**
 * Create a new tool-integration relationship
 *
 * Creates a junction record linking a tool to an integration with specified quality level.
 *
 * @param data - The integration relationship data
 * @returns The ID of the created junction record
 * @throws {Error} If validation fails
 * @throws {AirtableError} If the Airtable request fails
 */
export async function createToolIntegration(data: CreateToolIntegrationInput): Promise<string> {
  try {
    // Validate input
    if (!data.toolId) {
      throw new Error('toolId is required');
    }
    if (!data.integrationId) {
      throw new Error('integrationId is required');
    }
    if (!data.quality) {
      throw new Error('quality is required');
    }
    if (!data.verificationSource) {
      throw new Error('verificationSource is required');
    }

    // Check if junction record already exists
    const existing = await getIntegrationQuality(data.toolId, data.integrationId);
    if (existing) {
      throw new Error(`Integration relationship already exists between tool "${data.toolId}" and integration "${data.integrationId}"`);
    }

    // Prepare fields
    const fields: Record<string, unknown> = {
      tool_id: [data.toolId],
      integration_id: [data.integrationId],
      integration_quality: data.quality,
      verification_source: data.verificationSource,
      last_verified: data.lastVerified || new Date().toISOString().split('T')[0],
    };

    if (data.notes) {
      fields.integration_notes = data.notes;
    }

    // Create the junction record
    const record = await createRecord('TOOLS_INTEGRATIONS', fields);

    return record.id;
  } catch (error) {
    console.error('Error creating tool integration:', error);
    throw error;
  }
}
