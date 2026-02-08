import { render, screen, fireEvent } from '@testing-library/react';
import { PageTypeSelector } from '@/components/wizard/page-type-selector';

describe('PageTypeSelector', () => {
  it('renders all 7 page types', () => {
    render(<PageTypeSelector onSelect={jest.fn()} />);
    expect(screen.getByText('Property Listing')).toBeInTheDocument();
    expect(screen.getByText('Land Sale')).toBeInTheDocument();
    expect(screen.getByText('Agent Profile')).toBeInTheDocument();
    expect(screen.getByText('Short-Let')).toBeInTheDocument();
    expect(screen.getByText('Estate/Off-Plan')).toBeInTheDocument();
    expect(screen.getByText('Inspection Booking')).toBeInTheDocument();
    expect(screen.getByText('Agency About')).toBeInTheDocument();
  });

  it('calls onSelect with page type id', () => {
    const onSelect = jest.fn();
    render(<PageTypeSelector onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Property Listing'));
    expect(onSelect).toHaveBeenCalledWith('listing');
  });

  it('highlights selected page type', () => {
    render(<PageTypeSelector onSelect={jest.fn()} selectedType="listing" />);
    const card = screen.getByText('Property Listing').closest('button');
    expect(card).toHaveAttribute('data-selected', 'true');
  });

  it('displays icons for each page type', () => {
    render(<PageTypeSelector onSelect={jest.fn()} />);
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('🌍')).toBeInTheDocument();
    expect(screen.getByText('👤')).toBeInTheDocument();
  });

  it('displays descriptions for each page type', () => {
    render(<PageTypeSelector onSelect={jest.fn()} />);
    expect(screen.getByText('Showcase a property for sale or rent')).toBeInTheDocument();
    expect(screen.getByText('Sell a plot of land')).toBeInTheDocument();
  });
});
