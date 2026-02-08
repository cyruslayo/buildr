/**
 * @fileoverview Project Card component for dashboard
 * BLDR-2UI-009: Displays individual project with actions
 * "use client" - Requires onClick handlers for delete action
 */
'use client';

import Link from 'next/link';
import { Trash2, Edit, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Project {
  id: string;
  name: string;
  pageType: string;
  code: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  /** Compact mode for sidebar display */
  compact?: boolean;
}

/**
 * Format date to readable string (e.g., "Dec 10, 2024")
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Get badge variant based on page type
 */
function getPageTypeBadgeVariant(pageType: string): 'default' | 'secondary' | 'outline' {
  switch (pageType.toLowerCase()) {
    case 'listing':
      return 'default';
    case 'land':
      return 'secondary';
    default:
      return 'outline';
  }
}

export function ProjectCard({ project, onDelete, compact = false }: ProjectCardProps) {
  // Compact variant for sidebar
  if (compact) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-slate-900 text-sm line-clamp-1">
            {project.name}
          </h4>
          <span className="text-xs text-slate-400 font-mono uppercase">
            {project.pageType}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {formatDate(project.updatedAt)}
          </span>
          <Link
            href={`/builder/${project.id}`}
            className="text-xs text-emerald-600 font-medium hover:text-emerald-700"
          >
            Edit →
          </Link>
        </div>
      </div>
    );
  }

  // Full card variant
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      {/* Thumbnail preview placeholder */}
      <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-4xl opacity-30">🏠</div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {project.name}
          </CardTitle>
          <Badge variant={getPageTypeBadgeVariant(project.pageType)}>
            {project.pageType}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1.5 h-3.5 w-3.5" />
          <span>Updated {formatDate(project.updatedAt)}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-2">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link href={`/builder/${project.id}`}>
            <Edit className="mr-1.5 h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(project.id)}
          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
          aria-label="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span className="sr-only">Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
