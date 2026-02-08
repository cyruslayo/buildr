import type { PropertyData, NigerianFeature } from '@/lib/templates/types';

/**
 * Props for luxury template components
 */
export interface LuxuryTemplateProps extends PropertyData {
  /** Property title */
  title?: string;
  
  /** Agent/company name */
  agentName?: string;
  
  /** Agent RC number for trust */
  rcNumber?: string;
  
  /** Property images */
  images?: string[];
}

/**
 * Feature icon mapping for display
 */
export const FEATURE_ICONS: Record<NigerianFeature, { label: string; icon: string }> = {
  borehole: { label: 'Bore Hole', icon: '💧' },
  bq: { label: 'Boys Quarters', icon: '🏠' },
  generator_house: { label: 'Generator House', icon: '⚡' },
  security_post: { label: 'Security Post', icon: '🛡️' },
  cctv: { label: 'CCTV Security', icon: '📹' },
  interlocked: { label: 'Interlocked Compound', icon: '🧱' },
  tarred_road: { label: 'Tarred Road Access', icon: '🛣️' },
  swimming_pool: { label: 'Swimming Pool', icon: '🏊' },
  fitted_kitchen: { label: 'Fitted Kitchen', icon: '👨‍🍳' },
  pop_ceiling: { label: 'POP Ceiling', icon: '✨' },
  ensuite: { label: 'All Rooms Ensuite', icon: '🚿' },
  gated_estate: { label: 'Gated Estate', icon: '🚪' },
};
