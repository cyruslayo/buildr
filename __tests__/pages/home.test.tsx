// __tests__/pages/home.test.tsx
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe('Marketing Homepage', () => {
  it('renders hero section', () => {
    render(<HomePage />);
    expect(screen.getByText(/ai-powered/i)).toBeInTheDocument();
  });

  it('has CTA buttons', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: /get started free/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /see templates/i })).toBeInTheDocument();
  });

  it('shows Nigerian focus', () => {
    render(<HomePage />);
    // Use getAllByText since 'nigerian real estate' appears multiple times
    const nigerianElements = screen.getAllByText(/nigerian real estate/i);
    expect(nigerianElements.length).toBeGreaterThan(0);
    // Use getAllByText since ₦ appears multiple times
    const nairaElements = screen.getAllByText(/₦/);
    expect(nairaElements.length).toBeGreaterThan(0);
  });

  it('displays pricing tiers in Naira', () => {
    render(<HomePage />);
    expect(screen.getByText(/₦5,000/)).toBeInTheDocument();
    expect(screen.getByText(/₦15,000/)).toBeInTheDocument();
    expect(screen.getByText(/₦50,000/)).toBeInTheDocument();
  });

  it('shows WhatsApp integration feature', () => {
    render(<HomePage />);
    // Use getAllByText since WhatsApp appears multiple times
    const whatsappElements = screen.getAllByText(/whatsapp/i);
    expect(whatsappElements.length).toBeGreaterThan(0);
  });

  it('has mobile responsive structure', () => {
    render(<HomePage />);
    // Check for main landmark
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
