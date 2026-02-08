/**
 * Testimonials Component
 * Nigerian real estate agents sharing their success stories
 */

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  avatar?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Adebayo Ogunlade',
    role: 'Real Estate Agent',
    location: 'Lekki, Lagos',
    quote: 'Buildr helped me create professional landing pages in minutes. My WhatsApp inquiries increased by 300% in the first month!',
    rating: 5,
  },
  {
    name: 'Chioma Eze',
    role: 'Property Developer',
    location: 'Victoria Island, Lagos',
    quote: 'Finally, a tool made for Nigerian real estate. The Naira pricing and WhatsApp integration are exactly what we need.',
    rating: 5,
  },
  {
    name: 'Ibrahim Musa',
    role: 'Estate Agent',
    location: 'Maitama, Abuja',
    quote: 'My clients in Abuja love the professional pages. The RC Number display builds instant trust with buyers.',
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-4 h-4',
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
          )}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Trusted by Nigerian Agents
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of real estate professionals across Nigeria who use Buildr
            to create stunning property landing pages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                'bg-card p-6 rounded-xl border shadow-sm',
                'transition-all duration-300 hover:shadow-md hover:-translate-y-1'
              )}
            >
              <StarRating rating={testimonial.rating} />
              
              <blockquote className="mt-4 text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
