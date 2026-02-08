import { render, screen, fireEvent } from '@testing-library/react';
import { LocationSelector } from '@/components/wizard/location-selector';

describe('LocationSelector', () => {
  it('shows Nigerian cities', () => {
    render(<LocationSelector onSelect={jest.fn()} />);
    expect(screen.getByText('Lagos')).toBeInTheDocument();
    expect(screen.getByText('Abuja')).toBeInTheDocument();
    expect(screen.getByText('Port Harcourt')).toBeInTheDocument();
    expect(screen.getByText('Ibadan')).toBeInTheDocument();
  });

  it('shows areas after city selection', async () => {
    render(<LocationSelector onSelect={jest.fn()} />);
    fireEvent.click(screen.getByText('Lagos'));
    expect(await screen.findByText('Lekki Phase 1')).toBeInTheDocument();
    expect(await screen.findByText('Ikoyi')).toBeInTheDocument();
    expect(await screen.findByText('Victoria Island')).toBeInTheDocument();
  });

  it('calls onSelect with city and area', () => {
    const onSelect = jest.fn();
    render(<LocationSelector onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Lagos'));
    fireEvent.click(screen.getByText('Lekki Phase 1'));
    expect(onSelect).toHaveBeenCalledWith({ city: 'Lagos', area: 'Lekki Phase 1' });
  });

  it('shows selected location', () => {
    render(<LocationSelector onSelect={jest.fn()} selectedCity="Abuja" selectedArea="Maitama" />);
    const cityButton = screen.getByText('Abuja').closest('button');
    expect(cityButton).toHaveAttribute('data-selected', 'true');
    expect(screen.getByText('Maitama').closest('button')).toHaveAttribute('data-selected', 'true');
  });

  it('shows Abuja areas when Abuja is selected', () => {
    render(<LocationSelector onSelect={jest.fn()} selectedCity="Abuja" />);
    expect(screen.getByText('Maitama')).toBeInTheDocument();
    expect(screen.getByText('Asokoro')).toBeInTheDocument();
    expect(screen.getByText('Gwarimpa')).toBeInTheDocument();
  });
});
