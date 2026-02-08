'use client';
// Justification: Zustand store requires client-side state management for Optimistic UI (AC6).

import { create } from 'zustand';
import { Invitation, TeamRole, InvitationStatus } from '@prisma/client';

interface TeamState {
  invitations: Invitation[];
  setInvitations: (invitations: Invitation[]) => void;
  addOptimisticInvitation: (email: string, role: TeamRole) => void;
  removeOptimisticInvitation: (email: string) => void;
}

/**
 * Team Store
 * Manages team-level state including pending invitations for Optimistic UI (AC6).
 */
export const useTeamStore = create<TeamState>((set) => ({
  invitations: [],
  setInvitations: (invitations) => set({ invitations }),
  addOptimisticInvitation: (email, role) => {
    const optimisticInvite: Partial<Invitation> & { id: string; email: string; role: TeamRole; status: InvitationStatus } = {
      id: `temp-${Date.now()}`,
      email: email.toLowerCase(),
      role,
      status: 'PENDING' as InvitationStatus,
      token: 'placeholder',
      teamId: 'current-team',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ 
      invitations: [optimisticInvite as Invitation, ...state.invitations] 
    }));
  },
  removeOptimisticInvitation: (email) => {
    set((state) => ({
      invitations: state.invitations.filter((i) => i.email !== email.toLowerCase() || !i.id.startsWith('temp-')),
    }));
  },
}));
