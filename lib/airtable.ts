/**
 * Airtable Server-Side Wrapper
 *
 * This module provides a server-only interface to Airtable.
 * DO NOT import this in Client Components - it contains sensitive API credentials.
 *
 * @module lib/airtable
 * @server-only
 */

// =============================================================================
// Step 1: Basic Configuration & Environment Variable Validation
// =============================================================================

// Fail-fast protection: prevent browser usage
if (typeof window !== 'undefined') {
  throw new Error('Airtable client cannot be used in the browser');
}

// Airtable API configuration
const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0';

/**
 * Get and validate Airtable API credentials
 * This is called lazily to allow environment variables to be loaded before validation
 */
function getAirtableCredentials(): { apiKey: string; baseId: string } {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey) {
    throw new Error('AIRTABLE_API_KEY is not defined in environment variables');
  }

  if (!baseId) {
    throw new Error('AIRTABLE_BASE_ID is not defined in environment variables');
  }

  return { apiKey, baseId };
}

// =============================================================================
// Error Handling
// =============================================================================

/**
 * Custom error class for Airtable-specific errors
 */
export class AirtableError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'AirtableError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// =============================================================================
// Type Definitions
// =============================================================================

/**
 * Generic Airtable record wrapper
 */
export interface AirtableRecord<TFields> {
  id: string;
  fields: TFields;
  createdTime?: string;
}

/**
 * Airtable list response wrapper
 */
interface AirtableListResponse<TFields> {
  records: AirtableRecord<TFields>[];
  offset?: string;
}

/**
 * Airtable attachment type
 */
export interface AirtableAttachment {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  width?: number;
  height?: number;
  thumbnails?: {
    small?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
    full?: { url: string; width: number; height: number };
  };
}

/**
 * Airtable error response type
 */
interface AirtableErrorResponse {
  error?: {
    type?: string;
    message?: string;
  };
}

/**
 * Fields from the TOOLS table (subset of relevant fields)
 */
export interface ToolFields {
  tool_id?: number;
  tool_name: string;
  tool_slug: string;
  vendor_id?: string[]; // Link to VENDORS table (v2.3 CORE FIELD)
  slug_source?: 'Manual' | 'Auto';
  tier: 'Free' | 'Premium';
  status: 'Draft' | 'Live' | 'Archived';
  verification_status: 'Unverified' | 'Verified';
  verticals: string[];
  primary_vertical: 'HR & Talent' | 'Learning & Development' | 'Customer Support';
  company_size_fit: ('1-50' | '51-200' | '201-500' | '500+')[];
  short_description: string;
  long_description?: string;
  features_list?: string;
  pricing_model?: 'Per User' | 'Per Hire' | 'Flat Rate' | 'Custom' | 'Free' | 'Freemium' | 'Paid' | 'Enterprise'; // v2.3: Updated to match Pricing Engine spec
  starting_price?: number;
  pricing_details?: string;
  key_features?: string;
  website_url: string;
  logo?: AirtableAttachment[];
  g2_rating?: number;
  review_count?: number;
  page_views?: number;
  request_matches?: number;
  date_added?: string;
  last_updated?: string;

  // GROUP 1: Company Size & Regional Fit (v2.3)
  ideal_company_size?: string[];
  company_size_notes?: string;
  supported_regions?: string[];

  // GROUP 2: Pricing Engine (v2.3)
  pricing_annual_min?: number;
  pricing_annual_max?: number;
  pricing_currency?: 'GBP' | 'USD' | 'EUR';
  pricing_notes?: string;
  pricing_display?: string; // Airtable formula field
  pricing_source_url?: string;
  setup_fee?: number;
  setup_fee_included?: boolean;
  free_trial_available?: boolean;
  free_trial_duration_days?: number;
  contract_length_options?: string[];

  // GROUP 3: Compliance & Certifications (v2.3)
  gdpr_compliant?: boolean;
  eeoc_compliant?: boolean;
  soc2_certified?: boolean;
  hipaa_compliant?: boolean;
  iso27001_certified?: boolean;
  compliance_documentation_url?: string;
  compliance_notes?: string;

  // GROUP 4: Implementation Timeline (v2.3)
  implementation_timeline_weeks_min?: number;
  implementation_timeline_weeks_max?: number;
  implementation_timeline_display?: string; // Airtable formula field
  it_hours_required?: number;
  hr_admin_hours_required?: number;
  training_hours_admin?: number;
  training_hours_enduser?: number;
  implementation_prerequisites?: string;
  common_implementation_delays?: string;

  // GROUP 5: Case Study & Social Proof (v2.3)
  case_study_url?: string;
  case_study_company_size?: number;
  case_study_industry?: string;
  case_study_implementation_weeks?: number;
  case_study_results?: string;
  notable_customers?: string;

  // GROUP 6: Integrations & Rich Media (v2.3)
  other_integrations?: string;
  demo_video_url?: string;
  primary_competitor_ids?: string[];
}

/**
 * Frontend-friendly Tool model
 */
export interface Tool {
  id: string;
  name: string;
  slug: string;
  vendorId?: string; // v2.3 CORE FIELD - resolved vendor ID from link
  tier: 'Free' | 'Premium';
  verificationStatus: 'Unverified' | 'Verified';
  primaryVertical: ToolFields['primary_vertical'];
  verticals: string[];
  companySizeFit: ToolFields['company_size_fit'];
  shortDescription: string;
  longDescription?: string;
  features?: string;
  pricingModel?: ToolFields['pricing_model'];
  startingPrice?: number;
  pricingDetails?: string;
  keyFeatures?: string;
  websiteUrl: string;
  logoUrl?: string;
  g2Rating?: number;
  reviewCount?: number;
  pageViews?: number;
  requestMatches?: number;
  dateAdded?: string;
  lastUpdated?: string;

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
}

/**
 * Category type enum
 */
export type CategoryType = 'Vertical' | 'Category';

/**
 * Category status enum
 */
export type CategoryStatus = 'Live' | 'Coming Soon' | 'Archived';

/**
 * Fields from the CATEGORIES table
 */
export interface CategoryFields {
  category_id?: number;
  category_type: CategoryType;
  parent_vertical?: string[];
  category_name: string;
  category_slug: string;
  description: string;
  tools?: string[];
  tools_count?: number;
  status: CategoryStatus;
  seo_keywords?: string;
  display_order?: number;
  icon?: AirtableAttachment[];
}

/**
 * Frontend-friendly Category model
 */
export interface Category {
  id: string;
  type: CategoryType;
  parentVerticalId?: string;
  name: string;
  slug: string;
  description: string;
  status: CategoryStatus;
  toolsCount?: number;
  displayOrder?: number;
  seoKeywords?: string;
  iconUrl?: string;
}

/**
 * Input data for creating a new request in the REQUESTS table
 */
export interface CreateRequestInput {
  requesterName: string;
  requesterEmail: string;
  requesterCompany: string;
  companySize: '1-50' | '51-200' | '201-500' | '500+';
  companyLocation?: 'UK' | 'US' | 'EU' | 'Other';
  vertical: 'HR & Talent' | 'Learning & Development' | 'Customer Support';
  useCase: string[];
  budgetRange?: '<£500' | '£500-£2000' | '£2000-£5000' | '£5000+';
  timeline: 'Immediate' | '1-3 months' | '3-6 months' | 'Exploring';
  currentTools?: string;
  requirements: string;
  complianceNeeds?: string[];
  sourceChannel?: 'Direct' | 'SEO' | 'LinkedIn' | 'Referral' | 'Other';
  requestSourceUrl?: string;
  gdprConsent: boolean;
}

// =============================================================================
// Step 2: Generic airtableFetch Helper Function
// =============================================================================

/**
 * Query parameters for Airtable API requests
 */
interface AirtableQueryParams {
  filterByFormula?: string;
  maxRecords?: number;
  view?: string;
  sort?: Array<{ field: string; direction: 'asc' | 'desc' }>;
  fields?: string[];
}

/**
 * Generic fetch wrapper for Airtable API calls
 *
 * @param tableName - The name of the Airtable table to query
 * @param paramsOrPath - Optional query parameters OR path segment (for specific records)
 * @param options - Optional fetch options (method, body, etc.)
 * @returns The parsed JSON response
 * @throws {AirtableError} If the request fails or returns a non-2xx status
 */
async function airtableFetch<T = unknown>(
  tableName: string,
  paramsOrPath?: AirtableQueryParams | string,
  options?: RequestInit
): Promise<T> {
  const DEBUG = process.env.DEBUG_AIRTABLE === 'true';

  // Get credentials (validates environment variables)
  const { apiKey, baseId } = getAirtableCredentials();

  // Determine if second param is a path (string) or params (object)
  const isPath = typeof paramsOrPath === 'string';
  const pathSegment = isPath ? paramsOrPath : '';
  const params = isPath ? undefined : paramsOrPath;

  if (DEBUG) {
    console.log('\n[DEBUG] airtableFetch called');
    console.log('[DEBUG] Table:', tableName);
    console.log('[DEBUG] Base ID:', baseId);
    console.log('[DEBUG] API Key:', apiKey.substring(0, 10) + '...');
    console.log('[DEBUG] Path segment:', pathSegment || 'none');
    console.log('[DEBUG] Params:', JSON.stringify(params, null, 2));
  }

  // Build URL with query parameters
  const url = new URL(`${AIRTABLE_BASE_URL}/${baseId}/${tableName}${pathSegment}`);

  if (params) {
    if (params.filterByFormula) {
      url.searchParams.append('filterByFormula', params.filterByFormula);
    }
    if (params.maxRecords) {
      url.searchParams.append('maxRecords', params.maxRecords.toString());
    }
    if (params.view) {
      url.searchParams.append('view', params.view);
    }
    if (params.sort) {
      params.sort.forEach((s, i) => {
        url.searchParams.append(`sort[${i}][field]`, s.field);
        url.searchParams.append(`sort[${i}][direction]`, s.direction);
      });
    }
    if (params.fields) {
      params.fields.forEach(field => {
        url.searchParams.append('fields[]', field);
      });
    }
  }

  if (DEBUG) {
    console.log('[DEBUG] Full URL:', url.toString());
  }

  // Prepare fetch options
  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  };

  if (DEBUG) {
    console.log('[DEBUG] Request method:', fetchOptions.method || 'GET');
    console.log('[DEBUG] Request headers:', JSON.stringify({
      ...fetchOptions.headers,
      'Authorization': 'Bearer ***'
    }, null, 2));
  }

  try {
    if (DEBUG) {
      console.log('[DEBUG] Sending request...');
    }

    const response = await fetch(url.toString(), fetchOptions);

    if (DEBUG) {
      console.log('[DEBUG] Response status:', response.status);
      console.log('[DEBUG] Response statusText:', response.statusText);
      console.log('[DEBUG] Response headers:', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));
    }

    // Parse response body
    let responseData: unknown;
    try {
      responseData = await response.json();
      if (DEBUG) {
        console.log('[DEBUG] Response body:', JSON.stringify(responseData, null, 2));
      }
    } catch (parseError) {
      if (DEBUG) {
        console.error('[DEBUG] JSON parse error:', parseError);
      }
      // If JSON parsing fails, throw a generic error
      throw new AirtableError(
        'Failed to parse Airtable response',
        response.status,
        'PARSE_ERROR'
      );
    }

    // Handle non-2xx responses
    if (!response.ok) {
      const errorResponse = responseData as AirtableErrorResponse;
      const errorMessage = errorResponse?.error?.message || 'Airtable request failed';
      const errorCode = errorResponse?.error?.type || 'UNKNOWN_ERROR';

      if (DEBUG) {
        console.error('[DEBUG] Request failed!');
        console.error('[DEBUG] Error message:', errorMessage);
        console.error('[DEBUG] Error code:', errorCode);
        console.error('[DEBUG] Error details:', JSON.stringify(responseData, null, 2));
      }

      throw new AirtableError(
        errorMessage,
        response.status,
        errorCode,
        responseData
      );
    }

    if (DEBUG) {
      console.log('[DEBUG] Request successful!');
    }

    return responseData as T;
  } catch (error) {
    if (DEBUG) {
      console.error('[DEBUG] Caught error in airtableFetch:', error);
    }

    // Re-throw AirtableError as-is
    if (error instanceof AirtableError) {
      throw error;
    }

    // Wrap network errors
    throw new AirtableError(
      error instanceof Error ? error.message : 'Network error',
      500,
      'NETWORK_ERROR',
      error
    );
  }
}

// =============================================================================
// Step 3: Record Mapping Functions
// =============================================================================

/**
 * Maps an Airtable TOOLS record to a frontend-friendly Tool object
 *
 * @param record - The raw Airtable record
 * @returns A mapped Tool object
 */
function mapToolRecord(record: AirtableRecord<ToolFields>): Tool {
  const fields = record.fields;

  return {
    id: record.id,
    name: fields.tool_name,
    slug: fields.tool_slug,
    vendorId: fields.vendor_id?.[0], // Extract first vendor ID from linked records
    tier: fields.tier,
    verificationStatus: fields.verification_status,
    primaryVertical: fields.primary_vertical,
    verticals: fields.verticals || [],
    companySizeFit: fields.company_size_fit || [],
    shortDescription: fields.short_description,
    longDescription: fields.long_description,
    features: fields.features_list,
    pricingModel: fields.pricing_model,
    startingPrice: fields.starting_price,
    pricingDetails: fields.pricing_details,
    keyFeatures: fields.key_features,
    websiteUrl: fields.website_url,
    logoUrl: fields.logo?.[0]?.url,
    g2Rating: fields.g2_rating,
    reviewCount: fields.review_count,
    pageViews: fields.page_views,
    requestMatches: fields.request_matches,
    dateAdded: fields.date_added,
    lastUpdated: fields.last_updated,

    // GROUP 1: Company Size & Regional Fit (v2.3)
    idealCompanySize: fields.ideal_company_size,
    companySizeNotes: fields.company_size_notes,
    supportedRegions: fields.supported_regions,

    // GROUP 2: Pricing Engine (v2.3)
    pricingAnnualMin: fields.pricing_annual_min,
    pricingAnnualMax: fields.pricing_annual_max,
    pricingCurrency: fields.pricing_currency,
    pricingNotes: fields.pricing_notes,
    pricingDisplay: fields.pricing_display,
    pricingSourceUrl: fields.pricing_source_url,
    setupFee: fields.setup_fee,
    setupFeeIncluded: fields.setup_fee_included,
    freeTrialAvailable: fields.free_trial_available,
    freeTrialDurationDays: fields.free_trial_duration_days,
    contractLengthOptions: fields.contract_length_options,

    // GROUP 3: Compliance & Certifications (v2.3)
    gdprCompliant: fields.gdpr_compliant,
    eeocCompliant: fields.eeoc_compliant,
    soc2Certified: fields.soc2_certified,
    hipaaCompliant: fields.hipaa_compliant,
    iso27001Certified: fields.iso27001_certified,
    complianceDocumentationUrl: fields.compliance_documentation_url,
    complianceNotes: fields.compliance_notes,

    // GROUP 4: Implementation Timeline (v2.3)
    implementationTimelineWeeksMin: fields.implementation_timeline_weeks_min,
    implementationTimelineWeeksMax: fields.implementation_timeline_weeks_max,
    implementationTimelineDisplay: fields.implementation_timeline_display,
    itHoursRequired: fields.it_hours_required,
    hrAdminHoursRequired: fields.hr_admin_hours_required,
    trainingHoursAdmin: fields.training_hours_admin,
    trainingHoursEnduser: fields.training_hours_enduser,
    implementationPrerequisites: fields.implementation_prerequisites,
    commonImplementationDelays: fields.common_implementation_delays,

    // GROUP 5: Case Study & Social Proof (v2.3)
    caseStudyUrl: fields.case_study_url,
    caseStudyCompanySize: fields.case_study_company_size,
    caseStudyIndustry: fields.case_study_industry,
    caseStudyImplementationWeeks: fields.case_study_implementation_weeks,
    caseStudyResults: fields.case_study_results,
    notableCustomers: fields.notable_customers,

    // GROUP 6: Integrations & Rich Media (v2.3)
    otherIntegrations: fields.other_integrations,
    demoVideoUrl: fields.demo_video_url,
    primaryCompetitorIds: fields.primary_competitor_ids,
  };
}

/**
 * Maps an Airtable CATEGORIES record to a frontend-friendly Category object
 *
 * @param record - The raw Airtable record
 * @returns A mapped Category object
 */
function mapCategoryRecord(record: AirtableRecord<CategoryFields>): Category {
  const fields = record.fields;

  return {
    id: record.id,
    type: fields.category_type,
    parentVerticalId: fields.parent_vertical?.[0],
    name: fields.category_name,
    slug: fields.category_slug,
    description: fields.description,
    status: fields.status,
    toolsCount: fields.tools_count,
    displayOrder: fields.display_order,
    seoKeywords: fields.seo_keywords,
    iconUrl: fields.icon?.[0]?.url,
  };
}

// =============================================================================
// Step 4: getTools() - Fetch all Live tools
// =============================================================================

/**
 * Fetches all Live tools from the TOOLS table
 *
 * Only returns tools with status='Live' as per schema rules.
 * Results are sorted by date_added (newest first).
 *
 * @returns An array of Tool objects
 * @throws {AirtableError} If the request fails
 */
export async function getTools(): Promise<Tool[]> {
  const DEBUG = process.env.DEBUG_AIRTABLE === 'true';

  if (DEBUG) {
    console.log('\n[DEBUG] getTools() called');
  }

  const response = await airtableFetch<AirtableListResponse<ToolFields>>(
    'TOOLS',
    {
      filterByFormula: "{status} = 'Live'",
      sort: [{ field: 'date_added', direction: 'desc' }],
    }
  );

  if (DEBUG) {
    console.log('[DEBUG] getTools() received', response.records.length, 'records');
  }

  return response.records.map(mapToolRecord);
}

// =============================================================================
// Step 5: getToolBySlug() - Fetch a single tool by slug
// =============================================================================

/**
 * Fetches a single tool by its slug
 *
 * Only returns the tool if status='Live'.
 *
 * @param slug - The tool_slug to search for
 * @returns The Tool object if found, null otherwise
 * @throws {AirtableError} If the request fails (but not if no records found)
 */
export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const response = await airtableFetch<AirtableListResponse<ToolFields>>(
    'TOOLS',
    {
      filterByFormula: `AND({tool_slug} = '${slug}', {status} = 'Live')`,
      maxRecords: 1,
    }
  );

  if (response.records.length === 0) {
    return null;
  }

  return mapToolRecord(response.records[0]);
}

// =============================================================================
// Step 6: getCategories() - Fetch categories, optionally filtered by vertical
// =============================================================================

/**
 * Fetches all Live categories, optionally filtered by parent vertical
 *
 * @param vertical - Optional vertical name to filter categories by
 * @returns An array of Category objects
 * @throws {AirtableError} If the request fails
 */
export async function getCategories(vertical?: string): Promise<Category[]> {
  let filterFormula = "{status} = 'Live'";

  // If vertical is specified, we need to filter categories that belong to it
  // Note: This assumes vertical is the category_name of a Vertical-type category
  if (vertical) {
    // First get the vertical record to find its ID
    const verticalResponse = await airtableFetch<AirtableListResponse<CategoryFields>>(
      'CATEGORIES',
      {
        filterByFormula: `AND({category_type} = 'Vertical', {category_name} = '${vertical}', {status} = 'Live')`,
        maxRecords: 1,
      }
    );

    if (verticalResponse.records.length === 0) {
      // Vertical not found, return empty array
      return [];
    }

    const verticalId = verticalResponse.records[0].id;

    // Now filter categories that have this vertical as parent
    filterFormula = `AND({category_type} = 'Category', FIND('${verticalId}', ARRAYJOIN({parent_vertical})) > 0, {status} = 'Live')`;
  }

  const response = await airtableFetch<AirtableListResponse<CategoryFields>>(
    'CATEGORIES',
    {
      filterByFormula: filterFormula,
    }
  );

  return response.records.map(mapCategoryRecord);
}

// =============================================================================
// Step 7: createRequest() - Create a new request in REQUESTS table
// =============================================================================

/**
 * Validates the input data for creating a request
 *
 * @param data - The request input data
 * @throws {Error} If validation fails
 */
function validateRequestInput(data: CreateRequestInput): void {
  // Required fields validation
  if (!data.requesterName?.trim()) {
    throw new Error('requesterName is required');
  }
  if (!data.requesterEmail?.trim()) {
    throw new Error('requesterEmail is required');
  }
  if (!data.requesterCompany?.trim()) {
    throw new Error('requesterCompany is required');
  }
  if (!data.vertical) {
    throw new Error('vertical is required');
  }
  if (!data.timeline) {
    throw new Error('timeline is required');
  }
  if (!data.requirements?.trim()) {
    throw new Error('requirements is required');
  }
  if (data.gdprConsent !== true) {
    throw new Error('gdprConsent must be true');
  }

  // Length limits to prevent abuse
  if (data.requesterName.length > 100) {
    throw new Error('requesterName is too long (max 100 characters)');
  }
  if (data.requesterEmail.length > 200) {
    throw new Error('requesterEmail is too long (max 200 characters)');
  }
  if (data.requesterCompany.length > 200) {
    throw new Error('requesterCompany is too long (max 200 characters)');
  }
  if (data.requirements.length > 5000) {
    throw new Error('requirements is too long (max 5000 characters)');
  }
  if (data.currentTools && data.currentTools.length > 1000) {
    throw new Error('currentTools is too long (max 1000 characters)');
  }
  if (data.useCase.length > 20) {
    throw new Error('Too many use cases (max 20)');
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.requesterEmail)) {
    throw new Error('Invalid email format');
  }
}

/**
 * Creates a new request in the REQUESTS table
 *
 * @param data - The request input data
 * @returns The ID of the created record
 * @throws {Error} If validation fails
 * @throws {AirtableError} If the Airtable request fails
 */
export async function createRequest(data: CreateRequestInput): Promise<string> {
  // Validate input
  validateRequestInput(data);

  // Map to Airtable field names (whitelist approach)
  const fields: Record<string, string | string[] | boolean> = {
    requester_name: data.requesterName,
    requester_email: data.requesterEmail,
    requester_company: data.requesterCompany,
    company_size: data.companySize,
    vertical: data.vertical,
    use_case: data.useCase,
    timeline: data.timeline,
    requirements: data.requirements,
    gdpr_consent: data.gdprConsent,
    status: 'New', // Default status
  };

  // Add optional fields only if provided
  if (data.companyLocation) {
    fields.company_location = data.companyLocation;
  }
  if (data.budgetRange) {
    fields.budget_range = data.budgetRange;
  }
  if (data.currentTools) {
    fields.current_tools = data.currentTools;
  }
  if (data.complianceNeeds && data.complianceNeeds.length > 0) {
    fields.compliance_needs = data.complianceNeeds;
  }
  if (data.sourceChannel) {
    fields.source_channel = data.sourceChannel;
  }
  if (data.requestSourceUrl) {
    fields.request_source_url = data.requestSourceUrl;
  }

  // Create the record
  const response = await airtableFetch<{ id: string }>(
    'REQUESTS',
    undefined,
    {
      method: 'POST',
      body: JSON.stringify({ fields }),
    }
  );

  return response.id;
}

// =============================================================================
// Generic Create Record Function
// =============================================================================

/**
 * Creates a new record in any Airtable table
 *
 * @param tableName - The name of the Airtable table
 * @param fields - The fields to create
 * @returns The created record with ID
 * @throws {AirtableError} If the Airtable request fails
 */
export async function createRecord<T = unknown>(
  tableName: string,
  fields: Record<string, unknown>
): Promise<AirtableRecord<T>> {
  const response = await airtableFetch<AirtableRecord<T>>(
    tableName,
    undefined,
    {
      method: 'POST',
      body: JSON.stringify({ fields }),
    }
  );

  return response;
}

/**
 * Update an existing record in Airtable
 *
 * @param tableName - The name of the Airtable table
 * @param recordId - The ID of the record to update
 * @param fields - The fields to update
 * @returns The updated record
 * @throws {AirtableError} If the Airtable request fails
 */
export async function updateRecord<T = unknown>(
  tableName: string,
  recordId: string,
  fields: Record<string, unknown>
): Promise<AirtableRecord<T>> {
  const response = await airtableFetch<AirtableRecord<T>>(
    tableName,
    `/${recordId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ fields }),
    }
  );

  return response;
}

// =============================================================================
// Test Connection Function
// =============================================================================

/**
 * Helper function to get all records from a table (for testing)
 * Fetches all records without filtering
 *
 * @param tableName - The name of the table to fetch from
 * @returns Array of raw Airtable records
 */
export async function getAllRecords<T>(tableName: string): Promise<AirtableRecord<T>[]> {
  const response = await airtableFetch<AirtableListResponse<T>>(tableName);
  return response.records;
}

/**
 * Test connection to Airtable
 *
 * Attempts to fetch records from the TOOLS table and logs connection details.
 * Useful for debugging and verifying Airtable configuration.
 *
 * @returns An object indicating success/failure and record count
 */
export async function testConnection() {
  try {
    console.log("🔍 Testing Airtable connection...");
    console.log("Base ID:", process.env.AIRTABLE_BASE_ID?.substring(0, 10) + "...");

    const records = await getAllRecords<ToolFields>("TOOLS");

    console.log("✅ Connection successful!");
    console.log(`Found ${records.length} tools in TOOLS table`);

    if (records.length > 0) {
      console.log("\nFirst tool sample:");
      const first = records[0];
      console.log("- ID:", first.id);
      console.log("- Fields:", Object.keys(first.fields));
      console.log("- Tool name:", first.fields.tool_name);
      console.log("- Tool slug:", first.fields.tool_slug);
    }

    return { success: true, count: records.length };
  } catch (error) {
    console.error("❌ Connection failed:", error);
    return { success: false, error };
  }
}
