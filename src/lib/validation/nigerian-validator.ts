// src/lib/validation/nigerian-validator.ts
// Post-generation validation for Nigerian real estate content

// ============================================================================
// Types
// ============================================================================

export interface AutoFix {
  pattern: RegExp;
  replacement: string | ((match: string, ...args: string[]) => string);
  description: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  autoFixes: AutoFix[];
}

// ============================================================================
// Detection Helpers
// ============================================================================

/**
 * Check if content contains Nigerian Naira currency
 */
function hasNaira(code: string): boolean {
  return /₦|NGN|naira/i.test(code);
}

/**
 * Check if content contains USD currency
 */
function hasUSD(code: string): boolean {
  return /\$[\d,]+/.test(code);
}

/**
 * Check if content contains WhatsApp integration
 */
function hasWhatsApp(code: string): boolean {
  return /wa\.me|whatsapp|WhatsApp/i.test(code);
}

/**
 * Check if content uses square feet instead of square meters
 */
function hasSqft(code: string): boolean {
  return /sq\.?\s*ft|square\s*feet/i.test(code);
}

/**
 * Detect American real estate terms that shouldn't be used in Nigerian context
 */
function detectAmericanTerms(code: string): string[] {
  const terms = ['MLS', 'HOA', 'escrow', 'realtor', 'zillow', 'redfin', 'closing costs'];
  return terms.filter(term => new RegExp(`\\b${term}\\b`, 'i').test(code));
}

// ============================================================================
// Main Validation Function
// ============================================================================

/**
 * Validate generated content for Nigerian market compliance.
 * 
 * Checks for:
 * - Naira currency presence (₦ or NGN)
 * - Square meters usage (rejects sqft)
 * - WhatsApp integration presence
 * - American real estate terms (warnings)
 * 
 * @param code - Generated HTML/JSX content to validate
 * @returns ValidationResult with errors, warnings, and suggested auto-fixes
 */
export function validateNigerianOutput(code: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const autoFixes: AutoFix[] = [];

  // =====================================================
  // CRITICAL: Must have Naira
  // =====================================================
  if (!hasNaira(code)) {
    errors.push('Missing Nigerian Naira (₦) currency');
    
    // If USD is present, offer auto-fix
    if (hasUSD(code)) {
      autoFixes.push({
        pattern: /\$[\d,]+/g,
        replacement: (match: string) => {
          // Remove $ and convert to Naira (assuming 1500 NGN = 1 USD for estimation)
          const amount = parseInt(match.replace(/[$,]/g, ''), 10);
          const nairaAmount = amount * 1500;
          return `₦${nairaAmount.toLocaleString('en-NG')}`;
        },
        description: 'Convert USD to Naira (estimated at ₦1500/$1)',
      });
    }
  }

  // =====================================================
  // CRITICAL: Must have WhatsApp
  // =====================================================
  if (!hasWhatsApp(code)) {
    errors.push('Missing WhatsApp integration');
  }

  // =====================================================
  // CRITICAL: Must use sqm (rejects sqft)
  // =====================================================
  if (hasSqft(code)) {
    errors.push('Using square feet instead of square meters');
    
    autoFixes.push({
      pattern: /(\d[\d,]*)\s*sq\.?\s*ft\.?/gi,
      replacement: (match: string, numStr: string) => {
        const sqft = parseInt(numStr.replace(/,/g, ''), 10);
        const sqm = Math.round(sqft * 0.0929);
        return `${sqm} sqm`;
      },
      description: 'Convert square feet to square meters',
    });
  }

  // =====================================================
  // WARNING: American terms detected
  // =====================================================
  const americanTerms = detectAmericanTerms(code);
  if (americanTerms.length > 0) {
    warnings.push(`American real estate terms detected: ${americanTerms.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    autoFixes,
  };
}

// ============================================================================
// Auto-Fix Application
// ============================================================================

/**
 * Apply auto-fixes to content.
 * 
 * @param code - Original content
 * @param fixes - Array of auto-fixes to apply
 * @returns Fixed content with all transformations applied
 */
export function applyAutoFixes(code: string, fixes: AutoFix[]): string {
  let result = code;

  for (const fix of fixes) {
    if (typeof fix.replacement === 'function') {
      result = result.replace(fix.pattern, fix.replacement as (substring: string, ...args: string[]) => string);
    } else {
      result = result.replace(fix.pattern, fix.replacement);
    }
  }

  return result;
}

// ============================================================================
// Exports
// ============================================================================

export { hasNaira, hasUSD, hasWhatsApp, hasSqft, detectAmericanTerms };
