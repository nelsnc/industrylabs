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

  // GROUP 1: Company Size & Regional Fit (v2.3)
  idealCompanySize?: string[];
  companySizeNotes?: string;
  supportedRegions?: string[];

  // GROUP 2: Pricing Engine (v2.3)
  pricingAnnualMin?: number;
  pricingAnnualMax?: number;
  pricingCurrency?: 'GBP' | 'USD' | 'EUR';
  pricingNotes?: string;
  pricingDisplay?: string;
  pricingSourceUrl?: string;
  setupFee?: number;
  setupFeeIncluded?: boolean;
  freeTrialAvailable?: boolean;
  freeTrialDurationDays?: number;
  contractLengthOptions?: string[];

  // GROUP 3: Compliance & Certifications (v2.3)
  gdprCompliant?: boolean;
  eeocCompliant?: boolean;
  soc2Certified?: boolean;
  hipaaCompliant?: boolean;
  iso27001Certified?: boolean;
  complianceDocumentationUrl?: string;
  complianceNotes?: string;

  // GROUP 4: Implementation Timeline (v2.3)
  implementationTimelineWeeksMin?: number;
  implementationTimelineWeeksMax?: number;
  implementationTimelineDisplay?: string;
  itHoursRequired?: number;
  hrAdminHoursRequired?: number;
  trainingHoursAdmin?: number;
  trainingHoursEnduser?: number;
  implementationPrerequisites?: string;
  commonImplementationDelays?: string;

  // GROUP 5: Case Study & Social Proof (v2.3)
  caseStudyUrl?: string;
  caseStudyCompanySize?: number;
  caseStudyIndustry?: string;
  caseStudyImplementationWeeks?: number;
  caseStudyResults?: string;
  notableCustomers?: string;

  // GROUP 6: Integrations & Rich Media (v2.3)
  otherIntegrations?: string;
  demoVideoUrl?: string;
  primaryCompetitorIds?: string[];

  // Analytics
  page_views?: number;
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
    geography: airtableTool.supportedRegions || [],
    compliance: [], // TODO: Fetch linked compliance tags
    tagline: airtableTool.shortDescription, // Use short description as tagline
    fullDescription: airtableTool.longDescription,
    features,
    complianceTags: [], // TODO: Fetch linked compliance tags
    integrationTags: [], // TODO: Fetch linked integration tags
    websiteUrl: airtableTool.websiteUrl,
    detailedPricing: airtableTool.pricingDetails,

    // GROUP 1: Company Size & Regional Fit (v2.3)
    idealCompanySize: airtableTool.idealCompanySize,
    companySizeNotes: airtableTool.companySizeNotes,
    supportedRegions: airtableTool.supportedRegions,

    // GROUP 2: Pricing Engine (v2.3)
    pricingAnnualMin: airtableTool.pricingAnnualMin,
    pricingAnnualMax: airtableTool.pricingAnnualMax,
    pricingCurrency: airtableTool.pricingCurrency,
    pricingNotes: airtableTool.pricingNotes,
    pricingDisplay: airtableTool.pricingDisplay,
    pricingSourceUrl: airtableTool.pricingSourceUrl,
    setupFee: airtableTool.setupFee,
    setupFeeIncluded: airtableTool.setupFeeIncluded,
    freeTrialAvailable: airtableTool.freeTrialAvailable,
    freeTrialDurationDays: airtableTool.freeTrialDurationDays,
    contractLengthOptions: airtableTool.contractLengthOptions,

    // GROUP 3: Compliance & Certifications (v2.3)
    gdprCompliant: airtableTool.gdprCompliant,
    eeocCompliant: airtableTool.eeocCompliant,
    soc2Certified: airtableTool.soc2Certified,
    hipaaCompliant: airtableTool.hipaaCompliant,
    iso27001Certified: airtableTool.iso27001Certified,
    complianceDocumentationUrl: airtableTool.complianceDocumentationUrl,
    complianceNotes: airtableTool.complianceNotes,

    // GROUP 4: Implementation Timeline (v2.3)
    implementationTimelineWeeksMin: airtableTool.implementationTimelineWeeksMin,
    implementationTimelineWeeksMax: airtableTool.implementationTimelineWeeksMax,
    implementationTimelineDisplay: airtableTool.implementationTimelineDisplay,
    itHoursRequired: airtableTool.itHoursRequired,
    hrAdminHoursRequired: airtableTool.hrAdminHoursRequired,
    trainingHoursAdmin: airtableTool.trainingHoursAdmin,
    trainingHoursEnduser: airtableTool.trainingHoursEnduser,
    implementationPrerequisites: airtableTool.implementationPrerequisites,
    commonImplementationDelays: airtableTool.commonImplementationDelays,

    // GROUP 5: Case Study & Social Proof (v2.3)
    caseStudyUrl: airtableTool.caseStudyUrl,
    caseStudyCompanySize: airtableTool.caseStudyCompanySize,
    caseStudyIndustry: airtableTool.caseStudyIndustry,
    caseStudyImplementationWeeks: airtableTool.caseStudyImplementationWeeks,
    caseStudyResults: airtableTool.caseStudyResults,
    notableCustomers: airtableTool.notableCustomers,

    // GROUP 6: Integrations & Rich Media (v2.3)
    otherIntegrations: airtableTool.otherIntegrations,
    demoVideoUrl: airtableTool.demoVideoUrl,
    primaryCompetitorIds: airtableTool.primaryCompetitorIds,

    // Analytics
    // Airtable Tool model uses camelCase (pageViews); keep snake_case for frontend compatibility
    page_views: airtableTool.pageViews ?? (airtableTool as { page_views?: number }).page_views,
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

// ============================================================================
// v2.3 Smart Filtering Functions
// ============================================================================

/**
 * Company size bucket definitions
 * Used for size-based filtering
 */
const SIZE_BUCKETS: Record<string, { min: number; max: number }> = {
  '1-50': { min: 1, max: 50 },
  '51-200': { min: 51, max: 200 },
  '201-500': { min: 201, max: 500 },
  '500+': { min: 501, max: 10000 },
};

/**
 * Filters tools by annual budget range
 * Returns tools where pricing overlaps with buyer's budget
 *
 * @param minBudget - Buyer's minimum annual budget (GBP)
 * @param maxBudget - Buyer's maximum annual budget (GBP)
 * @param vertical - Optional: filter by vertical
 * @returns Array of tools that fit budget
 */
export async function getToolsByBudgetRange(
  minBudget: number,
  maxBudget: number,
  vertical?: string
): Promise<Tool[]> {
  const allTools = vertical ? await getToolsByVertical(vertical) : await getAllTools();

  return allTools.filter((tool) => {
    // Skip tools with no pricing data
    if (!tool.pricingAnnualMin || !tool.pricingAnnualMax) {
      return false;
    }

    // Check if there's any overlap between buyer budget and tool pricing
    // Ranges overlap if: toolMin <= buyerMax AND toolMax >= buyerMin
    return tool.pricingAnnualMin <= maxBudget && tool.pricingAnnualMax >= minBudget;
  });
}

/**
 * Filters tools by company size fit
 * Uses idealCompanySize buckets to determine fit
 *
 * @param companySize - Exact employee count
 * @param vertical - Optional: filter by vertical
 * @returns Array of tools that fit company size
 */
export async function getToolsByCompanySize(
  companySize: number,
  vertical?: string
): Promise<Tool[]> {
  const allTools = vertical ? await getToolsByVertical(vertical) : await getAllTools();

  return allTools.filter((tool) => {
    if (!tool.idealCompanySize || tool.idealCompanySize.length === 0) {
      return true; // No size preference = fits all sizes
    }

    // Check if company size falls in any ideal bucket
    return tool.idealCompanySize.some((bucket) => {
      const range = SIZE_BUCKETS[bucket];
      return range && companySize >= range.min && companySize <= range.max;
    });
  });
}

/**
 * Filters tools by supported region
 *
 * @param region - Buyer's region (UK, US, EU, Australia, Canada)
 * @param vertical - Optional: filter by vertical
 * @returns Array of tools that support the region
 */
export async function getToolsByRegion(
  region: string,
  vertical?: string
): Promise<Tool[]> {
  const allTools = vertical ? await getToolsByVertical(vertical) : await getAllTools();

  return allTools.filter((tool) => {
    if (!tool.supportedRegions || tool.supportedRegions.length === 0) {
      return false;
    }

    // Tools supporting "Global" match any region
    if (tool.supportedRegions.includes('Global')) {
      return true;
    }

    // Otherwise check exact region match
    return tool.supportedRegions.includes(region);
  });
}

/**
 * Filters tools by compliance requirements
 * Returns tools that meet ALL specified compliance needs
 *
 * @param complianceNeeds - Array of required compliance (["GDPR", "SOC2"])
 * @param vertical - Optional: filter by vertical
 * @returns Array of tools meeting all compliance requirements
 */
export async function getToolsByCompliance(
  complianceNeeds: string[],
  vertical?: string
): Promise<Tool[]> {
  if (complianceNeeds.length === 0) {
    return vertical ? await getToolsByVertical(vertical) : await getAllTools();
  }

  const allTools = vertical ? await getToolsByVertical(vertical) : await getAllTools();

  return allTools.filter((tool) => {
    return complianceNeeds.every((requirement) => {
      switch (requirement) {
        case 'GDPR':
          return tool.gdprCompliant === true;
        case 'EEOC':
          return tool.eeocCompliant === true;
        case 'SOC2':
          return tool.soc2Certified === true;
        case 'HIPAA':
          return tool.hipaaCompliant === true;
        case 'ISO27001':
          return tool.iso27001Certified === true;
        default:
          return false;
      }
    });
  });
}

// Use case keyword mapping for filtering
const USE_CASE_KEYWORDS: Record<string, string[]> = {
  recruiting: ['recruit', 'ats', 'hiring', 'applicant', 'candidate', 'sourcing'],
  onboarding: ['onboard', 'training', 'learning', 'new hire', 'orientation'],
  performance: ['performance', 'review', 'goal', 'okr', 'feedback', '360'],
  engagement: ['engagement', 'culture', 'satisfaction', 'pulse', 'survey', 'sentiment'],
  analytics: ['analytics', 'reporting', 'insights', 'data', 'dashboard', 'metrics'],
};

/**
 * Advanced filtering combining multiple criteria
 * Used for Request Board matching and smart filters UI
 *
 * @param filters - Object with optional filter criteria
 * @returns Array of tools matching ALL specified criteria
 */
export async function getToolsByFilters(filters: {
  vertical?: string;
  budgetMin?: number;
  budgetMax?: number;
  companySize?: number;
  region?: string;
  complianceNeeds?: string[];
  useCases?: string[];
}): Promise<Tool[]> {
  let tools = filters.vertical
    ? await getToolsByVertical(filters.vertical)
    : await getAllTools();

  // Apply budget filter
  if (filters.budgetMin !== undefined && filters.budgetMax !== undefined) {
    tools = tools.filter((tool) => {
      if (!tool.pricingAnnualMin || !tool.pricingAnnualMax) return false;
      return (
        tool.pricingAnnualMin <= filters.budgetMax! &&
        tool.pricingAnnualMax >= filters.budgetMin!
      );
    });
  }

  // Apply company size filter
  if (filters.companySize !== undefined) {
    tools = tools.filter((tool) => {
      if (!tool.idealCompanySize || tool.idealCompanySize.length === 0) {
        return true;
      }
      return tool.idealCompanySize.some((bucket) => {
        const range = SIZE_BUCKETS[bucket];
        return (
          range &&
          filters.companySize! >= range.min &&
          filters.companySize! <= range.max
        );
      });
    });
  }

  // Apply region filter
  if (filters.region) {
    tools = tools.filter((tool) => {
      if (!tool.supportedRegions || tool.supportedRegions.length === 0) {
        return false;
      }
      return (
        tool.supportedRegions.includes('Global') ||
        tool.supportedRegions.includes(filters.region!)
      );
    });
  }

  // Apply compliance filter
  if (filters.complianceNeeds && filters.complianceNeeds.length > 0) {
    tools = tools.filter((tool) => {
      return filters.complianceNeeds!.every((requirement) => {
        switch (requirement) {
          case 'GDPR':
            return tool.gdprCompliant === true;
          case 'EEOC':
            return tool.eeocCompliant === true;
          case 'SOC2':
            return tool.soc2Certified === true;
          case 'HIPAA':
            return tool.hipaaCompliant === true;
          case 'ISO27001':
            return tool.iso27001Certified === true;
          default:
            return false;
        }
      });
    });
  }

  // Apply use case filter
  if (filters.useCases && filters.useCases.length > 0) {
    tools = tools.filter((tool) => {
      const searchText = `${tool.name} ${tool.shortDescription || ''} ${tool.fullDescription || ''}`.toLowerCase();

      return filters.useCases!.some((useCase) => {
        const keywords = USE_CASE_KEYWORDS[useCase] || [];
        return keywords.some((keyword) => searchText.includes(keyword));
      });
    });
  }

  return tools;
}

/**
 * Get most viewed tools for social proof
 * Returns tools sorted by page_views (highest first)
 *
 * @param limit - Maximum number of tools to return (default: 6)
 * @returns Array of most viewed Tool objects
 */
export async function getMostViewedTools(limit = 6): Promise<Tool[]> {
  const allTools = await getAllTools();

  // Filter tools that have view counts
  const toolsWithViews = allTools.filter(tool => tool.page_views && tool.page_views > 0);

  // Sort by page_views descending
  const sorted = toolsWithViews.sort((a, b) => (b.page_views || 0) - (a.page_views || 0));

  // Return top N tools
  return sorted.slice(0, limit);
}

// ============================================================================
// Dynamic Integration Filter Functions (TASK-118)
// ============================================================================

/**
 * Integration category mapping
 */
const INTEGRATION_CATEGORIES: Record<string, string> = {
  // HRIS & Payroll
  'BambooHR': 'HRIS & Payroll',
  'Workday': 'HRIS & Payroll',
  'ADP': 'HRIS & Payroll',
  'Gusto': 'HRIS & Payroll',
  'Rippling': 'HRIS & Payroll',
  'Personio': 'HRIS & Payroll',
  'Hibob': 'HRIS & Payroll',
  'Namely': 'HRIS & Payroll',
  'Paychex': 'HRIS & Payroll',
  'Justworks': 'HRIS & Payroll',
  'Zenefits': 'HRIS & Payroll',

  // ATS
  'Greenhouse': 'ATS',
  'Lever': 'ATS',
  'Ashby': 'ATS',
  'SmartRecruiters': 'ATS',
  'Workable': 'ATS',
  'JazzHR': 'ATS',
  'Breezy HR': 'ATS',
  'Recruitee': 'ATS',
  'iCIMS': 'ATS',
  'Jobvite': 'ATS',

  // Communication
  'Slack': 'Communication',
  'Microsoft Teams': 'Communication',
  'Google Workspace': 'Communication',
  'Google Chat': 'Communication',
  'Zoom': 'Communication',
  'Google Meet': 'Communication',

  // Calendar
  'Google Calendar': 'Calendar',
  'Outlook Calendar': 'Calendar',
  'Office 365': 'Calendar',
  'Apple Calendar': 'Calendar',

  // Job Boards
  'LinkedIn Recruiter': 'Job Boards',
  'Indeed': 'Job Boards',
  'Glassdoor': 'Job Boards',

  // Other
  'Asana': 'Other',
  'Jira': 'Other',
  'Monday.com': 'Other',
  'Trello': 'Other',
  'Salesforce': 'Other',
  'HubSpot': 'Other',
  'Zendesk': 'Other',
  'Intercom': 'Other',
  'Zapier': 'Other',
};

/**
 * Get category for an integration
 */
function getIntegrationCategory(name: string): string {
  return INTEGRATION_CATEGORIES[name] || 'Other';
}

/**
 * Integration option with metadata
 */
export interface IntegrationOption {
  name: string;
  count: number; // Number of tools with this integration
  category: string; // HRIS, Communication, etc.
}

/**
 * Get available integrations from tools data (dynamic, not hardcoded)
 * Only returns integrations that exist in at least one tool
 */
export async function getAvailableIntegrations(
  tools?: Tool[]
): Promise<IntegrationOption[]> {
  // Use provided tools or fetch all
  const allTools = tools || await getAllTools();

  // Map to track integration names and their counts
  const integrationMap = new Map<string, number>();

  // Scan all tools for integrations
  allTools.forEach((tool) => {
    // Check other_integrations text field (comma-separated integrations)
    if (tool.otherIntegrations) {
      // Parse comma-separated list
      const otherInts = tool.otherIntegrations
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      otherInts.forEach((name) => {
        const current = integrationMap.get(name) || 0;
        integrationMap.set(name, current + 1);
      });
    }
  });

  // Convert map to array of options
  const options: IntegrationOption[] = Array.from(integrationMap.entries()).map(
    ([name, count]) => ({
      name,
      count,
      category: getIntegrationCategory(name),
    })
  );

  // Sort by count (descending), then alphabetically
  options.sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count; // Higher count first
    }
    return a.name.localeCompare(b.name); // Alphabetical
  });

  return options;
}

/**
 * Group integrations by category
 */
export function groupIntegrationsByCategory(
  integrations: IntegrationOption[]
): Record<string, IntegrationOption[]> {
  const grouped: Record<string, IntegrationOption[]> = {};

  integrations.forEach((integration) => {
    const category = integration.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(integration);
  });

  return grouped;
}
