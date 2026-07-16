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

  it('renders character counter with correct count', () => {
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: { description: 'Hello world' },
      updatePropertyData: mockUpdatePropertyData,
    });

    render(<DescriptionStep />);

    expect(screen.getByText('11/2000')).toBeInTheDocument();
  });

  it('applies warning color when nearing character limit (80%)', () => {
    const nearLimitDescription = 'a'.repeat(1600);
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: { description: nearLimitDescription },
      updatePropertyData: mockUpdatePropertyData,
    });

    render(<DescriptionStep />);

    const counter = screen.getByText('1600/2000');
    expect(counter).toHaveClass('text-amber-500');
  });

  it('applies destructive color when very close to character limit (90%)', () => {
    const dangerDescription = 'a'.repeat(1800);
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: { description: dangerDescription },
      updatePropertyData: mockUpdatePropertyData,
    });

    render(<DescriptionStep />);

    const counter = screen.getByText('1800/2000');
    expect(counter).toHaveClass('text-destructive');
  });

  it('syncs local state when store description changes externally', () => {
    const { rerender } = render(<DescriptionStep />);

    expect(screen.getByPlaceholderText(/Describe this luxury semi-detached duplex/i)).toHaveValue('');

    // Simulate external update
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: { description: 'External update' },
      updatePropertyData: mockUpdatePropertyData,
    });

    rerender(<DescriptionStep />);

    expect(screen.getByPlaceholderText(/Describe this luxury semi-detached duplex/i)).toHaveValue('External update');
    expect(screen.getByText('15/2000')).toBeInTheDocument();
  });
});
