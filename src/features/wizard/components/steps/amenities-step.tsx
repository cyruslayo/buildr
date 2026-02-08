'use client';

import React from 'react';
import { useWizardStore } from '../../store/wizard-store';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { NIGERIAN_AMENITIES } from '../../constants/amenities';


export function AmenitiesStep() {
  const { propertyData, updatePropertyData } = useWizardStore();
  const selectedAmenities = (propertyData.amenities as string[]) || [];

  const toggleAmenity = (amenity: string) => {
    const newAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];
    
    updatePropertyData({ amenities: newAmenities });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Select Amenities</h2>
        <p className="text-muted-foreground">Highlight the key features that make this property stand out.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-4">
        {NIGERIAN_AMENITIES.map((amenity) => {
          const amenityId = amenity.toLowerCase().replace(/\s+/g, '-');
          return (
            <div key={amenity} className="flex items-center space-x-3 group">
              <Checkbox 
                id={amenityId}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
                className="w-5 h-5 rounded border-2 transition-all duration-300"
              />
              <Label 
                htmlFor={amenityId}
                className="text-sm font-medium leading-none cursor-pointer group-hover:text-primary transition-colors duration-300"
              >
                {amenity}
              </Label>
            </div>
          );
        })}
      </div>

      <div className="text-center text-xs text-muted-foreground/50 uppercase tracking-widest pt-4">
        Accurate lists build trust with Nigerian buyers.
      </div>
    </div>
  );
}
