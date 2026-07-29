import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardSidebar } from '@/components/navigation/dashboard-sidebar';

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href, 'aria-label': ariaLabel, className }: any) {
    return (
      <a href={href} aria-label={ariaLabel} className={className}>
        {children}
      </a>
    );
  };
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

describe('DashboardSidebar', () => {
  it('renders correctly when expanded', () => {
    render(<DashboardSidebar userName="Alex" userEmail="alex@prime.ng" />);

    // Check navigation items are present with text
    expect(screen.getByText('My Pages')).toBeInTheDocument();
    expect(screen.getByText('Templates')).toBeInTheDocument();
    expect(screen.getByText('Brand Settings')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();

    // Check user info is visible
    expect(screen.getByText('Alex')).toBeInTheDocument();
    expect(screen.getByText('alex@prime.ng')).toBeInTheDocument();

    // Check "New Page" text is present
    expect(screen.getByText('New Page')).toBeInTheDocument();

    // Check "Sign Out" button text is present
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('provides proper ARIA labels and focus state when collapsed', () => {
    const { container } = render(<DashboardSidebar userName="Alex" userEmail="alex@prime.ng" />);

    // Simulate collapsing the sidebar by clicking the toggle button
    const toggleButton = screen.getByRole('button', { name: /collapse sidebar/i });
    toggleButton.click();

    // Links and buttons should have the correct aria-label attributes in collapsed state
    const newPageLink = screen.getByRole('link', { name: 'Create New Page' });
    expect(newPageLink).toBeInTheDocument();

    const myPagesLink = screen.getByRole('link', { name: 'My Pages' });
    expect(myPagesLink).toBeInTheDocument();

    const templatesLink = screen.getByRole('link', { name: 'Templates' });
    expect(templatesLink).toBeInTheDocument();

    const brandLink = screen.getByRole('link', { name: 'Brand Settings' });
    expect(brandLink).toBeInTheDocument();

    const accountLink = screen.getByRole('link', { name: 'Account' });
    expect(accountLink).toBeInTheDocument();

    const signOutBtn = screen.getByRole('button', { name: 'Sign Out' });
    expect(signOutBtn).toBeInTheDocument();

    // The avatar should have tabIndex={0} and a proper profile ARIA label
    const avatar = container.querySelector('[aria-label="Alex\'s profile"]');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('tabIndex', '0');
  });
});
