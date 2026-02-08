/**
 * Nigerian Formatting Utilities
 * 
 * Format currency, measurements, and WhatsApp links
 * for the Nigerian real estate market.
 */

/**
 * Format a number as Nigerian Naira currency
 * @param amount - Amount in Naira
 * @returns Formatted string with ₦ symbol and thousand separators
 * @example formatNaira(85000000) => '₦85,000,000'
 */
export function formatNaira(amount: number): string {
  const rounded = Math.round(amount);
  return `₦${rounded.toLocaleString('en-NG')}`;
}

/**
 * Format area in square meters
 * @param sqm - Area in square meters
 * @returns Formatted string with sqm suffix
 * @example formatArea(350) => '350 sqm'
 */
export function formatArea(sqm: number): string {
  // Check if it's a whole number
  const formatted = Number.isInteger(sqm) 
    ? sqm.toLocaleString('en-NG')
    : sqm.toLocaleString('en-NG', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return `${formatted} sqm`;
}

/**
 * Generate a WhatsApp click-to-chat link
 * @param phone - Phone number (with or without + prefix)
 * @param message - Pre-filled message
 * @returns WhatsApp URL
 * @example formatWhatsAppLink('+2348012345678', 'Hello') => 'https://wa.me/2348012345678?text=Hello'
 */
export function formatWhatsAppLink(phone: string, message: string): string {
  // Remove any non-digit characters except leading +
  const cleanPhone = phone.replace(/^\+/, '').replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Format property price with abbreviated suffix for large amounts
 * @param amount - Amount in Naira
 * @returns Formatted string (e.g., '₦85M', '₦1.2B')
 */
export function formatNairaShort(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `₦${(amount / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
  }
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (amount >= 1_000) {
    return `₦${(amount / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return formatNaira(amount);
}

/**
 * Nigerian feature labels for display
 */
export const FEATURE_LABELS: Record<string, string> = {
  borehole: 'Bore Hole',
  bq: 'Boys Quarters',
  generator_house: 'Generator House',
  security_post: 'Security Post',
  cctv: 'CCTV Security',
  interlocked: 'Interlocked Compound',
  tarred_road: 'Tarred Road Access',
  swimming_pool: 'Swimming Pool',
  fitted_kitchen: 'Fitted Kitchen',
  pop_ceiling: 'POP Ceiling',
  ensuite: 'All Rooms Ensuite',
  gated_estate: 'Gated Estate',
};

/**
 * Nigerian document type labels
 */
export const DOCUMENT_LABELS: Record<string, string> = {
  c_of_o: 'Certificate of Occupancy',
  governor_consent: 'Governor\'s Consent',
  deed_of_assignment: 'Deed of Assignment',
  survey_plan: 'Survey Plan',
  building_approval: 'Building Approval',
};
