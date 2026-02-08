'use client';
// Justification: Requires useState for pending state and onClick handler for accept button.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { acceptInvitation } from '@/features/team/actions/accept-invitation';
import { toast } from 'sonner';
import { Users, Shield, CheckCircle } from 'lucide-react';

interface AcceptInvitationCardProps {
  token: string;
  teamName: string;
  invitedEmail: string;
  role: string;
}

export function AcceptInvitationCard({ 
  token, 
  teamName, 
  invitedEmail, 
  role 
}: AcceptInvitationCardProps) {
  const [isPending, setIsPending] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const router = useRouter();

  const handleAccept = async () => {
    setIsPending(true);
    try {
      const result = await acceptInvitation(token);
      
      if (result.success) {
        setIsAccepted(true);
        toast.success(result.message);
        // Redirect to dashboard after a brief delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        toast.error(result.message || 'Failed to accept invitation');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsPending(false);
    }
  };

  if (isAccepted) {
    return (
      <Card className="max-w-md w-full text-center border-emerald-200 bg-emerald-50/50">
        <CardContent className="p-8 space-y-4">
          <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-900">Welcome to the Team!</h2>
          <p className="text-slate-500">You are now a member of <strong>{teamName}</strong>.</p>
          <p className="text-sm text-slate-400">Redirecting to dashboard...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md w-full border-slate-200 shadow-xl">
      <CardHeader className="text-center pb-2 space-y-4">
        <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
          <Users className="w-8 h-8 text-emerald-600" />
        </div>
        <CardTitle className="text-2xl font-display font-bold text-slate-900">
          Join {teamName}
        </CardTitle>
        <p className="text-slate-500 text-sm">
          You've been invited to join this agency team
        </p>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        {/* Invitation Details */}
        <div className="p-4 bg-slate-50 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Invited Email</span>
            <span className="text-sm font-medium text-slate-900">{invitedEmail}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Role</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              {role}
            </Badge>
          </div>
        </div>

        {/* Accept Button - h-12 for touch ergonomics */}
        <Button 
          onClick={handleAccept}
          disabled={isPending}
          className="w-full h-12 text-base font-semibold transition-all duration-300 active:scale-[0.98] bg-emerald-600 hover:bg-emerald-500"
          data-testid="accept-invitation-btn"
        >
          {isPending ? 'Joining Team...' : 'Accept Invitation'}
        </Button>

        <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest">
          By accepting, you agree to collaborate under the agency's guidelines
        </p>
      </CardContent>
    </Card>
  );
}
