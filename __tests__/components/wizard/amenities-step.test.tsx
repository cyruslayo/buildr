import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AmenitiesStep } from '@/features/wizard/components/steps/amenities-step';
import { useWizardStore } from '@/features/wizard/store/wizard-store';
import '@testing-library/jest-dom';

// Mock the store
jest.mock('@/features/wizard/store/wizard-store', () => ({
  useWizardStore: jest.fn(),
}));

describe('AmenitiesStep Component', () => {
  const mockUpdatePropertyData = jest.fn();
  const mockPropertyData = { amenities: [] };

  beforeEach(() => {
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: mockPropertyData,
      updatePropertyData: mockUpdatePropertyData,
    });
    jest.clearAllMocks();
  });

  it('renders a dense grid of Nigerian amenities', () => {
    render(<AmenitiesStep />);
    
    expect(screen.getByText(/Select Amenities/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Borehole/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Boys Quarters/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Swimming Pool/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/24\/7 Electricity/i)).toBeInTheDocument();
  });

  it('updates the store when an amenity is toggled', () => {
    render(<AmenitiesStep />);
    
    const boreholeCheckbox = screen.getByLabelText(/Borehole/i);
    fireEvent.click(boreholeCheckbox);
    
    expect(mockUpdatePropertyData).toHaveBeenCalledWith({
      amenities: ['Borehole'],
    });
  });

  it('renders currently selected amenities from the store', () => {
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: { amenities: ['Borehole', 'Boys Quarters'] },
      updatePropertyData: mockUpdatePropertyData,
    });

    render(<AmenitiesStep />);
    
    expect(screen.getByLabelText(/Borehole/i)).toBeChecked();
    expect(screen.getByLabelText(/Boys Quarters/i)).toBeChecked();
  });
});
