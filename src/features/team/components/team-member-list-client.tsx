'use client';
// Justification: Requires useOptimistic for optimistic UI, useState for dialog state, and onClick handlers.

import { useState, useOptimistic, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { changeTeamMemberRole } from '@/features/team/actions/change-role';
import { removeTeamMember } from '@/features/team/actions/remove-member';
import { toast } from 'sonner';
import { TeamRole } from '@prisma/client';
import { Trash2 } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
}

interface TeamMemberListClientProps {
  members: TeamMember[];
  currentUserId: string;
  isAdmin: boolean;
}

/**
 * Client component for rendering team members with role change and removal capability.
 * Implements "Lagos Luxury" with depth and "Asymmetry" in layout.
 */
export function TeamMemberListClient({ members, currentUserId, isAdmin }: TeamMemberListClientProps) {
  const [isPending, startTransition] = useTransition();
  const [removePending, setRemovePending] = useState(false);
  const [openMemberDialogId, setOpenMemberDialogId] = useState<string | null>(null);
  const [optimisticMembers, updateOptimisticMembers] = useOptimistic(
    members,
    (currentMembers, { memberId, newRole }: { memberId: string; newRole: string }) =>
      currentMembers.map(m => m.id === memberId ? { ...m, role: newRole } : m)
  );

  const handleRoleChange = (memberId: string, newRole: TeamRole) => {
    const originalMember = members.find(m => m.id === memberId);
    const originalRole = originalMember?.role || 'EDITOR';
    
    startTransition(async () => {
      updateOptimisticMembers({ memberId, newRole });
      
      const result = await changeTeamMemberRole(memberId, newRole);
      
      if (result.success) {
        toast.success(result.message);
      } else {
        updateOptimisticMembers({ memberId, newRole: originalRole });
        toast.error(result.message || 'Failed to change role');
      }
    });
  };

  const handleRemoveMember = async (memberId: string) => {
    setRemovePending(true);
    try {
      const result = await removeTeamMember(memberId);
      
      if (result.success) {
        toast.success(result.message);
        setOpenMemberDialogId(null); // Auto-close dialog on success
      } else {
        toast.error(result.message || 'Failed to remove member');
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setRemovePending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {optimisticMembers.map((member, index) => {
        const isCurrentUser = member.id === currentUserId;
        return (
          <Card 
            key={member.id}
            className={cn(
              "group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-white/10",
              isCurrentUser && "ring-2 ring-emerald-500/50",
              // Asymmetric pattern: First item (usually admin) is larger
              index === 0 ? "md:col-span-12 lg:col-span-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white" : "md:col-span-6 lg:col-span-4 bg-white"
            )}
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-14 w-14 border-2 border-emerald-500/20">
                <AvatarImage src={member.image || undefined} alt={member.name || ''} />
                <AvatarFallback className={cn(index === 0 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-900")}>
                  {(member.name || member.email).charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-lg truncate">{member.name || 'Anonymous'}</CardTitle>
                  {isAdmin ? (
                    <Select
                      defaultValue={member.role}
                      onValueChange={(value) => handleRoleChange(member.id, value as TeamRole)}
                      disabled={isPending}
                    >
                      <SelectTrigger 
                        className={cn(
                          "w-auto h-10 text-[10px] uppercase tracking-tighter",
                          index === 0 ? "bg-emerald-500/20 border-emerald-500/30 text-white" : ""
                        )}
                        data-testid={`role-select-${member.id}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN" className="h-12">Admin</SelectItem>
                        <SelectItem value="EDITOR" className="h-12">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge 
                      variant={member.role === 'ADMIN' || member.role === 'AGENT' ? 'default' : 'secondary'}
                      className={cn(
                        "text-[10px] uppercase tracking-tighter",
                        index === 0 && member.role === 'ADMIN' ? "bg-emerald-500 hover:bg-emerald-400" : ""
                      )}
                    >
                      {member.role}
                    </Badge>
                  )}
                  
                  {/* Remove button - only for admins and not for self */}
                  {isAdmin && !isCurrentUser && (
                    <AlertDialog 
                      open={openMemberDialogId === member.id} 
                      onOpenChange={(open) => setOpenMemberDialogId(open ? member.id : null)}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "h-12 w-12 text-red-500 hover:text-red-600 hover:bg-red-50",
                                index === 0 && "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              )}
                              disabled={removePending}
                              data-testid={`remove-member-${member.id}`}
                              aria-label="Remove member"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </AlertDialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove member</p>
                        </TooltipContent>
                      </Tooltip>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove <strong>{member.name || member.email}</strong> from the team?
                            They will lose access to all team resources immediately.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="h-12">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="h-12 bg-red-600 hover:bg-red-700"
                            onClick={() => handleRemoveMember(member.id)}
                            disabled={removePending}
                          >
                            {removePending ? 'Removing...' : 'Remove Member'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
                <p className={cn("text-xs truncate", index === 0 ? "text-slate-400" : "text-slate-500")}>
                  {member.email}
                </p>
              </div>
            </CardHeader>
            {index === 0 && (
              <CardContent>
                <p className="text-sm text-slate-300 italic mt-2">
                  "Leading the agency with vision and excellence."
                </p>
                <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="w-32 h-32 rounded-full border-[12px] border-emerald-500" />
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
