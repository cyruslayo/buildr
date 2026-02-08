/**
 * Wizard Container Tests
 * BLDR-2WIZ-001: Wizard Step Container
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { WizardContainer } from '@/components/wizard/wizard-container';

describe('WizardContainer', () => {
  const defaultProps = {
    currentStep: 1,
    totalSteps: 4,
    onStepChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders step indicator', () => {
    render(<WizardContainer {...(defaultProps as any)} />);
    expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
  });

  it('renders step title when provided', () => {
    render(
      <WizardContainer {...(defaultProps as any)} stepTitle="Choose Template" />
    );
    expect(screen.getByText('Choose Template')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <WizardContainer {...(defaultProps as any)}>
        <div data-testid="wizard-content">Test Content</div>
      </WizardContainer>
    );
    expect(screen.getByTestId('wizard-content')).toBeInTheDocument();
  });

  it('navigates to next step when Next button clicked', () => {
    const onStepChange = jest.fn();
    render(<WizardContainer {...(defaultProps as any)} onStepChange={onStepChange} />);
    
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(onStepChange).toHaveBeenCalledWith(2);
  });

  it('navigates to previous step when Previous button clicked', () => {
    const onStepChange = jest.fn();
    render(
      <WizardContainer {...(defaultProps as any)} currentStep={2} onStepChange={onStepChange} />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(onStepChange).toHaveBeenCalledWith(1);
  });

  it('disables Previous button on first step', () => {
    render(<WizardContainer {...(defaultProps as any)} currentStep={1} />);
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
  });

  it('shows Finish button on last step', () => {
    render(<WizardContainer {...(defaultProps as any)} currentStep={4} />);
    expect(screen.getByRole('button', { name: /finish/i })).toBeInTheDocument();
  });

  it('calls onFinish when Finish button clicked', () => {
    const onFinish = jest.fn();
    render(
      <WizardContainer {...(defaultProps as any)} currentStep={4} onFinish={onFinish} />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(onFinish).toHaveBeenCalled();
  });

  it('disables Next button when canProceed is false', () => {
    render(<WizardContainer {...(defaultProps as any)} canProceed={false} />);
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('shows loading state when isLoading is true', () => {
    render(<WizardContainer {...(defaultProps as any)} isLoading={true} />);
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('renders progress bar with correct percentage', () => {
    render(<WizardContainer {...(defaultProps as any)} currentStep={2} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
  });
});
