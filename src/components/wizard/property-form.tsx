/**
 * Property Details Form Component
 * BLDR-2WIZ-003: Nigerian property form with validation
 * 
 * "use client" justification: Uses React Hook Form for controlled inputs,
 * onChange handlers, and form submission state
 */
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  propertyFormSchema, 
  PropertyFormData, 
  NIGERIAN_FEATURES 
} from '@/lib/schemas/property-schema';
import { formatNaira } from '@/lib/templates';

export interface PropertyDetailsFormProps {
  /** Callback when form is submitted */
  onSubmit: (data: PropertyFormData) => void;
  /** Callback for back navigation */
  onBack?: () => void;
  /** Initial form values */
  defaultValues?: Partial<PropertyFormData>;
}

/**
 * Parse Naira string back to number
 */
function parseNairaToNumber(value: string): number {
  const cleaned = value.replace(/[₦,\s]/g, '');
  return parseInt(cleaned, 10) || 0;
}

/**
 * PropertyDetailsForm - Nigerian property details form with Naira formatting
 * 
 * Features:
 * - React Hook Form + Zod validation
 * - Naira currency input with formatting
 * - sqm area display
 * - Nigerian features checkboxes
 * - WhatsApp number field
 */
export function PropertyDetailsForm({
  onSubmit,
  onBack,
  defaultValues = {},
}: PropertyDetailsFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: '',
      price: 0,
      beds: 4,
      baths: 3,
      sqm: 350,
      location: '',
      description: '',
      whatsappNumber: '',
      features: [],
      ...defaultValues,
    },
  });

  const selectedFeatures = watch('features') || [];

  const toggleFeature = (featureId: string) => {
    const current = selectedFeatures;
    const updated = current.includes(featureId)
      ? current.filter(f => f !== featureId)
      : [...current, featureId];
    setValue('features', updated);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Property Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-slate-200">
          Property Title
        </label>
        <Input
          id="title"
          placeholder="e.g., Luxury 4 Bedroom Duplex"
          {...register('title')}
          className="bg-slate-800/50"
        />
        {errors.title && (
          <p className="text-sm text-red-400">{errors.title.message}</p>
        )}
      </div>

      {/* Price with Naira formatting */}
      <div className="space-y-2">
        <label htmlFor="price" className="text-sm font-medium text-slate-200">
          Price (₦)
        </label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Input
              id="price"
              placeholder="₦85,000,000"
              value={field.value ? formatNaira(field.value) : ''}
              onChange={(e) => {
                const numValue = parseNairaToNumber(e.target.value);
                field.onChange(numValue);
              }}
              className="bg-slate-800/50"
            />
          )}
        />
        {errors.price && (
          <p className="text-sm text-red-400">{errors.price.message}</p>
        )}
      </div>

      {/* Beds, Baths, Area row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="beds" className="text-sm font-medium text-slate-200">
            Bedrooms
          </label>
          <Input
            id="beds"
            type="number"
            min={0}
            max={20}
            {...register('beds', { valueAsNumber: true })}
            className="bg-slate-800/50"
          />
          {errors.beds && (
            <p className="text-sm text-red-400">{errors.beds.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="baths" className="text-sm font-medium text-slate-200">
            Bathrooms
          </label>
          <Input
            id="baths"
            type="number"
            min={0}
            max={20}
            {...register('baths', { valueAsNumber: true })}
            className="bg-slate-800/50"
          />
          {errors.baths && (
            <p className="text-sm text-red-400">{errors.baths.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="sqm" className="text-sm font-medium text-slate-200">
            Area <span className="text-slate-400">(sqm)</span>
          </label>
          <Input
            id="sqm"
            type="number"
            min={0}
            {...register('sqm', { valueAsNumber: true })}
            className="bg-slate-800/50"
          />
          {errors.sqm && (
            <p className="text-sm text-red-400">{errors.sqm.message}</p>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label htmlFor="location" className="text-sm font-medium text-slate-200">
          Location
        </label>
        <Input
          id="location"
          placeholder="e.g., Lekki Phase 1, Lagos"
          {...register('location')}
          className="bg-slate-800/50"
        />
        {errors.location && (
          <p className="text-sm text-red-400">{errors.location.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-slate-200">
          Description <span className="text-slate-400">(optional)</span>
        </label>
        <Textarea
          id="description"
          placeholder="Describe the property..."
          {...register('description')}
          className="bg-slate-800/50 min-h-[100px]"
        />
      </div>

      {/* WhatsApp Number */}
      <div className="space-y-2">
        <label htmlFor="whatsapp" className="text-sm font-medium text-slate-200">
          WhatsApp Number
        </label>
        <Input
          id="whatsapp"
          placeholder="+234 801 234 5678"
          {...register('whatsappNumber')}
          className="bg-slate-800/50"
        />
      </div>

      {/* Nigerian Features */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-200">
          Nigerian Features
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {NIGERIAN_FEATURES.map((feature) => (
            <label
              key={feature.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature.id)}
                onChange={() => toggleFeature(feature.id)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 
                         text-primary focus:ring-primary focus:ring-offset-slate-900"
              />
              <span className="text-sm text-slate-300">{feature.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-between pt-4">
        {onBack && (
          <Button type="button" variant="ghost" onClick={onBack}>
            Back
          </Button>
        )}
        <Button type="submit" className="ml-auto">
          Next
        </Button>
      </div>
    </form>
  );
}
