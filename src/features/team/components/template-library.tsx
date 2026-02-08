'use client';
// Justification: Requires useState for optimistic UI, useTransition for server action calls, and onClick handlers.

import { useOptimistic, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toggleTemplateLock } from '@/features/team/actions/lock-template';
import { toast } from 'sonner';
import { Lock, Unlock, Eye } from 'lucide-react';
import type { TemplateDefinition } from '@/lib/templates/types';

interface TemplateLibraryProps {
  templates: TemplateDefinition[];
  lockedTemplateIds: string[];
  isAdmin: boolean;
}

interface TemplateWithLockStatus extends TemplateDefinition {
  isLocked: boolean;
}

/**
 * Template Library Client Component
 * Displays available templates with lock/unlock functionality for Admins.
 * Implements "Lagos Luxury" aesthetics with asymmetric grid layout.
 */
export function TemplateLibrary({ templates, lockedTemplateIds, isAdmin }: TemplateLibraryProps) {
  const [isPending, startTransition] = useTransition();
  
  // Combine templates with lock status
  const templatesWithLockStatus: TemplateWithLockStatus[] = templates.map(t => ({
    ...t,
    isLocked: lockedTemplateIds.includes(t.id),
  }));

  const [optimisticTemplates, updateOptimisticTemplates] = useOptimistic(
    templatesWithLockStatus,
    (current, { templateId, isLocked }: { templateId: string; isLocked: boolean }) =>
      current.map(t => t.id === templateId ? { ...t, isLocked } : t)
  );

  const handleToggleLock = (templateId: string, currentlyLocked: boolean) => {
    const newLockState = !currentlyLocked;
    
    startTransition(async () => {
      // Optimistic update
      updateOptimisticTemplates({ templateId, isLocked: newLockState });
      
      const result = await toggleTemplateLock(templateId, newLockState);
      
      if (result.success) {
        toast.success(result.message);
      } else {
        // Rollback on failure
        updateOptimisticTemplates({ templateId, isLocked: currentlyLocked });
        toast.error(result.message || 'Failed to update template lock');
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Template Library</h1>
        <p className="text-muted-foreground text-lg">
          Browse and manage templates for your agency. {isAdmin && 'Lock premium templates to restrict Editor access.'}
        </p>
      </div>

      {/* Template Grid - Asymmetric layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {optimisticTemplates.map((template, index) => {
          // Asymmetric pattern: First 2 templates larger, rest smaller
          const colSpan = index < 2 ? 'md:col-span-6' : 'md:col-span-4';
          const isLuxury = template.category === 'luxury';
          
          return (
            <Card 
              key={template.id}
              className={cn(
                "group relative overflow-hidden transition-all duration-300 hover:shadow-xl",
                colSpan,
                template.isLocked && !isAdmin && "opacity-60 cursor-not-allowed",
                isLuxury 
                  ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white border-amber-500/20" 
                  : "bg-white border-slate-200"
              )}
            >
              {/* Lock Badge */}
              {template.isLocked && (
                <div className={cn(
                  "absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
                  isLuxury 
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
                    : "bg-red-50 text-red-600 border border-red-200"
                )}>
                  <Lock className="w-3 h-3" />
                  Admin Only
                </div>
              )}

              {/* Thumbnail Placeholder */}
              <div className={cn(
                "h-32 relative overflow-hidden",
                isLuxury ? "bg-gradient-to-br from-amber-600/20 to-slate-900" : "bg-slate-100"
              )}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Eye className={cn("w-8 h-8", isLuxury ? "text-amber-500/40" : "text-slate-300")} />
                </div>
                {/* Category Badge */}
                <Badge 
                  className={cn(
                    "absolute bottom-2 left-2 text-[10px] uppercase tracking-wider",
                    isLuxury ? "bg-amber-500 hover:bg-amber-400" : "bg-primary"
                  )}
                >
                  {template.category}
                </Badge>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className={cn("text-lg", isLuxury && "text-white")}>
                  {template.name}
                </CardTitle>
                <p className={cn(
                  "text-sm line-clamp-2",
                  isLuxury ? "text-slate-400" : "text-muted-foreground"
                )}>
                  {template.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Admin Lock Toggle */}
                {isAdmin && (
                  <div className="flex items-center justify-between py-3 border-t border-slate-200/10">
                    <div className="flex items-center gap-2">
                      {template.isLocked ? (
                        <Lock className={cn("w-4 h-4", isLuxury ? "text-amber-400" : "text-red-500")} />
                      ) : (
                        <Unlock className={cn("w-4 h-4", isLuxury ? "text-slate-400" : "text-slate-400")} />
                      )}
                      <span className={cn(
                        "text-sm font-medium",
                        isLuxury ? "text-slate-300" : "text-slate-600"
                      )}>
                        {template.isLocked ? 'Locked' : 'Unlocked'}
                      </span>
                    </div>
                    {/* Touch target wrapper for h-12 compliance */}
                    <div className="flex items-center justify-center h-12 w-14">
                      <Switch
                        checked={template.isLocked}
                        onCheckedChange={() => handleToggleLock(template.id, template.isLocked)}
                        disabled={isPending}
                        className="h-6 w-11 data-[state=checked]:bg-amber-500"
                        data-testid={`lock-toggle-${template.id}`}
                      />
                    </div>
                  </div>
                )}

                {/* Editor Locked Message */}
                {!isAdmin && template.isLocked && (
                  <div className="py-3 border-t border-slate-200/10">
                    <p className={cn(
                      "text-sm italic",
                      isLuxury ? "text-amber-300/80" : "text-red-500"
                    )}>
                      This template is locked. Contact your Admin.
                    </p>
                  </div>
                )}

                {/* Use Template Button */}
                <Button
                  className={cn(
                    "w-full h-12 mt-2 font-semibold",
                    template.isLocked && !isAdmin && "cursor-not-allowed opacity-50",
                    isLuxury 
                      ? "bg-amber-500 hover:bg-amber-400 text-slate-900" 
                      : ""
                  )}
                  disabled={template.isLocked && !isAdmin}
                  data-testid={`use-template-${template.id}`}
                >
                  {template.isLocked && !isAdmin ? 'Locked' : 'Use Template'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
