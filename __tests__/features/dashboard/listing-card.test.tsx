import React from 'react';
import { render, screen } from '@testing-library/react';
import { ListingCard } from '@/features/dashboard/components/listing-card';
import { PropertyStatus } from '@prisma/client';

const mockProperty: Property = {
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
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  );
});

// Mock Framer Motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('ListingCard', () => {
  it('renders property title and formatted price', () => {
    render(<ListingCard property={mockProperty} />);
    
    expect(screen.getByText('Lekki Penthouse')).toBeInTheDocument();
    // Currency format for NGN 150,000,000 - exact string depends on locale, 
    // but check for parts.
    expect(screen.getByText(/₦/)).toBeInTheDocument();
  });

  it('renders the "Edit" button linking to the wizard with item-specific aria-label', () => {
    render(<ListingCard property={mockProperty} />);
    
    const editLink = screen.getByRole('link', { name: /edit lekki penthouse/i });
    expect(editLink).toHaveAttribute('href', expect.stringContaining('/wizard?id=prop-1'));
  });

  it('renders "View Live" link pointing to /p/[slug] with rel="noopener noreferrer"', () => {
    render(<ListingCard property={mockProperty} />);

    const viewLiveLink = screen.getByRole('link', { name: /view live lekki penthouse/i });
    expect(viewLiveLink).toHaveAttribute('href', '/p/lekki-penthouse');
    expect(viewLiveLink).toHaveAttribute('target', '_blank');
    expect(viewLiveLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders unpublish button with item-specific aria-label when published', () => {
    render(<ListingCard property={mockProperty} />);

    const unpublishBtn = screen.getByLabelText(/unpublish lekki penthouse/i);
    expect(unpublishBtn).toBeInTheDocument();
  });

  it('applies featured classes when isFeatured is true', () => {
    const { container } = render(<ListingCard property={mockProperty} isFeatured={true} />);
    
    // Check for flex layout on the card
    const card = container.querySelector('.lg\\:flex');
    expect(card).toBeInTheDocument();
  });

  it('has accessible individual delete button for drafts', () => {
    const draftProperty = { ...mockProperty, status: PropertyStatus.DRAFT };
    render(<ListingCard property={draftProperty} />);
    
    // The button has aria-label from our previous story
    const deleteBtn = screen.getByLabelText(/delete draft: lekki penthouse/i);
    expect(deleteBtn).toBeInTheDocument();
  });
});
