'use client';
// Justification: Uses useState for city selection and onClick handlers

import { useState, useEffect } from 'react';
import { LOCATIONS, CITIES } from '@/lib/constants/nigeria-constants';
import { cn } from '@/lib/utils';

interface LocationSelectorProps {
  onSelect: (location: { city: string; area: string }) => void;
  selectedCity?: string;
  selectedArea?: string;
}

export function LocationSelector({ onSelect, selectedCity, selectedArea }: LocationSelectorProps) {
  const [activeCity, setActiveCity] = useState<string | undefined>(selectedCity);
  
  // Sync with external state
  useEffect(() => {
    setActiveCity(selectedCity);
  }, [selectedCity]);

  const handleCitySelect = (city: string) => {
    setActiveCity(city);
    // Don't call onSelect yet - wait for area selection
  };

  const handleAreaSelect = (area: string) => {
    if (activeCity) {
      onSelect({ city: activeCity, area });
    }
  };

  const areas = activeCity ? LOCATIONS[activeCity] || [] : [];

  return (
    <div className="space-y-6">
      {/* City Selection */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Select City</h4>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => handleCitySelect(city)}
              data-selected={activeCity === city}
              className={cn(
                'px-4 py-2 rounded-lg border-2 font-medium transition-all duration-300',
                'hover:border-primary hover:shadow-sm',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                activeCity === city
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground'
              )}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Area Selection */}
      {activeCity && areas.length > 0 && (
        <div className="animate-in slide-in-from-top-2 duration-300">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Select Area in {activeCity}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {areas.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => handleAreaSelect(area)}
                data-selected={selectedArea === area}
                className={cn(
                  'px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-300',
                  'hover:border-primary hover:shadow-sm hover:-translate-y-0.5',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                  selectedArea === area
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card text-foreground'
                )}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
