import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '@/components/navigation/navbar';
import '@testing-library/jest-dom';

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock Framer Motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<'div'>) => {
      const restProps = { ...props };
      delete (restProps as Record<string, unknown>).initial;
      delete (restProps as Record<string, unknown>).animate;
      delete (restProps as Record<string, unknown>).exit;
      delete (restProps as Record<string, unknown>).transition;
      return <div {...restProps}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Navbar accessibility', () => {
  it('renders mobile toggle button with correct accessibility attributes', () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', { name: /open menu/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  it('updates aria-expanded and renders mobile menu on click', () => {
    render(<Navbar />);

    const toggleButton = screen.getByRole('button', { name: /open menu/i });

    // Open mobile menu
    fireEvent.click(toggleButton);

    const openToggleButton = screen.getByRole('button', { name: /close menu/i });
    expect(openToggleButton).toHaveAttribute('aria-expanded', 'true');

    const mobileMenu = screen.getByLabelText('Mobile navigation');
    expect(mobileMenu).toBeInTheDocument();
    expect(mobileMenu).toHaveAttribute('id', 'mobile-menu');
  });
});
