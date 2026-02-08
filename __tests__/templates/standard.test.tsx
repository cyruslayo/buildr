import React from 'react';
import { render, screen } from '@testing-library/react';
import { LekkiFamilyHome } from '@/templates/standard/lekki-family-home';
import { ModernDuplex } from '@/templates/standard/modern-duplex';
import { TerraceLife } from '@/templates/standard/terrace-life';
import '@testing-library/jest-dom';

// Mock property data for testing
const mockStandardData = {
  price: 85000000,
  beds: 4,
  baths: 4,
  sqm: 350,
  location: 'Lekki Phase 1, Lagos',
  title: '4 Bedroom Duplex',
  features: ['borehole', 'bq', 'fitted_kitchen'] as const,
  whatsappNumber: '+2348012345678',
};

describe('Standard Templates', () => {
  describe('LekkiFamilyHome', () => {
    it('renders with correct Naira formatting', () => {
      const { container } = render(
        <LekkiFamilyHome {...mockStandardData} />
      );
      expect(container).toHaveTextContent('₦85,000,000');
    });

    it('renders with correct sqm formatting', () => {
      const { container } = render(
        <LekkiFamilyHome {...mockStandardData} />
      );
      expect(container).toHaveTextContent('350 sqm');
    });

    it('displays location', () => {
      render(<LekkiFamilyHome {...mockStandardData} />);
      const locations = screen.getAllByText(/Lekki Phase 1/i);
      expect(locations.length).toBeGreaterThan(0);
    });

    it('has WhatsApp CTA button', () => {
      render(<LekkiFamilyHome {...mockStandardData} />);
      const whatsappButtons = screen.getAllByText(/whatsapp/i);
      expect(whatsappButtons.length).toBeGreaterThan(0);
    });

    it('displays bedroom count', () => {
      const { container } = render(
        <LekkiFamilyHome {...mockStandardData} />
      );
      expect(container).toHaveTextContent('4');
    });
  });

  describe('ModernDuplex', () => {
    const duplexData = {
      ...mockStandardData,
      title: 'Modern Semi-Detached Duplex',
      location: 'Ajah, Lagos',
    };

    it('renders with correct Naira formatting', () => {
      const { container } = render(<ModernDuplex {...duplexData} />);
      expect(container).toHaveTextContent('₦85,000,000');
    });

    it('displays location', () => {
      render(<ModernDuplex {...duplexData} />);
      const locations = screen.getAllByText(/Ajah/i);
      expect(locations.length).toBeGreaterThan(0);
    });

    it('has WhatsApp CTA button', () => {
      render(<ModernDuplex {...duplexData} />);
      const whatsappButtons = screen.getAllByText(/whatsapp/i);
      expect(whatsappButtons.length).toBeGreaterThan(0);
    });
  });

  describe('TerraceLife', () => {
    const terraceData = {
      ...mockStandardData,
      title: 'Terrace Duplex',
      location: 'Chevron, Lekki',
    };

    it('renders with correct Naira formatting', () => {
      const { container } = render(<TerraceLife {...terraceData} />);
      expect(container).toHaveTextContent('₦85,000,000');
    });

    it('displays location', () => {
      render(<TerraceLife {...terraceData} />);
      const locations = screen.getAllByText(/Chevron/i);
      expect(locations.length).toBeGreaterThan(0);
    });

    it('has WhatsApp CTA button', () => {
      render(<TerraceLife {...terraceData} />);
      const whatsappButtons = screen.getAllByText(/whatsapp/i);
      expect(whatsappButtons.length).toBeGreaterThan(0);
    });
  });
});

