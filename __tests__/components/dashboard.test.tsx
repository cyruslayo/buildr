/**
 * @fileoverview TDD tests for User Dashboard
 * BLDR-2UI-009: Dashboard showing user projects with empty state
 */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock next/link for the Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// Import after mocks
import { Dashboard } from '@/components/dashboard/dashboard';
import { ProjectCard } from '@/components/dashboard/project-card';

const mockProjects = [
  {
    id: 'proj_1',
    name: '4BR Duplex Lekki',
    pageType: 'listing',
    code: '<html></html>',
    userId: 'user_123',
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-10'),
  },
  {
    id: 'proj_2',
    name: 'Land Sale Victoria Island',
    pageType: 'land',
    code: '<html></html>',
    userId: 'user_123',
    createdAt: new Date('2024-12-05'),
    updatedAt: new Date('2024-12-08'),
  },
];

describe('Dashboard', () => {
  it('shows list of user projects', () => {
    render(<Dashboard projects={mockProjects} />);
    expect(screen.getByText('4BR Duplex Lekki')).toBeInTheDocument();
    expect(screen.getByText('Land Sale Victoria Island')).toBeInTheDocument();
  });

  it('shows empty state when no projects', () => {
    render(<Dashboard projects={[]} />);
    expect(screen.getByText(/create your first page/i)).toBeInTheDocument();
  });

  it('has create new button', () => {
    render(<Dashboard projects={[]} />);
    const createLinks = screen.getAllByRole('link', { name: /new page/i });
    // Should have at least one New Page link that goes to /builder
    expect(createLinks.length).toBeGreaterThan(0);
    expect(createLinks[0]).toHaveAttribute('href', '/builder');
  });

  it('displays project count', () => {
    render(<Dashboard projects={mockProjects} />);
    expect(screen.getByText(/2 projects/i)).toBeInTheDocument();
  });

  it('shows dashboard title', () => {
    render(<Dashboard projects={mockProjects} />);
    expect(screen.getByRole('heading', { name: /my pages/i })).toBeInTheDocument();
  });
});

describe('ProjectCard', () => {
  const mockProject = mockProjects[0];
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it('renders project name', () => {
    render(<ProjectCard project={mockProject} onDelete={mockOnDelete} />);
    expect(screen.getByText('4BR Duplex Lekki')).toBeInTheDocument();
  });

  it('displays page type badge', () => {
    render(<ProjectCard project={mockProject} onDelete={mockOnDelete} />);
    expect(screen.getByText(/listing/i)).toBeInTheDocument();
  });

  it('has edit link to project', () => {
    render(<ProjectCard project={mockProject} onDelete={mockOnDelete} />);
    const editLink = screen.getByRole('link', { name: /edit/i });
    expect(editLink).toHaveAttribute('href', '/builder/proj_1');
  });

  it('has delete button', () => {
    render(<ProjectCard project={mockProject} onDelete={mockOnDelete} />);
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it('calls onDelete when delete button clicked', () => {
    render(<ProjectCard project={mockProject} onDelete={mockOnDelete} />);
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith('proj_1');
  });

  it('shows last updated date', () => {
    render(<ProjectCard project={mockProject} onDelete={mockOnDelete} />);
    // Check that date is displayed (format may vary)
    expect(screen.getByText(/dec/i)).toBeInTheDocument();
  });
});
