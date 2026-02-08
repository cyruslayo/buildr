import React from 'react';
import { render, screen } from '@testing-library/react';
import { BigInput } from '../../src/features/wizard/components/big-input';
import '@testing-library/jest-dom';

describe('BigInput Component', () => {
  it('renders with the correct value', () => {
    render(<BigInput value="Test Value" onChange={() => {}} />);
    const input = screen.getByDisplayValue('Test Value');
    expect(input).toBeInTheDocument();
  });

  it('applies the correct styling classes', () => {
    render(<BigInput value="" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('text-[32px]');
    expect(input).toHaveClass('border-b-2');
    expect(input).toHaveClass('border-t-0');
    expect(input).toHaveClass('border-x-0');
  });
});
