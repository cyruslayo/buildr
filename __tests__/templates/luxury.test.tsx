import React from 'react';
import { render, screen } from '@testing-library/react';
import { BananaIslandVilla } from '@/templates/luxury/banana-island-villa';
import { IkoyiPenthouse } from '@/templates/luxury/ikoyi-penthouse';
import { MaitamaMansion } from '@/templates/luxury/maitama-mansion';
import '@testing-library/jest-dom';

// Mock property data for testing
const mockLuxuryData = {
  price: 850000000,
  beds: 5,
  baths: 6,
  sqm: 800,
  location: 'Banana Island, Lagos',
  title: '5 Bedroom Luxury Villa',
  features: ['swimming_pool', 'bq', 'generator_house'] as const,
  whatsappNumber: '+2348012345678',
};

describe('Luxury Templates', () => {
  describe('BananaIslandVilla', () => {
    it('renders with correct Naira formatting', () => {
      const { container } = render(
        <BananaIslandVilla {...mockLuxuryData} />
      );
      expect(container).toHaveTextContent('₦850,000,000');
    });

    it('renders with correct sqm formatting', () => {
      const { container } = render(
        <BananaIslandVilla {...mockLuxuryData} />
      );
      expect(container).toHaveTextContent('800 sqm');
    });

    it('displays location', () => {
      render(<BananaIslandVilla {...mockLuxuryData} />);
      expect(screen.getByText(/Banana Island/i)).toBeInTheDocument();
    });

    it('has WhatsApp CTA button', () => {
      render(<BananaIslandVilla {...mockLuxuryData} />);
      expect(screen.getByText(/whatsapp/i)).toBeInTheDocument();
    });

    it('displays bedroom count', () => {
      const { container } = render(
        <BananaIslandVilla {...mockLuxuryData} />
      );
      expect(container).toHaveTextContent('5');
    });

    it('displays bathroom count', () => {
      const { container } = render(
        <BananaIslandVilla {...mockLuxuryData} />
      );
      expect(container).toHaveTextContent('6');
    });
  });

  describe('IkoyiPenthouse', () => {
    const ikoyiData = {
      ...mockLuxuryData,
      location: 'Ikoyi, Lagos',
      title: 'Exclusive Penthouse Suite',
    };

    it('renders with correct Naira formatting', () => {
      const { container } = render(<IkoyiPenthouse {...ikoyiData} />);
      expect(container).toHaveTextContent('₦850,000,000');
    });

    it('displays location', () => {
      render(<IkoyiPenthouse {...ikoyiData} />);
      expect(screen.getByText(/Ikoyi/i)).toBeInTheDocument();
    });

    it('has WhatsApp CTA button', () => {
      render(<IkoyiPenthouse {...ikoyiData} />);
      expect(screen.getByText(/whatsapp/i)).toBeInTheDocument();
    });
  });

  describe('MaitamaMansion', () => {
    const maitamaData = {
      ...mockLuxuryData,
      location: 'Maitama, Abuja',
      title: 'Palatial Mansion',
    };

    it('renders with correct Naira formatting', () => {
      const { container } = render(<MaitamaMansion {...maitamaData} />);
      expect(container).toHaveTextContent('₦850,000,000');
    });

    it('displays location', () => {
      render(<MaitamaMansion {...maitamaData} />);
      expect(screen.getByText(/Maitama/i)).toBeInTheDocument();
    });

    it('has WhatsApp CTA button', () => {
      render(<MaitamaMansion {...maitamaData} />);
      expect(screen.getByText(/whatsapp/i)).toBeInTheDocument();
    });
  });
});
