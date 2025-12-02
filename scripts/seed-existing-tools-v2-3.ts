/**
 * Seed Existing Tools with v2.3 Data
 *
 * Populates BambooHR, Lever, and Greenhouse with realistic v2.3 field data
 * so that the new filtering features work immediately.
 *
 * Run with: npx tsx scripts/seed-existing-tools-v2-3.ts
 */

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  throw new Error('Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID');
}

async function updateTool(recordId: string, toolName: string, data: any) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/TOOLS/${recordId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: data }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    console.log(`✅ Updated ${toolName}`);
    return true;
  } catch (error: any) {
    console.error(`❌ Failed to update ${toolName}:`, error.message);
    return false;
  }
}

async function seedExistingTools() {
  console.log('🌱 Seeding existing tools with v2.3 data...\n');

  // BambooHR - Small/Mid-size company HRIS
  await updateTool('recIFqGyXNlVEYMGm', 'BambooHR', {
    // GROUP 1: Company Size & Regional Fit
    ideal_company_size: ['1-50', '51-200'],
    company_size_notes: 'Perfect for small to mid-size companies. Designed for SMBs without dedicated HR teams.',
    supported_regions: ['Global', 'US', 'UK', 'EU'],

    // GROUP 2: Pricing Engine
    pricing_annual_min: 3600, // £150/month * 12
    pricing_annual_max: 12000, // For ~50 employees
    pricing_currency: 'GBP',
    pricing_notes: 'Pricing based on number of employees. Contact for exact quote.',
    pricing_source_url: 'https://www.bamboohr.com/pricing',
    setup_fee: 0,
    setup_fee_included: true,
    free_trial_available: true,
    free_trial_duration_days: 7,
    contract_length_options: ['Monthly', 'Annual'],

    // GROUP 3: Compliance & Certifications
    gdpr_compliant: true,
    eeoc_compliant: true,
    soc2_certified: true,
    hipaa_compliant: false,
    iso27001_certified: false,
    compliance_documentation_url: 'https://www.bamboohr.com/security',
    compliance_notes: 'GDPR compliant with data residency options. SOC 2 Type II certified.',

    // GROUP 4: Implementation Timeline
    implementation_timeline_weeks_min: 1,
    implementation_timeline_weeks_max: 2,
    it_hours_required: 8,
    hr_admin_hours_required: 12,
    training_hours_admin: 4,
    training_hours_enduser: 1,
    implementation_prerequisites: 'Basic employee data in spreadsheet format',
    common_implementation_delays: 'Data cleanup (40%), User training scheduling (30%)',

    // GROUP 5: Case Study & Social Proof
    case_study_url: 'https://www.bamboohr.com/customers',
    case_study_company_size: 120,
    case_study_industry: 'Technology',
    case_study_implementation_weeks: 2,
    case_study_results: 'Reduced HR admin time by 10 hours/week, improved employee satisfaction scores by 25%',
    notable_customers: 'Asana, SoundCloud, Postmates',

    // GROUP 6: Integrations & Rich Media
    other_integrations: 'Slack, Google Workspace, Gusto, ADP, Workday, Microsoft Teams, Zoom',
    demo_video_url: 'https://www.bamboohr.com/demo',
  });

  // Lever - Mid-to-Large company ATS/CRM
  await updateTool('recGW9WBb8svdORFc', 'Lever', {
    // GROUP 1: Company Size & Regional Fit
    ideal_company_size: ['51-200', '201-500', '500+'],
    company_size_notes: 'Best for fast-growing companies with high-volume hiring needs. Enterprise features available for 500+.',
    supported_regions: ['Global', 'US', 'UK', 'EU'],

    // GROUP 2: Pricing Engine
    pricing_annual_min: 12000, // ~£1,000/month
    pricing_annual_max: 48000, // For larger companies
    pricing_currency: 'GBP',
    pricing_notes: 'Enterprise pricing available. Volume discounts for high hiring volume.',
    pricing_source_url: 'https://www.lever.co/pricing',
    setup_fee: 2500,
    setup_fee_included: false,
    free_trial_available: true,
    free_trial_duration_days: 14,
    contract_length_options: ['Annual'],

    // GROUP 3: Compliance & Certifications
    gdpr_compliant: true,
    eeoc_compliant: true,
    soc2_certified: true,
    hipaa_compliant: false,
    iso27001_certified: true,
    compliance_documentation_url: 'https://www.lever.co/security',
    compliance_notes: 'Full GDPR compliance, SOC 2 Type II, ISO 27001. EEOC reporting built-in.',

    // GROUP 4: Implementation Timeline
    implementation_timeline_weeks_min: 3,
    implementation_timeline_weeks_max: 6,
    it_hours_required: 25,
    hr_admin_hours_required: 30,
    training_hours_admin: 12,
    training_hours_enduser: 2,
    implementation_prerequisites: 'Active ATS data export, job board integrations access, defined hiring workflows',
    common_implementation_delays: 'Custom integration setup (50%), Hiring workflow customization (40%), Stakeholder training (35%)',

    // GROUP 5: Case Study & Social Proof
    case_study_url: 'https://www.lever.co/customers',
    case_study_company_size: 350,
    case_study_industry: 'Technology',
    case_study_implementation_weeks: 4,
    case_study_results: 'Increased pipeline by 40%, reduced time-to-hire by 2 weeks, improved candidate experience scores by 30%',
    notable_customers: 'Netflix, Eventbrite, Glassdoor',

    // GROUP 6: Integrations & Rich Media
    other_integrations: 'LinkedIn Recruiter, Indeed, Glassdoor, Slack, Google Workspace, Zoom, Workday, BambooHR, Greenhouse, Zapier',
    demo_video_url: 'https://www.lever.co/demo',
  });

  // Greenhouse - Enterprise-grade ATS
  await updateTool('reca7c0vPMfPDWPCk', 'Greenhouse', {
    // GROUP 1: Company Size & Regional Fit
    ideal_company_size: ['51-200', '201-500', '500+'],
    company_size_notes: 'Designed for mid-market to enterprise companies with structured hiring processes and multiple stakeholders.',
    supported_regions: ['Global', 'US', 'UK', 'EU'],

    // GROUP 2: Pricing Engine
    pricing_annual_min: 15000, // ~£1,250/month
    pricing_annual_max: 60000, // For enterprise
    pricing_currency: 'GBP',
    pricing_notes: 'Custom enterprise pricing available for 500+ employees with dedicated support.',
    pricing_source_url: 'https://www.greenhouse.io/pricing',
    setup_fee: 3000,
    setup_fee_included: false,
    free_trial_available: true,
    free_trial_duration_days: 14,
    contract_length_options: ['Annual'],

    // GROUP 3: Compliance & Certifications
    gdpr_compliant: true,
    eeoc_compliant: true,
    soc2_certified: true,
    hipaa_compliant: false,
    iso27001_certified: true,
    compliance_documentation_url: 'https://www.greenhouse.io/security',
    compliance_notes: 'SOC 2 Type II, ISO 27001, GDPR compliant. Advanced EEOC and OFCCP reporting.',

    // GROUP 4: Implementation Timeline
    implementation_timeline_weeks_min: 4,
    implementation_timeline_weeks_max: 8,
    it_hours_required: 40,
    hr_admin_hours_required: 50,
    training_hours_admin: 16,
    training_hours_enduser: 3,
    implementation_prerequisites: 'Existing ATS data, defined hiring workflows, integration credentials for HRIS/job boards',
    common_implementation_delays: 'Complex workflow configuration (60%), Data migration issues (45%), Integration testing (40%), Executive approvals (35%)',

    // GROUP 5: Case Study & Social Proof
    case_study_url: 'https://www.greenhouse.io/customers',
    case_study_company_size: 500,
    case_study_industry: 'Technology',
    case_study_implementation_weeks: 6,
    case_study_results: 'Reduced time-to-hire by 35%, improved hiring quality scores by 45%, structured interview adoption at 95%',
    notable_customers: 'Airbnb, Uber, Pinterest, HubSpot',

    // GROUP 6: Integrations & Rich Media
    other_integrations: 'LinkedIn Recruiter, Indeed, Glassdoor, Slack, Google Workspace, Zoom, Workday, BambooHR, Lever, Zapier, Salesforce, HubSpot, 300+ integrations',
    demo_video_url: 'https://www.greenhouse.io/demo',
  });

  console.log('\n✅ Seeding complete!');
  console.log('\n📊 Summary:');
  console.log('  - BambooHR: Small/Mid-size HRIS (1-50, 51-200 employees)');
  console.log('  - Lever: High-growth ATS (51-200, 201-500, 500+ employees)');
  console.log('  - Greenhouse: Enterprise ATS (51-200, 201-500, 500+ employees)');
  console.log('\n🧪 Test the filters at http://localhost:3000/hr-talent');
}

seedExistingTools().catch(console.error);
