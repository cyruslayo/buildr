import { render, screen, fireEvent } from '@testing-library/react';
import { WhatsAppConfig } from '@/components/wizard/whatsapp-config';

describe('WhatsAppConfig', () => {
  it('shows +234 prefix', () => {
    render(<WhatsAppConfig onChange={jest.fn()} />);
    expect(screen.getByText('+234')).toBeInTheDocument();
  });

  it('validates Nigerian phone number', async () => {
    render(<WhatsAppConfig onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText('08012345678');
    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.blur(input);
    expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
  });

  it('accepts valid Nigerian phone number', () => {
    const onChange = jest.fn();
    render(<WhatsAppConfig onChange={onChange} />);
    const input = screen.getByPlaceholderText('08012345678');
    fireEvent.change(input, { target: { value: '08012345678' } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      number: '08012345678',
    }));
  });

  it('shows pre-filled message input', () => {
    render(<WhatsAppConfig onChange={jest.fn()} />);
    expect(screen.getByPlaceholderText(/interested in/i)).toBeInTheDocument();
  });

  it('shows floating button toggle', () => {
    render(<WhatsAppConfig onChange={jest.fn()} />);
    expect(screen.getByLabelText(/floating/i)).toBeInTheDocument();
  });
});
