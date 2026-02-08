// __tests__/components/prompt-input.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PromptInput } from '@/components/builder/prompt-input';

describe('PromptInput', () => {
  it('renders textarea', () => {
    render(<PromptInput onSubmit={jest.fn()} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<PromptInput onSubmit={jest.fn()} />);
    expect(screen.getByRole('button', { name: /enhance|submit|send/i })).toBeInTheDocument();
  });
  
  it('submits on button click', async () => {
    const onSubmit = jest.fn();
    render(<PromptInput onSubmit={onSubmit} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Enhance this property description');
    
    const button = screen.getByRole('button', { name: /enhance|submit|send/i });
    await userEvent.click(button);
    
    expect(onSubmit).toHaveBeenCalledWith('Enhance this property description');
  });

  it('submits on Ctrl+Enter', async () => {
    const onSubmit = jest.fn();
    render(<PromptInput onSubmit={onSubmit} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Create a hero section');
    fireEvent.keyDown(input, { key: 'Enter', ctrlKey: true });
    
    expect(onSubmit).toHaveBeenCalledWith('Create a hero section');
  });

  it('submits on Cmd+Enter (Mac)', async () => {
    const onSubmit = jest.fn();
    render(<PromptInput onSubmit={onSubmit} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Create a hero section');
    fireEvent.keyDown(input, { key: 'Enter', metaKey: true });
    
    expect(onSubmit).toHaveBeenCalledWith('Create a hero section');
  });
  
  it('disables input and button when loading', () => {
    render(<PromptInput onSubmit={jest.fn()} isLoading={true} />);
    
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows character count', async () => {
    render(<PromptInput onSubmit={jest.fn()} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Hello');
    
    // Should show character count
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });

  it('shows placeholder text', () => {
    render(<PromptInput onSubmit={jest.fn()} placeholder="Describe your property..." />);
    
    expect(screen.getByPlaceholderText('Describe your property...')).toBeInTheDocument();
  });

  it('clears input after successful submit', async () => {
    const onSubmit = jest.fn();
    render(<PromptInput onSubmit={onSubmit} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Test content');
    
    const button = screen.getByRole('button', { name: /enhance|submit|send/i });
    await userEvent.click(button);
    
    expect(input).toHaveValue('');
  });

  it('does not submit empty input', async () => {
    const onSubmit = jest.fn();
    render(<PromptInput onSubmit={onSubmit} />);
    
    const button = screen.getByRole('button', { name: /enhance|submit|send/i });
    await userEvent.click(button);
    
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
