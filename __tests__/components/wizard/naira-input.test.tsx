import { render, screen, fireEvent } from '@testing-library/react';
import { NairaInput } from '@/components/wizard/naira-input';

describe('NairaInput', () => {
  it('shows ₦ prefix', () => {
    render(<NairaInput value={0} onChange={jest.fn()} />);
    expect(screen.getByText('₦')).toBeInTheDocument();
  });

  it('formats number with thousands separator', () => {
    render(<NairaInput value={85000000} onChange={jest.fn()} />);
    expect(screen.getByDisplayValue('85,000,000')).toBeInTheDocument();
  });

  it('returns numeric value', () => {
    const onChange = jest.fn();
    render(<NairaInput value={0} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '50000000' } });
    expect(onChange).toHaveBeenCalledWith(50000000);
  });

  it('handles empty input as zero', () => {
    const onChange = jest.fn();
    render(<NairaInput value={85000000} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('strips non-numeric characters', () => {
    const onChange = jest.fn();
    render(<NairaInput value={0} onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '50,000,000' } });
    expect(onChange).toHaveBeenCalledWith(50000000);
  });
});
