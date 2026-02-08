import { render, screen } from '@testing-library/react';
import { WhatsAppCTAButton } from '@/components/whatsapp/cta-button';

describe('WhatsAppCTAButton', () => {
  it('renders with icon and text', () => {
    render(<WhatsAppCTAButton phone="2348012345678" />);
    expect(screen.getByText('Chat on WhatsApp')).toBeInTheDocument();
    expect(screen.getByTestId('whatsapp-icon')).toBeInTheDocument();
  });

  it('has correct href', () => {
    render(<WhatsAppCTAButton phone="2348012345678" message="Hello" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://wa.me/2348012345678?text=Hello');
  });

  it('uses custom label', () => {
    render(<WhatsAppCTAButton phone="2348012345678" label="Contact Agent" />);
    expect(screen.getByText('Contact Agent')).toBeInTheDocument();
  });

  it('has WhatsApp green background', () => {
    render(<WhatsAppCTAButton phone="2348012345678" />);
    const button = screen.getByRole('link');
    expect(button).toHaveStyle({ backgroundColor: '#25D366' });
  });

  it('has accessible attributes', () => {
    render(<WhatsAppCTAButton phone="2348012345678" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
