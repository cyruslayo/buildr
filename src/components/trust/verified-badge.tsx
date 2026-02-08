/**
 * VerifiedBadge Component
 * @fileoverview Trust signal badge for verified agents
 * 
 * CRITICAL: R-005 mitigation - only show when kyc_status === 'verified'
 * 
 * Design: Lagos Luxury styling with depth (shadow, gradient, border)
 */
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerifiedBadgeProps {
  kycStatus?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Verified Agent Badge
 * Only renders when kycStatus is exactly 'verified'
 */
export function VerifiedBadge({ 
  kycStatus, 
  className,
  size = 'md' 
}: VerifiedBadgeProps) {
  // CRITICAL: Only show badge for VERIFIED status
  // R-005: Prevents fake verified badges
  if (kycStatus?.toLowerCase() !== 'verified') {
    return null;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1.5 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div
      data-testid="verified-badge"
      className={cn(
        // Base styles
        'inline-flex items-center font-semibold rounded-full',
        // Lagos Luxury: Depth with gradient, shadow, and border (not flat)
        'bg-gradient-to-r from-emerald-500 to-emerald-600',
        'text-white',
        'shadow-lg shadow-emerald-500/30',
        'border border-emerald-400/50',
        'ring-2 ring-emerald-400/20 ring-offset-1 ring-offset-white',
        // Size
        sizeClasses[size],
        className
      )}
    >
      <ShieldCheck className={cn(iconSizes[size], 'shrink-0')} />
      <span>Verified</span>
    </div>
  );
}
