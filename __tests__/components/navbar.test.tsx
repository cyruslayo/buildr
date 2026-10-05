import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '@/components/navigation/navbar';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      ({ children, ...props }, ref) => (
        <div ref={ref} {...props}>
          {children}
        </div>
      )
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Navbar accessibility', () => {
  it('renders mobile toggle button with proper aria-expanded and aria-controls attributes', () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', { name: /open menu/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute('aria-controls', 'mobile-menu-drawer');
  });

  it('updates aria-expanded and renders dialog drawer with accessibility attributes when opened', () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(toggleButton);

    const closeButton = screen.getByRole('button', { name: /close menu/i });
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');

    const drawer = screen.getByRole('dialog', { name: /mobile navigation/i });
    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveAttribute('id', 'mobile-menu-drawer');
    expect(drawer).toHaveAttribute('aria-modal', 'true');
  });
});
