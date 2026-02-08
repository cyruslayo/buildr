import { render, screen, fireEvent } from '@testing-library/react';
import { FeaturesChecklist } from '@/components/wizard/features-checklist';

describe('FeaturesChecklist', () => {
  it('shows Nigerian property features', () => {
    render(<FeaturesChecklist onChange={jest.fn()} />);
    expect(screen.getByText('Bore Hole')).toBeInTheDocument();
    expect(screen.getByText('Generator House')).toBeInTheDocument();
    expect(screen.getByText('Boys Quarters (BQ)')).toBeInTheDocument();
    expect(screen.getByText('Security Post')).toBeInTheDocument();
  });

  it('returns selected features', () => {
    const onChange = jest.fn();
    render(<FeaturesChecklist onChange={onChange} />);
    fireEvent.click(screen.getByText('Bore Hole'));
    expect(onChange).toHaveBeenCalledWith(['borehole']);
  });

  it('accumulates multiple selections', () => {
    const onChange = jest.fn();
    render(<FeaturesChecklist onChange={onChange} selectedFeatures={['borehole']} />);
    fireEvent.click(screen.getByText('Generator House'));
    expect(onChange).toHaveBeenCalledWith(expect.arrayContaining(['borehole', 'generator_house']));
  });

  it('deselects when clicked again', () => {
    const onChange = jest.fn();
    render(<FeaturesChecklist onChange={onChange} selectedFeatures={['borehole', 'bq']} />);
    fireEvent.click(screen.getByText('Bore Hole'));
    expect(onChange).toHaveBeenCalledWith(['bq']);
  });

  it('groups features by category', () => {
    render(<FeaturesChecklist onChange={jest.fn()} />);
    // Check that category headers exist (using getAllByText and checking the header elements)
    const headers = screen.getAllByRole('heading', { level: 4 });
    const headerTexts = headers.map(h => h.textContent?.toLowerCase());
    expect(headerTexts).toContain('utilities');
    expect(headerTexts).toContain('security');
    expect(headerTexts).toContain('compound');
    expect(headerTexts).toContain('interior');
  });
});
