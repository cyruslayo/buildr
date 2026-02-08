import { render, screen } from '@testing-library/react';
import { WhatsAppFloatingButton } from '@/components/whatsapp/floating-button';

describe('WhatsAppFloatingButton', () => {
  it('renders with WhatsApp green', () => {
    render(<WhatsAppFloatingButton phone="2348012345678" />);
    const button = screen.getByRole('link');
    expect(button).toHaveStyle({ backgroundColor: '#25D366' });
  });

  it('has correct href', () => {
    render(<WhatsAppFloatingButton phone="2348012345678" message="Hello" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://wa.me/2348012345678?text=Hello');
  });

  it('URL-encodes the message', () => {
    render(<WhatsAppFloatingButton phone="2348012345678" message="Hello! I'm interested in this property." />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('text=Hello!%20I\'m%20interested%20in%20this%20property.'));
  });

  it('is fixed to bottom-right', () => {
    render(<WhatsAppFloatingButton phone="2348012345678" />);
    const button = screen.getByRole('link');
    expect(button).toHaveStyle({ position: 'fixed' });
  });

  it('has WhatsApp icon', () => {
    render(<WhatsAppFloatingButton phone="2348012345678" />);
    expect(screen.getByTestId('whatsapp-icon')).toBeInTheDocument();
  });

  it('has accessible label', () => {
    render(<WhatsAppFloatingButton phone="2348012345678" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Chat on WhatsApp');
  });
});
