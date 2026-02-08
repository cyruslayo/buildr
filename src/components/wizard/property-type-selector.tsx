'use client';
// Justification: Uses onClick handlers for selection state

import { PROPERTY_TYPES, type PropertyType } from '@/lib/constants/nigeria-constants';
import { cn } from '@/lib/utils';

interface PropertyTypeSelectorProps {
  onSelect: (type: PropertyType) => void;
  selectedType?: PropertyType;
}

export function PropertyTypeSelector({ onSelect, selectedType }: PropertyTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {PROPERTY_TYPES.map((propertyType) => (
        <button
          key={propertyType.id}
          type="button"
          onClick={() => onSelect(propertyType.id)}
          data-selected={selectedType === propertyType.id}
          className={cn(
            'group relative flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-300',
            'hover:border-primary hover:shadow-md hover:-translate-y-0.5',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            selectedType === propertyType.id
              ? 'border-primary bg-primary/5 shadow-sm'
              : 'border-border bg-card'
          )}
        >
          {/* Label */}
          <span className={cn(
            'font-medium text-sm text-center transition-colors duration-300',
            selectedType === propertyType.id ? 'text-primary' : 'text-foreground'
          )}>
            {propertyType.label}
          </span>
          
          {/* Selection indicator */}
          {selectedType === propertyType.id && (
            <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
