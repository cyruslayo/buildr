import type { PropertyData } from '@/lib/templates/types';

/**
 * Props for standard template components
 */
export interface StandardTemplateProps extends PropertyData {
  /** Property title */
  title?: string;
  
  /** Agent/company name */
  agentName?: string;
  
  /** Agent RC number for trust */
  rcNumber?: string;
  
  /** Property images */
  images?: string[];
}
