'use client';
// Justification: Requires interactive form handling (react-hook-form), local state for pending status, and optimistic store updates.

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteMemberSchema, type InviteMemberInput } from '../schemas/invite';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { inviteTeamMember } from '../actions/invite-team-member';
import { useState } from 'react';
import { toast } from 'sonner';
import { TeamRole } from '@prisma/client';
import { useTeamStore } from '../store/team-store';

export function InviteMemberForm() {
  const [isPending, setIsPending] = useState(false);
  const addOptimisticInvitation = useTeamStore((state) => state.addOptimisticInvitation);
  const removeOptimisticInvitation = useTeamStore((state) => state.removeOptimisticInvitation);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InviteMemberInput>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      role: TeamRole.EDITOR,
    },
  });

  const onSubmit = async (data: InviteMemberInput) => {
    setIsPending(true);
    
    // AC6: Optimistic Update
    addOptimisticInvitation(data.email, data.role as TeamRole);
    
    try {
      const result = await inviteTeamMember(undefined, data);
      
      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        // Rollback on failure
        removeOptimisticInvitation(data.email);
        toast.error(result.message || 'Failed to send invitation');
      }
    } catch (error) {
      removeOptimisticInvitation(data.email);
      toast.error('An unexpected error occurred');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
        <Input
          id="email"
          type="email"
          placeholder="colleague@agency.com"
          {...register('email')}
          className="h-12"
          disabled={isPending}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="role" className="text-sm font-medium">Role</label>
        <Select
          onValueChange={(value) => setValue('role', value as TeamRole)}
          defaultValue={TeamRole.EDITOR}
          disabled={isPending}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TeamRole.ADMIN}>Admin</SelectItem>
            <SelectItem value={TeamRole.EDITOR}>Editor</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-sm text-destructive">{errors.role.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold transition-all duration-300 active:scale-[0.98]"
        disabled={isPending}
      >
        {isPending ? 'Sending Invitation...' : 'Invite Team Member'}
      </Button>
    </form>
  );
}
