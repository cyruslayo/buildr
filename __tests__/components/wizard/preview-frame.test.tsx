/**
 * Preview Frame Tests
 * BLDR-2WIZ-005: Iframe-based template preview
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PreviewFrame } from '@/components/wizard/preview-frame';

describe('PreviewFrame', () => {
  const defaultProps = {
    templateId: 'tmpl_listing_luxury_ng',
    data: {
      price: 85000000,
      beds: 4,
      baths: 3,
      sqm: 350,
      location: 'Lekki Phase 1, Lagos',
    },
  };

  it('renders iframe element', () => {
    render(<PreviewFrame {...defaultProps} />);
    
    const iframe = screen.getByTitle('Preview');
    expect(iframe).toBeInTheDocument();
  });

  it('shows mobile/desktop toggle buttons', () => {
    render(<PreviewFrame {...defaultProps} />);
    
    expect(screen.getByRole('button', { name: /mobile/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /desktop/i })).toBeInTheDocument();
  });

  it('toggles to mobile view', async () => {
    const user = userEvent.setup();
    render(<PreviewFrame {...defaultProps} />);
    
    await user.click(screen.getByRole('button', { name: /mobile/i }));
    
    // Mobile view should have a narrower frame
    const frame = screen.getByTestId('preview-container');
    expect(frame).toHaveAttribute('data-view', 'mobile');
  });

  it('toggles to desktop view', async () => {
    const user = userEvent.setup();
    render(<PreviewFrame {...defaultProps} />);
    
    // Start by switching to mobile
    await user.click(screen.getByRole('button', { name: /mobile/i }));
    
    // Then switch to desktop
    await user.click(screen.getByRole('button', { name: /desktop/i }));
    
    const frame = screen.getByTestId('preview-container');
    expect(frame).toHaveAttribute('data-view', 'desktop');
  });

  it('shows fullscreen button', () => {
    render(<PreviewFrame {...defaultProps} />);
    
    expect(screen.getByRole('button', { name: /fullscreen/i })).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(<PreviewFrame {...defaultProps} />);
    
    // Should show a loading indicator or skeleton
    expect(screen.getByTestId('preview-loading')).toBeInTheDocument();
  });
});
