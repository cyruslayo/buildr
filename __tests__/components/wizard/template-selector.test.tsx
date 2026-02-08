/**
 * Template Selector Tests
 * BLDR-2WIZ-002: Template gallery with category filtering
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TemplateSelector } from '@/components/wizard/template-selector';
import { TEMPLATE_REGISTRY } from '@/lib/templates/registry';

// Use real templates from registry
const mockTemplates = TEMPLATE_REGISTRY;

describe('TemplateSelector', () => {
  const defaultProps = {
    templates: mockTemplates,
    onSelect: jest.fn(),
    selectedId: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays template grid with all templates', () => {
    render(<TemplateSelector {...defaultProps} />);
    // Should render template cards
    const templateCards = screen.getAllByRole('button', { name: /select/i });
    expect(templateCards.length).toBeGreaterThanOrEqual(6);
  });

  it('shows template names', () => {
    render(<TemplateSelector {...defaultProps} />);
    expect(screen.getByText('Banana Island Villa')).toBeInTheDocument();
    expect(screen.getByText('Lekki Family Home')).toBeInTheDocument();
  });

  it('filters templates by Luxury category', async () => {
    const user = userEvent.setup();
    render(<TemplateSelector {...defaultProps} />);
    
    // Click Luxury filter
    await user.click(screen.getByRole('tab', { name: /luxury/i }));
    
    // Should only show luxury templates - wait for state update
    await waitFor(() => {
      expect(screen.getByText('Banana Island Villa')).toBeInTheDocument();
      expect(screen.queryByText('Lekki Family Home')).not.toBeInTheDocument();
    });
  });

  it('filters templates by Standard category', async () => {
    const user = userEvent.setup();
    render(<TemplateSelector {...defaultProps} />);
    
    // Click Standard filter
    await user.click(screen.getByRole('tab', { name: /standard/i }));
    
    // Should only show standard templates
    await waitFor(() => {
      expect(screen.getByText('Lekki Family Home')).toBeInTheDocument();
      expect(screen.queryByText('Banana Island Villa')).not.toBeInTheDocument();
    });
  });

  it('calls onSelect when template is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<TemplateSelector {...defaultProps} onSelect={onSelect} />);
    
    // Click on a template card - find the button within the Banana Island Villa card
    const cards = screen.getAllByRole('button', { name: /select/i });
    await user.click(cards[0]);
    
    expect(onSelect).toHaveBeenCalled();
  });

  it('shows selected state for selected template', () => {
    render(
      <TemplateSelector 
        {...defaultProps} 
        selectedId="tmpl_listing_luxury_ng"
      />
    );
    
    // Find the selected card - it should have a visual indicator
    const selectedCard = screen.getByTestId('template-card-tmpl_listing_luxury_ng');
    expect(selectedCard).toHaveAttribute('data-selected', 'true');
  });

  it('shows template description', () => {
    render(<TemplateSelector {...defaultProps} />);
    expect(
      screen.getByText(/premium dark theme with gold accents/i)
    ).toBeInTheDocument();
  });

  it('shows All tab to display all templates', async () => {
    const user = userEvent.setup();
    render(<TemplateSelector {...defaultProps} />);
    
    // First filter to Luxury
    await user.click(screen.getByRole('tab', { name: /luxury/i }));
    await waitFor(() => {
      expect(screen.queryByText('Lekki Family Home')).not.toBeInTheDocument();
    });
    
    // Click All to show all templates again
    await user.click(screen.getByRole('tab', { name: /all/i }));
    await waitFor(() => {
      expect(screen.getByText('Lekki Family Home')).toBeInTheDocument();
    });
  });
});

