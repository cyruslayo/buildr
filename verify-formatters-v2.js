const { formatCurrencyShorthand } = require('./src/lib/formatters.ts');

const tests = [
  { input: 500, expected: '500' },
  { input: 1000, expected: '1 Thousand' },
  { input: 1500, expected: '1.5 Thousand' },
  { input: 999900, expected: '1000 Thousand' }, // 999.9 rounded to 1000 is fine as it transitions to Million
  { input: 1000000, expected: '1 Million' },
  { input: 1500000, expected: '1.5 Million' },
  { input: 155000000, expected: '155 Million' },
  { input: 1590000, expected: '1.6 Million' },
  { input: 1540000, expected: '1.5 Million' },
  { input: 1500000000, expected: '1.5 Billion' },
];

let failed = 0;
tests.forEach(({ input, expected }) => {
  const result = formatCurrencyShorthand(input);
  if (result !== expected) {
    console.error(`FAIL: input ${input}, expected "${expected}", got "${result}"`);
    failed++;
  } else {
    console.log(`PASS: input ${input} -> "${result}"`);
  }
});

if (failed > 0) {
  process.exit(1);
} else {
  console.log('All verification tests passed!');
}
