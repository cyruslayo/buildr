export const NIGERIAN_AMENITIES = [
  'Borehole',
  'Boys Quarters',
  'Swimming Pool',
  '24/7 Electricity',
  'Generator House',
  'Security Post',
  'CCTV',
  'Gym',
  'Fenced Compound',
  'POP Ceiling',
  'Water Treatment',
  'Interlocked Floor',
] as const;

export type NigerianAmenity = typeof NIGERIAN_AMENITIES[number];
