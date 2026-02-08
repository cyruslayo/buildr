'use client';
// Justification: Uses hover state styling that benefits from client-side hydration

import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';

interface WhatsAppCTAButtonProps {
  phone: string;
  message?: string;
  label?: string;
  className?: string;
}

export function WhatsAppCTAButton({
  phone,
  message = "Hello! I'm interested in this property.",
  label = 'Chat on WhatsApp',
  className,
}: WhatsAppCTAButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const href = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        // Flexbox layout
        'inline-flex items-center gap-2',
        // Padding and border-radius
        'px-6 py-3 rounded-lg',
        // Typography
        'font-semibold text-white',
        // Transition
        'transition-all duration-300',
        'hover:scale-105',
        className
      )}
      style={{
        backgroundColor: '#25D366',
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
        className="w-5 h-5"
        strokeWidth={2}
      />
      {label}
    </a>
  );
}
