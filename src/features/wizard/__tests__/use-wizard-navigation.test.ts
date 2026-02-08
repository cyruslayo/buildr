import { renderHook, act } from '@testing-library/react';
import { useWizardNavigation } from '../hooks/use-wizard-navigation';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('useWizardNavigation', () => {
  const mockPush = jest.fn();
  const mockPathname = '/wizard';

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  it('should return "details" as default step if no search param is present', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(''));
    const { result } = renderHook(() => useWizardNavigation());
    expect(result.current.currentStep).toBe('details');
  });

  it('should return the current step from search params', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('step=price'));
    const { result } = renderHook(() => useWizardNavigation());
    expect(result.current.currentStep).toBe('price');
  });

  it('should navigate to next step correctly', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('step=details'));
    const { result } = renderHook(() => useWizardNavigation());
    
    act(() => {
      result.current.nextStep();
    });

    expect(mockPush).toHaveBeenCalledWith('/wizard?step=price');
  });

  it('should navigate to previous step correctly', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('step=price'));
    const { result } = renderHook(() => useWizardNavigation());
    
    act(() => {
      result.current.previousStep();
    });

    expect(mockPush).toHaveBeenCalledWith('/wizard?step=details');
  });
});
