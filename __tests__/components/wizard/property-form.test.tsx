/**
 * Property Details Form Tests
 * BLDR-2WIZ-003: Nigerian property form with validation
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropertyDetailsForm } from '@/components/wizard/property-form';

describe('PropertyDetailsForm', () => {
  const defaultProps = {
    onSubmit: jest.fn(),
    onBack: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields', () => {
    render(<PropertyDetailsForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/property title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bedrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bathrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/area/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<PropertyDetailsForm {...defaultProps} onSubmit={onSubmit} />);
    
    // Click submit without filling fields
    await user.click(screen.getByRole('button', { name: /next/i }));
    
    // Should show validation errors (title is required)
    await waitFor(() => {
      expect(screen.getByText(/property title is required/i)).toBeInTheDocument();
    });
    
    // onSubmit should not be called
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('formats Naira currency input', async () => {
    const user = userEvent.setup();
    render(<PropertyDetailsForm {...defaultProps} />);
    
    const priceInput = screen.getByLabelText(/price/i);
    await user.clear(priceInput);
    await user.type(priceInput, '85000000');
    
    // Should format with Naira symbol and commas
    await waitFor(() => {
      expect(priceInput).toHaveValue('₦85,000,000');
    });
  });

  it('shows sqm label for area field', () => {
    render(<PropertyDetailsForm {...defaultProps} />);
    
    // Area field should note sqm measurement
    expect(screen.getByText(/sqm/i)).toBeInTheDocument();
  });

  it('shows Nigerian features checkboxes', () => {
    render(<PropertyDetailsForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/bore hole/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/boys quarters/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/generator house/i)).toBeInTheDocument();
  });

  it('shows WhatsApp number field', () => {
    render(<PropertyDetailsForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/whatsapp/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<PropertyDetailsForm {...defaultProps} onSubmit={onSubmit} />);
    
    // Fill required fields
    await user.type(screen.getByLabelText(/property title/i), 'Luxury Villa');
    await user.clear(screen.getByLabelText(/price/i));
    await user.type(screen.getByLabelText(/price/i), '85000000');
    await user.clear(screen.getByLabelText(/bedrooms/i));
    await user.type(screen.getByLabelText(/bedrooms/i), '4');
    await user.clear(screen.getByLabelText(/bathrooms/i));
    await user.type(screen.getByLabelText(/bathrooms/i), '3');
    await user.clear(screen.getByLabelText(/area/i));
    await user.type(screen.getByLabelText(/area/i), '350');
    await user.type(screen.getByLabelText(/location/i), 'Lekki Phase 1, Lagos');
    
    // Submit
    await user.click(screen.getByRole('button', { name: /next/i }));
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it('toggles Nigerian feature checkboxes', async () => {
    const user = userEvent.setup();
    render(<PropertyDetailsForm {...defaultProps} />);
    
    const boreHoleCheckbox = screen.getByLabelText(/bore hole/i);
    expect(boreHoleCheckbox).not.toBeChecked();
    
    await user.click(boreHoleCheckbox);
    expect(boreHoleCheckbox).toBeChecked();
  });
});
