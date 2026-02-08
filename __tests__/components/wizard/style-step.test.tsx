import { render, screen, fireEvent } from '@testing-library/react';
import { StyleStep } from '@/features/wizard/components/steps/style-step';
import { useWizardStore } from '@/features/wizard/store/wizard-store';

// Mock the wizard store
jest.mock('@/features/wizard/store/wizard-store', () => ({
  useWizardStore: jest.fn(),
}));

describe('StyleStep Component', () => {
  const mockUpdatePropertyData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: { stylePreset: 'executive-navy' },
      updatePropertyData: mockUpdatePropertyData,
    });
  });

  it('renders all 4 styled presets', () => {
    render(<StyleStep />);
    
    expect(screen.getByText(/Executive Navy/i)).toBeInTheDocument();
    expect(screen.getByText(/Growth Green/i)).toBeInTheDocument();
    expect(screen.getByText(/Luxury Onyx/i)).toBeInTheDocument();
    expect(screen.getByText(/Urgency Red/i)).toBeInTheDocument();
  });

  it('updates the store when a preset is selected using test ids', () => {
    render(<StyleStep />);
    
    const growthGreenCard = screen.getByTestId('preset-card-growth-green');
    fireEvent.click(growthGreenCard);
    
    expect(mockUpdatePropertyData).toHaveBeenCalledWith({
      stylePreset: 'growth-green',
    });
  });

  it('verifies accessibility role for color palettes', () => {
    render(<StyleStep />);
    
    const colorPreviews = screen.getAllByRole('img');
    expect(colorPreviews.length).toBe(4);
    expect(colorPreviews[0]).toHaveAttribute('aria-label', expect.stringContaining('Color palette for'));
  });

  it('highlights the selected preset', () => {
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: { stylePreset: 'luxury-onyx' },
      updatePropertyData: mockUpdatePropertyData,
    });

    render(<StyleStep />);
    
    const onyxCard = screen.getByTestId('preset-card-luxury-onyx');
    expect(onyxCard).toHaveClass('border-primary');
  });
});
