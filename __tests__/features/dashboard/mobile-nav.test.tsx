import React from 'react';
import { render, screen } from '@testing-library/react';
import { MobileNav } from '../../../src/app/(dashboard)/_components/mobile-nav';
import '@testing-library/jest-dom';

// Mocking DashboardSidebar and Sheet to focus on toggle availability
jest.mock('../../../src/components/navigation/dashboard-sidebar', () => ({
  DashboardSidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

// Mocking Sheet component from UI
jest.mock('../../../src/components/ui/sheet', () => ({
  Sheet: ({ children }: any) => <div>{children}</div>,
  SheetTrigger: ({ children }: any) => <div data-testid="sheet-trigger">{children}</div>,
  SheetContent: ({ children }: any) => <div data-testid="sheet-content">{children}</div>,
}));

describe('MobileNav Component', () => {
  it('renders a menu toggle with 48px touch target target (h-12 w-12)', () => {
    render(<MobileNav userName="Cyrus" />);
    
    const trigger = screen.getByRole('button', { name: /open menu/i });
    expect(trigger).toHaveClass('h-12');
    expect(trigger).toHaveClass('w-12');
  });

  it('contains the DashboardSidebar within the mobile drawer', () => {
    render(<MobileNav userName="Cyrus" />);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
  });
});
