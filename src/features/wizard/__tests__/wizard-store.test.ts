import { renderHook, act } from '@testing-library/react';
import { useWizardStore } from '../store/wizard-store';

describe('useWizardStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
    // Reset Zustand state if possible or use a fresh store
  });

  it('should initialize with empty property data', () => {
    const { result } = renderHook(() => useWizardStore());
    expect(result.current.propertyData).toEqual({});
  });

  it('should update property data', () => {
    const { result } = renderHook(() => useWizardStore());
    
    act(() => {
      result.current.updatePropertyData({ price: 150000000 });
    });

    expect(result.current.propertyData.price).toBe(150000000);
  });

  it('should persist data to localStorage', () => {
    const { result } = renderHook(() => useWizardStore());
    
    act(() => {
      result.current.updatePropertyData({ title: 'Lekki Luxury' });
    });

    const stored = JSON.parse(window.localStorage.getItem('wizard-storage') || '{}');
    expect(stored.state.propertyData.title).toBe('Lekki Luxury');
  });
});
