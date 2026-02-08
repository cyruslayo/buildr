/**
 * Property Form Schema
 * Zod validation for Nigerian property details
 */
import { z } from 'zod';

/**
 * Nigerian features that can be selected
 */
export const NIGERIAN_FEATURES = [
  { id: 'bore_hole', label: 'Bore Hole' },
  { id: 'boys_quarters', label: 'Boys Quarters' },
  { id: 'generator_house', label: 'Generator House' },
  { id: 'swimming_pool', label: 'Swimming Pool' },
  { id: 'security_post', label: 'Security Post' },
  { id: 'solar_panels', label: 'Solar Panels' },
  { id: 'parking_space', label: 'Parking Space' },
  { id: 'garden', label: 'Garden' },
] as const;

export type NigerianFeatureId = typeof NIGERIAN_FEATURES[number]['id'];

/**
 * Zod schema for property details form
 * Using Zod v4 compatible API
 */
export const propertyFormSchema = z.object({
  title: z.string().min(1, 'Property title is required'),
  price: z.number({ message: 'Price is required' })
    .positive('Price must be greater than 0'),
  beds: z.number({ message: 'Bedrooms is required' })
    .int().min(0).max(20),
  baths: z.number({ message: 'Bathrooms is required' })
    .int().min(0).max(20),
  sqm: z.number({ message: 'Area is required' })
    .positive('Area must be greater than 0'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().optional(),
  whatsappNumber: z.string().optional(),
  features: z.array(z.string()).optional(),
});

export type PropertyFormData = z.infer<typeof propertyFormSchema>;
