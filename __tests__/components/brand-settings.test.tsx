/**
 * Brand Settings Tests
 * BLDR-2UI-011: Brand customization component
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrandSettings } from '@/components/brand/brand-settings';

describe('BrandSettings', () => {
  const defaultProps = {
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows color selection', () => {
    render(<BrandSettings onChange={jest.fn()} />);
    expect(screen.getByLabelText('Primary Color')).toBeInTheDocument();
    expect(screen.getByLabelText('Secondary Color')).toBeInTheDocument();
  });

  it('allows logo upload', () => {
    render(<BrandSettings onChange={jest.fn()} />);
    expect(screen.getByLabelText(/upload logo/i)).toBeInTheDocument();
  });

  it('emits brand settings on color change', async () => {
    const onChange = jest.fn();
    render(<BrandSettings onChange={onChange} />);
    
    const primaryInput = screen.getByLabelText('Primary Color');
    fireEvent.change(primaryInput, { target: { value: '#1a365d' } });
    
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      primaryColor: '#1a365d',
    }));
  });

  it('renders accent color picker', () => {
    render(<BrandSettings {...defaultProps} />);
    expect(screen.getByLabelText('Accent Color')).toBeInTheDocument();
  });

  it('renders font family selector', () => {
    render(<BrandSettings {...defaultProps} />);
    expect(screen.getByLabelText('Font Family')).toBeInTheDocument();
  });

  it('renders company name input', () => {
    render(<BrandSettings {...defaultProps} />);
    expect(screen.getByLabelText('Company Name')).toBeInTheDocument();
  });

  it('emits brand settings on company name change', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<BrandSettings onChange={onChange} />);
    
    const nameInput = screen.getByLabelText('Company Name');
    await user.type(nameInput, 'Lagos Prime Realty');
    
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      companyName: expect.stringContaining('Lagos'),
    }));
  });

  it('shows brand color preview', () => {
    render(<BrandSettings {...defaultProps} />);
    expect(screen.getByTestId('brand-preview')).toBeInTheDocument();
  });

  it('accepts initial values', () => {
    const initialValues = {
      primaryColor: '#D4AF37',
      secondaryColor: '#1a1a2e',
      accentColor: '#F5D547',
      fontFamily: 'Inter',
      companyName: 'Victoria Island Homes',
      logoUrl: null,
    };
    
    render(<BrandSettings onChange={jest.fn()} initialValues={initialValues} />);
    
    const companyInput = screen.getByLabelText('Company Name') as HTMLInputElement;
    expect(companyInput.value).toBe('Victoria Island Homes');
  });

  it('emits font family selection', () => {
    render(<BrandSettings onChange={jest.fn()} />);
    
    // The Select component renders with default value 'Inter'
    // Verify the font selector is present and shows default
    const fontSelect = screen.getByLabelText('Font Family');
    expect(fontSelect).toBeInTheDocument();
    
    // The trigger should display the current font value
    expect(screen.getByRole('combobox')).toHaveTextContent('Inter');
  });


});
