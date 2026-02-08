import React from 'react';
import { render, screen } from '@testing-library/react';
import { ListingCard } from '@/features/dashboard/components/listing-card';
import { PropertyStatus } from '@prisma/client';

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
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ListingCard', () => {
  it('renders property title and formatted price', () => {
    render(<ListingCard property={mockProperty as any} />);
    
    expect(screen.getByText('Lekki Penthouse')).toBeInTheDocument();
    // Currency format for NGN 150,000,000 - exact string depends on locale, 
    // but check for parts.
    expect(screen.getByText(/₦/)).toBeInTheDocument();
  });

  it('renders the "Edit" button linking to the wizard', () => {
    render(<ListingCard property={mockProperty as any} />);
    
    const editLink = screen.getByRole('link', { name: /edit/i });
    expect(editLink).toHaveAttribute('href', expect.stringContaining('/wizard?id=prop-1'));
  });

  it('applies featured classes when isFeatured is true', () => {
    const { container } = render(<ListingCard property={mockProperty as any} isFeatured={true} />);
    
    // Check for flex layout on the card
    const card = container.querySelector('.lg\\:flex');
    expect(card).toBeInTheDocument();
  });

  it('has accessible individual delete button for drafts', () => {
    const draftProperty = { ...mockProperty, status: PropertyStatus.DRAFT };
    render(<ListingCard property={draftProperty as any} />);
    
    // The button has aria-label from our previous story
    const deleteBtn = screen.getByLabelText(/delete draft: lekki penthouse/i);
    expect(deleteBtn).toBeInTheDocument();
  });
});
