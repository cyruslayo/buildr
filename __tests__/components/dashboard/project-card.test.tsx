import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectCard } from '@/components/dashboard/project-card';

const mockProject = {
  id: 'proj-123',
  name: 'Banana Island Villa',
  pageType: 'listing',
  code: 'BIV-001',
  userId: 'user-1',
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-02'),
};

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href, 'aria-label': ariaLabel, className }: any) => (
    <a href={href} aria-label={ariaLabel} className={className}>
      {children}
    </a>
  );
});

describe('ProjectCard', () => {
  const mockDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders standard card with project title, badge, and descriptive ARIA labels', () => {
    render(<ProjectCard project={mockProject} onDelete={mockDelete} />);

    expect(screen.getByText('Banana Island Villa')).toBeInTheDocument();
    expect(screen.getByText('listing')).toBeInTheDocument();

    const editLink = screen.getByRole('link', { name: 'Edit project: Banana Island Villa' });
    expect(editLink).toHaveAttribute('href', '/builder/proj-123');

    const deleteBtn = screen.getByRole('button', { name: 'Delete project: Banana Island Villa' });
    expect(deleteBtn).toBeInTheDocument();

    fireEvent.click(deleteBtn);
    expect(mockDelete).toHaveBeenCalledWith('proj-123');
  });

  it('renders compact mode with descriptive ARIA label on edit link', () => {
    render(<ProjectCard project={mockProject} onDelete={mockDelete} compact={true} />);

    expect(screen.getByText('Banana Island Villa')).toBeInTheDocument();

    const editLink = screen.getByRole('link', { name: 'Edit project: Banana Island Villa' });
    expect(editLink).toHaveAttribute('href', '/builder/proj-123');
  });
});
