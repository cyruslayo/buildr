import { render, screen, act } from '@testing-library/react';
import { OfflineIndicator } from '@/components/navigation/offline-indicator';
import '@testing-library/jest-dom';

describe('OfflineIndicator', () => {
  beforeEach(() => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
      writable: true,
    });
  });

  it('should not be visible when online', () => {
    render(<OfflineIndicator />);
    expect(screen.queryByText(/Offline Mode/i)).not.toBeInTheDocument();
  });

  it('should appear when offline', async () => {
    render(<OfflineIndicator />);
    
    // Simulate offline event
    act(() => {
      Object.defineProperty(navigator, 'onLine', { value: false });
      window.dispatchEvent(new Event('offline'));
    });

    expect(await screen.findByText(/Offline Mode/i)).toBeInTheDocument();
    expect(screen.getByText(/You are currently working offline/i)).toBeInTheDocument();
  });

  it('should disappear when back online', async () => {
    render(<OfflineIndicator />);
    
    // Go offline first
    act(() => {
      Object.defineProperty(navigator, 'onLine', { value: false });
      window.dispatchEvent(new Event('offline'));
    });
    expect(await screen.findByText(/Offline Mode/i)).toBeInTheDocument();

    // Go back online
    act(() => {
      Object.defineProperty(navigator, 'onLine', { value: true });
      window.dispatchEvent(new Event('online'));
    });

    // Wait for animation (AnimatePresence)
    // In JSDOM and Vitest/Jest, we might need to wait or mock the transition
    // But for this check, we'll just check if it's eventually gone
    expect(screen.queryByText(/Offline Mode/i)).not.toBeInTheDocument();
  });
});
