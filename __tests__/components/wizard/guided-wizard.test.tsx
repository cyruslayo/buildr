import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GuidedWizard } from '@/components/wizard/guided-wizard';

describe('GuidedWizard', () => {
  it('renders step 1 (Page Type) initially', () => {
    render(<GuidedWizard onComplete={jest.fn()} />);
    expect(screen.getByText('What type of page?')).toBeInTheDocument();
  });

  it('advances to step 2 after page type selection', async () => {
    render(<GuidedWizard onComplete={jest.fn()} />);
    fireEvent.click(screen.getByText('Property Listing'));
    fireEvent.click(screen.getByText('Next'));
    expect(await screen.findByText('Property Details')).toBeInTheDocument();
  });

  it('shows progress indicator', () => {
    render(<GuidedWizard onComplete={jest.fn()} />);
    expect(screen.getByTestId('progress-step-1')).toHaveClass('active');
  });

  it('allows going back to previous step', async () => {
    render(<GuidedWizard onComplete={jest.fn()} />);
    // Go to step 2
    fireEvent.click(screen.getByText('Property Listing'));
    fireEvent.click(screen.getByText('Next'));
    // Go back
    fireEvent.click(screen.getByText('Back'));
    expect(await screen.findByText('What type of page?')).toBeInTheDocument();
  });

  it('calls onComplete with wizard data on final step', async () => {
    const onComplete = jest.fn();
    render(<GuidedWizard onComplete={onComplete} />);
    
    // Step 1: Select page type
    fireEvent.click(screen.getByText('Property Listing'));
    fireEvent.click(screen.getByText('Next'));
    
    // Step 2: Fill minimal details (just go next for now)
    fireEvent.click(screen.getByText('Next'));
    
    // Step 3: Select style
    fireEvent.click(screen.getByText('Next'));
    
    // Step 4: WhatsApp config and complete
    fireEvent.click(screen.getByText('Generate'));
    
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({
      pageType: 'listing',
    }));
  });

  // ============================================
  // STEP 3: Style Picker Integration Tests
  // ============================================
  
  describe('Step 3 - Style Picker', () => {
    it('renders StylePicker component in Step 3', async () => {
      const user = userEvent.setup();
      render(<GuidedWizard onComplete={jest.fn()} />);
      
      // Navigate to Step 3
      await user.click(screen.getByText('Property Listing'));
      await user.click(screen.getByText('Next'));
      await user.click(screen.getByText('Next'));
      
      // StylePicker should be rendered, showing style presets
      expect(screen.getByText('Choose Your Style')).toBeInTheDocument();
      expect(screen.getByText('Luxury Dark')).toBeInTheDocument();
      expect(screen.getByText('Professional Blue')).toBeInTheDocument();
    });

    it('allows selecting a style preset in Step 3', async () => {
      const user = userEvent.setup();
      render(<GuidedWizard onComplete={jest.fn()} />);
      
      // Navigate to Step 3
      await user.click(screen.getByText('Property Listing'));
      await user.click(screen.getByText('Next'));
      await user.click(screen.getByText('Next'));
      
      // Click on Luxury Dark preset
      await user.click(screen.getByText('Luxury Dark'));
      
      // Verify selection is shown
      const selectedPreset = screen.getByTestId('preset-luxury_dark');
      expect(selectedPreset).toHaveAttribute('data-selected', 'true');
    });

    it('includes stylePreset in onComplete data', async () => {
      const onComplete = jest.fn();
      const user = userEvent.setup();
      render(<GuidedWizard onComplete={onComplete} />);
      
      // Step 1: Select page type
      await user.click(screen.getByText('Property Listing'));
      await user.click(screen.getByText('Next'));
      
      // Step 2: Skip details
      await user.click(screen.getByText('Next'));
      
      // Step 3: Select a style
      await user.click(screen.getByText('Luxury Dark'));
      await user.click(screen.getByText('Next'));
      
      // Step 4: Complete
      await user.click(screen.getByText('Generate'));
      
      expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({
        pageType: 'listing',
        stylePreset: 'luxury_dark',
      }));
    });
  });
});

