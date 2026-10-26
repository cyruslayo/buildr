import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../../src/components/navigation/navbar';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock framer-motion to avoid animation timing issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Navbar Component', () => {
  it('renders the mobile menu button with aria-expanded="false" initially', () => {
    render(<Navbar />);
    const button = screen.getByRole('button', { name: /open menu/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('updates aria-expanded to "true" when the mobile menu button is clicked', () => {
    render(<Navbar />);
    const button = screen.getByRole('button', { name: /open menu/i });

    fireEvent.click(button);

    const closeButton = screen.getByRole('button', { name: /close menu/i });
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');
  });
});
