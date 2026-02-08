// __tests__/components/ui.test.tsx
import { render } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('UI Components', () => {
  it('renders Button component', () => {
    const { getByRole } = render(<Button>Test</Button>);
    expect(getByRole('button')).toBeInTheDocument();
  });
});
