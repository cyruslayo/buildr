// __tests__/lib/validation/auto-fixer.test.ts
import { applyAutoFixes, type AutoFix } from '@/lib/validation/nigerian-validator';

describe('applyAutoFixes', () => {
  it('converts USD to Naira', () => {
    const code = `<p>$100,000</p>`;
    const fixes: AutoFix[] = [{
      pattern: /\$[\d,]+/g,
      replacement: '₦100000',
      description: 'Convert USD to Naira',
    }];
    const result = applyAutoFixes(code, fixes);
    expect(result).toContain('₦');
    expect(result).not.toContain('$');
  });
  
  it('converts sqft to sqm', () => {
    const code = `<p>1000 sqft</p>`;
    const fixes: AutoFix[] = [{
      pattern: /(\d+)\s*sqft/gi,
      replacement: (match: string, num: string) => `${Math.round(parseInt(num, 10) * 0.0929)} sqm`,
      description: 'Convert sqft to sqm',
    }];
    const result = applyAutoFixes(code, fixes);
    expect(result).toContain('sqm');
    expect(result).not.toContain('sqft');
  });

  it('applies multiple fixes in sequence', () => {
    const code = `<p>$500,000 - 2000 sqft</p>`;
    const fixes: AutoFix[] = [
      {
        pattern: /\$[\d,]+/g,
        replacement: '₦750,000,000',
        description: 'Convert USD to Naira',
      },
      {
        pattern: /(\d+)\s*sqft/gi,
        replacement: '186 sqm',
        description: 'Convert sqft to sqm',
      },
    ];
    const result = applyAutoFixes(code, fixes);
    expect(result).toContain('₦750,000,000');
    expect(result).toContain('186 sqm');
    expect(result).not.toContain('$');
    expect(result).not.toContain('sqft');
  });

  it('handles function-based replacements', () => {
    const code = `<p>Price: $200</p>`;
    const fixes: AutoFix[] = [{
      pattern: /\$(\d+)/g,
      replacement: (match: string, amount: string) => `₦${parseInt(amount, 10) * 1500}`,
      description: 'Convert USD to Naira at rate',
    }];
    const result = applyAutoFixes(code, fixes);
    expect(result).toContain('₦300000');
  });

  it('returns original code when no fixes provided', () => {
    const code = `<p>₦85,000,000</p>`;
    const result = applyAutoFixes(code, []);
    expect(result).toBe(code);
  });
});
