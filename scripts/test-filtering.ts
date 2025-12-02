const tools = [
  { name: 'Test Tool v2.3', idealCompanySize: ['1-50', '51-200', '201-500'], companySizeFit: ['201-500'] },
  { name: 'BambooHR', idealCompanySize: ['1-50', '51-200'], companySizeFit: ['1-50', '51-200'] },
  { name: 'Lever', idealCompanySize: ['51-200', '201-500', '500+'], companySizeFit: ['51-200', '201-500', '500+'] },
  { name: 'Greenhouse', idealCompanySize: ['51-200', '201-500', '500+'], companySizeFit: ['51-200', '201-500', '500+'] }
];

function testFilter(selectedSizes: string[]) {
  const filtered = tools.filter((tool) => {
    const sizeField = (tool as any).idealCompanySize || (tool as any).companySizeFit;
    if (!sizeField || sizeField.length === 0) {
      return false;
    }
    return selectedSizes.some((selectedSize) =>
      sizeField?.includes(selectedSize)
    );
  });

  console.log(`\nFiltering by: ${selectedSizes.join(', ')}`);
  console.log(`Result: ${filtered.map(t => t.name).join(', ')}`);
  console.log(`Count: ${filtered.length}`);
}

testFilter(['1-50']);
testFilter(['51-200']);
testFilter(['201-500']);
testFilter(['500+']);
testFilter(['1-50', '51-200']);
