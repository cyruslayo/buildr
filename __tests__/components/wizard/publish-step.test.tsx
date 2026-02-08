import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PublishStep } from '@/features/wizard/components/steps/publish-step';
import { useWizardStore } from '@/features/wizard/store/wizard-store';
import '@testing-library/jest-dom';

// Mock the wizard store
jest.mock('@/features/wizard/store/wizard-store', () => ({
  useWizardStore: jest.fn(),
}));

// Mock the server action
jest.mock('@/features/wizard/actions/publish-listing', () => ({
  publishListing: jest.fn(),
}));

describe('PublishStep', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a summary of property data', () => {
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: {
        title: 'Luxury 4 Bedroom Duplex',
        price: 150000000,
        location: 'Lekki Phase 1',
        amenities: ['Borehole', 'CCTV'],
      },
      syncStatus: 'synced',
    });

    render(<PublishStep />);

    expect(screen.getByText(/Ready to go live?/i)).toBeInTheDocument();
    expect(screen.getByText(/Luxury 4 Bedroom Duplex/i)).toBeInTheDocument();
    expect(screen.getByText(/₦150,000,000/i)).toBeInTheDocument();
    expect(screen.getByText(/Lekki Phase 1/i)).toBeInTheDocument();
  });

  it('disables the publish button when assets are still syncing', () => {
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: { title: 'Test Property' },
      syncStatus: 'syncing',
    });

    render(<PublishStep />);

    const publishButton = screen.getByRole('button', { name: /Publish Listing/i });
    expect(publishButton).toBeDisabled();
    expect(screen.getByText(/Syncing assets to Cloudinary/i)).toBeInTheDocument();
  });

  it('enables the publish button when all assets are synced', () => {
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: { title: 'Test Property' },
      syncStatus: 'synced',
    });

    render(<PublishStep />);

    const publishButton = screen.getByRole('button', { name: /Publish Listing/i });
    expect(publishButton).not.toBeDisabled();
  });

  it('shows success state and shareable link after publishing', async () => {
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: { 
        title: 'Luxury Duplex',
        status: 'PUBLISHED',
        slug: 'luxury-duplex'
      },
      syncStatus: 'synced',
    });

    render(<PublishStep />);

    expect(screen.getByText(/Published!/i)).toBeInTheDocument();
    expect(screen.getByText(/agency.buildr.ng\/luxury-duplex/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Copy Link/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /WhatsApp/i })).toBeInTheDocument();
  });
});
