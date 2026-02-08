import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyTypeSelector } from '@/components/wizard/property-type-selector';

describe('PropertyTypeSelector', () => {
  it('renders Nigerian property types', () => {
    render(<PropertyTypeSelector onSelect={jest.fn()} />);
    expect(screen.getByText('Detached Duplex')).toBeInTheDocument();
    expect(screen.getByText('Self-Contain')).toBeInTheDocument();
    expect(screen.getByText('Terrace Duplex')).toBeInTheDocument();
  });

  it('renders all 11 property types', () => {
    render(<PropertyTypeSelector onSelect={jest.fn()} />);
    expect(screen.getByText('Detached Duplex')).toBeInTheDocument();
    expect(screen.getByText('Semi-Detached Duplex')).toBeInTheDocument();
    expect(screen.getByText('Terrace Duplex')).toBeInTheDocument();
    expect(screen.getByText('Flat (1 Bedroom)')).toBeInTheDocument();
    expect(screen.getByText('Flat (2 Bedroom)')).toBeInTheDocument();
    expect(screen.getByText('Flat (3 Bedroom)')).toBeInTheDocument();
    expect(screen.getByText('Bungalow')).toBeInTheDocument();
    expect(screen.getByText('Self-Contain')).toBeInTheDocument();
    expect(screen.getByText('Mansion')).toBeInTheDocument();
    expect(screen.getByText('Penthouse')).toBeInTheDocument();
    expect(screen.getByText('Maisonette')).toBeInTheDocument();
  });

  it('calls onSelect with property type id', () => {
    const onSelect = jest.fn();
    render(<PropertyTypeSelector onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Detached Duplex'));
    expect(onSelect).toHaveBeenCalledWith('detached_duplex');
  });

  it('highlights selected property type', () => {
    render(<PropertyTypeSelector onSelect={jest.fn()} selectedType="terrace_duplex" />);
    const card = screen.getByText('Terrace Duplex').closest('button');
    expect(card).toHaveAttribute('data-selected', 'true');
  });
});
