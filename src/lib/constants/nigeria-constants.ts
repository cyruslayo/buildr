/**
 * Nigeria-specific constants for the Buildr wizard
 * Reference: docs/project-docs/09-GUIDED-PROMPT-FLOW.md
 */

// Page Types for Nigerian Real Estate
export const PAGE_TYPES = [
  { id: 'listing', label: 'Property Listing', icon: '🏠', description: 'Showcase a property for sale or rent' },
  { id: 'land', label: 'Land Sale', icon: '🌍', description: 'Sell a plot of land' },
  { id: 'agent', label: 'Agent Profile', icon: '👤', description: 'Create your professional profile' },
  { id: 'shortlet', label: 'Short-Let', icon: '🛏️', description: 'List a short-term rental' },
  { id: 'estate', label: 'Estate/Off-Plan', icon: '🏗️', description: 'Market a development project' },
  { id: 'inspection', label: 'Inspection Booking', icon: '📅', description: 'Schedule property viewings' },
  { id: 'agency', label: 'Agency About', icon: '🏢', description: 'Present your agency' },
] as const;

export type PageType = typeof PAGE_TYPES[number]['id'];

// Nigerian Property Types
export const PROPERTY_TYPES = [
  { id: 'detached_duplex', label: 'Detached Duplex' },
  { id: 'semi_detached_duplex', label: 'Semi-Detached Duplex' },
  { id: 'terrace_duplex', label: 'Terrace Duplex' },
  { id: 'flat_1br', label: 'Flat (1 Bedroom)' },
  { id: 'flat_2br', label: 'Flat (2 Bedroom)' },
  { id: 'flat_3br', label: 'Flat (3 Bedroom)' },
  { id: 'bungalow', label: 'Bungalow' },
  { id: 'self_contain', label: 'Self-Contain' },
  { id: 'mansion', label: 'Mansion' },
  { id: 'penthouse', label: 'Penthouse' },
  { id: 'maisonette', label: 'Maisonette' },
] as const;

export type PropertyType = typeof PROPERTY_TYPES[number]['id'];

// Nigerian Locations (City → Areas)
export const LOCATIONS: Record<string, string[]> = {
  Lagos: [
    'Lekki Phase 1', 'Lekki Phase 2', 'Chevron', 'Ikate', 'Osapa London',
    'Ikoyi', 'Banana Island', 'Victoria Island', 'Ajah', 'Sangotedo',
    'Ikeja GRA', 'Magodo', 'Maryland', 'Surulere', 'Yaba',
    'Gbagada', 'Anthony', 'Ogudu', 'Ojodu', 'Omole',
  ],
  Abuja: [
    'Maitama', 'Asokoro', 'Wuse', 'Wuse 2', 'Garki',
    'Gwarimpa', 'Jabi', 'Katampe', 'Life Camp', 'Utako',
    'Mabushi', 'Lugbe', 'Kubwa', 'Nyanya', 'Karu',
  ],
  'Port Harcourt': [
    'GRA Phase 1', 'GRA Phase 2', 'Trans Amadi', 'Rumuola',
    'Old GRA', 'Peter Odili Road', 'Eliozu', 'Rukpokwu',
  ],
  Ibadan: [
    'Bodija', 'UI Area', 'Jericho', 'Ring Road', 'Oluyole',
    'Agodi GRA', 'Iyaganku', 'Samonda',
  ],
};

export const CITIES = Object.keys(LOCATIONS);

// Nigerian Property Features (grouped by category)
export const PROPERTY_FEATURES = [
  // Utilities
  { id: 'borehole', label: 'Bore Hole', category: 'utilities' },
  { id: 'generator_house', label: 'Generator House', category: 'utilities' },
  { id: 'solar', label: 'Solar Panels', category: 'utilities' },
  { id: 'inverter', label: 'Inverter System', category: 'utilities' },
  { id: 'prepaid_meter', label: 'Prepaid Meter', category: 'utilities' },
  
  // Security
  { id: 'security_post', label: 'Security Post', category: 'security' },
  { id: 'cctv', label: 'CCTV Security', category: 'security' },
  { id: 'perimeter_fence', label: 'Perimeter Fencing', category: 'security' },
  { id: 'electric_fence', label: 'Electric Fence', category: 'security' },
  { id: 'gated_estate', label: 'Gated Estate', category: 'security' },
  
  // Compound
  { id: 'bq', label: 'Boys Quarters (BQ)', category: 'compound' },
  { id: 'parking', label: 'Parking Space', category: 'compound' },
  { id: 'interlocked', label: 'Interlocked Compound', category: 'compound' },
  { id: 'garden', label: 'Garden', category: 'compound' },
  
  // Interior
  { id: 'fitted_kitchen', label: 'Fitted Kitchen', category: 'interior' },
  { id: 'pop_ceiling', label: 'POP Ceiling', category: 'interior' },
  { id: 'ensuite', label: 'All Rooms Ensuite', category: 'interior' },
  { id: 'ac', label: 'Air Conditioning', category: 'interior' },
  { id: 'walk_in_closet', label: 'Walk-in Closet', category: 'interior' },
  
  // Recreation
  { id: 'pool', label: 'Swimming Pool', category: 'recreation' },
  { id: 'gym', label: 'Gym', category: 'recreation' },
  
  // Access
  { id: 'tarred_road', label: 'Tarred Road Access', category: 'access' },
  { id: 'serviced', label: 'Serviced Estate', category: 'access' },
  { id: 'newly_built', label: 'Newly Built', category: 'condition' },
] as const;

export type FeatureCategory = 'utilities' | 'security' | 'compound' | 'interior' | 'recreation' | 'access' | 'condition';

// Land Document Types
export const LAND_DOCUMENTS = [
  { id: 'c_of_o', label: 'C of O (Certificate of Occupancy)', trusted: true },
  { id: 'governors_consent', label: "Governor's Consent", trusted: true },
  { id: 'survey', label: 'Survey Plan', trusted: false },
  { id: 'deed_of_assignment', label: 'Deed of Assignment', trusted: false },
  { id: 'excision', label: 'Excision', trusted: true },
  { id: 'gazette', label: 'Gazette', trusted: true },
  { id: 'r_of_o', label: 'R of O (Right of Occupancy)', trusted: false },
] as const;

// Agent Certifications
export const AGENT_CERTIFICATIONS = [
  { id: 'niesv', label: 'NIESV (Nigerian Institution of Estate Surveyors and Valuers)' },
  { id: 'redan', label: 'REDAN (Real Estate Developers Association of Nigeria)' },
  { id: 'aref', label: 'AREF (Association of Real Estate Firms)' },
  { id: 'esvarbon', label: 'ESVARBON (Estate Surveyors and Valuers Registration Board)' },
  { id: 'nim', label: 'NIM (Nigerian Institute of Management)' },
] as const;
