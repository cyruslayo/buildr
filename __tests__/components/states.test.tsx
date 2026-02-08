// __tests__/components/states.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LoadingSkeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { EmptyState } from '@/components/ui/empty-state';

describe('UI States', () => {
  describe('LoadingSkeleton', () => {
    it('renders loading skeleton', () => {
      render(<LoadingSkeleton />);
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });

    it('renders multiple skeleton lines', () => {
      render(<LoadingSkeleton lines={3} />);
      const skeletons = screen.getAllByTestId('skeleton');
      expect(skeletons).toHaveLength(3);
    });

    it('accepts custom className', () => {
      render(<LoadingSkeleton className="w-full h-8" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('w-full', 'h-8');
    });
  });

  describe('ErrorState', () => {
    it('renders error state with retry', () => {
      const onRetry = jest.fn();
      render(<ErrorState message="Generation failed" onRetry={onRetry} />);
      expect(screen.getByText('Generation failed')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Try Again'));
      expect(onRetry).toHaveBeenCalled();
    });

    it('shows error icon', () => {
      render(<ErrorState message="Something went wrong" onRetry={jest.fn()} />);
      expect(screen.getByTestId('error-icon')).toBeInTheDocument();
    });

    it('hides retry button when onRetry not provided', () => {
      render(<ErrorState message="Error occurred" />);
      expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
    });
  });

  describe('EmptyState', () => {
    it('renders empty state with CTA', () => {
      render(<EmptyState title="No projects" cta="Create First Page" />);
      expect(screen.getByText('No projects')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(
        <EmptyState 
          title="No templates" 
          description="Get started by creating your first template"
          cta="Create Template"
        />
      );
      expect(screen.getByText('Get started by creating your first template')).toBeInTheDocument();
    });

    it('calls onCtaClick when CTA is clicked', () => {
      const onCtaClick = jest.fn();
      render(
        <EmptyState 
          title="No projects" 
          cta="Create Project" 
          onCtaClick={onCtaClick}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: /create/i }));
      expect(onCtaClick).toHaveBeenCalled();
    });

    it('renders without CTA when not provided', () => {
      render(<EmptyState title="Nothing here yet" />);
      expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});
