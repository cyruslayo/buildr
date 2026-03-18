/**
 * @fileoverview Dashboard component showing user projects
 * BLDR-2UI-009: Asymmetric grid with hero project + secondary grid
 * "use client" - Requires state management for delete action
 * 
 * Design: Featured project (col-span-8) + secondary grid (col-span-4)
 * Implements Art Direction asymmetric layout
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, FolderOpen, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './project-card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Project {
  id: string;
  name: string;
  pageType: string;
  code: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DashboardProps {
  projects: Project[];
}

export function Dashboard({ projects }: DashboardProps) {
  const router = useRouter();
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (projectId: string) => setProjectToDelete(projectId);

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${projectToDelete}`, { method: 'DELETE' });
      if (res.ok) { setProjectToDelete(null); router.refresh(); }
    } catch (error) { console.error('Delete error:', error);
    } finally { setIsDeleting(false); }
  };

  // Split projects: first is featured, rest go in grid
  const [featuredProject, ...otherProjects] = projects;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 data-testid="dashboard-header" className="font-display text-4xl text-slate-900 mb-1">My Pages</h1>
          <p className="text-slate-500">
            {projects.length > 0
              ? `${projects.length} project${projects.length === 1 ? '' : 's'} • Last updated recently`
              : 'Start building your first property page'}
          </p>
        </div>
        <Link
          href="/builder"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-900 text-[#FDFBF7] font-bold uppercase tracking-widest text-sm hover:bg-emerald-800 transition-all hover:gap-3 shadow-lg shadow-emerald-900/20"
        >
          <Plus className="w-4 h-4" />
          New Page
        </Link>
      </div>

      {/* Project Grid or Empty State */}
      {projects.length > 0 ? (
        <>
          <AlertDialog open={!!projectToDelete} onOpenChange={(v) => !v && setProjectToDelete(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone. This will permanently remove the project.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={(e) => { e.preventDefault(); confirmDelete(); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={isDeleting}>
                  {isDeleting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...</> : 'Delete Project'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        <div className="grid grid-cols-12 gap-6">
          {/* Featured Project - 8 columns */}
          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-12 lg:col-span-8"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded">
                        Featured
                      </span>
                      <span className="text-xs text-slate-400 font-mono uppercase">
                        {featuredProject.pageType}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl text-slate-900 mb-2">
                    {featuredProject.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6">
                    Last edited {new Date(featuredProject.updatedAt).toLocaleDateString('en-NG', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/builder/${featuredProject.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors rounded-lg"
                    >
                      Edit Page
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/preview/${featuredProject.id}`}
                      className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
                    >
                      Preview
                    </Link>
                    <button
                      onClick={() => handleDelete(featuredProject.id)}
                      className="ml-auto text-sm text-slate-400 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Secondary Projects - 4 columns */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {otherProjects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onDelete={handleDelete}
                  compact
                />
              </motion.div>
            ))}
            
            {otherProjects.length > 3 && (
              <Link
                href="/dashboard/all"
                className="block text-center py-3 text-sm text-emerald-700 font-medium hover:text-emerald-800 transition-colors"
              >
                View all {projects.length} projects →
              </Link>
            )}
          </div>

          {/* Full Grid for remaining projects (if more than 4 total) */}
          {otherProjects.length > 3 && (
            <div className="col-span-12 pt-8 border-t border-slate-200">
              <h2 className="font-display text-xl text-slate-900 mb-6">All Projects</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherProjects.slice(3).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

/**
 * Premium empty state with gradient background and texture
 */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-900/50 to-slate-900 p-12 lg:p-16"
    >
      {/* Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      
      {/* Decorative blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mb-6 shadow-lg shadow-emerald-900/50">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="font-display text-3xl text-white mb-3">
          Start Your First Page
        </h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Create stunning property listings designed for the Nigerian market. 
          WhatsApp integration, Naira pricing, and trust signals built-in.
        </p>
        
        <Link
          href="/builder"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-900 font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all hover:gap-4 shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Create Page
          <ArrowRight className="w-5 h-5" />
        </Link>
        
        <p className="mt-8 text-xs text-slate-500 font-mono uppercase tracking-widest">
          No credit card required
        </p>
      </div>
    </motion.div>
  );
}

