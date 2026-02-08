import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DescriptionStep } from '@/features/wizard/components/steps/description-step';
import { useWizardStore } from '@/features/wizard/store/wizard-store';
import '@testing-library/jest-dom';

// Mock the store
jest.mock('@/features/wizard/store/wizard-store', () => ({
  useWizardStore: jest.fn(),
}));

describe('DescriptionStep Component', () => {
  const mockUpdatePropertyData = jest.fn();
  const mockPropertyData = { description: '' };

  beforeEach(() => {
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: mockPropertyData,
      updatePropertyData: mockUpdatePropertyData,
    });
    jest.clearAllMocks();
  });

  it('renders a dense-mode textarea for property description', () => {
    render(<DescriptionStep />);
    
    expect(screen.getByText(/Property Description/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Describe this luxury semi-detached duplex/i)).toBeInTheDocument();
  });

  it('updates the store when the description text changes', async () => {
    jest.useFakeTimers();
    render(<DescriptionStep />);
    
    const textarea = screen.getByPlaceholderText(/Describe this luxury semi-detached duplex/i);
    fireEvent.change(textarea, { target: { value: 'This property is amazing.' } });
    
    // Fast-forward time
    jest.runAllTimers();
    
    expect(mockUpdatePropertyData).toHaveBeenCalledWith({
      description: 'This property is amazing.',
    });
    jest.useRealTimers();
  });

  it('renders currently entered description from the store', () => {
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: { description: 'Existing description' },
      updatePropertyData: mockUpdatePropertyData,
    });

    render(<DescriptionStep />);
    
    expect(screen.getByDisplayValue('Existing description')).toBeInTheDocument();
  });
});
