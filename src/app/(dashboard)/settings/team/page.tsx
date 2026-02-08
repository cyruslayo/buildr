import { Suspense } from 'react';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth/auth';
import { TeamMemberList } from '@/features/team/components/team-member-list';
import { TeamInvitationList } from '@/features/team/components/team-invitation-list';
import { InviteMemberForm } from '@/features/team/components/invite-member-form';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'Team Management | Buildr',
  description: 'Manage your agency team and collaboration settings.',
};

/**
 * Team Management Page
 * Implements "Nigeria-First" requirements with N-currency (contextual) and 
 * multi-tenant isolation.
 */
async function InvitationsWrapper() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { teamId: true },
  });

  if (!user?.teamId) return null;

  const initialInvitations = await prisma.invitation.findMany({
    where: { 
      teamId: user.teamId,
      status: 'PENDING'
    },
    orderBy: { createdAt: 'desc' },
  });

  return <TeamInvitationList initialInvitations={initialInvitations} />;
}

export default function TeamSettingsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-slate-900 tracking-tight">
            Agency Collaboration
          </h1>
          <p className="text-slate-500 max-w-lg">
            Invite your colleagues to collaborate on property listings. Assign roles to manage permissions and ensure workflow efficiency.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Team Members & Invitations */}
        <div className="lg:col-span-8 space-y-10">
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              Active Members
            </h2>
            <Suspense fallback={<TeamListSkeleton />}>
              <TeamMemberList />
            </Suspense>
          </section>

          <section className="space-y-6">
            <Suspense fallback={<div className="h-20 w-full animate-pulse bg-slate-100 rounded-xl" />}>
              <InvitationsWrapper />
            </Suspense>
          </section>
        </div>

        {/* Right Column: Invite Form */}
        <aside className="lg:col-span-4 sticky top-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Invite New Member</h3>
              <p className="text-sm text-slate-500">Send an invitation link via email.</p>
            </div>
            <InviteMemberForm />
            
            <div className="pt-4 border-t border-slate-50">
              <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest font-bold">
                Security Tip: Only authorized administrators can manage team roles and permissions.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function TeamListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <Skeleton className="md:col-span-12 lg:col-span-8 h-48 rounded-2xl" />
      <Skeleton className="md:col-span-6 lg:col-span-4 h-48 rounded-2xl" />
      <Skeleton className="md:col-span-6 lg:col-span-4 h-48 rounded-2xl" />
    </div>
  );
}
