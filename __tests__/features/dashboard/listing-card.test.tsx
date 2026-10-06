import React from 'react';
import { render, screen } from '@testing-library/react';
import { ListingCard } from '@/features/dashboard/components/listing-card';
import { PropertyStatus, Property } from '@prisma/client';

const mockProperty = {
  id: 'prop-1',
  title: 'Lekki Penthouse',
  price: 150000000,
  location: 'Lekki Phase 1',
  description: 'Luxury living',
  status: PropertyStatus.PUBLISHED,
  userId: 'user-1',
  teamId: 'team-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  slug: 'lekki-penthouse',
  address: '123 Lekki Rd',
  propertyType: 'Penthouse',
  amenities: ['Pool', 'Gym'],
  bedrooms: 5,
  bathrooms: 5,
  sqm: 500,
  deletedAt: null,
};

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock Framer Motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<'div'>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const typedMockProperty = mockProperty as unknown as Property;

describe('ListingCard', () => {
  it('renders property title and formatted price', () => {
    render(<ListingCard property={typedMockProperty} />);
    
    expect(screen.getByText('Lekki Penthouse')).toBeInTheDocument();
    // Currency format for NGN 150,000,000 - exact string depends on locale, 
    // but check for parts.
    expect(screen.getByText(/₦/)).toBeInTheDocument();
  });

  it('renders the "Edit" button linking to the wizard', () => {
    render(<ListingCard property={typedMockProperty} />);
    
    const editLink = screen.getByRole('link', { name: /edit property/i });
    expect(editLink).toHaveAttribute('href', expect.stringContaining('/wizard?id=prop-1'));
  });

  it('renders the "View Live" link pointing to /p/slug with rel="noopener noreferrer"', () => {
    render(<ListingCard property={typedMockProperty} />);

    const liveLink = screen.getByRole('link', { name: /view live property/i });
    expect(liveLink).toHaveAttribute('href', '/p/lekki-penthouse');
    expect(liveLink).toHaveAttribute('target', '_blank');
    expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies featured classes when isFeatured is true', () => {
    const { container } = render(<ListingCard property={typedMockProperty} isFeatured={true} />);
    
    // Check for flex layout on the card
    const card = container.querySelector('.lg\\:flex');
    expect(card).toBeInTheDocument();
  });

  it('has accessible individual delete button for drafts', () => {
    const draftProperty = { ...typedMockProperty, status: PropertyStatus.DRAFT };
    render(<ListingCard property={draftProperty} />);
    
    // The button has aria-label from our previous story
    const deleteBtn = screen.getByLabelText(/delete draft: lekki penthouse/i);
    expect(deleteBtn).toBeInTheDocument();
  });
});
