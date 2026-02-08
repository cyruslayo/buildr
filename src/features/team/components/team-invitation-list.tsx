'use client';
// Justification: Requires synchronization with useTeamStore for Optimistic UI (AC6).

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Clock, ShieldCheck } from 'lucide-react';
import { useTeamStore } from '../store/team-store';
import { Invitation } from '@prisma/client';

interface TeamInvitationListProps {
  initialInvitations: Invitation[];
}

/**
 * Renders the list of pending team invitations.
 * Uses consistent "Lagos Luxury" patterns with metallic-like badges.
 * Client component to sync with Optimistic UI state from useTeamStore.
 */
export function TeamInvitationList({ initialInvitations }: TeamInvitationListProps) {
  const { invitations, setInvitations } = useTeamStore();

  useEffect(() => {
    setInvitations(initialInvitations);
  }, [initialInvitations, setInvitations]);

  if (invitations.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest px-1">
        Pending Invitations ({invitations.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {invitations.map((invitation) => (
          <Card key={invitation.id} className="border-l-4 border-l-emerald-500 bg-emerald-50/30" data-testid={`invitation-card-${invitation.email}`}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Mail className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900" data-testid="invitation-email">{invitation.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <ShieldCheck className="w-3 h-3" />
                      {invitation.role}
                    </div>
                    <span className="text-[10px] text-slate-300">•</span>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <Clock className="w-3 h-3" />
                      Expires {new Date(invitation.expiresAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="bg-white text-emerald-600 border-emerald-200" data-testid="invitation-status">
                {invitation.id.startsWith('temp-') ? 'SENDING...' : 'PENDING'}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
