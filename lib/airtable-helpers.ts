/**
 * Airtable Helper Functions
 *
 * Helper utilities for fetching and mapping Tool data from Airtable.
 * These functions bridge between Airtable's data format and our frontend Tool type.
 *
 * @module lib/airtable-helpers
 */

import { getTools as getAirtableTools, getToolBySlug as getAirtableToolBySlug, Tool as AirtableToolType } from './airtable';

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
