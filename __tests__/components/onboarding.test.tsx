// __tests__/components/onboarding.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Onboarding } from '@/components/onboarding/onboarding';

describe('Onboarding', () => {
  it('shows onboarding for new users', () => {
    render(<Onboarding isFirstTime={true} onComplete={jest.fn()} />);
    expect(screen.getByText(/welcome to buildr/i)).toBeInTheDocument();
  });

  it('can skip onboarding', () => {
    const onComplete = jest.fn();
    render(<Onboarding isFirstTime={true} onComplete={onComplete} />);
    fireEvent.click(screen.getByText('Skip'));
    expect(onComplete).toHaveBeenCalled();
  });

  it('shows wizard steps', () => {
    render(<Onboarding isFirstTime={true} onComplete={jest.fn()} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('navigates to next step', () => {
    render(<Onboarding isFirstTime={true} onComplete={jest.fn()} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });

  it('navigates to previous step', () => {
    render(<Onboarding isFirstTime={true} onComplete={jest.fn()} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Back'));
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('completes onboarding on final step', () => {
    const onComplete = jest.fn();
    render(<Onboarding isFirstTime={true} onComplete={onComplete} />);
    // Navigate through all steps
    fireEvent.click(screen.getByText('Next')); // To step 2
    fireEvent.click(screen.getByText('Next')); // To step 3
    fireEvent.click(screen.getByText('Get Started'));
    expect(onComplete).toHaveBeenCalled();
  });

  it('does not render when not first time', () => {
    render(<Onboarding isFirstTime={false} onComplete={jest.fn()} />);
    expect(screen.queryByText(/welcome to buildr/i)).not.toBeInTheDocument();
  });
});
