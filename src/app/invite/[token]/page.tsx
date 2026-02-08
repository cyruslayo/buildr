import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/auth';
import { validateInvitationToken } from '@/features/team/actions/accept-invitation';
import { AcceptInvitationCard } from '@/features/team/components/accept-invitation-card';

interface InvitePageProps {
  params: Promise<{ token: string }>;
}

export const metadata = {
  title: 'Accept Invitation | Buildr',
  description: 'Join your team on Buildr',
};

/**
 * Invitation Acceptance Page
 * Validates the token and prompts the user to login/register or accept if authenticated.
 */
export default async function InvitePage({ params }: InvitePageProps) {
  const { token } = await params;
  
  // Validate the invitation token
  const validation = await validateInvitationToken(token);
  
  if (!validation.valid) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg border border-slate-100 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Invalid Invitation</h1>
          <p className="text-slate-500">{validation.message}</p>
          <a 
            href="/login" 
            className="inline-block mt-4 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-500 transition-all"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  const session = await auth();

  if (!session?.user?.id) {
    // Redirect to login with callback to this page
    const callbackUrl = encodeURIComponent(`/invite/${token}`);
    redirect(`/login?callbackUrl=${callbackUrl}`);
  }

  // Type guard: validation.valid is true, so these properties exist
  const teamName = validation.teamName ?? 'Unknown Team';
  const invitedEmail = validation.invitedEmail ?? '';
  const role = validation.role ?? 'EDITOR';

  // User is authenticated - show the accept invitation card
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
      <AcceptInvitationCard 
        token={token}
        teamName={teamName}
        invitedEmail={invitedEmail}
        role={role}
      />
    </div>
  );
}
