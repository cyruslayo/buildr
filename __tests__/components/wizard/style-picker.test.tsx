/**
 * Style Picker Tests
 * BLDR-2WIZ-004: Style preset selector
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StylePicker, STYLE_PRESETS } from '@/components/wizard/style-picker';

describe('StylePicker', () => {
  const defaultProps = {
    onSelect: jest.fn(),
    selectedId: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays style presets', () => {
    render(<StylePicker {...defaultProps} />);
    
    expect(screen.getByText('Luxury Dark')).toBeInTheDocument();
    expect(screen.getByText('Professional Blue')).toBeInTheDocument();
  });

  it('renders all available presets', () => {
    render(<StylePicker {...defaultProps} />);
    
    const presetCards = screen.getAllByRole('button');
    expect(presetCards.length).toBe(STYLE_PRESETS.length);
  });

  it('calls onSelect when preset is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<StylePicker {...defaultProps} onSelect={onSelect} />);
    
    await user.click(screen.getByText('Luxury Dark'));
    
    expect(onSelect).toHaveBeenCalledWith('luxury_dark');
  });

  it('shows selected state for selected preset', () => {
    render(<StylePicker {...defaultProps} selectedId="luxury_dark" />);
    
    const selectedCard = screen.getByTestId('preset-luxury_dark');
    expect(selectedCard).toHaveAttribute('data-selected', 'true');
  });

  it('displays color preview swatches', () => {
    render(<StylePicker {...defaultProps} />);
    
    // Each preset should have color swatches
    const swatches = screen.getAllByTestId(/color-swatch/);
    expect(swatches.length).toBeGreaterThan(0);
  });

  it('shows preset description', () => {
    render(<StylePicker {...defaultProps} />);
    
    expect(screen.getByText(/gold accents for luxury/i)).toBeInTheDocument();
  });
});
