// __tests__/lib/validation/nigerian-validator.test.ts
import { validateNigerianOutput, type ValidationResult } from '@/lib/validation/nigerian-validator';

describe('validateNigerianOutput', () => {
  it('passes valid Nigerian content', () => {
    const code = `
      <div>
        <h1>4 Bedroom Duplex</h1>
        <p>₦85,000,000 • 350 sqm</p>
        <a href="https://wa.me/2348012345678">WhatsApp</a>
      </div>
    `;
    const result = validateNigerianOutput(code);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
  
  it('fails code with USD', () => {
    const code = `<p>$2,500,000</p>`;
    const result = validateNigerianOutput(code);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Missing Nigerian Naira (₦) currency');
  });
  
  it('fails code with sqft', () => {
    const code = `<p>2,500 sq ft</p>`;
    const result = validateNigerianOutput(code);
    expect(result.errors).toContain('Using square feet instead of square meters');
  });
  
  it('fails code without WhatsApp', () => {
    const code = `<button>Contact Us</button>`;
    const result = validateNigerianOutput(code);
    expect(result.errors).toContain('Missing WhatsApp integration');
  });
  
  it('provides auto-fixes for USD', () => {
    const code = `<p>$100,000</p>`;
    const result = validateNigerianOutput(code);
    expect(result.autoFixes.length).toBeGreaterThan(0);
  });

  it('detects American real estate terms', () => {
    const code = `<p>Contact your realtor about HOA fees and MLS listing</p>`;
    const result = validateNigerianOutput(code);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('accepts content with NGN instead of symbol', () => {
    const code = `
      <p>NGN 85,000,000 - 350 sqm</p>
      <a href="https://wa.me/234">WhatsApp</a>
    `;
    const result = validateNigerianOutput(code);
    expect(result.valid).toBe(true);
  });
});
