import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BigInput } from '@/features/wizard/components/big-input';
import '@testing-library/jest-dom';

describe('Accessibility: Focus Rings', () => {
  it('Button should have high-visibility focus ring classes', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus-visible:ring-2');
    expect(button).toHaveClass('focus-visible:ring-offset-2');
  });

  it('Input should have high-visibility focus ring classes', () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText('Type here');
    expect(input).toHaveClass('focus-visible:ring-2');
    expect(input).toHaveClass('focus-visible:ring-offset-2');
  });

  it('BigInput should have high-visibility focus ring classes', () => {
    render(<BigInput placeholder="Big input" value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('Big input');
    // BigInput now uses focus-visible for consistency with Button and Input
    expect(input).toHaveClass('focus-visible:ring-2');
    expect(input).toHaveClass('focus-visible:ring-offset-2');
  });
});
