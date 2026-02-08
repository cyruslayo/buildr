'use client';
// Justification: Uses onClick handlers for selection state

import { PAGE_TYPES, type PageType } from '@/lib/constants/nigeria-constants';
import { cn } from '@/lib/utils';

interface PageTypeSelectorProps {
  onSelect: (type: PageType) => void;
  selectedType?: PageType;
}

export function PageTypeSelector({ onSelect, selectedType }: PageTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {PAGE_TYPES.map((pageType) => (
        <button
          key={pageType.id}
          type="button"
          onClick={() => onSelect(pageType.id)}
          data-selected={selectedType === pageType.id}
          className={cn(
            'group relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-300',
            'hover:border-primary hover:shadow-lg hover:-translate-y-1',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            selectedType === pageType.id
              ? 'border-primary bg-primary/5 shadow-md'
              : 'border-border bg-card'
          )}
        >
          {/* Icon */}
          <span className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
            {pageType.icon}
          </span>
          
          {/* Label */}
          <span className={cn(
            'font-semibold text-center transition-colors duration-300',
            selectedType === pageType.id ? 'text-primary' : 'text-foreground'
          )}>
            {pageType.label}
          </span>
          
          {/* Description */}
          <span className="text-xs text-muted-foreground text-center mt-2">
            {pageType.description}
          </span>
          
          {/* Selection indicator */}
          {selectedType === pageType.id && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
