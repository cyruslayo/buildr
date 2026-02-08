'use client';
// Justification: Uses hover state styling that benefits from client-side hydration

import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatingButtonProps {
  phone: string;
  message?: string;
  className?: string;
}

export function WhatsAppFloatingButton({
  phone,
  message = "Hello! I'm interested in this property.",
  className,
}: WhatsAppFloatingButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const href = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        // Fixed position - bottom right
        'fixed bottom-6 right-6',
        // Mobile safe area - 80px from bottom on small screens
        'sm:bottom-6 max-sm:bottom-20',
        // Size and shape
        'w-[60px] h-[60px] rounded-full',
        // WhatsApp styling
        'flex items-center justify-center',
        // Depth and z-index
        'shadow-lg z-[999]',
        // Transitions
        'transition-all duration-300',
        'hover:scale-110',
        className
      )}
      style={{
        backgroundColor: '#25D366',
        position: 'fixed',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#128C7E';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#25D366';
      }}
    >
      <MessageCircle
        data-testid="whatsapp-icon"
        className="w-7 h-7 text-white"
        strokeWidth={2}
      />
    </a>
  );
}
