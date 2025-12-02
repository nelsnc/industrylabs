/**
 * Test All Filters
 *
 * Tests region and compliance filtering logic
 */

const tools = [
  {
    name: 'Test Tool v2.3',
    supportedRegions: ['UK', 'EU', 'US', 'Australia'],
    gdprCompliant: true,
    soc2Certified: true,
    eeocCompliant: true,
    hipaaCompliant: false,
    iso27001Certified: true,
  },
  {
    name: 'BambooHR',
    supportedRegions: ['Global', 'US', 'UK', 'EU'],
    gdprCompliant: true,
    soc2Certified: true,
    eeocCompliant: true,
    hipaaCompliant: false,
    iso27001Certified: false,
  },
  {
    name: 'Lever',
    supportedRegions: ['Global', 'US', 'UK', 'EU'],
    gdprCompliant: true,
    soc2Certified: true,
    eeocCompliant: true,
    hipaaCompliant: false,
    iso27001Certified: true,
  },
  {
    name: 'Greenhouse',
    supportedRegions: ['Global', 'US', 'UK', 'EU'],
    gdprCompliant: true,
    soc2Certified: true,
    eeocCompliant: true,
    hipaaCompliant: false,
    iso27001Certified: true,
  },
];

function testRegionFilter(selectedRegions: string[]) {
  const filtered = tools.filter((tool) => {
    if (!tool.supportedRegions || tool.supportedRegions.length === 0) {
      return false;
    }
    return tool.supportedRegions.includes('Global') ||
      selectedRegions.some((region) => tool.supportedRegions?.includes(region));
  });

  console.log(`\n🌍 Region Filter: ${selectedRegions.join(', ')}`);
  console.log(`   Result: ${filtered.map(t => t.name).join(', ')}`);
  console.log(`   Count: ${filtered.length}`);
}

function testComplianceFilter(requirements: string[]) {
  const filtered = tools.filter((tool) => {
    return requirements.every((requirement) => {
      switch (requirement) {
        case 'GDPR': return tool.gdprCompliant === true;
        case 'EEOC': return tool.eeocCompliant === true;
        case 'SOC2': return tool.soc2Certified === true;
        case 'HIPAA': return tool.hipaaCompliant === true;
        case 'ISO27001': return tool.iso27001Certified === true;
        default: return false;
      }
    });
  });

  console.log(`\n🔒 Compliance Filter: ${requirements.join(' + ')}`);
  console.log(`   Result: ${filtered.map(t => t.name).join(', ')}`);
  console.log(`   Count: ${filtered.length}`);
}

console.log('='.repeat(60));
console.log('TESTING REGION FILTERS');
console.log('='.repeat(60));

testRegionFilter(['UK']);
testRegionFilter(['US']);
testRegionFilter(['Australia']);
testRegionFilter(['UK', 'US']);

console.log('\n' + '='.repeat(60));
console.log('TESTING COMPLIANCE FILTERS');
console.log('='.repeat(60));

testComplianceFilter(['GDPR']);
testComplianceFilter(['SOC2']);
testComplianceFilter(['GDPR', 'SOC2']);
testComplianceFilter(['GDPR', 'SOC2', 'EEOC']);
testComplianceFilter(['GDPR', 'SOC2', 'ISO27001']);
testComplianceFilter(['HIPAA']); // Should return 0 tools

console.log('\n' + '='.repeat(60));
console.log('Expected Results:');
console.log('- UK region: All 4 tools (BambooHR, Lever, Greenhouse have Global)');
console.log('- Australia: Only Test Tool v2.3');
console.log('- GDPR: All 4 tools');
console.log('- GDPR + SOC2 + ISO27001: Test Tool, Lever, Greenhouse (BambooHR missing ISO27001)');
console.log('- HIPAA: 0 tools (none are HIPAA compliant)');
console.log('='.repeat(60));
